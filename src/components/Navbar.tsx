'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { getSiteConfig } from '@/lib/constants'
import { Locale, getLocalizedPath, isValidLocale } from '@/lib/i18n'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Extraer idioma de la URL
  const pathSegments = pathname.split('/').filter(Boolean)
  const currentLang = (pathSegments[0] && isValidLocale(pathSegments[0]) ? pathSegments[0] : 'es') as Locale
  const siteConfig = getSiteConfig(currentLang)

  // Determinar en qué página estamos
  const currentPath = pathname.replace(`/${currentLang}`, '') || '/'
  const isAboutPage = currentPath === '/sobre-mi' || currentPath === '/about'
  const isIndexPage = currentPath === '/'
  const isContactPage = currentPath === '/contacto' || currentPath === '/contact'
  const isProjectPage = currentPath.startsWith('/projects/')

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

  // Función para cambiar idioma
  const switchLanguage = (newLang: Locale) => {
    // Guardar preferencia en cookie
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000` // 1 año

    // Obtener la nueva ruta
    const newPath = getLocalizedPath(pathname, currentLang, newLang)
    
    // Navegar a la nueva ruta
    router.push(newPath)
    
    // Cerrar menú si está abierto
    setIsMenuOpen(false)
  }

  // Textos por idioma
  const navTexts = {
    es: {
      projects: 'Proyectos',
      about: 'Sobre mí',
      contact: 'Contacto',
      location: 'Ubicación',
      followMe: 'Sígueme',
    },
    en: {
      projects: 'Projects',
      about: 'About me', 
      contact: 'Contact',
      location: 'Location',
      followMe: 'Follow me',
    }
  }

  const t = navTexts[currentLang]

  // Enlaces de navegación según idioma
  const getNavLinks = () => {
    if (currentLang === 'es') {
      return {
        projects: `/${currentLang}`,
        about: `/${currentLang}/sobre-mi`,
        contact: `/${currentLang}/contacto`,
      }
    } else {
      return {
        projects: `/${currentLang}`,
        about: `/${currentLang}/about`,
        contact: `/${currentLang}/contact`,
      }
    }
  }

  const navLinks = getNavLinks()

  const getDesktopNavigation = () => {
    return (
      <div className="hidden space-x-8 lg:flex lg:items-center">
        {/* Enlaces de navegación */}
        <div className="flex space-x-8">
          {/* Proyectos */}
          <div className="relative">
            <Link
              href={navLinks.projects}
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
                fontWeight: (isIndexPage || isProjectPage) ? '600' : '400'
              }}
            >
              {t.projects}
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
              href={navLinks.about}
              className="text-base font-medium transition-opacity hover:opacity-60"
              style={{
                color: isAboutPage
                  ? isIndexPage
                    ? '#f5f5f5'
                    : '#000000'
                  : isIndexPage
                    ? '#f5f5f5'
                    : '#4b5563',
                fontWeight: isAboutPage ? '600' : '400'
              }}
            >
              {t.about}
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
              href={navLinks.contact}
              className="text-base font-medium transition-opacity hover:opacity-60"
              style={{
                color: isContactPage
                  ? isIndexPage
                    ? '#f5f5f5'
                    : '#000000'
                  : isIndexPage
                    ? '#f5f5f5'
                    : '#4b5563',
                fontWeight: isContactPage ? '600' : '400'
              }}
            >
              {t.contact}
            </Link>
            {isContactPage && (
              <div
                className="absolute right-0 -bottom-1 left-0 h-0.5"
                style={{ backgroundColor: isIndexPage ? '#f5f5f5' : '#000000' }}
              ></div>
            )}
          </div>
        </div>

        {/* Selector de idioma - Desktop */}
        <div className="flex items-center">
          <span className="mx-3 text-sm opacity-30" style={{ color: isIndexPage ? '#f5f5f5' : '#000000' }}>
            |
          </span>
          <div className="flex items-center space-x-6">
            {/* ES */}
            <div className="relative">
              <button
              onClick={currentLang !== 'es' ? () => switchLanguage('es') : undefined}
              className={`text-sm font-medium transition-opacity ${currentLang === 'es' ? 'cursor-default' : 'cursor-pointer hover:opacity-60'}`}
                style={{ 
                  color: isIndexPage ? '#f5f5f5' : '#000000',
                  fontWeight: currentLang === 'es' ? '600' : '400'
                }}
              >
                ES
              </button>
              {currentLang === 'es' && (
                <div
                  className="absolute right-0 -bottom-1 left-0 h-0.5"
                  style={{ backgroundColor: isIndexPage ? '#f5f5f5' : '#000000' }}
                ></div>
              )}
            </div>

            {/* EN */}
            <div className="relative">
              <button
                onClick={currentLang !== 'en' ? () => switchLanguage('en') : undefined}
                className={`text-sm font-medium transition-opacity ${currentLang === 'en' ? 'cursor-default' : 'cursor-pointer hover:opacity-60'}`}
                style={{ 
                  color: isIndexPage ? '#f5f5f5' : '#000000',
                  fontWeight: currentLang === 'en' ? '600' : '400'
                }}
              >
                EN
              </button>
              {currentLang === 'en' && (
                <div
                  className="absolute right-0 -bottom-1 left-0 h-0.5"
                  style={{ backgroundColor: isIndexPage ? '#f5f5f5' : '#000000' }}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Logo */}
      <div className="fixed top-4 left-4 z-50 md:top-8 md:left-8 lg:top-12 lg:left-12">
        <Link
          href={navLinks.projects}
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
              {siteConfig.name.split(' ')[0]}
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
              {siteConfig.name.split(' ')[1]}
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
              {siteConfig.title}
            </p>
          </div>
        </Link>
      </div>

      {/* Navegación superior derecha */}
      <div className="fixed top-4 right-4 z-50 md:top-8 md:right-8 lg:top-12 lg:right-12">
        {getDesktopNavigation()}

        {/* Mobile: selector de idioma + menú hamburguesa */}
        <div className="flex items-center space-x-4 lg:hidden">
          {/* Selector de idioma - Mobile */}
          <div className="flex items-center space-x-4 pb-[0.66rem]">
            {/* ES */}
            <div className="relative">
              <button
                onClick={currentLang !== 'es' ? () => switchLanguage('es') : undefined}
                className={`text-sm font-medium transition-opacity ${currentLang === 'es' ? 'cursor-default' : 'cursor-pointer hover:opacity-60'}`}
                style={{ 
                  color: isIndexPage ? '#f5f5f5' : '#000000',
                  fontWeight: currentLang === 'es' ? '600' : '400'
                }}
              >
                ES
              </button>
              {currentLang === 'es' && (
                <div
                  className="absolute right-0 -bottom-1 left-0 h-0.5"
                  style={{ backgroundColor: isIndexPage ? '#f5f5f5' : '#000000' }}
                ></div>
              )}
            </div>

            {/* EN */}
            <div className="relative">
              <button
                onClick={currentLang !== 'en' ? () => switchLanguage('en') : undefined}
                className={`text-sm font-medium transition-opacity ${currentLang === 'en' ? 'cursor-default' : 'cursor-pointer hover:opacity-60'}`}
                style={{ 
                  color: isIndexPage ? '#f5f5f5' : '#000000',
                  fontWeight: currentLang === 'en' ? '600' : '400'
                }}
              >
                EN
              </button>
              {currentLang === 'en' && (
                <div
                  className="absolute right-0 -bottom-1 left-0 h-0.5"
                  style={{ backgroundColor: isIndexPage ? '#f5f5f5' : '#000000' }}
                ></div>
              )}
            </div>
          </div>

          {/* Menú hamburguesa */}
          <div className="menu-container">
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
                    href={navLinks.projects}
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
                      fontWeight: (isIndexPage || isProjectPage) ? '800' : '700'
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.projects}
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
                    href={navLinks.about}
                    className="block text-2xl font-bold transition-opacity hover:opacity-60"
                    style={{
                      color: isAboutPage
                        ? isIndexPage
                          ? '#f5f5f5'
                          : '#000000'
                        : isIndexPage
                          ? 'rgba(245, 245, 245, 0.7)'
                          : 'rgba(0, 0, 0, 0.7)',
                      fontWeight: isAboutPage ? '800' : '700'
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.about}
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
                    href={navLinks.contact}
                    className="block text-2xl font-bold transition-opacity hover:opacity-60"
                    style={{
                      color: isContactPage
                        ? isIndexPage
                          ? '#f5f5f5'
                          : '#000000'
                        : isIndexPage
                          ? 'rgba(245, 245, 245, 0.7)'
                          : 'rgba(0, 0, 0, 0.7)',
                      fontWeight: isContactPage ? '800' : '700'
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.contact}
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
                    href={siteConfig.links.email}
                    className="block text-sm transition-opacity hover:opacity-100"
                    style={{
                      color: isIndexPage
                        ? 'rgba(245, 245, 245, 0.7)'
                        : 'rgba(0, 0, 0, 0.7)',
                    }}
                  >
                    {siteConfig.email}
                  </a>
                  <p
                    className="text-sm"
                    style={{
                      color: isIndexPage
                        ? 'rgba(245, 245, 245, 0.7)'
                        : 'rgba(0, 0, 0, 0.7)',
                    }}
                  >
                    {siteConfig.phone}
                  </p>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <p
                    className="text-sm font-medium"
                    style={{ color: isIndexPage ? '#f5f5f5' : '#000000' }}
                  >
                    {t.location}
                  </p>
                  <p
                    className="text-sm"
                    style={{
                      color: isIndexPage
                        ? 'rgba(245, 245, 245, 0.7)'
                        : 'rgba(0, 0, 0, 0.7)',
                    }}
                  >
                    {siteConfig.location}
                  </p>
                </div>

                {/* Social links */}
                <div className="space-y-2">
                  <p
                    className="text-sm font-medium"
                    style={{ color: isIndexPage ? '#f5f5f5' : '#000000' }}
                  >
                    {t.followMe}
                  </p>
                  <div className="flex justify-center space-x-6">
                    <a
                      href={siteConfig.links.github}
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
                      href={siteConfig.links.linkedin}
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