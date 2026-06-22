/* ========================================
   MARKDOWN LIVE EDITOR
   ======================================== */

function renderSimpleMarkdown(text) {
  // Escape HTML
  let safe = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const lines = safe.split('\n');
  const result = [];
  let inUl = false;
  let inOl = false;
  let inBlockquote = false;
  let listDepth = 0; // 0 = top-level, 1+ = nested

  const closeList = () => {
    if (inUl) {
      while (listDepth > 0) { result.push('</ul>'); listDepth--; }
      result.push('</ul>');
      inUl = false;
    }
    if (inOl) { result.push('</ol>'); inOl = false; }
  };
  const closeBlockquote = () => {
    if (inBlockquote) { result.push('</blockquote>'); inBlockquote = false; }
  };

  for (const line of lines) {
    // h6 ~ h4 (check longer prefixes first)
    if (line.startsWith('###### ')) {
      closeList(); closeBlockquote();
      result.push(`<h6>${line.slice(7)}</h6>`);
    } else if (line.startsWith('##### ')) {
      closeList(); closeBlockquote();
      result.push(`<h5>${line.slice(6)}</h5>`);
    } else if (line.startsWith('#### ')) {
      closeList(); closeBlockquote();
      result.push(`<h4>${line.slice(5)}</h4>`);
    } else if (line.startsWith('### ')) {
      closeList(); closeBlockquote();
      result.push(`<h3>${line.slice(4)}</h3>`);
    } else if (line.startsWith('## ')) {
      closeList(); closeBlockquote();
      result.push(`<h2>${line.slice(3)}</h2>`);
    } else if (line.startsWith('# ')) {
      closeList(); closeBlockquote();
      result.push(`<h1>${line.slice(2)}</h1>`);
    // Horizontal rule
    } else if (line.trim() === '---') {
      closeList(); closeBlockquote();
      result.push('<hr>');
    // Blockquote
    } else if (/^&gt; /.test(line)) {
      closeList();
      if (!inBlockquote) { result.push('<blockquote>'); inBlockquote = true; }
      result.push(line.slice(5)); // "&gt; " is 5 chars
    // Task list (checked)
    } else if (/^- \[x\] /.test(line)) {
      closeBlockquote();
      if (!inUl) { result.push('<ul class="task-list">'); inUl = true; }
      result.push(`<li class="task-item done"><input type="checkbox" checked disabled> ${line.slice(6)}</li>`);
    // Task list (unchecked)
    } else if (/^- \[ \] /.test(line)) {
      closeBlockquote();
      if (!inUl) { result.push('<ul class="task-list">'); inUl = true; }
      result.push(`<li class="task-item"><input type="checkbox" disabled> ${line.slice(6)}</li>`);
    // Nested unordered list (2+ spaces before -)
    } else if (/^ {2,}- /.test(line)) {
      closeBlockquote();
      const content = line.replace(/^ {2,}- /, '');
      if (!inUl) { result.push('<ul>'); inUl = true; }
      if (listDepth === 0) { result.push('<ul>'); listDepth = 1; }
      result.push(`<li>${content}</li>`);
    // Top-level unordered list
    } else if (/^- /.test(line)) {
      closeBlockquote();
      if (inUl && listDepth > 0) {
        while (listDepth > 0) { result.push('</ul>'); listDepth--; }
      }
      if (!inUl) { result.push('<ul>'); inUl = true; }
      result.push(`<li>${line.slice(2)}</li>`);
    // Ordered list
    } else if (/^\d+\. /.test(line)) {
      closeBlockquote();
      if (inUl) { closeList(); }
      if (!inOl) { result.push('<ol>'); inOl = true; }
      result.push(`<li>${line.replace(/^\d+\. /, '')}</li>`);
    } else {
      closeList(); closeBlockquote();
      if (line.trim() === '') {
        result.push('<br>');
      } else {
        result.push(`<p>${line}</p>`);
      }
    }
  }
  closeList();
  closeBlockquote();

  // Inline formatting (order matters to avoid conflicts)
  return result.join('')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
    .replace(/==(.+?)==/g, '<mark>$1</mark>');
}

export function setupMdEditors(container) {
  if (!container) return;
  const editors = container.querySelectorAll('.md-live-editor');
  editors.forEach(editor => {
    const input = editor.querySelector('.md-editor-input');
    const preview = editor.querySelector('.md-editor-preview');
    if (!input || !preview) return;

    const update = () => { preview.innerHTML = renderSimpleMarkdown(input.value); };
    input.addEventListener('input', update);
    update(); // initial render
  });
}
