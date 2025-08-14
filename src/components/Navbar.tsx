'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowLeft } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const isProjectPage = pathname.startsWith('/projects/')

  // Efecto scroll solo en páginas de proyecto
  useEffect(() => {
    if (!isProjectPage) return

    const handleScroll = () => {
      const scrolled = window.scrollY > 100
      setIsScrolled(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isProjectPage])

  return (
    <>
      {/* Logo */}
      <div className="fixed top-4 left-4 z-20 md:top-8 md:left-8 lg:top-12 lg:left-12">
        <a href="/" className="name-hover group block">
          <div className="space-y-0">
            <h1
              className={`name-text leading-[0.9] font-black uppercase transition-all duration-500 ${
                isProjectPage
                  ? 'text-xl md:text-2xl lg:text-3xl'
                  : 'text-2xl md:text-4xl lg:text-6xl'
              } ${
                isProjectPage && isScrolled
                  ? 'text-transparent group-hover:text-black'
                  : 'text-black group-hover:text-transparent'
              }`}
              style={{
                WebkitTextStroke:
                  isProjectPage && isScrolled ? '1px black' : '0px transparent',
                transition: 'all 0.5s ease',
              }}
            >
              {SITE_CONFIG.name.split(' ')[0]}
            </h1>
            <h1
              className={`name-text leading-[0.9] font-black uppercase transition-all duration-500 ${
                isProjectPage
                  ? 'text-xl md:text-2xl lg:text-3xl'
                  : 'text-2xl md:text-4xl lg:text-6xl'
              } ${
                isProjectPage && isScrolled
                  ? 'text-transparent group-hover:text-black'
                  : 'text-black group-hover:text-transparent'
              }`}
              style={{
                WebkitTextStroke:
                  isProjectPage && isScrolled ? '1px black' : '0px transparent',
                transition: 'all 0.5s ease',
              }}
            >
              {SITE_CONFIG.name.split(' ')[1]}
            </h1>
            {/* Solo mostrar subtitle en index */}
            {!isProjectPage && (
              <p className="text-primary-600 mt-2 text-xs font-medium md:mt-4 md:text-lg lg:mt-6 lg:text-xl">
                {SITE_CONFIG.title}
              </p>
            )}
          </div>
        </a>
      </div>

      {/* Contacto desktop */}
      <div className="fixed bottom-4 left-4 z-20 hidden md:bottom-8 md:left-8 md:block lg:bottom-12 lg:left-12">
        <div className="space-y-2 md:space-y-3">
          <h3 className="text-primary-500 mb-2 text-xs font-semibold tracking-wider uppercase md:mb-4 md:text-sm">
            Contacto
          </h3>
          <a
            href={SITE_CONFIG.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-700 block text-sm font-medium transition-colors duration-300 hover:text-black md:text-base"
          >
            GitHub
          </a>
          <a
            href={SITE_CONFIG.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-700 block text-sm font-medium transition-colors duration-300 hover:text-black md:text-base"
          >
            LinkedIn
          </a>
          <a
            href={SITE_CONFIG.links.email}
            className="text-primary-700 block text-sm font-medium transition-colors duration-300 hover:text-black md:text-base"
          >
            Email
          </a>
        </div>
      </div>

      {/* Menú móvil hamburguesa - SOLO en proyectos - reemplaza flecha */}
      {isProjectPage && (
        <div className="fixed top-4 right-4 z-30 md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-full bg-black p-3 text-white shadow-lg transition-colors hover:bg-gray-800"
            aria-label="Abrir menú"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Menú desplegable vertical */}
          {isMenuOpen && (
            <div className="absolute top-16 right-0 min-w-64 rounded-lg border border-gray-200 bg-white p-8 shadow-xl">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <span className="font-mono text-xs text-gray-400">01</span>
                  <a
                    href="/"
                    className="text-sm font-medium text-gray-800 transition-colors hover:text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    inicio
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-mono text-xs text-gray-400">02</span>
                  <a
                    href={SITE_CONFIG.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gray-800 transition-colors hover:text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    github
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-mono text-xs text-gray-400">03</span>
                  <a
                    href={SITE_CONFIG.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gray-800 transition-colors hover:text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    linkedin
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-mono text-xs text-gray-400">04</span>
                  <a
                    href={SITE_CONFIG.links.email}
                    className="text-sm font-medium text-gray-800 transition-colors hover:text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    email
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Flecha volver - SOLO desktop en proyectos */}
      {isProjectPage && (
        <div className="fixed top-4 right-4 z-20 hidden md:top-8 md:right-8 md:block lg:top-12 lg:right-12">
          <a
            href="/"
            className="p-2 text-black transition-opacity hover:opacity-60"
            aria-label="Volver al inicio"
          >
            <ArrowLeft className="h-6 w-6 md:h-8 md:w-8" />
          </a>
        </div>
      )}
    </>
  )
}
