import { SITE_CONFIG } from '@/lib/constants'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="pt-40 pb-20 md:pt-44 md:pb-24 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-4xl px-8 md:px-12">
          {/* Título principal */}
          <div className="mb-16 text-right md:mb-20">
            <h1 className="name-text text-4xl font-black uppercase leading-[0.8] md:text-6xl lg:text-8xl">
              SOBRE
              <br />
              MÍ
            </h1>
          </div>

          {/* Contenido principal */}
          <div className="grid gap-16 lg:grid-cols-3 lg:gap-20">
            {/* Descripción principal */}
            <div className="space-y-8 lg:col-span-2">
              <div>
                <h2 className="mb-6 text-2xl font-black uppercase md:text-3xl">
                  ¿Quién soy?
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-gray-700 md:text-xl">
                  Soy {SITE_CONFIG.name}, un desarrollador Full Stack apasionado por la inteligencia artificial 
                  y la ciencia de datos. Me especializo en crear soluciones web escalables que integran 
                  tecnologías modernas con algoritmos de machine learning.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
                  Mi experiencia abarca desde el desarrollo de interfaces responsivas con React y Next.js 
                  hasta la implementación de modelos predictivos con Python, XGBoost y redes neuronales. 
                  Disfruto transformando ideas complejas en aplicaciones funcionales y elegantes.
                </p>
              </div>

              <div>
                <h2 className="mb-6 text-2xl font-black uppercase md:text-3xl">
                  Mi enfoque
                </h2>
                <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
                  Creo en el poder de la tecnología para resolver problemas reales. Mi enfoque combina 
                  buenas prácticas de desarrollo con las últimas innovaciones en IA, siempre buscando 
                  el equilibrio perfecto entre funcionalidad, rendimiento y experiencia de usuario.
                </p>
              </div>

              <div>
                <h2 className="mb-6 text-2xl font-black uppercase md:text-3xl">
                  Experiencia
                </h2>
                <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
                  He trabajado en proyectos que van desde aplicaciones de análisis predictivo hasta 
                  plataformas de gestión educativa. Mi stack principal incluye React, Django, FastAPI 
                  y herramientas de machine learning como Scikit-Learn y XGBoost.
                </p>
              </div>
            </div>

            {/* Información lateral */}
            <div className="space-y-8">
              <div>
                <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Ubicación
                </h3>
                <p className="text-lg font-medium">
                  {SITE_CONFIG.location}
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Especialización
                </h3>
                <p className="text-lg font-medium">
                  {SITE_CONFIG.title}
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Stack principal
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SITE_CONFIG.primaryStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Enlaces
                </h3>
                <div className="space-y-3">
                  <a
                    href={SITE_CONFIG.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-lg font-medium text-black transition-opacity hover:opacity-60"
                  >
                    GitHub →
                  </a>
                  <a
                    href={SITE_CONFIG.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-lg font-medium text-black transition-opacity hover:opacity-60"
                  >
                    LinkedIn →
                  </a>
                  <a
                    href={SITE_CONFIG.links.email}
                    className="block text-lg font-medium text-black transition-opacity hover:opacity-60"
                  >
                    Email →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-8 text-center md:px-12">
          <h2 className="mb-8 text-3xl font-black uppercase md:text-4xl">
            ¿Trabajamos juntos?
          </h2>
          <p className="mb-8 text-lg text-gray-700 md:text-xl">
            Si tienes un proyecto interesante o quieres colaborar, me encantaría conocer más detalles.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-block bg-black px-8 py-3 font-medium text-white transition-colors hover:bg-gray-800"
            >
              Contactar
            </Link>
            <Link
              href="/"
              className="inline-block border-2 border-black px-8 py-3 font-medium text-black transition-colors hover:bg-black hover:text-white"
            >
              Ver proyectos
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: `About - ${SITE_CONFIG.name}`,
    description: `Conoce más sobre ${SITE_CONFIG.name}, ${SITE_CONFIG.title} especializado en crear soluciones web escalables con IA.`,
  }
}