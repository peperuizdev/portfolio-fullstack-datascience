import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { projects } from '@/data/projects'
import { SITE_CONFIG } from '@/lib/constants'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

function getProjectBySlug(slug: string) {
  return projects.find(project => project.slug === slug)
}

function getNextProject(currentSlug: string) {
  const currentIndex = projects.findIndex(project => project.slug === currentSlug)
  const nextIndex = (currentIndex + 1) % projects.length
  return projects[nextIndex]
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug)
  
  if (!project) {
    notFound()
  }

  const nextProject = getNextProject(params.slug)

  return (
    <div className="min-h-screen bg-white text-black relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30">
        <nav className="flex justify-between items-start p-4 md:p-8 lg:p-12">
          <a href="/" className="name-hover block">
            <div className="space-y-0">
              <h1 className="name-text text-xl md:text-3xl lg:text-4xl font-black leading-[0.9] uppercase">
                {SITE_CONFIG.name.split(' ')[0]}
              </h1>
              <h1 className="name-text text-xl md:text-3xl lg:text-4xl font-black leading-[0.9] uppercase">
                {SITE_CONFIG.name.split(' ')[1]}
              </h1>
              <p className="text-xs md:text-sm lg:text-base font-medium text-primary-600 mt-2 lg:mt-3">
                {SITE_CONFIG.title}
              </p>
            </div>
          </a>
          
          <a 
            href="/" 
            className="text-black hover:opacity-60 transition-opacity p-2"
            aria-label="Volver al inicio"
          >
            <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[55vh] lg:h-[60vh] mt-40 md:mt-44 lg:mt-48">
        <div className="w-full h-full">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute top-0 right-1/4 transform -translate-y-1/2 z-10">
          <h1 className="project-title-outline text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.8] text-right">
            {project.title.split(' ').map((word, index) => (
              <span key={index} className="block">
                {word}
              </span>
            ))}
          </h1>
        </div>
      </section>

      {/* Layout */}
      <div className="relative">
        
        {/* Descripción + Info flotante */}
        <section className="relative py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
              
              {/* Descripción principal */}
              <div className="lg:col-span-8">
                <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed font-light text-black">
                  {project.longDescription || project.description}
                </p>
                
                {/* Enlaces integrados en el texto */}
                <div className="flex gap-8 mt-12">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-black hover:opacity-60 transition-opacity"
                    >
                      Ver proyecto ↗
                    </a>
                  )}
                  
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-primary-600 hover:text-black transition-colors"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
              
              {/* Info lateral  */}
              <div className="lg:col-span-4">
                <div className="sticky top-32 space-y-8">
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-primary-400 font-semibold mb-3">
                      Categoría
                    </h3>
                    <p className="text-base font-medium capitalize">
                      {project.category}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-primary-400 font-semibold mb-3">
                      Fecha
                    </h3>
                    <p className="text-base font-medium">
                      {new Date(project.completedAt + '-01').toLocaleDateString('es-ES', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Desktop Image - Full Width */}
        <section className="w-full py-16 md:py-24">
          <img 
            src={project.images.desktop} 
            alt={`${project.title} - Vista desktop`}
            className="w-full object-contain"
          />
        </section>

        {/* Tablet + Mobile  */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
              
              {/* Tablet - lado izquierdo */}
              <div className="lg:col-span-5">
                <img 
                  src={project.images.tablet} 
                  alt={`${project.title} - Vista tablet`}
                  className="w-full object-contain"
                />
              </div>
              
              {/* Mobile stack - lado derecho */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-3 gap-6 md:gap-8">
                  {project.images.mobile.map((mobileImage, index) => (
                    <img 
                      key={index}
                      src={mobileImage} 
                      alt={`${project.title} - Vista móvil ${index + 1}`}
                      className="w-full object-contain"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tecnologías */}
        <section className="py-16 md:py-24 bg-primary-25">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="text-lg uppercase tracking-wider text-primary-500 font-semibold mb-12">
              Stack tecnológico
            </h2>
            
            <div className="flex flex-wrap gap-3 md:gap-4">
              {project.technologies.map((tech) => (
                <span 
                  key={tech}
                  className="px-4 py-2 text-sm font-medium text-black border border-primary-200 rounded-full hover:bg-black hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Siguiente proyecto  */}
        <section className="py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-right">
            <p className="text-sm uppercase tracking-wider text-primary-500 font-semibold mb-6">
              next project
            </p>
            <a 
              href={`/projects/${nextProject.slug}`}
              className="next-project-hover block text-4xl md:text-6xl lg:text-7xl font-black leading-[0.8]"
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
    </div>
  )
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug)
  
  if (!project) {
    return {
      title: 'Proyecto no encontrado'
    }
  }

  return {
    title: `${project.title} - ${SITE_CONFIG.name}`,
    description: project.description,
  }
}