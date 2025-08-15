import { z } from 'zod'
import { NameSchema, UrlSchema, DogBreedSchema } from './common'

// Testimonial schema
export const TestimonialSchema = z.object({
  id: z.string().uuid("ID debe ser un UUID válido"),
  
  name: NameSchema,
  
  content: z
    .string()
    .min(10, "Testimonio debe tener al menos 10 caracteres")
    .max(500, "Testimonio no puede exceder 500 caracteres")
    .transform(val => val.trim()),
  
  rating: z
    .number()
    .min(1, "Calificación debe ser al menos 1")
    .max(5, "Calificación no puede ser mayor a 5")
    .int("Calificación debe ser un número entero")
    .default(5),
  
  dogName: z
    .string()
    .min(1, "Nombre del perro es requerido")
    .max(30, "Nombre del perro no puede exceder 30 caracteres")
    .transform(val => val.trim())
    .optional(),
  
  dogBreed: DogBreedSchema.optional(),
  
  image: UrlSchema,
  
  location: z
    .string()
    .max(50, "Ubicación no puede exceder 50 caracteres")
    .optional(),
  
  serviceType: z
    .enum(["personalizado", "grupal", "k9"])
    .optional(),
  
  date: z
    .date()
    .or(z.string().datetime())
    .transform(val => typeof val === 'string' ? new Date(val) : val),
  
  isVerified: z.boolean().default(false),
  
  isPublished: z.boolean().default(true),
})

// Service schema
export const ServiceSchema = z.object({
  id: z.string().uuid("ID debe ser un UUID válido"),
  
  title: z
    .string()
    .min(5, "Título debe tener al menos 5 caracteres")
    .max(100, "Título no puede exceder 100 caracteres")
    .transform(val => val.trim()),
  
  description: z
    .string()
    .min(20, "Descripción debe tener al menos 20 caracteres")
    .max(500, "Descripción no puede exceder 500 caracteres")
    .transform(val => val.trim()),
  
  features: z
    .array(z.string().min(1, "Característica no puede estar vacía").max(100))
    .min(1, "Debe incluir al menos una característica")
    .max(10, "No puede tener más de 10 características"),
  
  level: z
    .enum(["basico", "intermedio", "avanzado"])
    .optional(),
  
  type: z.enum(["personalizado", "grupal", "k9", "otros"]),
  
  duration: z
    .string()
    .min(1, "Duración es requerida")
    .max(50, "Duración no puede exceder 50 caracteres"),
  
  targetAudience: z
    .string()
    .max(200, "Audiencia objetivo no puede exceder 200 caracteres")
    .optional(),
  
  prerequisites: z
    .array(z.string().max(100))
    .default([]),
  
  image: UrlSchema,
  
  isActive: z.boolean().default(true),
  
  order: z
    .number()
    .int("Orden debe ser un número entero")
    .min(0, "Orden debe ser mayor o igual a 0")
    .default(0),
})

// Course package schema
export const CoursePackageSchema = z.object({
  id: z.string().uuid("ID debe ser un UUID válido"),
  
  name: z
    .string()
    .min(5, "Nombre debe tener al menos 5 caracteres")
    .max(100, "Nombre no puede exceder 100 caracteres")
    .transform(val => val.trim()),
  
  duration: z
    .string()
    .min(1, "Duración es requerida")
    .max(50, "Duración no puede exceder 50 caracteres"),
  
  features: z
    .array(z.string().min(1).max(100))
    .min(1, "Debe incluir al menos una característica")
    .max(15, "No puede tener más de 15 características"),
  
  includes: z
    .array(z.string().min(1).max(100))
    .min(1, "Debe incluir al menos un elemento")
    .max(10, "No puede tener más de 10 elementos incluidos"),
  
  targetBreed: DogBreedSchema.optional(),
  
  level: z
    .enum(["basico", "intermedio", "avanzado"])
    .default("basico"),
  
  maxParticipants: z
    .number()
    .int("Máximo de participantes debe ser un número entero")
    .min(1, "Debe permitir al menos 1 participante")
    .max(20, "No puede tener más de 20 participantes")
    .default(8),
  
  ageRange: z
    .string()
    .max(50, "Rango de edad no puede exceder 50 caracteres")
    .optional(),
  
  image: UrlSchema,
  
  isActive: z.boolean().default(true),
  
  order: z
    .number()
    .int("Orden debe ser un número entero")
    .min(0, "Orden debe ser mayor o igual a 0")
    .default(0),
})

