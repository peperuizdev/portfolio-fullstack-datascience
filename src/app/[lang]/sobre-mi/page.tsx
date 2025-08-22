'use client'

import { use } from 'react'
import { getSiteConfig } from '@/lib/constants'
import Link from 'next/link'
import { Download } from 'lucide-react'
import { motion } from 'framer-motion'
import { Locale } from '@/lib/i18n'

interface AboutPageProps {
  params: Promise<{
    lang: Locale
  }>
}

export default function AboutPage({ params }: AboutPageProps) {
  const { lang } = use(params)
  const siteConfig = getSiteConfig(lang)

  return (
    <div
      className="relative min-h-screen text-black"
      style={{ backgroundColor: '#f5f5f5' }}
    >
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-6xl px-8 md:px-12">
          {/* Título principal desktop - justificado a la izquierda con animación */}
          <div className="mb-16 hidden text-left md:mb-20 lg:block">
            <motion.h1
              className="name-text text-6xl leading-[0.8] font-black uppercase lg:text-8xl"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 4,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              style={{ transform: 'translateZ(0)' }}
            >
              SOBRE MÍ
            </motion.h1>
          </div>

          {/* Título móvil centrado con animación */}
          <div className="mb-16 text-center lg:hidden">
            <motion.h1
              className="name-text text-5xl leading-[0.8] font-black uppercase md:text-6xl"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 4,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              style={{ transform: 'translateZ(0)' }}
            >
              SOBRE
              <br />
              MÍ
            </motion.h1>
          </div>

          {/* Foto de perfil móvil - debajo del título */}
          <div className="mb-12 flex justify-center lg:hidden">
            <div className="relative">
              <img
                src={siteConfig.profileImage}
                alt={`${siteConfig.name} - Foto de perfil`}
                className="h-40 w-40 rounded-full object-cover shadow-lg md:h-48 md:w-48"
              />
            </div>
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
                  Soy {siteConfig.name}, desarrollador Full Stack especializado en IA y Data Science. Mi camino en la tecnología tiene un origen poco convencional: comencé mi carrera en Comunicación Audiovisual y Branded Content, donde aprendí a construir narrativas convincentes y a abordar los desafíos desde una perspectiva creativa.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
                  Esas habilidades de storytelling y pensamiento creativo son ahora la base de cómo desarrollo soluciones digitales inteligentes. Creo aplicaciones web escalables que combinan Machine Learning con análisis de datos, usando herramientas como React, Django, FastAPI y Python.
                </p>
              </div>

              <div>
                <h2 className="mb-6 text-2xl font-black uppercase md:text-3xl">
                  Mi enfoque
                </h2>
                <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
                  Los años que pasé trabajando directamente con personas me enseñaron la importancia de escuchar, entender las necesidades reales y resolver problemas de manera empática. Estas habilidades complementan mis conocimientos técnicos para crear software que realmente conecta con quien lo usa.
                </p>
                <p className="mt-6 text-lg leading-relaxed text-gray-700 md:text-xl">
                  Me desenvuelvo bien en equipos ágiles y disfruto de los entornos colaborativos, donde puedo combinar mi experiencia técnica con mi comprensión del factor humano en la tecnología.
                </p>
              </div>

              <div>
                <h2 className="mb-6 text-2xl font-black uppercase md:text-3xl">
                  Experiencia
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-gray-700 md:text-xl">
                  He trabajado en proyectos fascinantes, desde sistemas que predicen comportamientos hasta plataformas que facilitan la gestión educativa. Mi experiencia abarca modelos de machine learning, sistemas de clasificación inteligente y análisis de sentimiento.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
                  Lo que más me motiva es fusionar mi formación técnica en IA con mi comprensión de las personas, creando experiencias digitales que resuelven problemas reales de manera intuitiva.
                </p>
              </div>
            </div>

            {/* Información lateral */}
            <div className="space-y-8">
              {/* Foto de perfil desktop - justificada a la izquierda en sidebar */}
              <div className="hidden justify-start lg:flex">
                <div className="relative">
                  <img
                    src={siteConfig.profileImage}
                    alt={`${siteConfig.name} - Foto de perfil`}
                    className="h-40 w-40 rounded-full object-cover shadow-lg lg:h-48 lg:w-48"
                  />
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Ubicación
                </h3>
                <p className="text-lg font-medium">{siteConfig.location}</p>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Especialización
                </h3>
                <p className="text-lg font-medium">Full Stack especializado en IA</p>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Stack principal
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', 'TypeScript', 'JavaScript', 'Python', 'Django', 'FastAPI', 'Node.js', 'Express', 'PyTorch', 'LangChain', 'Scikit-Learn', 'XGBoost', 'spaCy', 'MySQL', 'PostgreSQL', 'Supabase', 'Docker', 'Git', 'Tailwind CSS'].map((tech) => (
                    <span
                      key={tech}
                      className="inline-block bg-gray-200 px-3 py-1 text-sm font-medium text-gray-800"
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
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-lg font-medium text-black transition-opacity hover:opacity-60"
                  >
                    GitHub
                  </a>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-lg font-medium text-black transition-opacity hover:opacity-60"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Botón de descarga CV */}
              <div>
                <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Currículum
                </h3>
                <a
                  href={siteConfig.links.cv}
                  download
                  className="inline-flex items-center gap-2 bg-black px-6 py-3 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-gray-800"
                >
                  <Download className="h-4 w-4" />
                  Descargar CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-8 text-center md:px-12">
          <h2 className="mb-8 text-3xl font-black uppercase md:text-4xl">
            ¿Trabajamos juntos?
          </h2>
          <p className="mb-8 text-lg text-gray-700 md:text-xl">
            Si tienes un proyecto interesante o quieres colaborar, me encantaría
            conocer más detalles.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href={`/${lang}/contacto`}
              className="inline-block bg-black px-8 py-3 font-medium text-white transition-all hover:scale-105 hover:bg-gray-800"
            >
              Contactar
            </Link>
            <Link
              href={`/${lang}`}
              className="inline-block border-2 border-black px-8 py-3 font-medium text-black transition-all hover:scale-105 hover:bg-black hover:text-white"
            >
              Ver proyectos
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}