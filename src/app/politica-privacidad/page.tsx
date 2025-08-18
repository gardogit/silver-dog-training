import React from 'react';
import Link from 'next/link';

export default function PoliticaPrivacidadPage() {
    return (
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Usamos la clase 'prose' de Tailwind para estilizar automáticamente el contenido de texto */}
                <article className="prose prose-lg prose-orange max-w-none space-y-4">
                    
                    <h1 className="text-4xl font-extrabold text-neutral-900">
                        Política de Privacidad
                    </h1>

                    <p className="lead text-lg text-neutral-600">
                        <strong>Última actualización:</strong> 18 de agosto de 2025
                    </p>

                    <p>
                        Bienvenido a Silver Dog Training. Tu privacidad es de suma importancia para nosotros. Esta Política de Privacidad describe cómo recopilamos, usamos, protegemos y compartimos tu información personal cuando visitas nuestro sitio web o utilizas nuestros servicios.
                    </p>

                    {/* <p className="p-4 border-l-6 border-y-2 border-x-2 border-orange-400 bg-orange-50 text-orange-800">
                        <strong>Aviso Importante:</strong> Este documento es una plantilla genérica. Recomendamos encarecidamente que consultes con un profesional legal para asegurar que tu Política de Privacidad cumpla con todas las leyes y regulaciones aplicables a tu jurisdicción y modelo de negocio.
                    </p> */}

                    <h2 className="text-2xl font-bold text-neutral-900">1. Información que Recopilamos</h2>
                    <p>
                        Podemos recopilar información personal que nos proporcionas directamente, tal como:
                    </p>
                    <ul>
                        <li><strong>Información de Contacto:</strong> Tu nombre, dirección de correo electrónico y número de teléfono cuando completas nuestros formularios de contacto o solicitud de servicio.</li>
                        <li><strong>Comunicaciones:</strong> Cualquier información que nos envíes a través de correos electrónicos o mensajes directos.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-neutral-900">2. Cómo Usamos tu Información</h2>
                    <p>
                        La información que recopilamos se utiliza para los siguientes propósitos:
                    </p>
                    <ul>
                        <li>Para proporcionar, operar y mantener nuestros servicios.</li>
                        <li>Para mejorar, personalizar y expandir nuestros servicios.</li>
                        <li>Para comunicarnos contigo, ya sea directamente o a través de uno de nuestros socios, incluso para servicio al cliente, para proporcionarte actualizaciones y otra información relacionada con el sitio web, y para fines de marketing y promoción.</li>
                        <li>Para procesar tus solicitudes y prevenir fraudes.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-neutral-900">3. Cookies y Tecnologías de Seguimiento</h2>
                    <p>
                        Nuestro sitio web puede utilizar cookies para mejorar la experiencia del usuario. Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo. Puedes instruir a tu navegador para que rechace todas las cookies o para que te indique cuándo se está enviando una cookie. Sin embargo, si no aceptas las cookies, es posible que no puedas utilizar algunas partes de nuestro servicio.
                    </p>
                    
                    <h2 className="text-2xl font-bold text-neutral-900">4. Seguridad de los Datos</h2>
                    <p>
                        La seguridad de tu información es importante para nosotros, pero recuerda que ningún método de transmisión por Internet o método de almacenamiento electrónico es 100% seguro. Si bien nos esforzamos por utilizar medios comercialmente aceptables para proteger tu información personal, no podemos garantizar su seguridad absoluta.
                    </p>
                    
                    <h2 className="text-2xl font-bold text-neutral-900">5. Enlaces a Otros Sitios Web</h2>
                    <p>
                        Nuestro servicio puede contener enlaces a otros sitios web que no son operados por nosotros. Si haces clic en un enlace de un tercero, serás dirigido al sitio de ese tercero. Te recomendamos encarecidamente que revises la Política de Privacidad de cada sitio que visites.
                    </p>

                    <h2 className="text-2xl font-bold text-neutral-900">6. Cambios a esta Política de Privacidad</h2>
                    <p>
                        Podemos actualizar nuestra Política de Privacidad de vez en cuando. Te notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página. Se te aconseja revisar esta Política de Privacidad periódicamente para cualquier cambio.
                    </p>

                    <h2 className="text-2xl font-bold text-neutral-900">7. Contáctanos</h2>
                    <p>
                        Si tienes alguna pregunta sobre esta Política de Privacidad, puedes contactarnos a través de nuestra{' '}
                        <Link href="/contact">página de contacto</Link>.
                    </p>

                </article>
            </div>
        </section>
    );
}