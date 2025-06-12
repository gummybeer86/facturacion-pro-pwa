"use client"

import { useState } from "react"

export default function AdminPanel({ onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("users")

  // Estados para gestión de usuarios
  const [users, setUsers] = useState([])
  const [newUsername, setNewUsername] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newRole, setNewRole] = useState("user")

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!username || !password) {
      setError("Por favor ingresa usuario y contraseña")
      return
    }

    try {
      const result = await window.electronAPI.verifyAdmin(username, password)

      if (result.success) {
        setIsAuthenticated(true)
        setError("")
      } else {
        setError(result.message || "Credenciales inválidas")
      }
    } catch (err) {
      setError("Error de autenticación: " + err.message)
    }
  }

  const handleAddUser = async (e) => {
    e.preventDefault()

    if (!newUsername || !newPassword) {
      setError("Por favor completa todos los campos")
      return
    }

    try {
      const result = await window.electronAPI.addAdminUser(newUsername, newPassword, newRole)

      if (result.success) {
        setNewUsername("")
        setNewPassword("")
        setNewRole("user")
        setError("")
        // Aquí deberías actualizar la lista de usuarios
      } else {
        setError(result.message || "Error al crear usuario")
      }
    } catch (err) {
      setError("Error al crear usuario: " + err.message)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <h2>Panel de Administración</h2>
        <p>Ingresa tus credenciales para acceder</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="form-actions">
            <button type="submit">Iniciar Sesión</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>

      <div className="admin-tabs">
        <button className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>
          Usuarios
        </button>
        <button className={activeTab === "licenses" ? "active" : ""} onClick={() => setActiveTab("licenses")}>
          Licencias
        </button>
        <button className={activeTab === "settings" ? "active" : ""} onClick={() => setActiveTab("settings")}>
          Configuración
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {activeTab === "users" && (
        <div className="tab-content">
          <h3>Gestión de Usuarios</h3>

          <form onSubmit={handleAddUser}>
            <div className="form-group">
              <label htmlFor="newUsername">Usuario:</label>
              <input
                type="text"
                id="newUsername"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">Contraseña:</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="newRole">Rol:</label>
              <select id="newRole" value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <button type="submit">Agregar Usuario</button>
          </form>

          <h4>Usuarios Existentes</h4>
          {/* Aquí iría la lista de usuarios */}
        </div>
      )}

      {activeTab === "licenses" && (
        <div className="tab-content">
          <h3>Gestión de Licencias</h3>
          {/* Contenido de gestión de licencias */}
        </div>
      )}

      {activeTab === "settings" && (
        <div className="tab-content">
          <h3>Configuración del Sistema</h3>
          {/* Contenido de configuración */}
        </div>
      )}

      <div className="admin-actions">
        <button onClick={onClose}>Cerrar Panel</button>
      </div>
    </div>
  )
}
