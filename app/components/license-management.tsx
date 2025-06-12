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
  Key,
  CheckCircle,
  XCircle,
  Clock,
  Copy,
  Edit,
  Trash2,
  RefreshCw,
  Eye,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Datos simulados de licencias
const mockLicenses = [
  {
    id: "LIC-001",
    key: "PRO-2024-ABCD-EFGH-IJKL",
    client: "TechCorp Inc.",
    product: "Software Pro",
    type: "Profesional",
    status: "active",
    createdDate: "2024-01-15",
    expiryDate: "2025-01-15",
    maxUsers: 50,
    currentUsers: 23,
    activations: 2,
    maxActivations: 3,
    lastActivation: "2024-01-20",
  },
  {
    id: "LIC-002",
    key: "STD-2024-MNOP-QRST-UVWX",
    client: "StartupXYZ",
    product: "Software Standard",
    type: "Estándar",
    status: "active",
    createdDate: "2024-01-10",
    expiryDate: "2024-12-10",
    maxUsers: 10,
    currentUsers: 8,
    activations: 1,
    maxActivations: 2,
    lastActivation: "2024-01-12",
  },
  {
    id: "LIC-003",
    key: "ENT-2023-YZAB-CDEF-GHIJ",
    client: "Enterprise Corp",
    product: "Software Enterprise",
    type: "Enterprise",
    status: "expired",
    createdDate: "2023-01-01",
    expiryDate: "2024-01-01",
    maxUsers: 200,
    currentUsers: 0,
    activations: 3,
    maxActivations: 3,
    lastActivation: "2023-12-15",
  },
  {
    id: "LIC-004",
    key: "PRO-2024-KLMN-OPQR-STUV",
    client: "DevStudio LLC",
    product: "Software Pro",
    type: "Profesional",
    status: "pending",
    createdDate: "2024-01-14",
    expiryDate: "2025-01-14",
    maxUsers: 25,
    currentUsers: 0,
    activations: 0,
    maxActivations: 2,
    lastActivation: null,
  },
]

// Datos simulados de activaciones
const mockActivations = [
  {
    id: "ACT-001",
    licenseId: "LIC-001",
    date: "2024-01-16",
    deviceId: "DEVICE-123456",
    ipAddress: "192.168.1.100",
    os: "Windows 10",
    status: "success",
  },
  {
    id: "ACT-002",
    licenseId: "LIC-001",
    date: "2024-01-20",
    deviceId: "DEVICE-789012",
    ipAddress: "192.168.1.101",
    os: "macOS 12.3",
    status: "success",
  },
  {
    id: "ACT-003",
    licenseId: "LIC-002",
    date: "2024-01-12",
    deviceId: "DEVICE-345678",
    ipAddress: "192.168.1.102",
    os: "Windows 11",
    status: "success",
  },
]

export function LicenseManagement() {
  const [licenses, setLicenses] = useState(mockLicenses)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedLicense, setSelectedLicense] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [activeDetailTab, setActiveDetailTab] = useState("details")

  const filteredLicenses = licenses.filter((license) => {
    const matchesSearch =
      license.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.product.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || license.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100/80 text-green-800 backdrop-blur-sm">
            <CheckCircle className="w-3 h-3 mr-1" />
            Activa
          </Badge>
        )
      case "expired":
        return (
          <Badge className="bg-red-100/80 text-red-800 backdrop-blur-sm">
            <XCircle className="w-3 h-3 mr-1" />
            Expirada
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100/80 text-yellow-800 backdrop-blur-sm">
            <Clock className="w-3 h-3 mr-1" />
            Pendiente
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Aquí podrías agregar una notificación toast
  }

  const viewLicense = (license: any) => {
    setSelectedLicense(license)
    setActiveDetailTab("details")
    setIsViewDialogOpen(true)
  }

  const getLicenseActivations = (licenseId: string) => {
    return mockActivations.filter((activation) => activation.licenseId === licenseId)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Licencias</h2>
          <p className="text-gray-600">Administra todas las licencias de software</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Licencia
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Crear Nueva Licencia</DialogTitle>
              <DialogDescription>Genera una nueva licencia para un cliente</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="client">Cliente</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="techcorp">TechCorp Inc.</SelectItem>
                    <SelectItem value="startup">StartupXYZ</SelectItem>
                    <SelectItem value="devstudio">DevStudio LLC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="product">Producto</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar producto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Software Standard</SelectItem>
                    <SelectItem value="pro">Software Pro</SelectItem>
                    <SelectItem value="enterprise">Software Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="licenseType">Tipo de Licencia</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="perpetual">Perpetua</SelectItem>
                    <SelectItem value="annual">Anual</SelectItem>
                    <SelectItem value="monthly">Mensual</SelectItem>
                    <SelectItem value="trial">Prueba (30 días)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maxUsers">Máximo de Usuarios</Label>
                <Input id="maxUsers" type="number" placeholder="10" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maxActivations">Máximo de Activaciones</Label>
                <Input id="maxActivations" type="number" placeholder="2" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notas (opcional)</Label>
                <Textarea id="notes" placeholder="Notas adicionales..." />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsCreateDialogOpen(false)}>
                Crear Licencia
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros y búsqueda */}
      <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por cliente, clave o producto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activas</SelectItem>
                <SelectItem value="expired">Expiradas</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de licencias */}
      <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle>Licencias ({filteredLicenses.length})</CardTitle>
          <CardDescription>Lista de todas las licencias generadas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Clave de Licencia</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Activaciones</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLicenses.map((license) => (
                <TableRow key={license.id}>
                  <TableCell className="font-medium">{license.client}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{license.product}</div>
                      <div className="text-sm text-gray-500">{license.type}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">{license.key}</code>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(license.key)}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(license.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {license.activations}/{license.maxActivations}
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${(license.activations / license.maxActivations) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {license.expiryDate}
                      {license.status === "expired" && <div className="text-red-500 text-xs">Expirada</div>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => viewLicense(license)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Renovar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Key className="mr-2 h-4 w-4" />
                          Regenerar Clave
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <XCircle className="mr-2 h-4 w-4" />
                          Desactivar
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

      {/* Dialog para ver detalles de la licencia */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">{/* Contenido del diálogo para ver detalles */}</DialogContent>
      </Dialog>
    </div>
  )
}
