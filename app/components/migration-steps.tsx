"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Code, Package, Globe, Download } from "lucide-react"

export function MigrationSteps() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-300">
        <CardHeader>
          <CardTitle className="text-purple-800">Migración de Vercel a Electron en 4 Pasos</CardTitle>
          <CardDescription>Proceso simple para convertir tu app web en software de escritorio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div className="flex-1 bg-white/80 p-4 rounded-lg">
                <h3 className="font-medium text-purple-800 flex items-center">
                  <Code className="h-5 w-5 mr-2" />
                  Exportar tu código de Vercel
                </h3>
                <p className="text-sm text-gray-600 mt-1">Descarga tu proyecto completo de Vercel o GitHub</p>
                <div className="mt-3 bg-purple-100/80 p-3 rounded-lg">
                  <code className="text-xs text-purple-800">
                    git clone https://github.com/tu-usuario/tu-proyecto-facturacion
                  </code>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div className="flex-1 bg-white/80 p-4 rounded-lg">
                <h3 className="font-medium text-purple-800 flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Agregar archivos Electron
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Añadir 2 archivos: electron.js y package.json con configuración
                </p>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-purple-100/80 p-3 rounded-lg">
                    <p className="text-xs font-medium mb-1">electron.js</p>
                    <code className="text-xs text-purple-800">
                      const {"{app, BrowserWindow}"} = require('electron');
                      <br />
                      let mainWindow;
                      <br />
                      <br />
                      function createWindow() {"{"}
                      <br />
                      &nbsp;&nbsp;mainWindow = new BrowserWindow({"{"}
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;width: 1200,
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;height: 800
                      <br />
                      &nbsp;&nbsp;{"}"});
                      <br />
                      &nbsp;&nbsp;mainWindow.loadURL('http://localhost:3000');
                      <br />
                      {"}"}
                      <br />
                      <br />
                      app.whenReady().then(createWindow);
                    </code>
                  </div>
                  <div className="bg-purple-100/80 p-3 rounded-lg">
                    <p className="text-xs font-medium mb-1">package.json (añadir)</p>
                    <code className="text-xs text-purple-800">
                      {"{"}
                      <br />
                      &nbsp;&nbsp;"main": "electron.js",
                      <br />
                      &nbsp;&nbsp;"scripts": {"{"}
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;"electron": "electron .",
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;"dist": "electron-builder"
                      <br />
                      &nbsp;&nbsp;{"}"},<br />
                      &nbsp;&nbsp;"build": {"{"}
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;"appId": "com.tufacturacion.app"
                      <br />
                      &nbsp;&nbsp;{"}"}
                      <br />
                      {"}"}
                    </code>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div className="flex-1 bg-white/80 p-4 rounded-lg">
                <h3 className="font-medium text-purple-800 flex items-center">
                  <Download className="h-5 w-5 mr-2" />
                  Instalar dependencias
                </h3>
                <p className="text-sm text-gray-600 mt-1">Instalar Electron y herramientas de empaquetado</p>
                <div className="mt-3 bg-purple-100/80 p-3 rounded-lg">
                  <code className="text-xs text-purple-800">npm install electron electron-builder --save-dev</code>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div className="flex-1 bg-white/80 p-4 rounded-lg">
                <h3 className="font-medium text-purple-800 flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Generar instaladores
                </h3>
                <p className="text-sm text-gray-600 mt-1">Crear instaladores para Windows y Mac</p>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-purple-100/80 p-3 rounded-lg">
                    <p className="text-xs font-medium mb-1">Windows</p>
                    <code className="text-xs text-purple-800">
                      npm run build
                      <br />
                      npx electron-builder --win
                    </code>
                  </div>
                  <div className="bg-purple-100/80 p-3 rounded-lg">
                    <p className="text-xs font-medium mb-1">Mac</p>
                    <code className="text-xs text-purple-800">
                      npm run build
                      <br />
                      npx electron-builder --mac
                    </code>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-6">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                ¡Listo! Tu app de Vercel ahora es software de escritorio
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center">
              <ArrowRight className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-green-800">¡Siguiente paso!</h2>
              <p className="text-green-700 mt-2">
                <strong>Dime en qué tecnología específica está tu software de facturación</strong> para darte
                instrucciones exactas
              </p>
            </div>
            <Badge className="bg-green-500 text-white text-lg px-4 py-2">¡FÁCIL!</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
