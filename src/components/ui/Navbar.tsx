'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { HiMenu, HiX } from 'react-icons/hi'
import { mainNavLinks, socialMediaLinks } from '@/data/navigation.data'

interface NavbarProps {
  className?: string
  showSocialIcons?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ className, showSocialIcons = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const isActiveLink = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav className={cn(
      'bg-white shadow-soft border-b border-neutral-200 sticky top-0 z-50',
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
              onClick={closeMobileMenu}
            >
              <Image
                src="/Logo-SilverDT.svg"
                alt="Silver Dog Training"
                width={40}
                height={40}
                className="w-10 h-10"
                priority
              />
              {/* <span className="hidden sm:block text-neutral-800 font-bold text-xl">
                Silver Dog Training
              </span> */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {/* --- Usamos los datos importados para los enlaces de navegación --- */}
            <div className="flex items-baseline space-x-4">
              {mainNavLinks.map((item) => (
                <Link key={item.href} href={item.href} className={cn(
                  'px-4 py-2 rounded-md text-sm transition-all duration-200',
                  'hover:text-orange-700/80 hover:bg-orange-100/70',
                  'focus:outline-none focus:ring-2 focus:ring-orange-700/80 focus:ring-offset-2',
                  isActiveLink(item.href)
                    ? 'text-orange-700/80 bg-orange-100/70 border-b-2 border-orange-700/80 font-semibold'
                    : 'text-neutral-700 font-medium'
                )}>
                  {item.label}
                </Link>
              ))}
            </div>

            {/* --- Usamos los datos importados para los iconos sociales --- */}
            {showSocialIcons && (
              <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-neutral-200">
                {socialMediaLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-orange-500 transition-colors" aria-label={social.name}>
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className={cn(
                'inline-flex items-center justify-center p-2 rounded-full',
                'text-neutral-700 hover:text-orange-700/80 hover:bg-orange-100/70',
                'focus:outline-none focus:ring-2 focus:ring-orange-700/80 focus:ring-offset-2',
                'transition-colors duration-200'
              )}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isMobileMenuOpen ? (
                <HiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <HiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={cn(
          'md:hidden transition-all duration-300 ease-in-out overflow-hidden',
          isMobileMenuOpen
            ? 'max-h-90 opacity-100'
            : 'max-h-0 opacity-0'
        )}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-neutral-200">
            {mainNavLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={cn(
                  'block px-4 py-4 rounded-md text-base font-medium transition-all duration-200',
                  'hover:text-orange-700/80 hover:bg-orange-100/70',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                  isActiveLink(item.href)
                    ? 'text-orange-700/80 bg-orange-100/70 border-l-4 border-orange-700/80'
                    : 'text-neutral-700'
                )}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Social Icons */}
            {showSocialIcons && (
              <div className="px-3 py-4 border-t border-neutral-200 mt-2">
                <p className="text-sm font-medium text-neutral-600 mb-3">Síguenos</p>
                <div className="flex space-x-4">
                  {socialMediaLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-orange-500" aria-label={social.name}>
                        <Icon className="w-6 h-6" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
export { Navbar, type NavbarProps }