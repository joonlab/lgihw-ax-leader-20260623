/* ========================================
   IMAGE FALLBACK
   깨진 이미지를 우아한 placeholder로 자동 교체
   ======================================== */

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function createPlaceholder(img) {
  const ph = document.createElement('div');
  ph.className = 'img-placeholder';
  const alt = img.getAttribute('alt') || '이미지 미리보기';
  ph.innerHTML = `
    <span class="img-placeholder-icon" aria-hidden="true">🖼️</span>
    <span class="img-placeholder-text">${escapeHtml(alt)}</span>
    <span class="img-placeholder-hint">실제 화면은 강의 시연으로 확인</span>
  `;
  return ph;
}

document.addEventListener('error', (e) => {
  const t = e.target;
  if (t && t.tagName === 'IMG' && !t.dataset.fallback) {
    t.dataset.fallback = '1';
    try {
      t.replaceWith(createPlaceholder(t));
    } catch (_) {
      t.style.display = 'none';
    }
  }
}, true);
