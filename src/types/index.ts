// Base types for the Silver Dog Training website

export interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
  service?: 'personalizado' | 'grupal' | 'k9' | 'otros'
}

export interface Testimonial {
  id: string
  name: string
  content: string
  rating?: number
  dogName?: string
  dogBreed?: string
  image?: string
}

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  level?: 'básico' | 'medio' | 'avanzado'
  type: 'personalizado' | 'grupal' | 'k9' | 'otros'
}

export interface CoursePackage {
  id: string
  name: string
  duration: string
  features: string[]
  includes: string[]
  targetBreed?: string
}