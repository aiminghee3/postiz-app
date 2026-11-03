// Onpost modification, 2026-11-03: redesigned public landing and native FAQ.
import { PublishingPreview } from './publishing-preview';
import styles from './landing.module.css';

const channels = [
  { name: 'Instagram', tone: 'ig', detail: '릴스 · 피드' },
  { name: 'Threads', tone: 'th', detail: '텍스트 · 이미지' },
  { name: 'YouTube', tone: 'yt', detail: 'Shorts · 동영상' },
  { name: 'TikTok', tone: 'tt', detail: '영상 게시' },
];

const features = [
  {
    title: '한 번 올리고, 채널마다 다르게',
    body: '영상과 이미지를 한 번만 업로드하고 채널별 문구와 썸네일을 따로 다듬어요.',
    wide: true,
  },
  {
    title: '서버에서 예약 발행',
    body: '예약을 마치면 컴퓨터를 꺼도 정해진 시간에 발행돼요.',
  },
  {
    title: '캘린더로 한눈에',
    body: '초안, 예약, 발행 결과를 채널 구분 없이 한 화면에서 확인해요.',
  },
  {
    title: '발행 결과 추적',
    body: '게시가 끝나면 상태가 바뀌고, 실패한 게시물은 바로 확인할 수 있어요.',
  },
  {
    title: 'Instagram 댓글 자동 DM',
    body: '키워드 댓글에 준비한 메시지와 링크를 DM으로 보내요.',
  },
];

const questions = [
  {
    question: '어떤 SNS를 연결할 수 있나요?',
    answer:
      'Instagram, Threads, YouTube, TikTok 계정을 연결할 수 있어요. 채널마다 연결 조건과 지원하는 게시물 형식이 다르며, 계정 연결 화면에서 확인할 수 있어요.',
  },
  {
    question: 'TikTok에는 어떻게 게시되나요?',
    answer:
      'TikTok 계정을 연결하면 준비한 영상을 업로드하고 게시할 수 있어요. 게시 전에 연결된 계정을 확인하고, 공개 범위와 댓글·듀엣·스티치 허용 여부를 직접 선택해요. 연결은 TikTok 앱 설정에서 언제든 해제할 수 있어요.',
  },
  {
    question: '예약한 뒤 컴퓨터를 켜 두어야 하나요?',
    answer:
      '아니요. 업로드와 예약이 끝나면 서버에서 발행을 처리해요. 발행 결과는 캘린더에서 확인할 수 있어요.',
  },
  {
    question: '댓글 자동 DM은 어떻게 사용하나요?',
    answer:
      'Instagram 게시물에 댓글 키워드와 보낼 메시지를 설정해요. 팔로우 확인 버튼과 링크 전달 흐름도 구성할 수 있어요. Instagram 메시지 권한 연결이 필요해요.',
  },
  {
    question: '지금 바로 가입할 수 있나요?',
    answer:
      '현재는 초대받은 워크스페이스 중심으로 운영하고 있어요. 이용을 원하시면 문의 이메일로 연락해 주세요. 이미 계정이 있다면 바로 로그인할 수 있어요.',
  },
];

