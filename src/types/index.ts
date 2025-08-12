// Tipo para proyectos del portfolio
export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  category: 'fullstack' | 'ai' | 'frontend' | 'backend'
  featured: boolean
  completedAt: string // YYYY-MM
}

// Tipo para habilidades técnicas
export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'ai' | 'database' | 'tools'
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  icon?: string // Para mostrar iconos personalizados
}

// Tipo para experiencia laboral
export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string // YYYY-MM
  endDate?: string // YYYY-MM o 'present'
  description: string[]
  technologies?: string[]
}

// Tipo para formación
export interface Education {
  id: string
  title: string
  institution: string
  startDate: string
  endDate: string
  description?: string
  type: 'bootcamp' | 'university' | 'certification'
}

// Tipo para enlaces de navegación
export interface NavLink {
  href: string
  label: string
  external?: boolean
}