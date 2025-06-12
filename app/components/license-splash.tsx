"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Key, Shield, Clock, CheckCircle, AlertTriangle, Sparkles, Lock, Unlock } from "lucide-react"

interface LicenseSplashProps {
  onLicenseValid: () => void
}

export function LicenseSplash({ onLicenseValid }: LicenseSplashProps) {
  const [licenseStatus, setLicenseStatus] = useState<"checking" | "trial" | "expired" | "activated" | "invalid">(
    "checking",
  )
  const [trialDaysLeft, setTrialDaysLeft] = useState(15)
  const [licenseKey, setLicenseKey] = useState("")
  const [showActivation, setShowActivation] = useState(false)
  const [isActivating, setIsActivating] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simular verificación de licencia
    const checkLicense = async () => {
      setProgress(20)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setProgress(60)
      await new Promise((resolve) => setTimeout(resolve, 800))

      setProgress(100)
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Simular estado de prueba
      setLicenseStatus("trial")
      setTrialDaysLeft(15)
    }

    checkLicense()
  }, [])

  const handleActivateLicense = async () => {
    if (!licenseKey.trim()) return

    setIsActivating(true)

    // Simular activación
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (licenseKey.toUpperCase().includes("CHAPA")) {
      setLicenseStatus("activated")
      setTimeout(() => {
        onLicenseValid()
      }, 2000)
    } else {
      setLicenseStatus("invalid")
    }

    setIsActivating(false)
  }

  const handleContinueTrial = () => {
    setTimeout(() => {
      onLicenseValid()
    }, 1000)
  }

  const getStatusIcon = () => {
    switch (licenseStatus) {
      case "checking":
        return <Sparkles className="w-8 h-8 text-blue-500 animate-spin" />
      case "trial":
        return <Clock className="w-8 h-8 text-yellow-500" />
      case "activated":
        return <CheckCircle className="w-8 h-8 text-green-500" />
      case "expired":
        return <AlertTriangle className="w-8 h-8 text-red-500" />
      case "invalid":
        return <Lock className="w-8 h-8 text-red-500" />
      default:
        return <Shield className="w-8 h-8 text-gray-500" />
    }
  }

  const getStatusMessage = () => {
    switch (licenseStatus) {
      case "checking":
        return "Verificando licencia..."
      case "trial":
        return `Período de prueba activo - ${trialDaysLeft} días restantes`
      case "activated":
        return "¡Licencia activada correctamente!"
      case "expired":
        return "El período de prueba ha expirado"
      case "invalid":
        return "Clave de licencia inválida"
      default:
        return "Estado desconocido"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Efectos de fondo estilo luna */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <Card className="w-[500px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
          <CardContent className="p-8">
            {/* Logo Principal */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-6"
              >
                <img
                  src="/images/chapamarket-main-logo.png"
                  alt="CHAPAMARKET - Software para tu Negocio"
                  className="w-full max-w-[400px] mx-auto drop-shadow-2xl"
                />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <h1 className="text-2xl font-bold text-white mb-2">Sistema de Facturación Electrónica</h1>
                <p className="text-white/70">CFDI 4.0 - Integración completa con el SAT</p>
              </motion.div>
            </div>

            {/* Estado de Licencia */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center mb-4">{getStatusIcon()}</div>

              <h2 className="text-xl font-semibold text-white mb-2">{getStatusMessage()}</h2>

              {licenseStatus === "checking" && (
                <div className="space-y-2">
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-white/60">Inicializando sistema...</p>
                </div>
              )}

              {licenseStatus === "trial" && (
                <div className="space-y-4">
                  <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                    <Clock className="w-4 h-4 mr-2" />
                    Versión de Prueba
                  </Badge>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={handleContinueTrial}
                      className="bg-blue-600/80 hover:bg-blue-600 text-white backdrop-blur-sm"
                    >
                      <Unlock className="w-4 h-4 mr-2" />
                      Continuar Prueba
                    </Button>

                    <Button
                      onClick={() => setShowActivation(true)}
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                    >
                      <Key className="w-4 h-4 mr-2" />
                      Activar Licencia
                    </Button>
                  </div>
                </div>
              )}

              {licenseStatus === "activated" && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-4"
                >
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Licencia Completa
                  </Badge>
                  <p className="text-white/70">Iniciando aplicación...</p>
                </motion.div>
              )}

              {(licenseStatus === "expired" || licenseStatus === "invalid") && (
                <div className="space-y-4">
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    {licenseStatus === "expired" ? "Prueba Expirada" : "Licencia Inválida"}
                  </Badge>

                  <Button
                    onClick={() => setShowActivation(true)}
                    className="w-full bg-blue-600/80 hover:bg-blue-600 text-white backdrop-blur-sm"
                  >
                    <Key className="w-4 h-4 mr-2" />
                    Activar Licencia Completa
                  </Button>
                </div>
              )}
            </motion.div>

            {/* Panel de Activación */}
            <AnimatePresence>
              {showActivation && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-white/20 pt-6 mt-6"
                >
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="licenseKey" className="text-white mb-2 block">
                        Clave de Licencia
                      </Label>
                      <Input
                        id="licenseKey"
                        type="text"
                        placeholder="CHAPA-XXXX-XXXX-XXXX"
                        value={licenseKey}
                        onChange={(e) => setLicenseKey(e.target.value)}
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50 backdrop-blur-sm"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={handleActivateLicense}
                        disabled={isActivating || !licenseKey.trim()}
                        className="flex-1 bg-green-600/80 hover:bg-green-600 text-white backdrop-blur-sm"
                      >
                        {isActivating ? (
                          <>
                            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                            Activando...
                          </>
                        ) : (
                          <>
                            <Key className="w-4 h-4 mr-2" />
                            Activar
                          </>
                        )}
                      </Button>

                      <Button
                        onClick={() => setShowActivation(false)}
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-center mt-8 pt-6 border-t border-white/20"
            >
              <p className="text-sm text-white/60">© 2025 Create Studio Digital</p>
              <p className="text-xs text-white/40 mt-1">Chapantongo, Hidalgo - México</p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
