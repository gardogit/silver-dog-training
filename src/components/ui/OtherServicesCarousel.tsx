'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { otherServicesData } from '@/data/otherServices.data';

export const OtherServicesCarousel = () => {
    // Usamos el hook de Embla con el plugin de Autoplay
    const [emblaRef] = useEmblaCarousel(
        { loop: true, align: 'start', slidesToScroll: 1 },
        [Autoplay({ delay: 2000, stopOnInteraction: false })]
    );

    return (
        <div className="pt-16">
            {/* Título de la sub-sección */}
            <h3 className="text-2xl font-bold text-center text-neutral-800 mb-8">
                Un Cuidado Integral para tu Mascota
            </h3>

            {/* Contenedor del Carrusel */}
            <div className="" ref={emblaRef}>
                <div className="flex -ml-4">
                    {otherServicesData.map((service, index) => (
                        // Cada slide es un contenedor flexible y responsivo
                        // Muestra 2 en móvil, 3 en sm, 4 en md, y 6 en lg
                        <div
                            key={index}
                            className="flex-[0_0_50%] sm:flex-[0_0_33.33%] md:flex-[0_0_25%] lg:flex-[0_0_16.66%] pl-4"
                        >
                            {/* Tarjeta de Servicio Simple */}
                            <div className="bg-white p-4 rounded-lg border-3 border-neutral-200 flex flex-col items-center justify-center gap-4 text-center h-30 transition-all duration-300 hover:-translate-y-1 select-none">
                                <div className="text-lime-400">
                                    {service.icon}
                                </div>
                                <h4 className="font-semibold text-neutral-800">
                                    {service.name}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};