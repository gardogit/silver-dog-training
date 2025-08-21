import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // <-- Usaremos userEvent para clics
import { Button } from '../Button';

// Mock de un icono simple para los tests
const MockIcon = () => <span data-testid="mock-icon">Icon</span>;

describe('Button Component', () => {
  const user = userEvent.setup();

  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    
    // CORREGIDO: El default 'primary' ahora es 'bg-orange-500'
    expect(button).toHaveClass('bg-orange-500'); 
    
    // El default 'md' es 'h-10'
    expect(button).toHaveClass('h-10');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    // CORREGIDO: Se buscan las clases reales de Tailwind para cada variante
    expect(screen.getByRole('button')).toHaveClass('bg-orange-500');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-orange-100');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-orange-600 bg-transparent');

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-neutral-700 bg-transparent');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-8');

    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-10');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-12');
  });

  it('renders with left icon', () => {
    render(<Button leftIcon={<MockIcon />}>With Left Icon</Button>);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('renders with right icon', () => {
    render(<Button rightIcon={<MockIcon />}>With Right Icon</Button>);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<Button loading>Loading Text</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.queryByText('Loading Text')).toBeNull(); // El texto del botón no debe renderizarse
    expect(button.querySelector('svg')).toBeInTheDocument(); // El spinner sí
  });

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders full width', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    
    // MEJORADO: Usando userEvent para simular un clic más realista
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not handle click when disabled', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Disabled</Button>);
    
    // userEvent respeta el estado 'disabled' y no disparará el evento
    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not handle click when loading', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} loading>Loading</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('has proper accessibility attributes', () => {
    render(<Button aria-label="Accessible button">Button</Button>);
    const button = screen.getByRole('button', { name: 'Accessible button' });
    expect(button).toBeInTheDocument();
  });

  // MEJORADO: Este test ahora simula correctamente la navegación por teclado
  it('supports keyboard navigation', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Keyboard</Button>);
    
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
    
    // userEvent simula correctamente que 'Enter' y 'Space' disparan un clic en un botón
    await user.keyboard('{enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);

    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});