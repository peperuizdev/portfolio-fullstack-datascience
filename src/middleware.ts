import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['es', 'en']
const defaultLocale = 'es'

// Función para obtener el idioma preferido del navegador
function getLocale(request: NextRequest): string {
  // 1. Revisar si hay un idioma guardado en cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // 2. Detectar desde Accept-Language del navegador
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    // Buscar idiomas que coincidan con los que soportamos
    for (const locale of locales) {
      if (acceptLanguage.includes(locale)) {
        return locale
      }
    }
  }

  // 3. Fallback al idioma por defecto
  return defaultLocale
}

// Función para verificar si el path ya tiene un idioma
function hasLocale(pathname: string): boolean {
  return locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Si ya tiene idioma, dejar pasar
  if (hasLocale(pathname)) {
    return NextResponse.next()
  }

  // Si es la raíz (/), redirigir al idioma detectado
  if (pathname === '/') {
    const locale = getLocale(request)
    const url = new URL(`/${locale}`, request.url)
    return NextResponse.redirect(url)
  }

  // Para otras rutas sin idioma, agregar el idioma detectado
  const locale = getLocale(request)
  const url = new URL(`/${locale}${pathname}`, request.url)
  return NextResponse.redirect(url)
}

export const config = {
  // Aplicar middleware a todas las rutas excepto archivos estáticos
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico|images|.*\\..*|android-chrome|apple-touch|browserconfig|manifest|mstile|safari).*)',
  ],
}