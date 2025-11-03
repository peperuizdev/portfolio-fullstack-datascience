import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Pepe Ruiz - Full Stack Developer & Data Scientist',
    template: '%s | Pepe Ruiz'
  },
  description: 
    'Professional portfolio of Pepe Ruiz, Full Stack Developer specialized in AI, Machine Learning and Data Science. Expert in React, Next.js, Python, TypeScript and data analysis.',
  keywords: [
    'Pepe Ruiz',
    'Full Stack Developer',
    'Data Scientist',
    'Machine Learning',
    'Artificial Intelligence',
    'React',
    'Next.js',
    'TypeScript',
    'Python',
    'Developer Portfolio',
    'AI Developer',
    'Data Analysis',
    'Web Development',
    'peperuizdev'
  ],
  authors: [{ name: 'Pepe Ruiz', url: 'https://peperuiz.dev' }],
  creator: 'Pepe Ruiz',
  publisher: 'Pepe Ruiz',
  
  alternates: {
    canonical: 'https://peperuiz.dev/en',
    languages: {
      'es': 'https://peperuiz.dev/es',
      'en': 'https://peperuiz.dev/en',
      'x-default': 'https://peperuiz.dev/es',
    },
  },
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES'],
    url: 'https://peperuiz.dev/en',
    siteName: 'Pepe Ruiz Portfolio',
    title: 'Pepe Ruiz - Full Stack Developer & Data Scientist',
    description: 
      'Professional portfolio of Pepe Ruiz, Full Stack Developer specialized in AI, Machine Learning and Data Science.',
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

export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}