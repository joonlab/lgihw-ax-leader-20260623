/* ========================================
   UI FUNCTIONS
   ======================================== */
import { STATE } from './state.js';
import { getAllClips } from './utils.js';
import { initIcons } from './icons.js';
import siteConfig from '../site.config.js';

/* ========================================
   FONT SIZE
   ======================================== */
export function changeFontSize(dir) {
  STATE.fontLevel = Math.max(-2, Math.min(3, STATE.fontLevel + dir));
  applyFontSize();
  localStorage.setItem('axcamp-font', STATE.fontLevel);
}

export function resetFontSize() {
  STATE.fontLevel = 0;
  applyFontSize();
  localStorage.setItem('axcamp-font', 0);
}

export function applyFontSize() {
  const base = 16 + (STATE.fontLevel * 2);
  document.documentElement.style.setProperty('--font-size-base', base + 'px');
}

/* ========================================
   CLIPBOARD COPY
   ======================================== */
export function copyPrompt(btn, targetId) {
  const text = document.getElementById(targetId).textContent;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✓ 복사됨';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = '<i data-lucide="clipboard" style="width:14px;height:14px;vertical-align:-2px;"></i> 복사';
      initIcons();
      btn.classList.remove('copied');
    }, 2000);

    // 화면 중앙 토스트
    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.innerHTML = '<span class="copy-toast-icon">✓</span><span class="copy-toast-text">복사되었습니다</span>';
    document.body.appendChild(toast);
    // fade-in 트리거
    requestAnimationFrame(() => toast.classList.add('show'));
    // 1.5초 후 fade-out → 제거
    setTimeout(() => {
      toast.classList.remove('show');
      toast.classList.add('hide');
      toast.addEventListener('animationend', () => toast.remove());
    }, 1500);
  });
}

/* ========================================
   DOWNLOAD
   ======================================== */
export function downloadFile(url, filename, e) {
  const btn = e?.currentTarget || document.activeElement;
  const orig = btn.innerHTML;
  btn.innerHTML = '<i data-lucide="loader" style="width:14px;height:14px;vertical-align:-2px;"></i> 다운로드 중...'; initIcons();
  btn.style.pointerEvents = 'none';
  fetch(url).then(r => r.blob()).then(blob => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
    btn.innerHTML = '<i data-lucide="check-circle" style="width:14px;height:14px;vertical-align:-2px;"></i> 완료!'; initIcons();
    setTimeout(() => { btn.innerHTML = orig; btn.style.pointerEvents = ''; }, 2000);
  }).catch(() => { btn.innerHTML = orig; btn.style.pointerEvents = ''; window.open(url); });
}

export function copyInlinePrompt(btn) {
  const block = btn.closest('.prompt-inline-block');
  const pre = block?.querySelector('.prompt-inline-content');
  if (!pre) return;
  navigator.clipboard.writeText(pre.textContent).then(() => {
    btn.textContent = '복사됨';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = '복사'; btn.classList.remove('copied'); }, 2000);
  });
}
window.copyInlinePrompt = copyInlinePrompt;

/* ========================================
   BOOKMARKS
   ======================================== */
export function toggleBookmark() {
  const key = STATE.currentRoute;
  if (key === 'home') return;
  const idx = STATE.bookmarks.indexOf(key);
  if (idx >= 0) STATE.bookmarks.splice(idx, 1);
  else STATE.bookmarks.push(key);
  localStorage.setItem('axcamp-bookmarks', JSON.stringify(STATE.bookmarks));
  updateBookmarkBtn();
}

export function updateBookmarkBtn() {
  const btn = document.getElementById('bookmarkToggle');
  if (!btn) return;
  const key = STATE.currentRoute;
  if (STATE.bookmarks.includes(key)) {
    btn.textContent = '★';
    btn.classList.add('active');
  } else {
    btn.textContent = '☆';
    btn.classList.remove('active');
  }
}

/* ========================================
   SCROLL PROGRESS
   ======================================== */
export function setupScrollProgress() {
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (window.scrollY / h * 100) : 0;
    document.getElementById('scrollProgress').style.width = pct + '%';
  });
}

/* ========================================
   MOBILE
   ======================================== */
export function closeMobile() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('show');
  document.getElementById('hamburger').classList.remove('open');
}

/* ========================================
   SIDEBAR COLLAPSE (DESKTOP)
   ======================================== */
export function toggleSidebarCollapse() {
  document.body.classList.toggle('sidebar-collapsed');
  const collapsed = document.body.classList.contains('sidebar-collapsed');
  sessionStorage.setItem('axcamp-sidebar-collapsed', collapsed ? '1' : '');
}

// Restore on load
if (sessionStorage.getItem('axcamp-sidebar-collapsed') === '1') {
  document.body.classList.add('sidebar-collapsed');
}

