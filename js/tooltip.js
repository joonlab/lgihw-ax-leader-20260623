/* ========================================
   GLOSSARY TOOLTIP SYSTEM
   Global fixed-position tooltip to bypass overflow:hidden clipping
   ======================================== */
import { GLOSSARY } from '../data/glossary.js';

const SORTED_TERMS = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildPattern() {
  const parts = SORTED_TERMS.map(term => {
    if (/^[A-Za-z\s-]+$/.test(term)) {
      return `\\b${escapeRegex(term)}\\b`;
    }
    return escapeRegex(term);
  });
  return new RegExp(`(${parts.join('|')})`, 'g');
}

const TERM_PATTERN = buildPattern();
const MARGIN = 8; // viewport edge margin

/* ---- Global tooltip element (appended to body, position:fixed) ---- */
let globalTip = null;

function ensureGlobalTip() {
  if (globalTip) return globalTip;
  globalTip = document.createElement('div');
  globalTip.className = 'glossary-tooltip-global';
  globalTip.setAttribute('role', 'tooltip');
  document.body.appendChild(globalTip);
  return globalTip;
}

function showTooltip(term, termKey) {
  const tip = ensureGlobalTip();
  tip.innerHTML = `<strong>${termKey}</strong><br>${GLOSSARY[termKey]}`;
  tip.style.display = 'block';
  tip.className = 'glossary-tooltip-global';

  // Measure
  const termRect = term.getBoundingClientRect();
  const tipW = tip.offsetWidth;
  const tipH = tip.offsetHeight;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Default: above the term, centered
  let top = termRect.top - tipH - MARGIN;
  let left = termRect.left + termRect.width / 2 - tipW / 2;
  let arrow = 'down'; // arrow points down toward term

  // Flip below if clipped at top
  if (top < MARGIN) {
    top = termRect.bottom + MARGIN;
    arrow = 'up';
    // If also clipped at bottom, prefer whichever has more space
    if (top + tipH > vh - MARGIN) {
      if (termRect.top > vh - termRect.bottom) {
        // More space above
        top = termRect.top - tipH - MARGIN;
        arrow = 'down';
      }
    }
  }

  // Clamp horizontal
  if (left < MARGIN) left = MARGIN;
  if (left + tipW > vw - MARGIN) left = vw - tipW - MARGIN;

  // Arrow horizontal offset (relative to tooltip left edge)
  const arrowLeft = Math.max(16, Math.min(tipW - 16, termRect.left + termRect.width / 2 - left));

  tip.style.top = top + 'px';
  tip.style.left = left + 'px';
  tip.style.setProperty('--arrow-left', arrowLeft + 'px');
  tip.classList.add('arrow-' + arrow);
}

function hideTooltip() {
  if (globalTip) {
    globalTip.style.display = 'none';
    globalTip.className = 'glossary-tooltip-global';
  }
}

/* ---- Main: scan text nodes and wrap glossary terms ---- */
export function applyTooltips(container) {
  if (!container) return;

  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (parent.closest('.glossary-term, .glossary-tooltip-global, code, pre, textarea, .prompt-content, script, style, .clip-badges, .clip-nav-footer'))
        return NodeFilter.FILTER_REJECT;
      TERM_PATTERN.lastIndex = 0;
      if (!TERM_PATTERN.test(node.textContent)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach(textNode => {
    const fragment = document.createDocumentFragment();
    const text = textNode.textContent;
    let lastIdx = 0;
    TERM_PATTERN.lastIndex = 0;
    let match;
    let changed = false;

    while ((match = TERM_PATTERN.exec(text)) !== null) {
      changed = true;
      if (match.index > lastIdx) {
        fragment.appendChild(document.createTextNode(text.slice(lastIdx, match.index)));
      }

      const term = match[1];
      const span = document.createElement('span');
      span.className = 'glossary-term';
      span.textContent = term;
      span.dataset.term = term;

      fragment.appendChild(span);
      lastIdx = match.index + match[0].length;
    }

    if (changed) {
      if (lastIdx < text.length) {
        fragment.appendChild(document.createTextNode(text.slice(lastIdx)));
      }
      textNode.parentNode.replaceChild(fragment, textNode);
    }
  });

  // Bind events
  container.querySelectorAll('.glossary-term[data-term]').forEach(term => {
    term.addEventListener('mouseenter', () => showTooltip(term, term.dataset.term));
    term.addEventListener('mouseleave', hideTooltip);
  });
}
