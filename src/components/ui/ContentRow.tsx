import React from 'react';
import Image from 'next/image';

interface ContentRowProps {
    imageUrl: string;
    imageAlt: string;
    imagePosition?: 'left' | 'right';
    children: React.ReactNode;
}

/**
 * Componente para mostrar una fila con una imagen en una columna
 * y contenido dinámico en la otra, con la capacidad de alternar la posición.
 */
export const ContentRow: React.FC<ContentRowProps> = ({ 
    imageUrl, 
    imageAlt, 
    imagePosition = 'left', 
    children 
}) => {
    const orderClass = imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row';

    return (
        <div className={`flex flex-col ${orderClass} w-full`}>
            {/* --- Columna de la Imagen --- */}
            <div className="md:w-1/2 w-full">
                <div className="relative h-80 md:h-full min-h-[450px]">
                    <Image
                        src={imageUrl}
                        alt={imageAlt}
                        className="w-full h-full"
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        style={{ objectFit: 'cover' }}
                        quality={100}
                        draggable="false"
                    />
                </div>
            </div>

            {/* --- Columna del Contenido --- */}
            <div className="md:w-1/2 w-full flex items-center h-full">
                {children}
            </div>
        </div>
    );
};