"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy, CheckCircle, Terminal, Apple, ComputerIcon as Windows } from "lucide-react"

export function PackagingGuide() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const electronBuilderConfig = `{
  "appId": "com.createstudiodigital.licencemanagerpro",
  "productName": "LicenceManager Pro",
  "copyright": "Copyright © 2025 Create Studio Digital",
  "mac": {
    "category": "public.app-category.business",
    "icon": "build/icon.icns",
    "hardenedRuntime": true,
    "gatekeeperAssess": false,
    "entitlements": "build/entitlements.mac.plist",
    "entitlementsInherit": "build/entitlements.mac.plist",
    "target": ["dmg", "zip"]
  },
  "win": {
    "icon": "build/icon.ico",
    "target": [
      {
        "target": "nsis",
        "arch": ["x64"]
      }
    ]
  },
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true
  }
}`

  const macPackagingCommands = `# Instalar dependencias
npm install electron electron-builder --save-dev

# Crear iconos para macOS
# Necesitarás un archivo .icns para macOS
# Puedes convertir un PNG a ICNS con herramientas como iconutil

# Construir para macOS
npm run build
npx electron-builder --mac

# Los archivos generados estarán en la carpeta dist/`

  const windowsPackagingCommands = `# Instalar dependencias
npm install electron electron-builder --save-dev

# Crear iconos para Windows
# Necesitarás un archivo .ico para Windows
# Puedes convertir un PNG a ICO con herramientas online

# Construir para Windows
npm run build
npx electron-builder --win

# Los archivos generados estarán en la carpeta dist/`

  return (
    <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle>Guía de Empaquetado</CardTitle>
        <CardDescription>Instrucciones para empaquetar la aplicación para Windows y macOS</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="config" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="config">Configuración</TabsTrigger>
            <TabsTrigger value="mac">
              <Apple className="h-4 w-4 mr-2" />
              macOS
            </TabsTrigger>
            <TabsTrigger value="windows">
              <Windows className="h-4 w-4 mr-2" />
              Windows
            </TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="space-y-4">
            <div className="text-sm">
              <p className="mb-4">
                Para empaquetar la aplicación, usaremos Electron y electron-builder. Primero, crea un archivo
                <code className="px-1 py-0.5 bg-gray-100 rounded">electron-builder.json</code> en la raíz del proyecto
                con la siguiente configuración:
              </p>

              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{electronBuilderConfig}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200"
                  onClick={() => copyToClipboard(electronBuilderConfig, "config")}
                >
                  {copied === "config" ? <CheckCircle className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  {copied === "config" ? "Copiado" : "Copiar"}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mac" className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Terminal className="h-5 w-5 text-gray-700" />
              <h3 className="font-medium">Comandos para empaquetar en macOS</h3>
            </div>

            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                <code>{macPackagingCommands}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200"
                onClick={() => copyToClipboard(macPackagingCommands, "mac")}
              >
                {copied === "mac" ? <CheckCircle className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied === "mac" ? "Copiado" : "Copiar"}
              </Button>
            </div>

            <div className="bg-blue-50/80 backdrop-blur-sm p-4 rounded-lg border border-blue-100 mt-4">
              <h4 className="font-medium">Notas para macOS</h4>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                <li>Para distribución en la App Store, necesitarás una cuenta de desarrollador de Apple.</li>
                <li>
                  Para firmar la aplicación, usa{" "}
                  <code className="px-1 py-0.5 bg-blue-100 rounded">electron-notarize</code> y{" "}
                  <code className="px-1 py-0.5 bg-blue-100 rounded">electron-osx-sign</code>.
                </li>
                <li>
                  La aplicación se abrirá en una ventana de tamaño personalizado como se configuró en el componente
                  MacWindow.
                </li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="windows" className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Terminal className="h-5 w-5 text-gray-700" />
              <h3 className="font-medium">Comandos para empaquetar en Windows</h3>
            </div>

            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                <code>{windowsPackagingCommands}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200"
                onClick={() => copyToClipboard(windowsPackagingCommands, "windows")}
              >
                {copied === "windows" ? <CheckCircle className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied === "windows" ? "Copiado" : "Copiar"}
              </Button>
            </div>

            <div className="bg-blue-50/80 backdrop-blur-sm p-4 rounded-lg border border-blue-100 mt-4">
              <h4 className="font-medium">Notas para Windows</h4>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                <li>
                  El instalador NSIS permite a los usuarios elegir la ubicación de instalación y crear accesos directos.
                </li>
                <li>
                  Para firmar la aplicación en Windows, necesitarás un certificado de firma de código y usar{" "}
                  <code className="px-1 py-0.5 bg-blue-100 rounded">--win</code> con la opción{" "}
                  <code className="px-1 py-0.5 bg-blue-100 rounded">certificateFile</code>.
                </li>
                <li>
                  La aplicación se abrirá en una ventana de tamaño personalizado como se configuró en el componente
                  MacWindow.
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
