import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const locales = ['es', 'en']
const defaultLocale = 'es'
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key'

// Función para obtener el idioma preferido del navegador
function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    for (const locale of locales) {
      if (acceptLanguage.includes(locale)) {
        return locale
      }
    }
  }

  return defaultLocale
}

// Función para verificar si el path ya tiene un idioma
function hasLocale(pathname: string): boolean {
  return locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Permitir acceso a la página de login sin autenticación
  const isLoginRoute = locales.some(locale => pathname === `/${locale}/admin/login`)
  if (isLoginRoute) {
    return NextResponse.next()
  }

  // Proteger rutas bajo '/[lang]/admin' (excepto login)
  const isAdminRoute = locales.some(locale => pathname.startsWith(`/${locale}/admin`))
  if (isAdminRoute) {
    const token = request.cookies.get('auth-token')?.value

    try {
      // Verificar el token JWT usando jose
      if (token) {
        await jwtVerify(token, new TextEncoder().encode(SECRET_KEY))
        return NextResponse.next() // Permitir el acceso
      } else {
        throw new Error('Token inexistente')
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error de autenticación:', error.message)
      } else {
        console.error('Error de autenticación desconocido')
      }
      // Redirigir al login en caso de error
      const loginUrl = new URL(`/${defaultLocale}/admin/login`, request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (hasLocale(pathname)) {
    return NextResponse.next()
  }

  if (pathname === '/') {
    const locale = getLocale(request)
    const url = new URL(`/${locale}`, request.url)
    return NextResponse.redirect(url)
  }

  const locale = getLocale(request)
  const url = new URL(`/${locale}${pathname}`, request.url)
  return NextResponse.redirect(url)
}

export const config = {
  runtime: 'nodejs', // Forzar el entorno de ejecución a Node.js
  matcher: [
    '/((?!_next|api|favicon.ico|images|.*\\..*|android-chrome|apple-touch|browserconfig|manifest|mstile|safari).*)',
    '/:locale(admin|not-found)/:path*',
  ],
}