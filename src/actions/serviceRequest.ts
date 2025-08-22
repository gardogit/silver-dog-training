"use server";

import { z } from "zod";
import { transporter } from "@/lib/nodemailer"; 

const RequestSchema = z.object({
  email: z.string().email("Por favor, introduce un correo válido."),
  serviceName: z.string().min(1, "El nombre del servicio es requerido."),
});

export interface ServiceRequestState {
  message: string;
  success?: boolean;
}

export async function submitServiceRequest(
  prevState: ServiceRequestState,
  formData: FormData
): Promise<ServiceRequestState> {
  const validatedFields = RequestSchema.safeParse({
    email: formData.get("email"),
    serviceName: formData.get("serviceName"),
  });

  if (!validatedFields.success) {
    // Si falla la validación, devolvemos el primer error encontrado
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      message: firstError || "Error de validación.",
      success: false,
    };
  }

  const { email, serviceName } = validatedFields.data;

  // --- Lógica de envío de correo con Nodemailer ---
  try {
    // Definimos las opciones para el correo de solicitud de servicio
    await transporter.sendMail({
      from: `"Silver Dog Web" <${process.env.GMAIL_EMAIL}>`,
      replyTo: email, // Para que al responder, se le responda al usuario
      to: process.env.GMAIL_EMAIL, // El correo de destino es CONTACT_FORM_RECIPIENT. Por motivos de pruebas se usará el correo de Gmail.
      subject: `${serviceName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #cb6622;">Nueva Solicitud de Servicio Recibida</h2>
          <p>Un usuario ha solicitado información sobre un paquete de servicio a través del sitio web.</p>
          <hr style="border: none; border-top: 1px solid #eee;">
          <p style="font-size: 1.1em;"><strong>Servicio Solicitado:</strong> ${serviceName}</p>
          <p style="font-size: 1.1em;"><strong>Correo del Solicitante:</strong> <a href="mailto:${email}" style="color: #cb6622;">${email}</a></p>
          <hr style="border: none; border-top: 1px solid #eee;">
          <p><strong>Próximos Pasos Sugeridos:</strong></p>
          <ol>
            <li>Contactar al usuario a través de su correo electrónico para confirmar la recepción.</li>
            <li>Coordinar una evaluación inicial o proveer más detalles sobre el paquete.</li>
          </ol>
          <p style="font-size: 0.9em; color: #777;">Este es un correo automático generado desde el modal de solicitud de servicios.</p>
        </div>
      `,
    });

    // Si el correo se envía con éxito, devolvemos el estado de éxito
    return {
      message: "¡Solicitud enviada! Te contactaremos pronto.",
      success: true,
    };

  } catch (error) {
    console.error("Error al enviar la solicitud de servicio:", error);
    // Si falla el envío del correo, devolvemos un estado de error
    return {
      message: "Hubo un error en el servidor al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.",
      success: false,
    };
  }
}