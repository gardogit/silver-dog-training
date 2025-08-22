import React from 'react'
import { render, screen } from '@testing-library/react'
import { Footer } from '../Footer'

jest.mock('@/lib/design-system', () => ({
  brand: {
    name: 'Silver Dog Training',
    tagline: 'EDUCAMOS GUÍAS | ADIESTRAMOS PERROS | CREAMOS RECUERDOS',
    contact: {
      whatsapp: '584243360955',
      email: 'silverdogtraining88@gmail.com',
      social: {
        facebook: '@silverdogtraining88',
        instagram: '@silverdogtraining88',
        tiktok: '@silverdogtraining',
      },
    },
    desarrolladoPor: {
      url: 'https://hydrogn.app/',
    },
  },
}));

jest.mock('next/image', () => {
  const MockImage = ({ src, alt }: { src: string; alt: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} />;
  };
  MockImage.displayName = 'Image';
  return MockImage;
});

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>;
  MockLink.displayName = 'Link';
  return MockLink;
});

jest.mock('react-icons/fa', () => ({
  FaFacebook: () => <svg />, FaInstagram: () => <svg />, FaTiktok: () => <svg />, FaWhatsapp: () => <svg />,
}));
jest.mock('react-icons/hi', () => ({
  HiMail: () => <svg />, HiLocationMarker: () => <svg />, HiCalendar: () => <svg />,
}));

describe('Footer Component', () => {
  beforeEach(() => {
    jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2024);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders brand information correctly', () => {
    render(<Footer />);
    expect(screen.getAllByText('Silver Dog Training')[0]).toBeInTheDocument();
    expect(screen.getByText('Entrenamiento Canino Profesional')).toBeInTheDocument();
    expect(screen.getByText('EDUCAMOS GUÍAS | ADIESTRAMOS PERROS | CREAMOS RECUERDOS')).toBeInTheDocument();
  });

  it('renders company description', () => {
    render(<Footer />);
    expect(screen.getByText(/Especializados en el método NePoPo®/i)).toBeInTheDocument();
  });

  it('renders social media links with correct hrefs and accessibility labels', () => {
    render(<Footer />);
    const facebookLink = screen.getByLabelText(/Síguenos en Facebook/);
    const instagramLink = screen.getByLabelText(/Síguenos en Instagram/);
    const tiktokLink = screen.getByLabelText(/Síguenos en TikTok/);
    
    expect(facebookLink).toHaveAttribute('href', 'https://facebook.com/silverdogtraining88');
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/silverdogtraining88');
    expect(tiktokLink).toHaveAttribute('href', 'https://tiktok.com/silverdogtraining');
    expect(facebookLink).toHaveAttribute('target', '_blank');
  });

  it('renders quick navigation links correctly', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Inicio' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Nosotros' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Cursos' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contacto' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Política de Privacidad' })).toBeInTheDocument();
  });

  it('renders contact information with correct links', () => {
    render(<Footer />);
    const whatsappLink = screen.getByRole('link', { name: /\+584243360955/i });
    const emailLink = screen.getByRole('link', { name: /silverdogtraining88@gmail.com/i });

    expect(whatsappLink).toBeInTheDocument();
    expect(emailLink).toBeInTheDocument();
    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/584243360955');
    expect(emailLink).toHaveAttribute('href', 'mailto:silverdogtraining88@gmail.com');
  });

  it('renders static contact information', () => {
    render(<Footer />);
    expect(screen.getByText('Venezuela')).toBeInTheDocument();
    expect(screen.getByText('Lunes a Sábados: 8am - 6pm')).toBeInTheDocument();
  });

  it('renders copyright and developer credit', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2024 Silver Dog Training. Todos los derechos reservados./i)).toBeInTheDocument();
    const devLink = screen.getByRole('link', { name: 'Hydrogn' });
    expect(devLink).toBeInTheDocument();
    expect(devLink).toHaveAttribute('href', 'https://hydrogn.app/');
  });

  it('has proper semantic structure with correct headings', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Silver Dog Training' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: 'Enlaces Rápidos' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: 'Contacto' })).toBeInTheDocument();
  });
});