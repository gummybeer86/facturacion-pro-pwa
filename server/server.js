const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'chapamarket'
});

// Configuración del correo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Endpoint para enviar licencia
app.post('/api/send-license', async (req, res) => {
    try {
        const { email, licenseKey, clientName } = req.body;
        
        // Guardar en la base de datos
        const [result] = await pool.execute(
            'INSERT INTO licenses (email, license_key, client_name, created_at) VALUES (?, ?, ?, NOW())',
            [email, licenseKey, clientName]
        );

        // Enviar correo
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Tu Licencia de ChapaMarket',
            html: `
                <h1>¡Bienvenido a ChapaMarket!</h1>
                <p>Hola ${clientName},</p>
                <p>Gracias por adquirir ChapaMarket. Aquí está tu licencia:</p>
                <h2>${licenseKey}</h2>
                <p>Instrucciones:</p>
                <ol>
                    <li>Descarga la herramienta de diagnóstico desde nuestra página web</li>
                    <li>Ejecuta la herramienta</li>
                    <li>Ingresa tu licencia cuando se te solicite</li>
                </ol>
                <p>Si tienes alguna duda, no dudes en contactarnos.</p>
                <p>Saludos,<br>Equipo ChapaMarket</p>
            `
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Licencia enviada correctamente' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error al enviar la licencia' });
    }
});

// Endpoint para verificar licencia
app.post('/api/verify-license', async (req, res) => {
    try {
        const { licenseKey } = req.body;
        
        const [rows] = await pool.execute(
            'SELECT * FROM licenses WHERE license_key = ?',
            [licenseKey]
        );

        if (rows.length > 0) {
            res.json({ 
                success: true, 
                valid: true,
                clientName: rows[0].client_name,
                email: rows[0].email
            });
        } else {
            res.json({ 
                success: true, 
                valid: false 
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error al verificar la licencia' });
    }
});

// Endpoint para diagnóstico en línea
app.post('/api/diagnostic', async (req, res) => {
    try {
        const { systemInfo, licenseKey } = req.body;
        
        // Verificar licencia
        const [rows] = await pool.execute(
            'SELECT * FROM licenses WHERE license_key = ?',
            [licenseKey]
        );

        if (rows.length === 0) {
            return res.status(401).json({ 
                success: false, 
                message: 'Licencia inválida' 
            });
        }

        // Realizar diagnóstico
        const diagnostic = {
            systemStatus: 'OK',
            licenseStatus: 'Valid',
            recommendations: []
        };

        // Verificar conexión SAT
        try {
            const satResponse = await fetch('https://cfdiau.sat.gob.mx/nidp/app/login');
            diagnostic.satConnection = satResponse.ok ? 'OK' : 'Error';
        } catch (error) {
            diagnostic.satConnection = 'Error';
            diagnostic.recommendations.push('Verificar conexión a internet');
        }

        // Guardar diagnóstico
        await pool.execute(
            'INSERT INTO diagnostics (license_key, system_info, diagnostic_result, created_at) VALUES (?, ?, ?, NOW())',
            [licenseKey, JSON.stringify(systemInfo), JSON.stringify(diagnostic)]
        );

        res.json({ 
            success: true, 
            diagnostic 
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error al realizar el diagnóstico' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
}); 