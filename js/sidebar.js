/* ========================================
   SIDEBAR BUILDER
   ======================================== */
import { CURRICULUM } from '../data/curriculum.js';
import { getTimeOverride } from '../data/schedule.js';
import { STATE } from './state.js';
import { isCeoLikeBatch } from './ui.js';

export function buildSidebar() {
  const nav = document.getElementById('sidebarNav');
  const typeLabels = { concept: '개념', platform: '플랫폼', practice: '실습', reference: '참고', overview: '개요', demo: '시연' };
  let html = '';
  CURRICULUM.forEach(ch => {
    const isOpen = STATE.currentRoute.startsWith(ch.id);
    html += `<div class="sidebar-chapter ${isOpen ? 'open' : ''}" data-ch="${ch.id}">
      <div class="sidebar-chapter-header" onclick="toggleChapter('${ch.id}')">
        <span class="ch-label">
          <span class="ch-num">CH ${ch.num}</span>
          ${ch.titleKo}
        </span>
        ${ch.timeStart ? `<span class="ch-time">${getTimeOverride(ch.id, STATE.currentBatch).timeStart}</span>` : ''}
        <svg class="chevron" viewBox="0 0 16 16" fill="currentColor"><path d="M6 3l5 5-5 5V3z"/></svg>
      </div>
      <div class="sidebar-clips">`;
    ch.clips.filter(c => !c.hidden).forEach(clip => {
      const key = ch.id + '-' + clip.id;
      const visited = STATE.visited.includes(key) ? 'visited' : '';
      const typeLabel = typeLabels[clip.type] || '';
      html += `<a class="sidebar-clip-link ${visited}" href="#${key}" data-key="${key}" onclick="closeMobile()">
        <span class="clip-dot"></span>
        <span class="sidebar-clip-title">${clip.title}</span>
        ${typeLabel ? `<span class="sidebar-type-tag st-${clip.type}">${typeLabel}</span>` : ''}
      </a>`;
    });
    html += '</div></div>';
  });

  // Prepend user info section if logged in
  if (STATE.user) {
    const levelLabels = { B: 'B반', C: 'C반', D: 'D반', E: 'E반', F: 'F반' };
    const levelLabel = levelLabels[STATE.currentLevel] || '';
    const levelClass = STATE.currentLevel ? `level-${STATE.currentLevel}` : '';
    const userHtml = `<div class="sidebar-user">
      <span class="sidebar-user-name">${STATE.user.name} 님</span>
      ${levelLabel && !STATE.isAdmin && !isCeoLikeBatch(STATE.currentBatch) ? `<span class="level-badge ${levelClass}">${levelLabel}</span>` : ''}
    </div>`;
    html = userHtml + html;
  }

  nav.innerHTML = html;
}

export function toggleChapter(chId) {
  const el = document.querySelector(`.sidebar-chapter[data-ch="${chId}"]`);
  if (el) el.classList.toggle('open');
}

export function updateSidebarActive() {
  document.querySelectorAll('.sidebar-clip-link').forEach(link => {
    link.classList.toggle('active', link.dataset.key === STATE.currentRoute);
  });
  // Open parent chapter
  const hash = location.hash.slice(1) || 'home';
  const m = hash.match(/^(ch\d+)-(clip\d+)$/);
  if (m) {
    const ch = document.querySelector(`.sidebar-chapter[data-ch="${m[1]}"]`);
    if (ch) ch.classList.add('open');
  }
}

window.toggleChapter = toggleChapter;
