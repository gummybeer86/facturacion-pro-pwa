"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function AnimatedLogo() {
  const [isAnimating, setIsAnimating] = useState(false)

  // Efecto para reproducir sonido al cargar
  useEffect(() => {
    const audio = new Audio("/sounds/startup.mp3")
    audio.volume = 0.4
    audio.play().catch((e) => console.error("Error reproduciendo sonido:", e))
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.05, rotate: [0, -1, 1, -1, 0], transition: { duration: 0.5 } }}
        onClick={() => {
          setIsAnimating(true)
          // Reproducir sonido al hacer clic
          const audio = new Audio("/sounds/click.mp3")
          audio.volume = 0.3
          audio.play().catch((e) => console.error("Error reproduciendo sonido:", e))
          setTimeout(() => setIsAnimating(false), 1000)
        }}
        className="cursor-pointer relative"
      >
        <Image
          src="/images/chapamarket-logo.png"
          alt="ChapaMarket LicenceManager Pro"
          width={320}
          height={100}
          className="drop-shadow-xl"
        />
        {isAnimating && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.5, 0], opacity: [0.8, 0.5, 0] }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-blue-500 rounded-full filter blur-xl z-[-1]"
          />
        )}
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-4 text-sm text-gray-600 italic"
      >
        Haz clic en el logo para ver efectos
      </motion.p>
    </div>
  )
}
