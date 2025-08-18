'use server';

import { SimpleContactSchema } from '@/schemas/contact';

// Definimos el estado que nuestro formulario manejará
export interface ContactFormState {
    message: string;
    errors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        subject?: string[];
        message?: string[];
    };
    fields?: { // Para guardar los datos del usuario en caso de error
        name?: string;
        email?: string;
        phone?: string;
        subject?: string;
        message?: string;
    };
    isSuccess: boolean;
}

export async function sendContactEmail(
    prevState: ContactFormState, 
    formData: FormData
): Promise<ContactFormState> {
    const rawFormData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string,
    };

    // 1. Validar los datos con Zod
    const validatedFields = SimpleContactSchema.safeParse(rawFormData);
    
    // 2. Si la validación falla, devolver los errores
    if (!validatedFields.success) {
        return {
            message: "Por favor, corrige los errores en el formulario.",
            errors: validatedFields.error.flatten().fieldErrors,
            fields: rawFormData,
            isSuccess: false,
        };
    }

    // 3. Si la validación es exitosa, proceder a enviar el correo
    //    (Aquí es donde integrarías un servicio como Resend, SendGrid, o Nodemailer)
    const { name, email, phone, subject, message } = validatedFields.data;
    
    console.log('--- Nuevo Mensaje de Contacto ---');
    console.log(`Nombre: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Teléfono: ${phone}`);
    console.log(`Asunto: ${subject}`);
    console.log(`Mensaje: ${message}`);
    console.log('---------------------------------');
    
    // Simulación de envío de correo
    try {
        // await sendEmailWithResend({ ...validatedFields.data });
        return {
            message: "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.",
            isSuccess: true,
        };
    } catch {
        return {
            message: "Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.", 
            isSuccess: false,
            fields: rawFormData,
        };
    }
}