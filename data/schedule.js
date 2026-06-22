/* ========================================
   SCHEDULE — Single Source of Truth
   LG인화원 AX 리더 세미나 — 오후 실습 세션 (14:00~16:30, 실질 실습 약 2h)
   ======================================== */
import { CURRICULUM } from './curriculum.js';

const SLOTS = [
  { time: '14:00-14:15', session: '오프닝 + Antigravity 2.0 소개·시연', desc: '인터페이스·동작 방식·허용 버튼·HTML 자동 열림',   format: '오프닝', link: 'ch00-clip01' },
  { time: '14:15-14:30', session: '실습 ① 파일 정리·자동 분류',          desc: '워밍업 — zip 더미 폴더 종류·날짜별 정리',          format: '실습',   link: 'ch02-clip01' },
  { time: '14:30-14:55', session: '실습 ② 자료 → 엑셀·보고서',          desc: '비정형 데이터를 원하는 양식의 엑셀·보고서로',       format: '실습',   link: 'ch02-clip02' },
  { time: '14:55-15:00', session: '실습 ③ 자료조사 HTML — 착수',         desc: '딥리서치라 오래 걸림 → 먼저 실행만 걸어두기 (병렬)', format: '착수',   link: 'ch02-clip03' },
  { time: '15:00-15:05', session: '휴식',                              desc: '',                                              format: '',       link: null, isBreak: true },
  { time: '15:05-15:35', session: '실습 ④ 바이브코딩 — AI 기능 웹앱',    desc: '무료 Gemini API 키로 AI 미니 웹앱 (③ 도는 동안)',  format: '실습',   link: 'ch02-clip04' },
  { time: '15:35-15:45', session: '실습 ③ 결과 확인',                   desc: '자료조사 HTML 보고서 확인·정리 (출처 포함)',        format: '확인',   link: 'ch02-clip03' },
  { time: '15:45-16:20', session: '자율 심화 — 스킬 제작 + 하네스',       desc: '반복 작업을 스킬로 · 내 업무에 적용 · 강사 순회',    format: '실습',   link: 'ch03-clip01' },
  { time: '16:20-16:30', session: '마무리 & 공유',                      desc: '패들렛에 결과 공유 + 정리',                        format: '공유',   link: 'ch04-clip01' },
];

const DAY_CONFIG = { default: { start: '14:00', end: '16:30' } };

/** 챕터별 timeStart/timeEnd 반환 (curriculum.js의 값을 사용) */
export function getTimeOverride(chId, _batch) {
  const ch = CURRICULUM.find(c => c.id === chId);
  return ch ? { timeStart: ch.timeStart, timeEnd: ch.timeEnd } : { timeStart: '', timeEnd: '' };
}

/** 시간표 HTML 테이블 생성 (SLOTS 직접 정의) */
export function renderScheduleTable(_batch) {
  const tbody = SLOTS.map(s => {
    const style = s.isBreak ? ' style="background:var(--bg-offwhite);color:var(--text-muted)"' : '';
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

/** 타임라인 바 데이터 생성 (휴식 제외) */
export function buildTimeline(_batch) {
  const dayStart = toMin(DAY_CONFIG.default.start);
  const dayEnd = toMin(DAY_CONFIG.default.end);
  const total = dayEnd - dayStart;
  const shortName = {
    '오프닝 + Antigravity 2.0 소개·시연': '오프닝',
    '실습 ① 파일 정리·자동 분류': '실습 ①',
    '실습 ② 자료 → 엑셀·보고서': '실습 ②',
    '실습 ③ 자료조사 HTML — 착수': '실습 ③ 착수',
    '실습 ④ 바이브코딩 — AI 기능 웹앱': '실습 ④',
    '실습 ③ 결과 확인': '실습 ③ 확인',
    '자율 심화 — 스킬 제작 + 하네스': '자율 심화',
    '마무리 & 공유': '마무리',
  };
  return SLOTS
    .filter(s => !s.isBreak)
    .map(s => {
      const [start, end] = s.time.split('-');
      const w = Math.round((toMin(end) - toMin(start)) / total * 100);
      const chId = s.link ? s.link.split('-')[0] : null;
      return {
        time: start,
        name: shortName[s.session] || s.session,
        ch: chId,
        width: w + '%',
        type: s.format,
        isLunch: false,
      };
    });
}