window.toggleSidebarCollapse = toggleSidebarCollapse;

/* ========================================
   NAVIGATION (prev/next)
   ======================================== */
export function navigatePrev() {
  const allClips = getAllClips();
  const idx = allClips.indexOf(STATE.currentRoute);
  if (idx > 0) location.hash = '#' + allClips[idx - 1];
}

export function navigateNext() {
  const allClips = getAllClips();
  const idx = allClips.indexOf(STATE.currentRoute);
  if (idx < allClips.length - 1) location.hash = '#' + allClips[idx + 1];
}

/* ========================================
   BOTTOM NAV AUTO-HIDE
   ======================================== */
export function initNavAutoHide() {
  const nav = document.getElementById('mobileNav');
  if (!nav) return;
  let hideTimer = null;

  function showNav() {
    nav.classList.remove('nav-hidden');
    document.body.classList.remove('nav-hidden');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideNav, 2000);
  }

  function hideNav() {
    nav.classList.add('nav-hidden');
    document.body.classList.add('nav-hidden');
  }

  window.addEventListener('scroll', showNav, { passive: true });
  window.addEventListener('touchmove', showNav, { passive: true });
  hideTimer = setTimeout(hideNav, 2000);
}

/* ========================================
   SCROLL SECTION INDICATOR
   ======================================== */
export function initScrollIndicator() {
  const indicator = document.createElement('div');
  indicator.className = 'scroll-indicator';
  indicator.id = 'scrollIndicator';

  const menu = document.createElement('div');
  menu.className = 'scroll-indicator-menu';

  const track = document.createElement('div');
  track.className = 'scroll-indicator-track';

  const backdrop = document.createElement('div');
  backdrop.className = 'scroll-indicator-backdrop';

  indicator.appendChild(track);
  // Menu & backdrop are body-level siblings (not inside indicator)
  // so position:fixed works correctly (indicator has transform)
  document.body.appendChild(backdrop);
  document.body.appendChild(menu);
  document.body.appendChild(indicator);

  let hideTimer = null;
  let hovered = false;
  let menuOpen = false;
  let sections = [];
  let ticks = [];
  let menuItems = [];
  const isMobile = () => window.innerWidth <= 768;

  function build() {
    const clipSections = document.querySelectorAll('.clip-section');
    const overview = document.querySelector('.clip-overview');
    sections = [];
    if (overview) sections.push(overview);
    clipSections.forEach(s => sections.push(s));

    track.innerHTML = '';
    menu.innerHTML = '';
    ticks = [];
    menuItems = [];
    closeMenu();
    if (sections.length < 2) return;

    sections.forEach((section, i) => {
      const titleEl = section.querySelector('.clip-section-title');
      const label = titleEl ? titleEl.textContent.trim() : (i === 0 ? '개요' : '');

      // Tick
      const tick = document.createElement('div');
      tick.className = 'scroll-indicator-tick';
      tick.addEventListener('click', (e) => {
        if (isMobile()) { e.stopPropagation(); toggleMenu(); }
        else scrollTo(section);
      });
      track.appendChild(tick);
      ticks.push(tick);

      // Menu item
      const item = document.createElement('button');
      item.className = 'scroll-indicator-menu-item';
      item.textContent = label;
      item.addEventListener('click', () => { closeMenu(); scrollTo(section); });
      menu.appendChild(item);
      menuItems.push(item);
    });
    updateActive();
  }

  function scrollTo(section) {
    const topbar = document.getElementById('topbar');
    const offset = topbar ? topbar.offsetHeight + 12 : 60;
    const y = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  function toggleMenu() {
    menuOpen ? closeMenu() : openMenu();
  }

  function openMenu() {
    updateActive();
    menuOpen = true;
    menu.classList.toggle('desktop-pos', !isMobile());
    menu.classList.add('menu-open');
    if (isMobile()) backdrop.classList.add('show');
  }

  function closeMenu() {
    menuOpen = false;
    menu.classList.remove('menu-open');
    backdrop.classList.remove('show');
  }

  backdrop.addEventListener('click', closeMenu);

  // Desktop: hover on indicator opens menu
  indicator.addEventListener('mouseenter', () => {
    if (!isMobile() && ticks.length) openMenu();
    hovered = true;
    clearTimeout(hideTimer);
  });
  indicator.addEventListener('mouseleave', () => {
    // Small delay to allow moving to menu
    setTimeout(() => {
      if (!menu.matches(':hover')) { closeMenu(); hovered = false; hideTimer = setTimeout(hide, 1000); }
    }, 100);
  });
  menu.addEventListener('mouseenter', () => { hovered = true; clearTimeout(hideTimer); });
  menu.addEventListener('mouseleave', () => { closeMenu(); hovered = false; hideTimer = setTimeout(hide, 1000); });

  function updateActive() {
    if (sections.length < 2) return;
    const trigger = window.scrollY + window.innerHeight / 3;
    let activeIdx = 0;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= trigger) activeIdx = i;
    }
    ticks.forEach((t, i) => t.classList.toggle('active', i === activeIdx));
    menuItems.forEach((m, i) => m.classList.toggle('active', i === activeIdx));
  }

  function show() {
    if (!ticks.length) return;
    indicator.classList.add('visible');
    clearTimeout(hideTimer);
    if (!hovered) hideTimer = setTimeout(hide, 2000);
  }

  function hide() {
    if (!hovered) indicator.classList.remove('visible');
  }

  window.addEventListener('scroll', () => { if (menuOpen) closeMenu(); show(); updateActive(); }, { passive: true });
  window.addEventListener('hashchange', () => setTimeout(build, 150));

  build();
  if (sections.length >= 2) show();
}

