"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Key, Copy, AlertCircle, CheckCircle, Code } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const pythonTrialCode = `import uuid
import hashlib
import time
from datetime import datetime, timedelta

def generate_trial_license(client_name, client_email, product_id):
    """
    Genera una licencia de prueba válida por 7 días
    """
    # Crear identificador único
    license_id = str(uuid.uuid4()).upper()
    
    # Fecha actual y de expiración (7 días)
    current_time = datetime.now()
    expiry_date = current_time + timedelta(days=7)
    
    # Crear clave base
    base_key = f"{license_id}:{client_name}:{client_email}:{product_id}:{expiry_date.strftime('%Y-%m-%d')}"
    
    # Generar hash para verificación
    hash_key = hashlib.sha256(base_key.encode()).hexdigest()[:16].upper()
    
    # Formato final de la licencia
    license_key = f"TRIAL-{license_id[:8]}-{hash_key[:4]}-{hash_key[4:8]}-{hash_key[8:12]}"
    
    return {
        "license_key": license_key,
        "client_name": client_name,
        "client_email": client_email,
        "product_id": product_id,
        "type": "trial",
        "issue_date": current_time.strftime("%Y-%m-%d"),
        "expiry_date": expiry_date.strftime("%Y-%m-%d"),
        "status": "active"
    }

# Ejemplo de uso
if __name__ == "__main__":
    license_data = generate_trial_license(
        "Cliente Ejemplo", 
        "cliente@ejemplo.com", 
        "SOFTWARE-PRO-2025"
    )
    print(f"Licencia de prueba generada: {license_data['license_key']}")
    print(f"Válida hasta: {license_data['expiry_date']}")
`

const pythonAnnualCode = `import uuid
import hashlib
import time
from datetime import datetime, timedelta

def generate_annual_license(client_name, client_email, product_id, hardware_id=None):
    """
    Genera una licencia anual con verificación de hardware opcional
    """
    # Crear identificador único
    license_id = str(uuid.uuid4()).upper()
    
    # Fecha actual y de expiración (365 días)
    current_time = datetime.now()
    expiry_date = current_time + timedelta(days=365)
    
    # Crear clave base
    base_key = f"{license_id}:{client_name}:{client_email}:{product_id}:{expiry_date.strftime('%Y-%m-%d')}"
    
    # Añadir hardware_id si está disponible
    if hardware_id:
        base_key += f":{hardware_id}"
    
    # Generar hash para verificación
    hash_key = hashlib.sha256(base_key.encode()).hexdigest()[:24].upper()
    
    # Formato final de la licencia
    license_key = f"ANNUAL-{license_id[:8]}-{hash_key[:4]}-{hash_key[4:8]}-{hash_key[8:12]}"
    
    return {
        "license_key": license_key,
        "client_name": client_name,
        "client_email": client_email,
        "product_id": product_id,
        "hardware_id": hardware_id,
        "type": "annual",
        "issue_date": current_time.strftime("%Y-%m-%d"),
        "expiry_date": expiry_date.strftime("%Y-%m-%d"),
        "status": "active"
    }

def verify_license(license_key, client_email, product_id, hardware_id=None):
    """
    Verifica si una licencia es válida
    """
    # Implementar lógica de verificación aquí
    # Verificar formato, hash, fecha de expiración, etc.
    
    # En caso de fallo, contactar al soporte:
    # ING-Cesar Sanchez
    # WhatsApp: 773-108-6826 o 763-109-3925
    # Email: kashtaman@createstudiodigital.com o vercelkash@gmail.com
    
    return True  # o False si la verificación falla

# Ejemplo de uso
if __name__ == "__main__":
    license_data = generate_annual_license(
        "Cliente Premium", 
        "premium@empresa.com", 
        "SOFTWARE-ENTERPRISE-2025",
        "HW-ID-12345-ABCDE"
    )
    print(f"Licencia anual generada: {license_data['license_key']}")
    print(f"Válida hasta: {license_data['expiry_date']}")
`

const pythonVerificationCode = `import hashlib
import re
from datetime import datetime

def verify_license_key(license_key, client_email, product_id, hardware_id=None):
    """
    Verifica si una licencia es válida
    """
    try:
        # Verificar formato básico
        if license_key.startswith("TRIAL-"):
            pattern = r"TRIAL-[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}"
            license_type = "trial"
        elif license_key.startswith("ANNUAL-"):
            pattern = r"ANNUAL-[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}"
            license_type = "annual"
        else:
            return {"valid": False, "error": "Formato de licencia inválido"}
            
        if not re.match(pattern, license_key):
            return {"valid": False, "error": "Formato de licencia inválido"}
        
        # Aquí iría la lógica completa de verificación
        # Verificar hash, fecha de expiración, etc.
        
        return {"valid": True, "type": license_type}
        
    except Exception as e:
        return {
            "valid": False, 
            "error": str(e),
            "support_message": """
            Si la verificación de licencia falla, contacte al soporte:
            ING-Cesar Sanchez
            WhatsApp: 773-108-6826 o 763-109-3925
            Email: kashtaman@createstudiodigital.com o vercelkash@gmail.com
            Chapantogo 2025 ChapaMarket Hgo.
            """
        }

