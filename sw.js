const CACHE_NAME = 'atharsyah-cache-v1';
const urlsToCache = [
  'index.html',
  'style.css',
  'script.js',
  'habit.js',
  'sholat.js',
  'jurnal.js',
  'mood.js',
  'uang.js',
  'library.js',
  'notebook.js',
  'dashboard.js',
  'refleksi.js',
  'gym.js',
  'ai-chat.js',
  'utils.js',
  'data.js',
  'settings.js',
  'export.js',
  'darkmode.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});