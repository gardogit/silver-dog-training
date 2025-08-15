import {
  createFormValidator,
  validateField,
  validateAsync,
  sanitizeFormData,
  errorMessages,
  ContactFormSchema,
  NameSchema,
} from '../index'

describe('Schema Utilities', () => {
  describe('createFormValidator', () => {
    const validator = createFormValidator<{ name: string }>(NameSchema)

    it('returns success for valid data', () => {
      const result = validator('Juan Pérez')
      expect(result.success).toBe(true)
      expect(result.data).toBe('Juan Pérez')
      expect(result.errors).toBeUndefined()
    })

    it('returns errors for invalid data', () => {
      const result = validator('A')
      expect(result.success).toBe(false)
      expect(result.data).toBeUndefined()
      expect(result.errors).toBeDefined()
      expect(result.errors!.length).toBeGreaterThan(0)
    })

    it('formats error messages with field paths', () => {
      const contactValidator = createFormValidator(ContactFormSchema)
      const result = contactValidator({
        name: 'Juan',
        email: 'invalid-email',
        phone: '123',
        message: 'Hi',
        acceptsTerms: false,
      })

      expect(result.success).toBe(false)
      expect(result.errors).toBeDefined()
      expect(result.errors!.length).toBeGreaterThan(0)
    })
  })

  describe('validateField', () => {
    it('validates single field successfully', () => {
      const result = validateField(NameSchema, 'Juan Pérez')
      expect(result.isValid).toBe(true)
      expect(result.error).toBeNull()
    })

    it('returns error for invalid field', () => {
      const result = validateField(NameSchema, 'A')
      expect(result.isValid).toBe(false)
      expect(typeof result.error).toBe('string')
    })

    it('returns generic error message for unknown errors', () => {
      const result = validateField(NameSchema, null)
      expect(result.isValid).toBe(false)
      expect(typeof result.error).toBe('string')
    })
  })

  describe('validateAsync', () => {
    it('validates data asynchronously', async () => {
      const result = await validateAsync(NameSchema, 'Juan Pérez')
      expect(result.success).toBe(true)
      expect(result.data).toBe('Juan Pérez')
    })

    it('handles async validation errors', async () => {
      const result = await validateAsync(NameSchema, 'A')
      expect(result.success).toBe(false)
      expect(result.errors).toBeDefined()
      expect(result.errors!.length).toBeGreaterThan(0)
    })

    it('handles validation exceptions', async () => {
      // Create a schema that throws during parsing
      const throwingSchema = {
        parseAsync: async () => {
          throw new Error('Validation failed')
        }
      }

      const result = await validateAsync(throwingSchema, 'test')
      expect(result.success).toBe(false)
      expect(result.errors).toEqual(['Error de validación'])
    })
  })

  describe('sanitizeFormData', () => {
    it('trims string values', () => {
      const data = {
        name: '  Juan Pérez  ',
        email: '  user@example.com  ',
        age: 25,
      }

      const sanitized = sanitizeFormData(data)
      expect(sanitized.name).toBe('Juan Pérez')
      expect(sanitized.email).toBe('user@example.com')
      expect(sanitized.age).toBe(25)
    })

    it('converts empty strings to undefined', () => {
      const data = {
        name: 'Juan',
        optional: '',
        whitespace: '   ',
      }

      const sanitized = sanitizeFormData(data)
      expect(sanitized.name).toBe('Juan')
      expect(sanitized.optional).toBeUndefined()
      expect(sanitized.whitespace).toBeUndefined()
    })

    it('filters empty strings from arrays', () => {
      const data = {
        interests: ['adiestramiento', '', 'tips', '   '],
        numbers: [1, 2, 3],
      }

      const sanitized = sanitizeFormData(data)
      expect(sanitized.interests).toEqual(['adiestramiento', 'tips'])
      expect(sanitized.numbers).toEqual([1, 2, 3])
    })

    it('preserves non-string values', () => {
      const data = {
        name: 'Juan',
        age: 25,
        active: true,
        metadata: { key: 'value' },
        tags: null,
      }

      const sanitized = sanitizeFormData(data)
      expect(sanitized.name).toBe('Juan')
      expect(sanitized.age).toBe(25)
      expect(sanitized.active).toBe(true)
      expect(sanitized.metadata).toEqual({ key: 'value' })
      expect(sanitized.tags).toBeNull()
    })
  })

  describe('errorMessages', () => {
    it('provides static error messages', () => {
      expect(errorMessages.required).toBe('Este campo es requerido')
      expect(errorMessages.email).toBe('Email inválido')
      expect(errorMessages.phone).toBe('Teléfono inválido')
      expect(errorMessages.pattern).toBe('Formato inválido')
      expect(errorMessages.terms).toBe('Debe aceptar los términos y condiciones')
      expect(errorMessages.privacy).toBe('Debe aceptar la política de privacidad')
    })

    it('provides dynamic error message functions', () => {
      expect(errorMessages.minLength(5)).toBe('Debe tener al menos 5 caracteres')
      expect(errorMessages.maxLength(100)).toBe('No puede exceder 100 caracteres')
      expect(errorMessages.min(18)).toBe('Debe ser mayor o igual a 18')
      expect(errorMessages.max(65)).toBe('Debe ser menor o igual a 65')
    })
  })

  describe('Schema Exports', () => {
    it('exports all contact schemas', () => {
      expect(ContactFormSchema).toBeDefined()
      expect(typeof ContactFormSchema.safeParse).toBe('function')
    })

    it('exports common schemas', () => {
      expect(NameSchema).toBeDefined()
      expect(typeof NameSchema.safeParse).toBe('function')
    })

    it('exports validation functions', () => {
      expect(typeof createFormValidator).toBe('function')
      expect(typeof validateField).toBe('function')
      expect(typeof validateAsync).toBe('function')
      expect(typeof sanitizeFormData).toBe('function')
    })
  })
})