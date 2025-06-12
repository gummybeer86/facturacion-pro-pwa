const CACHE_NAME = "chapamarket-v1.0"
const urlsToCache = [
  "/",
  "/app",
  "/assets/chapamarket-logo.png",
  "/assets/icon-192.png",
  "/assets/icon-512.png",
  "/manifest.json",
]

// Instalar Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)))
})

// Interceptar requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }
      return fetch(event.request)
    }),
  )
})
