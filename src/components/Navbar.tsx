'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const isAboutPage = pathname === '/about'
  const isIndexPage = pathname === '/'
  const isContactPage = pathname === '/contact'
  const isProjectPage = pathname.startsWith('/projects/')

  // Efecto scroll solo para páginas que NO son home
  useEffect(() => {
    if (isIndexPage) {
      setIsScrolled(false)
      return
    }

    const handleScroll = () => {
      const scrolled = window.scrollY > 100
      setIsScrolled(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isIndexPage])

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (
        isMenuOpen &&
        !target.closest('.menu-container') &&
        !target.closest('.menu-overlay')
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  const getDesktopNavigation = () => {
    return (
      <div className="hidden space-x-8 lg:flex">
        {/* Proyectos */}
        <div className="relative">
          <Link
            href="/"
            className="text-base font-medium transition-opacity hover:opacity-60"
            style={{
              color:
                isIndexPage || isProjectPage
                  ? isIndexPage
                    ? '#f5f5f5'
                    : '#000000'
                  : isIndexPage
                    ? '#f5f5f5'
                    : '#4b5563',
            }}
          >
            Proyectos
          </Link>
          {(isIndexPage || isProjectPage) && (
            <div
              className="absolute right-0 -bottom-1 left-0 h-0.5"
              style={{ backgroundColor: isIndexPage ? '#f5f5f5' : '#000000' }}
            ></div>
          )}
        </div>

        {/* Sobre mí */}
        <div className="relative">
          <Link
            href="/about"
            className="text-base font-medium transition-opacity hover:opacity-60"
            style={{
              color: isAboutPage
                ? isIndexPage
                  ? '#f5f5f5'
                  : '#000000'
                : isIndexPage
                  ? '#f5f5f5'
                  : '#4b5563',
            }}
          >
            Sobre mí
          </Link>
          {isAboutPage && (
            <div
              className="absolute right-0 -bottom-1 left-0 h-0.5"
              style={{ backgroundColor: isIndexPage ? '#f5f5f5' : '#000000' }}
            ></div>
          )}
        </div>

        {/* Contacto */}
        <div className="relative">
          <Link
            href="/contact"
            className="text-base font-medium transition-opacity hover:opacity-60"
            style={{
              color: isContactPage
                ? isIndexPage
                  ? '#f5f5f5'
                  : '#000000'
                : isIndexPage
                  ? '#f5f5f5'
                  : '#4b5563',
            }}
          >
            Contacto
          </Link>
          {isContactPage && (
            <div
              className="absolute right-0 -bottom-1 left-0 h-0.5"
              style={{ backgroundColor: isIndexPage ? '#f5f5f5' : '#000000' }}
            ></div>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Logo */}
      <div className="fixed top-4 left-4 z-50 md:top-8 md:left-8 lg:top-12 lg:left-12">
        <Link
          href="/"
          className={`name-hover group block ${isIndexPage ? 'index-page' : ''}`}
        >
          <div className="space-y-0">
            <h1
              className={`name-text leading-[0.9] font-black uppercase ${
                isIndexPage
                  ? 'text-2xl md:text-4xl lg:text-6xl'
                  : 'text-xl md:text-2xl lg:text-3xl'
              } ${!isIndexPage && isScrolled ? 'scrolled' : ''} ${
                isMenuOpen
                  ? 'transition-all duration-300'
                  : 'transition-all duration-300'
              }`}
              style={{
                color: isMenuOpen
                  ? isIndexPage
                    ? '#f5f5f5'
                    : '#000000'
                  : isIndexPage
                    ? '#f5f5f5'
                    : '#000000',
              }}
            >
              {SITE_CONFIG.name.split(' ')[0]}
            </h1>
            <h1
              className={`name-text leading-[0.9] font-black uppercase ${
                isIndexPage
                  ? 'text-2xl md:text-4xl lg:text-6xl'
                  : 'text-xl md:text-2xl lg:text-3xl'
              } ${!isIndexPage && isScrolled ? 'scrolled' : ''} ${
                isMenuOpen
                  ? 'transition-all duration-300'
                  : 'transition-all duration-300'
              }`}
              style={{
                color: isMenuOpen
                  ? isIndexPage
                    ? '#f5f5f5'
                    : '#000000'
                  : isIndexPage
                    ? '#f5f5f5'
                    : '#000000',
              }}
            >
              {SITE_CONFIG.name.split(' ')[1]}
            </h1>
            <p
              className={`font-medium transition-all duration-500 ${
                isIndexPage
                  ? 'mt-2 text-xs md:mt-4 md:text-lg lg:mt-6 lg:text-xl'
                  : 'mt-1 text-xs md:mt-2 md:text-sm lg:mt-3 lg:text-base'
              } ${
                isMenuOpen
                  ? 'translate-y-0 transform opacity-100'
                  : !isIndexPage && isScrolled
                    ? '-translate-y-2 transform opacity-0'
                    : 'translate-y-0 transform opacity-100'
              }`}
              style={{
                color: isMenuOpen
                  ? isIndexPage
                    ? '#f5f5f5'
                    : '#000000'
                  : !isIndexPage && isScrolled
                    ? 'transparent'
                    : isIndexPage
                      ? '#f5f5f5'
                      : '#000000',
              }}
            >
              {SITE_CONFIG.title}
            </p>
          </div>
        </Link>
      </div>

      {/* Navegación superior derecha */}
      <div className="fixed top-4 right-4 z-50 md:top-8 md:right-8 lg:top-12 lg:right-12">
        {getDesktopNavigation()}

        {/* Mobile: menú hamburguesa */}
        <div className="menu-container lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="group relative h-10 w-10"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span className="sr-only">Menú</span>
            <div className="absolute top-1/2 left-1/2 block w-5 -translate-x-1/2 -translate-y-1/2 transform">
              <span
                className="absolute block h-0.5 w-5 transform transition duration-300 ease-in-out"
                style={{
                  backgroundColor: isMenuOpen
                    ? isIndexPage
                      ? '#f5f5f5'
                      : '#000000'
                    : isIndexPage
                      ? '#f5f5f5'
                      : '#000000',
                  transform: isMenuOpen ? 'rotate(45deg)' : 'translateY(-6px)',
                }}
              ></span>
              <span
                className="absolute block h-0.5 w-5 transform transition duration-300 ease-in-out"
                style={{
                  backgroundColor: isMenuOpen
                    ? isIndexPage
                      ? '#f5f5f5'
                      : '#000000'
                    : isIndexPage
                      ? '#f5f5f5'
                      : '#000000',
                  opacity: isMenuOpen ? 0 : 1,
                }}
              ></span>
              <span
                className="absolute block h-0.5 w-5 transform transition duration-300 ease-in-out"
                style={{
                  backgroundColor: isMenuOpen
                    ? isIndexPage
                      ? '#f5f5f5'
                      : '#000000'
                    : isIndexPage
                      ? '#f5f5f5'
                      : '#000000',
                  transform: isMenuOpen ? 'rotate(-45deg)' : 'translateY(6px)',
                }}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Menú fullscreen mobile */}
      {isMenuOpen && (
        <div
          className="menu-overlay fixed inset-0 z-40 lg:hidden"
          style={{ backgroundColor: isIndexPage ? '#4DABF7' : '#E5E5E5' }}
        >
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="w-full max-w-md px-8">
              {/* Enlaces de navegación */}
              <div className="mb-16 space-y-8 text-center">
                {/* Proyectos */}
                <div>
                  <Link
                    href="/"
                    className="block text-2xl font-bold transition-opacity hover:opacity-60"
                    style={{
                      color:
                        isIndexPage || isProjectPage
                          ? isIndexPage
                            ? '#f5f5f5'
                            : '#000000'
                          : isIndexPage
                            ? 'rgba(245, 245, 245, 0.7)'
                            : 'rgba(0, 0, 0, 0.7)',
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Proyectos
                  </Link>
                  {(isIndexPage || isProjectPage) && (
                    <div
                      className="mx-auto mt-2 h-0.5 w-12"
                      style={{
                        backgroundColor: isIndexPage ? '#f5f5f5' : '#000000',
                      }}
                    ></div>
                  )}
                </div>

                {/* Sobre mí */}
                <div>
                  <Link
                    href="/about"
                    className="block text-2xl font-bold transition-opacity hover:opacity-60"
                    style={{
                      color: isAboutPage
                        ? isIndexPage
                          ? '#f5f5f5'
                          : '#000000'
                        : isIndexPage
                          ? 'rgba(245, 245, 245, 0.7)'
                          : 'rgba(0, 0, 0, 0.7)',
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sobre mí
                  </Link>
                  {isAboutPage && (
                    <div
                      className="mx-auto mt-2 h-0.5 w-12"
                      style={{
                        backgroundColor: isIndexPage ? '#f5f5f5' : '#000000',
                      }}
                    ></div>
                  )}
                </div>

                {/* Contacto */}
                <div>
                  <Link
                    href="/contact"
                    className="block text-2xl font-bold transition-opacity hover:opacity-60"
                    style={{
                      color: isContactPage
                        ? isIndexPage
                          ? '#f5f5f5'
                          : '#000000'
                        : isIndexPage
                          ? 'rgba(245, 245, 245, 0.7)'
                          : 'rgba(0, 0, 0, 0.7)',
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contacto
                  </Link>
                  {isContactPage && (
                    <div
                      className="mx-auto mt-2 h-0.5 w-12"
                      style={{
                        backgroundColor: isIndexPage ? '#f5f5f5' : '#000000',
                      }}
                    ></div>
                  )}
                </div>
              </div>

              {/* Información del footer en mobile */}
              <div className="space-y-6 text-center">
                {/* Contact info */}
                <div className="space-y-2">
                  <p
                    className="text-sm font-medium"
                    style={{ color: isIndexPage ? '#f5f5f5' : '#000000' }}
                  >
                    Contacto
                  </p>
                  <a
                    href={SITE_CONFIG.links.email}
                    className="block text-sm transition-opacity hover:opacity-100"
                    style={{
                      color: isIndexPage
                        ? 'rgba(245, 245, 245, 0.7)'
                        : 'rgba(0, 0, 0, 0.7)',
                    }}
                  >
                    {SITE_CONFIG.email}
                  </a>
                  <p
                    className="text-sm"
                    style={{
                      color: isIndexPage
                        ? 'rgba(245, 245, 245, 0.7)'
                        : 'rgba(0, 0, 0, 0.7)',
                    }}
                  >
                    {SITE_CONFIG.phone}
                  </p>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <p
                    className="text-sm font-medium"
                    style={{ color: isIndexPage ? '#f5f5f5' : '#000000' }}
                  >
                    Ubicación
                  </p>
                  <p
                    className="text-sm"
                    style={{
                      color: isIndexPage
                        ? 'rgba(245, 245, 245, 0.7)'
                        : 'rgba(0, 0, 0, 0.7)',
                    }}
                  >
                    {SITE_CONFIG.location}
                  </p>
                </div>

                {/* Social links */}
                <div className="space-y-2">
                  <p
                    className="text-sm font-medium"
                    style={{ color: isIndexPage ? '#f5f5f5' : '#000000' }}
                  >
                    Sígueme
                  </p>
                  <div className="flex justify-center space-x-6">
                    <a
                      href={SITE_CONFIG.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-opacity hover:opacity-100"
                      style={{
                        color: isIndexPage
                          ? 'rgba(245, 245, 245, 0.7)'
                          : 'rgba(0, 0, 0, 0.7)',
                      }}
                    >
                      GitHub
                    </a>
                    <a
                      href={SITE_CONFIG.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-opacity hover:opacity-100"
                      style={{
                        color: isIndexPage
                          ? 'rgba(245, 245, 245, 0.7)'
                          : 'rgba(0, 0, 0, 0.7)',
                      }}
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
