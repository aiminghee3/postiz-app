// Onpost modification, 2026-10-20: isolated, local-only channel preview.
'use client';

import { useState } from 'react';
import styles from './onpost-landing.module.css';

const channels = [
  {
    name: 'Instagram',
    format: '릴스',
    copy: '다음 배경화면은 이걸로. 마음에 드는 장면을 골라 보세요.',
    initial: 'IG',
  },
  {
    name: 'Threads',
    format: '게시물',
    copy: '맥북 배경화면 바꿀 생각이면 이 네 개 봐봐.',
    initial: '@',
  },
  {
    name: 'YouTube',
    format: 'Shorts',
    copy: '맥북 배경화면 추천 | 취향대로 고르는 라이브 배경화면',
    initial: '▶',
  },
];

export function PublishingPreview() {
  const [selected, setSelected] = useState(0);
  const channel = channels[selected];

  return (
    <div className={styles.preview} aria-label="채널별 게시물과 예약 일정 예시">
      <div className={styles.previewTop}>
        <span>
          <img src="/onpost-icon.svg" width="22" height="22" alt="" />
          나의 워크스페이스
        </span>
        <span>예시 화면</span>
      </div>
      <div className={styles.previewContent}>
        <div className={styles.editorHeading}>
          <strong>새 게시물</strong>
          <span>미디어 첨부 완료</span>
        </div>
        <div
          className={styles.channelPicker}
          role="group"
          aria-label="예시 채널 선택"
        >
          {channels.map(({ name }, index) => (
            <button
              key={name}
              type="button"
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              {name}
            </button>
          ))}
        </div>
        <div
          className={styles.postPreview}
          aria-live="polite"
          aria-atomic="true"
        >
          <div className={styles.poster} aria-hidden="true">
            <span>W</span>
            <small>
              새로운 화면,
              <br />
              새로운 기분.
            </small>
          </div>
          <div className={styles.postCopy}>
            <span className={styles.format}>{channel.format}</span>
            <p>{channel.copy}</p>
            <span className={styles.previewAccount}>
              내 {channel.name} 채널
            </span>
          </div>
        </div>
        <div className={styles.scheduleHeading}>
          <strong>다음 발행 일정</strong>
          <span>내 시간대 기준</span>
        </div>
        <div className={styles.timeline}>
          {channels.map(({ name, initial }, index) => (
            <div className={styles.scheduleRow} key={name}>
              <span className={styles.channelIcon} aria-hidden="true">
                {initial}
              </span>
              <div>
                <strong>{name}</strong>
                <span>
                  {index === 0 ? '오늘' : '내일'} · 오후{' '}
                  {index === 1 ? '3' : '7'}:00
                </span>
              </div>
              <span className={styles.scheduled}>예약됨</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.previewBottom}>
        <span aria-hidden="true">✓</span> 준비는 한 번에, 발행은 채널에 맞게.
      </div>
    </div>
  );
}
