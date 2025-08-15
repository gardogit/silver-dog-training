import {
  NameSchema,
  EmailSchema,
  PhoneSchema,
  UrlSchema,
  ServiceTypeSchema,
  DogInfoSchema,
  AddressSchema,
  phoneRegex,
  nameRegex,
  urlRegex,
} from '../common'

describe('Common Schemas', () => {
  describe('NameSchema', () => {
    it('validates correct names', () => {
      const validNames = ['Juan Pérez', 'María José', 'José Luis']
      
      validNames.forEach(name => {
        const result = NameSchema.safeParse(name)
        expect(result.success).toBe(true)
      })
    })

    it('accepts names with whitespace', () => {
      const result = NameSchema.safeParse('  Juan Pérez  ')
      expect(result.success).toBe(true)
    })

    it('accepts names with numbers (simplified validation)', () => {
      const result = NameSchema.safeParse('Juan123')
      expect(result.success).toBe(true)
    })

    it('rejects names too short', () => {
      const result = NameSchema.safeParse('A')
      expect(result.success).toBe(false)
    })

    it('rejects names too long', () => {
      const longName = 'A'.repeat(51)
      const result = NameSchema.safeParse(longName)
      expect(result.success).toBe(false)
    })
  })

  describe('EmailSchema', () => {
    it('validates correct emails', () => {
      const validEmails = [
        'user@example.com',
        'test.email@domain.co.ve',
        'user+tag@example.org'
      ]
      
      validEmails.forEach(email => {
        const result = EmailSchema.safeParse(email)
        expect(result.success).toBe(true)
      })
    })

    it('rejects invalid emails', () => {
      const invalidEmails = ['invalid', '@example.com', 'user@', 'user@.com']
      
      invalidEmails.forEach(email => {
        const result = EmailSchema.safeParse(email)
        expect(result.success).toBe(false)
      })
    })
  })

  describe('PhoneSchema', () => {
    it('validates Venezuelan phone formats', () => {
      const validPhones = [
        '+58 412 123 4567',
        '0412-123-4567',
        '0424.555.6789',
        '04141234567'
      ]
      
      validPhones.forEach(phone => {
        const result = PhoneSchema.safeParse(phone)
        expect(result.success).toBe(true)
      })
    })

    it('accepts formatted phone numbers', () => {
      const result = PhoneSchema.safeParse('+58 412-123.4567')
      expect(result.success).toBe(true)
    })

    it('rejects invalid phone formats', () => {
      const invalidPhones = ['123', '123456789012345678901', 'abc123']
      
      invalidPhones.forEach(phone => {
        const result = PhoneSchema.safeParse(phone)
        expect(result.success).toBe(false)
      })
    })
  })

  describe('UrlSchema', () => {
    it('validates correct URLs', () => {
      const validUrls = [
        'https://example.com',
        'http://www.example.com/path',
        'https://subdomain.example.com/path?query=value'
      ]
      
      validUrls.forEach(url => {
        const result = UrlSchema.safeParse(url)
        expect(result.success).toBe(true)
      })
    })

    it('allows undefined for optional URLs', () => {
      const result = UrlSchema.safeParse(undefined)
      expect(result.success).toBe(true)
    })

    it('rejects invalid URLs', () => {
      const invalidUrls = ['not-a-url', 'ftp://example.com', 'example.com']
      
      invalidUrls.forEach(url => {
        const result = UrlSchema.safeParse(url)
        expect(result.success).toBe(false)
      })
    })
  })

  describe('ServiceTypeSchema', () => {
    it('validates service types', () => {
      const validTypes = ['personalizado', 'grupal', 'k9', 'otros']
      
      validTypes.forEach(type => {
        const result = ServiceTypeSchema.safeParse(type)
        expect(result.success).toBe(true)
      })
    })

    it('rejects invalid service types', () => {
      const result = ServiceTypeSchema.safeParse('invalid')
      expect(result.success).toBe(false)
    })
  })

  describe('DogInfoSchema', () => {
    const validDogInfo = {
      name: 'Max',
      breed: 'labrador' as const,
      age: 'adulto_2_7_anos' as const,
      weight: 25,
      gender: 'macho' as const,
      isNeutered: true,
      behaviorIssues: ['ladridos_excesivos'] as const,
      medicalConditions: 'Ninguna',
      currentTraining: 'basica' as const,
    }

    it('validates complete dog information', () => {
      const result = DogInfoSchema.safeParse(validDogInfo)
      expect(result.success).toBe(true)
      
      if (result.success) {
        expect(result.data.name).toBe('Max')
        expect(result.data.behaviorIssues).toContain('ladridos_excesivos')
      }
    })

    it('uses default values for optional fields', () => {
      const minimalDogInfo = {
        name: 'Luna',
        breed: 'mestizo' as const,
        age: 'cachorro_2_6_meses' as const,
      }

      const result = DogInfoSchema.safeParse(minimalDogInfo)
      expect(result.success).toBe(true)
      
      if (result.success) {
        expect(result.data.behaviorIssues).toEqual([])
        expect(result.data.currentTraining).toBe('ninguna')
      }
    })

    it('validates weight range', () => {
      const invalidWeight = { ...validDogInfo, weight: 150 }
      const result = DogInfoSchema.safeParse(invalidWeight)
      expect(result.success).toBe(false)
    })
  })

  describe('AddressSchema', () => {
    const validAddress = {
      street: 'Av. Principal, Casa 123',
      city: 'Caracas',
      state: 'Distrito Capital',
      postalCode: '1010',
    }

    it('validates complete address', () => {
      const result = AddressSchema.safeParse(validAddress)
      expect(result.success).toBe(true)
    })

    it('validates address without postal code', () => {
      const addressWithoutPostal = { ...validAddress }
      delete (addressWithoutPostal as Record<string, unknown>).postalCode

      const result = AddressSchema.safeParse(addressWithoutPostal)
      expect(result.success).toBe(true)
    })

    it('rejects invalid postal code format', () => {
      const invalidPostal = { ...validAddress, postalCode: '12345' }
      const result = AddressSchema.safeParse(invalidPostal)
      expect(result.success).toBe(false)
    })
  })
})

