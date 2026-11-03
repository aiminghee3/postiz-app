// Onpost modification, 2026-11-03: interactive, local-only product preview.
'use client';

import { useState } from 'react';
import styles from './landing.module.css';

const channels = [
  {
    name: 'Instagram',
    short: 'IG',
    tone: 'ig',
    format: '릴스',
    copy: '이번 주 신메뉴 소개 영상이에요. 매장에서 먼저 만나보세요!',
    when: '오늘 오후 7:00',
  },
  {
    name: 'Threads',
    short: '@',
    tone: 'th',
    format: '게시물',
    copy: '신메뉴 출시 기념, 이번 주말까지 첫 주문 10% 할인해요.',
    when: '오늘 오후 9:00',
  },
  {
    name: 'YouTube',
    short: '▶',
    tone: 'yt',
    format: 'Shorts',
    copy: '30초 만에 보는 신메뉴 만드는 과정 | 비하인드',
    when: '내일 오후 3:00',
  },
  {
    name: 'TikTok',
    short: '♪',
    tone: 'tt',
    format: '영상',
    copy: '신메뉴 첫 시식 반응 #신메뉴 #디저트',
    when: '내일 오후 7:00',
  },
];

const week = ['월', '화', '수', '목', '금', '토', '일'];
const slots: Record<number, number[]> = {
  0: [0, 2],
  1: [3],
  2: [1, 0],
  3: [2],
  4: [3, 1],
  5: [0],
  6: [],
};

export function PublishingPreview() {
  const [selected, setSelected] = useState(0);
  const channel = channels[selected];

  return (
    <div className={styles.app} aria-label="Onpost 화면 예시">
      <div className={styles.appBar} aria-hidden="true">
        <i />
        <i />
        <i />
        <span>onpost.me</span>
      </div>
      <div className={styles.appBody}>
        <aside className={styles.appSide} aria-hidden="true">
          <img src="/onpost-icon.svg" width="26" height="26" alt="" />
          {channels.map(({ name, short, tone }) => (
            <span key={name} className={styles.dot} data-tone={tone}>
              {short}
            </span>
          ))}
        </aside>
        <div className={styles.calendar} aria-hidden="true">
          <div className={styles.calendarHead}>
            <strong>11월 첫째 주</strong>
            <span>주간 보기</span>
          </div>
          <div className={styles.week}>
            {week.map((day, index) => (
              <div key={day} className={styles.day}>
                <span>{day}</span>
                {slots[index].map((c) => (
                  <i key={c} data-tone={channels[c].tone}>
                    {channels[c].name}
                  </i>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.composer}>
        <div className={styles.composerHead}>
          <strong>새 게시물</strong>
          <span>미디어 1개</span>
        </div>
        <div className={styles.tabs} role="group" aria-label="예시 채널 선택">
          {channels.map(({ name, tone }, index) => (
            <button
              key={name}
              type="button"
              data-tone={tone}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              {name}
            </button>
          ))}
        </div>
        <div className={styles.post} aria-live="polite" aria-atomic="true">
          <div className={styles.thumb} aria-hidden="true">
            <span>NEW</span>
          </div>
          <div>
            <span className={styles.format}>
              {channel.name} · {channel.format}
            </span>
            <p>{channel.copy}</p>
          </div>
        </div>
        <div className={styles.composerFoot}>
          <span>{channel.when}</span>
          <b>예약하기</b>
        </div>
      </div>

      <div className={styles.toast} aria-hidden="true">
        <span>✓</span>
        <div>
          <strong>게시 완료</strong>
          <small>Instagram 릴스 · 방금</small>
        </div>
      </div>
    </div>
  );
}
