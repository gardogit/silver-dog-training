"use server";

import { transporter } from "@/lib/nodemailer";
import { SimpleContactSchema } from "@/schemas/contact";

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
  fields?: {
    // Para guardar los datos del usuario en caso de error
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
  };
  isSuccess: boolean;
}

// Mapeo de valores de subject a texto legible
const subjectMap: { [key: string]: string } = {
  clase_personalizada: "Información sobre Clases Personalizadas",
  clase_grupal: "Información sobre Clases Grupales",
  entrenamiento_k9: "Información sobre Entrenamiento K9",
  consulta_general: "Consulta General",
  otro: "Otro Asunto",
};

export async function sendContactEmail(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawFormData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
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

  // 3. Si la validación es exitosa, proceder a enviar el correo con Nodemailer
  const { name, email, phone, subject, message } = validatedFields.data;

  try {
    // Opciones del correo
    const mailOptions = {
      from: `"Silver Dog Web" <${process.env.GMAIL_EMAIL}>`, // Tu correo
      replyTo: email,
      to: process.env.GMAIL_EMAIL, // El correo de destino
      subject: `${subjectMap[subject] || subject}`,
      html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2 style="color: #cb6622;">Nuevo Mensaje desde la Web</h2>
                    <p>Has recibido un nuevo mensaje a través del formulario de contacto de Silver Dog Training.</p>
                    <hr>
                    <p><strong>Nombre:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Teléfono / WhatsApp:</strong> ${phone}</p>
                    <p><strong>Asunto:</strong> ${
                      subjectMap[subject] || subject
                    }</p>
                    <p><strong>Mensaje:</strong></p>
                    <p style="padding: 10px; border-left: 3px solid #eee;">${message.replace(
                      /\n/g,
                      "<br>"
                    )}</p>
                    <hr>
                    <p style="font-size: 0.9em; color: #777;">Este es un correo automático enviado desde el sitio web.</p>
                </div>
            `,
    };

    // Enviamos el correo
    await transporter.sendMail(mailOptions);

    return {
      message:
        "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.",
      isSuccess: true,
    };
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return {
      message:
        "Error del servidor al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.",
      isSuccess: false,
      fields: rawFormData,
    };
  }
}
