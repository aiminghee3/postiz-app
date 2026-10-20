// Onpost modification, 2026-10-20: privacy notice for the deployed service.
import type { Metadata } from 'next';
import { LegalPage } from '@gitroom/frontend/components/landing/legal-page';

export const metadata: Metadata = {
  title: 'Onpost | 개인정보처리방침',
  alternates: { canonical: 'https://onpost.me/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="개인정보처리방침">
      <p>
        이누(이하 ‘운영자’)는 Onpost에서 계정 연결, 콘텐츠 준비, 예약 발행 및
        이용자가 설정한 Instagram 댓글 자동 DM 기능을 제공합니다. 이 방침은
        onpost.me 서비스에서 처리하는 정보에 적용됩니다.
      </p>
      <section>
        <h2>1. 처리하는 정보와 목적</h2>
        <ul>
          <li>
            서비스 계정: 이메일, 프로필 이름·사진, 로그인 인증 정보. 로그인과
            워크스페이스 관리에 사용합니다.
          </li>
          <li>
            연결한 SNS: 플랫폼 계정·채널 ID, 이름·사진, 이용자가 승인한 접근
            권한과 액세스·갱신 토큰. 채널 연결 유지와 요청한 API 기능 실행에
            사용합니다. SNS 비밀번호를 요구하거나 저장하지 않습니다.
          </li>
          <li>
            게시물: 업로드한 미디어, 썸네일, 게시글·댓글 문구, 예약 시각, 발행
            ID·상태·오류 내역. 콘텐츠 저장과 예약 발행, 결과 확인에 사용합니다.
          </li>
          <li>
            채널 통계: 권한과 플랫폼 지원 범위에서 게시물·채널 통계를 조회하여
            운영 화면에 표시합니다.
          </li>
          <li>
            Instagram 자동화: 설정한 게시물의 댓글 ID·문구·작성자 식별자,
            메시지·버튼 이벤트, 팔로우 확인 결과, 전송 내역. 설정된 키워드에
            응답하고 중복 전송을 방지하는 데 사용합니다.
          </li>
          <li>
            접속·보안 정보: 세션 쿠키, IP 주소, 요청 및 오류 로그. 로그인 유지,
            장애 대응과 비정상 접근 방지에 사용합니다.
          </li>
        </ul>
      </section>
      <section>
        <h2>2. 플랫폼으로 전송되는 정보</h2>
        <p>
          이용자가 채널을 연결하고 게시 또는 예약을 요청하면 해당 콘텐츠와
          실행에 필요한 인증 정보가 Instagram·Threads(Meta), YouTube(Google),
          TikTok의 API로 전송됩니다. 선택하지 않은 채널에 게시하지 않습니다.
          플랫폼 사업자는 각자의 약관과 개인정보처리방침에 따라 정보를 처리하며
          해외에서 처리할 수 있습니다.
        </p>
        <p>
          첨부 미디어는 외부 SNS가 가져갈 수 있는 URL에 저장됩니다. 이 주소를
          아는 사람은 미디어에 접근할 수 있으므로 비공개 보관이 필요한 파일은
          업로드하지 마세요. 계정 비밀번호나 인증 토큰을 미디어에 포함하지
          마세요.
        </p>
      </section>
      <section>
        <h2>3. Google·YouTube 데이터</h2>
        <p>
          Onpost는 YouTube API Services를 사용합니다. Google 계정 정보는 로그인
          및 연결 계정 식별에, YouTube 채널·영상 정보는 이용자가 요청한 업로드,
          메타데이터·댓글 관리 및 통계 표시에 사용합니다. Google·YouTube
          데이터를 판매하거나 광고 타기팅, 범용 AI·ML 모델 학습에 사용하지
          않습니다.
        </p>
        <p>
          Onpost는{' '}
          <a href="https://developers.google.com/terms/api-services-user-data-policy">
            Google API Services User Data Policy
          </a>
          와 Limited Use 요구사항을 준수합니다. Onpost complies with the Google
          API Services User Data Policy, including its Limited Use requirements.
        </p>
        <p>
          Google 계정의{' '}
          <a href="https://security.google.com/settings/security/permissions">
            연결된 앱 관리
          </a>
          에서 Onpost 접근 권한을 직접 철회할 수 있습니다. 관련 정보 삭제는 아래
          문의 이메일로 요청할 수 있습니다. Google의 정보 처리는{' '}
          <a href="https://policies.google.com/privacy">
            Google 개인정보처리방침
          </a>
          을 참고하세요.
        </p>
      </section>
      <section>
        <h2>4. 보관 및 삭제</h2>
        <p>
          계정과 콘텐츠는 서비스 제공에 필요한 동안 보관합니다. 채널 연결 해제는
          외부 플랫폼의 권한 철회나 저장 정보의 영구 삭제와 별개입니다.
          계정·연결 정보·미디어·자동화 이력의 삭제를 원하면 가입 이메일과 삭제
          범위를 적어 aimhee20@gmail.com으로 요청해 주세요. 본인 확인 후
          처리하며, Google·YouTube 승인 데이터 삭제 요청은 7일 이내 처리합니다.
          법령상 보관 의무가 있는 자료는 해당 기간 후 삭제합니다.
        </p>
        <p>
          운영 백업에는 삭제 전 정보가 일정 기간 남을 수 있으며 서비스 복구 외
          목적으로 사용하지 않습니다. 이미 SNS에 게시된 콘텐츠는 해당 플랫폼에서
          별도로 삭제해야 합니다. Meta의 앱·웹사이트 설정과 TikTok의 앱 권한
          설정에서도 접근 권한을 해제할 수 있습니다.
        </p>
      </section>
      <section>
        <h2>5. 서비스 운영 및 보호 조치</h2>
        <p>
          서비스와 저장소는 Google Cloud에서 운영합니다. 운영에 필요한 범위에서
          호스팅 사업자가 정보를 처리합니다. HTTPS, 접근 권한 제한 및 서버 접근
          통제로 정보를 보호합니다. 운영자는 장애 대응·보안·지원에 필요한
          범위에서만 정보를 확인합니다. 법적 요구가 있는 경우 필요한 범위의
          정보를 제공할 수 있습니다.
        </p>
      </section>
      <section>
        <h2>6. 이용자의 권리와 쿠키</h2>
        <p>
          정보 열람·정정·삭제·처리 정지와 권한 철회 관련 문의는 아래 이메일로
          접수합니다. 세션 및 언어 설정 쿠키는 서비스 이용에 사용되며,
          브라우저에서 차단하거나 삭제할 수 있습니다. 쿠키를 차단하면 로그인이
          제한될 수 있습니다. 이 방침의 중요한 변경은 사이트를 통해 안내합니다.
        </p>
      </section>
    </LegalPage>
  );
}
