'use client'
import { SITE_CONFIG } from '@/lib/constants'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  const isIndexPage = pathname === '/'

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
            © 2025 {SITE_CONFIG.name}
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
                  Ubicación
                </p>
                <p
                  className="text-sm"
                  style={{ color: isIndexPage ? '#f5f5f5' : '#4b5563' }}
                >
                  {SITE_CONFIG.location}
                </p>
              </div>

              {/* Contacto */}
              <div className="space-y-2">
                <p
                  className="text-sm font-medium"
                  style={{ color: isIndexPage ? '#f5f5f5' : '#000000' }}
                >
                  Contacto
                </p>
                <a
                  href={SITE_CONFIG.links.email}
                  className="block text-sm transition-opacity hover:opacity-60"
                  style={{ color: isIndexPage ? '#f5f5f5' : '#4b5563' }}
                >
                  {SITE_CONFIG.email}
                </a>
                <p
                  className="text-sm"
                  style={{ color: isIndexPage ? '#f5f5f5' : '#4b5563' }}
                >
                  {SITE_CONFIG.phone}
                </p>
              </div>

              {/* Enlaces sociales */}
              <div className="space-y-2">
                <p
                  className="text-sm font-medium"
                  style={{ color: isIndexPage ? '#f5f5f5' : '#000000' }}
                >
                  Sígueme
                </p>
                <a
                  href={SITE_CONFIG.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm transition-opacity hover:opacity-60"
                  style={{ color: isIndexPage ? '#f5f5f5' : '#4b5563' }}
                >
                  GitHub
                </a>
                <a
                  href={SITE_CONFIG.links.linkedin}
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
                © 2025 {SITE_CONFIG.name}
              </p>
              <p
                className="text-sm"
                style={{ color: isIndexPage ? '#f5f5f5' : '#000000' }}
              >
                Todos los derechos reservados
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
