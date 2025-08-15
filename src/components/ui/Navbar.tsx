'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { HiMenu, HiX } from 'react-icons/hi'

interface NavItem {
  href: string
  label: string
}

interface NavbarProps {
  className?: string
}

const navItems: NavItem[] = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/cursos', label: 'Cursos' },
  { href: '/contacto', label: 'Contacto' },
]

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

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
              className="flex items-center space-x-2 text-primary font-bold text-xl hover:text-primary-600 transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SD</span>
              </div>
              <span className="hidden sm:block">Silver Dog Training</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
                    'hover:text-primary hover:bg-primary-50',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                    isActiveLink(item.href)
                      ? 'text-primary bg-primary-50 border-b-2 border-primary'
                      : 'text-neutral-700'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className={cn(
                'inline-flex items-center justify-center p-2 rounded-md',
                'text-neutral-700 hover:text-primary hover:bg-primary-50',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
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
            ? 'max-h-64 opacity-100 pb-4' 
            : 'max-h-0 opacity-0'
        )}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-neutral-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={cn(
                  'block px-3 py-2 rounded-md text-base font-medium transition-all duration-200',
                  'hover:text-primary hover:bg-primary-50',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                  isActiveLink(item.href)
                    ? 'text-primary bg-primary-50 border-l-4 border-primary'
                    : 'text-neutral-700'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export { Navbar, type NavbarProps }