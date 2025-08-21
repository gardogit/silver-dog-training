import React from 'react'
import { render, screen } from '@testing-library/react'
import { Modal } from '../Modal'

type MockProps = {
  children: React.ReactNode
  className?: string
  open?: boolean
}

// Mock Radix UI Dialog components
jest.mock('@radix-ui/react-dialog', () => ({
  Root: ({ children, open }: MockProps & { open?: boolean }) => (
    <div data-testid="dialog-root" data-open={open}>
      {children}
    </div>
  ),
  Portal: ({ children }: MockProps) => (
    <div data-testid="dialog-portal">{children}</div>
  ),
  Overlay: ({ children, className }: MockProps) => (
    <div data-testid="dialog-overlay" className={className}>
      {children}
    </div>
  ),
  Content: ({ children, className }: MockProps) => (
    <div data-testid="dialog-content" className={className}>
      {children}
    </div>
  ),
  Title: ({ children, className }: MockProps) => (
    <h2 data-testid="dialog-title" className={className}>
      {children}
    </h2>
  ),
  Description: ({ children, className }: MockProps) => (
    <p data-testid="dialog-description" className={className}>
      {children}
    </p>
  ),
  Close: ({ children, className }: MockProps) => (
    <button data-testid="dialog-close" className={className}>
      {children}
    </button>
  ),
}))

// Mock react-icons
jest.mock('react-icons/fa', () => ({
  FaTimes: () => <span data-testid="close-icon">×</span>
}))

describe('Modal', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders modal when open', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    )
    
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  it('renders close button', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    )
    
    expect(screen.getByTestId('dialog-close')).toBeInTheDocument()
    expect(screen.getByTestId('close-icon')).toBeInTheDocument()
  })

  it('renders with light variant by default', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    )
    
    const content = screen.getByTestId('dialog-content')
    expect(content).toHaveClass('bg-white')
  })

  it('renders with dark variant', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} variant="dark">
        <div>Modal Content</div>
      </Modal>
    )
    
    const content = screen.getByTestId('dialog-content')
    expect(content).toHaveClass('bg-neutral-900')
  })

  it('applies custom className', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} className="custom-class">
        <div>Modal Content</div>
      </Modal>
    )
    
    const content = screen.getByTestId('dialog-content')
    expect(content).toHaveClass('custom-class')
  })

  it('renders without crashing when closed', () => {
    expect(() => {
      render(
        <Modal isOpen={false} onClose={mockOnClose}>
          <div>Modal Content</div>
        </Modal>
      )
    }).not.toThrow()
  })
})
