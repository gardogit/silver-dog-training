'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface CallToActionBannerProps {
  className?: string
  title: string
  description: string
  inputPlaceholder?: string
  buttonText?: string
  privacyPolicyText?: React.ReactNode
  onSubmit: (email: string) => Promise<void | boolean> | void | boolean
}

export const CallToActionBanner: React.FC<CallToActionBannerProps> = ({
  className,
  title,
  description,
  inputPlaceholder = 'Escribe tu correo electrónico',
  buttonText = 'Contáctame',
  privacyPolicyText,
  onSubmit,
}) => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) {
      setError('El correo electrónico es obligatorio.')
      return
    }
    // Simple email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, introduce un correo válido.')
      return
    }
    
    setError(null)
    setLoading(true)

    try {
      await onSubmit(email)
      // Opcional: podrías limpiar el email aquí si el componente padre no navega
      // setEmail('');
    } catch (err) {
      setError('Ocurrió un error. Inténtalo de nuevo.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      className={cn(
        'p-8 rounded-lg bg-neutral-900 border-3 border-neutral-700',
        className
      )}
      aria-labelledby="cta-banner-title"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Sección de Texto */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold text-neutral-100 mb-2" id="cta-banner-title">{title}</h2>
          <p className="text-neutral-400 leading-relaxed">{description}</p>
        </div>

        {/* Sección del Formulario */}
        <div className="w-full">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder={inputPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              // Ocultamos el helperText del Input para manejarlo nosotros
              // y lo mostramos debajo del formulario para mejor layout.
              error={error ? ' ' : undefined} // Pasamos un espacio para que el borde se ponga rojo
              fullWidth
              className="flex-grow"
              aria-label="Correo electrónico para contacto"
            />
            <Button
              type="submit"
              loading={loading}
              className="flex-shrink-0"
              size="md"
            >
              {buttonText}
            </Button>
          </form>
          
          {/* Mensajes de error y política de privacidad */}
          <div className="mt-2 text-sm text-left px-1">
             {error ? (
                <p className="text-red-300">{error}</p>
             ) : privacyPolicyText ? (
                <div className="text-neutral-400">{privacyPolicyText}</div>
             ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}