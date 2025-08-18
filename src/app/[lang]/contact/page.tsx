import { SITE_CONFIG } from '@/lib/constants'
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
              CONTACT
            </h1>
          </div>

          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Información de contacto */}
            <div className="space-y-12">
              <div className="text-left">
                <h2 className="mb-6 text-2xl font-black uppercase md:text-3xl">
                  Let's talk
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-gray-700 md:text-xl">
                  Do you have a project in mind? Want to collaborate? I'd love to
                  learn more details about your idea and how I can help bring it
                  to life.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
                  You can contact me directly by email, phone, or use the form
                  and I'll get back to you as soon as possible.
                </p>
              </div>

              {/* Información de contacto */}
              <div className="space-y-8 text-left">
                <div>
                  <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    Email
                  </h3>
                  <a
                    href={SITE_CONFIG.links.email}
                    className="text-lg font-medium text-black transition-opacity hover:opacity-60"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>

                <div>
                  <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    Phone
                  </h3>
                  <a
                    href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                    className="text-lg font-medium text-black transition-opacity hover:opacity-60"
                  >
                    {SITE_CONFIG.phone}
                  </a>
                </div>

                <div>
                  <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    Location
                  </h3>
                  <p className="text-lg font-medium">{SITE_CONFIG.location}</p>
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
            Want to see my work?
          </h2>
          <p className="mb-8 text-lg text-gray-700 md:text-xl">
            Explore my projects and discover how I combine web development with
            artificial intelligence.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href={`/${lang}`}
              className="inline-block bg-black px-8 py-3 font-medium text-white transition-all hover:scale-105 hover:bg-gray-800"
            >
              View projects
            </Link>
            <Link
              href={`/${lang}/about`}
              className="inline-block border-2 border-black px-8 py-3 font-medium text-black transition-all hover:scale-105 hover:bg-black hover:text-white"
            >
              About me
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata({ params }: ContactPageProps) {
  const { lang } = await params
  
  return {
    title: `Contact - ${SITE_CONFIG.name}`,
    description: `Contact ${SITE_CONFIG.name} to collaborate on your next project. ${SITE_CONFIG.title} specialized in web solutions with AI.`,
  }
}