from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import hashlib
import json
from datetime import datetime, timedelta
import os

app = Flask(__name__, static_folder='public')
CORS(app)  # Esto permite peticiones desde el frontend

class LicenseGenerator:
    def __init__(self):
        self.licenses_file = "licenses_record.json"
        self.load_licenses()

    def load_licenses(self):
        if os.path.exists(self.licenses_file):
            with open(self.licenses_file, 'r') as f:
                self.licenses = json.load(f)
        else:
            self.licenses = []

    def save_licenses(self):
        with open(self.licenses_file, 'w') as f:
            json.dump(self.licenses, f, indent=4)

    def generate_license(self, client_name, email, license_type="trial"):
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        unique_id = hashlib.md5(f"{client_name}{email}{timestamp}".encode()).hexdigest()[:8]
        
        created_date = datetime.now()
        if license_type == "trial":
            duration_days = 15
        else:  # full
            duration_days = 365

        license_key = f"{license_type.upper()}-{unique_id}-{email[:4].upper()}"
        
        license_record = {
            "license_key": license_key,
            "client_name": client_name,
            "email": email,
            "type": license_type,
            "created_date": created_date.strftime("%Y-%m-%d %H:%M:%S"),
            "duration_days": duration_days,
            "is_activated": False,
            "activation_date": None,
            "expiry_date": None
        }
        
        self.licenses.append(license_record)
        self.save_licenses()
        
        return license_record

    def activate_license(self, license_key):
        for license in self.licenses:
            if license["license_key"] == license_key and not license["is_activated"]:
                activation_date = datetime.now()
                license["is_activated"] = True
                license["activation_date"] = activation_date.strftime("%Y-%m-%d %H:%M:%S")
                license["expiry_date"] = (activation_date + timedelta(days=license["duration_days"])).strftime("%Y-%m-%d %H:%M:%S")
                self.save_licenses()
                return license
        return None

generator = LicenseGenerator()

@app.route('/')
def serve_index():
    return send_from_directory('public', 'index.html')

@app.route('/generate-license', methods=['POST'])
def generate_license():
    data = request.json
    client_name = data.get('clientName')
    email = data.get('clientEmail')
    license_type = data.get('licenseType', 'trial')
    
    if not client_name or not email:
        return jsonify({"error": "Faltan campos requeridos"}), 400
    
    try:
        license_data = generator.generate_license(client_name, email, license_type)
        return jsonify(license_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/activate-license', methods=['POST'])
def activate_license():
    data = request.json
    license_key = data.get('licenseKey')
    
    if not license_key:
        return jsonify({"error": "Falta la clave de licencia"}), 400
    
    try:
        license_data = generator.activate_license(license_key)
        if license_data:
            return jsonify(license_data)
        else:
            return jsonify({"error": "Licencia no encontrada o ya activada"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 