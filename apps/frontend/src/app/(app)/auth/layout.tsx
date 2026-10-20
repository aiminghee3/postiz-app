// Onpost modification, 2026-10-20: service branding and open-source notices.

export const dynamic = 'force-dynamic';
import { ReactNode } from 'react';
import loadDynamic from 'next/dynamic';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';
import { MantineWrapper } from '@gitroom/react/helpers/mantine.wrapper';
import { Toaster } from '@gitroom/react/toaster/toaster';
const ReturnUrlComponent = loadDynamic(() => import('./return.url.component'));
export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <MantineWrapper>
      <Toaster />
      <div className="bg-[#0E0E0E] flex flex-1 p-[12px] gap-[12px] min-h-[calc(100dvh-56px)] w-full text-white">
        {/*<style>{`html, body {overflow-x: hidden;}`}</style>*/}
        <ReturnUrlComponent />
        <div className="flex flex-col py-[40px] px-[20px] flex-1 lg:w-[600px] lg:flex-none rounded-[12px] text-white p-[12px] bg-[#1A1919]">
          <div className="w-full max-w-[440px] mx-auto justify-center gap-[20px] h-full flex flex-col text-white">
            <LogoTextComponent />
            <div className="flex">{children}</div>
          </div>
        </div>
        <div className="flex-1 hidden lg:flex flex-col justify-center px-[56px] gap-[28px]">
          <span className="text-[14px] uppercase tracking-[0.2em] text-[#c4b5fd]">
            ONPOST
          </span>
          <h1 className="text-[48px] leading-[1.2] font-semibold max-w-[620px]">
            콘텐츠 준비부터
            <br />
            예약 발행까지, 한곳에서.
          </h1>
          <p className="text-[18px] leading-[1.8] text-[#a3a3a3] max-w-[540px]">
            연결한 소셜 계정의 콘텐츠와 일정을 Onpost에서 관리하세요.
          </p>
        </div>
      </div>
    </MantineWrapper>
  );
}
