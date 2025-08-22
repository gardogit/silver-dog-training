'use server';

import mailchimp from '@mailchimp/mailchimp_marketing';
import { z } from 'zod';

export interface SubscribeState {
    message: string;
    success?: boolean;
}

const SubscribeSchema = z.object({
    email: z.string().email({ message: 'Por favor, introduce un correo válido.' }),
});

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX,
});

interface MailchimpErrorResponse {
    response?: {
        body?: {
            title?: string;
        };
    };
}

function isMailchimpError(error: unknown): error is MailchimpErrorResponse {
    return (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as MailchimpErrorResponse).response?.body?.title === 'string'
    );
}

export async function subscribeToNewsletter(
    prevState: SubscribeState,
    formData: FormData
): Promise<SubscribeState> {
    const validatedFields = SubscribeSchema.safeParse({
        email: formData.get('email'),
    });

    if (!validatedFields.success) {
        return {
            message: validatedFields.error.flatten().fieldErrors.email?.[0] || 'Error de validación.',
            success: false,
        };
    }

    const { email } = validatedFields.data;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

    if (!audienceId) {
        console.error('Mailchimp Audience ID no está configurado.');
        return {
            message: 'Error de configuración del servidor.',
            success: false,
        };
    }

    try {
        await mailchimp.lists.addListMember(audienceId, {
            email_address: email,
            status: 'subscribed',
        });

        return { message: '¡Gracias por suscribirte!', success: true };

    } catch (error) { 
        
        if (isMailchimpError(error) && error.response?.body?.title === 'Member Exists') {
            return { message: '¡Este correo ya está suscrito!', success: true };
        }

        console.error('Error al suscribir a Mailchimp:', error);
        return {
            message: 'Ocurrió un error en el servidor. Inténtalo de nuevo.',
            success: false,
        };
    }
}