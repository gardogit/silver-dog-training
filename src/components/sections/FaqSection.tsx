'use client'

import React, { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'

// --- 1. Datos de las Preguntas Frecuentes ---
interface FaqItemData {
    question: string
    answer: string
}

const faqData: FaqItemData[] = [
    {
        question: '¿Qué tipo de adiestramiento canino ofrecen en Silver Dog Training?',
        answer: 'En Silver Dog Training nos especializamos en adiestramiento canino positivo y efectivo. Ofrecemos entrenamiento personalizado, enfocado en las necesidades específicas de tu perro (educación, modificación de conductas), y clases grupales para fomentar la socialización y obediencia en un entorno controlado.'
    },
    {
        question: '¿En qué consiste el método de adiestramiento NePoPo® que utilizan?',
        answer: 'El método NePoPo® es un sistema de adiestramiento moderno que se basa en la comunicación clara con el perro, utilizando refuerzos positivos (agregar algo que el perro desea) y negativos (quitar algo que el perro no desea) para fomentar la motivación. El resultado es un perro que obedece con corazón y alma, fortaleciendo el vínculo y la confianza contigo.'
    },
    {
        question: 'Mi perro tiene problemas de conducta específicos, ¿pueden ayudarme?',
        answer: '¡Por supuesto! Nuestro servicio de entrenamiento personalizado está diseñado específicamente para abordar y modificar conductas no deseadas. Trabajamos con técnicas de contracondicionamiento y educación para ayudar a tu perro a controlar sus impulsos y a integrarse armoniosamente en tu hogar y en la sociedad.'
    },
    {
        question: '¿Qué aprenderá mi perro en el nivel básico de entrenamiento?',
        answer: 'En el nivel básico, tu perro dominará los comandos esenciales para una convivencia feliz y segura. Aprenderá a sentarse, echarse y a esperar bajo orden. Estas habilidades son fundamentales para controlar su paciencia e impulsos en situaciones cotidianas.'
    },
    {
        question: '¿Cómo funcionan y qué beneficios tienen las clases grupales?',
        answer: 'Nuestras clases grupales están enfocadas en la socialización y la obediencia básica en presencia de otros perros y personas. Son una herramienta fantástica para que tu perro aprenda a comportarse de manera educada fuera de casa, mientras te damos las herramientas para guiarlo correctamente.'
    },
    {
        question: '¿Qué diferencia hay entre los paquetes de clases grupales (Pomeranian, Border Collie, Belga Malinois)?',
        answer: 'Los paquetes están diseñados para adaptarse a tu nivel de compromiso. El Paquete Pomeranian cubre un mes de clases. Los paquetes Border Collie y Belga Malinois cubren un trimestre completo, y el Belga Malinois incluye beneficios exclusivos como un 35% de descuento en cursos y una consulta veterinaria.'
    },
    {
        question: '¿Ofrecen entrenamiento más avanzado o especializado?',
        answer: 'Sí. Además de los niveles básico y medio, ofrecemos un nivel avanzado donde tu perro puede aprender habilidades complejas como acudir al llamado a distancia, trucos y obedecer órdenes con señas. También contamos con experiencia en entrenamiento K9 para perros de detección y protección.'
    },
    {
        question: '¿Qué otros servicios para mascotas ofrecen además del adiestramiento?',
        answer: 'Somos un centro integral para el cuidado de tu mascota. Además del adiestramiento, en Silver Dog Training ofrecemos servicios de veterinaria, paseos, pensión canina, grooming (peluquería), tienda especializada y asesoramiento en nutrición.'
    },
    {
        question: '¿Para qué tipo de perros es adecuado su entrenamiento?',
        answer: 'Nuestro método de entrenamiento es adaptable a perros de todas las razas, tamaños y edades. El avance dependerá del compromiso del guía y de las necesidades individuales de cada perrito, pero el objetivo es siempre el mismo: crear un vínculo fuerte y duradero.'
    },
    {
        question: '¿Cómo puedo agendar mi primera clase o solicitar más información?',
        answer: '¡Dar el primer paso es muy sencillo! Puedes contactarnos directamente a través del botón "Reserva tu clase ahora" en nuestra página web. Este te llevará a nuestro WhatsApp, donde podremos conversar y agendar tu primera sesión para empezar a transformar la relación con tu peludo.'
    }
]

// --- 2. Componente para un solo item del Acordeón ---
interface AccordionItemProps {
    item: FaqItemData
    isOpen: boolean
    onToggle: () => void
    isLast: boolean
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isOpen, onToggle, isLast }) => {

    // Se aplica la clase del borde condicionalmente.
    const containerClasses = `py-4 ${!isLast ? 'border-b border-neutral-200' : ''}`;

    return (
        <div className={containerClasses}>
            <button
                onClick={onToggle} // Se llama a la función del padre.
                className="w-full flex justify-between items-center text-left gap-4"
                aria-expanded={isOpen} // El estado "isOpen" ahora viene de las props.
            >
                <h3 className="text-lg font-medium text-neutral-800 group-hover:text-orange-500 transition-colors duration-300">
                    {item.question}
                </h3>
                <span className="text-orange-500 flex-shrink-0">
                    {isOpen ? <FaMinus className="w-4 h-4" /> : <FaPlus className="w-4 h-4" />}
                </span>
            </button>
            
            {/* Contenedor animado para la respuesta */}
            <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    <p className="pt-3 text-neutral-600 leading-relaxed">
                        {item.answer}
                    </p>
                </div>
            </div>
        </div>
    )
}

// --- 3. Componente Principal de la Sección de FAQs (MODIFICADO) ---
interface FaqSectionProps {
    className?: string
}

export const FaqSection: React.FC<FaqSectionProps> = ({ className }) => {
    // Estado para controlar el índice del item abierto. "null" significa que ninguno está abierto.
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        // Si el índice clickeado ya está abierto, lo cerramos (poniendo el estado en null).
        // Si no, abrimos el nuevo índice.
        setOpenIndex(openIndex === index ? null : index);
    };
    
    return (
        <section
            className={`pb-16 px-4 sm:px-6 lg:px-8 ${className || ''}`}
            data-testid="faq-section"
        >
            <div className="max-w-3xl mx-auto">
                {/* Cabecera de la Sección */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                        Preguntas Frecuentes
                    </h2>
                    <p className="text-lg text-neutral-600 leading-relaxed">
                        Encuentra respuestas a las dudas más comunes sobre nuestros servicios de adiestramiento canino.
                    </p>
                </div>

                {/* Lista de Preguntas */}
                <div className="space-y-2 bg-white rounded-lg py-4 px-8 border-3 border-neutral-200">
                    {faqData.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            item={faq}
                            isOpen={openIndex === index} // El item está abierto si su índice coincide con el estado.
                            onToggle={() => handleToggle(index)} // Pasamos la función para que el item pueda cambiar el estado del padre.
                            isLast={index === faqData.length - 1} // Indicamos si es el último elemento de la lista.
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}