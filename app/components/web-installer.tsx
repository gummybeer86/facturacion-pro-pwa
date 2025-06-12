"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Download, Globe, Monitor, Shield, Copy, CheckCircle } from "lucide-react"

export function WebInstaller() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const clickOnceManifest = `<?xml version="1.0" encoding="utf-8"?>
<asmv1:assembly xsi:schemaLocation="urn:schemas-microsoft-com:asm.v1 assembly.adaptive.xsd" 
                manifestVersion="1.0" 
                xmlns:asmv1="urn:schemas-microsoft-com:asm.v1" 
                xmlns="urn:schemas-microsoft-com:asm.v2" 
                xmlns:asmv2="urn:schemas-microsoft-com:asm.v2" 
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                xmlns:co.v1="urn:schemas-microsoft-com:clickonce.v1" 
                xmlns:asmv3="urn:schemas-microsoft-com:asm.v3" 
                xmlns:dsig="http://www.w3.org/2000/09/xmldsig#" 
                xmlns:co.v2="urn:schemas-microsoft-com:clickonce.v2">
  <asmv1:assemblyIdentity name="ChapaMarketLicenceManager.exe" 
                          version="1.0.0.0" 
                          publicKeyToken="0000000000000000" 
                          language="neutral" 
                          processorArchitecture="msil" 
                          type="win32" />
  <description asmv2:iconFile="icon.ico">
    <asmv2:description>ChapaMarket LicenceManager Pro - Plataforma de Gestión de Licencias</asmv2:description>
    <asmv2:product>ChapaMarket LicenceManager Pro</asmv2:product>
    <asmv2:publisher>Create Studio Digital - ING-Cesar Sanchez</asmv2:publisher>
    <asmv2:supportUrl>https://createstudiodigital.com/support</asmv2:supportUrl>
  </description>
  <deployment install="true" mapFileExtensions="true" />
  <compatibleFrameworks xmlns="urn:schemas-microsoft-com:clickonce.v2">
    <framework targetVersion="4.7.2" profile="Full" supportedRuntime="4.0.30319" />
  </compatibleFrameworks>
  <dependency>
    <dependentOS>
      <osVersionInfo>
        <os majorVersion="6" minorVersion="1" buildNumber="7601" servicePackMajor="1" />
      </osVersionInfo>
    </dependentOS>
  </dependency>
  <dependency>
    <dependentAssembly dependencyType="preRequisite" allowDelayedBinding="true">
      <assemblyIdentity name="Microsoft.Windows.CommonLanguageRuntime" version="4.0.30319.0" />
    </dependentAssembly>
  </dependency>
  <file name="ChapaMarketLicenceManager.exe" size="1024000">
    <hash>
      <dsig:Transforms>
        <dsig:Transform Algorithm="urn:schemas-microsoft-com:HashTransforms.Identity" />
      </dsig:Transforms>
      <dsig:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha256" />
      <dsig:DigestValue>HASH_PLACEHOLDER</dsig:DigestValue>
    </hash>
  </file>
</asmv1:assembly>`

  const webInstallerHTML = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Instalar ChapaMarket LicenceManager Pro</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
        }
        
        .installer-container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            padding: 40px;
            max-width: 500px;
            width: 90%;
            text-align: center;
        }
        
        .logo {
            width: 200px;
            height: auto;
            margin-bottom: 20px;
        }
        
        h1 {
            color: #2563eb;
            margin-bottom: 10px;
            font-size: 28px;
        }
        
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 16px;
        }
        
        .install-btn {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: white;
            border: none;
            padding: 15px 40px;
            border-radius: 50px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
            margin-bottom: 20px;
        }
        
        .install-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        }
        
        .features {
            text-align: left;
            margin-top: 30px;
        }
        
        .feature {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            color: #555;
        }
        
        .feature-icon {
            width: 20px;
            height: 20px;
            background: #10b981;
            border-radius: 50%;
            margin-right: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;
        }
        
        .system-requirements {
            background: #f8fafc;
            border-radius: 10px;
            padding: 20px;
            margin-top: 30px;
            text-align: left;
        }
        
        .req-title {
            font-weight: 600;
            margin-bottom: 10px;
            color: #374151;
        }
        
        .req-list {
            font-size: 14px;
            color: #6b7280;
            line-height: 1.6;
        }
        
        .contact-info {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            font-size: 12px;
            color: #6b7280;
        }
    </style>