// FAQ schema
export const FAQSchema = z.object({
  id: z.string().uuid("ID debe ser un UUID válido"),
  
  question: z
    .string()
    .min(10, "Pregunta debe tener al menos 10 caracteres")
    .max(200, "Pregunta no puede exceder 200 caracteres")
    .transform(val => val.trim()),
  
  answer: z
    .string()
    .min(20, "Respuesta debe tener al menos 20 caracteres")
    .max(1000, "Respuesta no puede exceder 1000 caracteres")
    .transform(val => val.trim()),
  
  category: z
    .enum([
      "general",
      "adiestramiento", 
      "precios",
      "metodologia",
      "k9",
      "cachorros",
      "problemas_comportamiento"
    ])
    .default("general"),
  
  isPublished: z.boolean().default(true),
  
  order: z
    .number()
    .int("Orden debe ser un número entero")
    .min(0, "Orden debe ser mayor o igual a 0")
    .default(0),
  
  tags: z
    .array(z.string().min(1).max(30))
    .default([]),
})

// Blog post schema (for future content)
export const BlogPostSchema = z.object({
  id: z.string().uuid("ID debe ser un UUID válido"),
  
  title: z
    .string()
    .min(10, "Título debe tener al menos 10 caracteres")
    .max(100, "Título no puede exceder 100 caracteres")
    .transform(val => val.trim()),
  
  slug: z
    .string()
    .min(5, "Slug debe tener al menos 5 caracteres")
    .max(100, "Slug no puede exceder 100 caracteres")
    .regex(/^[a-z0-9-]+$/, "Slug solo puede contener letras minúsculas, números y guiones"),
  
  excerpt: z
    .string()
    .min(50, "Extracto debe tener al menos 50 caracteres")
    .max(300, "Extracto no puede exceder 300 caracteres")
    .transform(val => val.trim()),
  
  content: z
    .string()
    .min(100, "Contenido debe tener al menos 100 caracteres")
    .max(10000, "Contenido no puede exceder 10000 caracteres"),
  
  author: NameSchema,
  
  publishedAt: z
    .date()
    .or(z.string().datetime())
    .transform(val => typeof val === 'string' ? new Date(val) : val),
  
  updatedAt: z
    .date()
    .or(z.string().datetime())
    .transform(val => typeof val === 'string' ? new Date(val) : val)
    .optional(),
  
  featuredImage: UrlSchema,
  
  category: z
    .enum([
      "adiestramiento",
      "consejos",
      "casos_exito", 
      "metodologia",
      "k9",
      "salud_canina",
      "comportamiento"
    ]),
  
  tags: z
    .array(z.string().min(1).max(30))
    .max(10, "No puede tener más de 10 etiquetas")
    .default([]),
  
  isPublished: z.boolean().default(false),
  
  isFeatured: z.boolean().default(false),
  
  readingTime: z
    .number()
    .int("Tiempo de lectura debe ser un número entero")
    .min(1, "Tiempo de lectura debe ser al menos 1 minuto")
    .optional(),
})

// Type exports
export type Testimonial = z.infer<typeof TestimonialSchema>
export type Service = z.infer<typeof ServiceSchema>
export type CoursePackage = z.infer<typeof CoursePackageSchema>
export type FAQ = z.infer<typeof FAQSchema>
export type BlogPost = z.infer<typeof BlogPostSchema>

// Validation helper functions
export const validateTestimonial = (data: unknown) => {
  return TestimonialSchema.safeParse(data)
}

export const validateService = (data: unknown) => {
  return ServiceSchema.safeParse(data)
}

export const validateCoursePackage = (data: unknown) => {
  return CoursePackageSchema.safeParse(data)
}

export const validateFAQ = (data: unknown) => {
  return FAQSchema.safeParse(data)
}

export const validateBlogPost = (data: unknown) => {
  return BlogPostSchema.safeParse(data)
}