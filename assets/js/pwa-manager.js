class PWAManager {
  constructor() {
    this.deferredPrompt = null
    this.isInstalled = false
    this.notificationPermission = "default"
    this.init()
  }

  async init() {
    console.log("🚀 Inicializando PWA Manager...")

    // Registrar Service Worker
    await this.registerServiceWorker()

    // Configurar eventos de instalación
    this.setupInstallEvents()

    // Verificar si ya está instalado
    this.checkIfInstalled()

    // Configurar notificaciones
    this.setupNotifications()

    // Mostrar banner de instalación si es apropiado
    this.showInstallBanner()
  }

  async registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js")
        console.log("✅ Service Worker registrado:", registration.scope)

        // Configurar actualizaciones
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              this.showUpdateAvailable()
            }
          })
        })

        return registration
      } catch (error) {
        console.error("❌ Error registrando Service Worker:", error)
      }
    }
  }

  setupInstallEvents() {
    // Evento beforeinstallprompt
    window.addEventListener("beforeinstallprompt", (e) => {
      console.log("📱 Evento beforeinstallprompt capturado")
      e.preventDefault()
      this.deferredPrompt = e
      this.showInstallButton()
    })

    // Evento appinstalled
    window.addEventListener("appinstalled", () => {
      console.log("✅ PWA instalada exitosamente")
      this.isInstalled = true
      this.hideInstallButton()
      this.showInstalledMessage()
      this.trackInstallation()
    })
  }

  checkIfInstalled() {
    // Verificar si está en modo standalone (instalada)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      this.isInstalled = true
      console.log("📱 PWA ya está instalada")
    }

    // Verificar en iOS
    if (window.navigator.standalone === true) {
      this.isInstalled = true
      console.log("📱 PWA instalada en iOS")
    }
  }

  async installPWA() {
    if (!this.deferredPrompt) {
      this.showManualInstallInstructions()
      return
    }

    try {
      // Mostrar prompt de instalación
      this.deferredPrompt.prompt()

      // Esperar respuesta del usuario
      const { outcome } = await this.deferredPrompt.userChoice

      console.log(`👤 Usuario ${outcome} la instalación`)

      if (outcome === "accepted") {
        this.trackInstallation()
      }

      // Limpiar el prompt
      this.deferredPrompt = null
      this.hideInstallButton()
    } catch (error) {
      console.error("❌ Error en instalación:", error)
    }
  }

  showInstallButton() {
    const installButton = document.getElementById("install-button")
    const installBanner = document.getElementById("install-banner")

    if (installButton) {
      installButton.style.display = "block"
      installButton.addEventListener("click", () => this.installPWA())
    }

    if (installBanner) {
      installBanner.style.display = "block"
    }
  }

  hideInstallButton() {
    const installButton = document.getElementById("install-button")
    const installBanner = document.getElementById("install-banner")

    if (installButton) {
      installButton.style.display = "none"
    }

    if (installBanner) {
      installBanner.style.display = "none"
    }
  }

  showInstallBanner() {
    if (this.isInstalled) return

    // Crear banner de instalación
    const banner = document.createElement("div")
    banner.id = "install-banner"
    banner.className = "install-banner"
    banner.innerHTML = `
      <div class="install-banner-content">
        <div class="install-banner-icon">📱</div>
        <div class="install-banner-text">
          <h4>¡Instala CHAPAMARKET!</h4>
          <p>Acceso rápido desde tu escritorio</p>
        </div>
        <div class="install-banner-actions">
          <button id="install-button" class="btn-install">Instalar</button>
          <button id="dismiss-banner" class="btn-dismiss">×</button>
        </div>
      </div>
    `

    // Agregar estilos
    const style = document.createElement("style")
    style.textContent = `
      .install-banner {
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideUp 0.5s ease;
        max-width: 400px;
        margin: 0 auto;
      }
      
      .install-banner-content {
        display: flex;
        align-items: center;
        padding: 15px 20px;
        gap: 15px;
      }
      
      .install-banner-icon {
        font-size: 32px;
      }
      
      .install-banner-text h4 {
        margin: 0 0 5px 0;
        font-size: 16px;
        font-weight: 600;
      }
      
      .install-banner-text p {
        margin: 0;
        font-size: 14px;
        opacity: 0.9;
      }
      
      .install-banner-actions {
        display: flex;
        gap: 10px;
        margin-left: auto;
      }
      
      .btn-install {
        background: rgba(255,255,255,0.2);
        border: 1px solid rgba(255,255,255,0.3);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .btn-install:hover {
        background: rgba(255,255,255,0.3);
        transform: translateY(-2px);
      }
      
      .btn-dismiss {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 5px;
        opacity: 0.7;
        transition: opacity 0.3s ease;
      }
      
      .btn-dismiss:hover {
        opacity: 1;
      }
      
      @keyframes slideUp {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      @media (max-width: 768px) {
        .install-banner {
          left: 10px;
          right: 10px;
          bottom: 10px;
        }
      }
    `

    document.head.appendChild(style)
    document.body.appendChild(banner)

    // Event listeners
    document.getElementById("install-button")?.addEventListener("click", () => this.installPWA())
    document.getElementById("dismiss-banner")?.addEventListener("click", () => {
      banner.remove()
      localStorage.setItem("install-banner-dismissed", "true")
    })

    // No mostrar si ya fue descartado
    if (localStorage.getItem("install-banner-dismissed")) {
      banner.style.display = "none"
    }
  }

  showManualInstallInstructions() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isAndroid = /Android/.test(navigator.userAgent)

    let instructions = ""

    if (isIOS) {
      instructions = `
        <h3>📱 Instalar en iOS</h3>
        <ol>
          <li>Toca el botón "Compartir" <span style="font-size: 18px;">⬆️</span></li>
          <li>Selecciona "Añadir a pantalla de inicio"</li>
          <li>Toca "Añadir" para confirmar</li>
        </ol>
      `
    } else if (isAndroid) {
      instructions = `
        <h3>📱 Instalar en Android</h3>
        <ol>
          <li>Toca el menú del navegador (⋮)</li>
          <li>Selecciona "Añadir a pantalla de inicio"</li>
          <li>Toca "Añadir" para confirmar</li>
        </ol>
      `
    } else {
      instructions = `
        <h3>💻 Instalar en Escritorio</h3>
        <ol>
          <li>Busca el ícono de instalación en la barra de direcciones</li>
          <li>O ve al menú del navegador → "Instalar CHAPAMARKET"</li>
          <li>Sigue las instrucciones para completar la instalación</li>
        </ol>
      `
    }

    this.showModal("Instalar CHAPAMARKET", instructions)
  }

  async setupNotifications() {
    if (!("Notification" in window)) {
      console.log("❌ Notificaciones no soportadas")
      return
    }

    this.notificationPermission = Notification.permission

    if (this.notificationPermission === "default") {
      this.showNotificationPermissionBanner()
    }
  }

  async requestNotificationPermission() {
    try {
      const permission = await Notification.requestPermission()
      this.notificationPermission = permission

      if (permission === "granted") {
        console.log("✅ Permisos de notificación concedidos")
        this.hideNotificationBanner()
        await this.subscribeToPushNotifications()
        this.showNotificationTest()
      } else {
        console.log("❌ Permisos de notificación denegados")
      }

      return permission
    } catch (error) {
      console.error("❌ Error solicitando permisos:", error)
    }
  }

  async subscribeToPushNotifications() {
    try {
      const registration = await navigator.serviceWorker.ready

      // Clave pública VAPID (debes generar tu propia clave)
      const vapidPublicKey = "TU_CLAVE_PUBLICA_VAPID_AQUI"

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(vapidPublicKey),
      })

      console.log("✅ Suscripción a push notifications:", subscription)

      // Enviar suscripción al servidor
      await this.sendSubscriptionToServer(subscription)
    } catch (error) {
      console.error("❌ Error en suscripción push:", error)
    }
  }

  urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  async sendSubscriptionToServer(subscription) {
    try {
      const response = await fetch("/api/subscribe-notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      })

      if (response.ok) {
        console.log("✅ Suscripción enviada al servidor")
      }
    } catch (error) {
      console.error("❌ Error enviando suscripción:", error)
    }
  }

  showNotificationPermissionBanner() {
    const banner = document.createElement("div")
    banner.id = "notification-banner"
    banner.className = "notification-banner"
    banner.innerHTML = `
      <div class="notification-banner-content">
        <div class="notification-banner-icon">🔔</div>
        <div class="notification-banner-text">
          <h4>¡Recibe notificaciones!</h4>
          <p>Mantente al día con actualizaciones importantes</p>
        </div>
        <div class="notification-banner-actions">
          <button id="enable-notifications" class="btn-enable">Activar</button>
          <button id="dismiss-notifications" class="btn-dismiss">×</button>
        </div>
      </div>
    `

    document.body.appendChild(banner)

    document.getElementById("enable-notifications")?.addEventListener("click", () => {
      this.requestNotificationPermission()
    })

    document.getElementById("dismiss-notifications")?.addEventListener("click", () => {
      banner.remove()
    })
  }

  hideNotificationBanner() {
    const banner = document.getElementById("notification-banner")
    if (banner) {
      banner.remove()
    }
  }

  showNotificationTest() {
    if (this.notificationPermission === "granted") {
      new Notification("¡CHAPAMARKET instalado!", {
        body: "Ya puedes recibir notificaciones importantes",
        icon: "/assets/icons/icon-192x192.png",
        badge: "/assets/icons/badge-72x72.png",
      })
    }
  }

  showUpdateAvailable() {
    const updateBanner = document.createElement("div")
    updateBanner.className = "update-banner"
    updateBanner.innerHTML = `
      <div class="update-banner-content">
        <div class="update-banner-icon">🔄</div>
        <div class="update-banner-text">
          <h4>¡Nueva versión disponible!</h4>
          <p>Actualiza para obtener las últimas mejoras</p>
        </div>
        <div class="update-banner-actions">
          <button id="update-app" class="btn-update">Actualizar</button>
          <button id="dismiss-update" class="btn-dismiss">Después</button>
        </div>
      </div>
    `

    document.body.appendChild(updateBanner)

    document.getElementById("update-app")?.addEventListener("click", () => {
      window.location.reload()
    })

    document.getElementById("dismiss-update")?.addEventListener("click", () => {
      updateBanner.remove()
    })
  }

  showInstalledMessage() {
    this.showModal(
      "¡Instalación Exitosa!",
      `
      <div style="text-align: center;">
        <div style="font-size: 64px; margin-bottom: 20px;">🎉</div>
        <h3>¡CHAPAMARKET instalado correctamente!</h3>
        <p>Ya puedes acceder a la aplicación desde tu escritorio o pantalla de inicio.</p>
        <p><strong>Características activadas:</strong></p>
        <ul style="text-align: left; display: inline-block;">
          <li>✅ Acceso offline</li>
          <li>✅ Notificaciones push</li>
          <li>✅ Sincronización automática</li>
          <li>✅ Acceso rápido</li>
        </ul>
      </div>
    `,
    )
  }

  showModal(title, content) {
    const modal = document.createElement("div")
    modal.className = "pwa-modal"
    modal.innerHTML = `
      <div class="pwa-modal-overlay">
        <div class="pwa-modal-content">
          <div class="pwa-modal-header">
            <h3>${title}</h3>
            <button class="pwa-modal-close">×</button>
          </div>
          <div class="pwa-modal-body">
            ${content}
          </div>
        </div>
      </div>
    `

    // Agregar estilos del modal
    const modalStyle = document.createElement("style")
    modalStyle.textContent = `
      .pwa-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10001;
      }
      
      .pwa-modal-overlay {
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      
      .pwa-modal-content {
        background: white;
        border-radius: 15px;
        max-width: 500px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      }
      
      .pwa-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 25px;
        border-bottom: 1px solid #eee;
      }
      
      .pwa-modal-header h3 {
        margin: 0;
        color: #333;
      }
      
      .pwa-modal-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #999;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .pwa-modal-close:hover {
        color: #333;
      }
      
      .pwa-modal-body {
        padding: 25px;
        color: #666;
        line-height: 1.6;
      }
    `

    document.head.appendChild(modalStyle)
    document.body.appendChild(modal)

    // Event listeners
    modal.querySelector(".pwa-modal-close").addEventListener("click", () => {
      modal.remove()
      modalStyle.remove()
    })

    modal.querySelector(".pwa-modal-overlay").addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        modal.remove()
        modalStyle.remove()
      }
    })
  }

  trackInstallation() {
    console.log("📊 Instalación de PWA registrada")
  }
}

// Inicializar PWA Manager cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new PWAManager()
  })
} else {
  new PWAManager()
}
