import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://peperuiz.dev'
  const currentDate = new Date()
  
  // Slugs de todos tus proyectos
  const projectSlugs = [
    'logotracker-pro',
    'magic-post',
    'feelflow-ai',
    'predictor-academico',
    'datashop-analytics',
    'the-critical-lens',
    'orange-digital-center-manager',
  ]
  
  const routes: MetadataRoute.Sitemap = [
    // Página principal español
    {
      url: `${baseUrl}/es`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          es: `${baseUrl}/es`,
          en: `${baseUrl}/en`,
        },
      },
    },
    // Página principal inglés
    {
      url: `${baseUrl}/en`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          es: `${baseUrl}/es`,
          en: `${baseUrl}/en`,
        },
      },
    },
    
    // Sobre mí / About
    {
      url: `${baseUrl}/es/sobre-mi`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/es/sobre-mi`,
          en: `${baseUrl}/en/about`,
        },
      },
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/es/sobre-mi`,
          en: `${baseUrl}/en/about`,
        },
      },
    },
    
    // Contacto / Contact
    {
      url: `${baseUrl}/es/contacto`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          es: `${baseUrl}/es/contacto`,
          en: `${baseUrl}/en/contact`,
        },
      },
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          es: `${baseUrl}/es/contacto`,
          en: `${baseUrl}/en/contact`,
        },
      },
    },
  ]
  
  // Añadir todos los proyectos dinámicamente
  projectSlugs.forEach((slug) => {
    routes.push(
      // Versión español
      {
        url: `${baseUrl}/es/projects/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            es: `${baseUrl}/es/projects/${slug}`,
            en: `${baseUrl}/en/projects/${slug}`,
          },
        },
      },
      // Versión inglés
      {
        url: `${baseUrl}/en/projects/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            es: `${baseUrl}/es/projects/${slug}`,
            en: `${baseUrl}/en/projects/${slug}`,
          },
        },
      }
    )
  })
  
  return routes
}