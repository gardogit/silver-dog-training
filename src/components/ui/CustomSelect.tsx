'use client';

import React from 'react';
import * as Select from '@radix-ui/react-select';
import { FaCheck, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { cn } from '@/lib/utils';

interface CustomSelectProps {
    value: string;
    onValueChange: (value: string) => void;
    children: React.ReactNode;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ value, onValueChange, children }) => (
    <Select.Root value={value} onValueChange={onValueChange}>
        <Select.Trigger 
            className={cn(
                'relative inline-flex items-center justify-between w-full max-w-xs h-12 px-4 py-2.5 text-base',
                'text-white bg-neutral-800 border border-neutral-600 rounded-lg',
                'focus:outline-none focus:ring-2 focus:ring-orange-500'
            )}
            aria-label="Seleccionar curso"
        >
            <Select.Value placeholder="Selecciona un curso..." />
            <Select.Icon className="text-neutral-400">
                <FaChevronDown className="h-4 w-4" />
            </Select.Icon>
        </Select.Trigger>
        
        <Select.Portal>
            <Select.Content 
                position="popper"
                sideOffset={5}
                className={cn(
                    'w-[--radix-select-trigger-width] overflow-hidden rounded-lg bg-neutral-800 border border-neutral-600 shadow-lg z-50'
                )}
            >
                <Select.ScrollUpButton className="flex items-center justify-center h-6 cursor-default text-white">
                    <FaChevronUp />
                </Select.ScrollUpButton>

                <Select.Viewport className="p-1">
                    {children}
                </Select.Viewport>
                
                <Select.ScrollDownButton className="flex items-center justify-center h-6 cursor-default text-white">
                    <FaChevronDown />
                </Select.ScrollDownButton>
            </Select.Content>
        </Select.Portal>
    </Select.Root>
);

interface CustomSelectItemProps extends React.ComponentPropsWithoutRef<typeof Select.Item> {
    children: React.ReactNode;
}

export const CustomSelectItem = React.forwardRef<HTMLDivElement, CustomSelectItemProps>(
    ({ children, className, ...props }, forwardedRef) => {
        return (
            <Select.Item
                className={cn(
                    'relative flex items-center h-10 pl-8 pr-4 text-sm rounded-md select-none',
                    'text-neutral-300 data-[highlighted]:bg-orange-500 data-[highlighted]:text-white',
                    'data-[highlighted]:outline-none'
                )}
                {...props}
                ref={forwardedRef}
            >
                <Select.ItemText>{children}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                    <FaCheck className="h-4 w-4" />
                </Select.ItemIndicator>
            </Select.Item>
        );
    }
);

CustomSelectItem.displayName = 'CustomSelectItem';