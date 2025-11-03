import type { Metadata } from 'next'
import { Locale } from '@/lib/i18n'

type Props = {
  params: Promise<{ lang: Locale }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  
  const isSpanish = lang === 'es'
  
  return {
    title: {
      default: 'Pepe Ruiz - Full Stack Developer & Data Scientist',
      template: '%s | Pepe Ruiz'
    },
    description: isSpanish
      ? 'Portfolio profesional de Pepe Ruiz, desarrollador Full Stack especializado en IA, Machine Learning y Data Science. Experto en React, Next.js, Python, TypeScript y análisis de datos.'
      : 'Professional portfolio of Pepe Ruiz, Full Stack Developer specialized in AI, Machine Learning and Data Science. Expert in React, Next.js, Python, TypeScript and data analysis.',
    keywords: [
      'Pepe Ruiz',
      'Full Stack Developer',
      'Data Scientist',
      'Machine Learning',
      isSpanish ? 'Inteligencia Artificial' : 'Artificial Intelligence',
      'React',
      'Next.js',
      'TypeScript',
      'Python',
      isSpanish ? 'Portfolio desarrollador' : 'Developer Portfolio',
      isSpanish ? 'Desarrollador IA' : 'AI Developer',
      isSpanish ? 'Análisis de datos' : 'Data Analysis',
      isSpanish ? 'Desarrollo web' : 'Web Development',
      'peperuizdev'
    ],
    authors: [{ name: 'Pepe Ruiz', url: 'https://peperuiz.dev' }],
    creator: 'Pepe Ruiz',
    publisher: 'Pepe Ruiz',
    
    alternates: {
      canonical: `https://peperuiz.dev/${lang}`,
      languages: {
        'es': 'https://peperuiz.dev/es',
        'en': 'https://peperuiz.dev/en',
        'x-default': 'https://peperuiz.dev/es',
      },
    },
    
    openGraph: {
      type: 'website',
      locale: isSpanish ? 'es_ES' : 'en_US',
      alternateLocale: isSpanish ? ['en_US'] : ['es_ES'],
      url: `https://peperuiz.dev/${lang}`,
      siteName: 'Pepe Ruiz Portfolio',
      title: 'Pepe Ruiz - Full Stack Developer & Data Scientist',
      description: isSpanish
        ? 'Portfolio profesional de Pepe Ruiz, desarrollador Full Stack especializado en IA, Machine Learning y Data Science.'
        : 'Professional portfolio of Pepe Ruiz, Full Stack Developer specialized in AI, Machine Learning and Data Science.',
      images: [
        {
          url: 'https://peperuiz.dev/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Pepe Ruiz - Full Stack Developer & Data Scientist',
          type: 'image/jpeg',
        }
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: 'Pepe Ruiz - Full Stack Developer & Data Scientist',
      description: isSpanish
        ? 'Portfolio profesional de Pepe Ruiz, desarrollador Full Stack especializado en IA, Machine Learning y Data Science.'
        : 'Professional portfolio of Pepe Ruiz, Full Stack Developer specialized in AI, Machine Learning and Data Science.',
      images: ['https://peperuiz.dev/og-image.jpg'],
      creator: '@peperuizdev',
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
}

export default function LangLayout({ children }: Props) {
  return <>{children}</>
}