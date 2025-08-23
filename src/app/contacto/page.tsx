import React from 'react';
import Image from 'next/image';
import { ContactForm } from '@/components/sections/contact/ContactForm';

export default function ContactPage() {
    return (
        <section className="py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Contenedor principal con Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
                    
                    {/* Columna Izquierda: Formulario y Texto */}
                    <div className="space-y-6">
                        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900">
                            Ponte en Contacto
                        </h1>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                            ¿Listo para empezar a transformar la relación con tu perro? 
                            Completa el formulario y nuestro equipo se pondrá en contacto contigo a la brevedad.
                        </p>
                        <div className="pt-4">
                            <ContactForm />
                        </div>
                    </div>

                    {/* Columna Derecha: Imagen */}
                    <div className="w-full h-96 md:h-full min-h-[500px] relative rounded-lg overflow-hidden">
                        <Image 
                            src="/images/conexion-humano-animal.webp"
                            alt="Entrenador canino trabajando con un perro"
                            fill
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            style={{ objectFit: 'cover' }}
                            quality={100}
                            draggable="false"
                            className="transition-transform duration-500 hover:scale-105 object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}