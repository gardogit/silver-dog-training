import React from 'react'
import { render, screen } from '@testing-library/react'
import { Footer } from '../Footer'

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ 
    children, 
    href,
    className 
  }: { 
    children: React.ReactNode
    href: string
    className?: string
  }) {
    return (
      <a 
        href={href} 
        className={className}
        data-testid={`footer-link-${href}`}
      >
        {children}
      </a>
    )
  }
})

describe('Footer Component', () => {
  beforeEach(() => {
    // Mock current year to make tests consistent
    jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2024)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders brand information correctly', () => {
    render(<Footer />)
    
    expect(screen.getByText('Silver Dog Training')).toBeInTheDocument()
    expect(screen.getByText('SD')).toBeInTheDocument()
    expect(screen.getByText('Entrenamiento Canino Profesional')).toBeInTheDocument()
    expect(screen.getByText('EDUCAMOS GUÍAS | ADIESTRAMOS PERROS | CREAMOS RECUERDOS')).toBeInTheDocument()
  })

  it('renders contact information', () => {
    render(<Footer />)
    
    // WhatsApp
    expect(screen.getByText('WhatsApp')).toBeInTheDocument()
    expect(screen.getByText('+584243360955')).toBeInTheDocument()
    
    // Email
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('silverdogtraining88@gmail.com')).toBeInTheDocument()
    
    // Location
    expect(screen.getByText('Ubicación')).toBeInTheDocument()
    expect(screen.getByText('Venezuela')).toBeInTheDocument()
  })

  it('renders social media links with correct hrefs', () => {
    render(<Footer />)
    
    const facebookLink = screen.getByLabelText(/Síguenos en Facebook/)
    const instagramLink = screen.getByLabelText(/Síguenos en Instagram/)
    const tiktokLink = screen.getByLabelText(/Síguenos en TikTok/)
    
    expect(facebookLink).toHaveAttribute('href', 'https://facebook.com/silverdogtraining88')
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/silverdogtraining88')
    expect(tiktokLink).toHaveAttribute('href', 'https://tiktok.com/silverdogtraining')
    
    // Check external link attributes
    expect(facebookLink).toHaveAttribute('target', '_blank')
    expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders WhatsApp link with correct href', () => {
    render(<Footer />)
    
    const whatsappLink = screen.getByRole('link', { name: /WhatsApp/ })
    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/584243360955')
    expect(whatsappLink).toHaveAttribute('target', '_blank')
    expect(whatsappLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders email link with correct href', () => {
    render(<Footer />)
    
    const emailLink = screen.getByRole('link', { name: /Email/ })
    expect(emailLink).toHaveAttribute('href', 'mailto:silverdogtraining88@gmail.com')
  })

  it('renders quick navigation links', () => {
    render(<Footer />)
    
    expect(screen.getByTestId('footer-link-/')).toBeInTheDocument()
    expect(screen.getByTestId('footer-link-/nosotros')).toBeInTheDocument()
    expect(screen.getByTestId('footer-link-/cursos')).toBeInTheDocument()
    expect(screen.getByTestId('footer-link-/contacto')).toBeInTheDocument()
    
    // Check section heading
    expect(screen.getByText('Enlaces Rápidos')).toBeInTheDocument()
    
    // Check that navigation links exist (some text appears in multiple places)
    expect(screen.getAllByText('Inicio')).toHaveLength(1)
    expect(screen.getAllByText('Nosotros')).toHaveLength(1)
    expect(screen.getAllByText('Cursos')).toHaveLength(1)
    expect(screen.getAllByText('Contacto')).toHaveLength(2) // Link + section heading
  })

  it('renders copyright information with current year', () => {
    render(<Footer />)
    
    expect(screen.getByText('© 2024 Silver Dog Training. Todos los derechos reservados.')).toBeInTheDocument()
  })

  it('renders certification and experience information', () => {
    render(<Footer />)
    
    expect(screen.getByText('Método NePoPo® Certificado')).toBeInTheDocument()
    expect(screen.getByText('8+ Años de Experiencia')).toBeInTheDocument()
  })

  it('renders company description', () => {
    render(<Footer />)
    
    const description = screen.getByText(/Especializados en el método NePoPo®/)
    expect(description).toBeInTheDocument()
    expect(description).toHaveTextContent('Especializados en el método NePoPo® y entrenamiento de perros K9 de detección y protección. Más de 8 años de experiencia creando vínculos duraderos entre guías y sus compañeros caninos.')
  })

  it('applies custom className', () => {
    render(<Footer className="custom-footer" />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('custom-footer')
  })

  it('has proper semantic structure', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    
    // Check for proper headings
    expect(screen.getByRole('heading', { level: 3, name: 'Silver Dog Training' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 4, name: 'Enlaces Rápidos' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 4, name: 'Contacto' })).toBeInTheDocument()
  })

  it('has proper accessibility attributes for social links', () => {
    render(<Footer />)
    
    const socialLinks = [
      screen.getByLabelText(/Síguenos en Facebook/),
      screen.getByLabelText(/Síguenos en Instagram/),
      screen.getByLabelText(/Síguenos en TikTok/),
    ]
    
    socialLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('renders with responsive grid layout classes', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    const gridContainer = footer.querySelector('.grid')
    
    expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4')
  })

  it('renders contact links with hover states', () => {
    render(<Footer />)
    
    const whatsappLink = screen.getByRole('link', { name: /WhatsApp/ })
    const emailLink = screen.getByRole('link', { name: /Email/ })
    
    expect(whatsappLink).toHaveClass('hover:text-primary')
    expect(emailLink).toHaveClass('hover:text-primary')
  })
})