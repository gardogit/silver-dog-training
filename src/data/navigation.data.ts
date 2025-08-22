import { brand } from '@/lib/design-system';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

export const mainNavLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/cursos', label: 'Cursos' },
  { href: '/contacto', label: 'Contacto' },
];

export const socialMediaLinks = [
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
];

// Otros enlaces (solo para el Footer, como la política de privacidad)
export const footerQuickLinks = [
    ...mainNavLinks, // Incluimos todos los enlaces principales
    { href: '/politica-privacidad', label: 'Política de Privacidad' },
];