import { SITE_CONFIG } from '@/lib/constants'
import Link from 'next/link'
import ContactForm from './ContactForm'

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="pt-40 pb-20 md:pt-44 md:pb-24 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-6xl px-8 md:px-12">
          {/* Título principal */}
          <div className="mb-16 text-right md:mb-20">
            <h1 className="name-text text-4xl font-black uppercase leading-[0.8] md:text-6xl lg:text-8xl">
              CONTACTO
            </h1>
          </div>

          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Información de contacto */}
            <div className="space-y-12">
              <div>
                <h2 className="mb-6 text-2xl font-black uppercase md:text-3xl">
                  Hablemos
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-gray-700 md:text-xl">
                  ¿Tienes un proyecto en mente? ¿Quieres colaborar? Me encantaría conocer 
                  más detalles sobre tu idea y cómo puedo ayudarte a hacerla realidad.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
                  Puedes contactarme directamente por email o a través de mis redes sociales. 
                  También puedes usar el formulario y te responderé lo antes posible.
                </p>
              </div>

              {/* Enlaces de contacto */}
              <div className="space-y-8">
                <div>
                  <h3 className="mb-4 text-xl font-bold tracking-wide uppercase">
                    Email
                  </h3>
                  <a
                    href={SITE_CONFIG.links.email}
                    className="text-lg font-medium text-black transition-opacity hover:opacity-60 md:text-xl"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-bold tracking-wide uppercase">
                    Redes sociales
                  </h3>
                  <div className="space-y-3">
                    <a
                      href={SITE_CONFIG.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-lg font-medium text-black transition-opacity hover:opacity-60 md:text-xl"
                    >
                      GitHub →
                    </a>
                    <a
                      href={SITE_CONFIG.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-lg font-medium text-black transition-opacity hover:opacity-60 md:text-xl"
                    >
                      LinkedIn →
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-bold tracking-wide uppercase">
                    Ubicación
                  </h3>
                  <p className="text-lg font-medium text-gray-700 md:text-xl">
                    {SITE_CONFIG.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Formulario de contacto */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-8 text-center md:px-12">
          <h2 className="mb-8 text-3xl font-black uppercase md:text-4xl">
            ¿Quieres ver mi trabajo?
          </h2>
          <p className="mb-8 text-lg text-gray-700 md:text-xl">
            Explora mis proyectos y descubre cómo combino desarrollo web con inteligencia artificial.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-block bg-black px-8 py-3 font-medium text-white transition-colors hover:bg-gray-800"
            >
              Ver proyectos
            </Link>
            <Link
              href="/about"
              className="inline-block border-2 border-black px-8 py-3 font-medium text-black transition-colors hover:bg-black hover:text-white"
            >
              Sobre mí
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: `Contacto - ${SITE_CONFIG.name}`,
    description: `Contacta con ${SITE_CONFIG.name} para colaborar en tu próximo proyecto. ${SITE_CONFIG.title} especializado en soluciones web con IA.`,
  }
}