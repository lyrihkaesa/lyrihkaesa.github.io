import React from 'react'
import {
  FiArrowDown,
  FiBookOpen,
  FiGlobe,
  FiSmartphone,
  FiServer,
  FiArrowRight,
  FiCode
} from 'react-icons/fi'

export default function AboutSection() {
  return (
    <section className='relative mb-24 pt-4 text-center md:pt-10'>
      {/* Ambient background glow */}
      <div className='pointer-events-none absolute -top-10 left-1/2 -z-10 h-72 w-full max-w-4xl -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/15 to-violet-500/10 blur-3xl' />

      <div className='mx-auto max-w-4xl'>
        {/* Profile Avatar with Gradient Halo */}
        <div className='mb-6 flex justify-center'>
          <div className='group relative'>
            <div className='absolute -inset-1.5 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-violet-600 opacity-80 blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:blur-md' />
            <img
              src='/img/ksa-logo-gradient-blue.png'
              alt='Kaesa Lyrih'
              className='relative h-32 w-32 rounded-full border-2 border-white bg-white object-cover shadow-xl transition-transform duration-300 group-hover:scale-105 sm:h-36 sm:w-36 dark:border-slate-900 dark:bg-slate-900'
            />
          </div>
        </div>

        {/* Display Typography */}
        <h1 className='mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white'>
          Kaesa{' '}
          <span className='bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-violet-400'>
            Lyrih
          </span>
        </h1>

        <p className='mx-auto mb-8 max-w-2xl text-lg text-slate-600 sm:text-xl dark:text-slate-300'>
          Memberikan informasi yang manusiawi 💜. Fokus membangun aplikasi web dan mobile yang
          bersih, terstruktur, serta infrastruktur jaringan yang tangguh.
        </p>

        {/* Call to Actions */}
        <div className='mb-16 flex flex-wrap items-center justify-center gap-3'>
          <a
            href='#projects'
            className='inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:text-white hover:no-underline active:translate-y-0 dark:bg-indigo-500 dark:hover:bg-indigo-600'
          >
            <span>Jelajahi Projek</span>
            <FiArrowDown className='h-4 w-4' />
          </a>

          <a
            href='/learning'
            className='inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-6 py-3 text-sm font-semibold text-slate-700 shadow-xs backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:no-underline active:translate-y-0 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white'
          >
            <FiBookOpen className='h-4 w-4 text-indigo-500' />
            <span>Catatan &amp; Belajar</span>
          </a>

          <a
            href='#contact'
            className='inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600 hover:no-underline dark:text-slate-400 dark:hover:text-indigo-400'
          >
            <span>Hubungi Saya</span>
            <FiArrowRight className='h-4 w-4' />
          </a>
        </div>

        {/* Core Capabilities Bento Grid */}
        <div className='grid grid-cols-1 gap-5 text-left md:grid-cols-3'>
          {/* Web Engineering (Laravel Red Accent) */}
          <a
            href='/laravel'
            className='group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 p-6 shadow-xs backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-red-400/50 hover:shadow-xl hover:shadow-red-500/10 hover:no-underline dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-red-500/40'
          >
            <div className='absolute -right-8 -top-8 h-24 w-24 rounded-full bg-red-500/10 blur-xl transition-all duration-300 group-hover:scale-150' />
            <div>
              <div className='mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400'>
                <FiGlobe className='h-5 w-5' />
              </div>
              <h3 className='mb-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-red-600 dark:text-white dark:group-hover:text-red-400'>
                Fullstack Web
              </h3>
              <p className='text-sm leading-relaxed text-slate-600 dark:text-slate-400'>
                Membangun dashboard, SaaS, dan API modern dengan Laravel, Filament v3, Livewire,
                Tailwind CSS, dan AlpineJS.
              </p>
            </div>
            <div className='mt-6 flex items-center text-xs font-semibold text-red-600 dark:text-red-400'>
              <span>Jelajahi Laravel &amp; Filament</span>
              <FiArrowRight className='ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1' />
            </div>
          </a>

          {/* Mobile Apps */}
          <a
            href='/flutter'
            className='group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 p-6 shadow-xs backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/50 hover:shadow-xl hover:shadow-indigo-500/10 hover:no-underline dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-indigo-500/40'
          >
            <div className='absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-500/10 blur-xl transition-all duration-300 group-hover:scale-150' />
            <div>
              <div className='mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400'>
                <FiSmartphone className='h-5 w-5' />
              </div>
              <h3 className='mb-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400'>
                Mobile Flutter
              </h3>
              <p className='text-sm leading-relaxed text-slate-600 dark:text-slate-400'>
                Pengembangan aplikasi Android dan iOS multiplatform dengan Flutter &amp; Dart,
                arsitektur rapi, dan integrasi API native.
              </p>
            </div>
            <div className='mt-6 flex items-center text-xs font-semibold text-cyan-600 dark:text-cyan-400'>
              <span>Lihat Catatan Flutter</span>
              <FiArrowRight className='ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1' />
            </div>
          </a>

          {/* DevOps & Networking */}
          <a
            href='/learning'
            className='group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 p-6 shadow-xs backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/50 hover:shadow-xl hover:shadow-indigo-500/10 hover:no-underline dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-indigo-500/40'
          >
            <div className='absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/10 blur-xl transition-all duration-300 group-hover:scale-150' />
            <div>
              <div className='mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400'>
                <FiServer className='h-5 w-5' />
              </div>
              <h3 className='mb-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400'>
                DevOps &amp; Network
              </h3>
              <p className='text-sm leading-relaxed text-slate-600 dark:text-slate-400'>
                Manajemen server Linux Ubuntu, virtualisasi Proxmox, Docker container, serta setup
                routing MikroTik dan infrastruktur jaringan.
              </p>
            </div>
            <div className='mt-6 flex items-center text-xs font-semibold text-violet-600 dark:text-violet-400'>
              <span>Buka Dokumentasi DevOps</span>
              <FiArrowRight className='ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1' />
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
