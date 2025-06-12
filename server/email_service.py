import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import EMAIL_CONFIG

def send_license_email(recipient_email, client_name, license_key, license_type, expiry_date):
    """Envía un correo electrónico con la información de la licencia"""
    try:
        # Crear mensaje
        msg = MIMEMultipart()
        msg['From'] = EMAIL_CONFIG['sender_email']
        msg['To'] = recipient_email
        msg['Subject'] = f"Tu Licencia de ChapaMarket - {license_type.capitalize()}"

        # Crear el contenido HTML del correo
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #2c3e50;">¡Bienvenido a ChapaMarket!</h2>
                <p>Hola {client_name},</p>
                <p>Gracias por tu interés en ChapaMarket. Aquí está la información de tu licencia:</p>
                
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>Tipo de Licencia:</strong> {license_type.capitalize()}</p>
                    <p><strong>Clave de Licencia:</strong> {license_key}</p>
                    <p><strong>Fecha de Expiración:</strong> {expiry_date}</p>
                </div>
                
                <p>Para activar tu licencia, por favor sigue estos pasos:</p>
                <ol>
                    <li>Abre la aplicación ChapaMarket</li>
                    <li>Ve a la sección de activación de licencia</li>
                    <li>Ingresa la clave de licencia proporcionada arriba</li>
                </ol>
                
                <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
                
                <p style="margin-top: 30px; font-size: 0.9em; color: #666;">
                    Saludos,<br>
                    El equipo de ChapaMarket
                </p>
            </div>
        </body>
        </html>
        """

        msg.attach(MIMEText(html_content, 'html'))

        # Conectar al servidor SMTP
        server = smtplib.SMTP(EMAIL_CONFIG['smtp_server'], EMAIL_CONFIG['smtp_port'])
        server.starttls()
        
        # Iniciar sesión
        server.login(EMAIL_CONFIG['sender_email'], EMAIL_CONFIG['sender_password'])
        
        # Enviar correo
        server.send_message(msg)
        server.quit()
        
        print(f"Correo enviado exitosamente a {recipient_email}")
        return True

    except Exception as e:
        print(f"Error al enviar correo: {str(e)}")
        return False 