import { Locale } from './i18n'

// Configuración base que no cambia entre idiomas
const SITE_CONFIG_BASE = {
  name: 'Pepe Ruiz',
  url: 'https://peperuiz.dev', // Cambiar cuando tenga el dominio
  email: 'jorsqn@gmail.com',
  location: 'Madrid, España',
  phone: '606 772 774',
  profileImage: '/images/pepe-ruiz-profile.jpg',

  // Enlaces sociales
  links: {
    github: 'https://github.com/peperuizdev',
    linkedin: 'https://www.linkedin.com/in/peperuiznieto/',
    email: 'mailto:jorsqn@gmail.com',
  },

  // Stack tecnológico principal
  primaryStack: [
    'React',
    'Next.js',
    'TypeScript',
    'Python',
    'Django',
    'FastAPI',
    'Machine Learning',
  ],
}

// Configuración en español
const SITE_CONFIG_ES = {
  ...SITE_CONFIG_BASE,
  title: 'AI & Full Stack Developer',
  description: 'Desarrollador Full Stack especializado en IA y Data Science. Creo soluciones web escalables con React, Next.js, Django y Python, integrando Machine Learning y análisis de datos. Mi experiencia abarca desde interfaces responsivas hasta modelos predictivos con XGBoost y redes neuronales.',
  
  // Enlaces con CV en español
  links: {
    ...SITE_CONFIG_BASE.links,
    cv: '/cv/cv-pepe-ruiz-spanish.pdf',
  },
  
  // Keywords para SEO
  keywords: [
    'Full Stack Developer Madrid',
    'Desarrollador IA',
    'Data Scientist',
    'Desarrollador React',
    'Desarrollador Python',
    'Machine Learning Engineer',
    'XGBoost',
    'Redes Neuronales',
    'LLMs',
    'Django',
    'FastAPI',
    'Next.js',
    'TypeScript',
  ],

  // Hero section
  hero: {
    greeting: 'Hola, soy Pepe 👋',
    headline: 'AI & Full Stack Developer',
    subheadline: 'Transformo ideas en soluciones digitales inteligentes',
    cta: 'Ver mis proyectos',
  },

  // Meta descriptions por página
  meta: {
    home: 'Portfolio de Pepe Ruiz, desarrollador Full Stack especializado en IA y Data Science. Proyectos con React, Next.js, Django, Python y Machine Learning.',
    about: 'Conoce más sobre Pepe Ruiz, AI & Full Stack Developer especializado en crear soluciones web escalables con inteligencia artificial.',
    contact: 'Contacta con Pepe Ruiz para colaborar en tu próximo proyecto. Desarrollador Full Stack especializado en soluciones web con IA.',
    projects: 'Proyectos de Pepe Ruiz combinando desarrollo web con inteligencia artificial. React, Django, Python, Machine Learning y más.',
  },
}

// Configuración en inglés
const SITE_CONFIG_EN = {
  ...SITE_CONFIG_BASE,
  location: 'Madrid, Spain', // En inglés
  title: 'AI & Full Stack Developer',
  description: 'Full Stack Developer specialized in AI and Data Science. I create scalable web solutions with React, Next.js, Django, and Python, integrating Machine Learning and data analysis. My experience spans from responsive interfaces to predictive models with XGBoost and neural networks.',
  
  // Enlaces con CV en inglés
  links: {
    ...SITE_CONFIG_BASE.links,
    cv: '/cv/cv-pepe-ruiz-english.pdf',
  },
  
  // Keywords para SEO
  keywords: [
    'Full Stack Developer Madrid',
    'AI Developer',
    'Data Scientist',
    'React Developer',
    'Python Developer',
    'Machine Learning Engineer',
    'XGBoost',
    'Neural Networks',
    'LLMs',
    'Django',
    'FastAPI',
    'Next.js',
    'TypeScript',
  ],

  // Hero section
  hero: {
    greeting: 'Hi, I\'m Pepe 👋',
    headline: 'AI & Full Stack Developer',
    subheadline: 'I transform ideas into intelligent digital solutions',
    cta: 'View my projects',
  },

  // Meta descriptions por página
  meta: {
    home: 'Portfolio of Pepe Ruiz, Full Stack developer specialized in AI and Data Science. Projects with React, Next.js, Django, Python, and Machine Learning.',
    about: 'Learn more about Pepe Ruiz, AI & Full Stack Developer specialized in creating scalable web solutions with artificial intelligence.',
    contact: 'Contact Pepe Ruiz to collaborate on your next project. Full Stack developer specialized in web solutions with AI.',
    projects: 'Projects by Pepe Ruiz combining web development with artificial intelligence. React, Django, Python, Machine Learning, and more.',
  },
}

// Función para obtener configuración según idioma
export const getSiteConfig = (locale: Locale) => {
  return locale === 'es' ? SITE_CONFIG_ES : SITE_CONFIG_EN
}

// Exportar configuración por defecto en español (para compatibilidad)
export const SITE_CONFIG = SITE_CONFIG_ES

// Helper para obtener categorías de proyectos traducidas
export const getCategories = (locale: Locale) => {
  return locale === 'es' ? {
    ai: 'Inteligencia Artificial',
    fullstack: 'Full Stack',
    frontend: 'Frontend',
    backend: 'Backend',
  } : {
    ai: 'Artificial Intelligence',
    fullstack: 'Full Stack',
    frontend: 'Frontend',
    backend: 'Backend',
  }
}

// Helper para obtener meses traducidos
export const getMonths = (locale: Locale) => {
  return locale === 'es' ? {
    '01': 'ENE', '02': 'FEB', '03': 'MAR', '04': 'ABR',
    '05': 'MAY', '06': 'JUN', '07': 'JUL', '08': 'AGO',
    '09': 'SEP', '10': 'OCT', '11': 'NOV', '12': 'DIC',
  } : {
    '01': 'JAN', '02': 'FEB', '03': 'MAR', '04': 'APR',
    '05': 'MAY', '06': 'JUN', '07': 'JUL', '08': 'AUG',
    '09': 'SEP', '10': 'OCT', '11': 'NOV', '12': 'DEC',
  }
}