export function OnpostLanding() {
  return (
    <div className={styles.page} lang="ko">
      <a className={styles.skip} href="#main-content">
        본문으로 건너뛰기
      </a>

      <div className={styles.dark}>
        <header className={styles.header}>
          <a href="/" className={styles.brand} aria-label="Onpost 홈">
            <img src="/onpost-icon.svg" width="32" height="32" alt="" />
            <span>Onpost</span>
          </a>
          <nav className={styles.nav} aria-label="주요 메뉴">
            <a href="#features">기능</a>
            <a href="#tiktok">TikTok</a>
            <a href="#automation">자동 DM</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className={styles.ghostButton} href="/auth/login">
            로그인
          </a>
        </header>

        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span /> SNS 예약 발행 · Social media scheduler
            </p>
            <h1 id="hero-title">
              한 번 만들고,
              <br />
              <em>모든 채널</em>에 올리세요.
            </h1>
            <p className={styles.lead}>
              Instagram, Threads, YouTube, TikTok 게시물을 한곳에서 준비하고
              원하는 시간에 발행하세요.
            </p>
            <p className={styles.leadEn}>
              Prepare, schedule and publish to Instagram, Threads, YouTube and
              TikTok from one dashboard.
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryButton} href="/auth/login">
                Onpost 시작하기
              </a>
              <a className={styles.textButton} href="#features">
                기능 둘러보기 →
              </a>
            </div>
          </div>
          <PublishingPreview />
        </section>

        <section className={styles.channels} aria-label="연결 가능한 채널">
          {channels.map(({ name, tone, detail }) => (
            <div key={name} className={styles.channel}>
              <span
                className={styles.dot}
                data-tone={tone}
                aria-hidden="true"
              />
              <div>
                <strong>{name}</strong>
                <small>{detail}</small>
              </div>
            </div>
          ))}
        </section>
      </div>

      <main id="main-content">
        <section
          id="features"
          className={styles.section}
          aria-labelledby="features-title"
        >
          <p className={styles.kicker}>Features</p>
          <h2 id="features-title">
            반복하는 업로드는 줄이고,
            <br />
            다음 콘텐츠에 집중하세요.
          </h2>
          <div className={styles.bento}>
            {features.map(({ title, body, wide }) => (
              <article key={title} className={wide ? styles.wide : undefined}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="steps-title">
          <p className={styles.kicker}>How it works</p>
          <h2 id="steps-title">세 단계면 충분해요.</h2>
          <ol className={styles.steps}>
            <li>
              <b>01</b>
              <h3>계정 연결</h3>
              <p>각 플랫폼의 공식 로그인으로 채널을 연결해요.</p>
            </li>
            <li>
              <b>02</b>
              <h3>콘텐츠 준비</h3>
              <p>미디어를 올리고 채널별 문구와 설정을 정해요.</p>
            </li>
            <li>
              <b>03</b>
              <h3>예약 발행</h3>
              <p>날짜와 시간을 고르면 Onpost가 대신 게시해요.</p>
            </li>
          </ol>
        </section>

        <section
          id="tiktok"
          className={`${styles.section} ${styles.split}`}
          aria-labelledby="tiktok-title"
        >
          <div>
            <p className={styles.kicker}>TikTok</p>
            <h2 id="tiktok-title">
              TikTok 게시도
              <br />
              내가 정한 그대로.
            </h2>
            <p className={styles.body}>
              게시 전에 연결된 TikTok 계정을 확인하고, 공개 범위와 상호작용
              설정을 직접 선택해요. Onpost는 선택하지 않은 설정을 임의로 정하지
              않아요.
            </p>
            <ul className={styles.checks}>
              <li>게시할 계정의 닉네임과 프로필 확인</li>
              <li>공개 범위 직접 선택 (기본값 없음)</li>
              <li>댓글 · 듀엣 · 스티치 허용 여부 선택</li>
              <li>음악 사용 확인 동의 후 게시</li>
            </ul>
          </div>
          <div className={styles.ttCard} aria-hidden="true">
            <div className={styles.ttHead}>
              <span className={styles.dot} data-tone="tt" />
              <div>
                <strong>@my_store</strong>
                <small>TikTok 계정</small>
              </div>
            </div>
            <label>공개 범위</label>
            <div className={styles.select}>선택해 주세요 ▾</div>
            <div className={styles.toggles}>
              <span>
                댓글 허용 <i data-on="true" />
              </span>
              <span>
                듀엣 허용 <i />
              </span>
              <span>
                스티치 허용 <i />
              </span>
            </div>
            <p className={styles.consent}>
              게시하면 TikTok의 음악 사용 확인에 동의하게 돼요.
            </p>
            <b className={styles.ttButton}>TikTok에 게시</b>
          </div>
        </section>

        <section
          id="automation"
          className={`${styles.section} ${styles.split} ${styles.reverse}`}
          aria-labelledby="automation-title"
        >
          <div>
            <p className={styles.kicker}>Instagram DM</p>
            <h2 id="automation-title">
              발행 다음의 대화도
              <br />
              미리 준비하세요.
            </h2>
            <p className={styles.body}>
              게시물에 정해 둔 키워드 댓글이 달리면, 준비한 메시지를 DM으로
              보내요.
            </p>
            <ul className={styles.checks}>
              <li>게시물마다 키워드와 메시지 설정</li>
              <li>버튼을 누르면 팔로우 여부 확인</li>
              <li>사이트나 자료 링크 전달</li>
            </ul>
          </div>
          <div className={styles.chat} aria-hidden="true">
            <div className={styles.bubbleIn}>
              <small>게시물 댓글</small>
              자료 받고 싶어요!
            </div>
            <div className={styles.bubbleOut}>
              요청하신 자료를 보내드릴게요.
              <br />
              팔로우 후 아래 버튼을 눌러 주세요.
              <b>자료 받기</b>
            </div>
            <p className={styles.chatNote}>✓ 팔로우 확인 후 링크 전달</p>
          </div>
        </section>

        <section
          id="faq"
          className={styles.section}
          aria-labelledby="faq-title"
        >
          <p className={styles.kicker}>FAQ</p>
          <h2 id="faq-title">궁금한 점이 있나요?</h2>
          <div className={styles.faq}>
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
          <h2 id="cta-title">
            다음 게시물은,
            <br />
            Onpost에서 준비하세요.
          </h2>
          <div className={styles.actions}>
            <a href="/auth/login" className={styles.primaryButton}>
              Onpost 시작하기
            </a>
            <a href="mailto:aimhee20@gmail.com" className={styles.textButton}>
              이용 문의 →
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div>
          <a href="/" className={styles.brand}>
            <img src="/onpost-icon.svg" width="24" height="24" alt="" />
            <span>Onpost</span>
          </a>
          <p>
            Onpost is a social media scheduling service operated by eenu,
            Republic of Korea.
          </p>
        </div>
        <nav aria-label="서비스 정책">
          <a href="/privacy">개인정보처리방침</a>
          <a href="/terms">이용약관</a>
          <a href="/open-source">오픈소스</a>
          <a href="mailto:aimhee20@gmail.com">문의</a>
        </nav>
        <p className={styles.business}>
          이누(eenu) · 대표 조준희 · 사업자등록번호 303-19-95204 ·
          aimhee20@gmail.com
        </p>
      </footer>
    </div>
  );
}
