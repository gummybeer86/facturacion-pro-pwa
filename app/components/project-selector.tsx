"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Star, Zap, Target } from "lucide-react"

export function ProjectSelector() {
  return (
    <div className="space-y-6">
      {/* Recomendación clara */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center">
              <Star className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-green-800">🎯 USA ESTE PROYECTO</h2>
              <p className="text-green-700 mt-2">
                <strong>"software-vendor-platform"</strong> - Es el más completo y actualizado
              </p>
            </div>
            <Badge className="bg-green-500 text-white text-lg px-4 py-2">✅ RECOMENDADO</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Comparación de los 3 proyectos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Proyecto 1: CHAPAMARKET V12.0 */}
        <Card className="border-2 border-gray-300 bg-gray-50/50">
          <CardHeader>
            <CardTitle className="text-gray-700">📦 CHAPAMARKET V12.0</CardTitle>
            <CardDescription>El que mencionaste (instrucciones)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Solo instrucciones</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Código básico</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Sistema de licencias simple</span>
            </div>
            <Badge variant="outline" className="w-full justify-center">
              Versión anterior
            </Badge>
          </CardContent>
        </Card>

        {/* Proyecto 2: cleanup-project */}
        <Card className="border-2 border-blue-300 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="text-blue-700">🧹 cleanup-project</CardTitle>
            <CardDescription>Tu proyecto de Vercel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Tu código actual</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Funcionalidades específicas</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Necesita migración</span>
            </div>
            <Badge variant="outline" className="w-full justify-center">
              Tu trabajo actual
            </Badge>
          </CardContent>
        </Card>

        {/* Proyecto 3: software-vendor-platform (RECOMENDADO) */}
        <Card className="border-2 border-green-500 bg-green-50/50 relative">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-green-500 text-white">⭐ MEJOR OPCIÓN</Badge>
          </div>
          <CardHeader className="pt-8">
            <CardTitle className="text-green-700">🚀 software-vendor-platform</CardTitle>
            <CardDescription>Plataforma completa (este chat)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Sistema completo de licencias</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Gestión de clientes</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Centro de comunicación</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Reportes y analytics</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Generador Python</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Configuración Electron lista</span>
            </div>
            <Badge className="bg-green-500 text-white w-full justify-center">MÁS COMPLETO</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Instrucciones específicas */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-800">
            <Zap className="h-6 w-6 mr-2" />🎯 PLAN DE ACCIÓN RECOMENDADO
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div className="bg-white/80 p-4 rounded-lg flex-1">
                <h4 className="font-medium text-blue-800">Usa "software-vendor-platform"</h4>
                <p className="text-sm text-gray-600">Es el más completo y tiene todo lo que necesitas</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div className="bg-white/80 p-4 rounded-lg flex-1">
                <h4 className="font-medium text-blue-800">Descarga el código</h4>
                <p className="text-sm text-gray-600">Haz clic en "Download Code" en este chat</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div className="bg-white/80 p-4 rounded-lg flex-1">
                <h4 className="font-medium text-blue-800">Adapta tu facturador</h4>
                <p className="text-sm text-gray-600">Integra las funciones de tu cleanup-project</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <div className="bg-green-100/80 p-4 rounded-lg flex-1">
                <h4 className="font-medium text-green-800">Resultado final</h4>
                <p className="text-sm text-gray-600">Plataforma completa + tu facturador = ÉXITO</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comandos específicos */}
      <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-white">💻 COMANDOS EXACTOS PARA EMPEZAR</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-black/50 p-4 rounded-lg">
              <p className="text-green-400 font-mono text-sm mb-2"># 1. Crear proyecto nuevo</p>
              <p className="text-white font-mono">
                npx create-next-app@latest chapamarket-pro --typescript --tailwind --eslint --app
              </p>
            </div>

            <div className="bg-black/50 p-4 rounded-lg">
              <p className="text-green-400 font-mono text-sm mb-2"># 2. Entrar al proyecto</p>
              <p className="text-white font-mono">cd chapamarket-pro</p>
            </div>

            <div className="bg-black/50 p-4 rounded-lg">
              <p className="text-green-400 font-mono text-sm mb-2"># 3. Instalar dependencias</p>
              <p className="text-white font-mono">npm install lucide-react framer-motion</p>
              <p className="text-white font-mono">npm install electron electron-builder --save-dev</p>
            </div>

            <div className="bg-black/50 p-4 rounded-lg">
              <p className="text-green-400 font-mono text-sm mb-2"># 4. Copiar código de v0</p>
              <p className="text-white font-mono">// Descargar código del bloque "software-vendor-platform"</p>
              <p className="text-white font-mono">// Copiar todos los archivos a tu proyecto</p>
            </div>

            <div className="bg-black/50 p-4 rounded-lg">
              <p className="text-green-400 font-mono text-sm mb-2"># 5. Probar que funciona</p>
              <p className="text-white font-mono">npm run dev</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botón de acción */}
      <div className="text-center">
        <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4">
          <Target className="h-5 w-5 mr-2" />
          ¡Empezar con software-vendor-platform!
        </Button>
        <p className="text-sm text-gray-600 mt-2">Haz clic en "Download Code" arriba para obtener todo el código</p>
      </div>
    </div>
  )
}
