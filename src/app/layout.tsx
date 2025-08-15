import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://silverdogtraining.com'),
  title: "Silver Dog Training - Educamos Guías, Adiestramos Perros, Creamos Recuerdos",
  description: "Entrenamiento profesional de perros con el método NePoPo®. Especialistas en adiestramiento canino, detección K9 y protección. 8+ años de experiencia fortaleciendo vínculos entre guías y perros.",
  keywords: ["adiestramiento canino", "entrenamiento perros", "NePoPo", "K9", "detección canina", "protección canina", "Silver Dog Training"],
  authors: [{ name: "Yonathan Pérez" }],
  creator: "Silver Dog Training",
  publisher: "Silver Dog Training",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://silverdogtraining.com",
    siteName: "Silver Dog Training",
    title: "Silver Dog Training - Educamos Guías, Adiestramos Perros, Creamos Recuerdos",
    description: "Entrenamiento profesional de perros con el método NePoPo®. Especialistas en adiestramiento canino, detección K9 y protección.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Silver Dog Training - Adiestramiento Profesional Canino",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Silver Dog Training - Educamos Guías, Adiestramos Perros, Creamos Recuerdos",
    description: "Entrenamiento profesional de perros con el método NePoPo®. Especialistas en adiestramiento canino, detección K9 y protección.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
