"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import {
  Mail,
  MessageSquare,
  Send,
  Users,
  Bell,
  Phone,
  FileText,
  Search,
  Filter,
  Plus,
  Eye,
  Reply,
  Forward,
  Archive,
  Star,
} from "lucide-react"

// Datos simulados
const mockMessages = [
  {
    id: "MSG-001",
    type: "email",
    from: "cliente@techcorp.com",
    to: "soporte@chapamarket.com",
    subject: "Problema con activación de licencia",
    content: "Hola, tengo problemas para activar mi licencia PRO-2024-001. Me aparece un error...",
    date: "2024-01-15 10:30",
    status: "unread",
    priority: "high",
    client: "TechCorp Inc.",
  },
  {
    id: "MSG-002",
    type: "whatsapp",
    from: "+52 773 108 6826",
    to: "soporte",
    subject: "Consulta sobre facturación",
    content: "Buenos días, necesito ayuda con la configuración del CFDI 4.0",
    date: "2024-01-15 09:15",
    status: "read",
    priority: "medium",
    client: "StartupXYZ",
  },
  {
    id: "MSG-003",
    type: "ticket",
    from: "admin@devstudio.com",
    to: "soporte técnico",
    subject: "Error en sincronización SAT",
    content: "El sistema no puede sincronizar con el SAT desde ayer...",
    date: "2024-01-14 16:45",
    status: "in_progress",
    priority: "urgent",
    client: "DevStudio LLC",
  },
]

const mockNotifications = [
  {
    id: "NOT-001",
    type: "license_expiry",
    title: "Licencias próximas a vencer",
    message: "5 licencias vencerán en los próximos 7 días",
    date: "2024-01-15 08:00",
    read: false,
  },
  {
    id: "NOT-002",
    type: "new_client",
    title: "Nuevo cliente registrado",
    message: "Enterprise Corp se ha registrado",
    date: "2024-01-14 14:30",
    read: true,
  },
]

