import React from 'react'
import { render, screen } from '@testing-library/react'
import { OtherServicesCarousel } from '../OtherServicesCarousel'

// Mock Embla Carousel
jest.mock('embla-carousel-react', () => {
  const useEmblaCarousel = jest.fn(() => [jest.fn(), {}]);
  return useEmblaCarousel;
});
jest.mock('embla-carousel-autoplay', () => jest.fn());

// Mock the otherServicesData
jest.mock('@/data/otherServices.data', () => ({
  otherServicesData: [
    { name: 'Guardería Canina', icon: <div data-testid="guarderia-icon" /> },
    { name: 'Grooming', icon: <div data-testid="grooming-icon" /> },
    { name: 'Consulta Veterinaria', icon: <div data-testid="veterinaria-icon" /> },
    { name: 'Transporte', icon: <div data-testid="transporte-icon" /> },
    { name: 'Hotel Canino', icon: <div data-testid="hotel-icon" /> },
    { name: 'Paseos', icon: <div data-testid="paseos-icon" /> },
  ],
}))

describe('OtherServicesCarousel', () => {
  it('renders the carousel title', () => {
    render(<OtherServicesCarousel />)
    expect(screen.getByText('Un Cuidado Integral para tu Mascota')).toBeInTheDocument()
  })

  it('renders all service items by their names', () => {
    render(<OtherServicesCarousel />)
    expect(screen.getByText('Guardería Canina')).toBeInTheDocument()
    expect(screen.getByText('Grooming')).toBeInTheDocument()
    expect(screen.getByText('Consulta Veterinaria')).toBeInTheDocument()
    expect(screen.getByText('Transporte')).toBeInTheDocument()
    expect(screen.getByText('Hotel Canino')).toBeInTheDocument()
    expect(screen.getByText('Paseos')).toBeInTheDocument()
  })

  it('renders service icons', () => {
    render(<OtherServicesCarousel />)
    expect(screen.getByTestId('guarderia-icon')).toBeInTheDocument()
    expect(screen.getByTestId('grooming-icon')).toBeInTheDocument()
    expect(screen.getByTestId('veterinaria-icon')).toBeInTheDocument()
    expect(screen.getByTestId('transporte-icon')).toBeInTheDocument()
    expect(screen.getByTestId('hotel-icon')).toBeInTheDocument()
    expect(screen.getByTestId('paseos-icon')).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    expect(() => {
      render(<OtherServicesCarousel />)
    }).not.toThrow()
  })
})
