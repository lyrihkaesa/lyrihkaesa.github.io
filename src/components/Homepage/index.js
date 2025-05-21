import Layout from '@theme/Layout'
import Heading from '@theme/Heading'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

// Import ikon-ikon
import { FiExternalLink, FiGithub, FiMessageSquare, FiMail, FiTwitter } from 'react-icons/fi'
import { FaDiscord } from 'react-icons/fa6'
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
    link: 'https://laravel.com'
  },
  {
    name: 'Flutter',
    icon: <SiFlutter className='h-8 w-8 text-blue-400' />,
    link: 'https://flutter.dev'
  },
  {
    name: 'Filament',
    icon: <SiFilament className='h-8 w-8 text-amber-500' />,
    link: 'https://filamentphp.com'
  },
  {
    name: 'Livewire',
    icon: <SiLivewire className='h-8 w-8 text-pink-500' />,
    link: 'https://livewire.laravel.com'
  },
  {
    name: 'AlpineJS',
    icon: <SiAlpinedotjs className='h-8 w-8 text-blue-500' />,
    link: 'https://alpinejs.dev'
  },
  {
    name: 'React',
    icon: <SiReact className='h-8 w-8 text-blue-500' />,
    link: 'https://reactjs.org'
  },
  {
    name: 'Tailwind CSS',
    icon: <SiTailwindcss className='h-8 w-8 text-cyan-400' />,
    link: 'https://tailwindcss.com'
  },
  {
    name: 'PostgreSQL',
    icon: <SiPostgresql className='h-8 w-8 text-blue-600' />,
    link: 'https://mysql.com'
  },
  {
    name: 'MySQL',
    icon: <SiMysql className='h-8 w-8 text-blue-600' />,
    link: 'https://mysql.com'
  },
  {
    name: 'Docker',
    icon: <SiDocker className='h-8 w-8 text-blue-600' />,
    link: 'https://www.docker.com'
  }
]

const projects = [
  {
    title: 'Kaesa Laravel Extension Pack',
    desc: 'Laravel Ekstension Pack untuk VS Code.',
    tech: ['Laravel', 'PHP', 'VSCode'],
    image: '/img/projects/laravel-extension-pack-vscode.png',
    links: {
      live: 'https://marketplace.visualstudio.com/items?itemName=lyrihkaesa.kaesa-laravel-extension-pack',
      repo: 'https://github.com/lyrihkaesa/vscode-laravel-extension-pack'
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