/* ========================================
   FAB
   ======================================== */
export function toggleFab() {
  const fab = document.getElementById('fab');
  fab.classList.toggle('open');
  // Hide/show chatbot FAB to avoid overlap with fab-menu items
  const chatFab = document.getElementById('chatbotFab');
  if (chatFab) chatFab.style.display = fab.classList.contains('open') ? 'none' : '';
}

/* ========================================
   REFERENCE FILTERS
   ======================================== */
export function filterRefs(query) {
  const q = query.toLowerCase();
  document.querySelectorAll('#refList .ref-link-item').forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(q) ? '' : 'none';
  });
}

export function filterRefCat(cat, btn) {
  document.querySelectorAll('.news-filters .news-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#refList .ref-link-item').forEach(item => {
    item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
  });
}

/* ========================================
   TIME INDICATOR (day-of use)
   ======================================== */
export function checkTimeIndicator() {
  const now = new Date();
  // Only activate on March 14, 2026
  if (now.getFullYear() !== 2026 || now.getMonth() !== 2 || now.getDate() !== 14) return;
  document.querySelectorAll('.timeline-block').forEach(block => {
    block.classList.remove('now');
  });
  // Simplified time check - can be enhanced
}

/* ========================================
   LEVEL SWITCHER (now static badge + class info)
   ======================================== */
/* Batch-aware class info: venue/instructor varies by 차수 */
const CLASS_INFO_PYEONGTAEK = {
  A: { room: 'TBD', instructor: 'TBD' },
  B: { room: '채움관 303호', instructor: '이상훈 (CMDS)' },
  C: { room: '채움관 307호', instructor: '허승연 (CMDS)' },
  D: { room: '채움관 201호', instructor: '박준 (CMDS)' },
  E: { room: '채움관 205호', instructor: '구요한 (CMDS)' },
  F: { room: 'CEO 사전학습용', instructor: '' },
};
const CLASS_INFO_PYEONGTAEK_SWAP = { // 4차수: A반 추가, D/E 강의장 스왑
  A: { room: '채움관 301호', instructor: '장현민' },
  B: { room: '채움관 303호', instructor: '이상훈 (CMDS)' },
  C: { room: '채움관 307호', instructor: '허승연 (CMDS)' },
  D: { room: '채움관 205호', instructor: '박준 (CMDS)' },
  E: { room: '채움관 201호', instructor: '구요한 (CMDS)' },
  F: { room: 'CEO 사전학습용', instructor: '' },
};
const CLASS_INFO_INHWAWON = {
  A: { room: '교육관E 남촌홀', instructor: '장현민' },
  B: { room: '교육관E 203호', instructor: '이상훈 (CMDS)' },
  C: { room: '교육관E 204호', instructor: '허승연 (CMDS)' },
  D: { room: '교육관E 205호', instructor: '박준 (CMDS)' },
  E: { room: '교육관E 207호', instructor: '구요한 (CMDS)' },
  F: { room: 'CEO 사전학습용', instructor: '' },
};
const CLASS_INFO_INHWAWON_W = { // 3차수: 교육관W
  A: { room: '친교관2층', instructor: '장현민' },
  B: { room: '교육관W 101호', instructor: '이상훈 (CMDS)' },
  C: { room: '교육관W 204호', instructor: '허승연 (CMDS)' },
  D: { room: '교육관W 205호', instructor: '박준 (CMDS)' },
  E: { room: '교육관W 208호', instructor: '구요한 (CMDS)' },
  F: { room: 'CEO 사전학습용', instructor: '' },
};
const CLASS_INFO_HWAHAK = { // 6차수: LG화학 리더십센터 (오산)
  A: { room: '본관 208호', instructor: '장현민' },
  B: { room: '본관 209호', instructor: '이상훈 (CMDS)' },
  C: { room: '본관 311호', instructor: '허승연 (CMDS)' },
  D: { room: '본관 312호', instructor: '박준 (CMDS)' },
  E: { room: '본관 415호', instructor: '구요한 (CMDS)' },
  F: { room: 'CEO 사전학습용', instructor: '' },
};

