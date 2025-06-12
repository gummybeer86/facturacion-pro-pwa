import os
import subprocess
import shutil

def build_diagnostic_tool():
    # Crear directorio para el build
    if not os.path.exists('build'):
        os.makedirs('build')
    
    # Copiar archivos necesarios
    shutil.copy('diagnostic_tool.py', 'build/')
    shutil.copy('requirements.txt', 'build/')
    
    # Crear directorio para imágenes
    os.makedirs('build/public/images', exist_ok=True)
    
    # Copiar logo
    if os.path.exists('public/images/chapamarket-logo.png'):
        shutil.copy('public/images/chapamarket-logo.png', 'build/public/images/')
    
    # Instalar dependencias
    subprocess.run(['pip3', 'install', '-r', 'requirements.txt'])
    subprocess.run(['pip3', 'install', 'pyinstaller'])
    
    # Empaquetar con PyInstaller
    subprocess.run([
        'python3', '-m', 'PyInstaller',
        '--onefile',
        '--windowed',
        '--icon=build/icon.ico',
        '--add-data', 'public/images/chapamarket-logo.png:public/images',
        '--name', 'ChapaMarketDiagnostic',
        'diagnostic_tool.py'
    ])
    
    print("¡Herramienta empaquetada exitosamente!")
    print("Los ejecutables se encuentran en la carpeta dist/")

if __name__ == "__main__":
    build_diagnostic_tool() 