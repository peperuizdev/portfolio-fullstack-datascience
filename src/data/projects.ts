import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'predictor-academico',
    title: 'Predictor Académico',
    description: 'Sistema de predicción del rendimiento académico utilizando algoritmos de Machine Learning con XGBoost para clasificación multiclase.',
    longDescription: 'Aplicación web completa que predice el rendimiento académico de estudiantes. Implementa un modelo XGBoost entrenado con datos históricos y ofrece predicciones en tiempo real a través de una API REST desarrollada con FastAPI.',
    image: '/images/projects/predictor-academico.jpg',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'FastAPI', 'XGBoost', 'Pandas', 'NumPy', 'PostgreSQL', 'Supabase', 'Docker', 'Render'],
    liveUrl: 'https://student-predictor-oelj.onrender.com/',
    githubUrl: 'https://github.com/Jorgeluuu/Multiclass_Clasification',
    category: 'ai',
    featured: true,
    completedAt: '2025-03'
  },
  {
    id: 'orange-digital-center',
    title: 'Orange Digital Center Manager',
    description: 'Aplicación web para centralizar y optimizar la gestión de inscripciones con panel administrativo y estadísticas en tiempo real.',
    longDescription: 'Sistema completo de gestión para Orange Digital Center que incluye panel administrativo con estadísticas en tiempo real, generación de informes descargables y gestión de base de datos relacional escalable.',
    image: '/images/projects/orange-manager.jpg',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MySQL', 'Sequelize', 'JWT', 'Jest', 'Supertest'],
    githubUrl: 'https://github.com/DarthVada36/odc_management_project',
    category: 'fullstack',
    featured: true,
    completedAt: '2024-12'
  },
  {
    id: 'critical-lens',
    title: 'The Critical Lens',
    description: 'Aplicación web para combatir la desinformación mediante análisis automatizado de credibilidad de noticias.',
    longDescription: 'Plataforma desarrollada en Django que implementa scraping automatizado para extraer fact-checks utilizando Selenium y BeautifulSoup. Incluye sistema de evaluación de contenidos y arquitectura modular escalable.',
    image: '/images/projects/critical-lens.jpg',
    technologies: ['Django 5', 'Tailwind CSS', 'PostgreSQL', 'Pytest', 'Selenium', 'BeautifulSoup', 'Docker'],
    githubUrl: 'https://github.com/Bootcamp-IA-P4/the-critical-lens',
    category: 'fullstack',
    featured: true,
    completedAt: '2024-02'
  }
]