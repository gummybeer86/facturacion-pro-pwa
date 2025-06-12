const CACHE_NAME = "chapamarket-v1.0.0"
const STATIC_CACHE = "chapamarket-static-v1.0.0"
const DYNAMIC_CACHE = "chapamarket-dynamic-v1.0.0"

// Archivos para cachear inmediatamente
const STATIC_FILES = [
  "/",
  "/manifest.json",
  "/assets/logo-createstudio.png",
  "/assets/chapamarket-logo.png",
  "/assets/favicon.ico",
  "/offline.html",
]

// URLs de APIs que se pueden cachear dinámicamente
const CACHEABLE_APIS = ["/api/", "https://api.createstudiodigital.com.mx/"]

// Instalar Service Worker
self.addEventListener("install", (event) => {
  console.log("🚀 Service Worker: Instalando...")

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("📦 Service Worker: Cacheando archivos estáticos")
        return cache.addAll(STATIC_FILES)
      })
      .then(() => {
        console.log("✅ Service Worker: Instalación completada")
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error("❌ Error en instalación:", error)
      }),
  )
})

// Activar Service Worker
self.addEventListener("activate", (event) => {
  console.log("🔄 Service Worker: Activando...")

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log("🗑️ Service Worker: Eliminando cache antiguo:", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        console.log("✅ Service Worker: Activación completada")
        return self.clients.claim()
      }),
  )
})

// Interceptar requests
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Estrategia Cache First para archivos estáticos
  if (STATIC_FILES.some((file) => url.pathname.includes(file))) {
    event.respondWith(
      caches
        .match(request)
        .then((response) => {
          return response || fetch(request)
        })
        .catch(() => {
          if (request.destination === "document") {
            return caches.match("/offline.html")
          }
        }),
    )
    return
  }

  // Estrategia Network First para APIs
  if (CACHEABLE_APIS.some((api) => url.href.includes(api))) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone()
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone)
          })
          return response
        })
        .catch(() => {
          return caches.match(request)
        }),
    )
    return
  }

  // Estrategia Network First para todo lo demás
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request).then((response) => {
        if (response) {
          return response
        }
        if (request.destination === "document") {
          return caches.match("/offline.html")
        }
      })
    }),
  )
})

// Manejar notificaciones push
self.addEventListener("push", (event) => {
  console.log("📱 Notificación push recibida")

  let notificationData = {
    title: "CHAPAMARKET",
    body: "Tienes una nueva notificación",
    icon: "/assets/icons/icon-192x192.png",
    badge: "/assets/icons/badge-72x72.png",
    tag: "chapamarket-notification",
    requireInteraction: true,
    actions: [
      {
        action: "open",
        title: "Abrir App",
        icon: "/assets/icons/open-icon.png",
      },
      {
        action: "close",
        title: "Cerrar",
        icon: "/assets/icons/close-icon.png",
      },
    ],
    data: {
      url: "/",
      timestamp: Date.now(),
    },
  }

  if (event.data) {
    try {
      const pushData = event.data.json()
      notificationData = { ...notificationData, ...pushData }
    } catch (error) {
      console.error("Error parsing push data:", error)
    }
  }

  event.waitUntil(self.registration.showNotification(notificationData.title, notificationData))
})

// Manejar clicks en notificaciones
self.addEventListener("notificationclick", (event) => {
  console.log("🖱️ Click en notificación:", event.action)

  event.notification.close()

  if (event.action === "close") {
    return
  }

  const urlToOpen = event.notification.data?.url || "/"

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // Buscar si ya hay una ventana abierta
      for (const client of clientList) {
        if (client.url.includes(urlToOpen) && "focus" in client) {
          return client.focus()
        }
      }

      // Si no hay ventana abierta, abrir una nueva
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen)
      }
    }),
  )
})

// Sincronización en background
self.addEventListener("sync", (event) => {
  console.log("🔄 Background sync:", event.tag)

  if (event.tag === "background-sync") {
    event.waitUntil(
      // Aquí puedes sincronizar datos pendientes
      syncPendingData(),
    )
  }
})

async function syncPendingData() {
  try {
    // Implementar lógica de sincronización
    console.log("📊 Sincronizando datos pendientes...")

    // Ejemplo: enviar facturas pendientes, sincronizar con SAT, etc.
    const pendingData = await getPendingData()

    if (pendingData.length > 0) {
      await sendPendingData(pendingData)
      console.log("✅ Datos sincronizados correctamente")
    }
  } catch (error) {
    console.error("❌ Error en sincronización:", error)
  }
}

async function getPendingData() {
  // Implementar obtención de datos pendientes
  return []
}

async function sendPendingData(data) {
  // Implementar envío de datos
  return Promise.resolve()
}
