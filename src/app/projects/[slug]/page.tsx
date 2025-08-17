import { notFound } from 'next/navigation'
import { ExternalLink, Github } from 'lucide-react'
import { projects } from '@/data/projects'
import { SITE_CONFIG } from '@/lib/constants'

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}

function getNextProject(currentSlug: string) {
  const currentIndex = projects.findIndex(
    (project) => project.slug === currentSlug
  )
  const nextIndex = (currentIndex + 1) % projects.length
  return projects[nextIndex]
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const nextProject = getNextProject(slug)

  const getCategoryLabel = (category: string) => {
    const categories = {
      ai: 'Inteligencia Artificial',
      fullstack: 'Full Stack',
      frontend: 'Frontend',
      backend: 'Backend',
    }
    return categories[category as keyof typeof categories] || category
  }

  return (
    <div className="relative min-h-screen bg-gray-50 text-black">
      {/* Hero Section */}
      <section className="relative mt-40 h-[60vh] w-full md:mt-44 md:h-[65vh] lg:mt-48 lg:h-[70vh]">
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
          <h1 className="project-title-outline text-right text-3xl leading-[0.8] font-black md:text-5xl lg:text-6xl xl:text-7xl">
            {project.title.split(' ').map((word, index) => (
              <span key={index} className="block">
                {word}
              </span>
            ))}
          </h1>
        </div>

        {/* Descripción y enlace */}
        <div className="absolute bottom-8 left-8 right-8 z-10 md:bottom-12 md:left-12 md:right-12">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <p className="text-lg leading-relaxed text-white md:text-xl lg:text-2xl font-medium drop-shadow-lg max-w-4xl">
                {project.description}
              </p>
            </div>
            <div className="flex justify-start">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 font-medium text-black transition-all hover:bg-white hover:scale-105"
                >
                  <Github className="h-4 w-4" />
                  Ver en GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contexto del proyecto */}
      <section className="bg-white-warm py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-8 md:px-12">
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Contenido principal */}
            <div className="space-y-12 lg:col-span-2">
              {/* El Problema */}
              {project.problem && (
                <div>
                  <h2 className="mb-6 text-3xl font-black uppercase md:text-4xl">
                    El Problema
                  </h2>
                  <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
                    {project.problem}
                  </p>
                </div>
              )}

              {/* La Solución */}
              {project.solution && (
                <div>
                  <h2 className="mb-6 text-3xl font-black uppercase md:text-4xl">
                    La Solución
                  </h2>
                  <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
                    {project.solution}
                  </p>
                </div>
              )}

              {/* Impacto */}
              {project.impact && (
                <div>
                  <h2 className="mb-6 text-3xl font-black uppercase md:text-4xl">
                    Impacto
                  </h2>
                  <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
                    {project.impact}
                  </p>
                </div>
              )}

              {/* Botón de acción */}
              {project.liveUrl && (
                <div className="pt-6">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 px-8 py-4 font-medium text-white-warm transition-colors hover:bg-green-700 text-lg"
                  >
                    <ExternalLink className="h-5 w-5" />
                    Ver proyecto en vivo
                  </a>
                </div>
              )}
            </div>

            {/* Información lateral */}
            <div className="space-y-8">
              <div>
                <h3 className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Categoría
                </h3>
                <p className="text-lg font-medium">
                  {getCategoryLabel(project.category)}
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Fecha de finalización
                </h3>
                <p className="text-lg font-medium">
                  {new Date(project.completedAt + '-01').toLocaleDateString(
                    'es-ES',
                    {
                      year: 'numeric',
                      month: 'long',
                    }
                  )}
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Stack tecnológico
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Puntos destacados en sidebar */}
              {project.highlights && (
                <div>
                  <h3 className="mb-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    Puntos destacados
                  </h3>
                  <ul className="space-y-3">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mt-2 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-600"></span>
                        <span className="text-sm text-gray-600">
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
        <div className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-8 md:px-12">
            <h3 className="mb-12 text-center text-2xl font-bold text-gray-900">
              Vista Desktop
            </h3>
            <div className="mx-auto max-w-6xl">
              <img
                src={project.images.desktop}
                alt={`${project.title} - Vista desktop`}
                className="w-full rounded-lg object-contain"
              />
            </div>
          </div>
        </div>

        {/* Vista Tablet */}
        <div className="bg-white-warm py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-8 md:px-12">
            <h3 className="mb-12 text-center text-2xl font-bold text-gray-900">
              Vista Tablet
            </h3>
            <div className="flex justify-center">
              <img
                src={project.images.tablet}
                alt={`${project.title} - Vista tablet`}
                className="w-full max-w-lg object-contain rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Vista Mobile */}
        <div className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-8 md:px-12">
            <h3 className="mb-12 text-center text-2xl font-bold text-gray-900">
              Vista Móvil
            </h3>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl">
                {project.images.mobile.map((mobileImage, index) => (
                  <div key={index} className="flex justify-center">
                    <img
                      src={mobileImage}
                      alt={`${project.title} - Vista móvil ${index + 1}`}
                      className="w-full max-w-52 object-contain rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Características principales */}
      <section className="bg-white-warm py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-8 md:px-12">
          <div className="max-w-4xl mx-auto">
            {project.keyFeatures && (
              <div>
                <h2 className="mb-12 text-3xl font-black uppercase md:text-4xl text-center">
                  Características principales
                </h2>
                <ul className="space-y-6">
                  {project.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mt-3 mr-4 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></span>
                      <span className="text-lg text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Siguiente proyecto */}
      <section className="bg-warm-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-8 text-right md:px-12">
          <p className="mb-6 text-sm font-semibold tracking-wider text-gray-500 uppercase">
            Siguiente proyecto
          </p>
          <a
            href={`/projects/${nextProject.slug}`}
            className="next-project-hover block text-4xl leading-[0.8] font-black md:text-6xl lg:text-7xl"
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
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Proyecto no encontrado',
    }
  }

  return {
    title: `${project.title} - ${SITE_CONFIG.name}`,
    description: project.description,
  }
}