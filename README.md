## 🐕 Silver Dog Training - Un Concepto de Rediseño Web

<div align="center">

**EDUCAMOS GUÍAS | ADIESTRAMOS PERROS | CREAMOS RECUERDOS**

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

## 📋 Descripción

Silver Dog Training es una plataforma web moderna y profesional diseñada para una empresa especializada en adiestramiento canino. El sitio web presenta servicios de educación de guías, adiestramiento de perros y programas especializados, con un enfoque en la experiencia del usuario y la conversión de visitantes en clientes.

Este repositorio contiene el código fuente de una plataforma web moderna y de alto rendimiento, concebida como un rediseño para una empresa de adiestramiento canino. El proyecto fue desarrollado para mostrar las ventajas de usar un stack tecnológico moderno, enfocándose en la velocidad, la experiencia de usuario (UX) y una estructura de código escalable.

### ✨ Características Principales

- 🎨 **Diseño Moderno**: Interfaz limpia y profesional con sistema de diseño personalizado
- 📱 **Totalmente Responsivo**: Optimizado para dispositivos móviles, tablets y desktop
- ⚡ **Alto Rendimiento**: Construido con el App Router de Next.js 15 para una carga casi instantánea y excelente SEO.
- 🧪 **Calidad de Código Asegurada**: Suite de tests completa con Jest y Testing Library, garantizando la fiabilidad de cada componente.
- 🧩 **Componentes Atómicos y Reutilizables**: Arquitectura basada en componentes modulares para un fácil mantenimiento y escalabilidad.
- 📝 **Formularios Inteligentes**: Validación con Zod y manejo de errores
- 🎠 **Carruseles Interactivos**: Presentación dinámica de servicios y testimonios con Embla Carousel

## 🚀 Tecnologías Utilizadas

### Frontend
- **[Next.js 15](https://nextjs.org/)** - Framework React con App Router
- **[React 19](https://reactjs.org/)** - Biblioteca de interfaz de usuario
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework de estilos utility-first

### UI/UX
- **[Radix UI](https://www.radix-ui.com/)** - Componentes accesibles sin estilos
- **[React Icons](https://react-icons.github.io/react-icons/)** - Biblioteca de iconos
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carrusel performante

### Backend y Validación
- **Server Actions**: Para la lógica de formularios del lado del servidor.
- **Validación de Esquemas**: [Zod](https://zod.dev/)

### Pruebas y Calidad de Código
- **[Jest](https://jestjs.io/)** - Framework de testing
- **[Testing Library](https://testing-library.com/)** - Utilidades de testing
- **[ESLint](https://eslint.org/)** - Linter de código

## 🛠️ Instalación

### Prerrequisitos

- Node.js 18.0 o superior
- npm, yarn, pnpm o bun

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/silver-dog-training.git
   cd silver-dog-training
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   ```

4. **Abrir en el navegador**
   
   Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 📜 Scripts Disponibles

```bash
# Inicia el servidor de desarrollo con Turbopack.
npm run dev

# Compila la aplicación para producción
npm run build

# Iniciar servidor de producción
npm run start

# Linting
npm run lint

# Testing
npm run test

# Testing en modo watch
npm run test:watch

# Verificación de tipos
npm run type-check
```

## 📁 Estructura del Proyecto

El proyecto sigue una estructura modular y escalable, separando las preocupaciones y facilitando la navegación.

```
src/
├── app/                    # App Router de Next.js
│   ├── contacto/          # Página de contacto
│   ├── cursos/            # Página de cursos
│   ├── nosotros/          # Página sobre nosotros
│   ├── politica-privacidad/ # Política de privacidad
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página de inicio
├── components/            # Componentes reutilizables
│   ├── sections/          # Secciones de página
│   │   ├── home/         # Secciones específicas del home
│   │   ├── contact/      # Componentes de contacto
│   │   └── cursos/       # Componentes de cursos
│   └── ui/               # Componentes de UI base
├── actions/              # Server Actions
├── lib/                  # Utilidades y configuraciones
└── __tests__/           # Tests
```

## 📱 Funcionalidades

### Página Principal
- Hero section con call-to-action
- Sección de servicios con carrusel
- Testimonios de Google Reviews
- FAQ section

### Páginas Adicionales
- **Contacto**: Formulario de contacto con validación
- **Cursos**: Información detallada de programas
- **Nosotros**: Historia y filosofía de la empresa
- **Política de Privacidad**: Términos legales

### Características Especiales
- Botón flotante de WhatsApp
- Formularios de solicitud de servicio
- Carrusel de servicios adicionales
- Integración con reseñas de Google

## 🤝 Contribución

Las contribuciones, sugerencias y feedback son siempre bienvenidos. Si ves algo que se pueda mejorar o tienes alguna idea, por favor, abre un "Issue" o un "Pull Request".

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

Si estás interesado en discutir este proyecto, hablar sobre una colaboración o tienes alguna consulta profesional, no dudes en contactarme.

- Autor: Edgardo Mota.
- [Mi Página](https://hydrogn.vercel.app/) de contacto y mis [Mis Servicios](https://hydrogn.vercel.app/servicios)
- [LinkedIn](https://www.linkedin.com/in/ruizedgardo/)
- [Email](edgardo.irm@gmail.com)

### Estándares de Código
- Usar TypeScript para tipado estático
- Seguir las reglas de ESLint configuradas
- Escribir tests para nuevas funcionalidades
- Documentar componentes complejos

## 📄 Licencia

El código de este proyecto está disponible bajo la Licencia MIT. Esto significa que eres libre de usar, modificar y distribuir el código para tus propios proyectos, incluyendo fines comerciales.

El contenido visual y de texto (imágenes, logos, nombres de marca "Silver Dog Training") son propiedad de sus respectivos dueños.

---

<div align="center">

**Desarrollado con ❤️ para Silver Dog Training**

</div>
