import Heading from '@theme/Heading'
import { FiGithub, FiMail } from 'react-icons/fi'
import { FaDiscord } from 'react-icons/fa6'

export default function ContactSection() {
  return (
    <section className='text-center'>
      <div className='rounded-2xl bg-indigo-50 p-8 dark:bg-indigo-900/20'>
        <Heading as='h2' className='mb-4 text-2xl font-bold text-indigo-600 dark:text-indigo-400'>
          💌 Hubungi Saya
        </Heading>
        <p className='mb-6 text-slate-600 dark:text-slate-300'>
          Mari berkolaborasi atau sekadar ngobrol santai!
        </p>
        <div className='flex justify-center gap-4'>
          {[
            {
              name: 'GitHub',
              icon: <FiGithub className='h-6 w-6' />,
              link: 'https://github.com/lyrihkaesa',
              color: 'bg-gray-800 hover:bg-gray-900 dark:bg-gray-100 dark:hover:bg-gray-200'
            },
            {
              name: 'Discord',
              icon: <FaDiscord className='h-6 w-6' />,
              link: 'https://discord.gg/z5GUceqyhB',
              color: 'bg-[#5865F2] hover:bg-[#4752c4]'
            },
            {
              name: 'Email',
              icon: <FiMail className='h-6 w-6' />,
              link: 'mailto:kaesalyrih@gmail.com',
              color: 'bg-red-500 hover:bg-red-600'
            }
          ].map((social) => (
            <a
              key={social.name}
              href={social.link}
              target='_blank'
              rel='noopener noreferrer'
              className={`${social.color} flex h-12 w-12 items-center justify-center rounded-full text-white transition-colors dark:text-gray-800`}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
