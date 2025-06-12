"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Calendar, DollarSign, Users, Key, Target, TrendingUp } from "lucide-react"

// Datos simulados para reportes
const salesData = [
  { month: "Ene", licenses: 45, revenue: 12500, clients: 12 },
  { month: "Feb", licenses: 52, revenue: 14200, clients: 15 },
  { month: "Mar", licenses: 38, revenue: 10800, clients: 8 },
  { month: "Abr", licenses: 61, revenue: 16900, clients: 18 },
  { month: "May", licenses: 55, revenue: 15200, clients: 14 },
  { month: "Jun", licenses: 67, revenue: 18500, clients: 21 },
]

const topClients = [
  { name: "Enterprise Corp", licenses: 10, revenue: 45000, growth: "+15%" },
  { name: "TechCorp Inc.", licenses: 5, revenue: 15000, growth: "+8%" },
  { name: "StartupXYZ", licenses: 2, revenue: 3500, growth: "+25%" },
  { name: "DevStudio LLC", licenses: 1, revenue: 1200, growth: "New" },
]

const licenseTypes = [
  { type: "Profesional", count: 156, percentage: 45, revenue: 78000 },
  { type: "Estándar", count: 89, percentage: 26, revenue: 31500 },
  { type: "Enterprise", count: 67, percentage: 19, revenue: 134000 },
  { type: "Básico", count: 34, percentage: 10, revenue: 8500 },
]

const activationStats = [
  { product: "Software Pro", activations: 234, success: 98.5, avgTime: "2.3 min" },
  { product: "Software Standard", activations: 156, success: 97.8, avgTime: "1.8 min" },
  { product: "Software Enterprise", activations: 89, success: 99.1, avgTime: "3.1 min" },
  { product: "Software Básico", activations: 67, success: 96.2, avgTime: "1.5 min" },
]

export function ReportsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reportes y Análisis</h2>
          <p className="text-gray-600">Métricas y estadísticas de tu negocio</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Último mes</SelectItem>
              <SelectItem value="3months">Últimos 3 meses</SelectItem>
              <SelectItem value="6months">Últimos 6 meses</SelectItem>
              <SelectItem value="1year">Último año</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-md shadow-lg border border-white/20">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="sales">Ventas</TabsTrigger>
          <TabsTrigger value="clients">Clientes</TabsTrigger>
          <TabsTrigger value="licenses">Licencias</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPIs principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Ingresos Totales</p>
                    <div className="text-2xl font-bold">$252,000</div>
                    <p className="text-xs text-green-600">
                      <TrendingUp className="w-3 h-3 inline mr-1" />
                      +12.5% vs período anterior
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-green-100/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Licencias Vendidas</p>
                    <div className="text-2xl font-bold">318</div>
                    <p className="text-xs text-green-600">
                      <TrendingUp className="w-3 h-3 inline mr-1" />
                      +8.2% vs período anterior
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Key className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nuevos Clientes</p>
                    <div className="text-2xl font-bold">47</div>
                    <p className="text-xs text-green-600">
                      <TrendingUp className="w-3 h-3 inline mr-1" />
                      +15.3% vs período anterior
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tasa de Conversión</p>
                    <div className="text-2xl font-bold">24.8%</div>
                    <p className="text-xs text-green-600">
                      <TrendingUp className="w-3 h-3 inline mr-1" />
                      +2.1% vs período anterior
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-orange-100/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de tendencias */}
          <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle>Tendencia de Ventas</CardTitle>
              <CardDescription>Licencias vendidas e ingresos por mes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium">{data.month}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(data.licenses / 70) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{data.licenses} licencias</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${data.revenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{data.clients} clientes</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle>Ingresos por Mes</CardTitle>
                <CardDescription>Evolución de ingresos en los últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 text-sm font-medium">{data.month}</div>
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-green-600 h-3 rounded-full"
                              style={{ width: `${(data.revenue / 20000) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right font-medium">${data.revenue.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle>Top Productos</CardTitle>
                <CardDescription>Productos más vendidos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {licenseTypes.map((type, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                        <span className="font-medium">{type.type}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{type.count} licencias</div>
                        <div className="text-sm text-gray-500">${type.revenue.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clients" className="space-y-6">
          <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle>Top Clientes</CardTitle>
              <CardDescription>Clientes con mayor volumen de compras</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topClients.map((client, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <span className="font-semibold text-blue-600">#{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.licenses} licencias</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${client.revenue.toLocaleString()}</div>
                      <Badge variant={client.growth === "New" ? "default" : "secondary"} className="text-xs">
                        {client.growth}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="licenses" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle>Distribución por Tipo</CardTitle>
                <CardDescription>Licencias vendidas por categoría</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {licenseTypes.map((type, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{type.type}</span>
                        <span className="text-sm text-gray-500">
                          {type.count} ({type.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${type.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle>Estadísticas de Activación</CardTitle>
                <CardDescription>Rendimiento de activaciones por producto</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activationStats.map((stat, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{stat.product}</span>
                        <Badge className="bg-green-100/80 text-green-800 backdrop-blur-sm">{stat.success}% éxito</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Activaciones:</span>
                          <span className="ml-2 font-medium">{stat.activations}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Tiempo promedio:</span>
                          <span className="ml-2 font-medium">{stat.avgTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
