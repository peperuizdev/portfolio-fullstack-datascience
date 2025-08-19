import { notFound } from 'next/navigation'
import { ExternalLink, Github } from 'lucide-react'
import { getProjects } from '@/data/projects'
import { getSiteConfig, getCategories } from '@/lib/constants'
import { Locale } from '@/lib/i18n'

interface ProjectPageProps {
  params: Promise<{
    slug: string
    lang: Locale
  }>
}

function getProjectBySlug(slug: string, lang: Locale) {
  const projects = getProjects(lang)
  return projects.find((project) => project.slug === slug)
}

function getNextProject(currentSlug: string, lang: Locale) {
  const projects = getProjects(lang)
  const currentIndex = projects.findIndex(
    (project) => project.slug === currentSlug
  )
  const nextIndex = (currentIndex + 1) % projects.length
  return projects[nextIndex]
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug, lang } = await params
  const siteConfig = getSiteConfig(lang)
  const categories = getCategories(lang)
  const project = getProjectBySlug(slug, lang)

  if (!project) {
    notFound()
  }

  const nextProject = getNextProject(slug, lang)

  const getCategoryLabel = (category: string) => {
    return categories[category as keyof typeof categories] || category
  }

  // Textos por idioma
  const texts = {
    es: {
      problem: 'El Problema',
      solution: 'La Solución',
      impact: 'Impacto',
      category: 'Categoría',
      completedAt: 'Fecha de finalización',
      techStack: 'Stack tecnológico',
      highlights: 'Puntos destacados',
      keyFeatures: 'Características principales',
      nextProject: 'Siguiente proyecto',
      desktopView: 'Vista Desktop',
      tabletView: 'Vista Tablet',
      mobileView: 'Vista Móvil',
      viewOnGithub: 'Ver en GitHub',
      viewLive: 'Ver proyecto en vivo',
    },
    en: {
      problem: 'The Problem',
      solution: 'The Solution',
      impact: 'Impact',
      category: 'Category',
      completedAt: 'Completion date',
      techStack: 'Tech Stack',
      highlights: 'Highlights',
      keyFeatures: 'Key Features',
      nextProject: 'Next project',
      desktopView: 'Desktop View',
      tabletView: 'Tablet View',
      mobileView: 'Mobile View',
      viewOnGithub: 'View on GitHub',
      viewLive: 'View live project',
    }
  }

  const t = texts[lang]

  return (
    <div
      className="relative min-h-screen text-black"
      style={{ backgroundColor: '#f5f5f5' }}
    >
      {/* Hero Section */}
      <section className="relative mt-40 h-[60vh] w-full md:mt-48 md:h-[65vh] lg:mt-64 lg:h-[70vh]">
        <div className="h-full w-full">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
          {/* Overlay para contraste */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>

        {/* Título principal */}
        <div className="absolute top-0 right-1/4 z-10 -translate-y-1/2 transform">
          <h1 className="project-title-outline text-right text-5xl leading-[0.8] font-black md:text-6xl lg:text-8xl">
            {project.title.split(' ').map((word, index) => (
              <span key={index} className="block">
                {word}
              </span>
            ))}
          </h1>
        </div>

        {/* Descripción y enlaces */}
        <div className="absolute right-8 bottom-8 left-8 z-10 md:right-12 md:bottom-12 md:left-12">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6">
              <p className="max-w-4xl text-base leading-relaxed font-medium text-white drop-shadow-lg md:text-lg lg:text-xl xl:text-2xl">
                {project.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/90 px-4 py-2 text-sm font-medium text-black backdrop-blur-sm transition-all hover:scale-105 hover:bg-white md:px-6 md:py-3 md:text-base"
                >
                  <Github className="h-4 w-4" />
                  {t.viewOnGithub}
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/90 px-4 py-2 text-sm font-medium text-black backdrop-blur-sm transition-all hover:scale-105 hover:bg-white md:px-6 md:py-3 md:text-base"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t.viewLive}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contexto del proyecto */}
      <section
        className="py-16 md:py-20 lg:py-24"
        style={{ backgroundColor: '#f5f5f5' }}
      >
        <div className="mx-auto max-w-6xl px-8 md:px-12">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Contenido principal */}
            <div className="space-y-10 lg:col-span-2 lg:space-y-12">
              {/* El Problema */}
              {project.problem && (
                <div>
                  <h2 className="mb-4 text-2xl font-black uppercase md:text-3xl lg:mb-6 lg:text-4xl">
                    {t.problem}
                  </h2>
                  <p className="text-base leading-relaxed text-gray-700 md:text-lg lg:text-xl">
                    {project.problem}
                  </p>
                </div>
              )}

              {/* La Solución */}
              {project.solution && (
                <div>
                  <h2 className="mb-4 text-2xl font-black uppercase md:text-3xl lg:mb-6 lg:text-4xl">
                    {t.solution}
                  </h2>
                  <p className="text-base leading-relaxed text-gray-700 md:text-lg lg:text-xl">
                    {project.solution}
                  </p>
                </div>
              )}

              {/* Impacto */}
              {project.impact && (
                <div>
                  <h2 className="mb-4 text-2xl font-black uppercase md:text-3xl lg:mb-6 lg:text-4xl">
                    {t.impact}
                  </h2>
                  <p className="text-base leading-relaxed text-gray-700 md:text-lg lg:text-xl">
                    {project.impact}
                  </p>
                </div>
              )}
            </div>

            {/* Información lateral */}
            <div className="space-y-6 lg:space-y-8">
              <div>
                <h3 className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase lg:mb-3">
                  {t.category}
                </h3>
                <p className="text-base font-medium md:text-lg">
                  {getCategoryLabel(project.category)}
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase lg:mb-3">
                  {t.completedAt}
                </h3>
                <p className="text-base font-medium md:text-lg">
                  {new Date(project.completedAt + '-01').toLocaleDateString(
                    lang === 'es' ? 'es-ES' : 'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                    }
                  )}
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase lg:mb-3">
                  {t.techStack}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800 md:px-3 md:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Puntos destacados en sidebar */}
              {project.highlights && (
                <div>
                  <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase lg:mb-4">
                    {t.highlights}
                  </h3>
                  <ul className="space-y-2 lg:space-y-3">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mt-2 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                        <span className="text-xs text-gray-600 md:text-sm">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Capturas del proyecto  */}
      <section>
        {/* Vista Desktop */}
        <div className="bg-white py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-8 md:px-12">
            <h3 className="mb-8 text-center text-xl font-bold text-gray-900 md:text-2xl lg:mb-12">
              {t.desktopView}
            </h3>
            <div className="mx-auto max-w-6xl">
              <img
                src={project.images.desktop}
                alt={`${project.title} - ${t.desktopView}`}
                className="w-full rounded-lg object-contain"
              />
            </div>
          </div>
        </div>

        {/* Vista Tablet */}
        <div
          className="py-12 md:py-16 lg:py-20"
          style={{ backgroundColor: '#f5f5f5' }}
        >
          <div className="mx-auto max-w-7xl px-8 md:px-12">
            <h3 className="mb-8 text-center text-xl font-bold text-gray-900 md:text-2xl lg:mb-12">
              {t.tabletView}
            </h3>
            <div className="flex justify-center">
              <img
                src={project.images.tablet}
                alt={`${project.title} - ${t.tabletView}`}
                className="w-full max-w-lg rounded-lg object-contain"
              />
            </div>
          </div>
        </div>

        {/* Vista Mobile */}
        <div className="bg-white py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-8 md:px-12">
            <h3 className="mb-8 text-center text-xl font-bold text-gray-900 md:text-2xl lg:mb-12">
              {t.mobileView}
            </h3>
            <div className="flex justify-center">
              <div className="grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8">
                {project.images.mobile.map((mobileImage, index) => (
                  <div key={index} className="flex justify-center">
                    <img
                      src={mobileImage}
                      alt={`${project.title} - ${t.mobileView} ${index + 1}`}
                      className="w-full max-w-40 rounded-lg object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Características principales */}
      <section
        className="py-16 md:py-20 lg:py-24"
        style={{ backgroundColor: '#f5f5f5' }}
      >
        <div className="mx-auto max-w-6xl px-8 md:px-12">
          <div className="mx-auto max-w-4xl">
            {project.keyFeatures && (
              <div>
                <h2 className="mb-8 text-center text-2xl font-black uppercase md:text-3xl lg:mb-12 lg:text-4xl">
                  {t.keyFeatures}
                </h2>
                <ul className="space-y-4 lg:space-y-6">
                  {project.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500 lg:mt-3 lg:mr-4"></span>
                      <span className="text-base leading-relaxed text-gray-700 md:text-lg lg:text-xl">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Siguiente proyecto */}
      <section
        className="py-16 md:py-20 lg:py-24"
        style={{ backgroundColor: '#f5f5f5' }}
      >
        <div className="mx-auto max-w-6xl px-8 text-right md:px-12">
          <p className="mb-4 text-xs font-semibold tracking-wider text-gray-500 uppercase md:text-sm lg:mb-6">
            {t.nextProject}
          </p>
          <a
            href={`/${lang}/projects/${nextProject.slug}`}
            className="next-project-hover block text-3xl leading-[0.8] font-black md:text-5xl lg:text-6xl xl:text-7xl"
          >
            {nextProject.title.split(' ').map((word, index) => (
              <span key={index} className="block">
                {word}
              </span>
            ))}
          </a>
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug, lang } = await params
  const siteConfig = getSiteConfig(lang)
  const project = getProjectBySlug(slug, lang)

  if (!project) {
    return {
      title: lang === 'es' ? 'Proyecto no encontrado' : 'Project not found',
    }
  }

  return {
    title: `${project.title} - ${siteConfig.name}`,
    description: project.description,
  }
}