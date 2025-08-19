'use client'

import { use } from 'react'
import { motion } from 'framer-motion'
import { getProjects } from '@/data/projects'
import { getMonths } from '@/lib/constants'
import { Locale } from '@/lib/i18n'

interface HomePageProps {
  params: Promise<{
    lang: Locale
  }>
}

export default function Home({ params }: HomePageProps) {
  const { lang } = use(params)
  const projects = getProjects(lang)
  const months = getMonths(lang)

  const formatProjectTitle = (title: string) => {
    const words = title.split(' ')

    if (words.length === 1) {
      return [
        <span key="first" className="block">
          {words[0]}
        </span>,
        <span key="second" className="block opacity-0">
          .
        </span>,
      ]
    } else if (words.length === 2) {
      return [
        <span key="first" className="block">
          {words[0]}
        </span>,
        <span key="second" className="block">
          {words[1]}
        </span>,
      ]
    } else {
      const mid = Math.ceil(words.length / 2)
      const firstLine = words.slice(0, mid).join(' ')
      const secondLine = words.slice(mid).join(' ')
      return [
        <span key="first" className="block">
          {firstLine}
        </span>,
        <span key="second" className="block">
          {secondLine}
        </span>,
      ]
    }
  }

  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split('-')
    return `${months[month as keyof typeof months] || month} ${year}`
  }

  return (
    <div className="bg-background text-foreground relative min-h-screen overflow-x-hidden">
      {/* Proyectos */}
      <main className="min-h-screen w-full">
        <div className="ml-auto min-h-screen w-full pt-32 pr-4 pb-32 md:w-4/5 md:pt-40 md:pr-8 lg:w-3/4 lg:pt-48 lg:pr-12">
          <div className="space-y-16 md:space-y-20 lg:space-y-24">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="space-y-1 md:space-y-2"
                initial={{ opacity: 0, x: -180 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 2,
                    delay: index * 0.3,
                    ease: [0.25, 0.1, 0.25, 1]
                  }
                }}
                style={{ transform: 'translateZ(0)' }}
              >
                <div className="text-right">
                  <span className="text-xs font-medium tracking-wider text-black md:text-sm">
                    {formatDate(project.completedAt)}
                  </span>
                </div>

                <a
                  href={`/${lang}/projects/${project.slug}`}
                  className="project-hover text-project-title block text-right text-4xl leading-none md:text-6xl lg:text-8xl"
                >
                  {formatProjectTitle(project.title)}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}