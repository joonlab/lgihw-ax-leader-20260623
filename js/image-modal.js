/* ========================================
   IMAGE MODAL — 클릭 시 전체화면 + ESC/X 닫기
   글로벌 함수 window.openImageModal(src, alt)로 호출
   ======================================== */

let modalEl = null;

function ensureModal() {
  if (modalEl) return modalEl;
  modalEl = document.createElement('div');
  modalEl.id = 'imageModal';
  modalEl.style.cssText =
    'display:none;position:fixed;inset:0;z-index:9999;' +
    'background:rgba(0,0,0,0.88);align-items:center;justify-content:center;' +
    'padding:24px;cursor:zoom-out';
  modalEl.innerHTML =
    '<button class="img-modal-close" aria-label="닫기" ' +
    'style="position:fixed;top:20px;right:24px;width:44px;height:44px;' +
    'border-radius:50%;border:none;background:rgba(255,255,255,0.18);' +
    'color:#fff;font-size:1.5rem;line-height:1;cursor:pointer;' +
    'display:flex;align-items:center;justify-content:center;' +
    'backdrop-filter:blur(8px);font-weight:300">×</button>' +
    '<img id="imageModalImg" src="" alt="" ' +
    'style="max-width:100%;max-height:100%;object-fit:contain;' +
    'border-radius:8px;cursor:default" />';
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) closeImageModal();
  });
  modalEl.querySelector('.img-modal-close').addEventListener('click', closeImageModal);
  document.body.appendChild(modalEl);
  return modalEl;
}

export function openImageModal(src, alt = '') {
  const m = ensureModal();
  const img = m.querySelector('#imageModalImg');
  img.src = src;
  img.alt = alt;
  m.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

export function closeImageModal() {
  if (!modalEl) return;
  modalEl.style.display = 'none';
  document.body.style.overflow = '';
}

window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalEl && modalEl.style.display !== 'none') {
    closeImageModal();
  }
});
