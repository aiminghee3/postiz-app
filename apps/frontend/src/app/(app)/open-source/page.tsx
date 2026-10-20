// Onpost modification, 2026-10-20: public license and deployed corresponding source.
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Onpost · 오픈소스 라이선스와 소스코드',
};

export default async function OpenSourcePage() {
  const configuredRef = process.env.ONPOST_SOURCE_REF || '';
  const sourceRef = /^[a-f0-9]{40}$/.test(configuredRef)
    ? configuredRef
    : 'onpost/release';
  const repository = 'https://github.com/aiminghee3/postiz-app';
  const sourceUrl = `${repository}/tree/${sourceRef}`;
  const archiveUrl = `${repository}/archive/${sourceRef}.tar.gz`;
  const license = await readFile(
    path.join(process.cwd(), 'public/open-source/LICENSE.txt'),
    'utf8'
  );

  return (
    <main className="mx-auto w-full max-w-[1000px] flex-1 px-[24px] py-[48px] text-[#e5e5e5]">
      <a href="/" className="inline-block mb-[40px]" aria-label="Onpost 홈">
        <LogoTextComponent />
      </a>
      <h1 className="text-[32px] font-semibold mb-[24px]">
        오픈소스 라이선스와 소스코드
      </h1>
      <div className="flex flex-col gap-[20px] text-[16px] leading-[1.9]">
        <p>
          Onpost는 Postiz를 수정한 독립 운영 서비스입니다. Postiz 공식 서비스나
          공식 제휴 서비스가 아닙니다.
        </p>
        <p>
          Postiz — Social media schedule tool
          <br />
          Copyright (C) 2025 Nevo David. 원본 및 각 파일의 저작권 고지를
          유지합니다.
        </p>
        <p>
          이 프로그램은 GNU Affero General Public License 버전 3 또는 그 이후
          버전의 조건에 따라 사용, 수정, 재배포할 수 있습니다. 라이선스가
          허용하는 범위에서 상품성·특정 목적 적합성 등을 포함한 보증 없이
          제공됩니다.
        </p>
        <section>
          <h2 className="text-[22px] font-semibold mb-[12px]">
            이 서버에서 실행 중인 버전의 소스
          </h2>
          <p>
            수정 사항과 빌드·설치 방법이 포함된 해당 버전의 소스를 무료로
            열람하고 내려받을 수 있습니다.
          </p>
          <div className="flex flex-wrap gap-[20px] mt-[12px]">
            <a className="underline text-[#c4b5fd]" href={sourceUrl}>
              배포 버전 소스 보기
            </a>
            <a className="underline text-[#c4b5fd]" href={archiveUrl}>
              전체 소스 내려받기
            </a>
            <a
              className="underline text-[#c4b5fd]"
              href="https://github.com/gitroomhq/postiz-app"
            >
              Postiz 원본
            </a>
          </div>
          <p className="text-[12px] mt-[12px] break-all">
            소스 버전: {sourceRef}
          </p>
        </section>
        <section>
          <h2 className="text-[22px] font-semibold mb-[12px]">
            Onpost 변경 사항
          </h2>
          <p>
            2026-10-20: 서비스명, 로고, 파비콘, 페이지 제목과 로그인 안내를
            Onpost로 변경하고 이 라이선스 안내 및 소스 제공 링크를 추가했습니다.
            변경 내역은 소스의 ONPOST_CHANGES.md에서 확인할 수 있습니다.
          </p>
        </section>
        <section>
          <h2 className="text-[22px] font-semibold mb-[12px]">라이선스 전문</h2>
          <a
            className="underline text-[#c4b5fd]"
            href="/open-source/LICENSE.txt"
          >
            원문 파일 열기
          </a>
          <pre className="mt-[16px] max-h-[480px] overflow-auto whitespace-pre-wrap rounded-[12px] bg-[#171717] p-[20px] text-[12px] leading-[1.7]">
            {license}
          </pre>
        </section>
      </div>
    </main>
  );
}
