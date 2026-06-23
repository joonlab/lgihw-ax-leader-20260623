/* ========================================
   CODE COPY BUTTONS
   복붙 프롬프트(다크 코드박스 #1a1a1a)마다 '복사' 버튼을 자동 주입.
   (보조강사 피드백: 복사 버튼이 없어 드래그해야 함)
   ======================================== */
export function setupCopyButtons(root) {
  if (!root) return;
  const boxes = root.querySelectorAll('div[style*="#1a1a1a"]');
  boxes.forEach((box) => {
    if (box.dataset.copyReady) return;
    const pre = box.querySelector('pre');
    if (!pre) return;
    box.dataset.copyReady = '1';
    box.style.position = 'relative';
    box.style.paddingTop = '40px';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', '프롬프트 복사');
    const IDLE_BG = 'rgba(255,255,255,0.14)';
    const IDLE_BORDER = 'rgba(255,255,255,0.32)';
    btn.style.cssText =
      'position:absolute;top:8px;right:8px;display:inline-flex;align-items:center;gap:5px;' +
      'background:' + IDLE_BG + ';color:#fff;border:1px solid ' + IDLE_BORDER + ';' +
      'border-radius:6px;padding:5px 12px;font-size:0.74rem;font-weight:600;cursor:pointer;' +
      'font-family:inherit;line-height:1.2;transition:background 0.15s;z-index:3';
    btn.innerHTML = '<span style="font-size:0.85em">📋</span><span>복사</span>';

    btn.addEventListener('mouseenter', () => {
      if (!btn.dataset.copied) btn.style.background = 'rgba(255,255,255,0.26)';
    });
    btn.addEventListener('mouseleave', () => {
      if (!btn.dataset.copied) btn.style.background = IDLE_BG;
    });

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const text = pre.innerText;
      const done = () => {
        btn.dataset.copied = '1';
        btn.innerHTML = '<span>✓ 복사됨</span>';
        btn.style.background = 'var(--brand)';
        btn.style.borderColor = 'var(--brand)';
        setTimeout(() => {
          delete btn.dataset.copied;
          btn.innerHTML = '<span style="font-size:0.85em">📋</span><span>복사</span>';
          btn.style.background = IDLE_BG;
          btn.style.borderColor = IDLE_BORDER;
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(() => selectFallback(pre));
      } else {
        selectFallback(pre);
      }
    });

    box.appendChild(btn);
  });
}

function selectFallback(pre) {
  try {
    const range = document.createRange();
    range.selectNodeContents(pre);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } catch (e) { /* noop */ }
}
