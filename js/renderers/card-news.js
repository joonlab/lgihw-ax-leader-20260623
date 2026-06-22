/* ========================================
   CARD NEWS RENDERER
   ======================================== */
import { NEWS_ITEMS } from '../../data/news.js';

export function renderCardNews() {
  const filters = `<div class="news-filters">
    <button class="news-filter-btn active" onclick="filterNews('all',this)">전체</button>
    <button class="news-filter-btn" onclick="filterNews('business',this)">비즈니스</button>
    <button class="news-filter-btn" onclick="filterNews('technology',this)">기술</button>
    <button class="news-filter-btn" onclick="filterNews('policy',this)">정책</button>
  </div>`;
  let cards = '';
  NEWS_ITEMS.forEach(n => {
    cards += `<a class="news-card" data-cat="${n.category}" href="${n.url}" target="_blank" rel="noopener">
      <div class="news-card-cat ${n.category}">${n.category}</div>
      <div class="news-card-headline">${n.headline}</div>
      <div class="news-card-insight">${n.insight}</div>
      <div class="news-card-footer"><span>${n.source}</span><span>${n.date}</span></div>
    </a>`;
  });
  return `<div class="clip-overview">AI 산업의 최신 동향을 카드 뉴스 형태로 정리했습니다. 각 카드를 클릭하면 원문 기사로 이동합니다.</div>
    <div class="clip-section">${filters}<div class="news-grid" id="newsGrid">${cards}</div></div>`;
}

export function filterNews(cat, btn) {
  document.querySelectorAll('.news-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.news-card').forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
  });
}

window.filterNews = filterNews;
