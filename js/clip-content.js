const clipModules = import.meta.glob('/content/clips/ch*.html', {
  eager: true,
  query: '?raw',
  import: 'default'
});

export const CLIP_CONTENT = {};

for (const [path, html] of Object.entries(clipModules)) {
  const key = path.split('/').pop().replace('.html', '');
  CLIP_CONTENT[key] = html.trim();
}
