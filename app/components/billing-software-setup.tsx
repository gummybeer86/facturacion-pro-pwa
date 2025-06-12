"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Receipt, Zap, CheckCircle, FileText, DollarSign, Users, Settings, Globe, Monitor, Copy } from "lucide-react"

export function BillingSoftwareSetup() {
  const [copied, setCopied] = useState<string | null>(null)
  const [softwareDetails, setSoftwareDetails] = useState({
    name: "",
    technology: "",
    currentIssues: "",
  })

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const billingElectronConfig = `{
  "name": "mi-software-facturacion",
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
    "dist-win": "npm run build && electron-builder --win --x64",
    "dist-mac": "npm run build && electron-builder --mac"
  },
  "build": {
    "appId": "com.createstudiodigital.facturacion",
    "productName": "Mi Software de Facturación Pro",
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
      "icon": "build/icon.ico",
      "requestedExecutionLevel": "asInvoker"
    },
    "mac": {
      "target": "dmg",
      "icon": "build/icon.icns",
      "category": "public.app-category.business"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true,
      "installerIcon": "build/icon.ico",
      "uninstallerIcon": "build/icon.ico",
      "installerHeaderIcon": "build/icon.ico",
      "displayLanguageSelector": true,
      "language": "3082"
    }
  }
}`

  const billingInstallerPage = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Descargar Mi Software de Facturación Pro</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Segoe UI', system-ui, sans-serif;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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
            max-width: 700px;
            width: 90%;
            text-align: center;
        }
        
        .logo {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #10b981, #059669);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            color: white;
            font-size: 32px;
        }
        
        h1 {
            color: #059669;
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
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 10px;
        }
        
        .download-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        
        .feature {
            background: #f0fdf4;
            padding: 20px;
            border-radius: 10px;
            text-align: left;
            border: 1px solid #bbf7d0;
        }
        
        .feature-icon {
            width: 40px;
            height: 40px;
            background: #10b981;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
            color: white;
            font-size: 20px;
        }
        
        .pricing {
            background: linear-gradient(135deg, #f0fdf4, #dcfce7);
            border: 2px solid #10b981;
            border-radius: 15px;
            padding: 30px;
            margin: 30px 0;
        }
        
        .price {
            font-size: 48px;
            font-weight: bold;
            color: #059669;
            margin-bottom: 10px;
        }
        
        .contact {
            background: #f0f9ff;
            border: 1px solid #bae6fd;
            border-radius: 10px;
            padding: 20px;
            margin-top: 30px;
            text-align: left;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🧾</div>
        
        <h1>Mi Software de Facturación Pro</h1>
        <p class="subtitle">Facturación Electrónica Profesional para México</p>
        
        <div class="download-buttons">
            <a href="#" class="download-btn" onclick="downloadWindows()">
                🪟 Descargar para Windows
            </a>
            <a href="#" class="download-btn" onclick="downloadMac()">
                🍎 Descargar para Mac
            </a>
        </div>
        
        <div class="features">
            <div class="feature">
                <div class="feature-icon">📄</div>
                <h3>Facturación CFDI 4.0</h3>
                <p>Cumple con todas las normas del SAT mexicano.</p>
            </div>
            <div class="feature">
                <div class="feature-icon">💰</div>
                <h3>Control de Inventario</h3>
                <p>Gestiona productos, precios y existencias.</p>
            </div>
            <div class="feature">
                <div class="feature-icon">👥</div>
                <h3>Base de Clientes</h3>
                <p>Administra tu cartera de clientes y proveedores.</p>
            </div>
            <div class="feature">
                <div class="feature-icon">📊</div>
                <h3>Reportes Fiscales</h3>
                <p>Reportes automáticos para contabilidad.</p>
            </div>
            <div class="feature">
                <div class="feature-icon">☁️</div>
                <h3>Respaldo en la Nube</h3>
                <p>Tus datos seguros y sincronizados.</p>
            </div>
            <div class="feature">
                <div class="feature-icon">🔒</div>
                <h3>Seguridad Total</h3>
                <p>Certificados digitales y encriptación.</p>
            </div>
        </div>
        
        <div class="pricing">
            <h2 style="color: #059669; margin-bottom: 20px;">💎 Precio Especial de Lanzamiento</h2>
            <div class="price">$2,999 MXN</div>
            <p style="color: #059669; font-size: 18px; margin-bottom: 15px;">
                <strong>Licencia Perpetua</strong> - Pago único, sin mensualidades
            </p>
            <ul style="text-align: left; color: #065f46; line-height: 1.8;">
                <li>✅ Facturación ilimitada</li>
                <li>✅ Soporte técnico incluido</li>
                <li>✅ Actualizaciones gratuitas por 1 año</li>
                <li>✅ Instalación y capacitación</li>
                <li>✅ Compatible con Windows y Mac</li>
            </ul>
        </div>
        
        <div class="contact">
            <h3 style="color: #0369a1; margin-bottom: 10px;">📞 Soporte y Ventas</h3>
            <p style="color: #0c4a6e; font-size: 14px; line-height: 1.5;">
                <strong>Create Studio Digital</strong><br>
                ING-Cesar Sanchez<br>
                📱 WhatsApp: 773-108-6826 o 763-109-3925<br>
                📧 kashtaman@createstudiodigital.com<br>
                📍 Chapantogo 2025 ChapaMarket Hgo.<br><br>
                <em>💬 Contáctanos para demo gratuita y descuentos por volumen</em>
            </p>
        </div>
    </div>

    <script>
        function downloadWindows() {
            window.location.href = 'https://github.com/tu-usuario/facturacion-releases/releases/latest/download/Facturacion-Setup.exe';
        }
        
        function downloadMac() {
            window.location.href = 'https://github.com/tu-usuario/facturacion-releases/releases/latest/download/Facturacion.dmg';
        }
    </script>
</body>
</html>`

  return (
    <div className="space-y-6">
      {/* Header principal */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-500">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center">
              <Receipt className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-green-800">🧾 Software de Facturación + 🔐 LicenceManager</h2>
              <p className="text-green-700 mt-2">
                <strong>¡COMBO PERFECTO!</strong> Te ayudo con ambos programas usando la misma solución
              </p>
            </div>
            <Badge className="bg-green-500 text-white text-lg px-4 py-2">💰 SÚPER RENTABLE</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Formulario para detalles */}
      <Card className="border-2 border-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2 text-blue-600" />
            Cuéntame de tu Software de Facturación
          </CardTitle>
          <CardDescription>Para darte la solución exacta que necesitas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="softwareName">Nombre del Software</Label>
              <Input
                id="softwareName"
                placeholder="Ej: FacturaPro, MiFacturador, etc."
                value={softwareDetails.name}
                onChange={(e) => setSoftwareDetails({ ...softwareDetails, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="technology">¿En qué está hecho?</Label>
              <Input
                id="technology"
                placeholder="Ej: React, Vue, HTML, C#, Java, etc."
                value={softwareDetails.technology}
                onChange={(e) => setSoftwareDetails({ ...softwareDetails, technology: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="issues">¿Qué problemas has tenido con instaladores?</Label>
            <Input
              id="issues"
              placeholder="Ej: No sé cómo crear .exe, instaladores muy complicados, etc."
              value={softwareDetails.currentIssues}
              onChange={(e) => setSoftwareDetails({ ...softwareDetails, currentIssues: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Plan de implementación */}
      <Tabs defaultValue="plan" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="plan">🎯 Plan de Acción</TabsTrigger>
          <TabsTrigger value="config">⚙️ Configuración</TabsTrigger>
          <TabsTrigger value="webpage">🌐 Página de Ventas</TabsTrigger>
        </TabsList>

        <TabsContent value="plan" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Programa 1: LicenceManager */}
            <Card className="border-2 border-blue-500 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <FileText className="h-5 w-5 mr-2" />
                  1️⃣ LicenceManager Pro
                </CardTitle>
                <CardDescription>Panel de administración (ya casi listo)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Código completo ✅</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Configuración Electron ✅</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Generar instaladores (30 min)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Página de descarga (15 min)</span>
                </div>
              </CardContent>
            </Card>

            {/* Programa 2: Software de Facturación */}
            <Card className="border-2 border-green-500 bg-green-50/50">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <Receipt className="h-5 w-5 mr-2" />
                  2️⃣ Software de Facturación
                </CardTitle>
                <CardDescription>Tu programa principal de ventas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Settings className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Adaptar a Electron (45 min)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Monitor className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Configurar instaladores (30 min)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Página de ventas profesional (30 min)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Estrategia de precios (15 min)</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-500">
            <CardHeader>
              <CardTitle className="text-purple-800">⏱️ Timeline Realista</CardTitle>
              <CardDescription>Ambos programas funcionando profesionalmente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Hoy: Configuramos LicenceManager</p>
                    <p className="text-sm text-gray-600">30 minutos - Instaladores .exe y .dmg listos</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Mañana: Adaptamos tu Software de Facturación</p>
                    <p className="text-sm text-gray-600">1-2 horas - Dependiendo de la tecnología actual</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Pasado mañana: Páginas de venta profesionales</p>
                    <p className="text-sm text-gray-600">30 minutos - Listas para recibir clientes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium text-green-800">Resultado: 2 productos profesionales vendibles</p>
                    <p className="text-sm text-green-600">Instaladores como Office, páginas como Adobe</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración para Software de Facturación</CardTitle>
              <CardDescription>package.json adaptado para tu programa de facturación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto max-h-[400px] overflow-y-auto">
                  <code>{billingElectronConfig}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200"
                  onClick={() => copyToClipboard(billingElectronConfig, "config")}
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
              <CardTitle>Página de Ventas para Software de Facturación</CardTitle>
              <CardDescription>Página profesional optimizada para ventas en México</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto max-h-[400px] overflow-y-auto">
                  <code>{billingInstallerPage}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200"
                  onClick={() => copyToClipboard(billingInstallerPage, "webpage")}
                >
                  {copied === "webpage" ? <CheckCircle className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  {copied === "webpage" ? "Copiado" : "Copiar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Potencial de ingresos */}
      <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">💰 Potencial de Ingresos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2">🧾 Software de Facturación</h4>
                <p className="text-2xl font-bold mb-2">$2,999 MXN c/u</p>
                <p className="text-sm">Solo 10 ventas/mes = $29,990 MXN</p>
                <p className="text-xs mt-1">Mercado: Todas las empresas en México</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2">🔐 LicenceManager Pro</h4>
                <p className="text-2xl font-bold mb-2">$1,999 MXN c/u</p>
                <p className="text-sm">Solo 5 ventas/mes = $9,995 MXN</p>
                <p className="text-xs mt-1">Mercado: Desarrolladores de software</p>
              </div>
            </div>
            <div className="mt-6 bg-white/20 rounded-lg p-4">
              <p className="text-xl font-bold">Total potencial: $39,985 MXN/mes</p>
              <p className="text-sm">Con instaladores profesionales que inspiran confianza</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
