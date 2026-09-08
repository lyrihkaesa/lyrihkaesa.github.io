import React from 'react'
import {
  FiExternalLink,
  FiGithub,
  FiStar,
  FiBook,
  FiTerminal,
  FiSmartphone,
  FiLayout,
  FiBox
} from 'react-icons/fi'
import { SiFilament, SiFlutter, SiDart, SiLaravel } from 'react-icons/si'

function FilamentMockup() {
  return (
    <div className='relative flex h-full w-full bg-[#111827] text-white p-3 font-sans select-none overflow-hidden'>
      {/* Background ambient glow */}
      <div className='absolute -right-6 -bottom-6 h-28 w-28 rounded-full bg-amber-500/20 blur-xl' />

      {/* Mini Sidebar */}
      <div className='w-20 border-r border-slate-800 pr-2 flex flex-col gap-1.5'>
        <div className='flex items-center gap-1 mb-2'>
          <SiFilament className='h-3.5 w-3.5 text-amber-500' />
          <span className='font-bold text-[9px] text-amber-400 tracking-tight'>Filament</span>
        </div>
        <div className='h-3 w-full rounded bg-amber-500/20 text-amber-300 text-[7px] flex items-center px-1 font-semibold'>
          Dashboard
        </div>
        <div className='h-3 w-full rounded bg-slate-800/60 text-slate-400 text-[7px] flex items-center px-1'>
          Users
        </div>
        <div className='h-3 w-full rounded bg-slate-800/60 text-slate-400 text-[7px] flex items-center px-1'>
          Resources
        </div>
      </div>

      {/* Mini Dashboard Content */}
      <div className='flex-1 pl-3 flex flex-col justify-between'>
        <div className='flex items-center justify-between'>
          <span className='font-semibold text-[10px] text-slate-200'>Admin Overview</span>
          <span className='font-mono text-[7px] rounded bg-emerald-950 text-emerald-400 px-1 py-0.5 border border-emerald-800/60'>
            v3.x Ready
          </span>
        </div>

        {/* 2 Mini KPI Widgets */}
        <div className='grid grid-cols-2 gap-2 my-1.5'>
          <div className='rounded-md border border-slate-800 bg-slate-900/90 p-1.5'>
            <div className='text-[7px] text-slate-400'>Total Records</div>
            <div className='text-xs font-bold text-white mt-0.5'>12,480</div>
            <div className='text-[7px] text-emerald-400 mt-0.5'>+18.2% bulan ini</div>
          </div>
          <div className='rounded-md border border-slate-800 bg-slate-900/90 p-1.5'>
            <div className='text-[7px] text-slate-400'>Livewire Forms</div>
            <div className='text-xs font-bold text-amber-400 mt-0.5'>24 Active</div>
            <div className='text-[7px] text-amber-300/80 mt-0.5'>Reactive Tables</div>
          </div>
        </div>

        {/* Mini Table Rows */}
        <div className='rounded border border-slate-800/80 bg-slate-900/60 p-1 flex flex-col gap-1'>
          <div className='flex items-center justify-between text-[7px] text-slate-400 pb-0.5 border-b border-slate-800'>
            <span>Name</span>
            <span>Role</span>
            <span>Status</span>
          </div>
          <div className='flex items-center justify-between text-[7px] text-slate-300'>
            <span className='font-medium'>Super Admin</span>
            <span className='text-slate-400'>Management</span>
            <span className='text-emerald-400 text-[6px] bg-emerald-950/80 px-1 rounded'>Active</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function FlutterMockup() {
  return (
    <div className='relative flex h-full w-full bg-[#0B132B] text-white p-3 font-sans select-none overflow-hidden justify-center items-center'>
      {/* Background ambient glow */}
      <div className='absolute -left-6 -top-6 h-28 w-28 rounded-full bg-sky-500/20 blur-xl' />
      <div className='absolute -right-6 -bottom-6 h-28 w-28 rounded-full bg-blue-600/20 blur-xl' />

      {/* Smartphone silhouette */}
      <div className='w-44 h-full rounded-t-xl border-2 border-slate-700 bg-slate-950 p-2 flex flex-col justify-between shadow-2xl relative'>
        {/* Notch / Speaker */}
        <div className='mx-auto h-1 w-8 rounded-full bg-slate-800 mb-1' />

        {/* App Bar */}
        <div className='flex items-center justify-between pb-1 border-b border-slate-800/80'>
          <div className='flex items-center gap-1'>
            <SiFlutter className='h-3 w-3 text-sky-400' />
            <span className='font-bold text-[8px] text-white'>Flutter Kit</span>
          </div>
          <span className='text-[6px] text-sky-400 font-mono bg-sky-950/80 px-1 rounded border border-sky-800/50'>
            Clean Arch
          </span>
        </div>

        {/* Cards inside screen */}
        <div className='flex flex-col gap-1.5 my-1'>
          <div className='rounded-lg bg-gradient-to-r from-sky-600/30 to-blue-600/30 border border-sky-500/30 p-1.5'>
            <div className='text-[7px] font-bold text-sky-200'>BLoC State Architecture</div>
            <div className='text-[6px] text-slate-300 mt-0.5 line-clamp-1'>
              Modular repositories, entities &amp; usecases
            </div>
          </div>
          <div className='grid grid-cols-2 gap-1'>
            <div className='rounded bg-slate-900 border border-slate-800 p-1 text-[6px] text-slate-300'>
              <div className='font-bold text-sky-400'>Dio HTTP</div>
              <div className='text-[5px] text-slate-400'>Auto interceptor</div>
            </div>
            <div className='rounded bg-slate-900 border border-slate-800 p-1 text-[6px] text-slate-300'>
              <div className='font-bold text-blue-400'>GoRouter</div>
              <div className='text-[5px] text-slate-400'>Deep linking</div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <div className='pt-1 border-t border-slate-800/80 flex justify-around text-[7px] text-slate-500'>
          <span className='text-sky-400 font-bold'>Home</span>
          <span>Explore</span>
          <span>Profile</span>
        </div>
      </div>
    </div>
  )
}

function CliTerminalMockup({ title, command, outputLines }) {
  return (
    <div className='relative flex h-full w-full flex-col justify-between bg-[#0F172A] p-3.5 font-mono text-white select-none overflow-hidden'>
      {/* Background ambient glow */}
      <div className='absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-emerald-500/15 blur-xl' />

      {/* Terminal Bar */}
      <div className='flex items-center justify-between border-b border-slate-800 pb-1.5 text-[9px] text-slate-400'>
        <div className='flex items-center gap-1.5'>
          <FiTerminal className='h-3 w-3 text-emerald-400' />
          <span className='font-semibold text-slate-300'>{title}</span>
        </div>
        <span className='text-[8px] text-slate-500 font-mono'>bash</span>
      </div>

      {/* Terminal Body */}
      <div className='my-auto flex flex-col gap-1 text-[9px] leading-tight'>
        <div className='flex items-center gap-1 text-emerald-400 font-bold'>
          <span className='text-slate-500'>$</span>
          <span>{command}</span>
        </div>
        {outputLines.map((line, idx) => (
          <div key={idx} className='text-[8px] text-slate-300 flex items-center gap-1.5'>
            <span className='text-emerald-400 font-bold'>✔</span>
            <span>{line}</span>
          </div>
        ))}
        <div className='text-[7px] text-slate-500 mt-0.5'>
          ✨ Ready to build in 3.4s
        </div>
      </div>
    </div>
  )
}

function ProjectVisualBanner({ project }) {
  const titleLower = project.title?.toLowerCase() || ''
  const hasRealImage = project.image && !project.image.includes('images-dark.webp')

  // 1. Real screenshot image (Uncropped presentation with ambient backdrop)
  if (hasRealImage) {
    return (
      <div className='relative flex h-full w-full items-center justify-center overflow-hidden bg-slate-950 p-2.5'>
        {/* Ambient blurred backdrop to softly fill borders */}
        <img
          src={project.image}
          alt=''
          aria-hidden='true'
          className='absolute inset-0 h-full w-full object-cover opacity-30 blur-md scale-110'
        />
        {/* Sharp uncropped screenshot */}
        <img
          src={project.image}
          alt={project.title}
          className='relative max-h-full max-w-full rounded-md object-contain shadow-lg transition-transform duration-300 group-hover:scale-[1.03]'
          loading='lazy'
        />
      </div>
    )
  }

  // 2. Filament Starter Kit
  if (titleLower.includes('filament')) {
    return <FilamentMockup />
  }

  // 3. Flutter Starter Kit
  if (titleLower.includes('flutter starter kit')) {
    return <FlutterMockup />
  }

  // 4. Flast Installer
  if (titleLower.includes('flast')) {
    return (
      <CliTerminalMockup
        title='flast-cli'
        command='npx flast create my_flutter_app'
        outputLines={[
          'Resolving Flutter Starter Kit...',
          'Configuring BLoC & Clean Architecture...',
          'Scaffolding core modules & themes...'
        ]}
      />
    )
  }

  // 5. Mason Brick
  if (titleLower.includes('mason') || titleLower.includes('brick')) {
    return (
      <CliTerminalMockup
        title='mason-cli'
        command='mason make feature_brick --name auth'
        outputLines={[
          'Generating /lib/features/auth...',
          'Writing bloc, data, domain layers...',
          'Scaffolded 12 Dart files successfully'
        ]}
      />
    )
  }

  // 6. Generic Fallback
  return (
    <div className='relative flex h-full w-full flex-col justify-between bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4 text-white'>
      <div className='flex items-center justify-between'>
        <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-white/10'>
          <FiBox className='h-4 w-4 text-indigo-400' />
        </div>
        <span className='font-mono text-[9px] text-slate-300 bg-white/10 px-2 py-0.5 rounded'>
          {project.category || 'Projek'}
        </span>
      </div>
      <div>
        <div className='font-mono text-[9px] text-slate-400'>Open Source</div>
        <div className='font-bold text-xs text-white line-clamp-1'>{project.title}</div>
      </div>
    </div>
  )
}

export default function ProjectCard({ project }) {
  return (
    <div className='group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/50 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-indigo-500/40'>
      {/* Mockup Window Header */}
      <div className='flex items-center justify-between border-b border-slate-200/70 bg-slate-100/90 px-3.5 py-2 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80'>
        <div className='flex items-center gap-1.5'>
          <span className='h-2 w-2 rounded-full bg-rose-400/90'></span>
          <span className='h-2 w-2 rounded-full bg-amber-400/90'></span>
          <span className='h-2 w-2 rounded-full bg-emerald-400/90'></span>
        </div>
        <span className='font-mono text-[10px] text-slate-400 dark:text-slate-500'>
          {project.category || 'project'}
        </span>
      </div>

      {/* Visual Canvas / Mockup Banner */}
      <div className='relative h-48 sm:h-52 w-full overflow-hidden border-b border-slate-100 bg-slate-950 dark:border-slate-800'>
        <ProjectVisualBanner project={project} />

        {/* Featured Tag Badge */}
        {project.featured && (
          <div className='absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-500/95 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-md backdrop-blur'>
            <FiStar className='h-3 w-3 fill-current' />
            <span>Unggulan</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className='flex flex-1 flex-col p-5'>
        <div className='mb-2'>
          <h3 className='text-base font-bold tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400'>
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
