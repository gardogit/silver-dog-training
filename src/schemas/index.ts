// Export all schemas and types from a central location

// Contact schemas
export {
  ContactFormSchema,
  QuickContactSchema,
  NewsletterSchema,
  CourseInquirySchema,
  validateContactForm,
  validateQuickContact,
  validateNewsletter,
  validateCourseInquiry,
  type ContactFormData,
  type QuickContactData,
  type NewsletterData,
  type CourseInquiryData,
} from './contact'

// Common schemas and utilities
export {
  phoneRegex,
  nameRegex,
  urlRegex,
  NameSchema,
  EmailSchema,
  PhoneSchema,
  UrlSchema,
  ServiceTypeSchema,
  TrainingLevelSchema,
  DogBreedSchema,
  DogAgeSchema,
  BehaviorIssueSchema,
  ExperienceLevelSchema,
  UrgencyLevelSchema,
  AvailabilitySlotSchema,
  DogInfoSchema,
  AddressSchema,
  type ServiceType,
  type TrainingLevel,
  type DogBreed,
  type DogAge,
  type BehaviorIssue,
  type ExperienceLevel,
  type UrgencyLevel,
  type AvailabilitySlot,
  type DogInfo,
  type Address,
} from './common'

// Content schemas
export {
  TestimonialSchema,
  ServiceSchema,
  CoursePackageSchema,
  FAQSchema,
  BlogPostSchema,
  validateTestimonial,
  validateService,
  validateCoursePackage,
  validateFAQ,
  validateBlogPost,
  type Testimonial,
  type Service,
  type CoursePackage,
  type FAQ,
  type BlogPost,
} from './content'

// Utility functions for common validation patterns
export const createFormValidator = <T>(schema: { safeParse: (data: unknown) => { success: boolean; data?: T; error?: { errors?: { path?: string[]; message: string }[] } } }) => {
  return (data: unknown): { success: boolean; data?: T; errors?: string[] } => {
    const result = schema.safeParse(data)
    
    if (result.success) {
      return { success: true, data: result.data }
    }
    
    const errors = result.error?.errors?.map((err) => {
      const path = err.path?.length ? `${err.path.join('.')}: ` : ''
      return `${path}${err.message}`
    }) || ['Error de validación']
    
    return { success: false, errors }
  }
}

// Form field validation helpers
export const validateField = (schema: { safeParse: (value: unknown) => { success: boolean; error?: { errors?: { message: string }[] } } }, value: unknown) => {
  const result = schema.safeParse(value)
  return {
    isValid: result.success,
    error: result.success ? null : result.error?.errors?.[0]?.message || 'Valor inválido'
  }
}

// Async validation wrapper for server-side validation
export const validateAsync = async <T>(
  schema: { parseAsync: (data: unknown) => Promise<T> }, 
  data: unknown
): Promise<{ success: boolean; data?: T; errors?: string[] }> => {
  try {
    const result = await schema.parseAsync(data)
    return { success: true, data: result }
  } catch (error: unknown) {
    const zodError = error as { errors?: { path?: string[]; message: string }[] }
    const errors = zodError.errors?.map((err) => {
      const path = err.path?.length ? `${err.path.join('.')}: ` : ''
      return `${path}${err.message}`
    }) || ['Error de validación']
    
    return { success: false, errors }
  }
}

// Transform data before validation (useful for forms)
export const sanitizeFormData = (data: Record<string, unknown>) => {
  const sanitized: Record<string, unknown> = {}
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Trim whitespace and convert empty strings to undefined
      const trimmed = value.trim()
      sanitized[key] = trimmed === '' ? undefined : trimmed
    } else if (Array.isArray(value)) {
      // Filter out empty strings from arrays
      sanitized[key] = value.filter(item => 
        typeof item === 'string' ? item.trim() !== '' : true
      )
    } else {
      sanitized[key] = value
    }
  }
  
  return sanitized
}

// Error message translations (Spanish)
export const errorMessages = {
  required: 'Este campo es requerido',
  email: 'Email inválido',
  phone: 'Teléfono inválido',
  minLength: (min: number) => `Debe tener al menos ${min} caracteres`,
  maxLength: (max: number) => `No puede exceder ${max} caracteres`,
  pattern: 'Formato inválido',
  min: (min: number) => `Debe ser mayor o igual a ${min}`,
  max: (max: number) => `Debe ser menor o igual a ${max}`,
  terms: 'Debe aceptar los términos y condiciones',
  privacy: 'Debe aceptar la política de privacidad',
} as const