'use client';

import React, { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { sendContactEmail, ContactFormState } from '@/actions/contact';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CustomSelect, CustomSelectItem } from '@/components/ui/CustomSelect';

const initialState: ContactFormState = {
    message: '',
    isSuccess: false,
    fields: {},
};

// Componente de botón separado para usar `useFormStatus`
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" size="lg" fullWidth loading={pending} disabled={pending}>
            {pending ? 'Enviando...' : 'Enviar Mensaje'}
        </Button>
    );
}

export const ContactForm = () => {
    const [state, formAction] = useActionState(sendContactEmail, initialState);
    const [formKey, setFormKey] = useState(() => Date.now());
    const [subject, setSubject] = useState(state.fields?.subject || '');

    const subjectOptions = [
        { value: 'clase_personalizada', label: 'Información sobre Clases Personalizadas' },
        { value: 'clase_grupal', label: 'Información sobre Clases Grupales' },
        { value: 'entrenamiento_k9', label: 'Información sobre Entrenamiento K9' },
        { value: 'consulta_general', label: 'Consulta General' },
        { value: 'otro', label: 'Otro Asunto' },
    ];

    useEffect(() => {
        // Cada vez que recibimos una respuesta del servidor (exitosa o con error)...
        if (state.message) {
            // ...cambiamos la key para forzar el re-renderizado del formulario.
            setFormKey(Date.now());
        }

        if (state.isSuccess) {
            setSubject('');
        } else {
            setSubject(state.fields?.subject || '');
        }
    }, [state]);

    return (
        <form key={formKey} action={formAction} className="space-y-4">
            <Input
                label="Nombre Completo"
                name="name"
                required
                defaultValue={state.fields?.name || ''}
                error={state.errors?.name?.[0]}
            />
            <Input
                label="Correo Electrónico"
                name="email"
                type="email"
                required
                defaultValue={state.fields?.email || ''}
                error={state.errors?.email?.[0]}
            />
            <Input
                label="Número de WhatsApp"
                name="phone"
                type="tel"
                required
                defaultValue={state.fields?.phone || ''}
                error={state.errors?.phone?.[0]}
            />

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-neutral-700 after:content-['*'] after:text-red-500 after:ml-1">
                    Asunto
                </label>
                <CustomSelect
                    ariaLabel="Seleccionar asunto del mensaje"
                    placeholder="Selecciona un motivo de contacto..."
                    value={subject}
                    onValueChange={setSubject}
                    name="subject"
                >
                    {subjectOptions.map(option => (
                        <CustomSelectItem key={option.value} value={option.value}>
                            {option.label}
                        </CustomSelectItem>
                    ))}
                </CustomSelect>

                {state.errors?.subject && (
                    <p className="text-sm text-red-600 mt-1">{state.errors.subject[0]}</p>
                )}
            </div>

            <Textarea
                label="Tu Mensaje"
                name="message"
                required
                rows={5}
                defaultValue={state.fields?.message || ''}
                error={state.errors?.message?.[0]}
            />

            <SubmitButton />

            {state.isSuccess ? (
                <p className="text-sm text-center text-green-600">{state.message}</p>
            ) : state.message && (
                <p className="text-sm text-center text-red-600">{state.message}</p>
            )}
        </form>
    );
};
