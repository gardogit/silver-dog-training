import { z } from 'zod'
import { NameSchema, EmailSchema, PhoneSchema } from './common'

// Regex patterns for validation (imported from common for consistency)
// const phoneRegex = /^(\+?58)?[-.\s]?0?(\d{3})[-.\s]?(\d{3})[-.\s]?(\d{4})$/
// const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/

// Contact form schema with comprehensive validation
export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nombre debe tener al menos 2 caracteres")
    .max(50, "Nombre no puede exceder 50 caracteres"),
  
  email: z
    .string()
    .email("Email inválido")
    .max(100, "Email no puede exceder 100 caracteres"),
  
  phone: z
    .string()
    .min(10, "Teléfono debe tener al menos 10 dígitos")
    .max(20, "Teléfono no puede exceder 20 caracteres"),
  
  message: z
    .string()
    .min(10, "Mensaje debe tener al menos 10 caracteres")
    .max(1000, "Mensaje no puede exceder 1000 caracteres"),
  
  service: z
    .enum(["personalizado", "grupal", "k9", "otros"])
    .optional(),
  
  // Optional fields for better lead qualification
  dogName: z
    .string()
    .max(30, "Nombre del perro no puede exceder 30 caracteres")
    .optional(),
  
  dogBreed: z
    .string()
    .max(50, "Raza no puede exceder 50 caracteres")
    .optional(),
  
  dogAge: z
    .string()
    .max(20, "Edad no puede exceder 20 caracteres")
    .optional(),
  
  previousTraining: z
    .boolean()
    .optional(),
  
  urgency: z
    .enum(["baja", "media", "alta"])
    .default("media"),
  
  // Consent and privacy
  acceptsTerms: z
    .boolean()
    .refine(val => val === true, {
      message: "Debe aceptar los términos y condiciones"
    }),
  
  acceptsMarketing: z
    .boolean()
    .default(false),
})

// Quick contact schema for simple inquiries
export const QuickContactSchema = z.object({
  name: z
    .string()
    .min(2, "Nombre debe tener al menos 2 caracteres")
    .max(50, "Nombre no puede exceder 50 caracteres"),
  
  phone: z
    .string()
    .min(10, "Teléfono debe tener al menos 10 dígitos"),
  
  service: z
    .enum(["personalizado", "grupal", "k9", "otros"])
    .default("personalizado"),
})

// Newsletter subscription schema
export const NewsletterSchema = z.object({
  email: z
    .string()
    .email("Email inválido")
    .max(100, "Email no puede exceder 100 caracteres"),
  
  interests: z
    .array(z.enum(["adiestramiento", "k9", "tips", "eventos"]))
    .min(1, "Seleccione al menos un interés")
    .default(["adiestramiento"]),
  
  acceptsMarketing: z
    .boolean()
    .refine(val => val === true, {
      message: "Debe aceptar recibir comunicaciones de marketing"
    }),
})

// Course inquiry schema (simplified)
export const CourseInquirySchema = z.object({
  name: z
    .string()
    .min(2, "Nombre debe tener al menos 2 caracteres")
    .max(50, "Nombre no puede exceder 50 caracteres"),
  
  email: z
    .string()
    .email("Email inválido")
    .max(100, "Email no puede exceder 100 caracteres"),
  
  phone: z
    .string()
    .min(10, "Teléfono debe tener al menos 10 dígitos"),
  
  courseType: z
    .enum(["basico", "intermedio", "avanzado", "k9", "grupal"]),
  
  dogInfo: z.object({
    name: z
      .string()
      .min(1, "Nombre del perro es requerido")
      .max(30, "Nombre del perro no puede exceder 30 caracteres"),
    
    breed: z
      .string()
      .min(1, "Raza es requerida")
      .max(50, "Raza no puede exceder 50 caracteres"),
    
    age: z
      .string()
      .min(1, "Edad es requerida")
      .max(20, "Edad no puede exceder 20 caracteres"),
    
    weight: z
      .string()
      .max(20, "Peso no puede exceder 20 caracteres")
      .optional(),
    
    behaviorIssues: z
      .array(z.enum([
        "agresividad", 
        "ansiedad", 
        "ladridos_excesivos", 
        "destructividad", 
        "no_obedece", 
        "tira_correa",
        "otros"
      ]))
      .default([]),
  }),
  
  experience: z
    .enum(["ninguna", "basica", "intermedia", "avanzada"])
    .default("ninguna"),
  
  goals: z
    .string()
    .min(10, "Objetivos deben tener al menos 10 caracteres")
    .max(500, "Objetivos no pueden exceder 500 caracteres"),
  
  availability: z
    .array(z.enum([
      "lunes_manana", "lunes_tarde",
      "martes_manana", "martes_tarde", 
      "miercoles_manana", "miercoles_tarde",
      "jueves_manana", "jueves_tarde",
      "viernes_manana", "viernes_tarde",
      "sabado_manana", "sabado_tarde",
      "domingo_manana", "domingo_tarde"
    ]))
    .min(1, "Seleccione al menos una disponibilidad"),
  
  acceptsTerms: z
    .boolean()
    .refine(val => val === true, {
      message: "Debe aceptar los términos y condiciones"
    }),
})

// Schema específico para el formulario de contacto simple
export const SimpleContactSchema = z.object({
  name: NameSchema,
  email: EmailSchema,
  phone: PhoneSchema,
  subject: z.string().min(1, "Debes seleccionar un asunto"),
  message: z.string().min(10, "Mensaje debe tener al menos 10 caracteres"),
});

// Type exports
export type ContactFormData = z.infer<typeof ContactFormSchema>
export type SimpleContactData = z.infer<typeof SimpleContactSchema>;
export type QuickContactData = z.infer<typeof QuickContactSchema>
export type NewsletterData = z.infer<typeof NewsletterSchema>
export type CourseInquiryData = z.infer<typeof CourseInquirySchema>

// Validation helper functions
export const validateContactForm = (data: unknown) => {
  return ContactFormSchema.safeParse(data)
}

export const validateQuickContact = (data: unknown) => {
  return QuickContactSchema.safeParse(data)
}

export const validateNewsletter = (data: unknown) => {
  return NewsletterSchema.safeParse(data)
}

export const validateCourseInquiry = (data: unknown) => {
  return CourseInquirySchema.safeParse(data)
}