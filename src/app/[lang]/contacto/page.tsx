import { getSiteConfig } from '@/lib/constants'
import Link from 'next/link'
import ContactForm from './ContactForm'
import { Locale } from '@/lib/i18n'

interface ContactPageProps {
  params: Promise<{
    lang: Locale
  }>
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params
  const siteConfig = getSiteConfig(lang)

  return (
    <div
      className="relative min-h-screen text-black"
      style={{ backgroundColor: '#f5f5f5' }}
    >
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-6xl px-8 md:px-12">
          {/* Título principal - justificado a la izquierda en todos los dispositivos */}
          <div className="mb-16 text-left md:mb-20">
            <h1 className="name-text text-5xl leading-[0.8] font-black uppercase md:text-6xl lg:text-8xl">
              CONTACTO
            </h1>
          </div>

          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Información de contacto */}
            <div className="space-y-12">
              <div className="text-left">
                <h2 className="mb-6 text-2xl font-black uppercase md:text-3xl">
                  Hablemos
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-gray-700 md:text-xl">
                  ¿Tienes un proyecto en mente? ¿Quieres colaborar? Me
                  encantaría conocer más detalles sobre tu idea y cómo puedo
                  ayudarte a hacerla realidad.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
                  Puedes contactarme directamente por email, teléfono o usar el
                  formulario y te responderé lo antes posible.
                </p>
              </div>

              {/* Información de contacto */}
              <div className="space-y-8 text-left">
                <div>
                  <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    Email
                  </h3>
                  <a
                    href={siteConfig.links.email}
                    className="text-lg font-medium text-black transition-opacity hover:opacity-60"
                  >
                    {siteConfig.email}
                  </a>
                </div>

                <div>
                  <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    Teléfono
                  </h3>
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                    className="text-lg font-medium text-black transition-opacity hover:opacity-60"
                  >
                    {siteConfig.phone}
                  </a>
                </div>

                <div>
                  <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    Ubicación
                  </h3>
                  <p className="text-lg font-medium">{siteConfig.location}</p>
                </div>
              </div>
            </div>

            {/* Formulario de contacto */}
            <ContactForm lang={lang} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-8 text-center md:px-12">
          <h2 className="mb-8 text-3xl font-black uppercase md:text-4xl">
            ¿Quieres ver mi trabajo?
          </h2>
          <p className="mb-8 text-lg text-gray-700 md:text-xl">
            Explora mis proyectos y descubre cómo combino desarrollo web con
            inteligencia artificial.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href={`/${lang}`}
              className="inline-block bg-black px-8 py-3 font-medium text-white transition-all hover:scale-105 hover:bg-gray-800"
            >
              Ver proyectos
            </Link>
            <Link
              href={`/${lang}/sobre-mi`}
              className="inline-block border-2 border-black px-8 py-3 font-medium text-black transition-all hover:scale-105 hover:bg-black hover:text-white"
            >
              Sobre mí
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata({ params }: ContactPageProps) {
  const { lang } = await params
  const siteConfig = getSiteConfig(lang)
  
  return {
    title: `${lang === 'es' ? 'Contacto' : 'Contact'} - ${siteConfig.name}`,
    description: lang === 'es'
      ? `Contacta con ${siteConfig.name} para colaborar en tu próximo proyecto. ${siteConfig.title} especializado en soluciones web con IA.`
      : `Contact ${siteConfig.name} to collaborate on your next project. ${siteConfig.title} specialized in web solutions with AI.`,
  }
}