// Design System Types

export type ColorScale = {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  DEFAULT?: string
  light?: string
}

export type BrandColors = {
  primary: ColorScale & { DEFAULT: string; light: string }
  secondary: ColorScale & { DEFAULT: string; light: string }
  neutral: ColorScale
}

export type SpacingScale = {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
  '4xl': string
  '5xl': string
}

export type BorderRadiusScale = {
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  full: string
}

export type ShadowScale = {
  soft: string
  medium: string
  strong: string
}

export type TypographyScale = {
  fontFamily: {
    sans: string[]
    heading: string[]
  }
  fontSize: {
    xs: [string, { lineHeight: string }]
    sm: [string, { lineHeight: string }]
    base: [string, { lineHeight: string }]
    lg: [string, { lineHeight: string }]
    xl: [string, { lineHeight: string }]
    '2xl': [string, { lineHeight: string }]
    '3xl': [string, { lineHeight: string }]
    '4xl': [string, { lineHeight: string }]
    '5xl': [string, { lineHeight: string }]
  }
  fontWeight: {
    light: string
    normal: string
    medium: string
    semibold: string
    bold: string
    extrabold: string
    black: string
  }
}

export type BreakpointScale = {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
}

export type AnimationConfig = {
  duration: {
    fast: string
    normal: string
    slow: string
  }
  easing: {
    linear: string
    in: string
    out: string
    inOut: string
  }
}

export type ComponentTokens = {
  button: {
    height: {
      sm: string
      md: string
      lg: string
    }
    padding: {
      sm: string
      md: string
      lg: string
    }
  }
  input: {
    height: {
      sm: string
      md: string
      lg: string
    }
    padding: {
      sm: string
      md: string
      lg: string
    }
  }
  card: {
    padding: {
      sm: string
      md: string
      lg: string
    }
  }
}

export type BrandConfig = {
  name: string
  tagline: string
  contact: {
    whatsapp: string
    email: string
    social: {
      facebook: string
      instagram: string
      tiktok: string
    }
  }
}

// Component prop types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type InputSize = 'sm' | 'md' | 'lg'
export type CardSize = 'sm' | 'md' | 'lg'

// Responsive value types
export type ResponsiveValue<T> = T | {
  base?: T
  xs?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
}

// Theme context types
export interface ThemeContextValue {
  colors: BrandColors
  spacing: SpacingScale
  borderRadius: BorderRadiusScale
  shadows: ShadowScale
  typography: TypographyScale
  breakpoints: BreakpointScale
  animations: AnimationConfig
  components: ComponentTokens
  brand: BrandConfig
}

// Utility types for design tokens
export type ColorPath = 
  | 'primary' | 'primary.light' | 'primary.50' | 'primary.100' | 'primary.200' | 'primary.300' | 'primary.400' | 'primary.500' | 'primary.600' | 'primary.700' | 'primary.800' | 'primary.900'
  | 'secondary' | 'secondary.light' | 'secondary.50' | 'secondary.100' | 'secondary.200' | 'secondary.300' | 'secondary.400' | 'secondary.500' | 'secondary.600' | 'secondary.700' | 'secondary.800' | 'secondary.900'
  | 'neutral.50' | 'neutral.100' | 'neutral.200' | 'neutral.300' | 'neutral.400' | 'neutral.500' | 'neutral.600' | 'neutral.700' | 'neutral.800' | 'neutral.900'

export type SpacingKey = keyof SpacingScale
export type BorderRadiusKey = keyof BorderRadiusScale
export type ShadowKey = keyof ShadowScale