'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { FaTimes } from 'react-icons/fa';

// --- 1. Definimos los estilos para cada variante ---

const contentVariants = {
    light: 'border-neutral-200 bg-white',
    dark: 'border-neutral-800 bg-neutral-900 text-neutral-200',
};

const closeButtonVariants = {
    light: 'ring-offset-white focus:ring-neutral-400 text-neutral-500 hover:text-neutral-800',
    dark: 'ring-offset-neutral-900 focus:ring-neutral-500 text-neutral-400 hover:text-white',
};

type ModalVariant = 'light' | 'dark';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    variant?: ModalVariant;
}

export const Modal: React.FC<ModalProps> = ({ 
    isOpen, 
    onClose, 
    children, 
    className, 
    variant = 'light'
}) => {
    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                
                <Dialog.Content 
                    className={cn(
                        "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4",
                        "border-3 p-6 shadow-lg duration-200 rounded-lg",
                        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
                        contentVariants[variant],
                        className
                    )}
                >
                    {children}
                    
                    <Dialog.Close 
                        className={cn(
                            "absolute right-4 top-4 rounded-full bg-white/10 p-2 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none cursor-pointer z-50",
                            closeButtonVariants[variant] 
                        )}
                        onClick={onClose}
                    >
                        <FaTimes className="h-4 w-4" />
                        <span className="sr-only">Cerrar</span>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};