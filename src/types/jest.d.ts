import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveClass(className: string): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveValue(value: string | number): R
      toBeVisible(): R
      toBeDisabled(): R
      toBeEnabled(): R
      toHaveTextContent(text: string | RegExp): R
    }
  }
}
