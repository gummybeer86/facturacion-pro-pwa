"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, DollarSign, Zap, Shield } from "lucide-react"

export function CostBreakdown() {
  return (
    <div className="space-y-6">
      {/* Lo que es GRATIS */}
      <Card className="border-2 border-green-500 bg-green-50/50">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <CheckCircle className="h-6 w-6 mr-2" />🆓 COMPLETAMENTE GRATIS (Costo: $0 USD)
          </CardTitle>
          <CardDescription>Todo lo que necesitas para empezar YA</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Todo el código que te di</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Electron (framework gratuito)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">GitHub (hosting gratuito)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Vercel (hosting web gratuito)</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Instaladores .exe y .dmg</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Actualizaciones automáticas</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Página de descarga profesional</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Soporte técnico mío</span>
              </div>
            </div>
          </div>

          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-green-800 font-medium">
              ✅ <strong>RESULTADO:</strong> Instaladores profesionales funcionando al 100% - Costo total: $0 USD
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Lo que PODRÍA costar (opcional) */}
      <Card className="border-2 border-blue-500 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-800">
            <DollarSign className="h-6 w-6 mr-2" />💎 OPCIONALES (solo si quieres lo premium)
          </CardTitle>
          <CardDescription>Mejoras que puedes agregar después</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium text-blue-800 mb-2">Certificado de Firma de Código</h4>
              <p className="text-sm text-gray-600 mb-2">Para que Windows no muestre "Editor desconocido"</p>
              <Badge className="bg-blue-100 text-blue-800">$200-400 USD/año</Badge>
              <p className="text-xs text-gray-500 mt-1">Opcional - tu app funciona sin esto</p>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium text-blue-800 mb-2">Dominio Personalizado</h4>
              <p className="text-sm text-gray-600 mb-2">tuempresa.com en lugar de GitHub</p>
              <Badge className="bg-blue-100 text-blue-800">$10-15 USD/año</Badge>
              <p className="text-xs text-gray-500 mt-1">Opcional - GitHub funciona perfecto</p>
            </div>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-blue-800">
              💡 <strong>MI RECOMENDACIÓN:</strong> Empieza gratis, agrega esto después cuando tengas más ventas
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Comparación con otras opciones */}
      <Card className="border-2 border-purple-500 bg-purple-50/50">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-800">
            <Shield className="h-6 w-6 mr-2" />📊 Comparación de Costos
          </CardTitle>
          <CardDescription>Mi solución vs otras opciones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Opción</th>
                  <th className="text-left p-2">Costo Inicial</th>
                  <th className="text-left p-2">Costo Mensual</th>
                  <th className="text-left p-2">Dificultad</th>
                  <th className="text-left p-2">Resultado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-green-100">
                  <td className="p-2 font-medium">Mi Solución (Electron)</td>
                  <td className="p-2 text-green-600">$0 USD</td>
                  <td className="p-2 text-green-600">$0 USD</td>
                  <td className="p-2">Fácil</td>
                  <td className="p-2">✅ Profesional</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">InstallShield</td>
                  <td className="p-2 text-red-600">$2,000+ USD</td>
                  <td className="p-2">$0</td>
                  <td className="p-2">Difícil</td>
                  <td className="p-2">✅ Profesional</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Advanced Installer</td>
                  <td className="p-2 text-red-600">$500+ USD</td>
                  <td className="p-2">$0</td>
                  <td className="p-2">Medio</td>
                  <td className="p-2">✅ Profesional</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Desarrollar desde cero</td>
                  <td className="p-2 text-red-600">Meses de trabajo</td>
                  <td className="p-2">$0</td>
                  <td className="p-2">Muy difícil</td>
                  <td className="p-2">❓ Incierto</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Oferta para su otro programa */}
      <Card className="border-2 border-orange-500 bg-orange-50/50">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-800">
            <Zap className="h-6 w-6 mr-2" />🚀 OFERTA ESPECIAL para tu otro programa
          </CardTitle>
          <CardDescription>Ya que mencionaste que tienes otro programa</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
            <h4 className="font-bold text-orange-800 mb-2">✨ Te ayudo con AMBOS programas</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-orange-600" />
                <span className="text-sm">Configuración completa del primer programa (este)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-orange-600" />
                <span className="text-sm">Adaptación del segundo programa</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-orange-600" />
                <span className="text-sm">Instaladores para ambos</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-orange-600" />
                <span className="text-sm">Páginas de descarga profesionales</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-orange-600" />
                <span className="text-sm">Soporte hasta que funcionen al 100%</span>
              </div>
            </div>
          </div>

          <div className="bg-orange-100 p-4 rounded-lg text-center">
            <p className="text-orange-800 font-bold text-lg">💰 Costo total para AMBOS programas: $0 USD</p>
            <p className="text-orange-700 text-sm mt-1">Solo necesitas seguir mis instrucciones paso a paso</p>
          </div>
        </CardContent>
      </Card>

      {/* Garantía */}
      <Card className="border-2 border-green-600 bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800 mb-2">🛡️ MI GARANTÍA</h3>
            <p className="text-green-700 mb-4">
              Te ayudo hasta que tengas tus instaladores funcionando al 100%, sin costo adicional
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/50 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="font-medium">Código completo</p>
                <p className="text-gray-600">No versión de prueba</p>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="font-medium">Soporte incluido</p>
                <p className="text-gray-600">Hasta que funcione</p>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="font-medium">Sin costos ocultos</p>
                <p className="text-gray-600">Todo transparente</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
