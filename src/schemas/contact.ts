import { z } from 'zod'

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Teléfono debe tener al menos 10 dígitos"),
  message: z.string().min(10, "Mensaje debe tener al menos 10 caracteres"),
  service: z.enum(["personalizado", "grupal", "k9", "otros"]).optional()
})

export type ContactFormData = z.infer<typeof ContactFormSchema>