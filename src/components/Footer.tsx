'use client'

import { SITE_CONFIG } from '@/lib/constants'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  const isIndexPage = pathname === '/'

  return (
    <footer className="w-full py-8 md:py-12">
      <div className="px-4 md:px-8 lg:px-12">
        {/* Mobile: Solo copyright centrado */}
        <div className="block text-center lg:hidden">
          <p className={`text-sm ${isIndexPage ? 'text-white' : 'text-gray-500'}`}>
            © 2025 {SITE_CONFIG.name}
          </p>
        </div>

        {/* Desktop: Layout horizontal minimalista */}
        <div className="hidden lg:block">
          <div className="flex items-start justify-between">
            {/* Bloque izquierdo: Tres columnas en fila */}
            <div className="flex space-x-16">
              {/* Ubicación */}
              <div className="space-y-2">
                <p className={`text-sm font-medium ${isIndexPage ? 'text-white' : 'text-black'}`}>
                  Location
                </p>
                <p className={`text-sm ${isIndexPage ? 'text-white' : 'text-gray-600'}`}>
                  {SITE_CONFIG.location}
                </p>
              </div>

              {/* Contacto */}
              <div className="space-y-2">
                <p className={`text-sm font-medium ${isIndexPage ? 'text-white' : 'text-black'}`}>
                  Contact
                </p>
                <a
                  href={SITE_CONFIG.links.email}
                  className={`block text-sm transition-opacity hover:opacity-60 ${isIndexPage ? 'text-white' : 'text-gray-600'}`}
                >
                  {SITE_CONFIG.email}
                </a>
                <p className={`text-sm ${isIndexPage ? 'text-white' : 'text-gray-600'}`}>
                  {SITE_CONFIG.phone}
                </p>
              </div>

              {/* Enlaces sociales */}
              <div className="space-y-2">
                <p className={`text-sm font-medium ${isIndexPage ? 'text-white' : 'text-black'}`}>
                  Follow
                </p>
                <a
                  href={SITE_CONFIG.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-sm transition-opacity hover:opacity-60 ${isIndexPage ? 'text-white' : 'text-gray-600'}`}
                >
                  GitHub
                </a>
                <a
                  href={SITE_CONFIG.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-sm transition-opacity hover:opacity-60 ${isIndexPage ? 'text-white' : 'text-gray-600'}`}
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Bloque derecho: Copyright */}
            <div className="space-y-2 text-right">
              <p className={`text-sm ${isIndexPage ? 'text-white opacity-70' : 'text-gray-400'}`}>
                © 2025 {SITE_CONFIG.name}
              </p>
              <p className={`text-sm ${isIndexPage ? 'text-white opacity-70' : 'text-gray-400'}`}>
                All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}