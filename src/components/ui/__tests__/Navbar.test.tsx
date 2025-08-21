import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import { Navbar } from '../Navbar';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
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
  const MockLink = ({ children, href, onClick, className }: { children: React.ReactNode; href: string; onClick?: () => void; className?: string }) => (
    <a href={href} onClick={onClick} className={className}>{children}</a>
  );
  MockLink.displayName = 'Link';
  return MockLink;
});

jest.mock('react-icons/hi', () => ({
  HiMenu: () => <svg>Menu Icon</svg>,
  HiX: () => <svg>Close Icon</svg>,
}));

const mockUsePathname = usePathname as jest.Mock;

describe('Navbar Component', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders logo and navigation items', () => {
    render(<Navbar />);
    
    expect(screen.getByAltText('Silver Dog Training')).toBeInTheDocument();
    
    expect(screen.getAllByText('Inicio')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Nosotros')[0]).toBeInTheDocument();
  });

  it('highlights active navigation item', () => {
    mockUsePathname.mockReturnValue('/nosotros');
    render(<Navbar />);
    
    const nosotrosLink = screen.getAllByRole('link', { name: 'Nosotros' })[0]; // [0] es el de desktop
    expect(nosotrosLink).toHaveClass('text-orange-700/80 bg-orange-100/70');
  });

  it('highlights home link when on root path', () => {
    mockUsePathname.mockReturnValue('/');
    render(<Navbar />);
    
    const homeLink = screen.getAllByRole('link', { name: 'Inicio' })[0];
    expect(homeLink).toHaveClass('text-orange-700/80 bg-orange-100/70');
  });

  it('shows mobile menu button on small screens', () => {
    render(<Navbar />);
    const menuButton = screen.getByRole('button', { name: 'Abrir menú' });
    expect(menuButton).toBeInTheDocument();
  });

  it('toggles mobile menu when button is clicked', async () => {
    render(<Navbar />);
    const openMenuButton = screen.getByRole('button', { name: 'Abrir menú' });
    expect(openMenuButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(openMenuButton);
    const closeMenuButton = screen.getByRole('button', { name: 'Cerrar menú' });
    expect(closeMenuButton).toBeInTheDocument();
    expect(closeMenuButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes mobile menu when navigation link is clicked', async () => {
    render(<Navbar />);
    const openMenuButton = screen.getByRole('button', { name: 'Abrir menú' });
    await user.click(openMenuButton);

    expect(screen.getByRole('button', { name: 'Cerrar menú' })).toBeInTheDocument();

    const mobileNavLink = screen.getAllByRole('link', { name: 'Nosotros' })[1]; // [1] es el de móvil
    await user.click(mobileNavLink);

    expect(screen.getByRole('button', { name: 'Abrir menú' })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Navbar className="custom-navbar" />);
    expect(screen.getByRole('navigation')).toHaveClass('custom-navbar');
  });
  
  it('renders logo link that navigates to home', () => {
    render(<Navbar />);
    const logoImage = screen.getByAltText('Silver Dog Training');
    const logoLink = logoImage.closest('a');

    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders all navigation links with correct hrefs', () => {
    render(<Navbar />);
    expect(screen.getAllByRole('link', { name: 'Inicio' })[0]).toHaveAttribute('href', '/');
    expect(screen.getAllByRole('link', { name: 'Nosotros' })[0]).toHaveAttribute('href', '/nosotros');
    expect(screen.getAllByRole('link', { name: 'Cursos' })[0]).toHaveAttribute('href', '/cursos');
    expect(screen.getAllByRole('link', { name: 'Contacto' })[0]).toHaveAttribute('href', '/contacto');
  });

  it('handles active state for nested paths', () => {
    mockUsePathname.mockReturnValue('/cursos/basico');
    render(<Navbar />);
    
    const cursosLink = screen.getAllByRole('link', { name: 'Cursos' })[0];
    expect(cursosLink).toHaveClass('text-orange-700/80 bg-orange-100/70');
  });
});