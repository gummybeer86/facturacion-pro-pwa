"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertTriangle, Zap } from "lucide-react"

export function FixDependencies() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-500">
        <CardHeader>
          <CardTitle className="flex items-center text-red-800">
            <AlertTriangle className="h-6 w-6 mr-2" />🚨 ARREGLEMOS LAS DEPENDENCIAS YA
          </CardTitle>
          <CardDescription>Comandos exactos para que funcione todo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-100/80 p-4 rounded-lg">
            <h4 className="font-bold text-red-800 mb-2">1️⃣ Primero: Limpia todo</h4>
            <div className="bg-gray-900 p-3 rounded text-green-400 font-mono text-sm">
              <p>rm -rf node_modules</p>
              <p>rm package-lock.json</p>
              <p># En Windows usa: rmdir /s node_modules</p>
            </div>
          </div>

          <div className="bg-orange-100/80 p-4 rounded-lg">
            <h4 className="font-bold text-orange-800 mb-2">2️⃣ Instala dependencias correctas</h4>
            <div className="bg-gray-900 p-3 rounded text-green-400 font-mono text-sm">
              <p>npm install</p>
              <p>npm install electron electron-builder --save-dev</p>
              <p>npm install electron-is-dev --save</p>
            </div>
          </div>

          <div className="bg-green-100/80 p-4 rounded-lg">
            <h4 className="font-bold text-green-800 mb-2">3️⃣ Prueba que funcione</h4>
            <div className="bg-gray-900 p-3 rounded text-green-400 font-mono text-sm">
              <p>npm run dev</p>
              <p># En otra terminal:</p>
              <p>npm run electron-dev</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <Zap className="h-6 w-6 mr-2" />🔥 GENERAR INSTALADOR FINAL
          </CardTitle>
          <CardDescription>Cuando todo funcione, crea el .exe</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-100/80 p-4 rounded-lg">
            <h4 className="font-bold text-green-800 mb-2">🪟 Para Windows (.exe)</h4>
            <div className="bg-gray-900 p-3 rounded text-green-400 font-mono text-sm">
              <p>npm run dist-win</p>
              <p># Se crea en: dist/ChapaMarket-Facturación-Pro-1.0.0-Setup.exe</p>
            </div>
          </div>

          <div className="bg-blue-100/80 p-4 rounded-lg">
            <h4 className="font-bold text-blue-800 mb-2">🍎 Para Mac (.dmg)</h4>
            <div className="bg-gray-900 p-3 rounded text-green-400 font-mono text-sm">
              <p>npm run dist-mac</p>
              <p># Se crea en: dist/ChapaMarket-Facturación-Pro-1.0.0.dmg</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-800">
            <CheckCircle className="h-6 w-6 mr-2" />✅ VERIFICACIÓN FINAL
          </CardTitle>
          <CardDescription>Asegúrate de que todo esté perfecto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-bold text-purple-800">📁 Archivos que DEBES tener:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>package.json (actualizado)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>next.config.js</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>electron.js</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>app/ (tu código React)</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-purple-800">🎯 Resultado esperado:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>npm run dev → funciona</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>npm run electron-dev → abre app</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>npm run dist-win → crea .exe</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Instalador funciona en otras PCs</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
