// Onpost modification, 2026-10-20: public service landing page.
import type { Metadata } from 'next';
import { OnpostLanding } from '@gitroom/frontend/components/landing/onpost-landing';

export const metadata: Metadata = {
  title: 'Onpost | SNS 콘텐츠 준비부터 예약 발행까지',
  description:
    'Instagram, Threads, YouTube 콘텐츠를 한곳에서 준비하고 예약하세요. 채널별 게시글과 썸네일, 발행 일정, Instagram 댓글 자동 DM까지 Onpost에서 관리하세요.',
  alternates: { canonical: 'https://onpost.me' },
  openGraph: {
    title: 'Onpost | 콘텐츠 준비부터 예약 발행까지',
    description: '여러 SNS의 게시글과 발행 일정을 한곳에서 관리하세요.',
    url: 'https://onpost.me',
    siteName: 'Onpost',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function HomePage() {
  return <OnpostLanding />;
}
