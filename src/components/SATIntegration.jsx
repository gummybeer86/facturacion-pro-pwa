"use client"

import { useState, useEffect } from "react"

export default function SATIntegration() {
  const [connectionStatus, setConnectionStatus] = useState(null)
  const [syncStatus, setSyncStatus] = useState(null)
  const [syncProgress, setSyncProgress] = useState(0)
  const [fielFiles, setFielFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    checkConnection()
    loadFielFiles()

    // Escuchar eventos de progreso de sincronización
    window.electronAPI.onSATSyncProgress((progress) => {
      setSyncProgress(progress)
    })
  }, [])

  const checkConnection = async () => {
    try {
      setLoading(true)
      const status = await window.electronAPI.checkSATConnection()
      setConnectionStatus(status)
    } catch (err) {
      setError("Error al verificar conexión: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  const syncWithSAT = async () => {
    try {
      setLoading(true)
      setSyncProgress(0)
      setSyncStatus({ inProgress: true })

      const result = await window.electronAPI.syncWithSAT()
      setSyncStatus(result)
    } catch (err) {
      setError("Error en sincronización: " + err.message)
      setSyncStatus({ success: false, message: err.message })
    } finally {
      setLoading(false)
    }
  }

  const loadFielFiles = async () => {
    try {
      const files = await window.electronAPI.getFielFiles()
      setFielFiles(files)
    } catch (err) {
      setError("Error al cargar archivos FIEL: " + err.message)
    }
  }

  const selectFielFiles = async () => {
    try {
      const result = await window.electronAPI.selectFielFiles()

      if (result.success) {
        await loadFielFiles()
      } else {
        setError(result.message || "Error al seleccionar archivos")
      }
    } catch (err) {
      setError("Error al seleccionar archivos: " + err.message)
    }
  }

  const validateRFC = async () => {
    const rfc = prompt("Ingresa el RFC a validar:")

    if (!rfc) return

    try {
      setLoading(true)
      const result = await window.electronAPI.validateRFC(rfc)

      if (result.success) {
        alert(`RFC válido: ${result.rfc}\nTipo: ${result.isPersonaMoral ? "Persona Moral" : "Persona Física"}`)
      } else {
        alert(`RFC inválido: ${result.message}`)
      }
    } catch (err) {
      setError("Error al validar RFC: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="sat-integration">
      <h2>Integración con el SAT</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="connection-status">
        <h3>Estado de Conexión</h3>
        <div className={`status ${connectionStatus?.success ? "success" : "error"}`}>
          {connectionStatus
            ? connectionStatus.success
              ? "✅ Conectado al SAT"
              : "❌ Sin conexión al SAT"
            : "Verificando conexión..."}
        </div>
        <button onClick={checkConnection} disabled={loading}>
          Verificar Conexión
        </button>
      </div>

      <div className="sync-section">
        <h3>Sincronización con el SAT</h3>

        {syncStatus?.inProgress && (
          <div className="progress-bar">
            <div className="progress" style={{ width: `${syncProgress}%` }}></div>
            <span>{syncProgress}%</span>
          </div>
        )}

        {syncStatus && !syncStatus.inProgress && (
          <div className={`sync-result ${syncStatus.success ? "success" : "error"}`}>
            {syncStatus.message}
            {syncStatus.lastSync && <div>Última sincronización: {new Date(syncStatus.lastSync).toLocaleString()}</div>}
          </div>
        )}

        <button onClick={syncWithSAT} disabled={loading || syncStatus?.inProgress}>
          {loading || syncStatus?.inProgress ? "Sincronizando..." : "Sincronizar con SAT"}
        </button>
      </div>

      <div className="fiel-section">
        <h3>Archivos FIEL</h3>

        {fielFiles.length > 0 ? (
          <ul className="file-list">
            {fielFiles.map((file, index) => (
              <li key={index}>
                <span className="file-name">{file.name}</span>
                <span className="file-size">({Math.round(file.size / 1024)} KB)</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay archivos FIEL cargados</p>
        )}

        <button onClick={selectFielFiles}>Seleccionar Archivos FIEL</button>
      </div>

      <div className="tools-section">
        <h3>Herramientas</h3>
        <button onClick={validateRFC}>Validar RFC</button>
      </div>
    </div>
  )
}
