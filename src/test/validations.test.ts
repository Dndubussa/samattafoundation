import { describe, it, expect } from 'vitest'
import {
  contactFormSchema,
  donationFormSchema,
  newsletterFormSchema,
} from '@/lib/validations'

describe('Form Validations', () => {
  describe('Contact Form Schema', () => {
    it('should validate a correct contact form', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '0712345678',
        subject: 'Inquiry about programs',
        message: 'I would like to learn more about your programs.',
      }

      const result = contactFormSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'not-an-email',
        phone: '0712345678',
        subject: 'Inquiry',
        message: 'I would like to learn more.',
      }

      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject short name', () => {
      const invalidData = {
        name: 'J',
        email: 'john@example.com',
        phone: '0712345678',
        subject: 'Inquiry',
        message: 'I would like to learn more.',
      }

      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject short message', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '0712345678',
        subject: 'Inquiry',
        message: 'Short',
      }

      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('Donation Form Schema', () => {
    it('should validate a correct donation form', () => {
      const validData = {
        donor_name: 'Jane Donor',
        donor_email: 'jane@example.com',
        donor_phone: '0712345678',
        amount: 50000,
        currency: 'TZS',
        campaign: 'General Fund',
        is_anonymous: false,
        message: 'Keep up the great work!',
      }

      const result = donationFormSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid amount', () => {
      const invalidData = {
        donor_name: 'Jane Donor',
        donor_email: 'jane@example.com',
        donor_phone: '0712345678',
        amount: 0,
        currency: 'TZS',
        campaign: 'General Fund',
        is_anonymous: false,
        message: 'Keep up the great work!',
      }

      const result = donationFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should allow anonymous donations without name', () => {
      const validData = {
        donor_name: '',
        donor_email: 'jane@example.com',
        donor_phone: '0712345678',
        amount: 50000,
        currency: 'TZS',
        campaign: 'General Fund',
        is_anonymous: true,
        message: 'Keep up the great work!',
      }

      const result = donationFormSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })
  })

  describe('Newsletter Form Schema', () => {
    it('should validate a correct email', () => {
      const validData = {
        email: 'subscriber@example.com',
      }

      const result = newsletterFormSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'not-an-email',
      }

      const result = newsletterFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject empty email', () => {
      const invalidData = {
        email: '',
      }

      const result = newsletterFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })
})
