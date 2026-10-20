// Exercise the real composer store in an isolated process, without publishing.
const assert = require('node:assert/strict');
const Module = require('node:module');
require('ts-node').register({transpileOnly:true,project:'/app/apps/backend/tsconfig.json',moduleTypes:{'/app/apps/frontend/**/*':'cjs'}});
require('tsconfig-paths').register({baseUrl:'/app',paths:{'@gitroom/frontend/*':['apps/frontend/src/*']}});
const load = Module._load;
Module._load = function(id, ...args) {
  if (id.endsWith('/set.timezone')) return {newDayjs: () => require('dayjs')()};
  return load.call(this, id, ...args);
};
const {useLaunchStore} = require('/app/apps/frontend/src/components/new-launch/store.ts');
const state = () => useLaunchStore.getState();
state().setPublishBlocker('a','Choose privacy');
state().setPublishBlocker('b','Select disclosure');
assert.deepEqual(state().publishBlockers,{a:'Choose privacy',b:'Select disclosure'});
state().setPublishBlocker('a',undefined);
assert.deepEqual(state().publishBlockers,{b:'Select disclosure'});
const same = state().publishBlockers;
state().setPublishBlocker('b','Select disclosure');
assert.equal(state().publishBlockers,same,'Unchanged reason must not trigger a render loop');
state().reset();
assert.deepEqual(state().publishBlockers,{});
assert.equal(state().selectedIntegrations.length,0);
console.log('Composer blockers: channel isolation, clearing, no-op update and reset verified');
