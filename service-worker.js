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

self.addEventListener('fetch', event => {
  const {request} = event;
  const url = new URL(request.url);
  if(request.method !== 'GET'){return;}
  if(url.pathname.match(/\.(png|jpg|jpeg|webp|svg|css|js)$/)){
    event.respondWith(caches.open('static-v1').then(cache=>{
      return cache.match(request).then(res=>{
        const fetchPromise = fetch(request).then(network=>{
          cache.put(request, network.clone());
          return network;
        });
        return res || fetchPromise;
      });
    }));
  }else{
    // html stale-while-revalidate
    event.respondWith(caches.open('html-v1').then(cache=>{
      return cache.match(request).then(res=>{
        const fetchPromise = fetch(request).then(network=>{
          cache.put(request, network.clone());
          return network;
        });
        return res || fetchPromise;
      });
    }));
  }
});
