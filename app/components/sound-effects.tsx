"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Volume2, VolumeX, Play } from "lucide-react"

const soundEffects = [
  { name: "Clic", file: "click.mp3", description: "Sonido al hacer clic en botones" },
  { name: "Notificación", file: "notification.mp3", description: "Sonido para alertas y notificaciones" },
  { name: "Éxito", file: "success.mp3", description: "Sonido para operaciones exitosas" },
  { name: "Error", file: "error.mp3", description: "Sonido para errores" },
  { name: "Inicio", file: "startup.mp3", description: "Sonido al iniciar la aplicación" },
]

export function SoundEffects() {
  const [muted, setMuted] = useState(false)

  const playSound = (file: string) => {
    if (muted) return

    const audio = new Audio(`/sounds/${file}`)
    audio.volume = 0.3
    audio.play().catch((e) => console.error("Error reproduciendo sonido:", e))
  }

  return (
    <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Efectos de Sonido</span>
          <Button variant="ghost" size="sm" onClick={() => setMuted(!muted)} className="h-8 w-8 p-0 rounded-full">
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </CardTitle>
        <CardDescription>Prueba los efectos de sonido de la aplicación</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {soundEffects.map((sound) => (
            <div
              key={sound.file}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
            >
              <div>
                <p className="font-medium">{sound.name}</p>
                <p className="text-xs text-gray-500">{sound.description}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => playSound(sound.file)}
                className="h-8 w-8 p-0 rounded-full"
              >
                <Play className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
