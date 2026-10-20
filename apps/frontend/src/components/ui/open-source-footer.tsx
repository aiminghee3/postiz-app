// Onpost modification, 2026-10-20: visible attribution and source access.
export const OpenSourceFooter = () => (
  <footer className="flex min-h-[56px] shrink-0 flex-wrap items-center justify-center gap-x-[16px] gap-y-[4px] px-[20px] py-[12px] text-[12px] text-[#a3a3a3]">
    <span>Onpost</span>
    <a
      href="https://github.com/gitroomhq/postiz-app"
      target="_blank"
      rel="noopener noreferrer"
      className="underline hover:text-white"
    >
      Postiz 기반
    </a>
    <a href="/open-source" className="underline hover:text-white">
      오픈소스 · AGPL-3.0 · 소스코드
    </a>
  </footer>
);
