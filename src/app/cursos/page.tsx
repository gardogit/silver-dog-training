import { Suspense } from 'react';
import { CoursesSection } from '@/components/sections/cursos/CoursesSection';

// Un componente de carga simple para el fallback.
const CoursesLoading = () => {
  return (
      <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-neutral-700">Cargando cursos...</h2>
      </div>
  );
};

export default function CursosPage() {
    return (
            /* Envolvemos el componente cliente en un Suspense Boundary para la compilación de producción */
            <Suspense fallback={<CoursesLoading />}>
                <CoursesSection />
            </Suspense>
    );
}