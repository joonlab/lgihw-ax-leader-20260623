/* ========================================
   HOME PAGE RENDERER
   ======================================== */
import { CURRICULUM } from '../../data/curriculum.js';
import { buildTimeline, getTimeOverride } from '../../data/schedule.js';
import { STATE } from '../state.js';
import { getClassInfo, BATCH_META, isInhwawonBatch, getCourseTitle, getCourseSubtitle, isCeoLikeBatch } from '../ui.js';
import { initIcons } from '../icons.js';

export function renderHome(el) {
  let cardsHtml = '';
  CURRICULUM.forEach(ch => {
    cardsHtml += `
      <a class="chapter-card" href="#${ch.id}-clip01">
        <div class="chapter-card-top">
          <span class="chapter-card-num">CH ${ch.num}</span>
          ${(() => { const t = getTimeOverride(ch.id, STATE.currentBatch); return t.timeStart ? `<span class="chapter-card-time">${t.timeStart}~${t.timeEnd}</span>` : ''; })()}
        </div>
        <div class="chapter-card-title">${ch.icon} ${ch.titleKo}</div>
        <div class="chapter-card-desc">${ch.desc}</div>
        <div class="chapter-card-clips"><i data-lucide="file-text" style="width:13px;height:13px;vertical-align:-2px;"></i> ${ch.clips.filter(c => !c.hidden).length}개 섹션</div>
      </a>`;
  });

  let timelineHtml = '';
  const TIMELINE = buildTimeline(STATE.currentBatch);
  TIMELINE.forEach(t => {
    const cls = t.isLunch ? 'timeline-block timeline-lunch' : 'timeline-block';
    const href = t.ch ? `#${t.ch}-clip01` : '#home';
    timelineHtml += `
      <a class="${cls}" href="${href}" style="width:${t.width}">
        <span class="tl-time">${t.time}</span>
        <span class="tl-name">${t.name}</span>
        <span class="tl-type">${t.type}</span>
      </a>`;
  });

  // Build greeting if logged in
  let greetingHtml = '';
  if (STATE.user) {
    const levelLabels = { B: 'B반', C: 'C반', D: 'D반', E: 'E반', F: 'F반' };
    const level = STATE.currentLevel;
    const levelLabel = levelLabels[level] || '';
    const levelClass = level ? `level-${level}` : '';
    const batchInfo = getClassInfo(STATE.currentBatch);
    const classInfo = batchInfo?.[level];
    const teamStr = (isInhwawonBatch(STATE.currentBatch) && STATE.user?.group_number) ? ` · ${STATE.user.group_number}팀` : '';
    const classInfoHtml = classInfo ? `<span class="class-info">${classInfo.room}${classInfo.instructor ? ' · ' + classInfo.instructor : ''}${teamStr}</span>` : '';
    greetingHtml = `
    <div class="home-greeting">
      <span class="home-greeting-name">${STATE.user.name} 님, 환영합니다</span>
      ${levelLabel && !STATE.isAdmin && !isCeoLikeBatch(STATE.currentBatch) ? `<span class="level-badge ${levelClass}">${levelLabel}</span>${classInfoHtml}` : ''}
    </div>`;
  }

  el.innerHTML = `${greetingHtml}
    <div class="home-hero">
      <div class="home-logo-wrap">
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/8d/LG_logo_%282014%29.svg" alt="LG" style="width:72px;height:auto;">
      </div>
      <h1 class="home-title">${getCourseTitle(STATE.currentBatch)}</h1>
      <div class="home-meta">
        ${(() => {
          const meta = BATCH_META[STATE.currentBatch] || BATCH_META[2];
          const dateHtml = meta.date ? `<span class="home-meta-item"><i data-lucide="calendar" style="width:14px;height:14px;vertical-align:-2px;"></i> ${meta.date}</span>` : '';
          const locHtml = meta.location ? `
            ${meta.date ? '<span class="home-meta-dot"></span>' : ''}
            <span class="home-meta-item"><i data-lucide="map-pin" style="width:14px;height:14px;vertical-align:-2px;"></i> ${meta.location}</span>` : '';
          const companiesHtml = meta.companies ? `
            ${(meta.date || meta.location) ? '<span class="home-meta-dot"></span>' : ''}
            <span class="home-meta-item"><i data-lucide="users" style="width:14px;height:14px;vertical-align:-2px;"></i> ${meta.companies}</span>` : '';
          return `${dateHtml}${locHtml}${companiesHtml}`;
        })()}
      </div>
    </div>

    <div class="timeline-section">
      <div class="timeline-label">Today's Schedule</div>
      <div class="timeline-bar">${timelineHtml}</div>
    </div>

    <div class="chapters-grid">${cardsHtml}</div>

    <div class="quick-access">
      <a class="quick-btn" href="#ch04-clip02"><span class="q-icon"><i data-lucide="download" style="width:16px;height:16px;"></i></span> 설치 가이드</a>
      <a class="quick-btn" href="#ch04-clip03"><span class="q-icon"><i data-lucide="monitor" style="width:16px;height:16px;"></i></span> 사용법</a>
      <a class="quick-btn" href="#ch07-clip01"><span class="q-icon"><i data-lucide="folder-down" style="width:16px;height:16px;"></i></span> 실습자료</a>
      <a class="quick-btn" href="#ch07-clip02"><span class="q-icon"><i data-lucide="book-open-text" style="width:16px;height:16px;"></i></span> 참고 링크</a>
    </div>
  `;
  initIcons();
}
