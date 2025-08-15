# Silver Dog Training - Design System

Este documento describe el sistema de diseño implementado para el sitio web de Silver Dog Training.

## Colores de Marca

### Colores Primarios
- **Primary**: `#cb6622` (Naranja quemado)
- **Primary Light**: `#f9c4a2` (Durazno pálido)

### Colores Secundarios
- **Secondary**: `#4b5320` (Verde oliva oscuro)
- **Secondary Light**: `#abb155` (Verde musgo)

### Escalas de Color
Cada color principal incluye una escala completa de 50 a 900 para mayor flexibilidad en el diseño.

## Tipografía

### Fuente Principal
- **Familia**: Inter (Google Fonts)
- **Pesos disponibles**: 300, 400, 500, 600, 700, 800, 900
- **Características**: Optimizada para legibilidad web, soporte completo para caracteres latinos

### Escala Tipográfica
- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)
- **4xl**: 2.25rem (36px)
- **5xl**: 3rem (48px)

## Espaciado

Sistema basado en múltiplos de 8px para consistencia visual:

- **xs**: 0.5rem (8px)
- **sm**: 0.75rem (12px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)
- **3xl**: 4rem (64px)

## Bordes y Sombras

### Border Radius
- **sm**: 0.375rem (6px)
- **md**: 0.5rem (8px)
- **lg**: 0.75rem (12px)
- **xl**: 1rem (16px)
- **2xl**: 1.5rem (24px)

### Sombras
- **Soft**: Sombra sutil para elementos flotantes
- **Medium**: Sombra media para tarjetas y modales
- **Strong**: Sombra pronunciada para elementos destacados

## Breakpoints Responsivos

- **xs**: 475px
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## Animaciones

### Duraciones
- **Fast**: 150ms - Para micro-interacciones
- **Normal**: 300ms - Para transiciones estándar
- **Slow**: 500ms - Para animaciones complejas

### Easing
- **Linear**: Para animaciones mecánicas
- **In**: Para elementos que aparecen
- **Out**: Para elementos que desaparecen
- **InOut**: Para transiciones suaves

## Componentes Base

### Botones
- **Tamaños**: sm (32px), md (40px), lg (48px)
- **Variantes**: primary, secondary, outline, ghost
- **Estados**: default, hover, focus, disabled

### Inputs
- **Tamaños**: sm (32px), md (40px), lg (48px)
- **Estados**: default, focus, error, disabled
- **Validación**: Integración con Zod schemas

### Cards
- **Padding**: sm (16px), md (24px), lg (32px)
- **Sombras**: Configurables según contexto
- **Border radius**: Consistente con el sistema

## Uso del Sistema

### Importación
```typescript
import { colors, spacing, borderRadius } from '@/lib/design-system'
import { cn } from '@/lib/utils'
```

### Utilidades CSS
```typescript
import { buttonVariants, focusRing } from '@/lib/design-utils'
```

### Clases Tailwind Personalizadas
El sistema extiende Tailwind CSS con:
- Colores de marca: `bg-primary`, `text-secondary-light`
- Sombras personalizadas: `shadow-soft`, `shadow-medium`
- Animaciones: `animate-fade-in`, `animate-slide-up`

## Accesibilidad

- **Contraste**: Todos los colores cumplen con WCAG 2.1 AA
- **Focus**: Estados de foco visibles y consistentes
- **Tipografía**: Tamaños mínimos para legibilidad
- **Espaciado**: Áreas de toque mínimas de 44px

## Información de Marca

- **Nombre**: Silver Dog Training
- **Tagline**: "EDUCAMOS GUÍAS | ADIESTRAMOS PERROS | CREAMOS RECUERDOS"
- **Contacto**: WhatsApp 584243360955, silverdogtraining88@gmail.com
- **Redes**: @silverdogtraining88 (Facebook, Instagram), @silverdogtraining (TikTok)

## Archivos del Sistema

- `src/lib/design-system.ts` - Tokens de diseño principales
- `src/lib/design-utils.ts` - Utilidades y funciones helper
- `src/types/design-system.ts` - Tipos TypeScript
- `src/app/globals.css` - Estilos globales y variables CSS
- `tailwind.config.ts` - Configuración de Tailwind CSS