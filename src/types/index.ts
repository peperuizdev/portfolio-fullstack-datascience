// Tipo para proyectos del portfolio
export interface Project {
  id: string
  slug: string
  title: string
  description: string
  longDescription?: string
  problem?: string
  solution?: string
  impact?: string
  image: string
  images: {
    desktop: string
    tablet: string
    mobile: string[]
  }
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  category: 'fullstack' | 'ai' | 'frontend' | 'backend'
  featured: boolean
  completedAt: string
  highlights?: string[]
  keyFeatures?: string[]
}

// Tipo para habilidades técnicas
export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'ai' | 'database' | 'tools'
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  icon?: string
}

// Tipo para experiencia laboral
export interface Experience {
  id: string
  slug: string
  title: string
  company: string
  location: string
  startDate: string
  endDate?: string
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
