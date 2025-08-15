import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { CardSize } from '@/types/design-system'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: CardSize
  hover?: boolean
  shadow?: 'soft' | 'medium' | 'strong'
  children: React.ReactNode
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface CardImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const cardSizes = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const cardShadows = {
  soft: 'shadow-soft',
  medium: 'shadow-medium',
  strong: 'shadow-strong',
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    size = 'md',
    hover = false,
    shadow = 'soft',
    children,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'bg-white rounded-lg border border-neutral-200 overflow-hidden',
          // Shadow
          cardShadows[shadow],
          // Padding
          cardSizes[size],
          // Hover effects
          hover && 'transition-all duration-300 hover:shadow-medium hover:-translate-y-1',
          // Custom className
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

const CardImage: React.FC<CardImageProps> = ({ 
  src, 
  alt, 
  width = 400, 
  height = 200, 
  className,
  priority = false,
  ...props 
}) => {
  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        {...props}
      />
    </div>
  )
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, as: Component = 'h3', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'text-lg font-semibold leading-none tracking-tight text-neutral-900',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-neutral-600 leading-relaxed', className)}
        {...props}
      >
        {children}
      </p>
    )
  }
)

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('pt-0', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center pt-4', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardImage.displayName = 'CardImage'
CardTitle.displayName = 'CardTitle'
CardDescription.displayName = 'CardDescription'
CardContent.displayName = 'CardContent'
CardFooter.displayName = 'CardFooter'

export { 
  Card, 
  CardHeader, 
  CardImage, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  type CardProps,
  type CardHeaderProps,
  type CardImageProps,
  type CardTitleProps,
  type CardDescriptionProps,
  type CardContentProps,
  type CardFooterProps
}