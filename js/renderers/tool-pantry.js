/* ========================================
   TOOL PANTRY RENDERER
   ======================================== */
import { TOOLS_MCP, TOOLS_CLI } from '../../data/tools.js';

export function renderToolPantry() {
  let mcpHtml = '';
  TOOLS_MCP.forEach(t => {
    mcpHtml += `<div class="tool-item">
      <div style="flex:1"><div class="tool-name">${t.name}</div><div class="tool-desc">${t.description}</div><div class="tool-usecase">${t.useCase.split(',').map(u => '<span class="pill-tag">' + u.trim() + '</span>').join('')}</div></div>
      <a class="tool-link" href="${t.url}" target="_blank" rel="noopener">GitHub →</a>
    </div>`;
  });
  let cliHtml = '';
  TOOLS_CLI.forEach(t => {
    cliHtml += `<div class="tool-item">
      <div style="flex:1"><div class="tool-name">${t.name}</div><div class="tool-desc">${t.description}</div><div class="tool-usecase">${t.useCase.split(',').map(u => '<span class="pill-tag">' + u.trim() + '</span>').join('')}</div></div>
      <a class="tool-link" href="${t.url}" target="_blank" rel="noopener">Link →</a>
    </div>`;
  });
  return `<div class="clip-overview">AI 업무에 유용한 MCP 서버와 CLI 도구를 정리했습니다. 나중에 필요할 때 참고하세요.</div>
    <div class="clip-section">
      <div style="margin-bottom:16px">
        <input type="text" id="toolSearch" placeholder="도구 검색..." oninput="filterTools(this.value)" style="width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius);font-size:0.85rem;font-family:var(--font);outline:none;background:var(--bg-white);">
      </div>
      <div class="clip-section-title"><i data-lucide="plug" style="width:16px;height:16px;vertical-align:-2px;"></i> MCP Servers (Model Context Protocol)</div>
      <p style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:16px">AI 모델에 외부 도구를 연결하는 표준 프로토콜. USB처럼 다양한 서비스를 AI에 꽂아 사용합니다.</p>
      <div class="tool-list">${mcpHtml}</div>
    </div>
    <div class="clip-section">
      <div class="clip-section-title"><i data-lucide="keyboard" style="width:16px;height:16px;vertical-align:-2px;"></i> CLI & AI Tools</div>
      <p style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:16px">터미널 기반 AI 도구와 주요 AI 플랫폼입니다.</p>
      <div class="tool-list">${cliHtml}</div>
    </div>`;
}

export function filterTools(query) {
  const q = query.toLowerCase();
  document.querySelectorAll('.tool-item').forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(q) ? '' : 'none';
  });
}

window.filterTools = filterTools;
