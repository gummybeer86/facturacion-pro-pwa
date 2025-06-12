const fs = require("fs")
const path = require("path")
const crypto = require("crypto")
const { app } = require("electron")

class LicenseManager {
  constructor() {
    this.userDataPath = app.getPath("userData")
    this.licenseFile = path.join(this.userDataPath, "license.dat")
    this.adminFile = path.join(this.userDataPath, "admin.dat")
    this.trialDays = 7
  }

  // Inicializar sistema de licencias
  init() {
    if (!fs.existsSync(this.licenseFile)) {
      // Primera ejecución - crear archivo de licencia de prueba
      const trialExpiry = new Date()
      trialExpiry.setDate(trialExpiry.getDate() + this.trialDays)

      const licenseData = {
        type: "trial",
        installDate: new Date().toISOString(),
        expiryDate: trialExpiry.toISOString(),
        machineId: this.getMachineId(),
        activated: false,
      }

      this.saveLicenseData(licenseData)
      return licenseData
    }

    return this.getLicenseData()
  }

  // Obtener ID único de la máquina
  getMachineId() {
    const hostname = require("os").hostname()
    const username = require("os").userInfo().username
    const cpus = require("os").cpus().length
    const platform = require("os").platform()

    const id = `${hostname}-${username}-${cpus}-${platform}`
    return crypto.createHash("md5").update(id).digest("hex")
  }

  // Guardar datos de licencia encriptados
  saveLicenseData(data) {
    const encryptedData = this.encrypt(JSON.stringify(data))
    fs.writeFileSync(this.licenseFile, encryptedData)
  }

  // Obtener datos de licencia
  getLicenseData() {
    try {
      const encryptedData = fs.readFileSync(this.licenseFile, "utf8")
      const decryptedData = this.decrypt(encryptedData)
      return JSON.parse(decryptedData)
    } catch (error) {
      console.error("Error al leer licencia:", error)
      return null
    }
  }

  // Verificar estado de licencia
  checkLicenseStatus() {
    const licenseData = this.getLicenseData()

    if (!licenseData) {
      return { valid: false, message: "No se encontró información de licencia" }
    }

    // Verificar si es una licencia completa activada
    if (licenseData.type === "full" && licenseData.activated) {
      return { valid: true, type: "full", message: "Licencia completa activada" }
    }

    // Verificar período de prueba
    if (licenseData.type === "trial") {
      const now = new Date()
      const expiryDate = new Date(licenseData.expiryDate)

      if (now > expiryDate) {
        return {
          valid: false,
          type: "trial_expired",
          message: "El período de prueba ha expirado",
          expiryDate: licenseData.expiryDate,
        }
      }

      const daysLeft = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24))
      return {
        valid: true,
        type: "trial",
        message: `Período de prueba activo`,
        daysLeft,
        expiryDate: licenseData.expiryDate,
      }
    }

    return { valid: false, message: "Licencia inválida" }
  }

  // Activar licencia completa
  activateLicense(licenseKey) {
    // Aquí implementarías la validación con tu servidor
    // Por ahora, simplemente aceptamos cualquier clave para demostración
    const licenseData = this.getLicenseData()

    if (!licenseData) {
      return { success: false, message: "Error al leer datos de licencia" }
    }

    // Actualizar a licencia completa
    licenseData.type = "full"
    licenseData.activated = true
    licenseData.licenseKey = licenseKey
    licenseData.activationDate = new Date().toISOString()

    this.saveLicenseData(licenseData)

    return { success: true, message: "Licencia activada correctamente" }
  }

  // Encriptar datos
  encrypt(text) {
    const algorithm = "aes-256-ctr"
    const secretKey = "chapamarket-secret-key-2025"
    const iv = crypto.randomBytes(16)

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

    return `${iv.toString("hex")}:${encrypted.toString("hex")}`
  }

  // Desencriptar datos
  decrypt(hash) {
    const algorithm = "aes-256-ctr"
    const secretKey = "chapamarket-secret-key-2025"

    const [ivHex, encryptedHex] = hash.split(":")
    const iv = Buffer.from(ivHex, "hex")
    const encryptedText = Buffer.from(encryptedHex, "hex")

    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv)
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()])

    return decrypted.toString()
  }

  // Gestión de administradores
  initAdminUsers() {
    if (!fs.existsSync(this.adminFile)) {
      // Crear admin por defecto
      const adminUsers = [
        {
          username: "admin",
          password: this.hashPassword("12345"),
          role: "admin",
          createdAt: new Date().toISOString(),
        },
      ]

      fs.writeFileSync(this.adminFile, JSON.stringify(adminUsers))
    }
  }

  // Obtener usuarios admin
  getAdminUsers() {
    try {
      const data = fs.readFileSync(this.adminFile, "utf8")
      return JSON.parse(data)
    } catch (error) {
      console.error("Error al leer usuarios admin:", error)
      return []
    }
  }

  // Verificar credenciales de admin
  verifyAdminCredentials(username, password) {
    const users = this.getAdminUsers()
    const user = users.find((u) => u.username === username)

    if (!user) {
      return { success: false, message: "Usuario no encontrado" }
    }

    const hashedPassword = this.hashPassword(password)
    if (user.password === hashedPassword) {
      return { success: true, user: { ...user, password: undefined } }
    }

    return { success: false, message: "Contraseña incorrecta" }
  }

  // Agregar nuevo usuario admin
  addAdminUser(username, password, role = "user") {
    const users = this.getAdminUsers()

    // Verificar si ya existe
    if (users.some((u) => u.username === username)) {
      return { success: false, message: "El usuario ya existe" }
    }

    // Agregar nuevo usuario
    users.push({
      username,
      password: this.hashPassword(password),
      role,
      createdAt: new Date().toISOString(),
    })

    fs.writeFileSync(this.adminFile, JSON.stringify(users))
    return { success: true, message: "Usuario creado correctamente" }
  }

  // Hash de contraseña simple
  hashPassword(password) {
    return crypto.createHash("sha256").update(password).digest("hex")
  }
}

module.exports = new LicenseManager()
