"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Smartphone, Monitor } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setIsInstallable(true)
    }

    const installedHandler = () => {
      setIsInstalled(true)
      setIsInstallable(false)
    }

    window.addEventListener("beforeinstallprompt", handler)
    window.addEventListener("appinstalled", installedHandler)

    // Verificar si ya está instalado
    if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
      window.removeEventListener("appinstalled", installedHandler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setIsInstallable(false)
    }
  }

  if (isInstalled) {
    return (
      <Card className="bg-green-50/80 backdrop-blur-md border border-green-200 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
              <Download className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-green-800">¡Aplicación Instalada!</p>
              <p className="text-sm text-green-600">LicenseManager Pro está instalado en tu dispositivo</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!isInstallable) {
    return (
      <Card className="bg-blue-50/80 backdrop-blur-md border border-blue-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="h-5 w-5 mr-2 text-blue-600" />
            Instalar como App
          </CardTitle>
          <CardDescription>Para una mejor experiencia, puedes instalar esta aplicación</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
              <Monitor className="h-8 w-8 text-blue-600" />
              <div>
                <p className="font-medium">En Escritorio</p>
                <p className="text-sm text-gray-600">Chrome: Menú → Instalar app</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
              <Smartphone className="h-8 w-8 text-blue-600" />
              <div>
                <p className="font-medium">En Móvil</p>
                <p className="text-sm text-gray-600">Safari: Compartir → Añadir a inicio</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-blue-50/80 backdrop-blur-md border border-blue-200 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Download className="h-5 w-5 mr-2 text-blue-600" />
          Instalar Aplicación
        </CardTitle>
        <CardDescription>Instala LicenseManager Pro para acceso rápido y uso offline</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleInstall} className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Instalar Ahora
        </Button>
      </CardContent>
    </Card>
  )
}
