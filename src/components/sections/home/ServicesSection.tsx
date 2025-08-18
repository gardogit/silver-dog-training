'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardImage, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FaUser, FaUsers, FaShieldAlt, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
import { CallToActionBanner } from '@/components/ui/CallToActionBanner'

interface ServiceCardData {
    id: string
    title: string
    description: string
    features: string[]
    icon: React.ReactNode
    image: string
    type: 'personalizado' | 'grupal' | 'k9'
}

const servicesData: ServiceCardData[] = [
    {
        id: 'personalizado',
        title: 'Clase Personalizada',
        description: 'Sesiones individuales adaptadas a las necesidades específicas de tu perro y tu familia.',
        features: [
            'Evaluación inicial completa',
            'Plan de entrenamiento personalizado',
            'Sesiones uno a uno',
            'Seguimiento continuo',
            'Apoyo post-entrenamiento'
        ],
        icon: <FaUser className="w-4 h-4" />,
        image: '/images/yonathan-y-pastor-aleman.webp',
        type: 'personalizado'
    },
    {
        id: 'grupal',
        title: 'Clases Grupales',
        description: 'Entrenamientos en grupo diseñados para socialización y aprendizaje colectivo.',
        features: [
            'Socialización controlada',
            'Grupos por raza y nivel',
            'Ambiente de aprendizaje dinámico',
            'Interacción con otros perros',
            'Técnicas de grupo especializadas'
        ],
        icon: <FaUsers className="w-4 h-4" />,
        image: '/images/clase-grupal.webp',
        type: 'grupal'
    },
    {
        id: 'k9',
        title: 'Entrenamiento K9',
        description: 'Entrenamiento especializado para perros de trabajo, detección y protección.',
        features: [
            'Entrenamiento de detección',
            'Técnicas de protección',
            'Obediencia avanzada',
            'Preparación para trabajo',
            'Certificación profesional'
        ],
        icon: <FaShieldAlt className="w-4 h-4" />,
        image: '/images/entrenamiento-k9.webp',
        type: 'k9'
    }
]

interface ServiceCardProps {
    service: ServiceCardData
    onLearnMore: (serviceType: string) => void
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onLearnMore }) => {
    return (
        <Card
            hover={true}
            className="h-full flex flex-col group cursor-pointer p-0 overflow-hidden"
            onClick={() => onLearnMore(service.type)}
            data-testid={`service-card-${service.id}`}
        >
            <CardImage
                src={service.image}
                alt={service.title}
                height={240}
                className="h-56 sm:h-48 w-full object-cover"
            />
            <div className="pt-2 pb-6 px-6 flex-grow flex flex-col">
                <CardHeader className="flex-shrink-0">
                    <div className="flex items-center gap-2 my-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-orange-500">
                            {service.icon}
                        </div>
                        <CardTitle as="h3" className="group-hover:text-orange-500 transition-colors duration-300">
                            {service.title}
                        </CardTitle>
                    </div>
                </CardHeader>

                <CardContent className="flex-grow">
                    <CardDescription className="text-neutral-600 mb-4 leading-relaxed">
                        {service.description}
                    </CardDescription>

                    <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2 text-sm text-neutral-700"
                            >
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>

                <CardFooter className="flex-shrink-0 pt-4">
                    <Button
                        variant="outline"
                        size="md"
                        fullWidth
                        rightIcon={<FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />}
                        className="group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-300"
                        onClick={(e) => {
                            e.stopPropagation()
                            onLearnMore(service.type)
                        }}
                    >
                        Más Información
                    </Button>
                </CardFooter>
            </div>
        </Card>
    )
}

interface ServicesSectionProps {
    className?: string
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ className }) => {
    const router = useRouter();
    const handleLearnMore = (serviceType: string) => {
        // Navegamos a la página de Cursos con el parámetro 'tab'
        router.push(`/cursos?tab=${serviceType}`);
    }

    return (
        <section
            className={`pt-16 px-4 sm:px-6 lg:px-8 ${className || ''}`}
            data-testid="services-section"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                        Nuestros Servicios
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                        Ofrecemos una variedad de programas de entrenamiento diseñados para fortalecer
                        el vínculo entre tú y tu perro, utilizando el método NePoPo® para resultados efectivos y duraderos.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {servicesData.map((service) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onLearnMore={handleLearnMore}
                        />
                    ))}
                </div>

                {/* Call to Action */}
                <div className="pt-12">
                    <CallToActionBanner
                        title="¿No estás seguro por dónde empezar?"
                        description="Déjanos tu correo electrónico y uno de nuestros expertos se pondrá en contacto contigo para una consulta gratuita y sin compromiso."
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
            </div>
        </section>
    )
}