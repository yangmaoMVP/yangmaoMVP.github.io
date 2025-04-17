const CACHE_NAME = 'geektech-v2';
const CORE_ASSETS = [
  '/index.html',
  '/style.css',
  '/common.js',
  '/theme.js',
  '/posts.html',
  '/about.html',
  '/contact.html',
  '/posts.json'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(resp => {
      const clone = resp.clone();
      if(event.request.method === 'GET' && resp.status === 200){
        caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
      }
      return resp;
    }))
  );
});