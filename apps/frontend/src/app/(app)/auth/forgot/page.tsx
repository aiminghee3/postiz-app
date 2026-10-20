// Onpost modification, 2026-10-20: service branding and open-source notices.
export const dynamic = 'force-dynamic';
import { Forgot } from '@gitroom/frontend/components/auth/forgot';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@gitroom/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Onpost' : 'Gitroom'} Forgot Password`,
  description: '',
};
export default async function Auth() {
  return <Forgot />;
}
