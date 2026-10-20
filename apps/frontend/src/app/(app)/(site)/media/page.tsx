// Onpost modification, 2026-10-20: service branding and open-source notices.
import { MediaLayoutComponent } from '@gitroom/frontend/components/new-layout/layout.media.component';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@gitroom/helpers/utils/is.general.server.side';

export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Onpost' : 'Gitroom'} Media`,
  description: '',
};

export default async function Page() {
  return <MediaLayoutComponent />;
}
