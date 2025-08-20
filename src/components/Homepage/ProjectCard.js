import { FiExternalLink, FiGithub, FiImage } from 'react-icons/fi'

export default function ProjectCard({ project }) {
  return (
    <div className='group relative w-full overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:scale-[1.02] dark:bg-slate-800'>
      {/* Whole card clickable area */}
      <a
        href={project.links?.live || '#'}
        target='_blank'
        rel='noopener noreferrer'
        className={`block h-full overflow-hidden ${!project.links?.live && 'pointer-events-none'}`}
      >
        {/* Image container with hover effect */}
        <div className='relative h-48 w-full overflow-hidden rounded-t-xl'>
          {project.image ? (
            <div className='h-full w-full transition-transform duration-300 group-hover:scale-105'>
              <img src={project.image} alt={project.title} className='h-full w-full object-cover' />
            </div>
          ) : (
            <div className='flex h-full w-full items-center justify-center rounded-t-xl bg-slate-100 dark:bg-slate-700'>
              <FiImage className='h-12 w-12 text-slate-400 dark:text-slate-500' />
            </div>
          )}
          {/* Hover overlay */}
          <div className='absolute inset-0 flex items-center justify-center rounded-t-xl bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
            <FiExternalLink className='h-8 w-8 text-white' />
          </div>
        </div>

        {/* Card content */}
        <div className='p-4'>
          <h3 className='mb-2 text-xl font-semibold'>{project.title}</h3>

          {project.desc && (
            <p className='line-clamp-2 text-slate-600 dark:text-slate-300'>{project.desc}</p>
          )}

          {project.tech && project.tech.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {project.tech.map((t) => (
                <span
                  key={t}
                  className='rounded-full bg-indigo-100 px-3 py-1 text-xs text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </a>

      {/* GitHub button */}
      {project.links?.repo && (
        <a
          href={project.links.repo}
          target='_blank'
          rel='noopener noreferrer'
          className='absolute right-4 bottom-4 flex items-center gap-1 rounded-lg bg-slate-100 p-2 text-slate-600 transition-all hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
          title='Source Code'
          onClick={(e) => e.stopPropagation()}
        >
          <FiGithub className='h-5 w-5' />
        </a>
      )}
    </div>
  )
}
