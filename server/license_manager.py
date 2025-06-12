from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime, timedelta
import random
import string
import secrets
from config import EMAIL_CONFIG
from email_service import send_license_email

app = Flask(__name__)
CORS(app)

# Archivo para almacenar las licencias
LICENSES_FILE = 'licenses.json'

# Códigos de acceso válidos
VALID_ACCESS_CODES = EMAIL_CONFIG['access_keys']

@app.route('/')
def home():
    """Página principal del servidor"""
    return jsonify({
        'status': 'online',
        'message': 'Servidor de licencias de ChapaMarket funcionando correctamente',
        'endpoints': {
            'generate_license': '/generate-license',
            'activate_license': '/activate-license',
            'verify_license': '/verify-license'
        }
    })

def load_licenses():
    """Carga las licencias desde el archivo JSON"""
    if os.path.exists(LICENSES_FILE):
        with open(LICENSES_FILE, 'r') as f:
            return json.load(f)
    return []

def save_licenses(licenses):
    """Guarda las licencias en el archivo JSON"""
    with open(LICENSES_FILE, 'w') as f:
        json.dump(licenses, f, indent=4)

def generate_license_key():
    """Genera una clave de licencia aleatoria y segura"""
    chars = string.ascii_uppercase + string.digits
    key_parts = []
    for _ in range(5):
        part = ''.join(secrets.choice(chars) for _ in range(5))
        key_parts.append(part)
    return '-'.join(key_parts)

@app.route('/generate-license', methods=['POST'])
def generate_license():
    """Genera una nueva licencia"""
    try:
        data = request.json
        access_code = data.get('accessCode')
        client_name = data.get('clientName')
        client_email = data.get('clientEmail')
        license_type = data.get('licenseType')

        if not all([access_code, client_name, client_email, license_type]):
            return jsonify({'error': 'Faltan datos requeridos'}), 400

        if access_code not in VALID_ACCESS_CODES:
            return jsonify({'error': 'Código de acceso inválido'}), 400

        # Generar licencia
        license_key = generate_license_key()
        duration_days = 15 if license_type == 'trial' else 365
        expiry_date = datetime.now() + timedelta(days=duration_days)

        # Crear nueva licencia
        new_license = {
            'client_name': client_name,
            'client_email': client_email,
            'access_code': access_code,
            'license_key': license_key,
            'type': license_type,
            'duration_days': duration_days,
            'expiry_date': expiry_date.strftime('%Y-%m-%d'),
            'is_active': False,
            'activation_date': None,
            'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }

        # Guardar en el archivo
        licenses = load_licenses()
        licenses.append(new_license)
        save_licenses(licenses)

        # Enviar correo electrónico
        email_sent = send_license_email(
            client_email,
            client_name,
            license_key,
            license_type,
            expiry_date.strftime('%Y-%m-%d')
        )

        if not email_sent:
            print(f"Advertencia: No se pudo enviar el correo a {client_email}")

        return jsonify({
            'success': True,
            'license_key': license_key,
            'client_name': client_name,
            'client_email': client_email,
            'type': license_type,
            'duration_days': duration_days,
            'expiry_date': expiry_date.strftime('%Y-%m-%d')
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/activate-license', methods=['POST'])
def activate_license():
    """Activa una licencia existente"""
    try:
        data = request.json
        license_key = data.get('licenseKey')
        access_code = data.get('accessCode')

        if not all([license_key, access_code]):
            return jsonify({'error': 'Faltan datos requeridos'}), 400

        if access_code not in VALID_ACCESS_CODES:
            return jsonify({'error': 'Código de acceso inválido'}), 400

        # Buscar la licencia
        licenses = load_licenses()
        license_data = next((l for l in licenses if l['license_key'] == license_key), None)

        if not license_data:
            return jsonify({'error': 'Licencia no encontrada'}), 404

        if license_data['is_active']:
            return jsonify({'error': 'La licencia ya está activada'}), 400

        # Activar licencia
        license_data['is_active'] = True
        license_data['activation_date'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        save_licenses(licenses)

        return jsonify({
            'success': True,
            'client_name': license_data['client_name'],
            'type': license_data['type'],
            'license_key': license_key,
            'activation_date': license_data['activation_date'],
            'expiry_date': license_data['expiry_date']
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/verify-license', methods=['POST'])
def verify_license():
    """Verifica el estado de una licencia"""
    try:
        data = request.json
        license_key = data.get('licenseKey')
        access_code = data.get('accessCode')

        if not all([license_key, access_code]):
            return jsonify({'error': 'Faltan datos requeridos'}), 400

        if access_code not in VALID_ACCESS_CODES:
            return jsonify({'error': 'Código de acceso inválido'}), 400

        # Buscar la licencia
        licenses = load_licenses()
        license_data = next((l for l in licenses if l['license_key'] == license_key), None)

        if not license_data:
            return jsonify({
                'success': True,
                'valid': False,
                'message': 'Licencia no encontrada'
            })

        if not license_data['is_active']:
            return jsonify({
                'success': True,
                'valid': False,
                'message': 'Licencia no activada'
            })

        if datetime.now() > datetime.strptime(license_data['expiry_date'], '%Y-%m-%d'):
            return jsonify({
                'success': True,
                'valid': False,
                'message': 'Licencia expirada'
            })

        return jsonify({
            'success': True,
            'valid': True,
            'client_name': license_data['client_name'],
            'type': license_data['type'],
            'activation_date': license_data['activation_date'],
            'expiry_date': license_data['expiry_date']
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001) 