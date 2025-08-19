'use client'
import { getSiteConfig } from '@/lib/constants'
import { usePathname } from 'next/navigation'
import { Locale, isValidLocale } from '@/lib/i18n'

export default function Footer() {
  const pathname = usePathname()
  
  // Extraer idioma de la URL
  const pathSegments = pathname.split('/').filter(Boolean)
  const currentLang = (pathSegments[0] && isValidLocale(pathSegments[0]) ? pathSegments[0] : 'es') as Locale
  const siteConfig = getSiteConfig(currentLang)
  
  // Determinar si es página index
  const currentPath = pathname.replace(`/${currentLang}`, '') || '/'
  const isIndexPage = currentPath === '/'

  // Traducciones
  const footerTexts = {
    es: {
      location: 'Ubicación',
      contact: 'Contacto',
      followMe: 'Sígueme',
      allRightsReserved: 'Todos los derechos reservados',
    },
    en: {
      location: 'Location',
      contact: 'Contact',
      followMe: 'Follow me',
      allRightsReserved: 'All rights reserved',
    }
  }

  const t = footerTexts[currentLang]

  return (
    <footer
      className="w-full py-8 md:py-12"
      style={{
        backgroundColor: isIndexPage ? '#66CCFF' : '#f5f5f5',
      }}
    >
      <div className="px-4 md:px-8 lg:px-12">
        {/* Mobile: Solo copyright centrado */}
        <div className="block text-center lg:hidden">
          <p
            className="text-sm"
            style={{ color: isIndexPage ? '#d1d5db' : '#6b7280' }}
          >
            © 2025 {siteConfig.name}
          </p>
        </div>

        {/* Desktop  */}
        <div className="hidden lg:block">
          <div className="flex items-start justify-between">
            {/* Bloque izquierdo */}
            <div className="flex space-x-16">
              {/* Ubicación */}
              <div className="space-y-2">
                <p
                  className="text-sm font-medium"
                  style={{ color: isIndexPage ? '#f5f5f5' : '#000000' }}
                >
                  {t.location}
                </p>
                <p
                  className="text-sm"
                  style={{ color: isIndexPage ? '#f5f5f5' : '#4b5563' }}
                >
                  {siteConfig.location}
                </p>
              </div>

              {/* Contacto */}
              <div className="space-y-2">
                <p
                  className="text-sm font-medium"
                  style={{ color: isIndexPage ? '#f5f5f5' : '#000000' }}
                >
                  {t.contact}
                </p>
                <a
                  href={siteConfig.links.email}
                  className="block text-sm transition-opacity hover:opacity-60"
                  style={{ color: isIndexPage ? '#f5f5f5' : '#4b5563' }}
                >
                  {siteConfig.email}
                </a>
                <p
                  className="text-sm"
                  style={{ color: isIndexPage ? '#f5f5f5' : '#4b5563' }}
                >
                  {siteConfig.phone}
                </p>
              </div>

              {/* Enlaces sociales */}
              <div className="space-y-2">
                <p
                  className="text-sm font-medium"
                  style={{ color: isIndexPage ? '#f5f5f5' : '#000000' }}
                >
                  {t.followMe}
                </p>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm transition-opacity hover:opacity-60"
                  style={{ color: isIndexPage ? '#f5f5f5' : '#4b5563' }}
                >
                  GitHub
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm transition-opacity hover:opacity-60"
                  style={{ color: isIndexPage ? '#f5f5f5' : '#4b5563' }}
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Bloque derecho: Copyright */}
            <div className="space-y-2 text-right">
              <p
                className="text-sm"
                style={{ color: isIndexPage ? '#f5f5f5' : '#000000' }}
              >
                © 2025 {siteConfig.name}
              </p>
              <p
                className="text-sm"
                style={{ color: isIndexPage ? '#f5f5f5' : '#000000' }}
              >
                {t.allRightsReserved}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}