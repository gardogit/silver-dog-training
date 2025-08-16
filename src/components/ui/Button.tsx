import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import { ButtonVariant, ButtonSize } from '@/types/design-system'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loading?: boolean
  fullWidth?: boolean
  asChild?: boolean
}

const buttonVariants = {
  primary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500 focus:ring-2 focus:ring-offset-2',
  secondary: 'bg-lime-800 text-white hover:bg-lime-900 focus:ring-lime-800 focus:ring-2 focus:ring-offset-2',
  outline: 'border-2 border-orange-600 text-orange-600 bg-transparent hover:bg-primary-50 focus:ring-primary focus:ring-2 focus:ring-offset-2',
  ghost: 'text-neutral-700 bg-transparent hover:bg-neutral-100 focus:ring-neutral-500 focus:ring-2 focus:ring-offset-2',
}

const buttonSizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    children,
    leftIcon,
    rightIcon,
    loading = false,
    fullWidth = false,
    disabled,
    asChild = false,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading

    const buttonClasses = cn(
      // Base styles
      'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200',
      'focus:outline-none focus:ring-offset-white',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none cursor-pointer',
      // Variant styles
      buttonVariants[variant],
      // Size styles
      buttonSizes[size],
      // Full width
      fullWidth && 'w-full',
      // Custom className
      className
    )

    if (asChild) {
      return (
        <Slot
          className={buttonClasses}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    return (
      <button
        className={buttonClasses}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {!loading && leftIcon && (
          <span className="flex-shrink-0">
            {leftIcon}
          </span>
        )}

        <span className={cn(
          'flex-1 text-center',
          (leftIcon || rightIcon || loading) && 'flex-none'
        )}>
          {children}
        </span>

        {!loading && rightIcon && (
          <span className="flex-shrink-0">
            {rightIcon}
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, type ButtonProps }