/* ========================================
   STATE
   ======================================== */
export const STATE = {
  visited: JSON.parse(localStorage.getItem('axcamp-visited') || '[]'),
  bookmarks: JSON.parse(localStorage.getItem('axcamp-bookmarks') || '[]'),
  fontLevel: parseInt(localStorage.getItem('axcamp-font') || '0'),
  currentRoute: 'home',
  user: JSON.parse(sessionStorage.getItem('axcamp-user') || 'null'),
  isAdmin: sessionStorage.getItem('axcamp-admin') === 'true',
  currentLevel: sessionStorage.getItem('axcamp-level') || null,
  currentBatch: parseInt(sessionStorage.getItem('axcamp-batch')) || null,
  activePanel: null,
};
