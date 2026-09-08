import React, { useState, useMemo } from 'react'
import ProjectCard from './ProjectCard'
import { FiSearch, FiX, FiInbox } from 'react-icons/fi'

const PROJECT_CATEGORIES = ['Semua', 'Web & Laravel', 'Mobile & Flutter', 'Tools & DevOps']

export default function ProjectsSection({ projects }) {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === 'Semua' || project.category === activeCategory

      if (!matchesCategory) return false

      if (!q) return true

      const titleMatch = project.title?.toLowerCase().includes(q)
      const descMatch = project.desc?.toLowerCase().includes(q)
      const techMatch = project.tech?.some((t) => t.toLowerCase().includes(q))

      return titleMatch || descMatch || techMatch
    })
  }, [projects, activeCategory, searchQuery])

  const handleClearFilters = () => {
    setActiveCategory('Semua')
    setSearchQuery('')
  }

  return (
    <section id='projects' className='mb-24 scroll-mt-20'>
      <div className='mb-8 text-center'>
        <h2 className='text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white'>
          Portofolio &amp; Projek Terpilih
        </h2>
        <p className='mx-auto mt-2 max-w-xl text-sm text-slate-600 sm:text-base dark:text-slate-400'>
          Koleksi template starter kit, paket ekstensi, aplikasi klien, dan utilitas open-source.
        </p>

        {/* Search Bar & Category Controls */}
        <div className='mt-6 flex flex-col items-center justify-center gap-4'>
          {/* Search Input */}
          <div className='relative w-full max-w-md'>
            <FiSearch className='pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Cari projek (misal: Flutter, Laravel, Extension)...'
              className='w-full rounded-xl border border-slate-200/80 bg-white/90 py-2.5 pl-10 pr-10 text-xs shadow-xs transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:outline-hidden dark:border-slate-800 dark:bg-slate-900/90 dark:text-white dark:placeholder:text-slate-500'
            />
            {searchQuery && (
              <button
                type='button'
                onClick={() => setSearchQuery('')}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                title='Hapus pencarian'
              >
                <FiX className='h-4 w-4' />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className='flex flex-wrap justify-center gap-2'>
            {PROJECT_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat
              return (
                <button
                  key={cat}
                  type='button'
                  onClick={() => setActiveCategory(cat)}
                  className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 dark:bg-indigo-500'
                      : 'border border-slate-200 bg-white/80 text-slate-600 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Projects Grid or Empty State */}
      {filteredProjects.length > 0 ? (
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.title || idx} project={project} />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 py-16 text-center dark:border-slate-800'>
          <div className='mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800'>
            <FiInbox className='h-6 w-6 text-slate-400' />
          </div>
          <h3 className='text-sm font-bold text-slate-900 dark:text-white'>
            Tidak ada projek yang cocok
          </h3>
          <p className='mt-1 max-w-sm text-xs text-slate-500 dark:text-slate-400'>
            {searchQuery
              ? `Tidak ditemukan hasil untuk "${searchQuery}". Coba kata kunci lain atau reset filter.`
              : 'Belum ada projek pada kategori ini.'}
          </p>
          <button
            type='button'
            onClick={handleClearFilters}
            className='mt-4 inline-flex cursor-pointer items-center rounded-lg bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-600 transition-colors hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-400 dark:hover:bg-indigo-900/60'
          >
            Reset Filter &amp; Pencarian
          </button>
        </div>
      )}
    </section>
  )
}
