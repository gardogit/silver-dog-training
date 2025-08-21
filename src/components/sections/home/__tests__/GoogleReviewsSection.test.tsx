import React from 'react'
import { render, screen } from '@testing-library/react'
import { GoogleReviewsSection } from '../GoogleReviewsSection'

jest.mock('embla-carousel-react', () => {
  const useEmblaCarousel = jest.fn(() => [
    jest.fn(),
    {
      scrollNext: jest.fn(),
      scrollPrev: jest.fn(),
      canScrollNext: jest.fn(() => true),
      canScrollPrev: jest.fn(() => true),
      on: jest.fn(),
      off: jest.fn(),
    }
  ]);
  return useEmblaCarousel;
});

// Mock de ReviewCard
jest.mock('@/components/ui/ReviewCard', () => {
  interface MockReviewCardProps {
    review: { authorName: string; authorPhotoUrl?: string; };
  }
  const MockReviewCard: React.FC<MockReviewCardProps> = ({ review }) => (
    <div data-testid="review-card">
      <div>{review.authorName}</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={review.authorPhotoUrl} alt={review.authorName} />
    </div>
  );
  MockReviewCard.displayName = 'ReviewCard';
  return { ReviewCard: MockReviewCard };
});

// Mock de Autoplay
jest.mock('embla-carousel-autoplay', () => jest.fn());

describe('GoogleReviewsSection', () => {
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the section title correctly', () => {
    render(<GoogleReviewsSection />);
    expect(screen.getByText(/lo que dicen nuestros clientes/i)).toBeInTheDocument();
  });

  it('renders section description', () => {
    render(<GoogleReviewsSection />);
    expect(screen.getByText(/nos enorgullece el impacto positivo/i)).toBeInTheDocument();
  });

  it('renders all review cards', () => {
    render(<GoogleReviewsSection />);
    const reviewCards = screen.getAllByTestId('review-card');
    expect(reviewCards).toHaveLength(5);
  });

  it('renders reviewer avatars', () => {
    render(<GoogleReviewsSection />);
    const avatars = screen.getAllByRole('img');
    expect(avatars).toHaveLength(5);
    expect(avatars[0]).toHaveAttribute(
      'src',
      'https://randomuser.me/api/portraits/women/44.jpg'
    );
  });

  it('applies custom className when provided', () => {
    render(<GoogleReviewsSection className="custom-reviews-class" />);
    const section = screen.getByTestId("google-reviews-section");
    expect(section).toHaveClass("custom-reviews-class");
  });

  it('has proper accessibility structure', () => {
    render(<GoogleReviewsSection />);
    const heading = screen.getByRole('heading', { level: 2, name: /lo que dicen nuestros clientes/i });
    expect(heading).toBeInTheDocument();
  });
});