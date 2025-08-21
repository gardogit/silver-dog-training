import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ServicesSection } from "../ServicesSection";

jest.mock("next/image", () => {
  const MockImage = ({ src, alt }: { src: string; alt: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} />;
  };
  MockImage.displayName = "MockImage"; // Satisfacemos la regla de ESLint
  return MockImage;
});

// Mock Next.js Link component
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  MockLink.displayName = "MockLink"; // Satisfacemos la regla de ESLint
  return MockLink;
});

// Mock Next.js router
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock de `react-icons`
jest.mock("react-icons/fa", () => ({
  FaUser: () => <svg role="img" aria-label="User Icon" />,
  FaUsers: () => <svg role="img" aria-label="Users Icon" />,
  FaShieldAlt: () => <svg role="img" aria-label="Shield Icon" />,
  FaArrowRight: () => <svg role="img" aria-label="Arrow Right Icon" />,
}));

// Mock de componentes hijos
jest.mock("@/components/ui/CallToActionBanner", () => ({
  CallToActionBanner: () => <div data-testid="call-to-action-banner" />,
}));
jest.mock("@/components/ui/OtherServicesCarousel", () => ({
  OtherServicesCarousel: () => <div data-testid="other-services-carousel" />,
}));

describe("ServicesSection", () => {
  const user = userEvent.setup();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the section header correctly", () => {
    render(<ServicesSection />);
    expect(screen.getByText("Nuestros Servicios")).toBeInTheDocument();
    expect(
      screen.getByText(/ofrecemos una variedad de programas/i)
    ).toBeInTheDocument();
  });

  it("renders all three service cards", () => {
    render(<ServicesSection />);
    expect(
      screen.getByTestId("service-card-personalizado")
    ).toBeInTheDocument();
    expect(screen.getByTestId("service-card-grupal")).toBeInTheDocument();
    expect(screen.getByTestId("service-card-k9")).toBeInTheDocument();
  });

  it("displays correct service information for each card", () => {
    render(<ServicesSection />);
    expect(screen.getByText("Clase Personalizada")).toBeInTheDocument();
    expect(screen.getByText("Clases Grupales")).toBeInTheDocument();
    expect(screen.getByText("Entrenamiento K9")).toBeInTheDocument();
  });

  // --- CORRECCIÓN APLICADA AQUÍ ---
  it('navigates to courses page when "Más Información" button is clicked', async () => {
    render(<ServicesSection />);

    // Se usa una expresión regular para una búsqueda flexible del nombre del botón
    const buttons = screen.getAllByRole("button", { name: /Más Información/i });
    await user.click(buttons[0]);

    expect(mockPush).toHaveBeenCalledWith("/cursos?tab=personalizado");
  });

  it("renders service images with correct alt text", () => {
    render(<ServicesSection />);
    expect(screen.getByAltText("Clase Personalizada")).toBeInTheDocument();
    expect(screen.getByAltText("Clases Grupales")).toBeInTheDocument();
    expect(screen.getByAltText("Entrenamiento K9")).toBeInTheDocument();
  });

  it("renders the other services carousel", () => {
    render(<ServicesSection />);
    expect(screen.getByTestId("other-services-carousel")).toBeInTheDocument();
  });

  it("renders the call to action banner", () => {
    render(<ServicesSection />);
    expect(screen.getByTestId("call-to-action-banner")).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    render(<ServicesSection className="custom-class" />);
    const section = screen.getByTestId("services-section");
    expect(section).toHaveClass("custom-class");
  });

  it("has proper accessibility structure", () => {
    render(<ServicesSection />);
    const mainHeading = screen.getByRole("heading", {
      level: 2,
      name: /Nuestros Servicios/i,
    });
    expect(mainHeading).toBeInTheDocument();

    const serviceHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(serviceHeadings).toHaveLength(3);
  });
});
