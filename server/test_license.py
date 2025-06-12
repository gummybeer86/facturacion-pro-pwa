import requests
import json

BASE_URL = 'http://localhost:5000'

def test_generate_license():
    """Prueba la generación de una licencia"""
    data = {
        'clientName': 'Usuario de Prueba',
        'clientEmail': 'test@example.com',
        'licenseType': 'trial'
    }
    
    response = requests.post(f'{BASE_URL}/generate-license', json=data)
    print("\nPrueba de generación de licencia:")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.json().get('license_key')

def test_activate_license(license_key):
    """Prueba la activación de una licencia"""
    data = {
        'licenseKey': license_key
    }
    
    response = requests.post(f'{BASE_URL}/activate-license', json=data)
    print("\nPrueba de activación de licencia:")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

def test_verify_license(license_key):
    """Prueba la verificación de una licencia"""
    data = {
        'licenseKey': license_key
    }
    
    response = requests.post(f'{BASE_URL}/verify-license', json=data)
    print("\nPrueba de verificación de licencia:")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

if __name__ == "__main__":
    # Ejecutar pruebas
    license_key = test_generate_license()
    if license_key:
        test_activate_license(license_key)
        test_verify_license(license_key) 