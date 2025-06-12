const { app, BrowserWindow, Menu, dialog, ipcMain } = require("electron")
const path = require("path")
const isDev = require("electron-is-dev")
const licenseManager = require("./electron-license")
const satManager = require("./electron-sat")

let mainWindow
let splashWindow

function createSplashWindow() {
  splashWindow = new BrowserWindow({
    width: 500,
    height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  })

  splashWindow.loadURL(
    isDev ? "http://localhost:3000/splash.html" : `file://${path.join(__dirname, "../build/splash.html")}`,
  )

  splashWindow.on("closed", () => {
    splashWindow = null
  })
}

function createMainWindow() {
  // Inicializar sistema de licencias
  licenseManager.init()
  licenseManager.initAdminUsers()

  // Crear ventana principal
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, "../assets/icon.ico"),
    title: "CHAPAMARKET Facturación Pro",
  })

  // Cargar la aplicación React
  const startUrl = isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`

  mainWindow.loadURL(startUrl)

  // Mostrar cuando esté listo
  mainWindow.once("ready-to-show", () => {
    if (splashWindow) {
      setTimeout(() => {
        splashWindow.close()
        mainWindow.show()
      }, 2000)
    } else {
      mainWindow.show()
    }

    if (isDev) {
      mainWindow.webContents.openDevTools()
    }
  })

  // Configurar menú de la aplicación
  const template = [
    {
      label: "Archivo",
      submenu: [
        {
          label: "Nueva Factura",
          accelerator: "CmdOrCtrl+N",
          click: () => {
            mainWindow.webContents.send("menu-action", "new-invoice")
          },
        },
        {
          label: "Nuevo Cliente",
          accelerator: "CmdOrCtrl+Shift+N",
          click: () => {
            mainWindow.webContents.send("menu-action", "new-client")
          },
        },
        { type: "separator" },
        {
          label: "Exportar Datos",
          click: async () => {
            const result = await dialog.showSaveDialog(mainWindow, {
              defaultPath: "facturas-backup.json",
              filters: [{ name: "JSON Files", extensions: ["json"] }],
            })

            if (!result.canceled) {
              mainWindow.webContents.send("menu-action", "export-data", result.filePath)
            }
          },
        },
        { type: "separator" },
        {
          label: "Salir",
          accelerator: process.platform === "darwin" ? "Cmd+Q" : "Ctrl+Q",
          click: () => {
            app.quit()
          },
        },
      ],
    },
    {
      label: "Herramientas",
      submenu: [
        {
          label: "Configuración SAT",
          click: () => {
            mainWindow.webContents.send("menu-action", "sat-config")
          },
        },
        {
          label: "Sincronizar con SAT",
          click: () => {
            mainWindow.webContents.send("menu-action", "sat-sync")
          },
        },
        {
          label: "Respaldo Automático",
          click: () => {
            mainWindow.webContents.send("menu-action", "auto-backup")
          },
        },
        { type: "separator" },
        {
          label: "Panel de Administración",
          click: () => {
            mainWindow.webContents.send("menu-action", "admin-panel")
          },
        },
      ],
    },
    {
      label: "Ayuda",
      submenu: [
        {
          label: "Manual de Usuario",
          click: () => {
            mainWindow.webContents.send("menu-action", "help")
          },
        },
        {
          label: "Activar Licencia",
          click: () => {
            mainWindow.webContents.send("menu-action", "activate-license")
          },
        },
        {
          label: "Contactar Soporte",
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: "info",
              title: "Contactar Soporte",
              message: "Información de Contacto",
              detail:
                "WhatsApp: 773-108-6826 o 763-109-3925\nEmail: kashtaman@createstudiodigital.com\nChapantogo 2025 ChapaMarket Hgo.",
            })
          },
        },
        {
          label: "Acerca de",
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: "info",
              title: "Acerca de",
              message: "CHAPAMARKET Facturación Pro v1.0",
              detail: "© 2025 Create Studio Digital\nING-Cesar Sanchez",
            })
          },
        },
      ],
    },
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  mainWindow.on("closed", () => {
    mainWindow = null
  })
}

// Configurar IPC (comunicación entre procesos)
function setupIPC() {
  // Licencias
  ipcMain.handle("check-license", async () => {
    return licenseManager.checkLicenseStatus()
  })

  ipcMain.handle("activate-license", async (event, licenseKey) => {
    return licenseManager.activateLicense(licenseKey)
  })

  // Autenticación de admin
  ipcMain.handle("verify-admin", async (event, username, password) => {
    return licenseManager.verifyAdminCredentials(username, password)
  })

  ipcMain.handle("add-admin-user", async (event, username, password, role) => {
    return licenseManager.addAdminUser(username, password, role)
  })

  // Integración SAT
  ipcMain.handle("check-sat-connection", async () => {
    return satManager.checkSATConnection()
  })

  ipcMain.handle("sync-with-sat", async () => {
    return new Promise((resolve) => {
      satManager
        .syncWithSAT((progress) => {
          mainWindow.webContents.send("sat-sync-progress", progress)
        })
        .then(resolve)
    })
  })

  ipcMain.handle("validate-rfc", async (event, rfc) => {
    return satManager.validateRFC(rfc)
  })

  // Gestión de archivos
  ipcMain.handle("select-fiel-files", async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ["openFile", "multiSelections"],
      filters: [{ name: "Archivos FIEL", extensions: ["key", "cer", "password", "txt"] }],
    })

    if (result.canceled) {
      return { success: false, message: "Selección cancelada" }
    }

    const files = result.filePaths.map((filePath) => ({
      name: path.basename(filePath),
      path: filePath,
    }))

    return satManager.saveFielFiles(files)
  })

  ipcMain.handle("get-fiel-files", async () => {
    return satManager.getFielFiles()
  })

  ipcMain.handle("select-client-files", async (event, clientId) => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ["openFile", "multiSelections"],
    })

    if (result.canceled) {
      return { success: false, message: "Selección cancelada" }
    }

    const files = result.filePaths.map((filePath) => ({
      name: path.basename(filePath),
      path: filePath,
    }))

    return satManager.saveClientFiles(clientId, files)
  })

  ipcMain.handle("get-client-files", async (event, clientId) => {
    return satManager.getClientFiles(clientId)
  })
}

app.whenReady().then(() => {
  setupIPC()
  createSplashWindow()
  setTimeout(createMainWindow, 500)
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (mainWindow === null) {
    createMainWindow()
  }
})
