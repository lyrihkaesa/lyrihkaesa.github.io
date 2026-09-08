import React from 'react'
import { FiExternalLink, FiGithub, FiStar, FiBook, FiFolder } from 'react-icons/fi'

function ProjectBannerFallback({ title, tech, category }) {
  const isFlutter = tech?.some((t) => t.toLowerCase().includes('flutter'))
  const isLaravel = tech?.some((t) => t.toLowerCase().includes('laravel'))
  const isCli = tech?.some((t) => t.toLowerCase().includes('cli') || t.toLowerCase().includes('mason'))

  let gradient = 'from-slate-800 via-indigo-950 to-slate-900 text-indigo-400'
  if (isFlutter) {
    gradient = 'from-sky-900/90 via-blue-950 to-slate-900 text-sky-400'
  } else if (isLaravel) {
    gradient = 'from-rose-950/90 via-slate-900 to-slate-950 text-rose-400'
  } else if (isCli) {
    gradient = 'from-emerald-950/80 via-slate-900 to-slate-950 text-emerald-400'
  }

  return (
    <div className={`relative flex h-full w-full flex-col justify-between bg-gradient-to-br p-5 ${gradient}`}>
      <div className='flex items-center justify-between'>
        <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 backdrop-blur'>
          <FiFolder className='h-5 w-5 text-white' />
        </div>
        <span className='rounded-md bg-white/10 px-2 py-0.5 font-mono text-[10px] text-slate-200'>
          {category || 'Projek'}
        </span>
      </div>
      <div>
        <div className='font-mono text-xs text-white/60'>Repository &amp; Tool</div>
        <div className='mt-0.5 line-clamp-1 font-bold tracking-tight text-white sm:text-base'>
          {title}
        </div>
      </div>
    </div>
  )
}

export default function ProjectCard({ project }) {
  const hasRealImage = project.image && !project.image.includes('images-dark.webp')

  return (
    <div className='group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/50 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-indigo-500/40'>
      {/* Banner / Image preview */}
      <div className='relative h-44 w-full overflow-hidden border-b border-slate-100 bg-slate-100 dark:border-slate-800 dark:bg-slate-800'>
        {hasRealImage ? (
          <img
            src={project.image}
            alt={project.title}
            className='h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105'
            loading='lazy'
          />
        ) : (
          <ProjectBannerFallback
            title={project.title}
            tech={project.tech}
            category={project.category}
          />
        )}

        {/* Featured Tag Badge */}
        {project.featured && (
          <div className='absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-md backdrop-blur'>
            <FiStar className='h-3 w-3 fill-current' />
            <span>Unggulan</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className='flex flex-1 flex-col p-5'>
        <div className='mb-2'>
          <h3 className='text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400'>
            {project.title}
          </h3>
          <p className='mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400'>
            {project.desc}
          </p>
        </div>

        {/* Tech Badges */}
        {project.tech && project.tech.length > 0 && (
          <div className='my-3 flex flex-wrap gap-1.5'>
            {project.tech.map((t) => (
              <span
                key={t}
                className='rounded-md border border-slate-200/80 bg-slate-50 px-2 py-0.5 font-mono text-[10px] font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300'
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Bottom Actions Pin */}
        <div className='mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800/80'>
          <div className='flex items-center gap-2'>
            {project.links?.live && (
              <a
                href={project.links.live}
                target={project.links.live.startsWith('http') ? '_blank' : undefined}
                rel={project.links.live.startsWith('http') ? 'noopener noreferrer' : undefined}
                className='inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 transition-colors hover:bg-indigo-100 hover:text-indigo-700 hover:no-underline dark:bg-indigo-950/60 dark:text-indigo-400 dark:hover:bg-indigo-900/60'
              >
                <span>Lihat</span>
                <FiExternalLink className='h-3 w-3' />
              </a>
            )}

            {project.links?.docs && (
              <a
                href={project.links.docs}
                className='inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 hover:no-underline dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                title='Dokumentasi'
              >
                <FiBook className='h-3 w-3' />
                <span>Docs</span>
              </a>
            )}
          </div>

          {project.links?.repo && (
            <a
              href={project.links.repo}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1 rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
              title='Source Code di GitHub'
            >
              <FiGithub className='h-4 w-4' />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
