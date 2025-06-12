import { createTransport } from 'nodemailer';
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

// Configuración de la base de datos
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chapamarket'
};

// Configuración del correo
const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'tu_correo@gmail.com',
        pass: 'tu_contraseña_de_aplicacion'
    }
});

// Función para generar llave de licencia
function generateLicenseKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let key = '';
    for (let i = 0; i < 25; i++) {
        if (i > 0 && i % 5 === 0) key += '-';
        key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    try {
        const { name, email } = req.body;

        // Conectar a la base de datos
        const connection = await mysql.createConnection(dbConfig);

        // Crear usuario
        const [userResult] = await connection.execute(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [name, email]
        );
        const userId = userResult.insertId;

        // Generar licencia de prueba
        const licenseKey = generateLicenseKey();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 15); // 15 días de prueba

        await connection.execute(
            'INSERT INTO licenses (user_id, license_key, type, end_date) VALUES (?, ?, ?, ?)',
            [userId, licenseKey, 'trial', endDate]
        );

        // Leer plantilla de correo
        const templatePath = path.join(process.cwd(), 'templates', 'email_trial.html');
        let emailTemplate = fs.readFileSync(templatePath, 'utf8');
        emailTemplate = emailTemplate
            .replace('{{name}}', name)
            .replace('{{license_key}}', licenseKey);

        // Enviar correo
        await transporter.sendMail({
            from: 'ChapaMarket <noreply@chapamarket.com>',
            to: email,
            subject: 'Tu Licencia de Prueba - ChapaMarket',
            html: emailTemplate
        });

        res.status(200).json({ message: 'Registro exitoso' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al procesar el registro' });
    }
} 