export function CommunicationCenter() {
  const [messages, setMessages] = useState(mockMessages)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("messages")

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || message.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return <Badge className="bg-blue-100/80 text-blue-800">Sin leer</Badge>
      case "read":
        return <Badge className="bg-gray-100/80 text-gray-800">Leído</Badge>
      case "in_progress":
        return <Badge className="bg-yellow-100/80 text-yellow-800">En proceso</Badge>
      case "resolved":
        return <Badge className="bg-green-100/80 text-green-800">Resuelto</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-100/80 text-red-800">Urgente</Badge>
      case "high":
        return <Badge className="bg-orange-100/80 text-orange-800">Alta</Badge>
      case "medium":
        return <Badge className="bg-yellow-100/80 text-yellow-800">Media</Badge>
      case "low":
        return <Badge className="bg-green-100/80 text-green-800">Baja</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="w-4 h-4" />
      case "whatsapp":
        return <MessageSquare className="w-4 h-4" />
      case "ticket":
        return <FileText className="w-4 h-4" />
      case "phone":
        return <Phone className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Centro de Comunicación</h2>
          <p className="text-gray-600">Gestiona todas las comunicaciones con tus clientes</p>
        </div>
        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Mensaje
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Nuevo Mensaje</DialogTitle>
              <DialogDescription>Envía un mensaje a un cliente</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="messageType">Tipo de Mensaje</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="recipient">Destinatario</Label>
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
                <Label htmlFor="subject">Asunto</Label>
                <Input id="subject" placeholder="Asunto del mensaje" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Mensaje</Label>
                <Textarea id="content" placeholder="Escribe tu mensaje aquí..." rows={6} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Prioridad</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsComposeOpen(false)}>
                <Send className="w-4 h-4 mr-2" />
                Enviar Mensaje
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
                <p className="text-sm text-gray-600">Mensajes Sin Leer</p>
                <p className="text-2xl font-bold">{messages.filter((m) => m.status === "unread").length}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En Proceso</p>
                <p className="text-2xl font-bold">{messages.filter((m) => m.status === "in_progress").length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Urgentes</p>
                <p className="text-2xl font-bold">{messages.filter((m) => m.priority === "urgent").length}</p>
              </div>
              <Bell className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Hoy</p>
                <p className="text-2xl font-bold">{messages.length}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-md shadow-lg border border-white/20">
          <TabsTrigger value="messages">Mensajes</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          {/* Filtros y búsqueda */}
          <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar mensajes..."
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
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="unread">Sin leer</SelectItem>
                    <SelectItem value="read">Leídos</SelectItem>
                    <SelectItem value="in_progress">En proceso</SelectItem>
                    <SelectItem value="resolved">Resueltos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lista de mensajes */}
          <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle>Mensajes ({filteredMessages.length})</CardTitle>
              <CardDescription>Todas las comunicaciones con clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-gray-50/50 ${
                      message.status === "unread" ? "bg-blue-50/30 border-blue-200" : "bg-white/50 border-gray-200"
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0 mt-1">{getTypeIcon(message.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{message.subject}</h4>
                            {getPriorityBadge(message.priority)}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            De: {message.client} ({message.from})
                          </p>
                          <p className="text-sm text-gray-500 line-clamp-2">{message.content}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {getStatusBadge(message.status)}
                        <span className="text-xs text-gray-500">{message.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle>Notificaciones del Sistema</CardTitle>
              <CardDescription>Alertas y notificaciones importantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border ${
                      !notification.read ? "bg-blue-50/30 border-blue-200" : "bg-white/50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Bell className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{notification.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle>Plantillas de Mensajes</CardTitle>
              <CardDescription>Plantillas predefinidas para comunicación rápida</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-white/50">
                  <h4 className="font-medium mb-2">Bienvenida Nuevo Cliente</h4>
                  <p className="text-sm text-gray-600 mb-3">Plantilla de bienvenida para nuevos clientes registrados</p>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Plantilla
                  </Button>
                </div>

                <div className="p-4 border rounded-lg bg-white/50">
                  <h4 className="font-medium mb-2">Recordatorio Vencimiento</h4>
                  <p className="text-sm text-gray-600 mb-3">Recordatorio para licencias próximas a vencer</p>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Plantilla
                  </Button>
                </div>

                <div className="p-4 border rounded-lg bg-white/50">
                  <h4 className="font-medium mb-2">Soporte Técnico</h4>
                  <p className="text-sm text-gray-600 mb-3">Respuesta estándar para consultas de soporte</p>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Plantilla
                  </Button>
                </div>

                <div className="p-4 border rounded-lg bg-white/50">
                  <h4 className="font-medium mb-2">Activación Exitosa</h4>
                  <p className="text-sm text-gray-600 mb-3">Confirmación de activación de licencia</p>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Plantilla
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog para ver mensaje completo */}
      {selectedMessage && (
        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                {getTypeIcon(selectedMessage.type)}
                <span>{selectedMessage.subject}</span>
              </DialogTitle>
              <DialogDescription>
                De: {selectedMessage.client} ({selectedMessage.from}) - {selectedMessage.date}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex space-x-2">
                {getStatusBadge(selectedMessage.status)}
                {getPriorityBadge(selectedMessage.priority)}
              </div>
              <div className="p-4 bg-gray-50/50 rounded-lg">
                <p className="text-sm whitespace-pre-wrap">{selectedMessage.content}</p>
              </div>
            </div>
            <DialogFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Reply className="w-4 h-4 mr-2" />
                  Responder
                </Button>
                <Button variant="outline" size="sm">
                  <Forward className="w-4 h-4 mr-2" />
                  Reenviar
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Archive className="w-4 h-4 mr-2" />
                  Archivar
                </Button>
                <Button variant="outline" size="sm">
                  <Star className="w-4 h-4 mr-2" />
                  Marcar
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
