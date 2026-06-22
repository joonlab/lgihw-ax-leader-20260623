/* ========================================
   APP ENTRY POINT (lightweight static build)
   ======================================== */

import './icons.js';
import './ui.js';
import './panel.js';
import './image-modal.js';
import './image-fallback.js';

import './renderers/card-news.js';
import './renderers/tool-pantry.js';

import { buildSidebar } from './sidebar.js';
import { navigate } from './router.js';
import {
  applyFontSize,
  updateLevelUI,
  initSidebarResize,
  setupScrollProgress,
  closeMobile,
  checkTimeIndicator,
  initNavAutoHide,
  initScrollIndicator,
} from './ui.js';

window.addEventListener('DOMContentLoaded', () => {
  applyFontSize();
  buildSidebar();
  initSidebarResize();
  navigate();
  updateLevelUI();
  setupScrollProgress();
  initNavAutoHide();
  initScrollIndicator();
});

window.addEventListener('hashchange', navigate);

document.getElementById('hamburger').addEventListener('click', () => {
  const sidebar = document.getElementById('sidebar');
  const isOpen = sidebar.classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('show', isOpen);
  document.getElementById('hamburger').classList.toggle('open', isOpen);
});

document.getElementById('sidebarOverlay').addEventListener('click', closeMobile);

document.addEventListener('click', (e) => {
  const fab = document.getElementById('fab');
  if (fab && !fab.contains(e.target)) fab.classList.remove('open');
});

setInterval(checkTimeIndicator, 60000);
checkTimeIndicator();
