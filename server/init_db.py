import mysql.connector
from dotenv import load_dotenv
import os

# Cargar variables de entorno
load_dotenv()

def init_database():
    try:
        # Conectar a MySQL
        conn = mysql.connector.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            user=os.getenv('DB_USER', 'root'),
            password=os.getenv('DB_PASSWORD', '')
        )
        cursor = conn.cursor()

        # Leer el archivo SQL
        with open('database.sql', 'r') as file:
            sql_commands = file.read()

        # Ejecutar los comandos SQL
        for command in sql_commands.split(';'):
            if command.strip():
                cursor.execute(command)
                conn.commit()

        print("Base de datos inicializada correctamente")
        cursor.close()
        conn.close()

    except mysql.connector.Error as err:
        print(f"Error: {err}")

if __name__ == "__main__":
    init_database() 