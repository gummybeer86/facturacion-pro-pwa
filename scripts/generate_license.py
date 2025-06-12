import secrets
import string
import hashlib
from datetime import datetime, timedelta
import mysql.connector
from mysql.connector import Error

def generate_license_key():
    # Generar una llave aleatoria de 32 caracteres
    alphabet = string.ascii_letters + string.digits
    key = ''.join(secrets.choice(alphabet) for _ in range(32))
    
    # Agregar checksum
    checksum = hashlib.sha256(key.encode()).hexdigest()[:8]
    return f"{key}-{checksum}"

def create_license(email, license_type='trial'):
    try:
        # Conectar a la base de datos
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='chapamarket'
        )

        if connection.is_connected():
            cursor = connection.cursor()

            # Verificar si el usuario existe
            cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
            result = cursor.fetchone()
            
            if not result:
                # Crear nuevo usuario
                cursor.execute(
                    "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
                    (email.split('@')[0], email, '')
                )
                user_id = cursor.lastrowid
            else:
                user_id = result[0]

            # Calcular fecha de expiración
            if license_type == 'trial':
                end_date = datetime.now() + timedelta(days=15)
            else:  # annual
                end_date = datetime.now() + timedelta(days=365)

            # Generar llave
            license_key = generate_license_key()

            # Insertar licencia
            cursor.execute(
                """
                INSERT INTO licenses (user_id, license_key, type, end_date)
                VALUES (%s, %s, %s, %s)
                """,
                (user_id, license_key, license_type, end_date)
            )

            connection.commit()
            return license_key

    except Error as e:
        print(f"Error: {e}")
        return None

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

def verify_license(license_key):
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='chapamarket'
        )

        if connection.is_connected():
            cursor = connection.cursor(dictionary=True)

            # Verificar licencia
            cursor.execute(
                """
                SELECT l.*, u.email 
                FROM licenses l
                JOIN users u ON l.user_id = u.id
                WHERE l.license_key = %s AND l.status = 'active'
                """,
                (license_key,)
            )
            
            license_data = cursor.fetchone()
            
            if license_data:
                # Verificar si la licencia ha expirado
                if datetime.now() > license_data['end_date']:
                    cursor.execute(
                        "UPDATE licenses SET status = 'expired' WHERE id = %s",
                        (license_data['id'],)
                    )
                    connection.commit()
                    return False, "Licencia expirada"
                
                return True, license_data
            return False, "Licencia inválida"

    except Error as e:
        print(f"Error: {e}")
        return False, str(e)

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == "__main__":
    # Ejemplo de uso
    email = "ejemplo@createstudiodigital.com.mx"
    
    # Generar licencia de prueba
    trial_key = create_license(email, 'trial')
    print(f"Licencia de prueba: {trial_key}")
    
    # Generar licencia anual
    annual_key = create_license(email, 'annual')
    print(f"Licencia anual: {annual_key}")
    
    # Verificar licencia
    is_valid, result = verify_license(trial_key)
    print(f"¿Licencia válida?: {is_valid}")
    if is_valid:
        print(f"Datos de la licencia: {result}") 