import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input, Textarea } from '../Input'

describe('Input Component', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('h-10') // md size by default
    expect(input).toHaveAttribute('type', 'text')
  })

  it('renders with different types', () => {
    const { rerender } = render(<Input type="email" placeholder="Email" />)
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email')

    rerender(<Input type="tel" placeholder="Phone" />)
    expect(screen.getByPlaceholderText('Phone')).toHaveAttribute('type', 'tel')

    rerender(<Input type="password" placeholder="Password" />)
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Input size="sm" placeholder="Small" />)
    expect(screen.getByPlaceholderText('Small')).toHaveClass('h-8')

    rerender(<Input size="md" placeholder="Medium" />)
    expect(screen.getByPlaceholderText('Medium')).toHaveClass('h-10')

    rerender(<Input size="lg" placeholder="Large" />)
    expect(screen.getByPlaceholderText('Large')).toHaveClass('h-12')
  })

  it('renders with label', () => {
    render(<Input label="Full Name" placeholder="Enter name" />)
    
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
    expect(screen.getByText('Full Name')).toBeInTheDocument()
  })

  it('renders with required label', () => {
    render(<Input label="Email" required placeholder="Enter email" />)
    
    const label = screen.getByText('Email')
    expect(label).toBeInTheDocument()
    // Check for required asterisk (using CSS content)
    expect(label).toHaveClass("after:content-['*']")
  })

  it('renders with error state', () => {
    render(<Input label="Email" error="Invalid email" placeholder="Enter email" />)
    
    const input = screen.getByPlaceholderText('Enter email')
    const errorMessage = screen.getByText('Invalid email')
    
    expect(input).toHaveClass('border-red-500')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveAttribute('role', 'alert')
  })

  it('renders with helper text', () => {
    render(<Input label="Password" helperText="Must be at least 8 characters" placeholder="Enter password" />)
    
    const helperText = screen.getByText('Must be at least 8 characters')
    expect(helperText).toBeInTheDocument()
    expect(helperText).toHaveClass('text-neutral-500')
  })

  it('prioritizes error over helper text', () => {
    render(
      <Input 
        label="Email" 
        error="Invalid email" 
        helperText="Enter a valid email address"
        placeholder="Enter email" 
      />
    )
    
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
    expect(screen.queryByText('Enter a valid email address')).not.toBeInTheDocument()
  })

  it('handles disabled state', () => {
    render(<Input disabled placeholder="Disabled input" />)
    
    const input = screen.getByPlaceholderText('Disabled input')
    expect(input).toBeDisabled()
    expect(input).toHaveClass('disabled:bg-neutral-100')
  })

  it('handles input changes', () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} placeholder="Type here" />)
    
    const input = screen.getByPlaceholderText('Type here')
    fireEvent.change(input, { target: { value: 'Hello World' } })
    
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(input).toHaveValue('Hello World')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} placeholder="Ref input" />)
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('generates unique IDs', () => {
    render(
      <div>
        <Input label="First" placeholder="First input" />
        <Input label="Second" placeholder="Second input" />
      </div>
    )
    
    const firstInput = screen.getByPlaceholderText('First input')
    const secondInput = screen.getByPlaceholderText('Second input')
    
    expect(firstInput.id).toBeTruthy()
    expect(secondInput.id).toBeTruthy()
    expect(firstInput.id).not.toBe(secondInput.id)
  })

  it('uses custom ID when provided', () => {
    render(<Input id="custom-id" label="Custom" placeholder="Custom input" />)
    
    const input = screen.getByPlaceholderText('Custom input')
    expect(input).toHaveAttribute('id', 'custom-id')
  })
})

describe('Textarea Component', () => {
  it('renders with default props', () => {
    render(<Textarea placeholder="Enter message" />)
    
    const textarea = screen.getByPlaceholderText('Enter message')
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveAttribute('rows', '4')
  })

  it('renders with custom rows', () => {
    render(<Textarea rows={6} placeholder="Long message" />)
    
    const textarea = screen.getByPlaceholderText('Long message')
    expect(textarea).toHaveAttribute('rows', '6')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Textarea size="sm" placeholder="Small" />)
    expect(screen.getByPlaceholderText('Small')).toHaveClass('text-sm')

    rerender(<Textarea size="md" placeholder="Medium" />)
    expect(screen.getByPlaceholderText('Medium')).toHaveClass('text-base')

    rerender(<Textarea size="lg" placeholder="Large" />)
    expect(screen.getByPlaceholderText('Large')).toHaveClass('text-lg')
  })

  it('renders with label and error', () => {
    render(<Textarea label="Message" error="Message is required" placeholder="Enter message" />)
    
    const textarea = screen.getByLabelText('Message')
    const errorMessage = screen.getByText('Message is required')
    
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveClass('border-red-500')
    expect(textarea).toHaveAttribute('aria-invalid', 'true')
    expect(errorMessage).toBeInTheDocument()
  })

  it('handles textarea changes', () => {
    const handleChange = jest.fn()
    render(<Textarea onChange={handleChange} placeholder="Type message" />)
    
    const textarea = screen.getByPlaceholderText('Type message')
    fireEvent.change(textarea, { target: { value: 'Hello World' } })
    
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(textarea).toHaveValue('Hello World')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} placeholder="Ref textarea" />)
    
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  it('has resize-vertical class', () => {
    render(<Textarea placeholder="Resizable" />)
    
    const textarea = screen.getByPlaceholderText('Resizable')
    expect(textarea).toHaveClass('resize-vertical')
  })
})