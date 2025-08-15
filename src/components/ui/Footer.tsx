import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { brand } from '@/lib/design-system'
import { 
  HiMail, 
  HiLocationMarker,
  HiExternalLink 
} from 'react-icons/hi'
import { 
  FaFacebook, 
  FaInstagram, 
  FaTiktok, 
  FaWhatsapp 
} from 'react-icons/fa'

interface FooterProps {
  className?: string
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'Facebook',
      href: `https://facebook.com/${brand.contact.social.facebook.replace('@', '')}`,
      icon: FaFacebook,
      label: brand.contact.social.facebook,
    },
    {
      name: 'Instagram',
      href: `https://instagram.com/${brand.contact.social.instagram.replace('@', '')}`,
      icon: FaInstagram,
      label: brand.contact.social.instagram,
    },
    {
      name: 'TikTok',
      href: `https://tiktok.com/${brand.contact.social.tiktok.replace('@', '')}`,
      icon: FaTiktok,
      label: brand.contact.social.tiktok,
    },
  ]

  const quickLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/cursos', label: 'Cursos' },
    { href: '/contacto', label: 'Contacto' },
  ]

  return (
    <footer className={cn(
      'bg-neutral-900 text-white',
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">SD</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{brand.name}</h3>
                <p className="text-sm text-neutral-400">Entrenamiento Canino Profesional</p>
              </div>
            </div>
            
            <p className="text-neutral-300 mb-4 max-w-md">
              {brand.tagline}
            </p>
            
            <p className="text-sm text-neutral-400 mb-6">
              Especializados en el método NePoPo® y entrenamiento de perros K9 de detección y protección. 
              Más de 8 años de experiencia creando vínculos duraderos entre guías y sus compañeros caninos.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-full',
                      'bg-neutral-800 hover:bg-primary transition-colors duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-900'
                    )}
                    aria-label={`Síguenos en ${social.name} (${social.label})`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-neutral-300 hover:text-primary transition-colors duration-200',
                      'focus:outline-none focus:text-primary'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
            <div className="space-y-3">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${brand.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center space-x-3 text-neutral-300 hover:text-primary',
                  'transition-colors duration-200 group',
                  'focus:outline-none focus:text-primary'
                )}
              >
                <FaWhatsapp className="w-5 h-5 flex-shrink-0" />
                <div>
                  <span className="block text-sm">WhatsApp</span>
                  <span className="text-xs text-neutral-400 group-hover:text-primary-light">
                    +{brand.contact.whatsapp}
                  </span>
                </div>
                <HiExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              {/* Email */}
              <a
                href={`mailto:${brand.contact.email}`}
                className={cn(
                  'flex items-center space-x-3 text-neutral-300 hover:text-primary',
                  'transition-colors duration-200 group',
                  'focus:outline-none focus:text-primary'
                )}
              >
                <HiMail className="w-5 h-5 flex-shrink-0" />
                <div>
                  <span className="block text-sm">Email</span>
                  <span className="text-xs text-neutral-400 group-hover:text-primary-light break-all">
                    {brand.contact.email}
                  </span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center space-x-3 text-neutral-300">
                <HiLocationMarker className="w-5 h-5 flex-shrink-0" />
                <div>
                  <span className="block text-sm">Ubicación</span>
                  <span className="text-xs text-neutral-400">
                    Venezuela
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-neutral-400">
              © {currentYear} {brand.name}. Todos los derechos reservados.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-neutral-400">
              <span>Método NePoPo® Certificado</span>
              <span>•</span>
              <span>8+ Años de Experiencia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer, type FooterProps }