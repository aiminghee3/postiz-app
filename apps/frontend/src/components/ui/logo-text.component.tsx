// Onpost modification, 2026-10-20: original service wordmark.
import { Logo } from '@gitroom/frontend/components/new-layout/logo';

export const LogoTextComponent = () => (
  <div className="flex items-center gap-[12px]" aria-label="Onpost">
    <Logo />
    <span className="text-[34px] leading-none font-semibold tracking-[-1.5px]">
      Onpost
    </span>
  </div>
);
