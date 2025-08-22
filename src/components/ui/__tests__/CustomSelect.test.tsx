import React from "react";
import { render, screen } from "@testing-library/react";
import { CustomSelect, CustomSelectItem } from "../CustomSelect";

type MockProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
};

jest.mock("@radix-ui/react-select", () => ({
  Root: ({
    children,
    value,
    disabled,
  }: MockProps & {
    value: string;
    disabled?: boolean;
  }) => (
    <div data-testid="select-root" data-value={value} data-disabled={disabled}>
      {children}
    </div>
  ),
  Trigger: ({ children, className, ...props }: MockProps) => (
    <button
      role="combobox"
      aria-expanded="false"
      aria-controls="listbox"
      className={className}
      data-testid="select-trigger"
      {...props}
    >
      {children}
    </button>
  ),
  Value: ({ placeholder, children }: MockProps & { placeholder?: string }) => (
    <span data-testid="select-value">{children || placeholder}</span>
  ),
  Icon: ({ children }: MockProps) => (
    <span data-testid="select-icon">{children}</span>
  ),
  Portal: ({ children }: MockProps) => (
    <div data-testid="select-portal">{children}</div>
  ),
  Content: ({ children, className }: MockProps) => (
    <div role="listbox" id="listbox" className={className} data-testid="select-content">
      {children}
    </div>
  ),
  Viewport: ({ children }: MockProps) => (
    <div data-testid="select-viewport">{children}</div>
  ),
  ScrollUpButton: ({ children }: MockProps) => (
    <div data-testid="select-scroll-up">{children}</div>
  ),
  ScrollDownButton: ({ children }: MockProps) => (
    <div data-testid="select-scroll-down">{children}</div>
  ),
  Item: ({ children, value, className, ...props }: MockProps & { value: string }) => (
    <div
      role="option"
      aria-selected="false"
      data-value={value}
      className={className}
      data-testid={`select-item-${value}`}
      {...props}
    >
      {children}
    </div>
  ),
  ItemText: ({ children }: MockProps) => (
    <span data-testid="select-item-text">{children}</span>
  ),
  ItemIndicator: ({ children, className }: MockProps) => (
    <span data-testid="select-item-indicator" className={className}>
      {children}
    </span>
  ),
}));

jest.mock("react-icons/fa", () => ({
  FaCheck: () => <span data-testid="check-icon">✓</span>,
  FaChevronDown: () => <span data-testid="chevron-down">▼</span>,
  FaChevronUp: () => <span data-testid="chevron-up">▲</span>,
}));

