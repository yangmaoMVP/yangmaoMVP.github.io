const CACHE_NAME = "geektech-v3"
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/animations.css",
  "/main.js",
  "/theme.js",
  "/posts.html",
  "/about.html",
  "/contact.html",
  "/search.html",
  "/posts.json",
  "/favicon.ico",
  "/apple-touch-icon.png",
  "/manifest.json",
]

// Install event - cache core assets
self.addEventListener("install", (event) => {
  self.skipWaiting()

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching core assets")
      return cache.addAll(CORE_ASSETS)
    }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      })
      .then(() => {
        console.log("Service worker activated")
        return self.clients.claim()
      }),
  )
})

// Fetch event - serve from cache or network
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return
  }

  // Network-first strategy for HTML files
  if (event.request.headers.get("Accept").includes("text/html")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone the response
          const responseClone = response.clone()

          // Open the cache
          caches.open(CACHE_NAME).then((cache) => {
            // Add response to cache
            cache.put(event.request, responseClone)
          })

          return response
        })
        .catch(() => {
          // If network fails, serve from cache
          return caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || caches.match("/offline.html")
          })
        }),
    )
    return
  }

  // Cache-first strategy for other assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }

      // If not in cache, fetch from network
      return fetch(event.request).then((response) => {
        // Clone the response
        const responseClone = response.clone()

        // Open the cache
        caches.open(CACHE_NAME).then((cache) => {
          // Add response to cache
          cache.put(event.request, responseClone)
        })

        return response
      })
    }),
  )
})

// Handle push notifications
self.addEventListener("push", (event) => {
  const data = event.data.json()

  const options = {
    body: data.body,
    icon: "/favicon-512.png",
    badge: "/favicon-192.png",
    vibrate: [100, 50, 100],
    data: {
      url: data.url,
    },
  }

  event.waitUntil(self.registration.showNotification(data.title, options))
})

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  event.waitUntil(clients.openWindow(event.notification.data.url))
})
