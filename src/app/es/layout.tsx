import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Pepe Ruiz - Full Stack Developer & Data Scientist',
    template: '%s | Pepe Ruiz'
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
    'Desarrollador IA',
    'Análisis de datos',
    'Desarrollo web',
    'peperuizdev'
  ],
  authors: [{ name: 'Pepe Ruiz', url: 'https://peperuiz.dev' }],
  creator: 'Pepe Ruiz',
  publisher: 'Pepe Ruiz',
  
  alternates: {
    canonical: 'https://peperuiz.dev/es',
    languages: {
      'es': 'https://peperuiz.dev/es',
      'en': 'https://peperuiz.dev/en',
      'x-default': 'https://peperuiz.dev/es',
    },
  },
  
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: ['en_US'],
    url: 'https://peperuiz.dev/es',
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

export default function EsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}