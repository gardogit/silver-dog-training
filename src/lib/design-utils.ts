import { colors, spacing, borderRadius, shadows } from './design-system'

// Color utility functions
export const getColorValue = (colorPath: string): string => {
  const keys = colorPath.split('.')
  let value: unknown = colors
  
  for (const key of keys) {
    if (typeof value === 'object' && value !== null && key in value) {
      value = (value as Record<string, unknown>)[key]
    } else {
      throw new Error(`Color path "${colorPath}" not found`)
    }
  }
  
  if (typeof value !== 'string') {
    throw new Error(`Color path "${colorPath}" does not resolve to a string`)
  }
  
  return value
}

// Spacing utility functions
export const getSpacingValue = (spacingKey: keyof typeof spacing): string => {
  return spacing[spacingKey]
}

// Border radius utility functions
export const getBorderRadiusValue = (radiusKey: keyof typeof borderRadius): string => {
  return borderRadius[radiusKey]
}

// Shadow utility functions
export const getShadowValue = (shadowKey: keyof typeof shadows): string => {
  return shadows[shadowKey]
}

// Responsive breakpoint utilities
export const mediaQueries = {
  xs: '(min-width: 475px)',
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
} as const

// CSS-in-JS style helpers
export const createResponsiveStyles = (styles: Record<string, Record<string, string | number>>) => {
  const result: Record<string, Record<string, string | number> | string | number> = {}
  
  Object.entries(styles).forEach(([breakpoint, style]) => {
    if (breakpoint === 'base') {
      Object.assign(result, style)
    } else {
      const mediaQuery = mediaQueries[breakpoint as keyof typeof mediaQueries]
      if (mediaQuery) {
        result[`@media ${mediaQuery}`] = style
      }
    }
  })
  
  return result
}

// Theme-aware color functions
export const withOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba
  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

// Animation utilities
export const createTransition = (
  properties: string[] = ['all'],
  duration: string = '300ms',
  easing: string = 'cubic-bezier(0.4, 0, 0.2, 1)'
): string => {
  return properties.map(prop => `${prop} ${duration} ${easing}`).join(', ')
}

// Layout utilities
export const containerStyles = {
  width: '100%',
  maxWidth: '1200px',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  '@media (min-width: 640px)': {
    paddingLeft: '2rem',
    paddingRight: '2rem',
  },
} as const

// Focus ring utility
export const focusRing = {
  outline: `2px solid ${colors.primary.DEFAULT}`,
  outlineOffset: '2px',
}

// Button variant utilities
export const buttonVariants = {
  primary: {
    backgroundColor: colors.primary.DEFAULT,
    color: 'white',
    '&:hover': {
      backgroundColor: colors.primary[600],
    },
    '&:focus': focusRing,
  },
  secondary: {
    backgroundColor: colors.secondary.DEFAULT,
    color: 'white',
    '&:hover': {
      backgroundColor: colors.secondary[700],
    },
    '&:focus': focusRing,
  },
  outline: {
    backgroundColor: 'transparent',
    color: colors.primary.DEFAULT,
    border: `1px solid ${colors.primary.DEFAULT}`,
    '&:hover': {
      backgroundColor: colors.primary[50],
    },
    '&:focus': focusRing,
  },
  ghost: {
    backgroundColor: 'transparent',
    color: colors.neutral[700],
    '&:hover': {
      backgroundColor: colors.neutral[100],
    },
    '&:focus': focusRing,
  },
}

// Input variant utilities
export const inputVariants = {
  default: {
    backgroundColor: 'white',
    border: `1px solid ${colors.neutral[300]}`,
    borderRadius: borderRadius.md,
    '&:focus': {
      ...focusRing,
      borderColor: colors.primary.DEFAULT,
    },
    '&:disabled': {
      backgroundColor: colors.neutral[100],
      color: colors.neutral[500],
      cursor: 'not-allowed',
    },
  },
  error: {
    borderColor: '#ef4444',
    '&:focus': {
      outline: '2px solid #ef4444',
      outlineOffset: '2px',
      borderColor: '#ef4444',
    },
  },
}