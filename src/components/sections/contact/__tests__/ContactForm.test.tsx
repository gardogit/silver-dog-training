import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '../ContactForm'
import { ContactFormState } from '@/actions/contact'

// Mock the server action
jest.mock('@/actions/contact', () => ({
  sendContactEmail: jest.fn(),
}))

// Mock Next.js hooks
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormStatus: () => ({ pending: false }),
}))

// Mock React hooks
const mockUseActionState = jest.fn()
type UseActionStateArgs = [action: (state: ContactFormState, payload: FormData) => Promise<ContactFormState>, initialState: ContactFormState];
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useActionState: (...args: UseActionStateArgs) => mockUseActionState(...args),
}))

describe('ContactForm', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseActionState.mockReturnValue([
      { message: '', isSuccess: false, fields: {}, errors: {} },
      jest.fn(),
    ])
  })

  it('renders all form fields correctly', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/número de whatsapp/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: /seleccionar asunto del mensaje/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/tu mensaje/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument()
  })

  it('shows required field indicators via CSS', () => {
    render(<ContactForm />)
    const nameLabel = screen.getByText(/nombre completo/i)
    const emailLabel = screen.getByText(/correo electrónico/i)
    const phoneLabel = screen.getByText(/número de whatsapp/i)
    const subjectLabel = screen.getByText(/asunto/i, { selector: 'label' })
    const messageLabel = screen.getByText(/tu mensaje/i)
    const requiredLabels = [nameLabel, emailLabel, phoneLabel, subjectLabel, messageLabel]
    requiredLabels.forEach(label => {
      expect(label).toHaveClass("after:content-['*']")
    })
    expect(requiredLabels).toHaveLength(5)
  })

  it('renders subject options correctly', async () => {
    render(<ContactForm />)
    const selectTrigger = screen.getByRole('combobox')
    await user.click(selectTrigger)
    
    const option1 = await screen.findByRole('option', { name: /información sobre clases personalizadas/i })
    const option2 = screen.getByRole('option', { name: /información sobre clases grupales/i })

    expect(option1).toBeInTheDocument()
    expect(option2).toBeInTheDocument()
  })

  it('allows user to fill out the form', async () => {
    render(<ContactForm />)
    await user.type(screen.getByLabelText(/nombre completo/i), 'Juan Pérez')
    await user.type(screen.getByLabelText(/correo electrónico/i), 'juan@example.com')
    
    expect(screen.getByLabelText(/nombre completo/i)).toHaveValue('Juan Pérez')
    expect(screen.getByLabelText(/correo electrónico/i)).toHaveValue('juan@example.com')
  })

  it('allows user to select a subject', async () => {
    render(<ContactForm />)
    const selectTrigger = screen.getByRole('combobox')
    await user.click(selectTrigger)
    
    const option = await screen.findByRole('option', { name: /información sobre clases personalizadas/i })
    await user.click(option)
    
    expect(screen.getByRole('combobox')).toHaveTextContent(/información sobre clases personalizadas/i)
  })

  it('displays validation errors when provided', () => {
    mockUseActionState.mockReturnValue([
      {
        message: 'Error de validación',
        isSuccess: false,
        errors: { name: ['El nombre es requerido'] },
        fields: {},
      },
      jest.fn(),
    ])
    render(<ContactForm />)
    expect(screen.getByText('El nombre es requerido')).toBeInTheDocument()
  })

  it('displays success message when form is submitted successfully', () => {
    mockUseActionState.mockReturnValue([
      { message: 'Mensaje enviado exitosamente', isSuccess: true, fields: {}, errors: {} },
      jest.fn(),
    ])
    render(<ContactForm />)
    expect(screen.getByText('Mensaje enviado exitosamente')).toBeInTheDocument()
    expect(screen.getByText('Mensaje enviado exitosamente')).toHaveClass('text-green-600')
  })

  it('displays error message when form submission fails', () => {
    mockUseActionState.mockReturnValue([
      { message: 'Error al enviar el mensaje', isSuccess: false, fields: {}, errors: {} },
      jest.fn(),
    ])
    render(<ContactForm />)
    expect(screen.getByText('Error al enviar el mensaje')).toBeInTheDocument()
    expect(screen.getByText('Error al enviar el mensaje')).toHaveClass('text-red-600')
  })
});