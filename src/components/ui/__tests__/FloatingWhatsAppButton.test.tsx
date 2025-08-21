import React from 'react'
import { render, screen } from '@testing-library/react'
import { FloatingWhatsAppButton } from '../FloatingWhatsAppButton'

// Mock del objeto 'brand' para aislar el test
jest.mock('@/lib/design-system', () => ({
  brand: {
    contact: {
      whatsapp: '123456789',
    },
  },
}));

// Mock limpio de `react-icons` para pasar el build
jest.mock('react-icons/fa', () => ({
  FaWhatsapp: () => <svg data-testid="whatsapp-icon" />,
}));


describe('FloatingWhatsAppButton Component', () => {

  it('renders a link with the correct accessibility label and attributes', () => {
    render(<FloatingWhatsAppButton />);
    
    // CORREGIDO: Se busca el enlace por su rol y nombre accesible, que ahora es único
    const link = screen.getByRole('link', { name: 'Contactar por WhatsApp' });
    
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', expect.stringContaining('wa.me/123456789'));
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('includes a default message in the href', () => {
    render(<FloatingWhatsAppButton />);
    const link = screen.getByRole('link', { name: 'Contactar por WhatsApp' });
    const defaultMessage = 'Hola, me interesa conocer más sobre sus servicios de adiestramiento canino';
    
    // Verificamos que el href contenga la versión codificada del mensaje
    expect(link).toHaveAttribute('href', expect.stringContaining(encodeURIComponent(defaultMessage)));
  });

  it('includes a custom message in the href when provided', () => {
    const customMessage = 'Mensaje personalizado de prueba';
    render(<FloatingWhatsAppButton message={customMessage} />);
    
    const link = screen.getByRole('link', { name: 'Contactar por WhatsApp' });
    expect(link).toHaveAttribute('href', expect.stringContaining(encodeURIComponent(customMessage)));
  });

  it('applies custom className to the wrapper div', () => {
    render(<FloatingWhatsAppButton className="custom-class" />);
    
    // CORREGIDO: Usamos el data-testid que añadimos para encontrar el contenedor
    const wrapper = screen.getByTestId('floating-whatsapp-button');
    expect(wrapper).toHaveClass('custom-class');
  });

  it('has proper positioning classes', () => {
    render(<FloatingWhatsAppButton />);
    const wrapper = screen.getByTestId('floating-whatsapp-button');
    
    // CORREGIDO: Se verifican las clases en un solo string para robustez
    expect(wrapper).toHaveClass('fixed bottom-6 right-6 z-50');
  });

  it('includes WhatsApp icon', () => {
    render(<FloatingWhatsAppButton />);
    // Verificamos el icono a través de su data-testid del mock
    expect(screen.getByTestId('whatsapp-icon')).toBeInTheDocument();
  });
});