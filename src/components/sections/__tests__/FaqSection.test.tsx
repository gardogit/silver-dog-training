import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FaqSection, faqData } from '../FaqSection' 


describe('FaqSection', () => {
  const user = userEvent.setup()

  it('renders the section title correctly', () => {
    render(<FaqSection />)
    
    expect(screen.getByText('Preguntas Frecuentes')).toBeInTheDocument()
  })

  it('renders all FAQ items', () => {
    render(<FaqSection />)
    
    // Check for actual FAQ questions from the component
    expect(screen.getByText(/qué tipo de adiestramiento canino ofrecen/i)).toBeInTheDocument()
    expect(screen.getByText(/en qué consiste el método de adiestramiento nepopo/i)).toBeInTheDocument()
    expect(screen.getByText(/mi perro tiene problemas de conducta específicos/i)).toBeInTheDocument()
  })

  it('expands and collapses FAQ items when clicked', async () => {
    render(<FaqSection />)
    
    const firstQuestion = screen.getAllByRole('button')[0]
    
    // Initially collapsed
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'false')
    
    // Click to expand
    await user.click(firstQuestion)
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'true')
    
    // Click again to collapse
    await user.click(firstQuestion)
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'false')
  })

  it('shows only one expanded item at a time', async () => {
    render(<FaqSection />)
    
    const questions = screen.getAllByRole('button')
    
    // Expand first question
    await user.click(questions[0])
    expect(questions[0]).toHaveAttribute('aria-expanded', 'true')
    
    // Expand second question
    await user.click(questions[1])
    expect(questions[1]).toHaveAttribute('aria-expanded', 'true')
    expect(questions[0]).toHaveAttribute('aria-expanded', 'false')
  })

  it('has proper accessibility structure', () => {
    render(<FaqSection />)
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('Preguntas Frecuentes')
    
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-expanded')
    })
  })

  it('applies custom className when provided', () => {
    render(<FaqSection className="custom-faq-class" />)
    
    const section = screen.getByTestId('faq-section')
    expect(section).toHaveClass('custom-faq-class')
  })

  it('renders correct number of FAQ items', () => {
    render(<FaqSection />)
    
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(faqData.length)
  })

  it('displays FAQ answers when expanded', async () => {
    render(<FaqSection />)
    
    const firstQuestion = screen.getAllByRole('button')[0]
    await user.click(firstQuestion)
    
    expect(screen.getByText(/en silver dog training nos especializamos/i)).toBeInTheDocument()
  })
})
