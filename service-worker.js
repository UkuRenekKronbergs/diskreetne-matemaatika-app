const CACHE_NAME = 'diskreetne-matemaatika-v20260523-1';

const PRECACHE_URLS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'favicon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'css/style.css',
  'js/content.js',
  'js/glossary.js',
  'js/app.js',
  'js/pwa.js',
  'js/widgets/algorithms.js',
  'js/widgets/exam-practice.js',
  'js/widgets/grade-calculator.js',
  'js/widgets/graph-editor.js',
  'js/widgets/normal-forms.js',
  'js/widgets/problem-generator.js',
  'js/widgets/prefix-form.js',
  'js/widgets/quiz.js',
  'js/widgets/study-tools.js',
  'js/widgets/topic-tools.js',
  'js/widgets/truth-table.js',
  'js/widgets/truth-tree.js',
  'vendor/katex/katex.min.css',
  'vendor/katex/katex.min.js',
  'vendor/katex/contrib/auto-render.min.js',
  'vendor/katex/fonts/KaTeX_AMS-Regular.ttf',
  'vendor/katex/fonts/KaTeX_AMS-Regular.woff',
  'vendor/katex/fonts/KaTeX_AMS-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Caligraphic-Bold.ttf',
  'vendor/katex/fonts/KaTeX_Caligraphic-Bold.woff',
  'vendor/katex/fonts/KaTeX_Caligraphic-Bold.woff2',
  'vendor/katex/fonts/KaTeX_Caligraphic-Regular.ttf',
  'vendor/katex/fonts/KaTeX_Caligraphic-Regular.woff',
  'vendor/katex/fonts/KaTeX_Caligraphic-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Fraktur-Bold.ttf',
  'vendor/katex/fonts/KaTeX_Fraktur-Bold.woff',
  'vendor/katex/fonts/KaTeX_Fraktur-Bold.woff2',
  'vendor/katex/fonts/KaTeX_Fraktur-Regular.ttf',
  'vendor/katex/fonts/KaTeX_Fraktur-Regular.woff',
  'vendor/katex/fonts/KaTeX_Fraktur-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Main-Bold.ttf',
  'vendor/katex/fonts/KaTeX_Main-Bold.woff',
  'vendor/katex/fonts/KaTeX_Main-Bold.woff2',
  'vendor/katex/fonts/KaTeX_Main-BoldItalic.ttf',
  'vendor/katex/fonts/KaTeX_Main-BoldItalic.woff',
  'vendor/katex/fonts/KaTeX_Main-BoldItalic.woff2',
  'vendor/katex/fonts/KaTeX_Main-Italic.ttf',
  'vendor/katex/fonts/KaTeX_Main-Italic.woff',
  'vendor/katex/fonts/KaTeX_Main-Italic.woff2',
  'vendor/katex/fonts/KaTeX_Main-Regular.ttf',
  'vendor/katex/fonts/KaTeX_Main-Regular.woff',
  'vendor/katex/fonts/KaTeX_Main-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Math-BoldItalic.ttf',
  'vendor/katex/fonts/KaTeX_Math-BoldItalic.woff',
  'vendor/katex/fonts/KaTeX_Math-BoldItalic.woff2',
  'vendor/katex/fonts/KaTeX_Math-Italic.ttf',
  'vendor/katex/fonts/KaTeX_Math-Italic.woff',
  'vendor/katex/fonts/KaTeX_Math-Italic.woff2',
  'vendor/katex/fonts/KaTeX_SansSerif-Bold.ttf',
  'vendor/katex/fonts/KaTeX_SansSerif-Bold.woff',
  'vendor/katex/fonts/KaTeX_SansSerif-Bold.woff2',
  'vendor/katex/fonts/KaTeX_SansSerif-Italic.ttf',
  'vendor/katex/fonts/KaTeX_SansSerif-Italic.woff',
  'vendor/katex/fonts/KaTeX_SansSerif-Italic.woff2',
  'vendor/katex/fonts/KaTeX_SansSerif-Regular.ttf',
  'vendor/katex/fonts/KaTeX_SansSerif-Regular.woff',
  'vendor/katex/fonts/KaTeX_SansSerif-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Script-Regular.ttf',
  'vendor/katex/fonts/KaTeX_Script-Regular.woff',
  'vendor/katex/fonts/KaTeX_Script-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Size1-Regular.ttf',
  'vendor/katex/fonts/KaTeX_Size1-Regular.woff',
  'vendor/katex/fonts/KaTeX_Size1-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Size2-Regular.ttf',
  'vendor/katex/fonts/KaTeX_Size2-Regular.woff',
  'vendor/katex/fonts/KaTeX_Size2-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Size3-Regular.ttf',
  'vendor/katex/fonts/KaTeX_Size3-Regular.woff',
  'vendor/katex/fonts/KaTeX_Size3-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Size4-Regular.ttf',
  'vendor/katex/fonts/KaTeX_Size4-Regular.woff',
  'vendor/katex/fonts/KaTeX_Size4-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Typewriter-Regular.ttf',
  'vendor/katex/fonts/KaTeX_Typewriter-Regular.woff',
  'vendor/katex/fonts/KaTeX_Typewriter-Regular.woff2',
];

self.addEventListener('install', event => {
  event.waitUntil(
    precacheAppShell()
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, 'index.html'));
    return;
  }

  event.respondWith(cacheFirst(request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;

  const response = await fetch(request);
  if (response && response.ok) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request, fallbackUrl) {
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return caches.match(request, { ignoreSearch: true })
      .then(response => response || caches.match(new URL(fallbackUrl, self.registration.scope)));
  }
}

async function precacheAppShell() {
  const cache = await caches.open(CACHE_NAME);
  await Promise.all(PRECACHE_URLS.map(async url => {
    const request = new Request(new URL(url, self.registration.scope), { cache: 'reload' });
    try {
      const response = await fetch(request);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      await cache.put(request, response);
    } catch (error) {
      console.warn('Precache skipped:', url, error);
    }
  }));
}