export function getClassInfo(batch) {
  if (batch === CEO_BATCH || batch === COACHING_BATCH) return null; // CEO/코칭: 분반 없음
  if (batch === 4) return CLASS_INFO_PYEONGTAEK_SWAP;
  if (batch === 1) return CLASS_INFO_PYEONGTAEK;
  if (batch === 3) return CLASS_INFO_INHWAWON_W;
  if (batch === 6) return CLASS_INFO_HWAHAK;
  return CLASS_INFO_INHWAWON; // 2,5차수
}

/* ========================================
   CEO BATCH UTILITIES
   ======================================== */
export const CEO_BATCH = 7;
export function isCeoBatch(batch) { return batch === CEO_BATCH; }
export const COACHING_BATCH = 8;
export function isCoachingBatch(batch) { return batch === COACHING_BATCH; }
export function isCeoLikeBatch(batch) { return isCeoBatch(batch) || isCoachingBatch(batch); }
export function getCourseTitle(_batch) {
  return siteConfig.title;
}
export function getCourseSubtitle(_batch) {
  return siteConfig.subtitle;
}
export function applyCeoTextReplacements(html) {
  const protect = [['임원회의실', '___EXEC_ROOM___'], ['임원 의사결정', '___EXEC_DECISION___'], ['임원분들', '___EXEC_MEMBERS___']];
  protect.forEach(([term, ph]) => { html = html.replaceAll(term, ph); });
  // 한국어 조사 보정: "임원"(받침 ㄴ) → "리더"(받침 없음)
  html = html.replaceAll('임원이', '리더가');
  html = html.replaceAll('임원을', '리더를');
  html = html.replaceAll('임원은', '리더는');
  html = html.replaceAll('임원으로', '리더로');
  html = html.replaceAll('임원과', '리더와');
  html = html.replaceAll('임원', '리더');
  protect.forEach(([term, ph]) => { html = html.replaceAll(ph, term); });
  return html;
}

export const BATCH_META = {
  1: { date: '2026.06.23 (월) · 06.25 (수)', location: 'LG인화원', companies: '팀장 대상 (1차 28명 · 2차 20명)' },
  2: { date: '2026.06.23 (월) · 06.25 (수)', location: 'LG인화원', companies: '팀장 대상 (1차 28명 · 2차 20명)' },
  3: { date: '2026.06.23 (월) · 06.25 (수)', location: 'LG인화원', companies: '팀장 대상 (1차 28명 · 2차 20명)' },
  4: { date: '2026.06.23 (월) · 06.25 (수)', location: 'LG인화원', companies: '팀장 대상 (1차 28명 · 2차 20명)' },
  5: { date: '2026.06.23 (월) · 06.25 (수)', location: 'LG인화원', companies: '팀장 대상 (1차 28명 · 2차 20명)' },
  6: { date: '2026.06.23 (월) · 06.25 (수)', location: 'LG인화원', companies: '팀장 대상 (1차 28명 · 2차 20명)' },
  7: { date: '2026.06.23 (월) · 06.25 (수)', location: 'LG인화원', companies: '팀장 대상 (1차 28명 · 2차 20명)' },
  99: { date: '2026.06.23 (월) · 06.25 (수)', location: 'LG인화원', companies: '팀장 대상 (1차 28명 · 2차 20명)' },
  8: { date: '2026.06.23 (월) · 06.25 (수)', location: 'LG인화원', companies: '팀장 대상 (1차 28명 · 2차 20명)' },
};

export function isInhwawonBatch(batch) {
  return [2, 3, 5, 6].includes(batch);
}

// Backward compat: defaults to STATE.currentBatch
const CLASS_INFO = getClassInfo(STATE.currentBatch || 2);

export function toggleLevelDropdown() {
  // No-op: dropdown removed, badge is now static
}

export function selectLevel(level) {
  // No-op: level switching removed
}

