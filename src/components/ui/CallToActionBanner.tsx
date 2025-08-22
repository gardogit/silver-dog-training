'use client'

import React, { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { subscribeToNewsletter, SubscribeState } from '@/actions/subscribe';

interface CallToActionBannerProps {
  className?: string;
  title: string;
  description: string;
  inputPlaceholder?: string;
  buttonText?: string;
  privacyPolicyText?: React.ReactNode;
}

// --- Creamos un SubmitButton para usar useFormStatus ---
function SubmitButton({ text }: { text: string }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" loading={pending} disabled={pending} className="flex-shrink-0" size="md">
            {pending ? 'Enviando...' : text}
        </Button>
    );
}

export const CallToActionBanner: React.FC<CallToActionBannerProps> = ({
  className,
  title,
  description,
  inputPlaceholder = 'Escribe tu correo electrónico',
  buttonText = 'Contáctame',
  privacyPolicyText,
}) => {
  // --- Usamos useActionState para manejar el estado del formulario ---
  const initialState: SubscribeState = { message: '', success: false };
  const [state, formAction] = useActionState(subscribeToNewsletter, initialState);
  const [formKey, setFormKey] = useState(() => Date.now());

  useEffect(() => {
    // Si la suscripción es exitosa, reseteamos el formulario
    if (state.success) {
      const timer = setTimeout(() => {
        setFormKey(Date.now()); // Cambia la key para limpiar el input
      }, 2000); // Espera 2 segundos para que el usuario lea el mensaje
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <section
      className={cn('p-8 rounded-lg bg-neutral-900 border-3 border-neutral-700', className)}
      aria-labelledby="cta-banner-title"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold text-neutral-100 mb-2" id="cta-banner-title">{title}</h2>
          <p className="text-neutral-400 leading-relaxed">{description}</p>
        </div>

        <div className="w-full">
          {/* El formulario ahora usa la Server Action */}
          <form key={formKey} action={formAction} className="flex flex-col sm:flex-row gap-3">
            <Input
              name="email" 
              type="email"
              placeholder={inputPlaceholder}
              error={!state.success && state.message ? ' ' : undefined}
              fullWidth
              className="flex-grow"
              aria-label="Correo electrónico para contacto"
            />
            <SubmitButton text={buttonText} />
          </form>
          
          <div className="mt-2 text-sm text-left px-1 h-5"> {/* h-5 para evitar saltos de layout */}
             {state.message && (
                <p className={cn(
                    state.success ? 'text-green-400' : 'text-red-400'
                )}>
                    {state.message}
                </p>
             )}
             {!state.message && privacyPolicyText && (
                <div className="text-neutral-400">{privacyPolicyText}</div>
             )}
          </div>
        </div>
      </div>
    </section>
  )
}