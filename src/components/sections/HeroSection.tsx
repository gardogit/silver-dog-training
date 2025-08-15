import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { brand } from '@/lib/design-system'
import { HiArrowRight } from 'react-icons/hi'

interface HeroSectionProps {
  className?: string
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const whatsappUrl = `https://wa.me/${brand.contact.whatsapp}?text=Hola, me interesa conocer más sobre sus servicios de adiestramiento canino`

  return (
    <section
      className={cn(
        'relative h-screen flex items-end overflow-hidden -mt-16 pt-16',
        className
      )}
    >
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/clase-grupal.webp"
          alt="Clase de entrenamiento canino - Silver Dog Training"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Orange gradient overlay matching Figma design */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/80 via-orange-500/70 to-orange-600/80" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full">
        <div className="flex flex-col justify-center lg:grid lg:grid-cols-2 h-full">

          {/* Content with Logo */}
          <div className="flex flex-col justify-center items-center lg:order-2 px-4 sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-20" style={{ color: 'white' }}>

            {/* Logo */}
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <Image
                src="/images/Logo-SilverDT-Blanco.webp"
                alt="Silver Dog Training Logo"
                width={120}
                height={120}
                className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24"
              />
            </div>

            {/* Main Title - Smaller and bolder */}
            <h1 className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-black mb-3 sm:mb-4 leading-tight text-center !text-white">
              <span className="block !text-white">EDUCA A TU PERRO</span>
              <span className="block !text-white">FORTALECE TU VÍNCULO</span>
            </h1>

            {/* Subtitle - Smaller and bolder */}
            <p className="text-xs sm:text-sm lg:text-base mb-4 sm:mb-6 leading-relaxed font-bold text-center max-w-xs sm:max-w-sm lg:max-w-md !text-white">
              Transforma la relación con tu perro a través de métodos de adiestramiento positivos y efectivos.
            </p>

            {/* CTA Button */}
            <div className="mb-4 sm:mb-6">
              <Button
                size="md"
                variant="outline"
                className="bg-white text-primary border-white hover:bg-primary-50 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold"
                asChild
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Reserva tu clase ahora</span>
                  <HiArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </Button>
            </div>

            {/* Brand Tagline - Smaller and bolder */}
            <p className="text-xs sm:text-sm font-bold tracking-wide text-center !text-white">
              {brand.tagline}
            </p>
          </div>

          {/* Left Side - Yonathan with Dog Image - Only visible on desktop */}
          <div className="hidden lg:relative lg:flex lg:items-end lg:justify-start lg:order-1 lg:h-full">
            <div className="h-7/8 w-full relative">
              <Image
                src="/images/silver-y-su-pastor-belga-malinois.webp"
                alt="Yonathan Pérez con su pastor belga malinois"
                fill
                className="object-contain object-left-bottom"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { HeroSection, type HeroSectionProps }