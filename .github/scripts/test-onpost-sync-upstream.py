"""Exercise fork synchronization against disposable Git repositories, never GitHub."""
import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest

SCRIPT = Path(__file__).with_name('onpost-sync-upstream.sh')


class ForkSyncTests(unittest.TestCase):
    def git(self, *args, cwd=None):
        return subprocess.check_output(['git', *args], cwd=cwd or self.work,
                                       stderr=subprocess.PIPE, text=True).strip()

    def commit(self, name, content, cwd=None):
        folder = cwd or self.work
        (folder / name).write_text(content)
        self.git('add', name, cwd=folder)
        self.git('commit', '-m', 'Update ' + name, cwd=folder)
        return self.git('rev-parse', 'HEAD', cwd=folder)

    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.work = self.root / 'work'
        self.upstream = self.root / 'upstream.git'
        self.origin = self.root / 'origin.git'
        self.work.mkdir()
        self.git('init', '--initial-branch=main')
        self.git('config', 'user.name', 'Test')
        self.git('config', 'user.email', 'test@example.invalid')
        self.commit('app.txt', 'base\n')
        for remote in (self.upstream, self.origin):
            self.git('init', '--bare', '--initial-branch=main', str(remote))
            self.git('push', str(remote), 'HEAD:main')
        self.git('remote', 'add', 'origin', str(self.origin))
        self.source = self.root / 'source'
        self.git('clone', str(self.upstream), str(self.source))
        self.git('config', 'user.name', 'Upstream', cwd=self.source)
        self.git('config', 'user.email', 'upstream@example.invalid', cwd=self.source)
        self.bin = self.root / 'bin'
        self.bin.mkdir()
        self.calls = self.root / 'gh-calls.jsonl'
        gh = self.bin / 'gh'
        gh.write_text('''#!/usr/bin/env python3
import json,os,sys,subprocess,tempfile
from pathlib import Path
args=sys.argv[1:]
record={'args':args}
if '-F' in args:
    for i,a in enumerate(args):
        if a=='-F' and args[i+1].startswith('body=@'):
            record['body']=Path(args[i+1][6:]).read_text()
with open(os.environ['TEST_GH_CALLS'],'a') as f:f.write(json.dumps(record)+'\\n')
if args[:4]==['api','--method','POST','repos/test/fork/merges']:
    fields=dict(args[i+1].split('=',1) for i,a in enumerate(args) if a=='-f')
    assert fields['base']=='main'
    with tempfile.TemporaryDirectory() as tmp:
        def git(*xs):subprocess.run(['git',*xs],cwd=tmp,check=True,stdout=subprocess.DEVNULL)
        git('clone',os.environ['TEST_ORIGIN'],'.')
        git('config','user.name','GitHub API fixture')
        git('config','user.email','api@example.invalid')
        git('fetch',os.environ['SYNC_UPSTREAM_URL'],'main')
        git('merge','--no-edit',fields['head'])
        git('push','origin','HEAD:main')
    print('{}')
elif args[:4]==['api','--method','GET','repos/test/fork/pulls']:print(os.environ.get('TEST_EXISTING_PR',''))
elif args[:4]==['api','--method','POST','repos/test/fork/pulls']:print('https://github.com/test/fork/pull/1')
else:sys.exit(2)
''')
        gh.chmod(0o755)
        self.env = {**os.environ, 'PATH': str(self.bin) + os.pathsep + os.environ['PATH'],
                    'SYNC_REPOSITORY': 'test/fork', 'SYNC_UPSTREAM_URL': str(self.upstream),
                    'TEST_ORIGIN': str(self.origin),
                    'TEST_GH_CALLS': str(self.calls),
                    'GITHUB_STEP_SUMMARY': str(self.root / 'summary.md')}

    def run_sync(self):
        return subprocess.run(['bash', str(SCRIPT)], cwd=self.work, env=self.env,
                              text=True, capture_output=True)

    def origin_head(self):
        return self.git('--git-dir=' + str(self.origin), 'rev-parse', 'main')

    def source_change(self, name, content):
        sha = self.commit(name, content, cwd=self.source)
        self.git('push', 'origin', 'main', cwd=self.source)
        return sha

    def gh_calls(self):
        return [json.loads(line) for line in self.calls.read_text().splitlines()] if self.calls.exists() else []

    def test_no_change_leaves_main_untouched(self):
        before = self.origin_head()
        result = self.run_sync()
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(self.origin_head(), before)
        self.assertEqual(self.gh_calls(), [])

    def test_merges_upstream_and_preserves_custom_commits(self):
        ours = self.commit('onpost.txt', 'custom settings\n')
        self.git('push', 'origin', 'HEAD:main')
        upstream = self.source_change('feature.txt', 'new upstream feature\n')
        result = self.run_sync()
        self.assertEqual(result.returncode, 0, result.stderr)
        head = self.origin_head()
        self.git('merge-base', '--is-ancestor', ours, head)
        self.git('merge-base', '--is-ancestor', upstream, head)
        self.assertEqual(self.git('--git-dir=' + str(self.origin), 'show', 'main:onpost.txt'), 'custom settings')
        self.assertEqual(self.git('--git-dir=' + str(self.origin), 'show', 'main:feature.txt'), 'new upstream feature')
        self.assertEqual(len([x for x in self.gh_calls() if x['args'][3]=='repos/test/fork/merges']), 1)

    def test_conflict_keeps_main_and_opens_review_with_qa(self):
        self.commit('app.txt', 'onpost version\n')
        self.git('push', 'origin', 'HEAD:main')
        before = self.origin_head()
        upstream = self.source_change('app.txt', 'upstream version\n')
        result = self.run_sync()
        self.assertEqual(result.returncode, 2, result.stderr)
        self.assertEqual(self.origin_head(), before)
        created = [x for x in self.gh_calls() if x['args'][:4] == ['api', '--method', 'POST', 'repos/test/fork/pulls']]
        self.assertEqual(len(created), 1)
        self.assertIn('# QA\n', created[0]['body'])
        self.assertIn('app.txt', created[0]['body'])
        self.assertIn('head=gitroomhq:main', created[0]['args'])

    def test_rerun_reuses_existing_conflict_pr(self):
        self.commit('app.txt', 'ours\n')
        self.git('push', 'origin', 'HEAD:main')
        self.source_change('app.txt', 'theirs\n')
        first = self.run_sync()
        self.assertEqual(first.returncode, 2, first.stderr)
        self.env['TEST_EXISTING_PR'] = 'https://github.com/test/fork/pull/1'
        second = self.run_sync()
        self.assertEqual(second.returncode, 2, second.stderr)
        self.assertEqual(len([x for x in self.gh_calls() if x['args'][:4] == ['api', '--method', 'POST', 'repos/test/fork/pulls']]), 1)

    def test_dirty_checkout_is_not_discarded(self):
        self.source_change('feature.txt', 'upstream\n')
        before = self.origin_head()
        (self.work / 'app.txt').write_text('unsaved work\n')
        result = self.run_sync()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('dirty', result.stderr)
        self.assertEqual(self.origin_head(), before)
        self.assertEqual((self.work / 'app.txt').read_text(), 'unsaved work\n')

    def test_rejected_push_does_not_report_success(self):
        self.source_change('feature.txt', 'upstream\n')
        before = self.origin_head()
        hook = self.origin / 'hooks/pre-receive'
        hook.write_text('#!/bin/sh\nexit 1\n')
        hook.chmod(0o755)
        result = self.run_sync()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('pre-receive hook declined', result.stderr)
        self.assertEqual(self.origin_head(), before)


if __name__ == '__main__':
    unittest.main()
