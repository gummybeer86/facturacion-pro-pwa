import customtkinter as ctk
import tkinter as tk
from tkinter import messagebox
import os
import sys
import psutil
import platform
import json
import requests
from PIL import Image, ImageTk
import darkdetect

class ChapaMarketSupport(ctk.CTk):
    def __init__(self):
        super().__init__()

        # Configuración de la ventana
        self.title("ChapaMarket Support Assistant")
        self.geometry("800x600")
        
        # Configurar tema
        if darkdetect.isDark():
            ctk.set_appearance_mode("dark")
        else:
            ctk.set_appearance_mode("light")
        
        # Cargar imagen
        try:
            image_path = os.path.join("build", "CSA.png")
            if not os.path.exists(image_path):
                image_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "build", "CSA.png")
            
            self.logo_image = Image.open(image_path)
            self.logo_image = self.logo_image.resize((200, 200), Image.Resampling.LANCZOS)
            self.logo_photo = ImageTk.PhotoImage(self.logo_image)
        except Exception as e:
            print(f"Error al cargar la imagen: {e}")
            self.logo_photo = None

        # Crear widgets
        self.create_widgets()

    def create_widgets(self):
        # Frame principal
        self.main_frame = ctk.CTkFrame(self)
        self.main_frame.pack(fill="both", expand=True, padx=20, pady=20)

        # Logo
        if self.logo_photo:
            self.logo_label = ctk.CTkLabel(self.main_frame, image=self.logo_photo, text="")
            self.logo_label.pack(pady=20)

        # Título
        self.title_label = ctk.CTkLabel(
            self.main_frame,
            text="ChapaMarket Support Assistant",
            font=ctk.CTkFont(size=24, weight="bold")
        )
        self.title_label.pack(pady=10)

        # Botones
        self.create_buttons()

        # Información del sistema
        self.create_system_info()

    def create_buttons(self):
        # Frame para botones
        self.button_frame = ctk.CTkFrame(self.main_frame)
        self.button_frame.pack(fill="x", padx=20, pady=20)

        # Botón de diagnóstico
        self.diagnostic_button = ctk.CTkButton(
            self.button_frame,
            text="Ejecutar Diagnóstico",
            command=self.run_diagnostic,
            width=200
        )
        self.diagnostic_button.pack(pady=10)

        # Botón de actualización
        self.update_button = ctk.CTkButton(
            self.button_frame,
            text="Verificar Actualizaciones",
            command=self.check_updates,
            width=200
        )
        self.update_button.pack(pady=10)

        # Botón de soporte
        self.support_button = ctk.CTkButton(
            self.button_frame,
            text="Contactar Soporte",
            command=self.contact_support,
            width=200
        )
        self.support_button.pack(pady=10)

    def create_system_info(self):
        # Frame para información del sistema
        self.info_frame = ctk.CTkFrame(self.main_frame)
        self.info_frame.pack(fill="x", padx=20, pady=20)

        # Información del sistema
        system_info = self.get_system_info()
        self.info_label = ctk.CTkLabel(
            self.info_frame,
            text=system_info,
            justify="left",
            font=ctk.CTkFont(size=12)
        )
        self.info_label.pack(pady=10)

    def get_system_info(self):
        info = []
        info.append(f"Sistema Operativo: {platform.system()} {platform.release()}")
        info.append(f"Procesador: {platform.processor()}")
        info.append(f"Memoria RAM: {round(psutil.virtual_memory().total / (1024**3), 2)} GB")
        info.append(f"Python: {platform.python_version()}")
        return "\n".join(info)

    def run_diagnostic(self):
        messagebox.showinfo(
            "Diagnóstico",
            "Iniciando diagnóstico del sistema..."
        )
        # Aquí iría la lógica del diagnóstico

    def check_updates(self):
        messagebox.showinfo(
            "Actualizaciones",
            "Verificando actualizaciones disponibles..."
        )
        # Aquí iría la lógica de verificación de actualizaciones

    def contact_support(self):
        messagebox.showinfo(
            "Soporte",
            "Por favor, contacte a soporte@chapamarket.com"
        )

if __name__ == "__main__":
    app = ChapaMarketSupport()
    app.mainloop()