export function updateLevelUI() {
  // Always sync sidebar date/location regardless of role
  updateSidebarMeta();

  const levelMap = { A: 'A반', B: 'B반', C: 'C반', D: 'D반', E: 'E반', F: 'F반' };
  const badge = document.getElementById('levelBadge');
  const switcher = document.getElementById('levelSwitcher');
  if (!badge || !switcher) return;

  // 관리자 또는 CEO 배치는 분반 정보 표시 안함
  if (STATE.isAdmin || STATE.user?.role === 'admin' || isCeoLikeBatch(STATE.currentBatch)) {
    switcher.style.display = 'none';
    return;
  }

  if (STATE.currentLevel) {
    switcher.style.display = '';
    badge.textContent = levelMap[STATE.currentLevel] || STATE.currentLevel;
    badge.className = 'level-badge level-' + STATE.currentLevel;
    badge.style.cursor = 'default';
    badge.removeAttribute('onclick');

    // Show class info next to badge
    let infoEl = document.getElementById('classInfoLabel');
    const info = getClassInfo(STATE.currentBatch)?.[STATE.currentLevel];
    if (info) {
      if (!infoEl) {
        infoEl = document.createElement('span');
        infoEl.id = 'classInfoLabel';
        infoEl.className = 'class-info';
        badge.parentNode.insertBefore(infoEl, badge.nextSibling);
      }
      const teamStr = (isInhwawonBatch(STATE.currentBatch) && STATE.user?.group_number) ? ` · ${STATE.user.group_number}팀` : '';
      infoEl.textContent = info.instructor ? `${info.room} · ${info.instructor}${teamStr}` : info.room;
    } else if (infoEl) {
      infoEl.textContent = '';
    }
  } else {
    switcher.style.display = 'none';
  }

}

export { CLASS_INFO };

/* ========================================
   SIDEBAR DATE/LOCATION SYNC
   ======================================== */
export function updateSidebarMeta() {
  const el = document.getElementById('sidebarDateLocation');
  if (el) {
    const meta = BATCH_META[STATE.currentBatch];
    if (meta && meta.date) {
      el.textContent = `${meta.date.replace(/ \(.\)/, '')} ${meta.location}`;
      el.style.display = '';
    } else {
      el.textContent = '';
      el.style.display = 'none';
    }
  }
  const titleEl = document.querySelector('.sidebar-logo-title');
  if (titleEl) titleEl.textContent = siteConfig.title;
  document.title = siteConfig.title;
}

/* ========================================
   SHARED RESOURCES POPUP
   ======================================== */
const SHARED_RESOURCES = {
  2: {
    B: { label: 'B반 Padlet', url: 'https://padlet.com/johnfkoo951/lg-ax-camp-for-leaders-2-28-b-vs5u392e6c816hz1' },
    C: { label: 'C반 Padlet', url: 'https://padlet.com/johnfkoo951/lg-ax-camp-for-leaders-2-28-c-vu11px2vdi40eobt' },
    D: { label: 'D반 Padlet', url: 'https://padlet.com/johnfkoo951/lg-ax-camp-for-leaders-2-28-d-ctymik8lynwo5jyu' },
    E: { label: 'E반 Padlet', url: 'https://padlet.com/johnfkoo951/lg-ax-camp-for-leaders-2-28-e-9rtsqr23w7ecn0oh' },
  },
  3: {
    B: { label: 'B반 Padlet', url: 'https://padlet.com/johnfkoo951/lg-ax-camp-for-leaders-3-1-b-l345nkha2ygztcld' },
    C: { label: 'C반 Padlet', url: 'https://padlet.com/johnfkoo951/lg-ax-camp-for-leaders-3-1-c-ryl2eafyh3k161xj' },
    D: { label: 'D반 Padlet', url: 'https://padlet.com/johnfkoo951/lg-ax-camp-for-leaders-3-1-d-20f4aa7iizcpqw4r' },
    E: { label: 'E반 Padlet', url: 'https://padlet.com/johnfkoo951/lg-ax-camp-for-leaders-3-1-e-4z16vj3f1ljcsjmp' },
  },
  4: {
    B: { label: 'B반 Padlet', url: 'https://padlet.com/johnfkoo951/lg-ax-camp-for-leaders-3-6-b-6lbwtimq4d2rkit9' },
    C: { label: 'C반 Padlet', url: 'https://padlet.com/johnfkoo951/lg-ax-camp-for-leaders-3-6-c-16jvpzey53mdfqp3' },
    D: { label: 'D반 Padlet', url: 'https://padlet.com/johnfkoo951/lg-ax-camp-for-leaders-3-6-d-poiybu274sbq1vk4' },
    E: { label: 'E반 Padlet', url: 'https://padlet.com/johnfkoo951/lg-ax-camp-for-leaders-3-6-e-caylorl8n27rllr0' },
  },
  5: {
    B: { label: 'B반 Padlet', url: 'https://padlet.com/johnfkoo951/lg-ax-camp-for-leaders-3-7-b-s16g395k5t5hbosl' },
    C: { label: 'C반 Padlet', url: 'https://padlet.com/johnfkoo951/lg-ax-camp-for-leaders-3-7-c-ej6o054gtdpu28no' },
    D: { label: 'D반 Padlet', url: 'https://padlet.com/johnfkoo951/lg-ax-camp-for-leaders-3-7-d-pou8ut4uwpp4vsne' },
    E: { label: 'E반 Padlet', url: 'https://padlet.com/johnfkoo951/lg-ax-camp-for-leaders-3-7-e-facxwr6zectfan7h' },
  },
  6: {
    B: { label: 'B반 Padlet', url: 'https://padlet.com/johnfkoo951/lg-ax-camp-for-leaders-3-8-b-29jsomznqvg0m7la' },
    C: { label: 'C반 Padlet', url: 'https://padlet.com/johnfkoo951/lg-ax-camp-for-leaders-3-8-c-9ljcnqb0ds1ah6l8' },
    D: { label: 'D반 Padlet', url: 'https://padlet.com/johnfkoo951/lg-ax-camp-for-leaders-3-8-d-lxgsj8gujm1w2969' },
    E: { label: 'E반 Padlet', url: 'https://padlet.com/johnfkoo951/lg-ax-camp-for-leaders-3-8-e-bx8itoqrra2son4b' },
  },
  7: {
    _single: { label: 'CEO Padlet', url: 'https://padlet.com/johnfkoo951/lg-ax-camp-for-ceo-3-14-q5uubgcbodl98bsb' },
  },
};

