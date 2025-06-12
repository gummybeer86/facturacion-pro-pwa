import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import EMAIL_CONFIG

def test_email_config():
    """Prueba la configuración del correo electrónico"""
    print("Probando configuración de correo...")
    print(f"Servidor SMTP: {EMAIL_CONFIG['smtp_server']}")
    print(f"Puerto: {EMAIL_CONFIG['smtp_port']}")
    print(f"Correo remitente: {EMAIL_CONFIG['sender_email']}")
    
    # Crear mensaje de prueba
    msg = MIMEMultipart()
    msg['From'] = EMAIL_CONFIG['sender_email']
    msg['To'] = EMAIL_CONFIG['sender_email']  # Enviar a sí mismo para prueba
    msg['Subject'] = 'Prueba de Configuración - ChapaMarket'
    
    body = "Este es un correo de prueba para verificar la configuración del sistema de licencias."
    msg.attach(MIMEText(body, 'plain'))
    
    try:
        # Conectar al servidor
        print("\nConectando al servidor SMTP...")
        server = smtplib.SMTP(EMAIL_CONFIG['smtp_server'], EMAIL_CONFIG['smtp_port'])
        server.starttls()
        
        # Intentar login
        print("Intentando iniciar sesión...")
        try:
            server.login(EMAIL_CONFIG['sender_email'], EMAIL_CONFIG['sender_password'])
            print("¡Login exitoso!")
        except smtplib.SMTPAuthenticationError:
            print("\nError de autenticación. Por favor verifica:")
            print("1. Que la verificación en dos pasos esté activada en tu cuenta de Google")
            print("2. Que estés usando una contraseña de aplicación")
            print("3. Que la contraseña de aplicación sea correcta")
            return False
        
        # Enviar correo
        print("\nEnviando correo de prueba...")
        server.send_message(msg)
        print("¡Correo enviado exitosamente!")
        
        server.quit()
        return True
        
    except Exception as e:
        print(f"\nError: {str(e)}")
        return False

if __name__ == "__main__":
    test_email_config() 