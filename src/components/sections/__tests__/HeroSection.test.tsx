import React from 'react'
import { render, screen } from '@testing-library/react'
import { HeroSection } from '../home/HeroSection'

// Mock de la configuración de la marca para que el test no dependa de ella
jest.mock('@/lib/design-system', () => ({
  brand: {
    tagline: 'EDUCAMOS GUÍAS | ADIESTRAMOS PERROS | CREAMOS RECUERDOS',
    contact: {
      whatsapp: '584243360955', // Un número de ejemplo
    },
  },
}));

// Mock Next.js components
jest.mock('next/image', () => {
  return function MockImage({ src, alt }: { src: string; alt: string }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} />;
  }
})

jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>
  }
})

describe('HeroSection Component', () => {
  it('renders with main content elements', () => {
    render(<HeroSection />);
    expect(screen.getByText('EDUCAMOS GUÍAS | ADIESTRAMOS PERROS | CREAMOS RECUERDOS')).toBeInTheDocument();
    expect(screen.getByText('EDUCA A TU PERRO')).toBeInTheDocument();
    expect(screen.getByText('FORTALECE TU VÍNCULO')).toBeInTheDocument();
    expect(screen.getByText(/Transforma la relación con tu perro/)).toBeInTheDocument();
  });

  it('renders background image with proper attributes', () => {
    render(<HeroSection />);
    const backgroundImage = screen.getByAltText('Clase de entrenamiento canino - Silver Dog Training');
    expect(backgroundImage).toBeInTheDocument();
    expect(backgroundImage).toHaveAttribute('src', '/images/clase-grupal.webp');
  });

  it('renders logo and trainer image', () => {
    render(<HeroSection />);
    expect(screen.getByAltText('Silver Dog Training Logo')).toBeInTheDocument();
    expect(screen.getByAltText('Yonathan Pérez con su pastor belga malinois')).toBeInTheDocument();
  });

  it('renders call-to-action button', () => {
    render(<HeroSection />);
    const ctaButton = screen.getByRole('link', { name: /Reserva tu clase ahora/ });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', expect.stringContaining('wa.me'));
    expect(ctaButton).toHaveAttribute('target', '_blank');
    expect(ctaButton).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders WhatsApp functionality', () => {
    render(<HeroSection />);
    const ctaButton = screen.getByRole('link', { name: /Reserva tu clase ahora/ });
    const href = ctaButton.getAttribute('href')!; // Usamos '!' para asegurar a TS que no es null
    
    expect(href).toContain('wa.me');
    expect(href).toContain('text=');
    // --- CORRECCIÓN 1: Se eliminó encodeURIComponent ---
    // Comprobamos el texto sin codificar, tal como está en el atributo href
    expect(href).toContain('Hola, me interesa conocer más sobre sus servicios de adiestramiento canino');
  });

  it('renders centered content layout', () => {
    const { container } = render(<HeroSection />);
    const contentSection = container.querySelector('.flex.flex-col.justify-center.items-center');
    expect(contentSection).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<HeroSection className="custom-hero" />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('custom-hero');
  });

  it('has proper semantic structure', () => {
    render(<HeroSection />);
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent('EDUCA A TU PERROFORTALECE TU VÍNCULO');
  });

  it('includes WhatsApp message in CTA link', () => {
    render(<HeroSection />);
    const ctaButton = screen.getByRole('link', { name: /Reserva tu clase ahora/ });
    const href = ctaButton.getAttribute('href')!;
    
    expect(href).toContain('text=');
    // --- CORRECCIÓN 2: Se eliminó encodeURIComponent ---
    expect(href).toContain('Hola, me interesa conocer más sobre sus servicios de adiestramiento canino');
  });

  it('renders with responsive design classes', () => {
    const { container } = render(<HeroSection />);
    const section = container.querySelector('section');
    // --- CORRECCIÓN 3: Se unieron las clases en un solo string ---
    expect(section).toHaveClass('h-screen -mt-16 pt-16');
    
    const title = screen.getByRole('heading', { level: 1 });
    // --- CORRECCIÓN 4: Se unieron las clases en un solo string ---
    expect(title).toHaveClass('text-3xl sm:text-4xl font-black text-center text-white');
  });

  it('includes accessibility features', () => {
    render(<HeroSection />);
    const ctaButton = screen.getByRole('link', { name: /Reserva tu clase ahora/ });
    expect(ctaButton).toHaveAttribute('rel', 'noopener noreferrer');
    const logo = screen.getByAltText('Silver Dog Training Logo');
    expect(logo).toBeInTheDocument();
    const trainerImage = screen.getByAltText('Yonathan Pérez con su pastor belga malinois');
    expect(trainerImage).toBeInTheDocument();
  });

  it('renders gradient overlay', () => {
    const { container } = render(<HeroSection />);
    const gradientOverlay = container.querySelector('.bg-gradient-to-r');
    expect(gradientOverlay).toBeInTheDocument();
    // --- CORRECCIÓN 5: Se unieron las clases en un solo string ---
    expect(gradientOverlay).toHaveClass('from-yellow-600/80 via-orange-500/70 to-orange-600/80');
  });
});