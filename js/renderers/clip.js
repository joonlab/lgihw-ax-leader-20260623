/* ========================================
   CLIP PAGE RENDERER
   ======================================== */
import { CURRICULUM } from '../../data/curriculum.js';
import { CLIP_CONTENT } from '../clip-content.js';
import { getAllClips, getClipTitle } from '../utils.js';
import { updateBreadcrumb } from '../breadcrumb.js';
import { renderHome } from './home.js';
import { renderCardNews } from './card-news.js';
import { renderConceptCards } from './concept-cards.js';
import { renderTechTree } from './tech-tree.js';
import { renderToolPantry } from './tool-pantry.js';
import { renderScheduleTable } from '../../data/schedule.js';
import { STATE } from '../state.js';
import { isCeoLikeBatch, applyCeoTextReplacements } from '../ui.js';

export async function renderClip(el, chId, clipId) {
  const ch = CURRICULUM.find(c => c.id === chId);
  if (!ch) { renderHome(el); return; }
  const clip = ch.clips.find(c => c.id === clipId);
  if (!clip) { renderHome(el); return; }

  const key = chId + '-' + clipId;
  const content = CLIP_CONTENT[key];

  // Breadcrumb
  updateBreadcrumb([
    { label: `CH ${ch.num} ${ch.titleKo}`, href: `#${chId}-clip01` },
    { label: clip.title }
  ]);

  // Type badge class
  const typeClass = 'type-' + clip.type;
  const typeLabel = { concept: '개념', platform: '플랫폼', practice: '실습', reference: '참고', overview: '개요', demo: '시연' }[clip.type] || '';

  // Navigation
  const allClips = getAllClips();
  const idx = allClips.indexOf(key);
  const prevKey = idx > 0 ? allClips[idx - 1] : null;
  const nextKey = idx < allClips.length - 1 ? allClips[idx + 1] : null;

  const prevLabel = prevKey ? getClipTitle(prevKey) : '';
  const nextLabel = nextKey ? getClipTitle(nextKey) : '';

  let mainHtml = '';
  if (content === 'RENDER_NEWS') {
    mainHtml = renderCardNews();
  } else if (content === 'RENDER_CONCEPTS') {
    mainHtml = renderConceptCards();
  } else if (content === 'RENDER_TECH_TREE') {
    mainHtml = renderTechTree();
  } else if (content === 'RENDER_TOOLS') {
    mainHtml = renderToolPantry();
  } else if (content) {
    mainHtml = content;
    if (isCeoLikeBatch(STATE.currentBatch)) {
      mainHtml = applyCeoTextReplacements(mainHtml);
    }
    if (mainHtml.includes('<!-- DYNAMIC:SCHEDULE_TABLE -->')) {
      mainHtml = mainHtml.replace('<!-- DYNAMIC:SCHEDULE_TABLE -->', renderScheduleTable(STATE.currentBatch));
    }
  } else {
    mainHtml = `
      <div style="text-align:center; padding:60px 0; color:var(--text-muted);">
        <div style="margin-bottom:16px;"><i data-lucide="pencil" style="width:40px;height:40px;color:var(--text-muted);"></i></div>
        <p style="font-size:0.9rem;">콘텐츠 준비 중입니다.</p>
        <p style="font-size:0.78rem; margin-top:8px;">강의 당일까지 업데이트됩니다.</p>
      </div>`;
  }

  el.innerHTML = `
    <div class="clip-header">
      <div class="clip-badges">
        ${clip.time ? `<span class="clip-badge time"><i data-lucide="timer" style="width:13px;height:13px;vertical-align:-2px;"></i> ${clip.time}</span>` : ''}
        <span class="clip-badge chapter">CH ${ch.num}</span>
        <span class="clip-badge ${typeClass}">${typeLabel}</span>
      </div>
      <h1 class="clip-title">${clip.title}</h1>
    </div>
    ${mainHtml}
    <div class="clip-nav-footer">
      <a class="clip-nav-btn ${prevKey ? '' : 'disabled'}" href="${prevKey ? '#' + prevKey : '#'}">
        ← ${prevLabel || '처음'}
      </a>
      <a class="clip-nav-btn ${nextKey ? '' : 'disabled'}" href="${nextKey ? '#' + nextKey : '#'}">
        ${nextLabel || '끝'} →
      </a>
    </div>
  `;
}
