import React from 'react'
import { render, screen } from '@testing-library/react'
import { CallToActionBanner } from '../CallToActionBanner'

describe('CallToActionBanner', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders with title and description', () => {
    render(
      <CallToActionBanner
        title="Test Title"
        description="Test description"
        buttonText="Submit"
        onSubmit={mockOnSubmit}
      />
    )
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('renders email input and submit button', () => {
    render(
      <CallToActionBanner
        title="Test Title"
        description="Test description"
        buttonText="Submit"
        onSubmit={mockOnSubmit}
      />
    )
    
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('has proper form structure', () => {
    render(
      <CallToActionBanner
        title="Test Title"
        description="Test description"
        buttonText="Submit"
        onSubmit={mockOnSubmit}
      />
    )
    
    const emailInput = screen.getByRole('textbox')
    expect(emailInput).toHaveAttribute('type', 'email')
  })

  it('displays submit button', () => {
    render(
      <CallToActionBanner
        title="Test Title"
        description="Test description"
        buttonText="Submit"
        onSubmit={mockOnSubmit}
      />
    )
    
    const submitButton = screen.getByRole('button', { name: 'Submit' })
    expect(submitButton).toBeInTheDocument()
  })

  it('has proper responsive design classes', () => {
    render(
      <CallToActionBanner
        title="Test Title"
        description="Test description"
        buttonText="Submit"
        onSubmit={mockOnSubmit}
      />
    )
    
    const banner = screen.getByRole('region', { name: /Test Title/i });
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveClass('p-8');
  })
})
