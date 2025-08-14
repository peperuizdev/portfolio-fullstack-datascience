import { notFound } from 'next/navigation'
import { ExternalLink, Github } from 'lucide-react'
import { projects } from '@/data/projects'
import { SITE_CONFIG } from '@/lib/constants'
import Navbar from '@/components/Navbar'

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
    <div className="relative min-h-screen bg-white text-black">
      {/* Navbar unificado */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative mt-40 h-[50vh] w-full md:mt-44 md:h-[55vh] lg:mt-48 lg:h-[60vh]">
        <div className="h-full w-full">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute top-0 right-1/4 z-10 -translate-y-1/2 transform">
          <h1 className="project-title-outline text-right text-3xl leading-[0.8] font-black md:text-5xl lg:text-6xl xl:text-7xl">
            {project.title.split(' ').map((word, index) => (
              <span key={index} className="block">
                {word}
              </span>
            ))}
          </h1>
        </div>
      </section>

      {/* Información principal */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-8 md:px-12">
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Descripción detallada */}
            <div className="space-y-12 lg:col-span-2">
              <div>
                <h2 className="mb-6 text-3xl font-black uppercase md:text-4xl">
                  Sobre el proyecto
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-gray-700 md:text-xl">
                  {project.longDescription || project.description}
                </p>
              </div>

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

              {/* Características principales */}
              {project.keyFeatures && (
                <div>
                  <h3 className="mb-4 text-xl font-bold tracking-wide uppercase">
                    Características principales
                  </h3>
                  <ul className="space-y-3">
                    {project.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mt-3 mr-4 h-2 w-2 flex-shrink-0 rounded-full bg-black"></span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Puntos destacados */}
              {project.highlights && (
                <div>
                  <h3 className="mb-4 text-xl font-bold tracking-wide uppercase">
                    Puntos destacados
                  </h3>
                  <ul className="space-y-3">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mt-3 mr-4 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></span>
                        <span className="text-sm text-gray-600">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Enlaces del proyecto */}
              <div className="flex flex-wrap gap-6 pt-8">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Ver proyecto en vivo
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-black px-6 py-3 font-medium text-black transition-colors hover:bg-black hover:text-white"
                  >
                    <Github className="h-4 w-4" />
                    Ver en GitHub
                  </a>
                )}
              </div>
            </div>

            {/* Información lateral */}
            <div className="space-y-8">
              <div>
                <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Categoría
                </h3>
                <p className="text-lg font-medium">
                  {getCategoryLabel(project.category)}
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
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
                <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
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
            </div>
          </div>
        </div>
      </section>

      {/* Galería de imágenes */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-8 md:px-12">
          <h2 className="mb-12 text-center text-3xl font-black uppercase md:text-4xl">
            Capturas del proyecto
          </h2>

          {/* Vista Desktop - Imagen grande */}
          <div className="mb-16">
            <h3 className="mb-6 text-center text-lg font-bold text-gray-600">
              Vista Desktop
            </h3>
            <div className="rounded-2xl bg-white p-8 shadow-xl md:p-12">
              <img
                src={project.images.desktop}
                alt={`${project.title} - Vista desktop`}
                className="w-full rounded-lg object-contain"
              />
            </div>
          </div>

          {/* Vista Tablet y Mobile - Grid */}
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Tablet */}
            <div>
              <h3 className="mb-6 text-center text-lg font-bold text-gray-600">
                Vista Tablet
              </h3>
              <div className="flex justify-center rounded-2xl bg-white p-8 shadow-lg">
                <img
                  src={project.images.tablet}
                  alt={`${project.title} - Vista tablet`}
                  className="w-full max-w-sm object-contain"
                />
              </div>
            </div>

            {/* Mobile */}
            <div>
              <h3 className="mb-6 text-center text-lg font-bold text-gray-600">
                Vista Móvil
              </h3>
              <div className="rounded-2xl bg-white p-8 shadow-lg">
                <div className="grid grid-cols-3 gap-4">
                  {project.images.mobile.map((mobileImage, index) => (
                    <div key={index} className="flex justify-center">
                      <img
                        src={mobileImage}
                        alt={`${project.title} - Vista móvil ${index + 1}`}
                        className="w-full max-w-32 object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Siguiente proyecto */}
      <section className="bg-white py-20 md:py-24">
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