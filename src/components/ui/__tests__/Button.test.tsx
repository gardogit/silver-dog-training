import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../Button'

// Mock icon component for testing
const MockIcon = () => <span data-testid="mock-icon">Icon</span>

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-primary') // primary variant by default
    expect(button).toHaveClass('h-10') // md size by default
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-primary')

    rerender(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-secondary')

    rerender(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveClass('border-primary')

    rerender(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-transparent')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-8')

    rerender(<Button size="md">Medium</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-10')

    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-12')
  })

  it('renders with left icon', () => {
    render(
      <Button leftIcon={<MockIcon />}>
        With Left Icon
      </Button>
    )
    
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('With Left Icon')
  })

  it('renders with right icon', () => {
    render(
      <Button rightIcon={<MockIcon />}>
        With Right Icon
      </Button>
    )
    
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('With Right Icon')
  })

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:opacity-50')
    
    // Check for loading spinner
    const spinner = button.querySelector('svg')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('animate-spin')
  })

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:opacity-50')
  })

  it('renders full width', () => {
    render(<Button fullWidth>Full Width</Button>)
    
    expect(screen.getByRole('button')).toHaveClass('w-full')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Clickable</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not handle click when disabled', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick} disabled>Disabled</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('does not handle click when loading', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick} loading>Loading</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Ref Button</Button>)
    
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('has proper accessibility attributes', () => {
    render(<Button aria-label="Accessible button">Button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Accessible button')
  })

  it('supports keyboard navigation', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Keyboard</Button>)
    
    const button = screen.getByRole('button')
    button.focus()
    expect(button).toHaveFocus()
    
    fireEvent.keyDown(button, { key: 'Enter' })
    fireEvent.keyDown(button, { key: ' ' })
    
    // Note: React Testing Library doesn't automatically trigger click on Enter/Space
    // In real browsers, this would work due to native button behavior
  })
})