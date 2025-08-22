'use client';

import React from 'react';
import * as Select from '@radix-ui/react-select';
import { FaCheck, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { cn } from '@/lib/utils';

// --- 1. Definimos los estilos para cada variante ---

const triggerVariants = {
    light: 'text-neutral-700 bg-white border-neutral-300 data-[placeholder]:text-neutral-400 focus:border-orange-500',
    dark: 'text-white bg-neutral-800 border-neutral-600 data-[placeholder]:text-neutral-400 focus:border-orange-500',
};

const contentVariants = {
    light: 'bg-white border-neutral-200 text-neutral-700',
    dark: 'bg-neutral-800 border-neutral-600 text-white',
};

const itemVariants = {
    light: {
        base: 'text-neutral-700',
        highlight: 'data-[highlighted]:bg-orange-100 data-[highlighted]:text-orange-900',
        indicator: 'text-orange-500',
    },
    dark: {
        base: 'text-neutral-300',
        highlight: 'data-[highlighted]:bg-orange-500 data-[highlighted]:text-white',
        indicator: 'text-white',
    },
};

// --- 2. Creamos un Context para pasar la variante a los hijos ---
type SelectVariant = 'light' | 'dark';
const SelectVariantContext = React.createContext<SelectVariant>('light');

interface CustomSelectProps {
    name: string;
    value: string;
    onValueChange: (value: string) => void;
    children: React.ReactNode;
    placeholder?: string;
    ariaLabel: string;
    disabled?: boolean;
    className?: string;
    variant?: SelectVariant;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
    name,
    value,
    onValueChange,
    children,
    placeholder,
    ariaLabel,
    disabled,
    className,
    variant = 'light',
}) => (
    <SelectVariantContext.Provider value={variant}>
        <Select.Root name={name} value={value} onValueChange={onValueChange} disabled={disabled}>
            <Select.Trigger
                className={cn(
                    'group',
                    'relative inline-flex items-center justify-between w-full h-12 px-4 py-2.5 text-base rounded-md border',
                    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500',
                    'disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed select-none',
                    triggerVariants[variant],
                    className
                )}
                aria-label={ariaLabel}
            >
                <Select.Value placeholder={placeholder} />
                <Select.Icon className="text-neutral-400">
                    <FaChevronDown className="h-4 w-4 group-data-[state=open]:hidden" />
                    <FaChevronUp className="h-4 w-4 hidden group-data-[state=open]:block" />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content
                    position="popper"
                    sideOffset={5}
                    className={cn(
                        'w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border shadow-lg z-50',
                        contentVariants[variant]
                    )}
                >
                    <Select.ScrollUpButton className="flex items-center justify-center h-6 cursor-default">
                        <FaChevronUp />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="p-1">{children}</Select.Viewport>
                    <Select.ScrollDownButton className="flex items-center justify-center h-6 cursor-default">
                        <FaChevronDown />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    </SelectVariantContext.Provider>
);

interface CustomSelectItemProps extends React.ComponentPropsWithoutRef<typeof Select.Item> {
    children: React.ReactNode;
}

export const CustomSelectItem = React.forwardRef<HTMLDivElement, CustomSelectItemProps>(
    ({ children, className, ...props }, forwardedRef) => {
        const variant = React.useContext(SelectVariantContext);
        const styles = itemVariants[variant];

        return (
            <Select.Item
                className={cn(
                    'relative flex items-center h-9 pl-8 pr-4 text-sm rounded-sm select-none',
                    'data-[highlighted]:outline-none',
                    styles.base, // Estilo base de la variante
                    styles.highlight, // Estilo de hover/focus de la variante
                    className
                )}
                {...props}
                ref={forwardedRef}
            >
                <Select.ItemText>{children}</Select.ItemText>
                <Select.ItemIndicator className={cn('absolute left-2 inline-flex items-center', styles.indicator)}>
                    <FaCheck className="h-4 w-4" />
                </Select.ItemIndicator>
            </Select.Item>
        );
    }
);

CustomSelectItem.displayName = 'CustomSelectItem';
