"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Shield, Users, Globe, Smartphone, CheckCircle, Sparkles, Monitor, Apple } from "lucide-react"
import { LicenseValidator } from "./components/license-validator"

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleDownload = (platform: "windows" | "mac") => {
    const downloadUrls = {
      windows: "/downloads/ChapaMarket-Setup-1.0.0.exe",
      mac: "/downloads/ChapaMarket-1.0.0.dmg",
    }
    window.location.href = downloadUrls[platform]
  }

  const handleWhatsApp = () => {
    window.open("https://wa.me/5217731086826", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Fondo Lunar */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-slate-600/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-slate-500/15 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-slate-600/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-slate-500/20 rounded-full blur-xl"></div>
        {/* Cráteres */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-slate-700/30 rounded-full shadow-inner"></div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-slate-600/25 rounded-full shadow-inner"></div>
        <div className="absolute bottom-1/3 left-1/2 w-20 h-20 bg-slate-700/20 rounded-full shadow-inner"></div>
      </div>

      {/* Cursor Glow */}
      <motion.div
        className="fixed w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none z-0"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg flex items-center justify-center">
                <img src="/images/logo-createstudio.png" alt="Create Studio Digital" className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Create Studio Digital
                </h1>
                <p className="text-slate-400 text-sm">Software para tu Negocio</p>
              </div>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a href="#productos" className="text-slate-300 hover:text-orange-400 transition-colors">
                Productos
              </a>
              <a href="#validador" className="text-slate-300 hover:text-orange-400 transition-colors">
                Validar Licencia
              </a>
              <a href="#contacto" className="text-slate-300 hover:text-orange-400 transition-colors">
                Contacto
              </a>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 py-20 px-6"
      >
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Innovación Tecnológica 2025
          </Badge>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-200 via-orange-300 to-slate-200 bg-clip-text text-transparent">
              Software Profesional
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              para tu Empresa
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Desarrollamos soluciones tecnológicas innovadoras que transforman la manera en que tu negocio opera. Desde
            facturación electrónica hasta gestión empresarial.
          </p>
        </div>
      </motion.section>

      {/* Productos Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        id="productos"
        className="relative z-10 py-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-slate-200 mb-4">ChapaMarket Facturación Pro</h3>
            <p className="text-slate-400 text-lg">Sistema completo de facturación electrónica CFDI 4.0</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl hover:shadow-orange-500/20 transition-all duration-500">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Información del producto */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg flex items-center justify-center mr-4">
                        <img
                          src="/images/facturacion.pro.png"
                          alt="ChapaMarket Logo"
                          className="w-10 h-10"
                        />
                      </div>
                      <div>
                        <img src="/images/chapamarket-logo.png" alt="ChapaMarket" className="h-12 mb-2" />
                        <p className="text-orange-400 font-semibold">Facturación Pro</p>
                      </div>
                    </div>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                      Sistema completo de facturación electrónica CFDI 4.0 para México. Integración directa con el SAT,
                      gestión de clientes, productos y reportes avanzados.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-slate-300">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                        <span className="text-sm">CFDI 4.0</span>
                      </div>
                      <div className="flex items-center text-slate-300">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                        <span className="text-sm">Integración SAT</span>
                      </div>
                      <div className="flex items-center text-slate-300">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                        <span className="text-sm">Multi-usuario</span>
                      </div>
                      <div className="flex items-center text-slate-300">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                        <span className="text-sm">15 días gratis</span>
                      </div>
                    </div>

                    {/* Botones de descarga */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        onClick={() => handleDownload("windows")}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Monitor className="w-4 h-4 mr-2" />
                        Descargar Windows
                      </Button>

                      <Button
                        onClick={() => handleDownload("mac")}
                        className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Apple className="w-4 h-4 mr-2" />
                        Descargar Mac
                      </Button>
                    </div>
                  </div>

                  {/* Imagen del producto */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl p-6 backdrop-blur-sm border border-slate-600/30">
                      <img
                        src="/images/facturas.pro.png"
                        alt="ChapaMarket Facturación Pro"
                        className="w-full h-auto rounded-xl shadow-2xl"
                      />
                    </div>
                    <div className="absolute -top-4 -right-4">
                      <Badge className="bg-green-500/90 text-white shadow-lg backdrop-blur-sm">
                        <Star className="w-4 h-4 mr-1" />
                        15 días gratis
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Validador de Licencias */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        id="validador"
        className="relative z-10 py-20 px-6"
      >
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h3 className="text-4xl font-bold text-slate-200 mb-4">Validador de Licencias</h3>
          <p className="text-slate-400 text-lg">Verifica el estado de tu licencia ChapaMarket</p>
        </div>
        <LicenseValidator />
      </motion.section>

      {/* Sección del Desarrollador */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 py-20 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-slate-200 mb-4">Conoce al Desarrollador</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    ING. César Sánchez, fundador de Create Studio Digital. Con años de experiencia en desarrollo de
                    software empresarial y soluciones tecnológicas innovadoras.
                  </p>

                  <div className="space-y-3 text-slate-300 mb-6">
                    <p>
                      <strong className="text-orange-400">Especialidad:</strong> Sistemas de Facturación Electrónica
                    </p>
                    <p>
                      <strong className="text-orange-400">Experiencia:</strong> +10 años en desarrollo de software
                    </p>
                    <p>
                      <strong className="text-orange-400">Certificaciones:</strong> SAT, CFDI 4.0, Desarrollo Web
                    </p>
                  </div>

                  <Button
                    onClick={handleWhatsApp}
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Smartphone className="w-4 h-4 mr-2" />
                    Contactar Directamente
                  </Button>
                </div>

                <div className="text-center">
                  <div className="relative inline-block">
                    <img
                      src="/images/boss.png"
                      alt="ING. César Sánchez"
                      className="w-64 h-64 object-cover rounded-2xl shadow-2xl mx-auto"
                    />
                    <div className="absolute -bottom-4 -right-4">
                      <Badge className="bg-orange-500/90 text-white shadow-lg backdrop-blur-sm">
                        <Shield className="w-4 h-4 mr-1" />
                        Fundador
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 py-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Users, number: "500+", label: "Clientes Satisfechos" },
              { icon: Star, number: "4.9", label: "Calificación Promedio" },
              { icon: Shield, number: "99.9%", label: "Uptime Garantizado" },
              { icon: Globe, number: "24/7", label: "Soporte Técnico" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/30 shadow-xl text-center">
                  <CardContent className="p-6">
                    <stat.icon className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-slate-200 mb-2">{stat.number}</div>
                    <div className="text-slate-400">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        id="contacto"
        className="relative z-10 py-20 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
            <CardContent className="p-12">
              <h3 className="text-4xl font-bold text-slate-200 mb-6">¿Listo para Transformar tu Negocio?</h3>
              <p className="text-slate-300 text-lg mb-8">
                Contáctanos y descubre cómo nuestras soluciones pueden impulsar tu empresa
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="text-left">
                  <h4 className="text-xl font-semibold text-orange-400 mb-4">Información de Contacto</h4>
                  <div className="space-y-3 text-slate-300">
                    <p>
                      <strong>WhatsApp:</strong> 773-108-6826 o 763-109-3925
                    </p>
                    <p>
                      <strong>Email:</strong> kashtaman@createstudiodigital.com
                    </p>
                    <p>
                      <strong>Email Alt:</strong> vercelkash@gmail.com
                    </p>
                    <p>
                      <strong>Ubicación:</strong> Chapantongo, Hidalgo, México
                    </p>
                  </div>
                </div>

                <div className="text-left">
                  <h4 className="text-xl font-semibold text-blue-400 mb-4">Servicios</h4>
                  <div className="space-y-2 text-slate-300">
                    <p>• Desarrollo de Software Personalizado</p>
                    <p>• Sistemas de Facturación Electrónica</p>
                    <p>• Gestión Empresarial (ERP/CRM)</p>
                    <p>• Consultoría Tecnológica</p>
                    <p>• Soporte Técnico 24/7</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleWhatsApp}
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Contactar por WhatsApp
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-900/80 backdrop-blur-xl border-t border-slate-700/50 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg flex items-center justify-center mr-3">
              <img src="/images/logo-createstudio.png" alt="Create Studio Digital" className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Create Studio Digital
            </span>
          </div>

          <p className="text-slate-400 mb-4">© 2025 Create Studio Digital - ING. César Sánchez</p>
          <p className="text-slate-500 text-sm">Innovación tecnológica para el crecimiento de tu empresa</p>

          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <p className="text-slate-500 text-xs">
              🚀 Desarrollado con pasión por Create Studio Digital
              <br />✨ Diseño único y experiencia de usuario excepcional
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
