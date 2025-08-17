import React from 'react'
import { cn } from '@/lib/utils'
import { InputSize } from '@/types/design-system'

interface BaseInputProps {
  size?: InputSize
  label?: string
  error?: string
  helperText?: string
  required?: boolean
  fullWidth?: boolean
}

interface InputProps extends BaseInputProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'url'
}

interface TextareaProps extends BaseInputProps, Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  rows?: number
}

const inputSizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-4 text-lg',
}

const textareaSizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-4 py-3 text-lg',
}

const getInputClasses = (hasError: boolean, size: InputSize) => {
  return cn(
    // Base styles
    'w-full rounded-md border bg-white transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed',
    'placeholder:text-neutral-400',
    // Size styles
    inputSizes[size],
    // Error/success states
    hasError
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-neutral-300 focus:border-orange-500 focus:ring-orange-500'
  )
}

const getTextareaClasses = (hasError: boolean, size: InputSize) => {
  return cn(
    // Base styles
    'w-full rounded-md border bg-white transition-all duration-200 resize-vertical',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed',
    'placeholder:text-neutral-400',
    // Size styles
    textareaSizes[size],
    // Error/success states
    hasError
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-neutral-300 focus:border-orange-500 focus:ring-orange-500'
  )
}

const InputWrapper: React.FC<{
  children: React.ReactNode
  label?: string
  error?: string
  helperText?: string
  required?: boolean
  fullWidth?: boolean
  htmlFor?: string
}> = ({ children, label, error, helperText, required, fullWidth, htmlFor }) => {
  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
      {label && (
        <label
          htmlFor={htmlFor}
          className={cn(
            'text-sm font-medium text-neutral-700',
            required && "after:content-['*'] after:text-red-500 after:ml-1"
          )}
        >
          {label}
        </label>
      )}
      
      {children}
      
      {(error || helperText) && (
        <div className="min-h-[1.25rem]">
          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : helperText ? (
            <p className="text-sm text-neutral-500">
              {helperText}
            </p>
          ) : null}
        </div>
      )}
    </div>
  )
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text',
    size = 'md',
    label,
    error,
    helperText,
    required,
    fullWidth = true,
    id,
    ...props 
  }, ref) => {
    const generatedId = React.useId()
    const inputId = id || `input-${generatedId}`
    const hasError = Boolean(error)

    return (
      <InputWrapper
        label={label}
        error={error}
        helperText={helperText}
        required={required}
        fullWidth={fullWidth}
        htmlFor={inputId}
      >
        <input
          type={type}
          className={cn(
            getInputClasses(hasError, size),
            className
          )}
          ref={ref}
          id={inputId}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${inputId}-error` : 
            helperText ? `${inputId}-helper` : 
            undefined
          }
          {...props}
        />
      </InputWrapper>
    )
  }
)

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    size = 'md',
    rows = 4,
    label,
    error,
    helperText,
    required,
    fullWidth = true,
    id,
    ...props 
  }, ref) => {
    const generatedId = React.useId()
    const textareaId = id || `textarea-${generatedId}`
    const hasError = Boolean(error)

    return (
      <InputWrapper
        label={label}
        error={error}
        helperText={helperText}
        required={required}
        fullWidth={fullWidth}
        htmlFor={textareaId}
      >
        <textarea
          className={cn(
            getTextareaClasses(hasError, size),
            className
          )}
          ref={ref}
          id={textareaId}
          rows={rows}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${textareaId}-error` : 
            helperText ? `${textareaId}-helper` : 
            undefined
          }
          {...props}
        />
      </InputWrapper>
    )
  }
)

Input.displayName = 'Input'
Textarea.displayName = 'Textarea'

export { Input, Textarea, type InputProps, type TextareaProps }