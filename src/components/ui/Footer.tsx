import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { brand } from '@/lib/design-system'
import { HiMail, HiLocationMarker, HiCalendar } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'
import { footerQuickLinks, socialMediaLinks } from '@/data/navigation.data'

interface FooterProps {
  className?: string
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear()

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
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link
                  href="/"
                  className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
                >
                  <Image
                    src="/icon-192.png"
                    alt="Silver Dog Training"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                    priority
                    draggable="false"
                  />
                <div>
                  <h3 className="text-xl font-bold text-white">{brand.name}</h3>
                  <p className="text-sm text-neutral-400">Entrenamiento Canino Profesional</p>
                </div>
              </Link>
            </div>
            </div>

            <p className="text-xs text-neutral-300 mb-4 max-w-md">
              {brand.tagline}
            </p>

            <p className="text-sm text-neutral-400 mb-6">
              Especializados en el método NePoPo® y entrenamiento de perros K9 de detección y protección.
              Más de 8 años de experiencia creando vínculos duraderos entre guías y sus compañeros caninos.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialMediaLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-full',
                      'bg-neutral-800 hover:bg-orange-500 transition-colors duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-900'
                    )}
                    aria-label={`Síguenos en ${social.name} (${social.label})`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-neutral-300 hover:text-orange-500 transition-colors duration-200',
                      'focus:outline-none focus:text-orange-500'
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
            <div className="space-y-4">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${brand.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center space-x-3 text-neutral-300 hover:text-orange-500',
                  'transition-colors duration-200 group',
                  'focus:outline-none focus:text-orange-500'
                )}
              >
                <FaWhatsapp className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs text-neutral-400 group-hover:text-orange-500">
                  +{brand.contact.whatsapp}
                </span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${brand.contact.email}`}
                className={cn(
                  'flex items-center space-x-3 text-neutral-300 hover:text-orange-500',
                  'transition-colors duration-200 group',
                  'focus:outline-none focus:text-orange-500'
                )}
              >
                <HiMail className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs text-neutral-400 group-hover:text-orange-500-light break-all">
                  {brand.contact.email}
                </span>
              </a>

              {/* Location */}
              <div className="flex items-center space-x-3 text-neutral-300">
                <HiLocationMarker className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs text-neutral-400">
                  Venezuela
                </span>
              </div>

              {/* Horarios */}
              <div className="flex items-center space-x-3 text-neutral-300">
                <HiCalendar className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs text-neutral-400">
                  Lunes a Sábados: 8am - 6pm
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-800 mt-8 pt-8">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-sm text-neutral-400">
              © {currentYear} {brand.name}. Todos los derechos reservados.&nbsp;
            </div>

            <div className="text-sm text-neutral-400">
              <span>
                Página web desarrollada por&nbsp;
                <Link 
                href={brand.desarrolladoPor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline"
                >
                  Hydrogn
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer, type FooterProps }