// Integración con Electron para tu aplicación React
export class ElectronIntegration {
  static isElectron() {
    return window.require !== undefined
  }

  static setupMenuListeners() {
    if (!this.isElectron()) return

    const { ipcRenderer } = window.require("electron")

    // Escuchar eventos del menú
    ipcRenderer.on("menu-action", (event, action, data) => {
      switch (action) {
        case "new-invoice":
          this.handleNewInvoice()
          break
        case "new-client":
          this.handleNewClient()
          break
        case "export-data":
          this.handleExportData(data)
          break
        case "sat-config":
          this.handleSATConfig()
          break
        case "auto-backup":
          this.handleAutoBackup()
          break
        case "help":
          this.handleHelp()
          break
        default:
          console.log("Acción no reconocida:", action)
      }
    })
  }

  static handleNewInvoice() {
    // Aquí integras con tu lógica de nueva factura
    const event = new CustomEvent("electron-new-invoice")
    window.dispatchEvent(event)
  }

  static handleNewClient() {
    // Aquí integras con tu lógica de nuevo cliente
    const event = new CustomEvent("electron-new-client")
    window.dispatchEvent(event)
  }

  static handleExportData(filePath) {
    // Aquí integras con tu lógica de exportación
    const event = new CustomEvent("electron-export-data", { detail: { filePath } })
    window.dispatchEvent(event)
  }

  static handleSATConfig() {
    // Aquí integras con tu configuración SAT
    const event = new CustomEvent("electron-sat-config")
    window.dispatchEvent(event)
  }

  static handleAutoBackup() {
    // Aquí integras con tu sistema de respaldo
    const event = new CustomEvent("electron-auto-backup")
    window.dispatchEvent(event)
  }

  static handleHelp() {
    // Abrir ayuda
    const event = new CustomEvent("electron-help")
    window.dispatchEvent(event)
  }

  static showNotification(title, body) {
    if (!this.isElectron()) {
      // Fallback para web
      if ("Notification" in window) {
        new Notification(title, { body })
      }
      return
    }

    const { ipcRenderer } = window.require("electron")
    ipcRenderer.send("show-notification", { title, body })
  }
}
