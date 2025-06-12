const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const { spawn } = require('child_process');

// Configuración de la base de datos
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chapamarket'
};

// Middleware para verificar admin
const isAdmin = async (req, res, next) => {
    const { password } = req.body;
    if (password === 'C@talina15862025') {
        next();
    } else {
        res.status(401).json({ error: 'No autorizado' });
    }
};

// Generar licencia
router.post('/generate', isAdmin, async (req, res) => {
    try {
        const { email, type } = req.body;
        
        // Ejecutar script de Python
        const pythonProcess = spawn('python3', [
            'scripts/generate_license.py',
            '--email', email,
            '--type', type
        ]);

        let licenseKey = '';
        let error = '';

        pythonProcess.stdout.on('data', (data) => {
            licenseKey += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            error += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                return res.status(500).json({ error: 'Error al generar licencia' });
            }
            res.json({ licenseKey: licenseKey.trim() });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verificar licencia
router.post('/verify', async (req, res) => {
    try {
        const { licenseKey } = req.body;
        
        const pythonProcess = spawn('python3', [
            'scripts/generate_license.py',
            '--verify',
            '--key', licenseKey
        ]);

        let result = '';
        let error = '';

        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            error += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                return res.status(500).json({ error: 'Error al verificar licencia' });
            }
            res.json(JSON.parse(result));
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Registrar descarga
router.post('/download', async (req, res) => {
    try {
        const { licenseKey, platform, version } = req.body;
        const connection = await mysql.createConnection(dbConfig);

        // Verificar licencia
        const [license] = await connection.execute(
            'SELECT * FROM licenses WHERE license_key = ? AND status = "active"',
            [licenseKey]
        );

        if (!license.length) {
            return res.status(400).json({ error: 'Licencia inválida' });
        }

        // Registrar descarga
        await connection.execute(
            'INSERT INTO downloads (user_id, license_id, platform, version) VALUES (?, ?, ?, ?)',
            [license[0].user_id, license[0].id, platform, version]
        );

        // Obtener URL de descarga según plataforma
        const downloadUrl = platform === 'windows' 
            ? 'https://drive.google.com/file/d/14OtQDHHtsEyZucj3sNeQxlpqHyUelxjE/view?usp=drive_link'
            : 'https://drive.google.com/file/d/1GbApAQ4Eg7h1PCxLRje5SamUu172k8Rx/view?usp=drive_link';

        res.json({ downloadUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Listar licencias (solo admin)
router.get('/list', isAdmin, async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [licenses] = await connection.execute(`
            SELECT l.*, u.email, u.name
            FROM licenses l
            JOIN users u ON l.user_id = u.id
            ORDER BY l.created_at DESC
        `);
        res.json(licenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 