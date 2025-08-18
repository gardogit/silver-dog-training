"use server";

import { z } from "zod";

const RequestSchema = z.object({
  email: z.string().email("Por favor, introduce un correo válido."),
  serviceName: z.string(),
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
    return {
      message:
        validatedFields.error.flatten().fieldErrors.email?.[0] ||
        "Error de validación.",
      success: false,
    };
  }

  const { email, serviceName } = validatedFields.data;

  console.log("--- Nueva Solicitud de Servicio ---");
  console.log(`Correo del Solicitante: ${email}`);
  console.log(`Servicio Solicitado: ${serviceName}`);
  console.log("------------------------------------");

  // Aquí iría la lógica para enviar el correo a silverdogtraining88@gmail.com
  // con un servicio como Resend, Nodemailer, etc.

  return {
    message: "¡Solicitud enviada! Te contactaremos pronto.",
    success: true,
  };
}
