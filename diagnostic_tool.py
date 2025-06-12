import os
import sys
import json
import requests
import platform
import subprocess
from datetime import datetime
import tkinter as tk
from tkinter import ttk, messagebox
import webbrowser
from PIL import Image, ImageTk

class ChapaMarketDiagnostic:
    def __init__(self):
        self.window = tk.Tk()
        self.window.title("ChapaMarket Diagnostic Tool")
        self.window.geometry("600x700")  # Ventana más pequeña
        self.window.configure(bg='#ffffff')  # Fondo blanco
        
        # Cargar logo
        try:
            logo_path = os.path.join("public", "images", "chapamarket-logo.png")
            if os.path.exists(logo_path):
                self.logo_image = Image.open(logo_path)
                self.logo_image = self.logo_image.resize((200, 60), Image.Resampling.LANCZOS)
                self.logo_photo = ImageTk.PhotoImage(self.logo_image)
            else:
                self.logo_photo = None
        except:
            self.logo_photo = None
        
        # Estilo
        style = ttk.Style()
        style.configure(
            "Custom.TButton",
            padding=10,
            font=('Segoe UI', 10),
            background='#007bff',
            foreground='white'
        )
        style.configure(
            "Custom.TLabel",
            font=('Segoe UI', 10),
            background='#ffffff',
            foreground='#333333'
        )
        
        self.create_widgets()
        
    def create_widgets(self):
        # Frame principal con sombra
        main_frame = ttk.Frame(self.window, style="Card.TFrame")
        main_frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)
        
        # Logo
        if self.logo_photo:
            logo_label = ttk.Label(main_frame, image=self.logo_photo, background='#ffffff')
            logo_label.pack(pady=20)
        
        # Título
        title = ttk.Label(
            main_frame,
            text="Herramienta de Diagnóstico",
            font=('Segoe UI', 16, 'bold'),
            style="Custom.TLabel"
        )
        title.pack(pady=10)
        
        # Frame para botones con estilo de tarjeta
        button_frame = ttk.Frame(main_frame, style="Card.TFrame")
        button_frame.pack(fill=tk.X, padx=20, pady=10)
        
        # Botones de diagnóstico con estilo moderno
        buttons = [
            ("Verificar Sistema", self.check_system),
            ("Verificar Conexión SAT", self.check_sat_connection),
            ("Verificar Licencia", self.check_license),
            ("Guía de Solución de Problemas", self.show_troubleshooting_guide)
        ]
        
        for text, command in buttons:
            btn = ttk.Button(
                button_frame,
                text=text,
                command=command,
                style="Custom.TButton"
            )
            btn.pack(fill=tk.X, pady=5)
        
        # Área de resultados con estilo moderno
        result_frame = ttk.Frame(main_frame, style="Card.TFrame")
        result_frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=10)
        
        self.result_text = tk.Text(
            result_frame,
            height=15,
            bg='#f8f9fa',
            fg='#333333',
            font=('Segoe UI', 10),
            relief='flat',
            borderwidth=0
        )
        self.result_text.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Botón de contacto con estilo moderno
        contact_btn = ttk.Button(
            main_frame,
            text="Contactar Soporte",
            command=self.contact_support,
            style="Custom.TButton"
        )
        contact_btn.pack(fill=tk.X, padx=20, pady=10)
        
    def check_system(self):
        self.result_text.delete(1.0, tk.END)
        self.result_text.insert(tk.END, "=== Verificación del Sistema ===\n\n")
        
        # Información del sistema
        self.result_text.insert(tk.END, f"Sistema Operativo: {platform.system()} {platform.release()}\n")
        self.result_text.insert(tk.END, f"Arquitectura: {platform.machine()}\n")
        self.result_text.insert(tk.END, f"Python: {platform.python_version()}\n")
        
        # Verificar archivos necesarios
        required_files = [
            "license_server.py",
            "electron.js",
            "package.json",
            "public/images/chapamarket-logo.png",
            "public/images/logo-createstudio.png"
        ]
        
        self.result_text.insert(tk.END, "\nVerificando archivos necesarios:\n")
        for file in required_files:
            if os.path.exists(file):
                self.result_text.insert(tk.END, f"✓ {file} encontrado\n")
            else:
                self.result_text.insert(tk.END, f"✗ {file} no encontrado\n")
        
        # Verificar espacio en disco
        try:
            total, used, free = shutil.disk_usage("/")
            self.result_text.insert(tk.END, f"\nEspacio en disco:\n")
            self.result_text.insert(tk.END, f"Total: {total // (2**30)} GB\n")
            self.result_text.insert(tk.END, f"Usado: {used // (2**30)} GB\n")
            self.result_text.insert(tk.END, f"Libre: {free // (2**30)} GB\n")
        except:
            self.result_text.insert(tk.END, "\n✗ No se pudo verificar el espacio en disco\n")
    
    def check_sat_connection(self):
        self.result_text.delete(1.0, tk.END)
        self.result_text.insert(tk.END, "=== Verificando Conexión con SAT ===\n\n")
        
        try:
            # Intentar conexión con el SAT
            response = requests.get("https://cfdiws.sat.gob.mx/", timeout=5)
            if response.status_code == 200:
                self.result_text.insert(tk.END, "✓ Conexión con SAT establecida correctamente\n")
            else:
                self.result_text.insert(tk.END, "✗ Error al conectar con SAT\n")
        except:
            self.result_text.insert(tk.END, "✗ No se pudo establecer conexión con SAT\n")
            self.result_text.insert(tk.END, "\nPosibles soluciones:\n")
            self.result_text.insert(tk.END, "1. Verifica tu conexión a internet\n")
            self.result_text.insert(tk.END, "2. Asegúrate de que el servicio del SAT esté disponible\n")
            self.result_text.insert(tk.END, "3. Revisa tu configuración de firewall\n")
    
    def check_license(self):
        self.result_text.delete(1.0, tk.END)
        self.result_text.insert(tk.END, "=== Verificando Licencia ===\n\n")
        
        try:
            # Verificar archivo de licencia
            if os.path.exists("license.json"):
                with open("license.json", "r") as f:
                    license_data = json.load(f)
                    self.result_text.insert(tk.END, f"Tipo de Licencia: {license_data.get('type', 'No especificado')}\n")
                    self.result_text.insert(tk.END, f"Fecha de Expiración: {license_data.get('expiry_date', 'No especificada')}\n")
            else:
                self.result_text.insert(tk.END, "✗ Archivo de licencia no encontrado\n")
        except:
            self.result_text.insert(tk.END, "✗ Error al verificar la licencia\n")
    
    def show_troubleshooting_guide(self):
        self.result_text.delete(1.0, tk.END)
        self.result_text.insert(tk.END, "=== Guía de Solución de Problemas ===\n\n")
        
        guide = """
1. Problemas de Conexión:
   - Verifica tu conexión a internet
   - Asegúrate de que el servicio del SAT esté disponible
   - Revisa tu configuración de firewall

2. Problemas con la Licencia:
   - Verifica que la licencia no haya expirado
   - Asegúrate de que el archivo de licencia esté presente
   - Contacta a soporte si necesitas renovar

3. Problemas de Rendimiento:
   - Cierra otras aplicaciones
   - Verifica el espacio en disco
   - Reinicia la aplicación

4. Problemas con Facturas:
   - Verifica la conexión con el SAT
   - Asegúrate de que los datos sean correctos
   - Revisa los logs de error

Para más ayuda, contacta a soporte:
WhatsApp: 773-108-6826
Email: chapmarket@createstudiodigital.com.mx
        """
        self.result_text.insert(tk.END, guide)
    
    def contact_support(self):
        webbrowser.open("https://wa.me/5217731086826")
    
    def run(self):
        self.window.mainloop()

if __name__ == "__main__":
    app = ChapaMarketDiagnostic()
    app.run() 