import React, { useState } from 'react'
import {
  SiLaravel,
  SiFlutter,
  SiReact,
  SiTailwindcss,
  SiMysql,
  SiPostgresql,
  SiLivewire,
  SiAlpinedotjs,
  SiFilament,
  SiDocker,
  SiUbuntu,
  SiDart
} from 'react-icons/si'
import { FiLayers, FiExternalLink } from 'react-icons/fi'

const STACK_DATA = [
  // Backend & Web
  {
    name: 'Laravel',
    category: 'Backend & Web',
    role: 'PHP Web Framework',
    icon: <SiLaravel className='h-7 w-7 text-red-500' />,
    href: '/laravel',
    isInternal: true,
    accent: 'hover:border-red-500/40 hover:shadow-red-500/10'
  },
  {
    name: 'Filament PHP',
    category: 'Backend & Web',
    role: 'Admin Panel & Form Builder',
    icon: <SiFilament className='h-7 w-7 text-amber-500' />,
    href: '/filament-starter-kit',
    isInternal: true,
    accent: 'hover:border-amber-500/40 hover:shadow-amber-500/10'
  },
  {
    name: 'Livewire',
    category: 'Backend & Web',
    role: 'Full-Stack Reactive UI',
    icon: <SiLivewire className='h-7 w-7 text-pink-500' />,
    href: 'https://livewire.laravel.com/',
    isInternal: false,
    accent: 'hover:border-pink-500/40 hover:shadow-pink-500/10'
  },
  {
    name: 'Alpine.js',
    category: 'Backend & Web',
    role: 'Lightweight JavaScript Engine',
    icon: <SiAlpinedotjs className='h-7 w-7 text-cyan-500' />,
    href: 'https://alpinejs.dev/',
    isInternal: false,
    accent: 'hover:border-cyan-500/40 hover:shadow-cyan-500/10'
  },
  {
    name: 'Tailwind CSS',
    category: 'Backend & Web',
    role: 'Utility-First Modern CSS',
    icon: <SiTailwindcss className='h-7 w-7 text-sky-400' />,
    href: 'https://tailwindcss.com/',
    isInternal: false,
    accent: 'hover:border-sky-500/40 hover:shadow-sky-500/10'
  },

  // Mobile & UI
  {
    name: 'Flutter',
    category: 'Mobile & UI',
    role: 'Multiplatform App Framework',
    icon: <SiFlutter className='h-7 w-7 text-sky-400' />,
    href: '/flutter',
    isInternal: true,
    accent: 'hover:border-sky-500/40 hover:shadow-sky-500/10'
  },
  {
    name: 'Dart',
    category: 'Mobile & UI',
    role: 'Client-Optimized Language',
    icon: <SiDart className='h-7 w-7 text-blue-500' />,
    href: 'https://dart.dev/',
    isInternal: false,
    accent: 'hover:border-blue-500/40 hover:shadow-blue-500/10'
  },
  {
    name: 'React',
    category: 'Mobile & UI',
    role: 'Component-Based UI',
    icon: <SiReact className='h-7 w-7 text-blue-400' />,
    href: 'https://react.dev/',
    isInternal: false,
    accent: 'hover:border-blue-400/40 hover:shadow-blue-400/10'
  },

  // DevOps & Data
  {
    name: 'Docker',
    category: 'DevOps & Data',
    role: 'Containerization & Ops',
    icon: <SiDocker className='h-7 w-7 text-blue-500' />,
    href: '/learning',
    isInternal: true,
    accent: 'hover:border-blue-500/40 hover:shadow-blue-500/10'
  },
  {
    name: 'Ubuntu Linux',
    category: 'DevOps & Data',
    role: 'Server Environment',
    icon: <SiUbuntu className='h-7 w-7 text-orange-500' />,
    href: '/learning',
    isInternal: true,
    accent: 'hover:border-orange-500/40 hover:shadow-orange-500/10'
  },
  {
    name: 'PostgreSQL',
    category: 'DevOps & Data',
    role: 'Relational Database',
    icon: <SiPostgresql className='h-7 w-7 text-indigo-400' />,
    href: 'https://www.postgresql.org/',
    isInternal: false,
    accent: 'hover:border-indigo-500/40 hover:shadow-indigo-500/10'
  },
  {
    name: 'MySQL',
    category: 'DevOps & Data',
    role: 'Relational Database',
    icon: <SiMysql className='h-7 w-7 text-amber-600' />,
    href: 'https://www.mysql.com/',
    isInternal: false,
    accent: 'hover:border-amber-600/40 hover:shadow-amber-600/10'
  }
]

const CATEGORIES = ['Semua', 'Backend & Web', 'Mobile & UI', 'DevOps & Data']

export default function TechStack() {
  const [activeTab, setActiveTab] = useState('Semua')

  const filteredItems =
    activeTab === 'Semua' ? STACK_DATA : STACK_DATA.filter((item) => item.category === activeTab)

  return (
    <section className='mb-24 scroll-mt-20'>
      <div className='mb-8 text-center'>
        <h2 className='text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white'>
          Teknologi Pilihan
        </h2>
        <p className='mx-auto mt-2 max-w-xl text-sm text-slate-600 sm:text-base dark:text-slate-400'>
          Kumpulan alat, bahasa, dan ekosistem utama yang biasa saya gunakan untuk memproduksi
          aplikasi siap rilis.
        </p>

        {/* Category Pill Filters */}
        <div className='mt-6 flex flex-wrap justify-center gap-2'>
          {CATEGORIES.map((cat) => {
            const isSelected = activeTab === cat
            return (
              <button
                key={cat}
                type='button'
                onClick={() => setActiveTab(cat)}
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

      {/* Grid of Tech Cards */}
      <div className='grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
        {filteredItems.map((tech) => (
          <a
            key={tech.name}
            href={tech.href}
            target={tech.isInternal ? undefined : '_blank'}
            rel={tech.isInternal ? undefined : 'noopener noreferrer'}
            className={`group relative flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white/80 p-4 text-center shadow-xs backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:no-underline dark:border-slate-800 dark:bg-slate-900/60 ${tech.accent}`}
          >
            <div className='mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 transition-transform duration-200 group-hover:scale-110 dark:bg-slate-800/80'>
              {tech.icon}
            </div>
            <h3 className='text-sm font-bold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400'>
              {tech.name}
            </h3>
            <p className='mt-1 line-clamp-1 text-[11px] text-slate-500 dark:text-slate-400'>
              {tech.role}
            </p>
            {!tech.isInternal && (
              <FiExternalLink className='absolute right-2.5 top-2.5 h-3 w-3 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-slate-500' />
            )}
          </a>
        ))}
      </div>
    </section>
  )
}