# Ejemplo de uso
if __name__ == "__main__":
    result = verify_license_key(
        "ANNUAL-12345678-ABCD-EF12-3456", 
        "cliente@ejemplo.com",
        "SOFTWARE-PRO-2025"
    )
    
    if result["valid"]:
        print(f"Licencia válida de tipo: {result['type']}")
    else:
        print(f"Error: {result['error']}")
        if "support_message" in result:
            print(result["support_message"])
`

export function LicenseGenerator() {
  const [activeTab, setActiveTab] = useState("trial")
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (code: string, type: string) => {
    navigator.clipboard.writeText(code)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-600/90 to-blue-700/90 backdrop-blur-md text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Key className="h-6 w-6" />
          <CardTitle>Generador de Licencias Python</CardTitle>
        </div>
        <CardDescription className="text-blue-100">
          Implementación de generación y verificación de licencias
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100/80 backdrop-blur-sm rounded-none">
            <TabsTrigger value="trial">Licencia de Prueba (7 días)</TabsTrigger>
            <TabsTrigger value="annual">Licencia Anual</TabsTrigger>
            <TabsTrigger value="verification">Verificación</TabsTrigger>
          </TabsList>
          <TabsContent value="trial" className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Generador de Licencia de Prueba</h3>
                <p className="text-sm text-gray-500">Genera licencias válidas por 7 días</p>
              </div>
              <Badge className="bg-blue-100/80 text-blue-800 backdrop-blur-sm">Python 3.x</Badge>
            </div>

            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto max-h-[400px] overflow-y-auto">
                <code>{pythonTrialCode}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200"
                onClick={() => copyToClipboard(pythonTrialCode, "trial")}
              >
                {copied === "trial" ? <CheckCircle className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied === "trial" ? "Copiado" : "Copiar"}
              </Button>
            </div>

            <div className="bg-blue-50/80 backdrop-blur-sm p-4 rounded-lg border border-blue-100">
              <h4 className="font-medium flex items-center">
                <Code className="h-4 w-4 mr-2 text-blue-600" />
                Ejemplo de uso
              </h4>
              <p className="text-sm mt-2">
                Este código genera una licencia de prueba con un identificador único, fecha de expiración a 7 días y un
                hash de verificación. Ideal para versiones de evaluación del software.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="annual" className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Generador de Licencia Anual</h3>
                <p className="text-sm text-gray-500">Genera licencias válidas por 365 días</p>
              </div>
              <Badge className="bg-green-100/80 text-green-800 backdrop-blur-sm">Python 3.x</Badge>
            </div>

            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto max-h-[400px] overflow-y-auto">
                <code>{pythonAnnualCode}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200"
                onClick={() => copyToClipboard(pythonAnnualCode, "annual")}
              >
                {copied === "annual" ? <CheckCircle className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied === "annual" ? "Copiado" : "Copiar"}
              </Button>
            </div>

            <div className="bg-green-50/80 backdrop-blur-sm p-4 rounded-lg border border-green-100">
              <h4 className="font-medium flex items-center">
                <Code className="h-4 w-4 mr-2 text-green-600" />
                Características
              </h4>
              <p className="text-sm mt-2">
                Este generador crea licencias anuales con mayor seguridad, incluyendo verificación de hardware opcional
                y un hash más complejo. Perfecto para licencias comerciales.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="verification" className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Sistema de Verificación</h3>
                <p className="text-sm text-gray-500">Verifica la validez de las licencias</p>
              </div>
              <Badge className="bg-purple-100/80 text-purple-800 backdrop-blur-sm">Python 3.x</Badge>
            </div>

            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto max-h-[400px] overflow-y-auto">
                <code>{pythonVerificationCode}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200"
                onClick={() => copyToClipboard(pythonVerificationCode, "verification")}
              >
                {copied === "verification" ? (
                  <CheckCircle className="h-4 w-4 mr-1" />
                ) : (
                  <Copy className="h-4 w-4 mr-1" />
                )}
                {copied === "verification" ? "Copiado" : "Copiar"}
              </Button>
            </div>

            <div className="bg-red-50/80 backdrop-blur-sm p-4 rounded-lg border border-red-100">
              <h4 className="font-medium flex items-center text-red-800">
                <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
                En caso de fallo de licencia
              </h4>
              <p className="text-sm mt-2">
                Si la verificación de licencia falla, contacte al soporte:
                <br />
                <strong>ING-Cesar Sanchez</strong>
                <br />
                WhatsApp: 773-108-6826 o 763-109-3925
                <br />
                Email: kashtaman@createstudiodigital.com o vercelkash@gmail.com
                <br />
                Chapantogo 2025 ChapaMarket Hgo.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
