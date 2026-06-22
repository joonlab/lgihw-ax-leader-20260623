/* ========================================
   PRINT VIEW RENDERER
   ======================================== */
import { CURRICULUM } from '../../data/curriculum.js';
import { CLIP_CONTENT } from '../clip-content.js';
import { renderCardNews } from './card-news.js';
import { renderTechTree } from './tech-tree.js';
import { renderToolPantry } from './tool-pantry.js';
import { renderScheduleTable, getTimeOverride } from '../../data/schedule.js';
import { CONCEPTS } from '../../data/concepts.js';
import { STATE } from '../state.js';
import { initIcons } from '../icons.js';
import { getCourseTitle, getCourseSubtitle, isCeoLikeBatch, applyCeoTextReplacements, BATCH_META } from '../ui.js';

export function renderPrintView(el, targetChapter = null) {
  // targetChapter가 null이면 전체, 'ch01' 등이면 해당 챕터만

  let html = '<div class="print-view">';

  // 표지
  html += `<div class="print-cover">
    <img src="https://upload.wikimedia.org/wikipedia/commons/8/8d/LG_logo_%282014%29.svg" alt="LG" style="width:100px;height:auto;margin-bottom:24px;">
    <h1>${getCourseTitle(STATE.currentBatch)}</h1>
    <p class="print-cover-sub">${getCourseSubtitle(STATE.currentBatch)}</p>
    <p class="print-cover-meta">${(() => { const m = BATCH_META[STATE.currentBatch]; return m ? `${m.date} | ${m.location || 'LG U+ 마곡사옥'}` : '2026.04.27 | LG U+ 마곡사옥'; })()}</p>
  </div>`;

  // 목차
  html += '<div class="print-toc"><h2>목차</h2><ul>';
  for (const ch of CURRICULUM) {
    if (targetChapter && ch.id !== targetChapter) continue;
    html += `<li><strong>CH ${ch.num}</strong> ${ch.titleKo}`;
    if (ch.timeStart) { const t = getTimeOverride(ch.id, STATE.currentBatch); html += ` <span class="print-toc-time">${t.timeStart}~${t.timeEnd}</span>`; }
    html += '<ul>';
    for (const clip of ch.clips) {
      html += `<li>${clip.title}</li>`;
    }
    html += '</ul></li>';
  }
  html += '</ul></div>';

  // 본문
  for (const ch of CURRICULUM) {
    if (targetChapter && ch.id !== targetChapter) continue;

    html += `<div class="print-chapter">`;
    html += `<div class="print-chapter-header">
      <span class="print-chapter-num">CH ${ch.num}</span>
      <h2 class="print-chapter-title">${ch.titleKo}</h2>
      ${ch.timeStart ? (() => { const t = getTimeOverride(ch.id, STATE.currentBatch); return `<span class="print-chapter-time">${t.timeStart} ~ ${t.timeEnd}</span>`; })() : ''}
    </div>`;

    for (const clip of ch.clips) {
      const key = `${ch.id}-${clip.id}`;
      let content = CLIP_CONTENT[key];

      // 동적 렌더러 처리
      if (content === 'RENDER_NEWS') {
        content = renderCardNews();
      } else if (content === 'RENDER_CONCEPTS') {
        content = renderConceptCardsFlat();
      } else if (content === 'RENDER_TECH_TREE') {
        content = renderTechTree();
      } else if (content === 'RENDER_TOOLS') {
        content = renderToolPantry();
      } else if (content && content.includes('<!-- DYNAMIC:SCHEDULE_TABLE -->')) {
        content = content.replace('<!-- DYNAMIC:SCHEDULE_TABLE -->', renderScheduleTable(STATE.currentBatch));
      }

      if (!content) continue;

      // CEO 텍스트 치환
      if (isCeoLikeBatch(STATE.currentBatch)) {
        content = applyCeoTextReplacements(content);
      }

      // 인터랙티브 요소 제거
      content = stripInteractive(content);

      // 타입 라벨
      const typeLabel = { concept: '개념', platform: '플랫폼', practice: '실습', reference: '참고', overview: '개요', demo: '시연' }[clip.type] || '';

      html += `<div class="print-clip">
        <div class="print-clip-header">
          <h3 class="print-clip-title">${clip.title}</h3>
          <span class="print-clip-type type-${clip.type}">${typeLabel}</span>
        </div>
        ${content}
      </div>`;
    }
    html += '</div>';
  }

  // 제작 크레딧 (마지막 페이지)
  html += `<div class="print-credits">
    <div class="print-credits-inner">
      <div class="print-credits-label">Produced by</div>
      <div class="print-credits-company">
        <strong>커맨드 스페이스 (Command Space)</strong>
      </div>
      <div class="print-credits-person">
        <strong>박준</strong> — AI 교육 설계 & 개발
      </div>
      <div class="print-credits-contact">
        <span>wns9133@gmail.com</span>
      </div>
      <div class="print-credits-note" style="margin-top:24px;font-size:0.75rem;color:var(--text-muted);">
        본 교육 자료는 LG 그룹 임직원 교육을 위해 제작되었습니다.
      </div>
    </div>
  </div>`;

  html += '</div>';
  el.innerHTML = html;
  initIcons();
}

function stripInteractive(html) {
  return html
    // 복사 버튼 제거
    .replace(/<button[^>]*class="[^"]*copy-btn[^"]*"[^>]*>.*?<\/button>/gs, '')
    .replace(/<button[^>]*class="[^"]*prompt-inline-copy[^"]*"[^>]*>.*?<\/button>/gs, '')
    // onclick 제거
    .replace(/\s*onclick="[^"]*"/g, '')
    // 실습 단축 바 제거
    .replace(/<div class="practice-shortcut-bar">[\s\S]*?<\/div>/g, '');
}

function renderConceptCardsFlat() {
  const sorted = [...CONCEPTS].sort((a, b) => a.termKo.localeCompare(b.termKo, 'ko'));
  let html = '<div class="clip-overview">AI 핵심 개념을 정리한 카드입니다.</div><div class="clip-section">';

  sorted.forEach(c => {
    html += `<div class="print-concept-card">
      <div class="print-concept-header">
        <span class="concept-cat-badge ${c.category}">${c.category}</span>
        <strong>${c.termKo}</strong> <span style="color:var(--text-secondary)">${c.termEn}</span>
      </div>
      <div class="print-concept-def">${c.shortDef}</div>
      <div class="print-concept-detail">${c.fullExplanation}</div>
      <div class="print-concept-examples"><strong>예시:</strong> ${c.examples.join(' / ')}</div>
    </div>`;
  });

  html += '</div>';
  return html;
}
