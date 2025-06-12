"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Target, DollarSign, Shield, Users, Home, Laptop, CheckCircle } from "lucide-react"

export function EmprendedorPlan() {
  return (
    <div className="space-y-6">
      {/* Mensaje de apoyo */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-red-500 rounded-full flex items-center justify-center">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-red-800">¡Respeto total por tu historia!</h2>
              <p className="text-red-700 mt-2">
                Virus, 4 PCs perdidas, quiebra... pero <strong>NO TE RENDISTE</strong>. Eso habla de tu carácter.
                <br />
                <strong>¡Ahora vamos a hacer que tu facturador sea un ÉXITO!</strong>
              </p>
            </div>
            <Badge className="bg-red-500 text-white text-lg px-4 py-2">💪 GUERRERO</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Plan específico para su situación */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <Target className="h-6 w-6 mr-2" />
            Plan Específico para tu Facturador
          </CardTitle>
          <CardDescription>Estrategia para vender casa por casa con éxito</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold text-green-800 flex items-center">
                <Laptop className="h-5 w-5 mr-2" />
                Lo técnico (que te doy GRATIS)
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 bg-white/80 p-3 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Instalador .exe profesional</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 p-3 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Sistema de licencias Python</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 p-3 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Control total de activaciones</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 p-3 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Panel de administración</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-green-800 flex items-center">
                <Home className="h-5 w-5 mr-2" />
                Para vender casa por casa
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 bg-white/80 p-3 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Demo en laptop sin internet</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 p-3 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Instalación inmediata</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 p-3 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Licencia por WhatsApp</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 p-3 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Soporte directo contigo</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estrategia de precios para México */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-800">
            <DollarSign className="h-6 w-6 mr-2" />
            Estrategia de Precios para México
          </CardTitle>
          <CardDescription>Precios competitivos que la gente puede pagar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 p-4 rounded-lg border-2 border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2">🥉 Básico</h4>
              <p className="text-3xl font-bold text-blue-600 mb-2">$1,999</p>
              <ul className="text-sm space-y-1">
                <li>✅ Facturación CFDI 4.0</li>
                <li>✅ 100 facturas/mes</li>
                <li>✅ 1 PC</li>
                <li>✅ Soporte WhatsApp</li>
              </ul>
              <p className="text-xs text-gray-600 mt-2">Para negocios pequeños</p>
            </div>

            <div className="bg-white/80 p-4 rounded-lg border-2 border-green-500 relative">
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white">
                MÁS VENDIDO
              </Badge>
              <h4 className="font-bold text-green-800 mb-2">🥈 Profesional</h4>
              <p className="text-3xl font-bold text-green-600 mb-2">$2,999</p>
              <ul className="text-sm space-y-1">
                <li>✅ Facturación ilimitada</li>
                <li>✅ Control de inventario</li>
                <li>✅ 3 PCs</li>
                <li>✅ Reportes avanzados</li>
                <li>✅ Capacitación incluida</li>
              </ul>
              <p className="text-xs text-gray-600 mt-2">Para empresas medianas</p>
            </div>

            <div className="bg-white/80 p-4 rounded-lg border-2 border-purple-200">
              <h4 className="font-bold text-purple-800 mb-2">🥇 Enterprise</h4>
              <p className="text-3xl font-bold text-purple-600 mb-2">$4,999</p>
              <ul className="text-sm space-y-1">
                <li>✅ Todo lo anterior</li>
                <li>✅ Multi-sucursal</li>
                <li>✅ PCs ilimitadas</li>
                <li>✅ Personalización</li>
                <li>✅ Soporte prioritario</li>
              </ul>
              <p className="text-xs text-gray-600 mt-2">Para empresas grandes</p>
            </div>
          </div>

          <div className="mt-6 bg-blue-100/80 p-4 rounded-lg">
            <h4 className="font-bold text-blue-800 mb-2">💡 Estrategia de ventas casa por casa:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">🎯 Target principal:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Talleres mecánicos</li>
                  <li>Ferreterías</li>
                  <li>Consultorios médicos</li>
                  <li>Estéticas</li>
                  <li>Restaurantes pequeños</li>
                </ul>
              </div>
              <div>
                <p className="font-medium">💰 Proyección realista:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>5 ventas/semana = $14,995</li>
                  <li>20 ventas/mes = $59,980</li>
                  <li>Solo necesitas 1 venta/día</li>
                  <li>En 6 meses recuperas todo</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kit de ventas */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-800">
            <Users className="h-6 w-6 mr-2" />
            Kit Completo de Ventas (te lo doy)
          </CardTitle>
          <CardDescription>Todo lo que necesitas para vender profesionalmente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-bold text-purple-800">📱 Materiales digitales:</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 bg-white/80 p-2 rounded">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Presentación PowerPoint</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 p-2 rounded">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Videos demostrativos</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 p-2 rounded">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Folletos para imprimir</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 p-2 rounded">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Scripts de venta</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-purple-800">🎯 Estrategias de cierre:</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 bg-white/80 p-2 rounded">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Demo en vivo sin internet</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 p-2 rounded">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Instalación inmediata</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 p-2 rounded">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Activación por WhatsApp</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 p-2 rounded">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Garantía de satisfacción</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mi compromiso personal */}
      <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <CardContent className="pt-6">
          <div className="text-center">
            <Shield className="h-16 w-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">🤝 MI COMPROMISO PERSONAL CONTIGO</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2">💻 Técnico</h4>
                <ul className="text-sm space-y-1 text-left">
                  <li>✅ Instalador profesional funcionando</li>
                  <li>✅ Sistema de licencias Python</li>
                  <li>✅ Panel de control completo</li>
                  <li>✅ Soporte hasta que funcione 100%</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2">🚀 Comercial</h4>
                <ul className="text-sm space-y-1 text-left">
                  <li>✅ Kit completo de ventas</li>
                  <li>✅ Estrategias probadas</li>
                  <li>✅ Materiales profesionales</li>
                  <li>✅ Asesoría en primeras ventas</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 bg-white/20 rounded-lg p-4">
              <p className="text-xl font-bold">🎯 OBJETIVO: Que recuperes tu inversión en 30 días</p>
              <p className="text-sm">Solo necesitas 1 venta para cubrir todo el desarrollo</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