function openSharedResources() {
  const batch = STATE.currentBatch;
  const level = STATE.currentLevel;
  const resources = SHARED_RESOURCES[batch];
  const body = document.getElementById('sharedResourcesBody');
  if (!body) return;

  if (!resources || Object.keys(resources).length === 0) {
    body.innerHTML = '<p class="sr-empty">이 차수에 등록된 공유 자료가 없습니다.</p>';
  } else if (resources._single) {
    // CEO batch: single link, no class division
    const r = resources._single;
    body.innerHTML = `<a class="sr-link sr-link-active" href="${r.url}" target="_blank" rel="noopener noreferrer">
      <span class="sr-link-label">${r.label}</span>
      <i data-lucide="external-link" style="width:14px;height:14px;flex-shrink:0;opacity:0.4;"></i>
    </a>`;
  } else {
    const isAdmin = STATE.user?.role === 'admin';
    if (isAdmin) {
      // Admin: show all classes
      const items = Object.entries(resources).map(([cls, r]) => `<a class="sr-link" href="${r.url}" target="_blank" rel="noopener noreferrer">
        <span class="sr-link-badge level-${cls}">${cls}반</span>
        <span class="sr-link-label">${r.label}</span>
        <i data-lucide="external-link" style="width:14px;height:14px;flex-shrink:0;opacity:0.4;"></i>
      </a>`).join('');
      body.innerHTML = items;
    } else {
      // Non-admin: show only my class
      const myResource = resources[level];
      if (myResource) {
        body.innerHTML = `<a class="sr-link sr-link-active" href="${myResource.url}" target="_blank" rel="noopener noreferrer">
          <span class="sr-link-badge level-${level}">${level}반</span>
          <span class="sr-link-label">${myResource.label}</span>
          <i data-lucide="external-link" style="width:14px;height:14px;flex-shrink:0;opacity:0.4;"></i>
        </a>`;
      } else {
        body.innerHTML = '<p class="sr-empty">내 반에 등록된 공유 자료가 없습니다.</p>';
      }
    }
  }

  document.getElementById('sharedResourcesOverlay').classList.add('show');
  document.getElementById('sharedResourcesPopup').classList.add('show');
  initIcons();
}

function closeSharedResources() {
  document.getElementById('sharedResourcesOverlay')?.classList.remove('show');
  document.getElementById('sharedResourcesPopup')?.classList.remove('show');
}

window.openSharedResources = openSharedResources;
window.closeSharedResources = closeSharedResources;

/* ========================================
   LMS MENU (topbar hamburger)
   ======================================== */
export function toggleLmsMenu() {
  document.getElementById('lmsMenuDropdown')?.classList.toggle('show');
}

/* ========================================
   ROLE-BASED MENU ITEMS
   ======================================== */
