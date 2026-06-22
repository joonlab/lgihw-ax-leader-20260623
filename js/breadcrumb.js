/* ========================================
   BREADCRUMB
   ======================================== */

export function updateBreadcrumb(items) {
  const el = document.getElementById('breadcrumb');
  let html = '<a href="#home">Home</a>';
  items.forEach((item, i) => {
    html += '<span class="sep">›</span>';
    if (item.href && i < items.length - 1) {
      html += `<a href="${item.href}">${item.label}</a>`;
    } else {
      html += `<span class="current">${item.label}</span>`;
    }
  });
  el.innerHTML = html;
}
