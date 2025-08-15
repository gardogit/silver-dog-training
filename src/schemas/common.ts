import { z } from 'zod'

// Common validation patterns
export const phoneRegex = /^(\+?58)?[-.\s]?0?(\d{3})[-.\s]?(\d{3})[-.\s]?(\d{4})$/
export const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
export const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/

// Base schemas for reuse
export const NameSchema = z
  .string()
  .min(2, "Nombre debe tener al menos 2 caracteres")
  .max(50, "Nombre no puede exceder 50 caracteres")

export const EmailSchema = z
  .string()
  .email("Email inválido")
  .max(100, "Email no puede exceder 100 caracteres")

export const PhoneSchema = z
  .string()
  .min(10, "Teléfono debe tener al menos 10 dígitos")
  .max(20, "Teléfono no puede exceder 20 caracteres")

export const UrlSchema = z
  .string()
  .regex(urlRegex, "URL inválida")
  .optional()

// Service types enum
export const ServiceTypeSchema = z.enum([
  "personalizado",
  "grupal", 
  "k9",
  "otros"
])

// Training levels enum
export const TrainingLevelSchema = z.enum([
  "basico",
  "intermedio", 
  "avanzado"
])

// Dog breeds (common Venezuelan breeds)
export const DogBreedSchema = z.enum([
  "mestizo",
  "labrador",
  "golden_retriever",
  "pastor_aleman",
  "rottweiler",
  "pitbull",
  "bulldog",
  "chihuahua",
  "poodle",
  "beagle",
  "boxer",
  "doberman",
  "husky",
  "border_collie",
  "cocker_spaniel",
  "dachshund",
  "yorkshire",
  "maltes",
  "schnauzer",
  "otros"
])

// Age ranges for dogs
export const DogAgeSchema = z.enum([
  "cachorro_2_6_meses",
  "cachorro_6_12_meses", 
  "joven_1_2_anos",
  "adulto_2_7_anos",
  "senior_7_mas_anos"
])

// Behavior issues enum
export const BehaviorIssueSchema = z.enum([
  "agresividad",
  "ansiedad_separacion",
  "ladridos_excesivos",
  "destructividad", 
  "no_obedece_comandos",
  "tira_de_la_correa",
  "salta_sobre_personas",
  "marca_territorio",
  "miedo_ruidos",
  "problemas_socializacion",
  "otros"
])

// Experience levels
export const ExperienceLevelSchema = z.enum([
  "ninguna",
  "basica",
  "intermedia", 
  "avanzada"
])

// Urgency levels
export const UrgencyLevelSchema = z.enum([
  "baja",
  "media",
  "alta"
])

// Availability slots
export const AvailabilitySlotSchema = z.enum([
  "lunes_manana", "lunes_tarde",
  "martes_manana", "martes_tarde",
  "miercoles_manana", "miercoles_tarde", 
  "jueves_manana", "jueves_tarde",
  "viernes_manana", "viernes_tarde",
  "sabado_manana", "sabado_tarde",
  "domingo_manana", "domingo_tarde"
])

// Common dog information schema
export const DogInfoSchema = z.object({
  name: NameSchema,
  breed: DogBreedSchema,
  age: DogAgeSchema,
  weight: z
    .number()
    .min(1, "Peso debe ser mayor a 1 kg")
    .max(100, "Peso debe ser menor a 100 kg")
    .optional(),
  gender: z
    .enum(["macho", "hembra"])
    .optional(),
  isNeutered: z.boolean().optional(),
  behaviorIssues: z.array(BehaviorIssueSchema).default([]),
  medicalConditions: z
    .string()
    .max(500, "Condiciones médicas no pueden exceder 500 caracteres")
    .optional(),
  currentTraining: ExperienceLevelSchema.default("ninguna"),
})

// Address schema for future use
export const AddressSchema = z.object({
  street: z
    .string()
    .min(5, "Dirección debe tener al menos 5 caracteres")
    .max(100, "Dirección no puede exceder 100 caracteres"),
  city: z
    .string()
    .min(2, "Ciudad debe tener al menos 2 caracteres")
    .max(50, "Ciudad no puede exceder 50 caracteres"),
  state: z
    .string()
    .min(2, "Estado debe tener al menos 2 caracteres")
    .max(50, "Estado no puede exceder 50 caracteres"),
  postalCode: z
    .string()
    .regex(/^\d{4}$/, "Código postal debe tener 4 dígitos")
    .optional(),
})

// Type exports
export type ServiceType = z.infer<typeof ServiceTypeSchema>
export type TrainingLevel = z.infer<typeof TrainingLevelSchema>
export type DogBreed = z.infer<typeof DogBreedSchema>
export type DogAge = z.infer<typeof DogAgeSchema>
export type BehaviorIssue = z.infer<typeof BehaviorIssueSchema>
export type ExperienceLevel = z.infer<typeof ExperienceLevelSchema>
export type UrgencyLevel = z.infer<typeof UrgencyLevelSchema>
export type AvailabilitySlot = z.infer<typeof AvailabilitySlotSchema>
export type DogInfo = z.infer<typeof DogInfoSchema>
export type Address = z.infer<typeof AddressSchema>