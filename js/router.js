/* ========================================
   ROUTER (lightweight static)
   ======================================== */
import { STATE } from './state.js';
import { markVisited, updateProgress } from './utils.js';
import { buildSidebar, updateSidebarActive } from './sidebar.js';
import { updateBreadcrumb } from './breadcrumb.js';
import { updateBookmarkBtn, updateLevelUI } from './ui.js';
import { renderHome } from './renderers/home.js';
import { renderClip } from './renderers/clip.js';
import { initIcons } from './icons.js';
import { applyTooltips } from './tooltip.js';
import { setupMdEditors } from './md-editor.js';
import { setupCopyButtons } from './copy-buttons.js';

const PAGE_CLASSES = ['page-print'];

function clearPageClasses() {
  document.body.classList.remove(...PAGE_CLASSES);
}

export function parseRoute() {
  const hash = location.hash.slice(1) || 'home';
  if (hash === 'home') return { page: 'home' };
  if (hash === 'print') return { page: 'print' };
  const pm = hash.match(/^print-(ch\d+)$/);
  if (pm) return { page: 'print', chId: pm[1] };
  const m = hash.match(/^(ch\d+)-(clip\d+)$/);
  if (m) return { page: 'clip', chId: m[1], clipId: m[2] };
  return { page: 'home' };
}

export async function navigate() {
  const route = parseRoute();
  STATE.currentRoute = location.hash.slice(1) || 'home';
  const el = document.getElementById('mainContent');

  clearPageClasses();
  if (route.page === 'print') document.body.classList.add('page-print');

  el.classList.remove('page-enter');
  void el.offsetWidth;
  el.classList.add('page-enter');

  buildSidebar();
  updateLevelUI();

  if (route.page === 'print') {
    const { renderPrintView } = await import('./renderers/print.js');
    renderPrintView(el, route.chId || null);
    updateBreadcrumb([{ label: 'Print View' }]);
    window.scrollTo({ top: 0, behavior: 'instant' });
    initIcons();
    return;
  }

  if (route.page === 'home') {
    renderHome(el);
    updateBreadcrumb([]);
  } else {
    await renderClip(el, route.chId, route.clipId);
    markVisited(route.chId + '-' + route.clipId);
  }
  updateSidebarActive();
  updateProgress();
  updateBookmarkBtn();
  window.scrollTo({ top: 0, behavior: 'instant' });
  initIcons();
  try { applyTooltips(document.getElementById('mainContent')); } catch (e) { console.error('applyTooltips error:', e); }
  try { setupMdEditors(document.getElementById('mainContent')); } catch (e) { console.error('setupMdEditors error:', e); }
  try { setupCopyButtons(document.getElementById('mainContent')); } catch (e) { console.error('setupCopyButtons error:', e); }
}
