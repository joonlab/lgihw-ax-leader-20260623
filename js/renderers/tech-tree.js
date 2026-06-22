/* ========================================
   TECH TREE RENDERER
   ======================================== */

export function renderTechTree() {
  return `<div class="clip-overview">AI를 활용하는 세 가지 방식과 각각의 특징, 사용 도구를 한눈에 비교합니다.</div>
    <div class="tech-tree">
      <div class="tech-tree-node level-1" onclick="window.open(location.href.replace(/#.*$/,'')+'#ch02-clip01','_blank')" title="새 탭에서 열기">
        <div class="tech-tree-level">Level 1 · 입문</div>
        <div class="tech-tree-title"><i data-lucide="message-circle" style="width:18px;height:18px;vertical-align:-3px;"></i> Chat UI</div>
        <div class="tech-tree-desc">대화형으로 AI에게 질문하고 답변을 받는 가장 기본적인 방식</div>
        <div style="font-size:0.72rem;color:var(--text-secondary);margin-bottom:10px"><strong>언제 쓰나:</strong> 빠른 질문, 브레인스토밍, 간단한 분석, 문서 요약</div>
        <div class="tech-tree-tools">
          <span class="tech-tree-tool-tag">Gemini</span>
          <span class="tech-tree-tool-tag">NotebookLM</span>
          <span class="tech-tree-tool-tag">ChatGPT</span>
          <span class="tech-tree-tool-tag">EXAONE</span>
        </div>
      </div>
      <div class="tech-tree-arrow">→</div>
      <div class="tech-tree-node level-2" onclick="window.open(location.href.replace(/#.*$/,'')+'#ch04-clip01','_blank')" title="새 탭에서 열기">
        <div class="tech-tree-level">Level 2 · 확장</div>
        <div class="tech-tree-title"><i data-lucide="plug" style="width:18px;height:18px;vertical-align:-3px;"></i> API / Build</div>
        <div class="tech-tree-desc">AI의 기능을 내 시스템에 연결하거나, 맞춤형 앱을 만드는 방식</div>
        <div style="font-size:0.72rem;color:var(--text-secondary);margin-bottom:10px"><strong>언제 쓰나:</strong> 맞춤형 앱 개발, 데이터 일괄 처리, 외부 API 연동</div>
        <div class="tech-tree-tools">
          <span class="tech-tree-tool-tag">AI Studio Build</span>
          <span class="tech-tree-tool-tag">Gemini API</span>
          <span class="tech-tree-tool-tag">Colab</span>
        </div>
      </div>
      <div class="tech-tree-arrow">→</div>
      <div class="tech-tree-node level-3" onclick="window.open(location.href.replace(/#.*$/,'')+'#ch05-clip01','_blank')" title="새 탭에서 열기">
        <div class="tech-tree-level">Level 3 · 자율</div>
        <div class="tech-tree-title"><i data-lucide="bot" style="width:18px;height:18px;vertical-align:-3px;"></i> CLI / Agent</div>
        <div class="tech-tree-desc">AI가 자율적으로 도구를 사용하고 복잡한 워크플로우를 실행하는 방식</div>
        <div style="font-size:0.72rem;color:var(--text-secondary);margin-bottom:10px"><strong>언제 쓰나:</strong> 자동화 워크플로우, 멀티 에이전트, 복잡한 분석 파이프라인</div>
        <div class="tech-tree-tools">
          <span class="tech-tree-tool-tag">Antigravity</span>
          <span class="tech-tree-tool-tag">Claude Code</span>
          <span class="tech-tree-tool-tag">Gemini CLI</span>
        </div>
      </div>
    </div>
    <div class="tip-block" style="margin-top:24px">
      <div class="tip-block-title"><i data-lucide="lightbulb" style="width:18px;height:18px;vertical-align:-3px;"></i> 오늘의 여정</div>
      <div class="tip-block-content">오전에는 <strong>Level 1 (Chat UI)</strong>로 Gemini와 NotebookLM을 체험하고, 오후에는 <strong>Level 2 (Build)</strong>로 직접 앱을 만들고, 마지막으로 <strong>Level 3 (CLI/Agent)</strong>로 자동화 워크플로우를 구축합니다.</div>
    </div>`;
}
