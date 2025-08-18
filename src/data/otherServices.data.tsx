import React from 'react';
import { FaStethoscope, FaRoute, FaHome, FaCut, FaShoppingBag, FaCarrot } from 'react-icons/fa';

// Definimos la interfaz para cada servicio
export interface OtherServiceData {
    name: string;
    icon: React.ReactNode;
}

// Creamos el array con los datos
export const otherServicesData: OtherServiceData[] = [
    {
        name: 'Veterinaria',
        icon: <FaStethoscope className="w-8 h-8" />
    },
    {
        name: 'Paseos',
        icon: <FaRoute className="w-8 h-8" />
    },
    {
        name: 'Pensión',
        icon: <FaHome className="w-8 h-8" />
    },
    {
        name: 'Grooming',
        icon: <FaCut className="w-8 h-8" />
    },
    {
        name: 'Tienda',
        icon: <FaShoppingBag className="w-8 h-8" />
    },
    {
        name: 'Nutrición',
        icon: <FaCarrot className="w-8 h-8" />
    }
];
