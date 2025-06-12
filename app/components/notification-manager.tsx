"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, BellRing, Settings } from "lucide-react"

export function NotificationManager() {
  const [permission, setPermission] = useState<NotificationPermission>("default")
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    if ("Notification" in window) {
      setIsSupported(true)
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = async () => {
    if (!isSupported) return

    const result = await Notification.requestPermission()
    setPermission(result)

    if (result === "granted") {
      // Send welcome notification
      new Notification("¡Bienvenido a Create Studio Digital!", {
        body: "Ahora recibirás notificaciones sobre nuestros productos y servicios",
        icon: "/images/createstudio-logo.png",
        badge: "/images/createstudio-logo.png",
        tag: "welcome",
      })

      // Register service worker for push notifications
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js")
          console.log("Service Worker registered:", registration)
        } catch (error) {
          console.error("Service Worker registration failed:", error)
        }
      }
    }
  }

  const sendTestNotification = () => {
    if (permission === "granted") {
      new Notification("Notificación de Prueba", {
        body: "¡Las notificaciones están funcionando correctamente!",
        icon: "/images/createstudio-logo.png",
        badge: "/images/createstudio-logo.png",
        tag: "test",
      })
    }
  }

  if (!isSupported) {
    return null
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 py-12 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <Card className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl shadow-lg flex items-center justify-center">
                {permission === "granted" ? (
                  <BellRing className="w-8 h-8 text-white" />
                ) : (
                  <Bell className="w-8 h-8 text-white" />
                )}
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-200 mb-4">
              {permission === "granted" ? "¡Notificaciones Activadas!" : "Activar Notificaciones"}
            </h3>

            <p className="text-slate-300 mb-6">
              {permission === "granted"
                ? "Recibirás notificaciones sobre nuevos productos, actualizaciones y ofertas especiales"
                : "Mantente al día con nuestros últimos productos y servicios"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {permission === "default" && (
                <Button
                  onClick={requestPermission}
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Bell className="w-5 h-5 mr-2" />
                  Activar Notificaciones
                </Button>
              )}

              {permission === "granted" && (
                <Button
                  onClick={sendTestNotification}
                  variant="outline"
                  size="lg"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Enviar Prueba
                </Button>
              )}

              {permission === "denied" && (
                <div className="text-slate-400">
                  <p>Las notificaciones están bloqueadas.</p>
                  <p className="text-sm">Puedes habilitarlas en la configuración del navegador.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  )
}
