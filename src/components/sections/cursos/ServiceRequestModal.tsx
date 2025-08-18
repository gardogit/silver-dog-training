'use client';

import React, { useEffect } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { RiMailSendLine } from 'react-icons/ri';
import { IoPawOutline } from 'react-icons/io5';
import { submitServiceRequest, ServiceRequestState } from '@/actions/serviceRequest';
import { cn } from '@/lib/utils';

interface ServiceRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceName: string;
    variant?: 'light' | 'dark';
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" loading={pending} disabled={pending} fullWidth>
            {pending ? 'Enviando...' : 'Confirmar Solicitud'}
        </Button>
    );
}

export const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({ isOpen, onClose, serviceName, variant = 'light' }) => {
    const initialState: ServiceRequestState = { message: '', success: false };
    const [state, formAction] = useActionState(submitServiceRequest, initialState);

    useEffect(() => {
        // Si el envío fue exitoso, cierra el modal después de un momento
        if (state?.success) {
            const timer = setTimeout(() => {
                onClose();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [state, onClose]);

    // Clases condicionales para el texto según la variante
    const titleColor = variant === 'dark' ? 'text-neutral-100' : 'text-neutral-800';
    const textColor = variant === 'dark' ? 'text-neutral-300' : 'text-neutral-600';
    const smallTextColor = variant === 'dark' ? 'text-neutral-400' : 'text-neutral-500';
    const watermarkColor = variant === 'dark' ? 'text-neutral-800/50' : 'text-neutral-200/50';

    return (
        <Modal isOpen={isOpen} onClose={onClose} variant={variant} className="overflow-hidden">
            <div className="relative text-center space-y-4">
                <IoPawOutline className={cn(
                    "absolute -top-8 -left-12 z-0 h-36 w-36 rotate-12 pointer-events-none",
                    watermarkColor
                )} />
                <div className="relative z-10">
                    <RiMailSendLine className="mx-auto h-12 w-12 text-orange-500" />
                    <Dialog.Title asChild>
                        <h2 className={`text-2xl font-bold ${titleColor}`}>Solicitud de Servicio</h2>
                    </Dialog.Title>


                    {state?.success ? (
                        <p className="text-green-600">{state.message}</p>
                    ) : (
                        <>
                            <p className={textColor}>
                                Estás solicitando el paquete: <span className="font-semibold">{serviceName}</span>
                            </p>

                            <form action={formAction} className="space-y-4 pt-2">
                                <p className={smallTextColor}>
                                    Introduce tu correo electrónico para completar la solicitud:
                                </p>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="tu@correo.com"
                                    required
                                />
                                <input type="hidden" name="serviceName" value={serviceName} />
                                <SubmitButton />
                                {state?.message && <p className="text-sm text-red-600">{state.message}</p>}
                            </form>
                        </>
                    )}
                </div>
            </div>
        </Modal>
    );
};