</head>
<body>
    <div class="installer-container">
        <img src="https://tu-dominio.com/images/chapamarket-logo.png" alt="ChapaMarket Logo" class="logo">
        
        <h1>LicenceManager Pro</h1>
        <p class="subtitle">Plataforma de Gestión de Licencias y Clientes</p>
        
        <button class="install-btn" onclick="installApp()">
            📥 Instalar Aplicación
        </button>
        
        <div class="features">
            <div class="feature">
                <div class="feature-icon">✓</div>
                <span>Gestión completa de licencias de software</span>
            </div>
            <div class="feature">
                <div class="feature-icon">✓</div>
                <span>Base de datos de clientes integrada</span>
            </div>
            <div class="feature">
                <div class="feature-icon">✓</div>
                <span>Reportes y analytics en tiempo real</span>
            </div>
            <div class="feature">
                <div class="feature-icon">✓</div>
                <span>Centro de comunicación automatizado</span>
            </div>
            <div class="feature">
                <div class="feature-icon">✓</div>
                <span>Generador de licencias Python incluido</span>
            </div>
        </div>
        
        <div class="system-requirements">
            <div class="req-title">Requisitos del Sistema:</div>
            <div class="req-list">
                • Windows 10 o superior<br>
                • .NET Framework 4.7.2 o superior<br>
                • 2 GB de RAM mínimo<br>
                • 500 MB de espacio en disco<br>
                • Conexión a Internet para activación
            </div>
        </div>
        
        <div class="contact-info">
            <strong>Create Studio Digital</strong><br>
            ING-Cesar Sanchez<br>
            WhatsApp: 773-108-6826 o 763-109-3925<br>
            Email: kashtaman@createstudiodigital.com<br>
            Chapantogo 2025 ChapaMarket Hgo.
        </div>
    </div>

    <script>
        function installApp() {
            // Detectar el navegador y sistema operativo
            const userAgent = navigator.userAgent;
            const isWindows = userAgent.indexOf('Windows') !== -1;
            const isChrome = userAgent.indexOf('Chrome') !== -1;
            const isEdge = userAgent.indexOf('Edg') !== -1;
            
            if (isWindows && (isChrome || isEdge)) {
                // Intentar instalar vía ClickOnce
                try {
                    window.location.href = 'ChapaMarketLicenceManager.application';
                } catch (e) {
                    // Fallback a descarga directa
                    downloadDirectly();
                }
            } else {
                // Para otros sistemas, mostrar opciones alternativas
                showAlternatives();
            }
        }
        
        function downloadDirectly() {
            // Crear enlace de descarga directa
            const link = document.createElement('a');
            link.href = 'ChapaMarketLicenceManager-Setup.exe';
            link.download = 'ChapaMarketLicenceManager-Setup.exe';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Mostrar instrucciones
            alert('Descarga iniciada. Ejecute el archivo descargado para instalar la aplicación.');
        }
        
        function showAlternatives() {
            alert('Para su sistema operativo, recomendamos usar la versión web en: https://tu-dominio.com/app');
        }
        
        // Verificar si ClickOnce está disponible
        window.onload = function() {
            if (typeof window.external === 'undefined' || 
                typeof window.external.AddFavorite === 'undefined') {
                console.log('ClickOnce no disponible, usando descarga directa');
            }
        };
    </script>
</body>
</html>`

  const electronInstallerConfig = `const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const isDev = require('electron-is-dev');

