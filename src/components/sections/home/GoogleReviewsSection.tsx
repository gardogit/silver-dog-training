'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ReviewCard, ReviewData } from '@/components/ui/ReviewCard'
import { Button } from '@/components/ui/Button'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

// --- DATOS DE EJEMPLO AMPLIADOS ---
const reviewsData: ReviewData[] = [
    {
        id: '1',
        authorName: 'Ana García',
        reviewText: 'El entrenamiento personalizado ha sido un antes y un después para mi perro. El equipo es increíblemente profesional y paciente. ¡Lo recomiendo totalmente!',
        rating: 4,
        relativeTime: 'hace 2 semanas',
        authorPhotoUrl: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
        id: '2',
        authorName: 'Carlos Rodríguez',
        reviewText: 'Apunté a mi cachorro a las clases grupales y ha mejorado muchísimo en su socialización. El ambiente es controlado y muy positivo. Gran trabajo.',
        rating: 3,
        relativeTime: 'hace un mes',
        authorPhotoUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
        id: '3',
        authorName: 'Lucía Fernández',
        reviewText: 'El entrenamiento K9 es de otro nivel. La atención al detalle y la profesionalidad son impresionantes. Mi perro ha desarrollado unas habilidades increíbles.',
        rating: 4,
        relativeTime: 'hace 3 meses',
        authorPhotoUrl: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    {
        id: '4',
        authorName: 'David Martínez',
        reviewText: 'Servicio excepcional y resultados visibles en poco tiempo. El método que utilizan funciona de maravilla y el trato es inmejorable.',
        rating: 2,
        relativeTime: 'hace 4 meses',
        authorPhotoUrl: 'https://randomuser.me/api/portraits/men/41.jpg'
    },
    {
        id: '5',
        authorName: 'Sofía Gómez',
        reviewText: 'Estamos encantados con el progreso de nuestro perro. Las sesiones son dinámicas y muy bien estructuradas. ¡100% recomendable!',
        rating: 1,
        relativeTime: 'hace 5 meses',
        authorPhotoUrl: 'https://randomuser.me/api/portraits/women/50.jpg'
    }
];
// --- FIN DE DATOS DE EJEMPLO ---

interface GoogleReviewsSectionProps {
    className?: string;
}

export const GoogleReviewsSection: React.FC<GoogleReviewsSectionProps> = ({ className }) => {
    //const googleReviewsUrl = 'https://www.google.com/search?q=tu+negocio#lrd=0x0:0x0,1';

    // 1. Inicializamos el carrusel con el plugin de Autoplay
    // El segundo argumento del hook es un array de plugins.
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'start' },
        [
            Autoplay({
                delay: 3000,
                stopOnInteraction: false, // El autoplay no se detiene si interactúas con los botones
                stopOnMouseEnter: true, // El autoplay se pausa cuando el cursor está sobre el carrusel
            })
        ]
    );

    // 2. Estados para saber si los botones de prev/next deben estar activos
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    // 3. Funciones para navegar por el carrusel
    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    // 4. Hook para actualizar el estado de los botones cuando el carrusel se mueve
    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => {
            setPrevBtnEnabled(emblaApi.canScrollPrev());
            setNextBtnEnabled(emblaApi.canScrollNext());
        };
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
        onSelect();
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi]);

    return (
        <section className={`py-16 ${className || ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                        Lo que dicen nuestros clientes
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                        Nos enorgullece el impacto positivo que tenemos en perros y sus familias.
                        Aquí tienes algunas de las opiniones que nos han dejado en Google.
                    </p>
                </div>

                {/* 5. Estructura del Carrusel */}
                <div className="relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4"> 
                            {reviewsData.map((review) => (
                                // Cada slide necesita una base de tamaño y padding
                                <div
                                    key={review.id}
                                    className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4"
                                >
                                    <ReviewCard review={review} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 6. Botones de Navegación */}
                    <Button
                        variant="ghost"
                        onClick={scrollPrev}
                        disabled={!prevBtnEnabled}
                        className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 rounded-full h-12 w-12 bg-white shadow-lg hidden lg:flex"
                        aria-label="Opinión anterior"
                    >
                        <FaArrowLeft />
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={scrollNext}
                        disabled={!nextBtnEnabled}
                        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 rounded-full h-12 w-12 bg-white shadow-lg hidden lg:flex"
                        aria-label="Siguiente opinión"
                    >
                        <FaArrowRight />
                    </Button>
                </div>
            </div>
        </section>
    );
};