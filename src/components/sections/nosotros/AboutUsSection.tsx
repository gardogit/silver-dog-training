import { ContentRow } from '@/components/ui/ContentRow';

/**
 * Componente que construye la sección "Nosotros" completa,
 * utilizando ContentRow para cada una de las tres partes.
 */
export const AboutUsSection = () => {
    return (
        <section className="bg-white">
            {/* --- Fila 1: Presentación --- */}
            <ContentRow
                imageUrl="/images/yonathan-y-pastor-aleman.webp"
                imageAlt="Entrenador Yonathan Pérez con un perro"
                imagePosition="left"
            >
                <div className="bg-neutral-900 text-neutral-200 p-8 lg:p-16 w-full h-screen -mt-16 flex flex-col justify-center">
                    <p className="text-orange-500 font-semibold tracking-wide mb-3 pt-16">
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
                <div className="bg-white text-neutral-800 p-8 lg:p-16 w-full h-screen -mt-16">
                    <div className="md:columns-2 md:gap-10 text-neutral-600 leading-relaxed pt-16">
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
                <div className="bg-neutral-50 text-neutral-800 p-8 lg:p-16 w-full h-screen -mt-16">
                    <div className="md:columns-2 md:gap-10 text-neutral-600 leading-relaxed pt-16">
                        <p className="mb-4 break-inside-avoid">
                            Nuestra misión es proporcionar una educación de alta calidad en adiestramiento canino, fomentando el bienestar y la relación armoniosa entre perros y sus guías. Queremos ser la escuela líder en adiestramiento canino en la región, reconocida por nuestro compromiso con la excelencia, la innovación y la creación de comunidades de guías de perros responsables y felices.
                        </p>
                        <p className="mb-4 break-inside-avoid">
                            En Silver Dog Training, creemos que cada perro es único y merece un enfoque único. Por eso, ofrecemos programas de entrenamiento personalizados que se adaptan a las necesidades específicas de cada perro y a los objetivos de sus guías. Ya sea que estés buscando mejorar la obediencia de tu perro, corregir conductas no deseadas o simplemente fortalecer el vínculo entre ambos, en Silver Dog Training encontrarás el apoyo y la guía que necesitas.
                        </p>
                    </div>
                </div>
            </ContentRow>
        </section>
    );
};