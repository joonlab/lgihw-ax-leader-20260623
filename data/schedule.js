/* ========================================
   SCHEDULE — Single Source of Truth
   LG인화원 AX 리더 세미나 — 종일 (10:00~16:30, 점심 1시간 제외 실강 5.5h)
   ======================================== */
import { CURRICULUM } from './curriculum.js';

// 상세 시간표 (오늘의 시간표 표)
const SLOTS = [
  { time: '10:00-10:25', session: '인트로 + AI 핵심 개념',          desc: 'AI 어시스턴트 → 에이전트 → 에이전틱 AI',          format: '강의', link: 'ch01-clip01' },
  { time: '10:30-12:00', session: 'Gemini · Gems',                desc: '맥락 쌓기 + 이미지 생성 + 나만의 Gem 제작 (휴식 포함)', format: '실습', link: 'ch02-clip01' },
  { time: '12:00-13:00', session: '점심 — Antigravity 2.0 설치 안내', desc: '점심 중 강사가 대여 PC에 미리 설치·세팅',           format: '식사', link: 'ch04-clip02', isBreak: true, isLunch: true },
  { time: '13:00-14:00', session: 'NotebookLM',                   desc: '자료 업로드 → 출처 기반 답변·산출물',              format: '실습', link: 'ch03-clip01' },
  { time: '14:00-14:15', session: 'Antigravity 2.0 소개·시연',      desc: '인터페이스·동작 방식·허용 버튼·HTML 자동 열림',     format: '오프닝', link: 'ch04-clip01' },
  { time: '14:15-14:30', session: '실습 ① 파일 정리·자동 분류',       desc: '워밍업 — zip 더미 폴더 종류·날짜별 정리',         format: '실습', link: 'ch05-clip01' },
  { time: '14:30-14:55', session: '실습 ② 자료 → 엑셀·보고서',       desc: '비정형 데이터를 원하는 양식의 엑셀·보고서로',       format: '실습', link: 'ch05-clip02' },
  { time: '14:55-15:00', session: '실습 ③ 자료조사 HTML — 착수',      desc: '딥리서치라 오래 걸림 → 먼저 실행만 걸어두기 (병렬)', format: '착수', link: 'ch05-clip03' },
  { time: '15:00-15:05', session: '휴식',                          desc: '',                                            format: '',     link: null, isBreak: true },
  { time: '15:05-15:35', session: '실습 ④ 바이브코딩 — AI 기능 웹앱',  desc: '무료 Gemini API 키로 AI 미니 웹앱 (③ 도는 동안)',  format: '실습', link: 'ch05-clip04' },
  { time: '15:35-15:45', session: '실습 ③ 결과 확인',               desc: '자료조사 HTML 보고서 확인·정리 (출처 포함)',        format: '확인', link: 'ch05-clip03' },
  { time: '15:45-16:20', session: '자율 심화 — 스킬 제작 + 하네스',    desc: '반복 작업을 스킬로 · 내 업무에 적용 · 강사 순회',    format: '실습', link: 'ch06-clip01' },
  { time: '16:20-16:30', session: '마무리 & 공유',                  desc: '패들렛에 결과 공유 + 정리',                       format: '공유', link: 'ch07-clip01' },
];

// 홈 타임라인 바 (코어스 — 큰 블록만)
const TIMELINE = [
  { start: '10:00', end: '10:25', name: 'AI 개념',     ch: 'ch01', type: '강의' },
  { start: '10:30', end: '12:00', name: 'Gemini·Gems', ch: 'ch02', type: '실습' },
  { start: '12:00', end: '13:00', name: '점심',         ch: null,   type: '식사', isLunch: true },
  { start: '13:00', end: '14:00', name: 'NotebookLM',  ch: 'ch03', type: '실습' },
  { start: '14:00', end: '16:30', name: 'Antigravity 실습', ch: 'ch04', type: '실습' },
];

const DAY_CONFIG = { default: { start: '10:00', end: '16:30' } };

/** 챕터별 timeStart/timeEnd 반환 (curriculum.js의 값을 사용) */
export function getTimeOverride(chId, _batch) {
  const ch = CURRICULUM.find(c => c.id === chId);
  return ch ? { timeStart: ch.timeStart, timeEnd: ch.timeEnd } : { timeStart: '', timeEnd: '' };
}

/** 시간표 HTML 테이블 생성 (상세 SLOTS) */
export function renderScheduleTable(_batch) {
  const tbody = SLOTS.map(s => {
    const style = (s.isBreak && !s.isLunch) ? ' style="background:var(--bg-offwhite);color:var(--text-muted)"' : '';
    const session = s.link
      ? `<a href="#${s.link}" style="color:var(--brand);text-decoration:none;font-weight:500">${s.session}</a>`
      : s.session;
    return `      <tr${style}><td>${s.time}</td><td>${session}</td><td>${s.desc}</td><td>${s.format}</td></tr>`;
  }).join('\n');
  return `<table class="comparison-table" style="margin-top:24px">
    <thead><tr><th>시간</th><th>세션</th><th>내용</th><th>형태</th></tr></thead>
    <tbody>
${tbody}
    </tbody>
  </table>`;
}

// --- 유틸 ---
function toMin(t) { const [h, m] = t.split(':').map(Number); return h * 60 + m; }

/** 타임라인 바 데이터 생성 (코어스 블록) */
export function buildTimeline(_batch) {
  const dayStart = toMin(DAY_CONFIG.default.start);
  const dayEnd = toMin(DAY_CONFIG.default.end);
  const total = dayEnd - dayStart;
  return TIMELINE.map(t => {
    const w = Math.round((toMin(t.end) - toMin(t.start)) / total * 100);
    return {
      time: t.start,
      name: t.name,
      ch: t.ch,
      width: w + '%',
      type: t.type,
      isLunch: !!t.isLunch,
    };
  });
}
