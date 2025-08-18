'use client'

import { CallToActionBanner } from '@/components/ui/CallToActionBanner';
import { ContentRow } from '@/components/ui/ContentRow';
import Link from 'next/link';

/**
 * Componente que construye la sección "Nosotros" completa,
 * utilizando ContentRow para cada una de las tres partes.
 */
export const AboutUsSection = () => {
    return (
        <section>
            {/* --- Fila 1: Presentación --- */}
            <ContentRow
                imageUrl="/images/yonathan-y-pastor-aleman.webp"
                imageAlt="Entrenador Yonathan Pérez con un perro"
                imagePosition="left"
            >
                <div className="bg-neutral-900 text-neutral-200 p-8 lg:p-16 w-full md:min-h-screen h-full md:-mt-16 mt-0 flex flex-col justify-center">
                    <p className="text-orange-400 font-semibold tracking-wide mb-3 md:pt-16 pt-0">
                        Yonathan Pérez
                    </p>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
                        Entrenador con 8 años de experiencia en adiestramiento canino, sus comienzos fueron con entrenamiento de K9 en perros de detección y protección.
                    </h2>
                    <p className="text-neutral-300 leading-relaxed">
                        Más que una escuela de adiestramiento, somos una comunidad de amantes de los perros que buscan construir una relación profunda y duradera con sus compañeros peludos.
                    </p>
                </div>
            </ContentRow>

            {/* --- Fila 2: Historia --- */}
            <ContentRow
                imageUrl="/images/conexion-humano-animal.webp"
                imageAlt="Perro en sesión de entrenamiento K9"
                imagePosition="right"
            >
                <div className="text-neutral-800 p-8 lg:p-16 w-full md:min-h-screen h-full md:-mt-16 mt-0">
                    <p className="text-orange-500 font-semibold tracking-wide mb-3 md:pt-16 pt-0">
                        Mi historia
                    </p>
                    <div className="lg:columns-2 lg:gap-10 text-neutral-600 leading-relaxed">
                        <p className="mb-4 break-inside-avoid">
                            Desde que era niño, los animales han sido mi pasión. Mi fascinación por los perros, en particular, me llevó a explorar el mundo del adiestramiento canino. Tuve la oportunidad de formarme con Gian Carlo Sabino, un reconocido entrenador de perros de detección y protección, quien se convirtió en mi mentor y me inspiró a seguir este camino.
                        </p>
                        <p className="mb-4 break-inside-avoid">
                            Durante más de 8 años, he trabajado con cientos de perros de todas las razas, tamaños y condiciones. Cada uno de ellos me ha enseñado algo valioso y me ha motivado a seguir creciendo como entrenador. En Silver Dog Training, aplicamos el método NePoPo, desarrollado por Bart Bellon, que se centra en el refuerzo positivo y la creación de un vínculo de confianza entre el perro y su guía.
                        </p>
                    </div>
                </div>
            </ContentRow>

            {/* --- Fila 3: Misión --- */}
            <ContentRow
                imageUrl="/images/instrucciones-grupales.webp"
                imageAlt="Un perro feliz y obediente mirando a su dueño"
                imagePosition="left"
            >
                <div className="text-neutral-800 p-8 lg:p-16 w-full md:min-h-screen h-full md:-mt-16 mt-0 sm:border-b sm:border-neutral-200">
                    <div className="lg:columns-2 lg:gap-10 text-neutral-600 leading-relaxed md:pt-16 pt-0">
                        <p className="mb-4 break-inside-avoid">
                            Nuestra <span className="text-orange-500 font-semibold">misión</span> es proporcionar una educación de alta calidad en adiestramiento canino, fomentando el bienestar y la relación armoniosa entre perros y sus guías. Queremos ser la escuela líder en adiestramiento canino en la región, reconocida por nuestro compromiso con la excelencia, la innovación y la creación de comunidades de guías de perros responsables y felices.
                        </p>
                        <p className="mb-4 break-inside-avoid">
                            En Silver Dog Training, creemos que cada perro es único y merece un enfoque único. Por eso, ofrecemos programas de entrenamiento personalizados que se adaptan a las necesidades específicas de cada perro y a los objetivos de sus guías. Ya sea que estés buscando mejorar la obediencia de tu perro, corregir conductas no deseadas o simplemente fortalecer el vínculo entre ambos, en Silver Dog Training encontrarás el apoyo y la guía que necesitas.
                        </p>
                    </div>
                </div>
            </ContentRow>

            {/* Call to Action */}
            <div className="pb-12 sm:py-12 max-w-7xl px-4 mx-auto">
                <CallToActionBanner
                    title="Te invitamos a unirte a nuestra comunidad de amantes de los perros"
                    description="y a descubrir cómo podemos ayudarte a transformar la relación con tu fiel compañero. ¡Juntos, podemos educar guías, adiestrar perros y crear recuerdos inolvidables!"
                    buttonText="Enviar"
                    onSubmit={(email) => console.log('Email recibido:', email)}
                    privacyPolicyText={
                        <>
                            Respetamos tu privacidad. Lee nuestra{' '}
                            <Link href="/politica-privacidad" className="underline hover:text-orange-500">
                                política de privacidad
                            </Link>
                            .
                        </>
                    }
                />
            </div>
        </section>
    );
};