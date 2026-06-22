/* ========================================
   UTILITIES
   ======================================== */
import { CURRICULUM } from '../data/curriculum.js';
import { STATE } from './state.js';

export function getAllClips() {
  const all = [];
  CURRICULUM.forEach(ch => ch.clips.forEach(clip => all.push(ch.id + '-' + clip.id)));
  return all;
}

export function getClipTitle(key) {
  const [chId, clipId] = key.split('-');
  const ch = CURRICULUM.find(c => c.id === chId);
  if (!ch) return '';
  const clip = ch.clips.find(c => c.id === clipId);
  return clip ? clip.title : '';
}

export function markVisited(key) {
  if (!STATE.visited.includes(key)) {
    STATE.visited.push(key);
    localStorage.setItem('axcamp-visited', JSON.stringify(STATE.visited));
    const link = document.querySelector(`.sidebar-clip-link[data-key="${key}"]`);
    if (link) link.classList.add('visited');
  }
}

export function updateProgress() {
  const allClips = getAllClips();
  const total = allClips.length;
  const allSet = new Set(allClips);
  const done = STATE.visited.filter(v => allSet.has(v)).length;
  const pct = total > 0 ? Math.min(done / total * 100, 100) : 0;
  const progressText = document.getElementById('progressText');
  const progressFill = document.getElementById('progressFill');
  if (progressText) progressText.textContent = `${done} / ${total}`;
  if (progressFill) progressFill.style.width = pct + '%';
}
