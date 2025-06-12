"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Maximize2, Minimize2, X } from "lucide-react"

interface MacWindowProps {
  children: React.ReactNode
  title?: string
  defaultMaximized?: boolean
}

export function MacWindow({ children, title = "LicenceManager Pro", defaultMaximized = false }: MacWindowProps) {
  const [isMaximized, setIsMaximized] = useState(defaultMaximized)
  const [isDragging, setIsDragging] = useState(false)
  const [playSound, setPlaySound] = useState<string | null>(null)

  // Efecto para reproducir sonidos
  useEffect(() => {
    if (playSound) {
      const audio = new Audio(`/sounds/${playSound}.mp3`)
      audio.volume = 0.3
      audio.play().catch((e) => console.error("Error reproduciendo sonido:", e))
      setPlaySound(null)
    }
  }, [playSound])

  const handleClose = () => {
    setPlaySound("close")
    // Aquí podrías implementar lógica real de cierre
    alert("¿Seguro que deseas cerrar la aplicación?")
  }

  const handleMinimize = () => {
    setPlaySound("minimize")
    // Aquí podrías implementar lógica real de minimización
  }

  const handleMaximize = () => {
    setPlaySound("maximize")
    setIsMaximized(!isMaximized)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`bg-gray-100 rounded-lg overflow-hidden shadow-2xl border border-gray-300 flex flex-col ${
          isMaximized ? "w-full h-full" : "w-[1024px] h-[768px]"
        }`}
      >
        {/* Barra de título estilo macOS */}
        <div
          className={`h-8 bg-gradient-to-r from-gray-200 to-gray-300 flex items-center px-3 
                     ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          <div className="flex space-x-2 mr-4">
            <button
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group"
            >
              <X className="h-2 w-2 text-red-800 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={handleMinimize}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center group"
            >
              <Minimize2 className="h-2 w-2 text-yellow-800 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={handleMaximize}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center group"
            >
              {isMaximized ? (
                <Minimize2 className="h-2 w-2 text-green-800 opacity-0 group-hover:opacity-100" />
              ) : (
                <Maximize2 className="h-2 w-2 text-green-800 opacity-0 group-hover:opacity-100" />
              )}
            </button>
          </div>
          <div className="flex-1 text-center text-sm font-medium text-gray-700">{title}</div>
          <div className="w-16"></div> {/* Espacio para equilibrar el diseño */}
        </div>

        {/* Contenido de la aplicación */}
        <div className="flex-1 overflow-auto">{children}</div>
      </motion.div>
    </div>
  )
}
