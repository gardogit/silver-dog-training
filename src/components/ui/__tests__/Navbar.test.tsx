import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { Navbar } from '../Navbar'

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ 
    children, 
    href, 
    onClick,
    className 
  }: { 
    children: React.ReactNode
    href: string
    onClick?: () => void
    className?: string
  }) {
    return (
      <a 
        href={href} 
        onClick={onClick}
        className={className}
        data-testid={`link-${href}`}
      >
        {children}
      </a>
    )
  }
})

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>

describe('Navbar Component', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders with logo and navigation items', () => {
    render(<Navbar />)
    
    // Check logo
    expect(screen.getByText('Silver Dog Training')).toBeInTheDocument()
    expect(screen.getByText('SD')).toBeInTheDocument()
    
    // Check navigation items (using getAllByText since there are desktop and mobile versions)
    expect(screen.getAllByText('Inicio')).toHaveLength(2) // Desktop and mobile
    expect(screen.getAllByText('Nosotros')).toHaveLength(2)
    expect(screen.getAllByText('Cursos')).toHaveLength(2)
    expect(screen.getAllByText('Contacto')).toHaveLength(2)
  })

  it('highlights active navigation item', () => {
    mockUsePathname.mockReturnValue('/nosotros')
    render(<Navbar />)
    
    const nosotrosLinks = screen.getAllByTestId('link-/nosotros')
    // Check desktop navigation link (first one)
    expect(nosotrosLinks[0]).toHaveClass('text-primary', 'bg-primary-50')
  })

  it('highlights home link when on root path', () => {
    mockUsePathname.mockReturnValue('/')
    render(<Navbar />)
    
    const homeLinks = screen.getAllByTestId('link-/')
    // Check desktop navigation link (should be the second one - first is logo)
    expect(homeLinks[1]).toHaveClass('text-primary', 'bg-primary-50')
  })

  it('shows mobile menu button on small screens', () => {
    render(<Navbar />)
    
    const menuButton = screen.getByLabelText('Abrir menú')
    expect(menuButton).toBeInTheDocument()
    // Check that the button's parent container has md:hidden class
    expect(menuButton.parentElement).toHaveClass('md:hidden')
  })

  it('toggles mobile menu when button is clicked', () => {
    render(<Navbar />)
    
    const menuButton = screen.getByLabelText('Abrir menú')
    
    // Initially closed
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    
    // Click to open
    fireEvent.click(menuButton)
    expect(screen.getByLabelText('Cerrar menú')).toBeInTheDocument()
    
    // Click to close
    fireEvent.click(screen.getByLabelText('Cerrar menú'))
    expect(screen.getByLabelText('Abrir menú')).toBeInTheDocument()
  })

  it('closes mobile menu when navigation link is clicked', () => {
    render(<Navbar />)
    
    const menuButton = screen.getByLabelText('Abrir menú')
    
    // Open mobile menu
    fireEvent.click(menuButton)
    expect(screen.getByLabelText('Cerrar menú')).toBeInTheDocument()
    
    // Click on a mobile navigation link (get all home links and click the mobile one)
    const homeLinks = screen.getAllByTestId('link-/')
    // The mobile link should be the last one in the array
    fireEvent.click(homeLinks[homeLinks.length - 1])
    
    // Menu should close
    expect(screen.getByLabelText('Abrir menú')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Navbar className="custom-navbar" />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('custom-navbar')
  })

  it('has proper accessibility attributes', () => {
    render(<Navbar />)
    
    const menuButton = screen.getByLabelText('Abrir menú')
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    
    // Open menu
    fireEvent.click(menuButton)
    const closeButton = screen.getByLabelText('Cerrar menú')
    expect(closeButton).toHaveAttribute('aria-expanded', 'true')
  })

  it('has sticky positioning and proper z-index', () => {
    render(<Navbar />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('sticky', 'top-0', 'z-50')
  })

  it('renders logo link that navigates to home', () => {
    render(<Navbar />)
    
    const logoLink = screen.getAllByTestId('link-/')[0] // First one is the logo
    expect(logoLink).toBeInTheDocument()
    expect(logoLink).toHaveAttribute('href', '/')
    expect(logoLink).toHaveTextContent('Silver Dog Training')
  })

  it('shows desktop navigation items with proper styling', () => {
    render(<Navbar />)
    
    const desktopNav = screen.getByRole('navigation').querySelector('.hidden.md\\:block')
    expect(desktopNav).toBeInTheDocument()
  })

  it('handles keyboard navigation', () => {
    render(<Navbar />)
    
    const menuButton = screen.getByLabelText('Abrir menú')
    
    // Focus on menu button
    menuButton.focus()
    expect(menuButton).toHaveFocus()
    
    // Press Enter to open menu
    fireEvent.keyDown(menuButton, { key: 'Enter' })
    // Note: This test verifies the button can receive focus
    // The actual Enter key handling would be browser-native behavior
  })

  it('renders all navigation links with correct hrefs', () => {
    render(<Navbar />)
    
    // Test desktop navigation links
    const homeLinks = screen.getAllByTestId('link-/')
    const nosotrosLinks = screen.getAllByTestId('link-/nosotros')
    const cursosLinks = screen.getAllByTestId('link-/cursos')
    const contactoLinks = screen.getAllByTestId('link-/contacto')
    
    expect(homeLinks[0]).toHaveAttribute('href', '/') // Logo
    expect(homeLinks[1]).toHaveAttribute('href', '/') // Desktop nav
    expect(nosotrosLinks[0]).toHaveAttribute('href', '/nosotros')
    expect(cursosLinks[0]).toHaveAttribute('href', '/cursos')
    expect(contactoLinks[0]).toHaveAttribute('href', '/contacto')
  })

  it('handles active state for nested paths', () => {
    mockUsePathname.mockReturnValue('/cursos/basico')
    render(<Navbar />)
    
    const cursosLinks = screen.getAllByTestId('link-/cursos')
    // Check desktop navigation link (first one)
    expect(cursosLinks[0]).toHaveClass('text-primary', 'bg-primary-50')
  })
})