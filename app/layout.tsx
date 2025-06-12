import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Create Studio Digital - Software para tu Negocio",
  description:
    "Desarrollamos soluciones tecnológicas innovadoras. ChapaMarket Facturación Pro - Sistema completo de facturación electrónica CFDI 4.0 para México.",
  keywords: "facturación electrónica, CFDI 4.0, software empresarial, SAT, México, Create Studio Digital",
  authors: [{ name: "ING. César Sánchez" }],
  viewport: "width=device-width, initial-scale=1",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
