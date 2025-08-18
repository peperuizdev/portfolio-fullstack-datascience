// Configuración central de internacionalización

export const locales = ['es', 'en'] as const
export const defaultLocale = 'es' as const

export type Locale = (typeof locales)[number]

// Mapeo de rutas localizadas
export const pathMapping = {
  es: {
    'sobre-mi': 'about',
    'contacto': 'contact',
    'proyectos': 'projects',
  },
  en: {
    'about': 'sobre-mi', 
    'contact': 'contacto',
    'projects': 'proyectos',
  }
} as const

// Función para obtener la ruta equivalente en otro idioma
export function getLocalizedPath(path: string, fromLocale: Locale, toLocale: Locale): string {
  // Remover el prefijo de idioma si existe
  const cleanPath = path.replace(`/${fromLocale}`, '') || '/'
  
  // Si es la homepage
  if (cleanPath === '/') {
    return `/${toLocale}`
  }

  // Remover la barra inicial para buscar en el mapping
  const pathWithoutSlash = cleanPath.substring(1)
  
  // Buscar si hay un mapeo específico
  const mapping = pathMapping[fromLocale as keyof typeof pathMapping]
  if (mapping && pathWithoutSlash in mapping) {
    const mappedPath = mapping[pathWithoutSlash as keyof typeof mapping]
    return `/${toLocale}/${mappedPath}`
  }

  // Si no hay mapeo específico (como para projects/[slug]), mantener la misma estructura
  return `/${toLocale}${cleanPath}`
}

// Función para verificar si un idioma es válido
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}