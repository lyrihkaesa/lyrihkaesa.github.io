import Layout from '@theme/Layout'
import Heading from '@theme/Heading'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { Button } from '../ui/button'

export default function Home({ homePageBlogMetadata, recentPosts }) {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout
      title={`${siteConfig.title}`}
      description='Tempat menyimpan catatan dan protofolio untuk Kaesa yang pelupa.'
    >
      <main className='container mx-auto px-4 py-12'>
        {/* Section Tentang Saya */}
        <section className='mb-20 text-center'>
          <div className='mx-auto max-w-4xl'>
            <div className='mb-8 flex justify-center'>
              <img
                src='/img/ksa-logo-gradient-blue.png'
                alt='Profil Kaesa'
                className='h-48 w-48 rounded-full object-cover shadow-lg'
              />
            </div>
            <p className='mb-6 text-lg text-slate-600 dark:text-slate-300'>
              Full-stack Developer dengan 3+ tahun pengalaman membangun aplikasi web dan mobile.
              Spesialisasi di Laravel untuk backend dan Flutter untuk pengembangan mobile
              cross-platform.
            </p>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
              <div className='rounded-lg bg-slate-100 p-4 dark:bg-slate-800'>
                <h3 className='mb-2 text-xl font-semibold'>💼 Pengalaman</h3>
                <p>3+ Tahun</p>
              </div>
              <div className='rounded-lg bg-slate-100 p-4 dark:bg-slate-800'>
                <h3 className='mb-2 text-xl font-semibold'>📱 Mobile Apps</h3>
                <p>10+ Projek Flutter</p>
              </div>
              <div className='rounded-lg bg-slate-100 p-4 dark:bg-slate-800'>
                <h3 className='mb-2 text-xl font-semibold'>🌐 Web Apps</h3>
                <p>20+ Projek Laravel</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Keahlian Teknis */}
        <section className='mb-20'>
          <Heading
            as='h2'
            className='mb-8 text-center text-3xl font-bold text-slate-800 dark:text-slate-100'
          >
            🛠 Teknologi Favorit
          </Heading>
          <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
            {[
              { name: 'Laravel', icon: '🚀' },
              { name: 'Flutter', icon: '📱' },
              { name: 'React', icon: '⚛️' },
              { name: 'Tailwind CSS', icon: '🎨' },
              { name: 'MySQL', icon: '🗄️' },
              { name: 'Firebase', icon: '🔥' },
              { name: 'Docker', icon: '🐳' },
              { name: 'Git', icon: '🔀' }
            ].map((tech) => (
              <div
                key={tech.name}
                className='flex items-center rounded-lg bg-slate-100 p-4 transition-all hover:scale-105 dark:bg-slate-800'
              >
                <span className='mr-3 text-2xl'>{tech.icon}</span>
                <h3 className='text-lg font-medium'>{tech.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Section Projek Unggulan */}
        <section className='mb-20'>
          <Heading
            as='h2'
            className='mb-8 text-center text-3xl font-bold text-slate-800 dark:text-slate-100'
          >
            🏆 Projek Unggulan
          </Heading>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {[
              {
                title: 'Sistem Manajemen Sekolah',
                desc: 'Aplikasi web full-stack dengan Laravel dan Livewire',
                tech: ['Laravel', 'MySQL', 'Tailwind']
              },
              {
                title: 'Aplikasi E-Commerce Mobile',
                desc: 'Aplikasi Flutter dengan integrasi Firebase',
                tech: ['Flutter', 'Firebase', 'GetX']
              },
              {
                title: 'Platform LMS',
                desc: 'Sistem pembelajaran online dengan fitur video conference',
                tech: ['Laravel', 'WebRTC', 'React']
              }
            ].map((project, idx) => (
              <div
                key={idx}
                className='rounded-lg bg-slate-100 p-6 transition-all hover:shadow-lg dark:bg-slate-800'
              >
                <h3 className='mb-3 text-xl font-semibold'>{project.title}</h3>
                <p className='mb-4 text-slate-600 dark:text-slate-300'>{project.desc}</p>
                <div className='flex flex-wrap gap-2'>
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className='rounded-full bg-slate-200 px-3 py-1 text-sm dark:bg-slate-700'
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className='text-center'>
          <div className='rounded-2xl bg-slate-100 p-8 dark:bg-slate-800'>
            <Heading as='h2' className='mb-4 text-2xl font-bold'>
              Tertarik Berkolaborasi?
            </Heading>
            <p className='mb-6 text-slate-600 dark:text-slate-300'>
              Mari bangun sesuatu yang luar biasa bersama!
            </p>
            <Button asChild variant='outline'>
              {/* <Link to='/contact' className='hover:bg-primary hover:text-primary-foreground'>
                📨 Hubungi Saya
              </Link> */}
            </Button>
          </div>
        </section>
      </main>
    </Layout>
  )
}
