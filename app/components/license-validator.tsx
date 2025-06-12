"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, Key, Shield } from "lucide-react"

type ValidationResult = "valid" | "invalid" | "expired" | null

export function LicenseValidator() {
  const [licenseKey, setLicenseKey] = useState("")
  const [validationResult, setValidationResult] = useState<ValidationResult>(null)
  const [isValidating, setIsValidating] = useState(false)

  const validateLicense = async () => {
    if (!licenseKey.trim()) return

    setIsValidating(true)

    // Simular validación de licencia
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Lógica de validación
    if (licenseKey.toUpperCase() === "CHAPA-MARKET-2025-VALID") {
      setValidationResult("valid")
    } else if (licenseKey.toUpperCase() === "CHAPA-MARKET-2024-EXPIRED") {
      setValidationResult("expired")
    } else {
      setValidationResult("invalid")
    }

    setIsValidating(false)
  }

  const getValidationIcon = () => {
    switch (validationResult) {
      case "valid":
        return <CheckCircle className="w-16 h-16 text-green-400" />
      case "expired":
        return <AlertTriangle className="w-16 h-16 text-yellow-400" />
      case "invalid":
        return <XCircle className="w-16 h-16 text-red-400" />
      default:
        return <Key className="w-16 h-16 text-slate-400" />
    }
  }

  const getValidationMessage = () => {
    switch (validationResult) {
      case "valid":
        return {
          title: "Licencia Válida",
          message: "Tu licencia está activa y vigente",
          color: "text-green-400",
        }
      case "expired":
        return {
          title: "Licencia Expirada",
          message: "Tu licencia ha expirado. Contacta soporte para renovar",
          color: "text-yellow-400",
        }
      case "invalid":
        return {
          title: "Licencia Inválida",
          message: "La clave de licencia no es válida",
          color: "text-red-400",
        }
      default:
        return {
          title: "Validar Licencia",
          message: "Ingresa tu clave de licencia para validar",
          color: "text-slate-400",
        }
    }
  }

  const validation = getValidationMessage()

  const handleWhatsAppSupport = () => {
    window.open("https://wa.me/5217731086826", "_blank")
  }

  return (
    <Card className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <img src="/images/comprueba.png" alt="Validación de Licencia" className="w-24 h-24 object-contain" />
        </div>
        <CardTitle className="text-2xl font-bold text-slate-200">Validador de Licencias</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="text-center">
          {getValidationIcon()}
          <h3 className={`text-xl font-semibold mt-4 ${validation.color}`}>{validation.title}</h3>
          <p className="text-slate-300 mt-2">{validation.message}</p>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Ingresa tu clave de licencia"
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
            className="bg-slate-700/50 border-slate-600 text-slate-200 placeholder-slate-400"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                validateLicense()
              }
            }}
          />

          <Button
            onClick={validateLicense}
            disabled={!licenseKey.trim() || isValidating}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isValidating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Validando...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 mr-2" />
                Validar Licencia
              </>
            )}
          </Button>
        </div>

        {validationResult && (
          <div className="text-center">
            <Badge
              className={
                validationResult === "valid"
                  ? "bg-green-500/20 text-green-300 border-green-500/30"
                  : validationResult === "expired"
                    ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                    : "bg-red-500/20 text-red-300 border-red-500/30"
              }
            >
              {validationResult === "valid" && "✓ Licencia Activa"}
              {validationResult === "expired" && "⚠ Licencia Expirada"}
              {validationResult === "invalid" && "✗ Licencia Inválida"}
            </Badge>
          </div>
        )}

        <div className="text-center text-sm text-slate-400">
          <p>¿Necesitas ayuda? Contacta soporte:</p>
          <Button
            variant="link"
            onClick={handleWhatsAppSupport}
            className="text-orange-400 hover:text-orange-300 p-0 h-auto"
          >
            773-108-6826
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
