import Link from "next/link";
import { brand } from "@/lib/design-system";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 py-16">
        <main className="text-center">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
              {brand.name}
            </h1>
            <p className="text-xl md:text-2xl text-secondary font-medium mb-8 max-w-4xl mx-auto">
              {brand.tagline}
            </p>
            <p className="text-lg text-neutral-700 mb-12 max-w-2xl mx-auto">
              Entrenamiento profesional de perros con el método NePoPo®. 
              Especialistas en adiestramiento canino, detección K9 y protección con más de 8 años de experiencia.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/contacto"
                className="bg-primary hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-medium"
              >
                Contactar Ahora
              </Link>
              <Link 
                href="/cursos"
                className="bg-secondary hover:bg-secondary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-medium"
              >
                Ver Cursos
              </Link>
            </div>
          </div>

          {/* Navigation Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Link href="/nosotros" className="group">
              <div className="bg-white rounded-xl p-8 shadow-soft hover:shadow-medium transition-shadow duration-300 group-hover:scale-105 transform transition-transform">
                <h3 className="text-2xl font-semibold text-primary mb-4">Nosotros</h3>
                <p className="text-neutral-600">
                  Conoce nuestra historia, filosofía y el método NePoPo® que utilizamos para entrenar perros.
                </p>
              </div>
            </Link>

            <Link href="/cursos" className="group">
              <div className="bg-white rounded-xl p-8 shadow-soft hover:shadow-medium transition-shadow duration-300 group-hover:scale-105 transform transition-transform">
                <h3 className="text-2xl font-semibold text-secondary mb-4">Cursos</h3>
                <p className="text-neutral-600">
                  Descubre nuestros programas de entrenamiento personalizado y clases grupales.
                </p>
              </div>
            </Link>

            <Link href="/contacto" className="group">
              <div className="bg-white rounded-xl p-8 shadow-soft hover:shadow-medium transition-shadow duration-300 group-hover:scale-105 transform transition-transform">
                <h3 className="text-2xl font-semibold text-primary mb-4">Contacto</h3>
                <p className="text-neutral-600">
                  Ponte en contacto con nosotros para comenzar el entrenamiento de tu perro.
                </p>
              </div>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-xl p-8 shadow-soft max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-secondary mb-6">Información de Contacto</h3>
            <div className="space-y-4 text-neutral-700">
              <p>
                <strong>WhatsApp:</strong> {brand.contact.whatsapp}
              </p>
              <p>
                <strong>Email:</strong> {brand.contact.email}
              </p>
              <div className="flex justify-center space-x-6 mt-6">
                <span className="text-primary font-medium">{brand.contact.social.facebook}</span>
                <span className="text-primary font-medium">{brand.contact.social.instagram}</span>
                <span className="text-primary font-medium">{brand.contact.social.tiktok}</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
