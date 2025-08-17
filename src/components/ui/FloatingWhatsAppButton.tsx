import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { brand } from '@/lib/design-system'

interface FloatingWhatsAppButtonProps {
  message?: string
}

const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  message = 'Hola, me interesa conocer más sobre sus servicios de adiestramiento canino'
}) => {
  const whatsappUrl = `https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent(message)}`

  return (

    <div
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white w-14 h-14 rounded-full flex justify-center items-center shadow-lg hover:bg-green-600 transition-all duration-300 ease-out group z-50 hover:scale-105 active:scale-95"
      aria-label="Contactar por WhatsApp"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Contactar por WhatsApp"
      >

        <div className="absolute -right-1 -top-1 z-10">
          <div className="flex h-6 w-6 items-center justify-center">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"
            ></span>
            <span
              className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
            >
              1
            </span>
          </div>
        </div>

        <FaWhatsapp className="w-6 h-6 text-white" />

        <span
          className="absolute inset-0 rounded-full border-4 border-white/30 scale-100 animate-pulse"
        />

        <div
          className="absolute right-full mr-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 whitespace-nowrap"
        >
          <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-lg">
            ¿Necesitas ayuda?
          </div>
          <div
            className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"
          ></div>
        </div>
      </a>
    </div>
  )
}

export { FloatingWhatsAppButton, type FloatingWhatsAppButtonProps }