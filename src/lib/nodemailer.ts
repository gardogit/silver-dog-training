import nodemailer from 'nodemailer';

// Extraemos las variables de entorno
const email = process.env.GMAIL_EMAIL;
const pass = process.env.GMAIL_APP_PASSWORD;

if (!email || !pass) {
    throw new Error('Las credenciales de correo electrónico no están definidas en las variables de entorno.');
}

// Creamos el "transporter" de Nodemailer, que es el objeto que envía los correos.
// Lo configuramos para usar el servicio de Gmail.
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: pass,
    },
});

// Definimos la estructura de las opciones del correo para tipado
export interface MailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}