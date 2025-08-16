import React from 'react'
import { render, screen } from '@testing-library/react'
import { FloatingWhatsAppButton } from '../FloatingWhatsAppButton'

describe('FloatingWhatsAppButton Component', () => {
  it('renders with default props', () => {
    render(<FloatingWhatsAppButton />)
    
    const button = screen.getByLabelText('Contactar por WhatsApp')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('href', expect.stringContaining('wa.me'))
    expect(button).toHaveAttribute('target', '_blank')
    expect(button).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders with custom message', () => {
    const customMessage = 'Mensaje personalizado de prueba'
    render(<FloatingWhatsAppButton message={customMessage} />)
    
    const button = screen.getByLabelText('Contactar por WhatsApp')
    const href = button.getAttribute('href')
    
    expect(href).toContain(encodeURIComponent(customMessage))
  })

  it('applies custom className', () => {
    const { container } = render(<FloatingWhatsAppButton className="custom-class" />)
    
    const wrapper = container.querySelector('.custom-class')
    expect(wrapper).toBeInTheDocument()
  })

  it('has proper positioning classes', () => {
    const { container } = render(<FloatingWhatsAppButton />)
    
    const wrapper = container.querySelector('.fixed.bottom-6.right-6.z-50')
    expect(wrapper).toBeInTheDocument()
  })

  it('has proper styling classes', () => {
    render(<FloatingWhatsAppButton />)
    
    const button = screen.getByLabelText('Contactar por WhatsApp')
    expect(button).toHaveClass('bg-green-500', 'hover:bg-green-600', 'rounded-full', 'shadow-lg')
  })

  it('includes WhatsApp icon', () => {
    const { container } = render(<FloatingWhatsAppButton />)
    
    const icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('w-6', 'h-6')
  })

  it('uses default message when none provided', () => {
    render(<FloatingWhatsAppButton />)
    
    const button = screen.getByLabelText('Contactar por WhatsApp')
    const href = button.getAttribute('href')
    
    expect(href).toContain('me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20servicios')
  })

  it('has proper accessibility attributes', () => {
    render(<FloatingWhatsAppButton />)
    
    const button = screen.getByLabelText('Contactar por WhatsApp')
    expect(button).toHaveAttribute('aria-label', 'Contactar por WhatsApp')
  })
})