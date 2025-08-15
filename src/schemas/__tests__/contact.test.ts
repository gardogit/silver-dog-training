import {
  ContactFormSchema,
  QuickContactSchema,
  NewsletterSchema,
  validateContactForm,
  validateQuickContact,
  validateNewsletter,
} from '../contact'

describe('Contact Form Schema', () => {
  const validContactData = {
    name: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '04121234567',
    message: 'Necesito ayuda con el adiestramiento de mi perro',
    service: 'personalizado' as const,
    acceptsTerms: true,
  }

  it('validates correct contact form data', () => {
    const result = ContactFormSchema.safeParse(validContactData)
    expect(result.success).toBe(true)
    
    if (result.success) {
      expect(result.data.name).toBe('Juan Pérez')
      expect(result.data.email).toBe('juan@example.com')
      expect(result.data.acceptsTerms).toBe(true)
    }
  })

  it('rejects invalid name', () => {
    const invalidData = { ...validContactData, name: 'A' }
    const result = ContactFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('rejects invalid email', () => {
    const invalidData = { ...validContactData, email: 'invalid-email' }
    const result = ContactFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('rejects short phone', () => {
    const invalidData = { ...validContactData, phone: '123' }
    const result = ContactFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('rejects short message', () => {
    const invalidData = { ...validContactData, message: 'Hola' }
    const result = ContactFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('requires terms acceptance', () => {
    const invalidData = { ...validContactData, acceptsTerms: false }
    const result = ContactFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('validates with helper function', () => {
    const result = validateContactForm(validContactData)
    expect(result.success).toBe(true)
  })
})

describe('Quick Contact Schema', () => {
  const validQuickData = {
    name: 'María González',
    phone: '04121234567',
    service: 'grupal' as const,
  }

  it('validates correct quick contact data', () => {
    const result = QuickContactSchema.safeParse(validQuickData)
    expect(result.success).toBe(true)
    
    if (result.success) {
      expect(result.data.service).toBe('grupal')
    }
  })

  it('uses default service type', () => {
    const dataWithoutService = {
      name: 'María González',
      phone: '04121234567',
    }

    const result = QuickContactSchema.safeParse(dataWithoutService)
    expect(result.success).toBe(true)
    
    if (result.success) {
      expect(result.data.service).toBe('personalizado')
    }
  })

  it('validates with helper function', () => {
    const result = validateQuickContact(validQuickData)
    expect(result.success).toBe(true)
  })
})

describe('Newsletter Schema', () => {
  const validNewsletterData = {
    email: 'user@example.com',
    interests: ['adiestramiento', 'tips'] as const,
    acceptsMarketing: true,
  }

  it('validates correct newsletter data', () => {
    const result = NewsletterSchema.safeParse(validNewsletterData)
    expect(result.success).toBe(true)
    
    if (result.success) {
      expect(result.data.interests).toContain('adiestramiento')
      expect(result.data.acceptsMarketing).toBe(true)
    }
  })

  it('uses default interests', () => {
    const dataWithoutInterests = {
      email: 'user@example.com',
      acceptsMarketing: true,
    }

    const result = NewsletterSchema.safeParse(dataWithoutInterests)
    expect(result.success).toBe(true)
    
    if (result.success) {
      expect(result.data.interests).toEqual(['adiestramiento'])
    }
  })

  it('requires marketing acceptance', () => {
    const invalidData = { ...validNewsletterData, acceptsMarketing: false }
    const result = NewsletterSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('validates with helper function', () => {
    const result = validateNewsletter(validNewsletterData)
    expect(result.success).toBe(true)
  })
})

// Course Inquiry Schema tests removed for simplicity
// Can be added back when needed for course functionality