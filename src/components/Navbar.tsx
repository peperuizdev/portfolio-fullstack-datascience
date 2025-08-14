'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const isProjectPage = pathname.startsWith('/projects/')
  const isAboutPage = pathname === '/about'
  const isIndexPage = pathname === '/'

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

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMenuOpen && !target.closest('.menu-container')) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  const isContactPage = pathname === '/contact'

  // Navegación contextual según la página
  const getDesktopNavigation = () => {
    if (isIndexPage) {
      return (
        <div className="hidden space-x-8 lg:flex">
          <Link 
            href="/about" 
            className="text-sm font-medium text-black transition-opacity hover:opacity-60"
          >
            About
          </Link>
          <Link 
            href="/contact"
            className="text-sm font-medium text-black transition-opacity hover:opacity-60"
          >
            Contact
          </Link>
        </div>
      )
    }

    if (isProjectPage) {
      return (
        <div className="hidden space-x-8 lg:flex">
          <Link 
            href="/" 
            className="text-sm font-medium text-black transition-opacity hover:opacity-60"
          >
            ← Home
          </Link>
          <Link 
            href="/about" 
            className="text-sm font-medium text-black transition-opacity hover:opacity-60"
          >
            About
          </Link>
          <Link 
            href="/contact"
            className="text-sm font-medium text-black transition-opacity hover:opacity-60"
          >
            Contact
          </Link>
        </div>
      )
    }

    if (isAboutPage) {
      return (
        <div className="hidden space-x-8 lg:flex">
          <Link 
            href="/" 
            className="text-sm font-medium text-black transition-opacity hover:opacity-60"
          >
            Projects
          </Link>
          <Link 
            href="/contact"
            className="text-sm font-medium text-black transition-opacity hover:opacity-60"
          >
            Contact
          </Link>
        </div>
      )
    }

    if (isContactPage) {
      return (
        <div className="hidden space-x-8 lg:flex">
          <Link 
            href="/" 
            className="text-sm font-medium text-black transition-opacity hover:opacity-60"
          >
            Projects
          </Link>
          <Link 
            href="/about" 
            className="text-sm font-medium text-black transition-opacity hover:opacity-60"
          >
            About
          </Link>
        </div>
      )
    }

    return null
  }

  return (
    <>
      {/* Logo */}
      <div className="fixed top-4 left-4 z-20 md:top-8 md:left-8 lg:top-12 lg:left-12">
        <Link href="/" className="name-hover group block">
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
            {isIndexPage && (
              <p className="text-primary-600 mt-2 text-xs font-medium md:mt-4 md:text-lg lg:mt-6 lg:text-xl">
                {SITE_CONFIG.title}
              </p>
            )}
          </div>
        </Link>
      </div>

      {/* Navegación superior derecha */}
      <div className="fixed top-4 right-4 z-50 md:top-8 md:right-8 lg:top-12 lg:right-12">
        {/* Desktop: navegación contextual */}
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
          className="fixed inset-0 z-40 lg:hidden"
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
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-gray-400">01</span>
                  <Link
                    href="/"
                    className="text-lg font-medium text-black transition-opacity hover:opacity-60"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-gray-400">02</span>
                  <Link
                    href="/about"
                    className="text-lg font-medium text-black transition-opacity hover:opacity-60"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-gray-400">03</span>
                  <Link
                    href="/contact"
                    className="text-lg font-medium text-black transition-opacity hover:opacity-60"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-gray-400">04</span>
                  <a
                    href={SITE_CONFIG.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-black transition-opacity hover:opacity-60"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    GitHub
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-gray-400">05</span>
                  <a
                    href={SITE_CONFIG.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-black transition-opacity hover:opacity-60"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}