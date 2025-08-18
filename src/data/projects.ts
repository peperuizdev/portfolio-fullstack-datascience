import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'predictor-academico',
    slug: 'predictor-academico',
    title: 'PREDICTOR ACADÉMICO',
    description:
      'Sistema de clasificación multiclase para predecir el éxito académico de estudiantes universitarios usando XGBoost y Random Forest.',
    longDescription:
      'Aplicación web completa que implementa un sistema de machine learning para predecir el rendimiento académico. Clasifica estudiantes en tres categorías: Dropout (Abandono), Graduate (Graduado) y Enrolled (Matriculado). Utiliza un pipeline de preprocesamiento robusto y modelos optimizados para análisis predictivo basado en factores académicos y socioeconómicos.',
    problem:
      'Las universidades enfrentan altas tasas de abandono estudiantil que afectan tanto a las instituciones educativas como a los estudiantes. Sin herramientas predictivas tempranas, es difícil identificar a los estudiantes en riesgo y proporcionar el apoyo necesario antes de que abandonen sus estudios. Esta situación genera pérdidas económicas para las instituciones y frustraciones personales para los estudiantes.',
    solution:
      'Desarrollo de un sistema predictivo basado en machine learning que analiza múltiples factores académicos y socioeconómicos para identificar patrones de riesgo. El sistema utiliza algoritmos XGBoost y Random Forest con una precisión del 85%, permitiendo intervenciones tempranas y personalizadas. La interfaz web facilita el acceso a las predicciones en tiempo real.',
    impact:
      'Permite a las instituciones educativas implementar estrategias de retención proactivas, reducir las tasas de abandono y mejorar el éxito académico estudiantil mediante intervenciones tempranas y dirigidas.',
    image: '/images/projects/predictor-academico/hero.png',
    images: {
      desktop: '/images/projects/predictor-academico/desktop.png',
      tablet: '/images/projects/predictor-academico/tablet.png',
      mobile: [
        '/images/projects/predictor-academico/mobile-1.png',
        '/images/projects/predictor-academico/mobile-2.png',
        '/images/projects/predictor-academico/mobile-3.png',
      ],
    },
    technologies: [
      'React',
      'Tailwind CSS',
      'FastAPI',
      'XGBoost',
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'Supabase',
      'Docker',
      'Vite',
    ],
    liveUrl: 'https://student-predictor-oelj.onrender.com/',
    githubUrl: 'https://github.com/Jorgeluuu/Multiclass_Clasification',
    category: 'ai',
    featured: true,
    completedAt: '2025-03',
    highlights: [
      'Precisión del modelo XGBoost: ~85%',
      'API RESTful con FastAPI',
      'Interfaz responsiva con Tailwind CSS',
      'Pipeline de preprocesamiento automático',
      'Modelos optimizados con Optuna',
      'Diseño inspirado en portales de la Comunidad de Madrid para mayor realismo',
    ],
    keyFeatures: [
      'Predicción multiclase del éxito académico',
      'Interfaz web interactiva y responsiva',
      'API REST para predicciones en tiempo real',
      'Preprocesamiento automático de datos',
      'Sistema de base de datos con Supabase',
    ],
  },
  {
    id: 'orange-digital-center',
    slug: 'orange-digital-center-manager',
    title: 'ODC MANAGER',
    description:
      'Aplicación para gestionar y centralizar inscripciones a cursos de Orange Digital Center con panel administrativo completo.',
    longDescription:
      'Sistema integral de gestión educativa diseñado específicamente para Orange Digital Center. Incluye un panel administrativo robusto con estadísticas en tiempo real, generación de reportes en CSV y PDF, y una arquitectura de base de datos relacional escalable. La aplicación sigue el libro de estilo de Orange y ofrece una experiencia de usuario optimizada.',
    problem:
      'Orange Digital Center enfrentaba ineficiencias en la gestión manual de inscripciones a cursos, requiriendo que los administradores se redirigiesen constantemente a plataformas externas. Esto generaba duplicación de trabajo, falta de centralización de datos, dificultades para generar reportes y una experiencia fragmentada tanto para administradores como para estudiantes.',
    solution:
      'Desarrollo de una aplicación web centralizada que integra todo el proceso de gestión educativa en una sola plataforma. Incluye panel administrativo con estadísticas en tiempo real, sistema de autenticación seguro, generación automática de reportes y una interfaz intuitiva que sigue los estándares de diseño de Orange.',
    impact:
      'Reducción significativa del tiempo de gestión administrativa, centralización completa de datos, mejora en la toma de decisiones mediante estadísticas en tiempo real y una experiencia de usuario más fluida para todo el ecosistema educativo de ODC.',
    image: '/images/projects/orange-digital-center/hero.png',
    images: {
      desktop: '/images/projects/orange-digital-center/desktop.png',
      tablet: '/images/projects/orange-digital-center/tablet.png',
      mobile: [
        '/images/projects/orange-digital-center/mobile-1.png',
        '/images/projects/orange-digital-center/mobile-2.png',
        '/images/projects/orange-digital-center/mobile-3.png',
      ],
    },
    technologies: [
      'React',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'MySQL',
      'Sequelize',
      'JWT',
      'Bcrypt',
      'Jest',
      'Vite',
    ],
    githubUrl: 'https://github.com/DarthVada36/odc_management_project',
    category: 'fullstack',
    featured: true,
    completedAt: '2024-12',
    highlights: [
      'Panel administrativo con estadísticas en tiempo real',
      'Autenticación segura con JWT y Bcrypt',
      'Diseño basado en el libro de estilo de Orange',
      'Exportación de datos en CSV y PDF',
      'Base de datos relacional escalable',
      'Arquitectura modular preparada para futuras expansiones',
    ],
    keyFeatures: [
      'Gestión completa de inscripciones y cursos',
      'Panel administrativo con métricas avanzadas',
      'Sistema de autenticación y autorización',
      'Interfaz responsive siguiendo guidelines de Orange',
      'Generación de reportes descargables',
    ],
  },
  {
    id: 'critical-lens',
    slug: 'the-critical-lens',
    title: 'THE CRITICAL LENS',
    description:
      'Plataforma web para combatir la desinformación mediante análisis automatizado de credibilidad y verificación de hechos.',
    longDescription:
      'Aplicación desarrollada con Django que implementa herramientas basadas en pensamiento crítico para evaluar la credibilidad de noticias y contenidos. Incluye un analizador automático que evalúa múltiples aspectos del contenido, sistema de scraping para extraer verificaciones de hechos, y estadísticas sobre desinformación. Los criterios de análisis se basan en los estándares de la Fundación para el Pensamiento Crítico.',
    problem:
      'En la era digital actual, donde la información fluye sin control, discernir la verdad se ha vuelto más difícil que nunca. La desinformación se propaga rápidamente a través de redes sociales y medios digitales, y los ciudadanos carecen de herramientas accesibles para evaluar la credibilidad de los contenidos que consumen diariamente.',
    solution:
      'Desarrollo de una plataforma que automatiza el análisis de credibilidad mediante algoritmos basados en principios del pensamiento crítico. El sistema evalúa títulos, autores, contenido y fuentes, proporcionando retroalimentación detallada. Incluye scraping automatizado de portales de fact-checking y una base de datos de verificaciones para análisis estadístico.',
    impact:
      'Empodera a los usuarios con herramientas prácticas para evaluar información, contribuye a la lucha contra la desinformación y proporciona insights valiosos sobre patrones de desinformación mediante análisis de datos de verificaciones.',
    image: '/images/projects/critical-lens/hero.png',
    images: {
      desktop: '/images/projects/critical-lens/desktop.png',
      tablet: '/images/projects/critical-lens/tablet.png',
      mobile: [
        '/images/projects/critical-lens/mobile-1.png',
        '/images/projects/critical-lens/mobile-2.png',
        '/images/projects/critical-lens/mobile-3.png',
      ],
    },
    technologies: [
      'Django 5',
      'Tailwind CSS',
      'PostgreSQL',
      'Selenium',
      'BeautifulSoup',
      'Pytest',
      'Docker',
      'Chrome WebDriver',
    ],
    githubUrl: 'https://github.com/Bootcamp-IA-P4/the-critical-lens',
    category: 'fullstack',
    featured: true,
    completedAt: '2025-02',
    highlights: [
      'Analizador de credibilidad basado en pensamiento crítico',
      'Sistema de scraping automatizado con Selenium',
      'Base de datos de verificaciones de hechos',
      'Arquitectura modular y escalable con Django',
      'Criterios basados en estándares académicos de pensamiento crítico',
      'Análisis multi-criterio de títulos, autores, contenido y fuentes',
    ],
    keyFeatures: [
      'Análisis automático de credibilidad de contenidos',
      'Extracción de datos de portales de fact-checking',
      'Estadísticas y visualizaciones de desinformación',
      'Sistema de evaluación multi-criterio',
      'Base de datos de fuentes verificadas',
    ],
  },
]
