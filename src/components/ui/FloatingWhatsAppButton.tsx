import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { brand } from '@/lib/design-system'

interface FloatingWhatsAppButtonProps {
  className?: string
  message?: string
}

const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({ 
  className = '',
  message = 'Hola, me interesa conocer más sobre sus servicios de adiestramiento canino'
}) => {
  const whatsappUrl = `https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent(message)}`

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6 text-white" />
      </a>
    </div>
  )
}

export { FloatingWhatsAppButton, type FloatingWhatsAppButtonProps }