import Layout from '@theme/Layout'
// import Heading from '@theme/Heading'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

// Import ikon-ikon
// import { FiExternalLink, FiGithub, FiMessageSquare, FiMail, FiTwitter } from 'react-icons/fi'
// import { FaDiscord } from 'react-icons/fa6'
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
  SiDocker
} from 'react-icons/si'
import AboutSection from './AboutSection'
import ContactSection from './ContactSection'
import TechStack from './TechStack'
import ProjectsSection from './ProjectsSection'

const techItems = [
  {
    name: 'Laravel',
    icon: <SiLaravel className='h-8 w-8 text-red-500' />,
    link: '/laravel'
  },
  {
    name: 'Flutter',
    icon: <SiFlutter className='h-8 w-8 text-blue-400' />,
    link: '/flutter'
  },
  {
    name: 'Filament',
    icon: <SiFilament className='h-8 w-8 text-amber-500' />,
    link: '#'
  },
  {
    name: 'Livewire',
    icon: <SiLivewire className='h-8 w-8 text-pink-500' />,
    link: '#'
  },
  {
    name: 'AlpineJS',
    icon: <SiAlpinedotjs className='h-8 w-8 text-blue-500' />,
    link: '#'
  },
  {
    name: 'React',
    icon: <SiReact className='h-8 w-8 text-blue-500' />,
    link: '#'
  },
  {
    name: 'Tailwind CSS',
    icon: <SiTailwindcss className='h-8 w-8 text-cyan-400' />,
    link: '#'
  },
  {
    name: 'PostgreSQL',
    icon: <SiPostgresql className='h-8 w-8 text-blue-600' />,
    link: '#'
  },
  {
    name: 'MySQL',
    icon: <SiMysql className='h-8 w-8 text-blue-600' />,
    link: '#'
  },
  {
    name: 'Docker',
    icon: <SiDocker className='h-8 w-8 text-blue-600' />,
    link: '#'
  }
]

const projects = [
  {
    title: 'Flutter Starter Kit',
    desc: 'Stater Kit Untuk Mempermudah Pembuatan Aplikasi Flutter.',
    tech: ['Flutter', 'Dart'],
    image: '/img/images-dark.webp',
    links: {
      live: 'https://github.com/lyrihkaesa/flutter-starter-kit',
      repo: 'https://github.com/lyrihkaesa/flutter-starter-kit'
    }
  },
  {
    title: '(Flast) Installer Flutter Starter Kit',
    desc: 'Installer untuk Flutter Starter Kit.',
    tech: ['Flutter', 'Dart'],
    image: '/img/images-dark.webp',
    links: {
      live: 'https://github.com/lyrihkaesa/flast',
      repo: 'https://github.com/lyrihkaesa/flast'
    }
  },
  {
    title: 'Mason Brick Flutter Starter Kit',
    desc: 'Mason Brick untuk Flutter Starter Kit.',
    tech: ['Flutter', 'Dart', 'Mason'],
    image: '/img/images-dark.webp',
    links: {
      live: 'https://github.com/lyrihkaesa/bricks_flutter_starter_kit',
      repo: 'https://github.com/lyrihkaesa/bricks_flutter_starter_kit'
    }
  },
  {
    title: 'Kaesa Laravel Extension Pack',
    desc: 'Laravel Ekstension Pack untuk VS Code.',
    tech: ['Laravel', 'PHP', 'Extension Pack', 'VSCode'],
    image: '/img/projects/laravel-extension-pack-vscode.png',
    links: {
      live: 'https://marketplace.visualstudio.com/items?itemName=lyrihkaesa.kaesa-laravel-extension-pack',
      repo: 'https://github.com/lyrihkaesa/vscode-laravel-extension-pack'
    }
  },
  {
    title: 'Mikrotik Hotspot Template',
    desc: 'Template untuk Mikrotik Hotspot dengan Tailwind CSS dan AlpineJS.',
    tech: ['Mikrotik', 'Template', 'Hotspot', 'Tailwind CSS', 'AlpineJS'],
    image: '/img/projects/mikrotik-hotspot-template.png',
    links: {
      live: 'https://github.com/lyrihkaesa/mikrotik-hotspot-template',
      repo: 'https://github.com/lyrihkaesa/mikrotik-hotspot-template'
    }
  },
  {
    title: 'Barberia',
    desc: 'Aplikasi pemesanan barber.',
    tech: ['Flutter', 'NextJS', 'Firebase'],
    image: '/img/projects/barberia.png',
    links: {
      live: 'https://barberia-web.vercel.app/',
      repo: 'https://github.com/C22-024'
    }
  }
  // ... data proyek lainnya
]

export default function Home({ homePageBlogMetadata, recentPosts }) {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout
      title={`${siteConfig.title}`}
      description='Tempat menyimpan catatan dan protofolio untuk Kaesa yang pelupa.'
    >
      <main className='container mx-auto px-4 py-12'>
        <AboutSection />
        <TechStack items={techItems} />
        <ProjectsSection projects={projects} />
        <ContactSection />
      </main>
    </Layout>
  )
}
