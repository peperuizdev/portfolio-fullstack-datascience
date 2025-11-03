import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://peperuiz.dev'),
  title: {
    default: 'Pepe Ruiz - Full Stack Developer & Data Scientist',
    template: '%s | Pepe Ruiz Portfolio'
  },
  description: 
    'Portfolio profesional de Pepe Ruiz, desarrollador Full Stack especializado en IA, Machine Learning y Data Science. Experto en React, Next.js, Python, TypeScript y análisis de datos.',
  keywords: [
    'Pepe Ruiz',
    'Full Stack Developer',
    'Data Scientist',
    'Machine Learning',
    'Inteligencia Artificial',
    'React',
    'Next.js',
    'TypeScript',
    'Python',
    'Portfolio desarrollador',
    'AI Developer',
    'Data Analysis',
    'Desarrollo web',
    'peperuizdev'
  ],
  authors: [{ name: 'Pepe Ruiz', url: 'https://peperuiz.dev' }],
  creator: 'Pepe Ruiz',
  publisher: 'Pepe Ruiz',
  
  // Open Graph (Facebook, LinkedIn, WhatsApp, etc.)
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: ['en_US'],
    url: 'https://peperuiz.dev',
    siteName: 'Pepe Ruiz Portfolio',
    title: 'Pepe Ruiz - Full Stack Developer & Data Scientist',
    description: 
      'Portfolio profesional de Pepe Ruiz, desarrollador Full Stack especializado en IA, Machine Learning y Data Science.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pepe Ruiz - Full Stack Developer & Data Scientist',
      }
    ],
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="canonical" href="https://peperuiz.dev" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}