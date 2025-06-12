"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Package,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  TrendingUp,
  Archive,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Datos simulados de productos
const mockProducts = [
  {
    id: "PROD-001",
    name: "ChapaMarket Facturación Pro",
    version: "2.1.0",
    category: "Facturación",
    price: 2500,
    currency: "MXN",
    status: "active",
    licenses: 45,
    description: "Sistema completo de facturación electrónica CFDI 4.0",
    features: ["CFDI 4.0", "Integración SAT", "Multi-empresa", "Reportes avanzados"],
    createdDate: "2024-01-01",
    lastUpdate: "2024-01-15",
  },
  {
    id: "PROD-002",
    name: "ChapaMarket Básico",
    version: "1.5.2",
    category: "Facturación",
    price: 1200,
    currency: "MXN",
    status: "active",
    licenses: 128,
    description: "Versión básica para pequeños negocios",
    features: ["CFDI 4.0", "1 Empresa", "Reportes básicos"],
    createdDate: "2023-06-15",
    lastUpdate: "2024-01-10",
  },
  {
    id: "PROD-003",
    name: "ChapaMarket Enterprise",
    version: "3.0.0-beta",
    category: "Enterprise",
    price: 8500,
    currency: "MXN",
    status: "beta",
    licenses: 12,
    description: "Solución empresarial con funciones avanzadas",
    features: ["Multi-sucursal", "API REST", "Integración ERP", "Soporte 24/7"],
    createdDate: "2024-01-01",
    lastUpdate: "2024-01-14",
  },
]

export function ProductManagement() {
  const [products, setProducts] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.version.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100/80 text-green-800 backdrop-blur-sm">Activo</Badge>
      case "beta":
        return <Badge className="bg-blue-100/80 text-blue-800 backdrop-blur-sm">Beta</Badge>
      case "deprecated":
        return <Badge className="bg-yellow-100/80 text-yellow-800 backdrop-blur-sm">Obsoleto</Badge>
      case "archived":
        return <Badge className="bg-gray-100/80 text-gray-800 backdrop-blur-sm">Archivado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const viewProduct = (product: any) => {
    setSelectedProduct(product)
    setIsViewDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Productos</h2>
          <p className="text-gray-600">Administra tu catálogo de software</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Producto</DialogTitle>
              <DialogDescription>Agrega un nuevo producto a tu catálogo</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="productName">Nombre del Producto</Label>
                  <Input id="productName" placeholder="ChapaMarket Pro" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="version">Versión</Label>
                  <Input id="version" placeholder="1.0.0" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facturacion">Facturación</SelectItem>
                      <SelectItem value="contabilidad">Contabilidad</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="utilities">Utilidades</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Precio (MXN)</Label>
                  <Input id="price" type="number" placeholder="2500" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" placeholder="Descripción del producto..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="features">Características (separadas por coma)</Label>
                <Textarea id="features" placeholder="CFDI 4.0, Integración SAT, Multi-empresa..." />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsCreateDialogOpen(false)}>
                Crear Producto
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Productos</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Productos Activos</p>
                <p className="text-2xl font-bold">{products.filter((p) => p.status === "active").length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Licencias</p>
                <p className="text-2xl font-bold">{products.reduce((sum, p) => sum + p.licenses, 0)}</p>
              </div>
              <Archive className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ingresos Estimados</p>
                <p className="text-2xl font-bold">
                  ${products.reduce((sum, p) => sum + p.price * p.licenses, 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y búsqueda */}
      <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="beta">Beta</SelectItem>
                <SelectItem value="deprecated">Obsoletos</SelectItem>
                <SelectItem value="archived">Archivados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de productos */}
      <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle>Productos ({filteredProducts.length})</CardTitle>
          <CardDescription>Lista de todos los productos en tu catálogo</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Licencias</TableHead>
                <TableHead>Última Actualización</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">v{product.version}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      ${product.price.toLocaleString()} {product.currency}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(product.status)}</TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium">{product.licenses}</div>
                      <div className="text-xs text-gray-500">activas</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{product.lastUpdate}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => viewProduct(product)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog para ver detalles del producto */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProduct.name}</DialogTitle>
                <DialogDescription>Detalles del producto</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Versión</Label>
                    <p className="text-sm text-gray-600">{selectedProduct.version}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Categoría</Label>
                    <p className="text-sm text-gray-600">{selectedProduct.category}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Descripción</Label>
                  <p className="text-sm text-gray-600">{selectedProduct.description}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Características</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedProduct.features.map((feature: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Precio</Label>
                    <p className="text-sm text-gray-600">
                      ${selectedProduct.price.toLocaleString()} {selectedProduct.currency}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Licencias Activas</Label>
                    <p className="text-sm text-gray-600">{selectedProduct.licenses}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
