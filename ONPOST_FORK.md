# Onpost source fork

- Fork: https://github.com/aiminghee3/postiz-app
- Upstream: https://github.com/gitroomhq/postiz-app
- Default branch: `main`. Keep Onpost customizations as normal commits here or merge
  reviewed feature branches into it. The existing AGPL license and attribution remain.

## Upstream updates

**Onpost upstream sync** checks upstream `main` daily at **06:17 Asia/Seoul**
(`17 21 * * *` UTC). GitHub may delay scheduled jobs. It also has a manual run button:

```sh
gh workflow run onpost-sync-upstream.yml --repo aiminghee3/postiz-app
gh run list --repo aiminghee3/postiz-app --workflow onpost-sync-upstream.yml
```

The workflow merges upstream into this fork without resetting main or force-pushing.
Nonconflicting custom changes and their history are retained. Conflicts leave main
untouched, open an update pull request directly from `gitroomhq:main` into this
fork, and mark the run as needing attention. Re-runs reuse that open PR. To resolve
conflicts, create a repair branch in this fork from `origin/main`, merge
`upstream/main`, and open a replacement PR with the resolved changes. The original
upstream repository is never modified. A rejected API merge fails without
overwriting newer commits. Successful merges verify both histories are retained.

No personal access token is stored in this repository. The workflow uses the
temporary repository-scoped `GITHUB_TOKEN` with contents and pull-request write
permissions. GitHub's server-side merge API handles upstream workflow-file updates
without granting a long-lived token workflow access. Repository Actions settings
allow workflow-created pull requests.
Other workflows inherited from upstream stay disabled until intentionally adapted
for this fork (some upstream build workflows target the upstream's image registry).
GitHub may disable scheduled workflows after 60 days of repository inactivity; if
that happens, enable **Onpost upstream sync** again on the Actions page.

## Local checkout

The initial checkout is `/Users/admin/orca/projects/postiz-app`:

```sh
git remote -v
# origin   https://github.com/aiminghee3/postiz-app.git
# upstream https://github.com/gitroomhq/postiz-app.git

git fetch --all --prune
git pull --ff-only origin main
python3 .github/scripts/test-onpost-sync-upstream.py -v
```

The sync checks use real temporary Git repositories and a fake GitHub API boundary.
They never modify the real fork or publish application content.

## Deployment boundary

Synchronizing this repository does **not** build or deploy an image, change
`onpost.me`, open registration, or copy production configuration into this public
fork. The existing private deployment/DM automation checkout remains at
`/Users/admin/orca/projects/onpost`; it is not the Postiz application source.
Switching production to a fork-built image and enabling general registration are
the next deployment steps, with database backup and migration checks as needed.
