// Check the compiled providers used by both the API and the publishing worker.
// This generates an OAuth URL locally; it does not authenticate or call Google.
const assert = require('node:assert/strict');
const path = require('node:path');
require('reflect-metadata');

const expectedScopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/yt-analytics.readonly',
];

async function main() {
  const root = process.argv[2] || '/app';
  process.env.FRONTEND_URL = 'https://onpost.me';
  process.env.YOUTUBE_CLIENT_ID = 'oauth-scope-verification';
  process.env.YOUTUBE_CLIENT_SECRET = 'not-a-real-secret';
  for (const app of ['backend', 'orchestrator']) {
    const { YoutubeProvider } = require(path.join(root, 'apps', app, 'dist',
      'libraries/nestjs-libraries/src/integrations/social/youtube.provider.js'));
    const provider = new YoutubeProvider();
    const result = await provider.generateAuthUrl();
    const url = new URL(result.url);
    assert.deepEqual(url.searchParams.get('scope').split(' ').sort(),
      [...expectedScopes].sort(), `${app}: request only the scopes used by Onpost`);
    assert.equal(url.searchParams.get('redirect_uri'),
      'https://onpost.me/integrations/social/youtube');
    assert.equal(url.searchParams.get('access_type'), 'offline');
    assert.equal(url.searchParams.get('state'), result.state);
    console.log(`${app}: minimal scopes, callback, offline access and state verified`);
  }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
