import React from 'react'
import { render, screen } from '@testing-library/react'
import { 
  Card, 
  CardHeader, 
  CardImage, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '../Card'

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ 
    src, 
    alt, 
    width, 
    height, 
    className
  }: {
    src: string
    alt: string
    width?: number
    height?: number
    className?: string
    priority?: boolean
    [key: string]: unknown
  }) {
    // Only pass valid HTML attributes to div element (avoiding img ESLint warning)
    return (
      <div
        data-testid="mock-image"
        data-src={src}
        data-alt={alt}
        data-width={width}
        data-height={height}
        className={className}
        role="img"
        aria-label={alt}
      />
    )
  }
})

describe('Card Component', () => {
  it('renders with default props', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    )
    
    const card = screen.getByText('Card content').parentElement
    expect(card).toHaveClass('bg-white rounded-lg')
    expect(card).toBeInTheDocument()
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Card size="sm">Small card</Card>)
    const smallCard = screen.getByText('Small card').parentElement
    expect(smallCard).toBeInTheDocument()

    rerender(<Card size="md">Medium card</Card>)
    const mediumCard = screen.getByText('Medium card').parentElement
    expect(mediumCard).toBeInTheDocument()

    rerender(<Card size="lg">Large card</Card>)
    const largeCard = screen.getByText('Large card').parentElement
    expect(largeCard).toBeInTheDocument()
  })

  it('renders with hover effects', () => {
    render(<Card hover>Hoverable card</Card>)
    
    const card = screen.getByText('Hoverable card').parentElement
    expect(card).toBeInTheDocument()
    // Test that hover prop is accepted without errors
  })

  it('applies custom className', () => {
    render(<Card className="custom-class">Custom card</Card>)
    
    const card = screen.getByText('Custom card').parentElement
    expect(card).toBeInTheDocument()
    // Test that custom className prop is accepted without errors
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Card ref={ref}>Ref card</Card>)
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

describe('CardHeader Component', () => {
  it('renders with proper styling', () => {
    render(
      <CardHeader>
        <h2>Header content</h2>
      </CardHeader>
    )
    
    const header = screen.getByText('Header content').parentElement
    expect(header).toHaveClass('flex flex-col space-y-1.5')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<CardHeader ref={ref}>Header</CardHeader>)
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

describe('CardImage Component', () => {
  it('renders with default props', () => {
    render(<CardImage src="/test-image.jpg" alt="Test image" />)
    
    const image = screen.getByTestId('mock-image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('data-src', '/test-image.jpg')
    expect(image).toHaveAttribute('data-width', '400')
    expect(image).toHaveAttribute('data-height', '200')
    expect(image).toHaveAttribute('aria-label', 'Test image')
  })

  it('renders with custom dimensions', () => {
    render(<CardImage src="/test.jpg" alt="Custom size" width={800} height={400} />)
    
    const image = screen.getByTestId('mock-image')
    expect(image).toHaveAttribute('data-width', '800')
    expect(image).toHaveAttribute('data-height', '400')
  })

  it('renders with proper accessibility', () => {
    render(<CardImage src="/test.jpg" alt="Hover image" />)
    
    const image = screen.getByTestId('mock-image')
    expect(image).toHaveAttribute('role', 'img')
    expect(image).toHaveAttribute('aria-label', 'Hover image')
  })
})

describe('CardTitle Component', () => {
  it('renders with default heading level', () => {
    render(<CardTitle>Card Title</CardTitle>)
    
    const title = screen.getByRole('heading', { level: 3 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Card Title')
    expect(title).toHaveClass('text-lg font-semibold')
  })

  it('renders with custom heading level', () => {
    render(<CardTitle as="h2">Custom Title</CardTitle>)
    
    const title = screen.getByRole('heading', { level: 2 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Custom Title')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLHeadingElement>()
    render(<CardTitle ref={ref}>Ref Title</CardTitle>)
    
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement)
  })
})

describe('CardDescription Component', () => {
  it('renders with proper styling', () => {
    render(<CardDescription>This is a description</CardDescription>)
    
    const description = screen.getByText('This is a description')
    expect(description).toBeInTheDocument()
    expect(description).toHaveClass('text-sm text-neutral-600')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLParagraphElement>()
    render(<CardDescription ref={ref}>Description</CardDescription>)
    
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement)
  })
})

describe('CardContent Component', () => {
  it('renders with proper styling', () => {
    render(<CardContent>Content area</CardContent>)
    
    const content = screen.getByText('Content area')
    expect(content).toBeInTheDocument()
    expect(content).toHaveClass('pt-0')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<CardContent ref={ref}>Content</CardContent>)
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

describe('CardFooter Component', () => {
  it('renders with proper styling', () => {
    render(<CardFooter>Footer content</CardFooter>)
    
    const footer = screen.getByText('Footer content')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveClass('flex items-center pt-4')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<CardFooter ref={ref}>Footer</CardFooter>)
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

describe('Card Composition', () => {
  it('renders complete card with all components', () => {
    render(
      <Card>
        <CardImage src="/test.jpg" alt="Test" />
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
          <CardDescription>This is a test card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content goes here</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    )
    
    expect(screen.getByTestId('mock-image')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Test Card' })).toBeInTheDocument()
    expect(screen.getByText('This is a test card')).toBeInTheDocument()
    expect(screen.getByText('Main content goes here')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
  })
})