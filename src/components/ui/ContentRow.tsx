import React from 'react';
import Image from 'next/image';

// --- Props que acepta el componente ---
interface ContentRowProps {
    imageUrl: string;
    imageAlt: string;
    imagePosition?: 'left' | 'right';
    children: React.ReactNode;
}

/**
 * Componente reutilizable para mostrar una fila con una imagen en una columna
 * y contenido dinámico en la otra, con la capacidad de alternar la posición.
 */
export const ContentRow: React.FC<ContentRowProps> = ({ 
    imageUrl, 
    imageAlt, 
    imagePosition = 'left', 
    children 
}) => {
    // Determina el orden de las columnas en pantallas medianas y grandes
    const orderClass = imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row';

    return (
        <div className={`flex flex-col ${orderClass} w-full`}>
            {/* --- Columna de la Imagen --- */}
            <div className="md:w-1/2 w-full">
                <div className="relative h-80 md:h-full min-h-[450px]">
                    <Image
                        src={imageUrl}
                        alt={imageAlt}
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-full"
                    />
                </div>
            </div>

            {/* --- Columna del Contenido (inyectado a través de children) --- */}
            <div className="md:w-1/2 w-full flex items-center h-full">
                {children}
            </div>
        </div>
    );
};