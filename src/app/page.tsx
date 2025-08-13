import { SITE_CONFIG } from '@/lib/constants'
import { projects } from '@/data/projects'

export default function Home() {
  const formatProjectTitle = (title: string) => {
    const words = title.split(' ')
    
    if (words.length === 1) {
      return [
        <span key="first" className="block">{words[0]}</span>,
        <span key="second" className="block opacity-0">.</span>
      ]
    } else if (words.length === 2) {
      return [
        <span key="first" className="block">{words[0]}</span>,
        <span key="second" className="block">{words[1]}</span>
      ]
    } else {
      const mid = Math.ceil(words.length / 2)
      const firstLine = words.slice(0, mid).join(' ')
      const secondLine = words.slice(mid).join(' ')
      return [
        <span key="first" className="block">{firstLine}</span>,
        <span key="second" className="block">{secondLine}</span>
      ]
    }
  }

  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split('-')
    const months = {
      '01': 'ENE', '02': 'FEB', '03': 'MAR', '04': 'ABR',
      '05': 'MAY', '06': 'JUN', '07': 'JUL', '08': 'AGO',
      '09': 'SEP', '10': 'OCT', '11': 'NOV', '12': 'DIC'
    }
    return `${months[month]} ${year}`
  }

  return (
    <div className="min-h-screen bg-white text-black relative overflow-x-hidden">
      
      {/* Nombre - responsive positioning */}
      <div className="fixed top-4 left-4 md:top-8 md:left-8 lg:top-12 lg:left-12 z-20">
        <a href="/" className="name-hover block">
          <div className="space-y-0">
            <h1 className="name-text text-2xl md:text-4xl lg:text-6xl font-black leading-[0.9] uppercase">
              {SITE_CONFIG.name.split(' ')[0]}
            </h1>
            <h1 className="name-text text-2xl md:text-4xl lg:text-6xl font-black leading-[0.9] uppercase">
              {SITE_CONFIG.name.split(' ')[1]}
            </h1>
            <p className="text-xs md:text-lg lg:text-xl font-medium text-primary-600 mt-2 md:mt-4 lg:mt-6">
              {SITE_CONFIG.title}
            </p>
          </div>
        </a>
      </div>
      
      {/* Contacto - responsive positioning */}
      <div className="fixed bottom-4 left-4 md:bottom-8 md:left-8 lg:bottom-12 lg:left-12 z-20">
        <div className="space-y-2 md:space-y-3">
          <h3 className="text-xs md:text-sm uppercase tracking-wider text-primary-500 font-semibold mb-2 md:mb-4">
            Contacto
          </h3>
          <a 
            href={SITE_CONFIG.links.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block text-sm md:text-base font-medium text-primary-700 hover:text-black transition-colors duration-300"
          >
            GitHub
          </a>
          <a 
            href={SITE_CONFIG.links.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block text-sm md:text-base font-medium text-primary-700 hover:text-black transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a 
            href={SITE_CONFIG.links.email} 
            className="block text-sm md:text-base font-medium text-primary-700 hover:text-black transition-colors duration-300"
          >
            Email
          </a>
        </div>
      </div>
      
      {/* Proyectos - responsive layout */}
      <main className="w-full min-h-screen">
        <div className="ml-auto w-full md:w-4/5 lg:w-3/4 min-h-screen pt-32 md:pt-24 lg:pt-12 pb-32 pr-4 md:pr-8 lg:pr-12">
          <div className="space-y-16 md:space-y-20 lg:space-y-24">
            {projects.map((project) => (
              <div key={project.id} className="space-y-2 md:space-y-4">
                <div className="text-right">
                  <span className="text-xs md:text-sm text-primary-400 font-medium tracking-wider">
                    {formatDate(project.completedAt)}
                  </span>
                </div>
                
                <a 
                  href={`/projects/${project.slug}`} 
                  className="project-hover block text-4xl md:text-6xl lg:text-8xl leading-none text-right text-black"
                >
                  {formatProjectTitle(project.title)}
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}