"use client"

import { useState, useEffect } from "react"

export default function LicenseScreen({ onActivated }) {
  const [licenseStatus, setLicenseStatus] = useState(null)
  const [licenseKey, setLicenseKey] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    checkLicense()
  }, [])

  const checkLicense = async () => {
    try {
      setLoading(true)
      const status = await window.electronAPI.checkLicense()
      setLicenseStatus(status)

      if (status.valid && (status.type === "full" || status.type === "trial")) {
        onActivated()
      }
    } catch (err) {
      setError("Error al verificar licencia: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  const activateLicense = async () => {
    if (!licenseKey.trim()) {
      setError("Por favor ingresa una clave de licencia válida")
      return
    }

    try {
      setLoading(true)
      const result = await window.electronAPI.activateLicense(licenseKey)

      if (result.success) {
        await checkLicense()
      } else {
        setError(result.message || "Error al activar licencia")
      }
    } catch (err) {
      setError("Error al activar licencia: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="license-screen">
        <div className="loading">Verificando licencia...</div>
      </div>
    )
  }

  return (
    <div className="license-screen">
      <div className="license-container">
        <h1>CHAPAMARKET Facturación Pro</h1>

        {licenseStatus?.type === "trial" && (
          <div className="trial-info">
            <h2>Período de Prueba</h2>
            <p>
              Tienes <strong>{licenseStatus.daysLeft} días</strong> restantes en tu período de prueba.
            </p>
            <p>Expira el: {new Date(licenseStatus.expiryDate).toLocaleDateString()}</p>
          </div>
        )}

        {licenseStatus?.type === "trial_expired" && (
          <div className="expired-info">
            <h2>Período de Prueba Expirado</h2>
            <p>Tu período de prueba ha expirado el {new Date(licenseStatus.expiryDate).toLocaleDateString()}</p>
            <p>Por favor activa una licencia completa para continuar usando el software.</p>
          </div>
        )}

        {(!licenseStatus?.valid || licenseStatus?.type === "trial" || licenseStatus?.type === "trial_expired") && (
          <div className="activation-form">
            <h2>Activar Licencia</h2>
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="licenseKey">Clave de Licencia:</label>
              <input
                type="text"
                id="licenseKey"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                placeholder="Ingresa tu clave de licencia"
              />
            </div>

            <button onClick={activateLicense} disabled={loading}>
              {loading ? "Activando..." : "Activar Licencia"}
            </button>

            {licenseStatus?.type !== "trial_expired" && (
              <button onClick={onActivated} className="continue-trial">
                {licenseStatus?.type === "trial" ? "Continuar con Prueba" : "Iniciar Período de Prueba"}
              </button>
            )}
          </div>
        )}

        <div className="contact-info">
          <p>Para adquirir una licencia, contacta a:</p>
          <p>WhatsApp: 773-108-6826 o 763-109-3925</p>
          <p>Email: kashtaman@createstudiodigital.com</p>
        </div>
      </div>
    </div>
  )
}
