"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Mail, AlertCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { MacWindow } from "./components/mac-window"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Efecto para reproducir sonido al cargar
  useEffect(() => {
    const audio = new Audio("/sounds/startup.mp3")
    audio.volume = 0.4
    audio.play().catch((e) => console.error("Error reproduciendo sonido:", e))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Reproducir sonido al hacer clic
    const audio = new Audio("/sounds/click.mp3")
    audio.volume = 0.3
    audio.play().catch((e) => console.error("Error reproduciendo sonido:", e))

    // Simulación de login
    setTimeout(() => {
      if (email === "admin@example.com" && password === "password") {
        // Reproducir sonido de éxito
        const successAudio = new Audio("/sounds/success.mp3")
        successAudio.volume = 0.3
        successAudio.play().catch((e) => console.error("Error reproduciendo sonido:", e))

        router.push("/")
      } else {
        // Reproducir sonido de error
        const errorAudio = new Audio("/sounds/error.mp3")
        errorAudio.volume = 0.3
        errorAudio.play().catch((e) => console.error("Error reproduciendo sonido:", e))

        setError("Credenciales incorrectas. Intente nuevamente.")
      }
      setIsLoading(false)
    }, 1500)
  }

  const LoginContent = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center mb-4"
          >
            <Image
              src="/images/chapamarket-logo.png"
              alt="ChapaMarket LicenceManager Pro"
              width={280}
              height={90}
              className="drop-shadow-xl"
            />
          </motion.div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-600 mt-2"
          >
            Plataforma de Gestión de Licencias y Clientes
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle>Iniciar Sesión</CardTitle>
              <CardDescription>Ingrese sus credenciales para acceder al panel</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-red-100/80 backdrop-blur-sm text-red-800 p-3 rounded-md flex items-center text-sm"
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {error}
                  </motion.div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Contraseña</Label>
                    <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline">
                      ¿Olvidó su contraseña?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 border-t border-gray-100 pt-4">
              <div className="text-center text-sm text-gray-500">
                <p>Credenciales de demostración:</p>
                <p>Email: admin@example.com</p>
                <p>Contraseña: password</p>
              </div>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>
            ¿No tiene una cuenta?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Solicitar acceso
            </Link>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 text-center text-xs text-gray-500"
        >
          <p>© 2025 Create Studio Digital</p>
          <p className="mt-1">ING-Cesar Sanchez</p>
          <p className="mt-2">
            WhatsApp: 773-108-6826 o 763-109-3925
            <br />
            Email: kashtaman@createstudiodigital.com o vercelkash@gmail.com
            <br />
            Chapantogo 2025 ChapaMarket Hgo.
          </p>
        </motion.div>
      </div>
    </div>
  )

  return (
    <MacWindow title="Login - ChapaMarket LicenceManager Pro">
      <LoginContent />
    </MacWindow>
  )
}
