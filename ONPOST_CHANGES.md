# Onpost modified version

This is an independently operated modified version of Postiz, licensed under
GNU AGPL version 3 or later. Original copyright notices and LICENSE are retained.
Postiz: Copyright (C) 2025 Nevo David.

## 2026-10-20

- Replace the service wordmark, app icon, titles and login introduction with Onpost.
- Remove upstream customer-count claims and testimonials from the Onpost login.
- Add visible attribution, an accessible public license page, the unchanged license
  text, and links to the exact deployed source commit and downloadable archive.
- Preserve the production v2.25.1 backend, Prisma schema, workers and dependencies.
- Add a Korean public landing page with channel previews, scheduling and Instagram
  comment-to-DM explanations. Preserve signed-in dashboard and invitation routing.
- Link landing calls to action to the existing login and disclose the current
  approved-account and operator-workspace availability instead of obsolete plans.
- Add public service terms and privacy disclosures with the operator's supplied
  business identity, platform permission revocation and deletion contact details.

## Reproduce this deployment

The `onpost/release` branch starts at upstream v2.25.1, commit
`91c91f633a0175fb3914dba64c932928c514b72a`. Its dependency lock, frontend layout and
Prisma schema were compared with the pinned production image before changes.
The upstream image includes the matching backend and its source. The complete
source of the modified application is in this repository at the deployed commit.

```sh
git clone https://github.com/aiminghee3/postiz-app.git
cd postiz-app
git checkout <commit linked by the deployed /open-source page>
docker build -f Dockerfile.onpost --build-arg ONPOST_SOURCE_REF="$(git rev-parse HEAD)" -t onpost:local .
```

Use the upstream Docker Compose installation with this image, your domain, and
your own private credentials. The original installation configuration is at
https://github.com/gitroomhq/postiz-docker-compose . Do not publish credentials or
user data. `Dockerfile.onpost` intentionally rebuilds only the frontend to keep the
existing backend and worker version unchanged. Future backend upgrades require
their own migration and deployment checks.
