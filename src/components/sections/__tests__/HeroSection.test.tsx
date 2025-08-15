import React from 'react'
import { render, screen } from '@testing-library/react'
import { HeroSection } from '../HeroSection'

// Mock Next.js components
jest.mock('next/image', () => {
  return function MockImage({ 
    src, 
    alt, 
    fill, 
    priority, 
    className, 
    sizes 
  }: {
    src: string
    alt: string
    fill?: boolean
    priority?: boolean
    className?: string
    sizes?: string
  }) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={className}
        data-testid="hero-background-image"
        data-src={src}
        data-fill={fill}
        data-priority={priority}
        data-sizes={sizes}
      />
    )
  }
})

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
        data-testid={`link-${href}`}
      >
        {children}
      </a>
    )
  }
})

describe('HeroSection Component', () => {
  it('renders with main content elements', () => {
    render(<HeroSection />)
    
    // Check brand tagline
    expect(screen.getByText('EDUCAMOS GUÍAS | ADIESTRAMOS PERROS | CREAMOS RECUERDOS')).toBeInTheDocument()
    
    // Check main title
    expect(screen.getByText('EDUCA A TU PERRO')).toBeInTheDocument()
    expect(screen.getByText('FORTALECE TU VÍNCULO')).toBeInTheDocument()
    
    // Check subtitle
    expect(screen.getByText(/Transforma la relación con tu perro/)).toBeInTheDocument()
  })

  it('renders background image with proper attributes', () => {
    render(<HeroSection />)
    
    const backgroundImage = screen.getByLabelText('Clase de entrenamiento canino - Silver Dog Training')
    expect(backgroundImage).toBeInTheDocument()
    expect(backgroundImage).toHaveAttribute('data-src', '/images/clase-grupal.webp')
    expect(backgroundImage).toHaveAttribute('data-fill', 'true')
    expect(backgroundImage).toHaveAttribute('data-priority', 'true')
  })

  it('renders logo and trainer image', () => {
    render(<HeroSection />)
    
    expect(screen.getByLabelText('Silver Dog Training Logo')).toBeInTheDocument()
    expect(screen.getByLabelText('Yonathan Pérez con su pastor belga malinois')).toBeInTheDocument()
  })

  it('renders call-to-action button', () => {
    render(<HeroSection />)
    
    // Main CTA button
    const ctaButton = screen.getByRole('link', { name: /Reserva tu clase ahora/ })
    expect(ctaButton).toBeInTheDocument()
    expect(ctaButton).toHaveAttribute('href', expect.stringContaining('wa.me'))
    expect(ctaButton).toHaveAttribute('target', '_blank')
    expect(ctaButton).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders WhatsApp functionality', () => {
    render(<HeroSection />)
    
    // Check that WhatsApp CTA contains proper message
    const ctaButton = screen.getByRole('link', { name: /Reserva tu clase ahora/ })
    const href = ctaButton.getAttribute('href')
    expect(href).toContain('wa.me')
    expect(href).toContain('text=')
    expect(href).toContain('me interesa conocer más sobre sus servicios')
  })

  it('renders centered content layout', () => {
    const { container } = render(<HeroSection />)
    
    // Check for centered content layout
    const contentSection = container.querySelector('.flex.flex-col.justify-center.items-center')
    expect(contentSection).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<HeroSection className="custom-hero" />)
    
    const section = container.querySelector('section')
    expect(section).toHaveClass('custom-hero')
  })

  it('has proper semantic structure', () => {
    render(<HeroSection />)
    
    // Check for main heading
    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toBeInTheDocument()
    expect(mainHeading).toHaveTextContent('EDUCA A TU PERROFORTALECE TU VÍNCULO')
  })

  it('includes WhatsApp message in CTA link', () => {
    render(<HeroSection />)
    
    const ctaButton = screen.getByRole('link', { name: /Reserva tu clase ahora/ })
    const href = ctaButton.getAttribute('href')
    
    expect(href).toContain('text=')
    expect(href).toContain('me interesa conocer más sobre sus servicios')
  })

  it('renders with responsive design classes', () => {
    const { container } = render(<HeroSection />)
    
    const section = container.querySelector('section')
    expect(section).toHaveClass('h-screen', '-mt-16', 'pt-16')
    
    // Check for responsive text sizing - smaller and bolder
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveClass('text-2xl', 'sm:text-3xl', 'lg:text-4xl', 'xl:text-5xl', 'font-black', '!text-white')
  })

  it('includes accessibility features', () => {
    render(<HeroSection />)
    
    // Check that external links have proper attributes
    const ctaButton = screen.getByRole('link', { name: /Reserva tu clase ahora/ })
    expect(ctaButton).toHaveAttribute('rel', 'noopener noreferrer')
    
    // Check that images have descriptive alt text
    const logo = screen.getByLabelText('Silver Dog Training Logo')
    expect(logo).toBeInTheDocument()
    
    const trainerImage = screen.getByLabelText('Yonathan Pérez con su pastor belga malinois')
    expect(trainerImage).toBeInTheDocument()
  })

  it('renders gradient overlay', () => {
    const { container } = render(<HeroSection />)
    
    // Check for gradient overlay
    const gradientOverlay = container.querySelector('.bg-gradient-to-r')
    expect(gradientOverlay).toBeInTheDocument()
    expect(gradientOverlay).toHaveClass('from-yellow-600/80', 'via-orange-500/70', 'to-orange-600/80')
  })
})