describe('Regex Patterns', () => {
  describe('phoneRegex', () => {
    it('matches Venezuelan phone formats', () => {
      const validPhones = [
        '+58 412 123 4567',
        '0412-123-4567',
        '0424.555.6789',
        '04141234567',
        '+584121234567'
      ]
      
      validPhones.forEach(phone => {
        expect(phoneRegex.test(phone)).toBe(true)
      })
    })

    it('rejects invalid phone formats', () => {
      const invalidPhones = [
        '123',
        '123456789012345',
        'abc123',
        '+1 555 123 4567'
      ]
      
      invalidPhones.forEach(phone => {
        expect(phoneRegex.test(phone)).toBe(false)
      })
    })
  })

  describe('nameRegex', () => {
    it('matches valid names with Spanish characters', () => {
      const validNames = [
        'Juan Pérez',
        'María José',
        'José Luis Rodríguez',
        'Ñoño'
      ]
      
      validNames.forEach(name => {
        expect(nameRegex.test(name)).toBe(true)
      })
    })

    it('rejects names with numbers or special characters', () => {
      const invalidNames = [
        'Juan123',
        'María@example',
        'José-Luis',
        'User_Name'
      ]
      
      invalidNames.forEach(name => {
        expect(nameRegex.test(name)).toBe(false)
      })
    })
  })

  describe('urlRegex', () => {
    it('matches valid HTTP/HTTPS URLs', () => {
      const validUrls = [
        'https://example.com',
        'http://www.example.com',
        'https://subdomain.example.com/path?query=value#anchor'
      ]
      
      validUrls.forEach(url => {
        expect(urlRegex.test(url)).toBe(true)
      })
    })

    it('rejects invalid URLs', () => {
      const invalidUrls = [
        'ftp://example.com',
        'example.com',
        'not-a-url',
        'mailto:user@example.com'
      ]
      
      invalidUrls.forEach(url => {
        expect(urlRegex.test(url)).toBe(false)
      })
    })
  })
})