// Onpost modification, 2026-10-20: terms for the independently operated service.
import type { Metadata } from 'next';
import { LegalPage } from '@gitroom/frontend/components/landing/legal-page';

export const metadata: Metadata = {
  title: 'Onpost | 이용약관',
  alternates: { canonical: 'https://onpost.me/terms' },
};

export default function TermsPage() {
  return (
    <LegalPage title="이용약관">
      <p>
        이 약관은 이누가 운영하는 Onpost 서비스 이용에 적용됩니다. 서비스를
        이용하기 전에 약관과 개인정보처리방침을 확인해 주세요.
      </p>
      <section>
        <h2>1. 서비스와 이용 자격</h2>
        <p>
          Onpost는 SNS 계정을 연결하여 콘텐츠를 작성·저장·예약·발행하고 발행
          결과를 확인하는 도구입니다. 일부 워크스페이스에는 Instagram 댓글 자동
          DM을 제공합니다. 현재 승인된 계정으로 이용할 수 있으며, 플랫폼별 연결
          및 기능은 앱 승인 상태, 계정 유형, 권한과 API 지원 범위에 따라 제한될
          수 있습니다.
        </p>
      </section>
      <section>
        <h2>2. 계정 및 연결 권한</h2>
        <p>
          이용자는 본인이 관리 권한을 가진 계정만 연결해야 합니다. 로그인 정보와
          API 키를 안전하게 관리하고, 연결 화면에서 요청 권한을 확인해 주세요.
          타인의 계정 무단 연결, 스팸·기만 행위와 플랫폼 제한 우회는 허용되지
          않습니다.
        </p>
      </section>
      <section>
        <h2>3. 게시물과 예약</h2>
        <p>
          이용자는 업로드한 영상·이미지·음원·문구의 이용 권리를 확보해야 하며
          게시 내용과 수신 대상에 책임을 집니다. 콘텐츠의 권리는 이용자 또는
          정당한 권리자에게 있습니다. 운영자는 요청한 저장·예약·발행을 처리하는
          범위에서 콘텐츠를 사용합니다.
        </p>
        <p>
          예약 전 채널, 공개 범위, 시각과 시간대를 확인해 주세요. 외부 플랫폼
          장애, 권한 만료, 업로드 제한 등으로 발행이 지연되거나 실패할 수
          있으므로 발행 결과를 확인해 주세요. 예약 발행 기능은 플랫폼 내부 음원
          카탈로그의 이용 권한을 제공하지 않습니다.
        </p>
      </section>
      <section>
        <h2>4. 외부 플랫폼 약관</h2>
        <p>
          Onpost는 Meta, Google·YouTube 및 TikTok의 공식 서비스나 제휴 서비스가
          아닙니다. 각 플랫폼을 연결하고 사용할 때 해당 플랫폼의 이용약관과
          정책이 함께 적용됩니다.
        </p>
        <p>
          YouTube 기능 이용에는{' '}
          <a href="https://www.youtube.com/t/terms">YouTube 서비스 약관</a>이
          적용되며, Google 데이터 처리는{' '}
          <a href="https://policies.google.com/privacy">
            Google 개인정보처리방침
          </a>
          을 참고하세요.{' '}
          <a href="https://www.tiktok.com/legal/page/row/terms-of-service/en">
            TikTok 서비스 약관
          </a>
          과{' '}
          <a href="https://help.instagram.com/581066165581870">
            Instagram 이용약관
          </a>
          도 준수해야 합니다.
        </p>
      </section>
      <section>
        <h2>5. 자동 DM</h2>
        <p>
          자동 DM은 이용자가 설정한 키워드와 메시지 흐름에 따라 동작합니다.
          이용자는 필요한 권한과 수신자 대상 조건을 확인하고 관련 법령 및
          플랫폼의 메시지 정책을 준수해야 합니다. 플랫폼의 이벤트 전달과 조회
          결과에 따라 응답이 지연되거나 실행되지 않을 수 있습니다.
        </p>
      </section>
      <section>
        <h2>6. 이용 제한·종료와 변경</h2>
        <p>
          법령·플랫폼 정책 위반, 무단 접근 또는 서비스 운영에 대한 중대한 방해가
          있으면 이용을 제한할 수 있습니다. 운영자는 유지보수나 외부 API 변경에
          따라 기능을 변경하거나 중단할 수 있으며 중요한 변경은 사이트를 통해
          안내합니다. 계정 종료 및 저장 정보 삭제 요청은 아래 문의 이메일로
          접수합니다.
        </p>
      </section>
      <section>
        <h2>7. 오픈소스와 책임</h2>
        <p>
          Onpost의 기반 소프트웨어는 Postiz이며 GNU AGPL-3.0-or-later에 따라
          제공됩니다. 라이선스와 해당 배포 버전의 전체 소스는{' '}
          <a href="/open-source">오픈소스 안내</a>에서 확인할 수 있습니다. 이
          약관은 해당 라이선스가 부여하는 권리를 제한하지 않습니다. 운영자의
          책임은 적용 법령에 따르며 고의·중과실에 대한 책임을 배제하지 않습니다.
        </p>
      </section>
    </LegalPage>
  );
}
