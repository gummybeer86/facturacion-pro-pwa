"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ImageIcon, Smartphone, Monitor } from "lucide-react"

export function IconGenerator() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

  const generateIcon = (size: number) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = size
    canvas.height = size

    // Crear un fondo con el color de tu marca
    ctx.fillStyle = "#2563eb" // Azul de tu tema
    ctx.fillRect(0, 0, size, size)

    // Agregar el texto "CM" (ChapaMarket) como placeholder
    ctx.fillStyle = "#ffffff"
    ctx.font = `bold ${size * 0.4}px Arial`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("CM", size / 2, size / 2)

    // Agregar un borde redondeado
    ctx.globalCompositeOperation = "destination-in"
    ctx.beginPath()
    ctx.roundRect(0, 0, size, size, size * 0.1)
    ctx.fill()

    return canvas.toDataURL("image/png")
  }

  const downloadIcon = (size: number) => {
    const dataUrl = generateIcon(size)
    const link = document.createElement("a")
    link.download = `icon-${size}x${size}.png`
    link.href = dataUrl
    link.click()
  }

  const downloadAllIcons = () => {
    const sizes = [72, 96, 128, 144, 152, 192, 384, 512]
    sizes.forEach((size) => {
      setTimeout(() => downloadIcon(size), size * 10) // Delay para evitar problemas
    })
  }

  const generateFavicon = () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 32
    canvas.height = 32

    // Fondo azul
    ctx.fillStyle = "#2563eb"
    ctx.fillRect(0, 0, 32, 32)

    // Texto "C" para favicon
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 20px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("C", 16, 16)

    const dataUrl = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = "favicon.ico"
    link.href = dataUrl
    link.click()
  }

  return (
    <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ImageIcon className="h-5 w-5 mr-2 text-blue-600" />
          Generador de Iconos PWA
        </CardTitle>
        <CardDescription>Genera todos los iconos necesarios para tu PWA desde tu logo de ChapaMarket</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Vista previa de iconos */}
        <div className="grid grid-cols-4 gap-4">
          {[72, 96, 128, 144, 152, 192, 384, 512].map((size) => (
            <div key={size} className="text-center">
              <div
                className="mx-auto mb-2 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold"
                style={{
                  width: Math.min(size / 4, 64),
                  height: Math.min(size / 4, 64),
                  fontSize: Math.min(size / 10, 24),
                }}
              >
                CM
              </div>
              <p className="text-xs text-gray-500">
                {size}x{size}
              </p>
              <Button variant="outline" size="sm" onClick={() => downloadIcon(size)} className="mt-1">
                <Download className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>

        {/* Botones de descarga */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={downloadAllIcons} className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Descargar Todos los Iconos
          </Button>
          <Button variant="outline" onClick={generateFavicon}>
            <ImageIcon className="h-4 w-4 mr-2" />
            Generar Favicon
          </Button>
        </div>

        {/* Instrucciones */}
        <div className="bg-blue-50/80 backdrop-blur-sm p-4 rounded-lg border border-blue-100">
          <h4 className="font-medium text-blue-800 mb-2">Instrucciones:</h4>
          <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
            <li>Descarga todos los iconos usando el botón de arriba</li>
            <li>
              Crea una carpeta <code className="bg-blue-100 px-1 rounded">public/icons/</code> en tu proyecto
            </li>
            <li>Coloca todos los archivos PNG descargados en esa carpeta</li>
            <li>
              El favicon.ico va en la carpeta <code className="bg-blue-100 px-1 rounded">public/</code>
            </li>
            <li>¡Tu PWA estará lista para instalar!</li>
          </ol>
        </div>

        {/* Información adicional */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50/80 backdrop-blur-sm rounded-lg">
            <Monitor className="h-8 w-8 text-blue-600" />
            <div>
              <p className="font-medium">Escritorio</p>
              <p className="text-sm text-gray-600">Chrome, Edge, Firefox</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50/80 backdrop-blur-sm rounded-lg">
            <Smartphone className="h-8 w-8 text-blue-600" />
            <div>
              <p className="font-medium">Móvil</p>
              <p className="text-sm text-gray-600">iOS Safari, Android Chrome</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
