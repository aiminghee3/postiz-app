// Onpost modification, 2026-10-20: service-specific landing and native FAQ.
import { PublishingPreview } from './publishing-preview';
import styles from './onpost-landing.module.css';

const questions = [
  {
    question: '어떤 SNS를 연결할 수 있나요?',
    answer:
      'Instagram, Threads, YouTube의 콘텐츠를 준비하고 예약할 수 있어요. TikTok은 현재 승인된 Sandbox 테스트 계정만 연결할 수 있어요. 채널마다 연결 조건과 지원하는 게시물 형식이 다르며, 계정 연결 화면에서 확인할 수 있어요.',
  },
  {
    question: '같은 콘텐츠를 채널마다 다르게 올릴 수 있나요?',
    answer:
      '네. 하나의 콘텐츠를 준비한 뒤 채널에 맞게 게시글, 미디어와 지원되는 썸네일 설정을 조정할 수 있어요. 발행 전 각 채널의 설정을 확인해 주세요.',
  },
  {
    question: '예약한 뒤 컴퓨터를 켜 두어야 하나요?',
    answer:
      '아니요. 업로드와 예약이 완료되면 서버에서 발행을 처리해요. 컴퓨터를 끄거나 로컬 원본 파일을 정리해도 예약에 첨부한 미디어는 유지돼요. 발행 결과는 캘린더에서 확인할 수 있어요.',
  },
  {
    question: '댓글 자동 DM은 어떻게 사용하나요?',
    answer:
      'Instagram 게시물에 댓글 키워드와 보낼 메시지를 설정하는 방식이에요. 팔로우 확인 버튼과 링크 전달 흐름도 구성할 수 있어요. 별도의 메시지 권한 연결과 Meta의 계정·앱 조건 충족이 필요하며, 현재 운영자 워크스페이스에서 제공해요.',
  },
  {
    question: '지금 바로 가입해서 사용할 수 있나요?',
    answer:
      '현재는 승인된 계정으로 이용할 수 있어요. 이용 중인 계정이 있다면 로그인해서 연결된 채널과 발행 일정을 확인해 주세요.',
  },
];

