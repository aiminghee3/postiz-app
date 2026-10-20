// Run against compiled providers. All network calls are intercepted: no posts.
const assert = require('node:assert/strict');
const path = require('node:path');
require('reflect-metadata');
const root = process.argv[2] || '/app';
const realFetch = global.fetch;
const creator = {
  creator_nickname: 'Review Creator', creator_avatar_url: 'https://example.com/avatar.png',
  privacy_level_options: ['SELF_ONLY'], comment_disabled: true, duet_disabled: true,
  stitch_disabled: true, max_video_post_duration_sec: 60, unexpected_secret: 'never expose',
};
const settings = {privacy_level:'SELF_ONLY',content_posting_method:'DIRECT_POST',
  comment:false,duet:false,stitch:false,brand_content_toggle:false,brand_organic_toggle:false,autoAddMusic:'no'};
const media = 'https://onpost.me/uploads/approved.mp4';
async function run(app) {
  const base = process.env.ONPOST_VERIFY_SOURCE ? root : path.join(root,'apps',app,'dist');
  const suffix = process.env.ONPOST_VERIFY_SOURCE ? 'ts' : 'js';
  const { TiktokProvider } = require(path.join(base,'libraries/nestjs-libraries/src/integrations/social/tiktok.provider.'+suffix));
  let calls=[];
  global.fetch = async (url, options={}) => {
    calls.push({url:String(url),options});
    if(String(url).endsWith('/creator_info/query/')) return Response.json({data:creator,error:{code:'ok'}});
    if(String(url).includes('/post/publish/video/init/')) return Response.json({data:{publish_id:'fake-review-id'},error:{code:'ok'}});
    throw new Error('Unexpected network request: '+url);
  };
  const p = new TiktokProvider();
  const info = await p.creatorInfo('fake-token');
  assert.deepEqual(info,{nickname:'Review Creator',avatarUrl:creator.creator_avatar_url,
    privacyLevelOptions:['SELF_ONLY'],commentDisabled:true,duetDisabled:true,
    stitchDisabled:true,maxDurationSeconds:60});
  const post = (changes={}) => [{id:'test',message:'Creator-written caption',media:[{path:media}],settings:{...settings,...changes}}];
  calls=[];
  await assert.rejects(p.postPending('test','fake-token',post({privacy_level:'PUBLIC_TO_EVERYONE'}),{}), /privacy/i);
  assert.equal(calls.filter(c=>c.url.endsWith('/video/init/')).length,0,'Invalid privacy cannot initiate a post');
  for(const field of ['comment','duet','stitch']) {
    calls=[];
    await assert.rejects(p.postPending('test','fake-token',post({[field]:true}),{}), /disabled|allow/i);
    assert.equal(calls.filter(c=>c.url.endsWith('/video/init/')).length,0);
  }
  await assert.rejects(p.postPending('test','fake-token',post({brand_content_toggle:true}),{}), /private|branded/i);
  calls=[];
  const result=await p.postPending('test','fake-token',post(),{});
  assert.equal(result[0].status,'pending');
  assert.equal(result[0].pendingData.publishId,'fake-review-id');
  const init=calls.find(c=>c.url.endsWith('/video/init/'));
  const body=JSON.parse(init.options.body);
  assert.deepEqual(body.source_info,{source:'PULL_FROM_URL',video_url:media});
  assert.equal(body.post_info.privacy_level,'SELF_ONLY');
  assert.equal(body.post_info.disable_comment,true);
  assert.equal(body.post_info.disable_duet,true);
  assert.equal(body.post_info.disable_stitch,true);
  assert.equal(calls.length,2,'Read creator info then initialize one pull; never download/reupload server-hosted bytes');
  calls=[];
  global.fetch=async(url,options={})=>{
    calls.push({url:String(url),options});
    if(String(url).endsWith('/creator_info/query/'))return Response.json({data:creator,error:{code:'ok'}});
    throw new Error('Accepted by TikTok, connection lost before response');
  };
  await assert.rejects(p.postPending('test','fake-token',post(),{}),e=>e.type==='bad_body'&&/unknown|accepted/i.test(e.message),'An ambiguous pull initialization is terminal, not a retryable unknown exception');
  assert.equal(calls.length,2,'No automatic replay after a possibly accepted pull initialization');
  for (const mode of ['server-error','malformed','missing-id']) {
    calls=[];
    global.fetch=async(url)=>{
      calls.push(String(url));
      if(String(url).endsWith('/creator_info/query/'))return Response.json({data:creator,error:{code:'ok'}});
      return mode==='server-error' ? Response.json({}, {status:503}) : mode==='malformed' ? new Response('{bad') : Response.json({data:{},error:{code:'ok'}});
    };
    await assert.rejects(p.postPending('test','fake-token',post(),{}),e=>e.type==='bad_body'&&/unknown/i.test(e.message));
    assert.equal(calls.length,2,'Never replay an ambiguous '+mode+' initialization');
  }
  calls=[];
  global.fetch=async(url)=>{calls.push(String(url));return Response.json({error:{code:'spam_risk_too_many_posts'}});};
  await assert.rejects(p.postPending('test','fake-token',post(),{}), /creator|later|TikTok/i);
  assert.equal(calls.length,1,'Creator limit must stop before publication');
  const { validateSync } = require('class-validator');
  const { TikTokDto } = require(path.join(base,'libraries/nestjs-libraries/src/dtos/posts/providers-settings/tiktok.dto.'+suffix));
  const dto = (extra) => Object.assign(new TikTokDto(),settings,extra);
  assert(validateSync(dto({creator_max_duration_seconds:60,video_duration_seconds:61})).some(e=>e.property==='video_duration_seconds'),'Reject video longer than creator limit');
  assert(validateSync(dto({creator_max_duration_seconds:60,video_duration_seconds:0})).some(e=>e.property==='video_duration_seconds'),'Reject unreadable/pending duration');
  assert(!validateSync(dto({creator_max_duration_seconds:60,video_duration_seconds:5})).some(e=>e.property==='video_duration_seconds'));
  assert(!validateSync(dto({content_posting_method:'UPLOAD',privacy_level:undefined})).some(e=>e.property==='privacy_level'),'Inbox upload does not silently require a direct-post privacy choice');
  assert(validateSync(dto({disclose:true})).some(e=>e.property==='brand_content_toggle'),'Disclosure needs at least one brand choice');
  assert(validateSync(dto({brand_content_toggle:true})).some(e=>e.property==='brand_content_toggle'),'Branded content cannot be private');
  console.log(app+': fresh creator info, fail-closed privacy/interactions, private branded-content guard and server-side pull verified');
}
(async()=>{try {for(const app of process.env.ONPOST_VERIFY_SOURCE?['source']:['backend','orchestrator'])await run(app);} finally {global.fetch=realFetch;}})().catch(e=>{console.error(e);process.exitCode=1;});
