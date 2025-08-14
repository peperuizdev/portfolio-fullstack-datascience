import { Skill } from '@/types'

export const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'frontend', level: 'expert' },
  { name: 'Next.js', category: 'frontend', level: 'advanced' },
  { name: 'TypeScript', category: 'frontend', level: 'advanced' },
  { name: 'JavaScript', category: 'frontend', level: 'expert' },
  { name: 'HTML5', category: 'frontend', level: 'expert' },
  { name: 'CSS3', category: 'frontend', level: 'expert' },
  { name: 'Tailwind CSS', category: 'frontend', level: 'expert' },
  { name: 'Sass', category: 'frontend', level: 'advanced' },
  { name: 'Vite', category: 'frontend', level: 'advanced' },
  { name: 'Shadcn/ui', category: 'frontend', level: 'intermediate' },

  // Backend
  { name: 'Python', category: 'backend', level: 'expert' },
  { name: 'Node.js', category: 'backend', level: 'advanced' },
  { name: 'Express', category: 'backend', level: 'advanced' },
  { name: 'Django', category: 'backend', level: 'expert' },
  { name: 'FastAPI', category: 'backend', level: 'advanced' },
  { name: 'Flask', category: 'backend', level: 'intermediate' },
  { name: 'REST API', category: 'backend', level: 'expert' },
  { name: 'JWT', category: 'backend', level: 'advanced' },
  { name: 'Sequelize', category: 'backend', level: 'advanced' },

  // AI & Data Science
  { name: 'Machine Learning', category: 'ai', level: 'advanced' },
  { name: 'Pandas', category: 'ai', level: 'expert' },
  { name: 'NumPy', category: 'ai', level: 'advanced' },
  { name: 'Scikit-Learn', category: 'ai', level: 'advanced' },
  { name: 'XGBoost', category: 'ai', level: 'advanced' },
  { name: 'Jupyter Notebook', category: 'ai', level: 'expert' },
  { name: 'Matplotlib', category: 'ai', level: 'advanced' },
  { name: 'Seaborn', category: 'ai', level: 'advanced' },
  { name: 'BeautifulSoup', category: 'ai', level: 'advanced' },
  { name: 'Selenium', category: 'ai', level: 'advanced' },
  { name: 'EDA', category: 'ai', level: 'advanced' },
  { name: 'Redes Neuronales', category: 'ai', level: 'intermediate' },

  // Databases
  { name: 'MySQL', category: 'database', level: 'advanced' },
  { name: 'PostgreSQL', category: 'database', level: 'advanced' },
  { name: 'MongoDB', category: 'database', level: 'intermediate' },
  { name: 'Supabase', category: 'database', level: 'intermediate' },

  // Tools & DevOps
  { name: 'Git', category: 'tools', level: 'expert' },
  { name: 'GitHub', category: 'tools', level: 'expert' },
  { name: 'Docker', category: 'tools', level: 'intermediate' },
  { name: 'Postman', category: 'tools', level: 'advanced' },
  { name: 'Figma', category: 'tools', level: 'intermediate' },
  { name: 'Vitest', category: 'tools', level: 'advanced' },
  { name: 'Jest', category: 'tools', level: 'advanced' },
  { name: 'Pytest', category: 'tools', level: 'advanced' },
]

// Función helper para obtener skills por categoría
export const getSkillsByCategory = (category: Skill['category']) => {
  return skills.filter((skill) => skill.category === category)
}

// Función helper para obtener skills destacadas
export const getFeaturedSkills = () => {
  return skills.filter(
    (skill) =>
      skill.level === 'expert' ||
      (skill.level === 'advanced' &&
        ['React', 'Python', 'Django', 'Machine Learning'].includes(skill.name))
  )
}