export function OnpostLanding() {
  return (
    <div className={styles.landing} lang="ko">
      <a className={styles.skipLink} href="#main-content">
        본문으로 건너뛰기
      </a>
      <header className={styles.header}>
        <a href="/" className={styles.brand} aria-label="Onpost 홈">
          <img src="/onpost-icon.svg" width="36" height="36" alt="" />
          <span>Onpost</span>
        </a>
        <nav className={styles.nav} aria-label="주요 메뉴">
          <a href="#features">기능</a>
          <a href="#automation">댓글 자동 DM</a>
          <a href="#faq">자주 묻는 질문</a>
        </nav>
        <a className={styles.login} href="/auth/login">
          로그인
        </a>
      </header>

      <main id="main-content">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.intro}>콘텐츠 준비부터 예약 발행까지</p>
            <h1 id="hero-title">
              <span>
                올릴 콘텐츠는{' '}
                <span className={styles.keepTogether}>한 번에.</span>
              </span>{' '}
              <span>
                발행은 원하는{' '}
                <span className={styles.keepTogether}>시간에.</span>
              </span>
            </h1>
            <p className={styles.description}>
              SNS마다 오가며 올리던 콘텐츠.
              <br />
              Onpost에서 준비하고, 예약하고, 관리하세요.
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryButton} href="/auth/login">
                Onpost 열기
              </a>
              <a className={styles.textLink} href="#features">
                기능 살펴보기
              </a>
            </div>
            <p className={styles.accessNote}>
              현재 승인된 계정으로 이용할 수 있어요.
            </p>
          </div>
          <PublishingPreview />
        </section>

        <section className={styles.platforms} aria-label="주요 지원 채널">
          <p>따로 올리던 채널을 한곳에서</p>
          <div>
            <span>Instagram</span>
            <span>Threads</span>
            <span>YouTube</span>
            <span>
              TikTok <small>테스트</small>
            </span>
          </div>
        </section>

        <section
          id="features"
          className={styles.features}
          aria-labelledby="features-title"
        >
          <div className={styles.sectionHeading}>
            <h2 id="features-title">
              반복하는 업로드는 줄이고,
              <br />
              다음 콘텐츠에 집중하세요.
            </h2>
            <p>영상 한 편부터 여러 날의 발행 일정까지.</p>
          </div>
          <div className={styles.featureGrid}>
            <article>
              <span className={styles.step}>1. 콘텐츠 준비</span>
              <h3>한 번 올리고, 채널에 맞게.</h3>
              <p>
                영상과 이미지를 업로드하고 채널별 문구와 썸네일을 설정하세요. 각
                채널의 미리보기를 보며 다듬을 수 있어요.
              </p>
              <div className={styles.miniChannels} aria-hidden="true">
                <span>영상</span>
                <i />
                <span>Instagram</span>
                <span>Threads</span>
                <span>YouTube</span>
              </div>
            </article>
            <article>
              <span className={styles.step}>2. 발행 예약</span>
              <h3>내 일정에 맞춰 미리 예약.</h3>
              <p>
                원하는 날짜와 시간에 발행되도록 준비하세요. 예약을 마쳤다면
                컴퓨터를 켜 두지 않아도 돼요.
              </p>
              <div className={styles.miniTime} aria-hidden="true">
                <span>발행 시간</span>
                <strong>오후 7:00</strong>
                <span>예약</span>
              </div>
            </article>
            <article>
              <span className={styles.step}>3. 일정 관리</span>
              <h3>흩어진 일정을 한눈에.</h3>
              <p>
                초안부터 예약, 발행 결과까지 캘린더에서 확인하세요. 여러 채널의
                운영 흐름이 한곳에 모여요.
              </p>
              <div className={styles.miniStatus} aria-hidden="true">
                <span>초안</span>
                <span>예약됨</span>
                <span>발행됨</span>
              </div>
            </article>
          </div>
        </section>

        <section
          id="automation"
          className={styles.automation}
          aria-labelledby="automation-title"
        >
          <div className={styles.dmExample}>
            <div className={styles.exampleHeading}>
              <span>Instagram 댓글 자동 DM</span>
              <span>설정 예시</span>
            </div>
            <div className={styles.comment}>
              <span className={styles.avatar} aria-hidden="true">
                J
              </span>
              <div>
                <strong>게시물 댓글</strong>
                <p>자료 받고 싶어요!</p>
              </div>
            </div>
            <div className={styles.connector} aria-hidden="true" />
            <div className={styles.message}>
              <strong>미리 준비한 DM</strong>
              <p>
                요청하신 자료를 보내드릴게요.
                <br />
                팔로우 후 아래 버튼을 눌러 주세요.
              </p>
              <span className={styles.messageButton}>자료 받기</span>
            </div>
            <p className={styles.dmResult}>
              <span aria-hidden="true">✓</span> 팔로우 확인 후 설정한 링크 전달
            </p>
          </div>
          <div className={styles.automationCopy}>
            <h2 id="automation-title">
              발행 다음의 대화도
              <br />
              미리 준비하세요.
            </h2>
            <p>
              Instagram 댓글에 정해 둔 키워드가 달리면,
              <br className={styles.desktopBreak} /> 준비한 메시지를 DM으로
              보내는 흐름.
            </p>
            <ul>
              <li>게시물마다 댓글 키워드와 메시지 설정</li>
              <li>버튼을 누르면 팔로우 여부 확인</li>
              <li>사이트나 자료를 받을 수 있는 링크 전달</li>
            </ul>
            <p className={styles.availability}>
              운영자 워크스페이스에서 제공해요.
              <br />
              Instagram 메시지 권한과 Meta의 이용 조건이 필요해요.
            </p>
          </div>
        </section>

        <section id="faq" className={styles.faq} aria-labelledby="faq-title">
          <h2 id="faq-title">궁금한 점이 있나요?</h2>
          <div>
            {questions.map(({ question, answer }) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="cta-title">
          <img
            src="/onpost-icon.svg"
            alt=""
            width="48"
            height="48"
            loading="lazy"
          />
          <h2 id="cta-title">
            다음 게시물은,
            <br />
            Onpost에서 준비하세요.
          </h2>
          <a href="/auth/login" className={styles.primaryButton}>
            Onpost 열기
          </a>
          <p>현재 승인된 계정으로 이용할 수 있어요.</p>
        </section>
      </main>
      <div className={styles.footer}>
        <a href="/" className={styles.brand}>
          Onpost
        </a>
        <p>콘텐츠 준비부터 예약 발행까지, 한곳에서.</p>
        <a href="/open-source">오픈소스와 라이선스</a>
      </div>
      <div className={styles.business}>
        <nav aria-label="서비스 정책">
          <a href="/privacy">개인정보처리방침</a>
          <a href="/terms">이용약관</a>
          <a href="mailto:aimhee20@gmail.com">문의</a>
        </nav>
        <p>이누(eenu) · 대표 조준희 · 사업자등록번호 303-19-95204</p>
      </div>
    </div>
  );
}
