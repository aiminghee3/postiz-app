// Onpost modification, 2026-10-20: public service and platform disclosures.
import type { ReactNode } from 'react';
import styles from './onpost-landing.module.css';

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.landing} lang="ko">
      <header className={styles.header}>
        <a href="/" className={styles.brand} aria-label="Onpost 홈">
          <img src="/onpost-icon.svg" width="36" height="36" alt="" />
          Onpost
        </a>
        <a href="/auth/login" className={styles.login}>
          로그인
        </a>
      </header>
      <main className={styles.legal}>
        <h1>{title}</h1>
        <p className={styles.legalDate}>시행일: 2026년 10월 20일</p>
        {children}
        <section>
          <h2>운영자 및 문의</h2>
          <p>
            상호: 이누(eenu) · 대표: 조준희
            <br />
            사업자등록번호: 303-19-95204
            <br />
            문의 및 개인정보 보호 담당: 조준희 ·{' '}
            <a href="mailto:aimhee20@gmail.com">aimhee20@gmail.com</a>
          </p>
        </section>
        <nav className={styles.legalLinks} aria-label="서비스 안내">
          <a href="/">Onpost 홈</a>
          <a href="/privacy">개인정보처리방침</a>
          <a href="/terms">이용약관</a>
          <a href="/open-source">오픈소스와 라이선스</a>
        </nav>
      </main>
    </div>
  );
}
