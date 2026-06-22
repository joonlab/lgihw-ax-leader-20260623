/* ========================================
   CONCEPT CARDS RENDERER
   ======================================== */
import { CONCEPTS } from '../../data/concepts.js';

export function renderConceptCards() {
  const sorted = [...CONCEPTS].sort((a, b) => a.termKo.localeCompare(b.termKo, 'ko'));
  let cards = '';
  sorted.forEach(c => {
    cards += `<div class="concept-card" onclick="this.classList.toggle('flipped')">
      <div class="concept-card-inner">
        <div class="concept-card-front">
          <span class="concept-cat-badge ${c.category}">${c.category}</span>
          <div class="concept-term-ko">${c.termKo}</div>
          <div class="concept-term-en">${c.termEn}</div>
          <div class="concept-short-def">${c.shortDef}</div>
        </div>
        <div class="concept-card-back">
          <div class="concept-back-title">${c.termKo}</div>
          <div class="concept-back-text">${c.fullExplanation}</div>
          <div class="concept-back-examples">
            <strong>예시:</strong><br>${c.examples.map(e => '• ' + e).join('<br>')}
          </div>
        </div>
      </div>
    </div>`;
  });
  return `<div class="clip-overview">AI 핵심 개념을 플립 카드로 정리했습니다. 카드를 클릭하면 뒤집어서 상세 설명을 확인할 수 있습니다.</div>
    <div class="clip-section"><div class="concepts-grid">${cards}</div></div>`;
}
