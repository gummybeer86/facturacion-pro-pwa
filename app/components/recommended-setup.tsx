"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Monitor, CheckCircle, Star, Zap, Shield, Users, Copy } from "lucide-react"

export function RecommendedSetup() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const packageJsonConfig = `{
  "name": "chapamarket-licencemanager-pro",
  "version": "1.0.0",
  "main": "electron.js",
  "homepage": "./",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "electron": "electron .",
    "electron-dev": "ELECTRON_START_URL=http://localhost:3000 electron .",
    "build-electron": "npm run build && electron-builder",
    "dist": "npm run build && electron-builder --publish=never",
    "dist-win": "npm run build && electron-builder --win --x64",
    "dist-mac": "npm run build && electron-builder --mac",
    "publish": "npm run build && electron-builder --publish=always"
  },
  "build": {
    "appId": "com.createstudiodigital.chapamarket",
    "productName": "ChapaMarket LicenceManager Pro",
    "copyright": "© 2025 Create Studio Digital - ING-Cesar Sanchez",
    "directories": {
      "output": "dist"
    },
    "files": [
      "out/**/*",
      "electron.js",
      "package.json"
    ],
    "win": {
      "target": "nsis",
      "icon": "build/icon.ico"
    },
    "mac": {
      "target": "dmg",
      "icon": "build/icon.icns"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true,
      "installerIcon": "build/icon.ico",
      "uninstallerIcon": "build/icon.ico"
    },
    "publish": {
      "provider": "github",
      "owner": "tu-usuario",
      "repo": "chapamarket-releases"
    }
  }
}`

  const installerPageCode = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Descargar ChapaMarket LicenceManager Pro</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Segoe UI', system-ui, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            padding: 40px;
            max-width: 600px;
            width: 90%;
            text-align: center;
        }
        
        .logo {
            width: 250px;
            margin-bottom: 20px;
        }
        
        h1 {
            color: #2563eb;
            font-size: 32px;
            margin-bottom: 10px;
        }
        
        .subtitle {
            color: #666;
            font-size: 18px;
            margin-bottom: 30px;
        }
        
        .download-buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }
        
        .download-btn {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 10px;
        }
        
        .download-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        }
        
        .download-btn.mac {
            background: linear-gradient(135deg, #6b7280, #4b5563);
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        
        .feature {
            background: #f8fafc;
            padding: 20px;
            border-radius: 10px;
            text-align: left;
        }
        
        .feature-icon {
            width: 40px;
            height: 40px;
            background: #2563eb;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
            color: white;
            font-size: 20px;
        }
        
        .contact {
            background: #f0f9ff;
            border: 1px solid #bae6fd;
            border-radius: 10px;
            padding: 20px;
            margin-top: 30px;
            text-align: left;
        }
        
        .contact h3 {
            color: #0369a1;
            margin-bottom: 10px;
        }
        
        .contact p {
            color: #0c4a6e;
            font-size: 14px;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://tu-dominio.com/images/chapamarket-logo.png" alt="ChapaMarket" class="logo">
        
        <h1>LicenceManager Pro</h1>
        <p class="subtitle">Plataforma Profesional de Gestión de Licencias</p>
        
        <div class="download-buttons">
            <a href="#" class="download-btn" onclick="downloadWindows()">
                🪟 Descargar para Windows
            </a>
            <a href="#" class="download-btn mac" onclick="downloadMac()">
                🍎 Descargar para Mac
            </a>
        </div>
        
        <div class="features">
            <div class="feature">
                <div class="feature-icon">🔐</div>
                <h3>Gestión de Licencias</h3>
                <p>Genera, administra y verifica licencias de software con total seguridad.</p>
            </div>
            <div class="feature">
                <div class="feature-icon">👥</div>
                <h3>Base de Clientes</h3>
                <p>Administra tu cartera de clientes con historial completo de compras.</p>
            </div>
            <div class="feature">
                <div class="feature-icon">📊</div>
                <h3>Reportes Avanzados</h3>
                <p>Analytics en tiempo real para optimizar tu negocio de software.</p>
            </div>
            <div class="feature">
                <div class="feature-icon">📧</div>
                <h3>Comunicación</h3>
                <p>Centro de comunicación automatizado con plantillas personalizables.</p>
            </div>
        </div>
        
        <div class="contact">
            <h3>Soporte y Contacto</h3>
            <p>
                <strong>Create Studio Digital</strong><br>
                ING-Cesar Sanchez<br>
                📱 WhatsApp: 773-108-6826 o 763-109-3925<br>
                📧 kashtaman@createstudiodigital.com<br>
                📍 Chapantogo 2025 ChapaMarket Hgo.
            </p>
        </div>
    </div>

    <script>
        function detectOS() {
            const userAgent = navigator.userAgent;
            if (userAgent.indexOf('Win') !== -1) return 'Windows';
            if (userAgent.indexOf('Mac') !== -1) return 'Mac';
            if (userAgent.indexOf('Linux') !== -1) return 'Linux';
            return 'Unknown';
        }
        
        function downloadWindows() {
            // URL de tu instalador de Windows
            window.location.href = 'https://github.com/tu-usuario/chapamarket-releases/releases/latest/download/ChapaMarket-Setup.exe';
        }
        
        function downloadMac() {
            // URL de tu instalador de Mac
            window.location.href = 'https://github.com/tu-usuario/chapamarket-releases/releases/latest/download/ChapaMarket.dmg';
        }
        
        // Auto-detectar y resaltar el botón correcto
        window.onload = function() {
            const os = detectOS();
            const buttons = document.querySelectorAll('.download-btn');
            
            if (os === 'Windows') {
                buttons[0].style.background = 'linear-gradient(135deg, #059669, #047857)';
                buttons[0].innerHTML = '🪟 Descargar para Windows (Recomendado)';
            } else if (os === 'Mac') {
                buttons[1].style.background = 'linear-gradient(135deg, #059669, #047857)';
                buttons[1].innerHTML = '🍎 Descargar para Mac (Recomendado)';
            }
        };
    </script>
</body>
</html>`

  const deploymentSteps = `# 🚀 PASOS PARA IMPLEMENTAR TU INSTALADOR PROFESIONAL

## 1️⃣ Preparar tu proyecto actual
npm install electron electron-builder --save-dev
npm install electron-updater --save

## 2️⃣ Configurar package.json
# (Usar la configuración de arriba)

## 3️⃣ Crear iconos
# Necesitas:
# - build/icon.ico (Windows)
# - build/icon.icns (Mac)
# - build/icon.png (Linux)

## 4️⃣ Generar instaladores
npm run dist-win    # Genera .exe para Windows
npm run dist-mac    # Genera .dmg para Mac

## 5️⃣ Subir a GitHub Releases
# Crea un repositorio "chapamarket-releases"
# Sube los instaladores como releases

## 6️⃣ Crear página de descarga
# Usa el HTML de arriba
# Sube a tu dominio

## 7️⃣ ¡Listo! 🎉
# Tus clientes pueden instalar como Office`

  return (
    <div className="space-y-6">
      {/* Header con recomendación */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center">
              <Star className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-green-800">¡RECOMENDACIÓN PERFECTA PARA TI!</h2>
              <p className="text-green-700 mt-2">
                <strong>Opción Híbrida: Electron + Página Web</strong> - La mejor combinación de profesionalismo y
                facilidad
              </p>
            </div>
            <Badge className="bg-green-500 text-white text-lg px-4 py-2">⭐ RECOMENDADO</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Ventajas específicas para su caso */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-blue-200 bg-blue-50/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-blue-800 mb-2">Tu Código Funciona YA</h3>
              <p className="text-sm text-blue-700">
                No necesitas reescribir nada. Tu aplicación Next.js actual se convierte directamente en app nativa.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 bg-purple-50/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold text-purple-800 mb-2">Profesional como Office</h3>
              <p className="text-sm text-purple-700">
                Instaladores .exe y .dmg nativos. Tus clientes instalan como cualquier software profesional.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-200 bg-orange-50/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold text-orange-800 mb-2">Perfecto para tu Negocio</h3>
              <p className="text-sm text-orange-700">
                Clientes en México y el mundo pueden instalar fácilmente. Actualizaciones automáticas incluidas.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="config" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="config">1. Configuración</TabsTrigger>
          <TabsTrigger value="webpage">2. Página de Descarga</TabsTrigger>
          <TabsTrigger value="deploy">3. Implementación</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de package.json</CardTitle>
              <CardDescription>
                Esta configuración convierte tu proyecto actual en instaladores profesionales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto max-h-[400px] overflow-y-auto">
                  <code>{packageJsonConfig}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200"
                  onClick={() => copyToClipboard(packageJsonConfig, "config")}
                >
                  {copied === "config" ? <CheckCircle className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  {copied === "config" ? "Copiado" : "Copiar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webpage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Página de Descarga Profesional</CardTitle>
              <CardDescription>HTML completo para tu página de instalación estilo Office/Adobe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto max-h-[400px] overflow-y-auto">
                  <code>{installerPageCode}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200"
                  onClick={() => copyToClipboard(installerPageCode, "webpage")}
                >
                  {copied === "webpage" ? <CheckCircle className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  {copied === "webpage" ? "Copiado" : "Copiar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deploy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pasos de Implementación</CardTitle>
              <CardDescription>Guía paso a paso para tener tu instalador funcionando</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto max-h-[400px] overflow-y-auto">
                  <code>{deploymentSteps}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200"
                  onClick={() => copyToClipboard(deploymentSteps, "deploy")}
                >
                  {copied === "deploy" ? <CheckCircle className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  {copied === "deploy" ? "Copiado" : "Copiar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Resultado final */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">🎯 Resultado Final</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Monitor className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Para tus Clientes</h4>
                <p className="text-sm">
                  Van a tu página → Clic "Descargar" → Instalación automática → App funcionando como Office
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Globe className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Para ti</h4>
                <p className="text-sm">
                  Subes nuevas versiones → Clientes se actualizan automáticamente → Sin complicaciones
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
