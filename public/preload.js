const { contextBridge, ipcRenderer } = require("electron")

// Exponer APIs seguras al proceso de renderizado
contextBridge.exposeInMainWorld("electronAPI", {
  // Sistema de licencias
  checkLicense: () => ipcRenderer.invoke("check-license"),
  activateLicense: (licenseKey) => ipcRenderer.invoke("activate-license", licenseKey),

  // Autenticación de admin
  verifyAdmin: (username, password) => ipcRenderer.invoke("verify-admin", username, password),
  addAdminUser: (username, password, role) => ipcRenderer.invoke("add-admin-user", username, password, role),

  // Integración SAT
  checkSATConnection: () => ipcRenderer.invoke("check-sat-connection"),
  syncWithSAT: () => ipcRenderer.invoke("sync-with-sat"),
  validateRFC: (rfc) => ipcRenderer.invoke("validate-rfc", rfc),

  // Gestión de archivos
  selectFielFiles: () => ipcRenderer.invoke("select-fiel-files"),
  getFielFiles: () => ipcRenderer.invoke("get-fiel-files"),
  selectClientFiles: (clientId) => ipcRenderer.invoke("select-client-files", clientId),
  getClientFiles: (clientId) => ipcRenderer.invoke("get-client-files", clientId),

  // Eventos del menú
  onMenuAction: (callback) => {
    ipcRenderer.on("menu-action", (event, action, data) => {
      callback(action, data)
    })
  },

  // Eventos de sincronización
  onSATSyncProgress: (callback) => {
    ipcRenderer.on("sat-sync-progress", (event, progress) => {
      callback(progress)
    })
  },
})
