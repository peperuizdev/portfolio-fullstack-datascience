'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { getSiteConfig } from '@/lib/constants'
import { Locale, isValidLocale } from '@/lib/i18n'

export default function NotFound() {
  const pathname = usePathname()
  
  // Extraer idioma de la URL
  const pathSegments = pathname.split('/').filter(Boolean)
  const currentLang = (pathSegments[0] && isValidLocale(pathSegments[0]) ? pathSegments[0] : 'es') as Locale
  const siteConfig = getSiteConfig(currentLang)

  // Textos por idioma
  const texts = {
    es: {
      title: '404',
      subtitle: 'PÁGINA NO ENCONTRADA',
      description: 'La página que buscas no existe o ha sido movida. No te preocupes, esto pasa a veces.',
      suggestion: 'Puedes explorar mis proyectos o ponerte en contacto conmigo.',
      projectsButton: 'Ver proyectos',
      contactButton: 'Contactar',
    },
    en: {
      title: '404',
      subtitle: 'PAGE NOT FOUND',
      description: 'The page you are looking for does not exist or has been moved. Don\'t worry, this happens sometimes.',
      suggestion: 'You can explore my projects or get in touch with me.',
      projectsButton: 'View projects',
      contactButton: 'Contact',
    }
  }

  const t = texts[currentLang]

  // Enlaces según idioma
  const getNavLinks = () => {
    if (currentLang === 'es') {
      return {
        projects: `/${currentLang}`,
        contact: `/${currentLang}/contacto`,
      }
    } else {
      return {
        projects: `/${currentLang}`,
        contact: `/${currentLang}/contact`,
      }
    }
  }

  const navLinks = getNavLinks()

  return (
    <div
      className="relative text-black"
      style={{ backgroundColor: '#f5f5f5' }}
    >
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-6xl px-8 md:px-12">
          {/* Título principal */}
          <div className="mb-16 text-left md:mb-20">
            <h1 className="name-text text-5xl leading-[0.8] font-black uppercase md:text-6xl lg:text-8xl">
              {t.title}
            </h1>
            <h2 className="name-text mt-4 text-2xl leading-[0.8] font-black uppercase opacity-60 md:text-3xl lg:text-4xl">
              {t.subtitle}
            </h2>
          </div>

          {/* Contenido principal */}
          <div className="space-y-8 text-left">
            <div>
              <p className="mb-6 text-lg leading-relaxed text-gray-700 md:text-xl">
                {t.description}
              </p>
              <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
                {t.suggestion}
              </p>
            </div>

            {/* Botones de navegación */}
            <div className="flex flex-col gap-4 pt-8 sm:flex-row">
              <Link
                href={navLinks.projects}
                className="block bg-black px-8 py-3 font-medium text-center text-white transition-all hover:scale-105 hover:bg-gray-800 sm:inline-block"
              >
                {t.projectsButton}
              </Link>
              <Link
                href={navLinks.contact}
                className="block border-2 border-black px-8 py-3 font-medium text-center text-black transition-all hover:scale-105 hover:bg-black hover:text-white sm:inline-block"
              >
                {t.contactButton}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}