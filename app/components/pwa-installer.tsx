"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Smartphone, Monitor } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

export function PWAInstaller() {
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

    // Check if already installed
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
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-8">
        <Card className="bg-green-900/40 backdrop-blur-xl border border-green-700/50 shadow-xl">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <Download className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-green-300 mb-2">¡App Instalada!</h3>
            <p className="text-green-200">Create Studio Digital está instalado en tu dispositivo</p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-8">
      <Card className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center">
              <Download className="w-8 h-8 text-white" />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-200 mb-4">Instalar como App</h3>
          <p className="text-slate-300 mb-6">Obtén acceso rápido, notificaciones push y funciona sin conexión</p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-3 p-4 bg-slate-700/30 rounded-xl">
              <Monitor className="w-8 h-8 text-blue-400" />
              <div className="text-left">
                <p className="font-medium text-slate-200">Escritorio</p>
                <p className="text-sm text-slate-400">Chrome: Menú → Instalar</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-slate-700/30 rounded-xl">
              <Smartphone className="w-8 h-8 text-green-400" />
              <div className="text-left">
                <p className="font-medium text-slate-200">Móvil</p>
                <p className="text-sm text-slate-400">Safari: Compartir → Añadir</p>
              </div>
            </div>
          </div>

          {isInstallable && (
            <Button
              onClick={handleInstall}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Download className="w-5 h-5 mr-2" />
              Instalar App Ahora
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