// Configuración del auto-updater
autoUpdater.checkForUpdatesAndNotify();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    icon: path.join(__dirname, 'assets/icon.ico'), // Ícono de la aplicación
    show: false, // No mostrar hasta que esté listo
    titleBarStyle: 'default',
    autoHideMenuBar: true // Ocultar menú por defecto
  });

  // Cargar la aplicación
  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : \`file://\${path.join(__dirname, '../build/index.html')}\`;
    
  mainWindow.loadURL(startUrl);

  // Mostrar cuando esté listo
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Verificar actualizaciones
    if (!isDev) {
      autoUpdater.checkForUpdatesAndNotify();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Configuración de actualizaciones automáticas
autoUpdater.on('checking-for-update', () => {
  console.log('Verificando actualizaciones...');
});

autoUpdater.on('update-available', (info) => {
  console.log('Actualización disponible.');
});

autoUpdater.on('update-not-available', (info) => {
  console.log('No hay actualizaciones disponibles.');
});

autoUpdater.on('error', (err) => {
  console.log('Error en auto-updater: ', err);
});

autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Velocidad de descarga: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Descargado ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  console.log(log_message);
});

autoUpdater.on('update-downloaded', (info) => {
  console.log('Actualización descargada');
  autoUpdater.quitAndInstall();
});`

  return (
    <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="h-5 w-5 mr-2 text-blue-600" />
          Instalador Web Estilo Office
        </CardTitle>
        <CardDescription>
          Crea un instalador web que descarga e instala tu aplicación como software nativo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="clickonce">ClickOnce</TabsTrigger>
            <TabsTrigger value="webpage">Página Web</TabsTrigger>
            <TabsTrigger value="electron">Electron Setup</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-blue-200 bg-blue-50/50">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Monitor className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">ClickOnce (.NET)</h3>
                      <p className="text-sm text-gray-600">Instalador automático de Microsoft</p>
                    </div>
                  </div>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Instalación automática
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Actualizaciones automáticas
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Integración con Windows
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-purple-200 bg-purple-50/50">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Download className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="font-semibold">Electron + Auto-Updater</h3>
                      <p className="text-sm text-gray-600">Aplicación nativa multiplataforma</p>
                    </div>
                  </div>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Windows, Mac, Linux
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Actualizaciones automáticas
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Instalador MSI/DMG
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border">
              <h3 className="font-semibold mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-600" />
                Proceso de Instalación Web
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                    1
                  </div>
                  <p className="text-sm">Usuario visita tu página</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                    2
                  </div>
                  <p className="text-sm">Clic en "Instalar"</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                    3
                  </div>
                  <p className="text-sm">Descarga automática</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                    4
                  </div>
                  <p className="text-sm">App instalada y lista</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="clickonce" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Manifiesto ClickOnce</h3>
                <p className="text-sm text-gray-500">Archivo .application para instalación automática</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Microsoft .NET</Badge>
            </div>

            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto max-h-[400px] overflow-y-auto">
                <code>{clickOnceManifest}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200"
                onClick={() => copyToClipboard(clickOnceManifest, "clickonce")}
              >
                {copied === "clickonce" ? <CheckCircle className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied === "clickonce" ? "Copiado" : "Copiar"}
              </Button>
            </div>

            <div className="bg-blue-50/80 backdrop-blur-sm p-4 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-800 mb-2">Pasos para ClickOnce:</h4>
              <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                <li>Crea una aplicación .NET Windows Forms o WPF</li>
                <li>Configura el manifiesto ClickOnce</li>
                <li>Publica en un servidor web</li>
                <li>Los usuarios instalan desde el navegador</li>
                <li>Actualizaciones automáticas desde el servidor</li>
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="webpage" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Página de Instalación</h3>
                <p className="text-sm text-gray-500">HTML completo para tu instalador web</p>
              </div>
              <Badge className="bg-green-100 text-green-800">HTML + JavaScript</Badge>
            </div>

            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto max-h-[400px] overflow-y-auto">
                <code>{webInstallerHTML}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200"
                onClick={() => copyToClipboard(webInstallerHTML, "webpage")}
              >
                {copied === "webpage" ? <CheckCircle className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied === "webpage" ? "Copiado" : "Copiar"}
              </Button>
            </div>

            <div className="bg-green-50/80 backdrop-blur-sm p-4 rounded-lg border border-green-100">
              <h4 className="font-medium text-green-800 mb-2">Características de la página:</h4>
              <ul className="text-sm text-green-700 space-y-1 list-disc list-inside">
                <li>Diseño profesional estilo Office/Adobe</li>
                <li>Detección automática del sistema operativo</li>
                <li>Descarga directa del instalador</li>
                <li>Lista de características y requisitos</li>
                <li>Información de contacto integrada</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="electron" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Electron con Auto-Updater</h3>
                <p className="text-sm text-gray-500">Configuración para actualizaciones automáticas</p>
              </div>
              <Badge className="bg-purple-100 text-purple-800">Electron</Badge>
            </div>

            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto max-h-[400px] overflow-y-auto">
                <code>{electronInstallerConfig}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200"
                onClick={() => copyToClipboard(electronInstallerConfig, "electron")}
              >
                {copied === "electron" ? <CheckCircle className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied === "electron" ? "Copiado" : "Copiar"}
              </Button>
            </div>

            <div className="bg-purple-50/80 backdrop-blur-sm p-4 rounded-lg border border-purple-100">
              <h4 className="font-medium text-purple-800 mb-2">Comandos para generar instaladores:</h4>
              <div className="text-sm text-purple-700 space-y-2">
                <div className="bg-purple-100 p-2 rounded font-mono">
                  npm install electron-builder electron-updater --save-dev
                </div>
                <div className="bg-purple-100 p-2 rounded font-mono">npx electron-builder --win --publish=never</div>
                <div className="bg-purple-100 p-2 rounded font-mono">npx electron-builder --mac --publish=never</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
