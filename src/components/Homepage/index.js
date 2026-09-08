import React from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

import AboutSection from './AboutSection'
import TechStack from './TechStack'
import ProjectsSection from './ProjectsSection'
import RecentArticlesSection from './RecentArticlesSection'
import ContactSection from './ContactSection'

const projects = [
  {
    title: 'Filament Starter Kit',
    desc: 'Starter kit untuk mempercepat pembuatan aplikasi modern berbasis Laravel dan Filament PHP.',
    tech: ['Laravel', 'Filament v3', 'Livewire', 'Tailwind CSS'],
    image: '/img/images-dark.webp',
    featured: true,
    category: 'Web & Laravel',
    links: {
      live: 'https://github.com/lyrihkaesa/filament-starter-kit',
      repo: 'https://github.com/lyrihkaesa/filament-starter-kit',
      docs: '/filament-starter-kit'
    }
  },
  {
    title: 'Flutter Starter Kit',
    desc: 'Starter kit modular dengan arsitektur bersih untuk mempercepat pembuatan aplikasi Flutter siap produksi.',
    tech: ['Flutter', 'Dart', 'Clean Architecture'],
    image: '/img/images-dark.webp',
    featured: true,
    category: 'Mobile & Flutter',
    links: {
      live: 'https://github.com/lyrihkaesa/flutter_starter_kit',
      repo: 'https://github.com/lyrihkaesa/flutter_starter_kit'
    }
  },
  {
    title: 'Kaesa Laravel Extension Pack',
    desc: 'Paket ekstensi VS Code pilihan untuk mengoptimalkan efisiensi pengembangan Laravel & Blade.',
    tech: ['Laravel', 'PHP', 'VS Code', 'Extension Pack'],
    image: '/img/projects/laravel-extension-pack-vscode.png',
    featured: true,
    category: 'Tools & DevOps',
    links: {
      live: 'https://marketplace.visualstudio.com/items?itemName=lyrihkaesa.kaesa-laravel-extension-pack',
      repo: 'https://github.com/lyrihkaesa/vscode-laravel-extension-pack'
    }
  },
  {
    title: 'Mikrotik Hotspot Template',
    desc: 'Template landing page hotspot MikroTik responsif dan modern dengan Tailwind CSS & Alpine.js.',
    tech: ['MikroTik', 'Tailwind CSS', 'Alpine.js', 'Networking'],
    image: '/img/projects/mikrotik-hotspot-template.png',
    featured: true,
    category: 'Web & Laravel',
    links: {
      live: 'https://github.com/lyrihkaesa/mikrotik-hotspot-template',
      repo: 'https://github.com/lyrihkaesa/mikrotik-hotspot-template'
    }
  },
  {
    title: '(Flast) Installer Flutter Starter Kit',
    desc: 'CLI installer otomatis untuk inisiasi template Flutter Starter Kit dengan cepat.',
    tech: ['Flutter', 'Dart', 'CLI Tool'],
    image: '/img/images-dark.webp',
    category: 'Tools & DevOps',
    links: {
      live: 'https://github.com/lyrihkaesa/flast',
      repo: 'https://github.com/lyrihkaesa/flast'
    }
  },
  {
    title: 'Mason Brick Flutter Starter Kit',
    desc: 'Generator template Mason Brick untuk scaffolding modul dan widget Flutter terstandar.',
    tech: ['Flutter', 'Dart', 'Mason'],
    image: '/img/images-dark.webp',
    category: 'Tools & DevOps',
    links: {
      live: 'https://github.com/lyrihkaesa/bricks_flutter_starter_kit',
      repo: 'https://github.com/lyrihkaesa/bricks_flutter_starter_kit'
    }
  },
  {
    title: 'Barberia',
    desc: 'Aplikasi reservasi jadwal layanan barber modern berbasis web & mobile.',
    tech: ['Flutter', 'Next.js', 'Firebase'],
    image: '/img/projects/barberia.png',
    category: 'Mobile & Flutter',
    links: {
      live: 'https://barberia-web.vercel.app/',
      repo: 'https://github.com/C22-024'
    }
  }
]

export default function Home({ homePageBlogMetadata, recentPosts }) {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout
      title={`${siteConfig.title} - Fullstack Developer & Network Engineer`}
      description='Catatan teknis, dokumentasi, dan portofolio pengembangan web & mobile Kaesa Lyrih.'
    >
      <main className='relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12'>
        <AboutSection />
        <TechStack />
        <ProjectsSection projects={projects} />
        <RecentArticlesSection
          recentPosts={recentPosts}
          homePageBlogMetadata={homePageBlogMetadata}
        />
        <ContactSection />
      </main>
    </Layout>
  )
}
