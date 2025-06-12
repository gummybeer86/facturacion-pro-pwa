const { app, BrowserWindow, Menu } = require("electron")
const path = require("path")
const isDev = require("electron-is-dev")

let mainWindow

function createWindow() {
  // Crear la ventana del navegador
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
    },
    icon: path.join(__dirname, "build/icon.ico"),
    show: false,
    titleBarStyle: "default",
    autoHideMenuBar: false,
    title: "ChapaMarket Facturación Pro",
  })

  // Cargar la aplicación
  const startUrl = isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../out/index.html")}`

  mainWindow.loadURL(startUrl)

  // Mostrar cuando esté listo
  mainWindow.once("ready-to-show", () => {
    mainWindow.show()

    if (isDev) {
      mainWindow.webContents.openDevTools()
    }
  })

  // Configurar menú
  const template = [
    {
      label: "Archivo",
      submenu: [
        {
          label: "Nuevo Cliente",
          accelerator: "CmdOrCtrl+N",
          click: () => {
            // Enviar evento a la aplicación React
            mainWindow.webContents.send("menu-action", "new-client")
          },
        },
        {
          label: "Nueva Factura",
          accelerator: "CmdOrCtrl+F",
          click: () => {
            mainWindow.webContents.send("menu-action", "new-invoice")
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
          label: "Respaldo de Datos",
          click: () => {
            mainWindow.webContents.send("menu-action", "backup")
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
          label: "Contactar Soporte",
          click: () => {
            mainWindow.webContents.send("menu-action", "support")
          },
        },
        { type: "separator" },
        {
          label: "Acerca de",
          click: () => {
            mainWindow.webContents.send("menu-action", "about")
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

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// Prevenir navegación externa
app.on("web-contents-created", (event, contents) => {
  contents.on("new-window", (event, navigationUrl) => {
    event.preventDefault()
  })
})
