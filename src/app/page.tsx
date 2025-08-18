import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function RootPage() {
  // Obtener el idioma preferido del navegador
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language') || ''
  
  // Detectar idioma (español por defecto)
  const preferredLanguage = acceptLanguage.includes('en') ? 'en' : 'es'
  
  // Redirigir al idioma detectado
  redirect(`/${preferredLanguage}`)
}