/* ========================================
   TIMELINE — Static fallback (사용처 없음)
   실제 타임라인 바 데이터는 schedule.js의 buildTimeline()에서 생성됨.
   참조 잘못 들어가도 깨지지 않도록 새 챕터 ID 기반으로 유지.
   ======================================== */
export const TIMELINE = [
  { time: '08:30', name: '오프닝',       ch: 'ch00', width: '6%',  type: '오프닝' },
  { time: '09:00', name: '인트로',       ch: 'ch01', width: '12%', type: '강의' },
  { time: '10:00', name: 'Gemini',       ch: 'ch02', width: '12%', type: '실습' },
  { time: '11:00', name: 'NLM',          ch: 'ch03', width: '23%', type: '실습', isLunchSplit: true },
  { time: '13:00', name: 'Vibe Coding',  ch: 'ch04', width: '17%', type: '실습' },
  { time: '14:30', name: 'Antigravity',  ch: 'ch05', width: '33%', type: '실습' },
];