describe("CustomSelect", () => {
  const mockOnValueChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default props", () => {
    render(
      <CustomSelect
        value=""
        onValueChange={mockOnValueChange}
        ariaLabel="Select option"
        name="test"
      >
        <CustomSelectItem value="option1">Option 1</CustomSelectItem>
      </CustomSelect>
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders with placeholder", () => {
    render(
      <CustomSelect
        value=""
        onValueChange={mockOnValueChange}
        placeholder="Select an option..."
        ariaLabel="Select option"
        name="test"
      >
        <CustomSelectItem value="option1">Option 1</CustomSelectItem>
      </CustomSelect>
    );
    expect(screen.getByText("Select an option...")).toBeInTheDocument();
  });

  it("renders with aria label", () => {
    render(
      <CustomSelect
        value=""
        onValueChange={mockOnValueChange}
        ariaLabel="Choose option"
        name="test"
      >
        <CustomSelectItem value="option1">Option 1</CustomSelectItem>
      </CustomSelect>
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("aria-label", "Choose option");
  });

  it("renders in disabled state", () => {
    render(
      <CustomSelect
        value=""
        onValueChange={mockOnValueChange}
        ariaLabel="Select option"
        name="test"
        disabled
      >
        <CustomSelectItem value="option1">Option 1</CustomSelectItem>
      </CustomSelect>
    );
    const root = screen.getByTestId("select-root");
    expect(root).toHaveAttribute("data-disabled", "true");
  });

  it("applies light variant styling by default", () => {
    render(
      <CustomSelect value="" onValueChange={mockOnValueChange} ariaLabel="Select option" name="test">
        <CustomSelectItem value="option1">Option 1</CustomSelectItem>
      </CustomSelect>
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveClass("bg-white border-neutral-300");
  });

  it("applies dark variant styling when specified", () => {
    render(
      <CustomSelect value="" onValueChange={mockOnValueChange} ariaLabel="Select option" variant="dark" name="test">
        <CustomSelectItem value="option1">Option 1</CustomSelectItem>
      </CustomSelect>
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveClass("bg-neutral-800 border-neutral-600 text-white");
  });

  it("renders select items correctly", () => {
    render(
      <CustomSelect value="" onValueChange={mockOnValueChange} ariaLabel="Select option" name="test">
        <CustomSelectItem value="option1">Option 1</CustomSelectItem>
        <CustomSelectItem value="option2">Option 2</CustomSelectItem>
      </CustomSelect>
    );
    expect(screen.getByTestId("select-item-option1")).toBeInTheDocument();
    expect(screen.getByTestId("select-item-option2")).toBeInTheDocument();
  });

  it("renders icons correctly", () => {
    render(
      <CustomSelect value="" onValueChange={mockOnValueChange} ariaLabel="Select option" name="test">
        <CustomSelectItem value="option1">Option 1</CustomSelectItem>
      </CustomSelect>
    );
    expect(screen.getAllByTestId("chevron-down").length).toBeGreaterThan(0);
    expect(screen.getByTestId("check-icon")).toBeInTheDocument();
  });

  it("displays current value when provided", () => {
    render(
      <CustomSelect value="option1" onValueChange={mockOnValueChange} ariaLabel="Select option" name="test">
        <CustomSelectItem value="option1">Option 1</CustomSelectItem>
      </CustomSelect>
    );
    expect(screen.getByTestId("select-root")).toHaveAttribute("data-value", "option1");
  });

  it("renders with custom className", () => {
    render(
      <CustomSelect value="" onValueChange={mockOnValueChange} ariaLabel="Select option" className="custom-select-class" name="test">
        <CustomSelectItem value="option1">Option 1</CustomSelectItem>
      </CustomSelect>
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveClass("custom-select-class");
  });

  it("renders select content with proper structure", () => {
    render(
      <CustomSelect value="" onValueChange={mockOnValueChange} ariaLabel="Select option" name="test">
        <CustomSelectItem value="option1">Option 1</CustomSelectItem>
      </CustomSelect>
    );
    expect(screen.getByTestId("select-portal")).toBeInTheDocument();
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByTestId("select-viewport")).toBeInTheDocument();
  });

  it("applies correct styling to select content based on variant", () => {
    render(
      <CustomSelect value="" onValueChange={mockOnValueChange} ariaLabel="Select option" variant="dark" name="test">
        <CustomSelectItem value="option1">Option 1</CustomSelectItem>
      </CustomSelect>
    );
    const content = screen.getByRole("listbox");
    expect(content).toHaveClass("bg-neutral-800 border-neutral-600");
  });

  it("renders select items with proper styling based on variant", () => {
    render(
      <CustomSelect value="" onValueChange={mockOnValueChange} ariaLabel="Select option" variant="light" name="test">
        <CustomSelectItem value="option1">Option 1</CustomSelectItem>
      </CustomSelect>
    );
    const item = screen.getByTestId("select-item-option1");
    expect(item).toHaveClass("text-neutral-700");
  });

  it("has proper accessibility attributes", () => {
    render(
      <CustomSelect value="" onValueChange={mockOnValueChange} ariaLabel="Select option" name="test">
        <CustomSelectItem value="option1">Option 1</CustomSelectItem>
      </CustomSelect>
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("aria-label", "Select option");
    const content = screen.getByRole("listbox");
    expect(content).toBeInTheDocument();
    const option = screen.getByRole("option");
    expect(option).toBeInTheDocument();
  });

  it("renders select icon", () => {
    render(
      <CustomSelect value="" onValueChange={mockOnValueChange} ariaLabel="Select option" name="test">
        <CustomSelectItem value="option1">Option 1</CustomSelectItem>
      </CustomSelect>
    );
    expect(screen.getByTestId("select-icon")).toBeInTheDocument();
  });

  it("renders item indicators", () => {
    render(
      <CustomSelect value="" onValueChange={mockOnValueChange} ariaLabel="Select option" name="test">
        <CustomSelectItem value="option1">Option 1</CustomSelectItem>
      </CustomSelect>
    );
    expect(screen.getByTestId("select-item-indicator")).toBeInTheDocument();
  });
});