export function updateRoleMenu() {
  const container = document.getElementById('lmsMenuRoleItems');
  const participantItems = document.getElementById('lmsMenuParticipantItems');
  if (!container) return;

  const role = STATE.user?.role;

  // Hide participant items and top-level chatbot button for admin/TA/instructor
  const isStaffRole = role === 'admin' || role === 'ta' || role === 'instructor';
  if (participantItems) {
    participantItems.style.display = isStaffRole ? 'none' : '';
  }
  const topChatbotBtn = document.querySelector('#lmsMenuDropdown > [data-feature="chatbot"]');
  if (topChatbotBtn) {
    topChatbotBtn.style.display = isStaffRole ? 'none' : '';
  }

  let html = '';
  const sharedResourcesBtn = '<button class="lms-menu-item" data-feature="shared_resources" onclick="openSharedResources(); toggleLmsMenu()"><i data-lucide="share-2" class="menu-icon"></i> 자료/결과물 공유</button>';

  // Course view switcher for admin/instructor
  const courseSwitcherHtml = (role === 'admin' || role === 'instructor') ? (() => {
    const cur = STATE.currentBatch;
    const currentLabel = isCoachingBatch(cur) ? '1:1 코칭' : isCeoBatch(cur) ? 'CEO 교육' : 'Leaders 교육';
    const options = [];
    if (!isCeoBatch(cur)) options.push({ batch: CEO_BATCH, icon: 'crown', label: 'CEO 교육 보기' });
    if (isCeoLikeBatch(cur)) options.push({ batch: 1, icon: 'users', label: 'Leaders 교육 보기' });
    if (!isCoachingBatch(cur)) options.push({ batch: COACHING_BATCH, icon: 'user-check', label: '1:1 코칭 보기' });
    const buttons = options.map(o =>
      `<button class="lms-menu-item" onclick="switchCourseView(${o.batch}); toggleLmsMenu()"><i data-lucide="${o.icon}" class="menu-icon"></i> ${o.label}</button>`
    ).join('');
    return `<div class="lms-menu-divider"></div>
      <div style="padding:4px 16px;font-size:0.7rem;color:var(--text-muted);">현재: ${currentLabel}</div>
      ${buttons}
      <div class="lms-menu-divider"></div>`;
  })() : '';

  const chatbotBtn = '<button class="lms-menu-item" data-feature="chatbot" onclick="openPanel(\'chatbot\'); toggleLmsMenu()"><i data-lucide="bot" class="menu-icon"></i> AI 챗봇</button>';

  if (role === 'admin') {
    html = `
      <button class="lms-menu-item lms-menu-role" onclick="location.hash='#admin'; toggleLmsMenu()"><i data-lucide="settings" class="menu-icon"></i> 관리자 대시보드</button>
      <button class="lms-menu-item lms-menu-role" onclick="location.hash='#ta-dashboard'; toggleLmsMenu()"><i data-lucide="radio" class="menu-icon"></i> 보조강사 모니터</button>
      <button class="lms-menu-item lms-menu-role" onclick="location.hash='#ta-questions'; toggleLmsMenu()"><i data-lucide="message-square-text" class="menu-icon"></i> 보조강사 질문관리</button>
      ${chatbotBtn}
      ${sharedResourcesBtn}
      <button class="lms-menu-item" onclick="openPanel('questions'); toggleLmsMenu()"><i data-lucide="help-circle" class="menu-icon"></i> 실시간 질문</button>
      <button class="lms-menu-item" onclick="location.hash='#faq'; toggleLmsMenu()"><i data-lucide="book-open" class="menu-icon"></i> FAQ</button>
      ${courseSwitcherHtml}
    `;
  } else if (role === 'instructor') {
    html = `
      <button class="lms-menu-item lms-menu-role" onclick="location.hash='#ta-dashboard'; toggleLmsMenu()"><i data-lucide="radio" class="menu-icon"></i> 보조강사 호출 모니터</button>
      <button class="lms-menu-item lms-menu-role" onclick="location.hash='#ta-questions'; toggleLmsMenu()"><i data-lucide="message-square-text" class="menu-icon"></i> 질문관리</button>
      ${chatbotBtn}
      ${sharedResourcesBtn}
      <button class="lms-menu-item" onclick="openPanel('questions'); toggleLmsMenu()"><i data-lucide="help-circle" class="menu-icon"></i> 실시간 질문</button>
      <button class="lms-menu-item" onclick="location.hash='#faq'; toggleLmsMenu()"><i data-lucide="book-open" class="menu-icon"></i> FAQ</button>
      ${courseSwitcherHtml}
    `;
  } else if (role === 'ta') {
    html = `
      <button class="lms-menu-item lms-menu-role" onclick="location.hash='#ta-dashboard'; toggleLmsMenu()"><i data-lucide="radio" class="menu-icon"></i> 보조강사 모니터</button>
      <button class="lms-menu-item lms-menu-role" onclick="location.hash='#ta-questions'; toggleLmsMenu()"><i data-lucide="message-square-text" class="menu-icon"></i> 질문관리</button>
      ${chatbotBtn}
      ${sharedResourcesBtn}
      <button class="lms-menu-item" onclick="openPanel('questions'); toggleLmsMenu()"><i data-lucide="help-circle" class="menu-icon"></i> 실시간 질문</button>
      <button class="lms-menu-item" onclick="location.hash='#faq'; toggleLmsMenu()"><i data-lucide="book-open" class="menu-icon"></i> FAQ</button>
    `;
  }

  container.innerHTML = html;
  initIcons();

  // Apply feature flags for all roles
  applyFeatureFlags();
}

