"use client"

import { useState, useEffect } from "react"
import "./App.css"
import LicenseScreen from "./components/LicenseScreen"
import AdminPanel from "./components/AdminPanel"
import SATIntegration from "./components/SATIntegration"

function App() {
  const [licenseValid, setLicenseValid] = useState(false)
  const [licenseChecked, setLicenseChecked] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [showSATIntegration, setShowSATIntegration] = useState(false)

  useEffect(() => {
    // Verificar licencia al inicio
    checkLicense()

    // Configurar listeners para eventos del menú
    if (window.electronAPI) {
      window.electronAPI.onMenuAction((action, data) => {
        handleMenuAction(action, data)
      })
    }
  }, [])

  const checkLicense = async () => {
    if (window.electronAPI) {
      try {
        const status = await window.electronAPI.checkLicense()
        setLicenseValid(status.valid)
      } catch (error) {
        console.error("Error al verificar licencia:", error)
      } finally {
        setLicenseChecked(true)
      }
    } else {
      // Fallback para desarrollo web
      setLicenseValid(true)
      setLicenseChecked(true)
    }
  }

  const handleMenuAction = (action, data) => {
    switch (action) {
      case "admin-panel":
        setShowAdminPanel(true)
        break
      case "sat-sync":
      case "sat-config":
        setShowSATIntegration(true)
        break
      case "activate-license":
        setLicenseValid(false)
        break
      // Implementar otros casos según sea necesario
      default:
        console.log("Acción de menú no manejada:", action, data)
    }
  }

  // Si la licencia no es válida, mostrar pantalla de licencia
  if (!licenseChecked) {
    return <div className="loading">Cargando...</div>
  }

  if (!licenseValid) {
    return <LicenseScreen onActivated={() => setLicenseValid(true)} />
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>CHAPAMARKET Facturación Pro</h1>
        {/* Aquí va tu barra de navegación */}
      </header>

      <main className="App-main">
        {/* Aquí va el contenido principal de tu aplicación */}
        {!showAdminPanel && !showSATIntegration && (
          <div className="welcome-screen">
            <h2>Bienvenido a CHAPAMARKET Facturación Pro</h2>
            <p>Selecciona una opción del menú para comenzar</p>

            {/* Aquí puedes mostrar un dashboard o accesos rápidos */}
            <div className="quick-actions">
              <button onClick={() => handleMenuAction("new-invoice")}>Nueva Factura</button>
              <button onClick={() => handleMenuAction("new-client")}>Nuevo Cliente</button>
              <button onClick={() => setShowSATIntegration(true)}>Sincronizar con SAT</button>
            </div>
          </div>
        )}

        {/* Paneles modales */}
        {showAdminPanel && (
          <div className="modal-overlay">
            <div className="modal-content">
              <AdminPanel onClose={() => setShowAdminPanel(false)} />
            </div>
          </div>
        )}

        {showSATIntegration && (
          <div className="modal-overlay">
            <div className="modal-content">
              <SATIntegration />
              <button className="close-button" onClick={() => setShowSATIntegration(false)}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>© 2025 Create Studio Digital - ING-Cesar Sanchez</p>
        <p>WhatsApp: 773-108-6826 o 763-109-3925</p>
      </footer>
    </div>
  )
}

export default App
