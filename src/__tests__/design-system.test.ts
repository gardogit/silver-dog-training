import { colors, spacing, borderRadius } from '@/lib/design-system'
import { cn } from '@/lib/utils'

describe('Design System', () => {
  test('colors should be defined correctly', () => {
    expect(colors.primary.DEFAULT).toBe('#cb6622')
    expect(colors.primary.light).toBe('#f9c4a2')
    expect(colors.secondary.DEFAULT).toBe('#4b5320')
    expect(colors.secondary.light).toBe('#abb155')
  })

  test('spacing should be defined correctly', () => {
    expect(spacing.xs).toBe('0.5rem')
    expect(spacing.sm).toBe('0.75rem')
    expect(spacing.md).toBe('1rem')
    expect(spacing.lg).toBe('1.5rem')
  })

  test('border radius should be defined correctly', () => {
    expect(borderRadius.sm).toBe('0.375rem')
    expect(borderRadius.md).toBe('0.5rem')
    expect(borderRadius.lg).toBe('0.75rem')
  })

  test('cn utility should merge classes correctly', () => {
    const result = cn('text-primary', 'bg-white', 'hover:bg-gray-100')
    expect(typeof result).toBe('string')
    expect(result).toContain('text-primary')
    expect(result).toContain('bg-white')
    expect(result).toContain('hover:bg-gray-100')
  })
})