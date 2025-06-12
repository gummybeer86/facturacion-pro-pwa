"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Server, Laptop, Cloud, DollarSign, Zap, Lock } from "lucide-react"

export function VercelVsElectron() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300">
        <CardHeader>
          <CardTitle className="flex items-center text-red-800">
            <XCircle className="h-5 w-5 mr-2" />
            Problemas con Vercel (que ya no tendrás)
          </CardTitle>
          <CardDescription>Por qué Vercel no es ideal para software de facturación</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 bg-white/80 p-3 rounded-lg">
              <Server className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="font-medium text-red-800">Dependes del servidor</p>
                <p className="text-sm text-gray-600">Si Vercel falla, tu software no funciona</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-white/80 p-3 rounded-lg">
              <DollarSign className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="font-medium text-red-800">Costos recurrentes</p>
                <p className="text-sm text-gray-600">$100+ en créditos perdidos y sigue costando</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-white/80 p-3 rounded-lg">
              <Cloud className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="font-medium text-red-800">Pérdida de datos</p>
                <p className="text-sm text-gray-600">Tu trabajo se borra si hay problemas</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-white/80 p-3 rounded-lg">
              <Lock className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="font-medium text-red-800">No es una app "real"</p>
                <p className="text-sm text-gray-600">Los clientes no confían en apps web para facturación</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <CheckCircle className="h-5 w-5 mr-2" />
            Ventajas de Electron (que resolverán tus problemas)
          </CardTitle>
          <CardDescription>Por qué Electron es perfecto para software de facturación</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 bg-white/80 p-3 rounded-lg">
              <Laptop className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-green-800">App de escritorio real</p>
                <p className="text-sm text-gray-600">Funciona sin internet, sin depender de servidores</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-white/80 p-3 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-green-800">Sin costos recurrentes</p>
                <p className="text-sm text-gray-600">Costo $0 para ti, vendes licencias a tus clientes</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-white/80 p-3 rounded-lg">
              <Lock className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-green-800">Datos locales seguros</p>
                <p className="text-sm text-gray-600">Los datos fiscales se guardan en la PC del cliente</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-white/80 p-3 rounded-lg">
              <Zap className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-green-800">Más profesional</p>
                <p className="text-sm text-gray-600">Los clientes confían más en software instalable</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300">
        <CardHeader>
          <CardTitle className="text-blue-800">Lo mejor: ¡Puedes usar tu mismo código!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 bg-white/80 p-3 rounded-lg">
              <Badge className="bg-blue-500">React/Next.js</Badge>
              <p className="text-sm">Si tu app está en React/Next.js, funciona directamente en Electron</p>
            </div>
            <div className="flex items-center space-x-3 bg-white/80 p-3 rounded-lg">
              <Badge className="bg-blue-500">HTML/CSS/JS</Badge>
              <p className="text-sm">Si tu app es HTML/CSS/JS, funciona directamente en Electron</p>
            </div>
            <div className="flex items-center space-x-3 bg-white/80 p-3 rounded-lg">
              <Badge className="bg-blue-500">Vue/Angular/etc</Badge>
              <p className="text-sm">Cualquier framework web funciona en Electron sin cambios</p>
            </div>
            <div className="bg-blue-100/80 p-4 rounded-lg mt-4">
              <p className="font-medium text-blue-800">
                ¡Tu código actual de Vercel funcionará en Electron con cambios mínimos!
              </p>
              <p className="text-sm text-blue-700 mt-2">
                No tienes que reescribir nada, solo empaquetarlo como app de escritorio
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
