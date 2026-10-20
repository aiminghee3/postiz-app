// Onpost modification, 2026-10-20: service branding and open-source notices.
export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { PlatformAnalytics } from '@gitroom/frontend/components/platform-analytics/platform.analytics';
import { isGeneralServerSide } from '@gitroom/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Onpost' : 'Gitroom'} Analytics`,
  description: '',
};
export default async function Index() {
  return <PlatformAnalytics />;
}
