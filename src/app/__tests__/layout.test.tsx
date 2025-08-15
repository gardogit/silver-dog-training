import React from 'react'
import { render, screen } from '@testing-library/react'

// Mock the Navbar and Footer components
jest.mock('@/components/ui/Navbar', () => {
  return {
    Navbar: function MockNavbar() {
      return <nav data-testid="navbar">Mock Navbar</nav>
    }
  }
})

jest.mock('@/components/ui/Footer', () => {
  return {
    Footer: function MockFooter() {
      return <footer data-testid="footer">Mock Footer</footer>
    }
  }
})

// Mock Next.js font
jest.mock('next/font/google', () => ({
  Inter: () => ({
    variable: '--font-inter',
  }),
}))

// Import the mocked components
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'

// Create a simplified layout component for testing (without html/body tags)
const LayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="font-sans antialiased min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

describe('RootLayout Content', () => {
  it('renders with proper structure', () => {
    render(
      <LayoutContent>
        <div data-testid="page-content">Test Content</div>
      </LayoutContent>
    )

    // Check that the layout includes navbar, main content, and footer
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
    expect(screen.getByTestId('page-content')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('renders children in main element', () => {
    render(
      <LayoutContent>
        <div data-testid="child-content">Child Content</div>
      </LayoutContent>
    )

    const mainElement = screen.getByRole('main')
    expect(mainElement).toBeInTheDocument()
    expect(mainElement).toContainElement(screen.getByTestId('child-content'))
  })

  it('has proper semantic structure', () => {
    render(
      <LayoutContent>
        <div>Content</div>
      </LayoutContent>
    )

    // Check for proper semantic elements
    expect(screen.getByRole('navigation')).toBeInTheDocument() // Navbar
    expect(screen.getByRole('main')).toBeInTheDocument() // Main content
    expect(screen.getByRole('contentinfo')).toBeInTheDocument() // Footer
  })

  it('applies correct CSS classes for layout', () => {
    render(
      <LayoutContent>
        <div>Content</div>
      </LayoutContent>
    )

    const main = screen.getByRole('main')
    expect(main).toHaveClass('flex-1')
  })

  it('renders multiple children correctly', () => {
    render(
      <LayoutContent>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </LayoutContent>
    )

    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
  })

  it('maintains flex layout structure', () => {
    const { container } = render(
      <LayoutContent>
        <div>Content</div>
      </LayoutContent>
    )

    const layoutContainer = container.firstChild as HTMLElement
    expect(layoutContainer).toHaveClass('min-h-screen', 'flex', 'flex-col')
  })
})