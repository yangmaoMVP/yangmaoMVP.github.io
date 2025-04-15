
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('geektech-v1').then(cache =>
      cache.addAll([
        '/index.html',
        '/style.css',
        '/common.js',
        '/theme.js',
        '/posts.html',
        '/about.html',
        '/contact.html'
      ])
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