/* feature flag system removed in static build */
function applyFeatureFlags() { /* no-op */ }

/* ========================================
   EXPOSE TO WINDOW (for onclick handlers in HTML)
   ======================================== */
window.copyPrompt = copyPrompt;
window.closeMobile = closeMobile;
window.toggleFab = toggleFab;
window.changeFontSize = changeFontSize;
window.resetFontSize = resetFontSize;
window.toggleBookmark = toggleBookmark;
window.downloadFile = downloadFile;
window.navigatePrev = navigatePrev;
window.navigateNext = navigateNext;
window.filterRefs = filterRefs;
window.filterRefCat = filterRefCat;
window.toggleLevelDropdown = toggleLevelDropdown;
window.selectLevel = selectLevel;
window.updateLevelUI = updateLevelUI;
/* ---- Course View Switcher (admin/instructor) ---- */
export function switchCourseView(batch) {
  STATE.currentBatch = batch;
  sessionStorage.setItem('axcamp-batch', String(batch));
  // Re-render current page
  updateRoleMenu();
  updateSidebarMeta();
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}
window.switchCourseView = switchCourseView;

window.toggleLmsMenu = toggleLmsMenu;
window.updateRoleMenu = updateRoleMenu;

/* ========================================
   SIDEBAR RESIZE (drag handle)
   ======================================== */
const SB_MIN = 200;
const SB_MAX = 420;
const SB_DEFAULT = 280;

export function initSidebarResize() {
  const handle = document.getElementById('sidebarResizeHandle');
  if (!handle) return;
  const saved = parseInt(localStorage.getItem('axcamp-sb-width'), 10);
  if (saved && saved >= SB_MIN && saved <= SB_MAX) setSidebarWidth(saved);

  handle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    handle.classList.add('active');
    document.body.classList.add('sidebar-resizing');
    const onMove = (ev) => setSidebarWidth(Math.min(SB_MAX, Math.max(SB_MIN, ev.clientX)));
    const onUp = () => {
      handle.classList.remove('active');
      document.body.classList.remove('sidebar-resizing');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      localStorage.setItem('axcamp-sb-width', String(Math.round(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sidebar-width')))));
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });

  // Double-click to reset
  handle.addEventListener('dblclick', () => {
    setSidebarWidth(SB_DEFAULT);
    localStorage.removeItem('axcamp-sb-width');
  });
}

function setSidebarWidth(px) {
  document.documentElement.style.setProperty('--sidebar-width', px + 'px');
}

/* ========================================
   F반 안내 모달
   ======================================== */
export function showFclassModalIfNeeded() {
  if (STATE.currentLevel !== 'F') return;
  if (isCeoLikeBatch(STATE.currentBatch)) return;
  if (sessionStorage.getItem('axcamp-fclass-shown')) return;
  document.getElementById('fclassOverlay')?.classList.add('show');
  document.getElementById('fclassModal')?.classList.add('show');
  sessionStorage.setItem('axcamp-fclass-shown', '1');
}

function closeFclassModal() {
  document.getElementById('fclassOverlay')?.classList.remove('show');
  document.getElementById('fclassModal')?.classList.remove('show');
}
window.closeFclassModal = closeFclassModal;

/* ========================================
   CHATBOT ANNOUNCEMENT POPUP
   ======================================== */
export function showChatbotAnnouncement() {
  // Don't show for admins or if no user is logged in
  if (!STATE.user?.id || STATE.isAdmin || STATE.user?.role === 'admin') return;

  // Remove legacy browser-wide key (old code artifact)
  localStorage.removeItem('axcamp-chatbot-announced');

  const userKey = STATE.user.email || STATE.user.id;
  const key = `axcamp-chatbot-announced-${userKey}`;
  if (localStorage.getItem(key)) return;

  const overlay = document.createElement('div');
  overlay.className = 'chatbot-announce';
  overlay.id = 'chatbotAnnounce';
  overlay.innerHTML = `
    <div class="chatbot-announce-card">
      <div class="chatbot-announce-icon"><i data-lucide="sparkles" style="width:28px;height:28px;color:var(--brand)"></i></div>
      <h3 class="chatbot-announce-title">AI 학습 도우미가 추가되었습니다</h3>
      <p class="chatbot-announce-desc">교육 자료를 바탕으로 궁금한 점을 물어보세요.<br>우측 하단의 <strong>로봇 아이콘</strong>을 클릭해 시작하세요.</p>
      <button class="chatbot-announce-btn" id="chatbotAnnounceBtn">확인</button>
    </div>
  `;
  document.body.appendChild(overlay);
  initIcons();

  document.getElementById('chatbotAnnounceBtn').addEventListener('click', () => {
    overlay.remove();
    localStorage.setItem(key, '1');
  });
}
