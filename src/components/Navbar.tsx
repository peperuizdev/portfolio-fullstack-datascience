'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import { projects } from '@/data/projects'

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false)
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)

  const isAboutPage = pathname === '/about'
  const isIndexPage = pathname === '/'
  const isContactPage = pathname === '/contact'
  const isProjectPage = pathname.startsWith('/projects/')

  // Funciones para manejar hover con delay
  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
    }
    setIsProjectsDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsProjectsDropdownOpen(false)
    }, 200) // 200ms de delay antes de cerrar
    setHoverTimeout(timeout)
  }

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
    }
  }, [hoverTimeout])

  // Efecto scroll solo para páginas que NO son home
  useEffect(() => {
    if (isIndexPage) return

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
      if (isMenuOpen && !target.closest('.menu-container') && !target.closest('.menu-overlay')) {
        setIsMenuOpen(false)
      }
      if (isProjectsDropdownOpen && !target.closest('.projects-dropdown')) {
        setIsProjectsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen, isProjectsDropdownOpen])

  // Cerrar dropdown al cambiar de ruta
  useEffect(() => {
    setIsProjectsDropdownOpen(false)
    setIsMobileProjectsOpen(false)
  }, [pathname])

  const getDesktopNavigation = () => {
    return (
      <div className="hidden space-x-8 lg:flex">
        {/* Projects con dropdown */}
        <div 
          className="projects-dropdown relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={() => setIsProjectsDropdownOpen(!isProjectsDropdownOpen)}
            className={`flex items-center gap-1 text-base font-medium transition-opacity hover:opacity-60 ${
              isIndexPage || isProjectPage ? 'text-black' : 'text-gray-600'
            }`}
          >
            Projects
            <ChevronDown 
              className={`h-4 w-4 transition-transform duration-200 ${
                isProjectsDropdownOpen ? 'rotate-180' : ''
              }`} 
            />
          </button>

          {/* Indicador activo para Projects */}
          {(isIndexPage || isProjectPage) && (
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black"></div>
          )}

          {/* Dropdown */}
          {isProjectsDropdownOpen && (
            <div 
              className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="py-2">
                <Link
                  href="/"
                  className={`block px-4 py-2 text-sm transition-colors hover:bg-gray-50 ${
                    isIndexPage ? 'text-black bg-gray-50' : 'text-gray-700'
                  }`}
                  onClick={() => setIsProjectsDropdownOpen(false)}
                >
                  <span className="font-medium">All Projects</span>
                  <span className="block text-xs text-gray-500 mt-1">Ver todos los proyectos</span>
                </Link>
                <hr className="my-1" />
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className={`block px-4 py-2 text-sm transition-colors hover:bg-gray-50 ${
                      pathname === `/projects/${project.slug}` 
                        ? 'text-black bg-gray-50' 
                        : 'text-gray-700'
                    }`}
                    onClick={() => setIsProjectsDropdownOpen(false)}
                  >
                    <span className="font-medium">{project.title}</span>
                    <span className="block text-xs text-gray-500 mt-1">{project.category}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* About */}
        <div className="relative">
          <Link 
            href="/about" 
            className={`text-base font-medium transition-opacity hover:opacity-60 ${
              isAboutPage ? 'text-black' : 'text-gray-600'
            }`}
          >
            About
          </Link>
          {/* Indicador activo para About */}
          {isAboutPage && (
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black"></div>
          )}
        </div>

        {/* Contact */}
        <div className="relative">
          <Link 
            href="/contact"
            className={`text-base font-medium transition-opacity hover:opacity-60 ${
              isContactPage ? 'text-black' : 'text-gray-600'
            }`}
          >
            Contact
          </Link>
          {/* Indicador activo para Contact */}
          {isContactPage && (
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black"></div>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Logo */}
      <div className="fixed top-4 left-4 z-20 md:top-8 md:left-8 lg:top-12 lg:left-12">
        <Link href="/" className="name-hover group block">
          <div className="space-y-0">
            <h1
              className={`name-text leading-[0.9] font-black uppercase ${
                isIndexPage
                  ? 'text-2xl md:text-4xl lg:text-6xl'
                  : 'text-xl md:text-2xl lg:text-3xl'
              } ${
                !isIndexPage && isScrolled ? 'text-transparent' : 'text-black'
              }`}
            >
              {SITE_CONFIG.name.split(' ')[0]}
            </h1>
            <h1
              className={`name-text leading-[0.9] font-black uppercase ${
                isIndexPage
                  ? 'text-2xl md:text-4xl lg:text-6xl'
                  : 'text-xl md:text-2xl lg:text-3xl'
              } ${
                !isIndexPage && isScrolled ? 'text-transparent' : 'text-black'
              }`}
            >
              {SITE_CONFIG.name.split(' ')[1]}
            </h1>
            {/* Subtitle */}
            <p 
              className={`text-primary-600 font-medium transition-all duration-500 ${
                isIndexPage
                  ? 'mt-2 text-xs md:mt-4 md:text-lg lg:mt-6 lg:text-xl'
                  : 'mt-1 text-xs md:mt-2 md:text-sm lg:mt-3 lg:text-base'
              } ${
                !isIndexPage && isScrolled ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'
              }`}
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
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <span className="sr-only">Menú</span>
            <div className="absolute left-1/2 top-1/2 block w-5 -translate-x-1/2 -translate-y-1/2 transform">
              <span
                className={`absolute block h-0.5 w-5 transform bg-black transition duration-300 ease-in-out ${
                  isMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                }`}
              ></span>
              <span
                className={`absolute block h-0.5 w-5 transform bg-black transition duration-300 ease-in-out ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`absolute block h-0.5 w-5 transform bg-black transition duration-300 ease-in-out ${
                  isMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Menú fullscreen mobile */}
      {isMenuOpen && (
        <div 
          className="menu-overlay fixed inset-0 z-40 lg:hidden"
          style={{ backgroundColor: 'rgba(248, 250, 252, 0.9)' }}
        >
          <div className="flex h-full w-full items-center justify-center">
            <div className="w-full max-w-md px-8">
              {/* Información personal */}
              <div className="mb-16 text-center">
                <h2 className="name-text mb-6 text-3xl font-black uppercase leading-[0.9]">
                  {SITE_CONFIG.name.split(' ')[0]}
                  <br />
                  {SITE_CONFIG.name.split(' ')[1]}
                </h2>
                <p className="mb-3 text-sm font-medium text-gray-600">
                  {SITE_CONFIG.title}
                </p>
                <p className="text-sm text-gray-500">
                  {SITE_CONFIG.location}
                </p>
              </div>

              {/* Enlaces de navegación */}
              <div className="space-y-6">
                {/* Projects con submenú */}
                <div>
                  <button
                    onClick={() => setIsMobileProjectsOpen(!isMobileProjectsOpen)}
                    className={`flex w-full items-center justify-between text-lg font-medium transition-opacity hover:opacity-60 ${
                      isIndexPage || isProjectPage ? 'text-black' : 'text-gray-600'
                    }`}
                  >
                    Projects
                    <ChevronDown 
                      className={`h-5 w-5 transition-transform duration-200 ${
                        isMobileProjectsOpen ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {/* Indicador activo para Projects en mobile */}
                  {(isIndexPage || isProjectPage) && (
                    <div className="mt-1 h-0.5 w-8 bg-black"></div>
                  )}
                  
                  {isMobileProjectsOpen && (
                    <div className="mt-3 ml-4 space-y-3">
                      <Link
                        href="/"
                        className={`block text-base transition-opacity hover:opacity-60 ${
                          isIndexPage ? 'text-black font-medium' : 'text-gray-600'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        All Projects
                      </Link>
                      {projects.map((project) => (
                        <Link
                          key={project.id}
                          href={`/projects/${project.slug}`}
                          className={`block text-base transition-opacity hover:opacity-60 ${
                            pathname === `/projects/${project.slug}` 
                              ? 'text-black font-medium' 
                              : 'text-gray-600'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {project.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* About */}
                <div>
                  <Link
                    href="/about"
                    className={`block text-lg font-medium transition-opacity hover:opacity-60 ${
                      isAboutPage ? 'text-black' : 'text-gray-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                  {/* Indicador activo para About en mobile */}
                  {isAboutPage && (
                    <div className="mt-1 h-0.5 w-8 bg-black"></div>
                  )}
                </div>

                {/* Contact */}
                <div>
                  <Link
                    href="/contact"
                    className={`block text-lg font-medium transition-opacity hover:opacity-60 ${
                      isContactPage ? 'text-black' : 'text-gray-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  {/* Indicador activo para Contact en mobile */}
                  {isContactPage && (
                    <div className="mt-1 h-0.5 w-8 bg-black"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}