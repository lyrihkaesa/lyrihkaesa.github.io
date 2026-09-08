import React, { useState } from 'react'
import { FiGithub, FiMail, FiCheck, FiCopy, FiMessageSquare, FiExternalLink } from 'react-icons/fi'
import { FaDiscord } from 'react-icons/fa6'

export default function ContactSection() {
  const [copied, setCopied] = useState(false)
  const emailAddress = 'kaesalyrih@gmail.com'

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section id='contact' className='scroll-mt-20'>
      <div className='relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-b from-indigo-50/70 to-slate-50 p-8 text-center shadow-xs backdrop-blur sm:p-12 dark:border-indigo-950/60 dark:from-indigo-950/20 dark:to-slate-900/40'>
        {/* Ambient background glow */}
        <div className='pointer-events-none absolute -bottom-10 left-1/2 -z-10 h-64 w-96 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl' />

        <div className='mx-auto max-w-2xl'>
          <h2 className='text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white'>
            Mari Terhubung
          </h2>

          <p className='mt-3 text-sm text-slate-600 sm:text-base dark:text-slate-400'>
            Terbuka untuk kolaborasi proyek, konsultasi pengembangan aplikasi web/mobile, integrasi
            jaringan, atau sekadar bertukar wawasan teknis.
          </p>

          {/* Connect Cards Bento */}
          <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3'>
            {/* Direct Email with Quick Copy */}
            <div className='flex flex-col items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xs transition-all duration-200 hover:border-indigo-400/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60'>
              <div className='mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400'>
                <FiMail className='h-5 w-5' />
              </div>
              <div className='text-xs font-semibold text-slate-900 dark:text-white'>Surel (Email)</div>
              <div className='mt-0.5 line-clamp-1 text-[11px] text-slate-500 dark:text-slate-400'>
                {emailAddress}
              </div>

              <div className='mt-4 flex w-full gap-1.5'>
                <a
                  href={`mailto:${emailAddress}`}
                  className='inline-flex flex-1 items-center justify-center gap-1 rounded-lg bg-indigo-600 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-700 hover:text-white hover:no-underline'
                >
                  <span>Kirim</span>
                </a>
                <button
                  type='button'
                  onClick={handleCopyEmail}
                  className='inline-flex cursor-pointer items-center justify-center rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
                  title='Salin alamat email'
                >
                  {copied ? (
                    <FiCheck className='h-3.5 w-3.5 text-emerald-500' />
                  ) : (
                    <FiCopy className='h-3.5 w-3.5' />
                  )}
                </button>
              </div>
            </div>

            {/* Discord */}
            <a
              href='https://discord.gg/z5GUceqyhB'
              target='_blank'
              rel='noopener noreferrer'
              className='group flex flex-col items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-400/40 hover:shadow-md hover:no-underline dark:border-slate-800 dark:bg-slate-900/60'
            >
              <div className='mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#5865F2]/10 text-[#5865F2]'>
                <FaDiscord className='h-5 w-5' />
              </div>
              <div className='text-xs font-semibold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400'>
                Komunitas Discord
              </div>
              <div className='mt-0.5 text-[11px] text-slate-500 dark:text-slate-400'>
                Diskusi &amp; ngobrol santai
              </div>

              <div className='mt-4 inline-flex w-full items-center justify-center gap-1 rounded-lg border border-slate-200 py-1.5 text-xs font-semibold text-slate-700 transition-colors group-hover:bg-[#5865F2] group-hover:border-[#5865F2] group-hover:text-white dark:border-slate-700 dark:text-slate-300'>
                <span>Gabung Server</span>
                <FiExternalLink className='h-3 w-3' />
              </div>
            </a>

            {/* GitHub */}
            <a
              href='https://github.com/lyrihkaesa'
              target='_blank'
              rel='noopener noreferrer'
              className='group flex flex-col items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-400/40 hover:shadow-md hover:no-underline dark:border-slate-800 dark:bg-slate-900/60'
            >
              <div className='mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900'>
                <FiGithub className='h-5 w-5' />
              </div>
              <div className='text-xs font-semibold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400'>
                GitHub Profile
              </div>
              <div className='mt-0.5 text-[11px] text-slate-500 dark:text-slate-400'>
                @lyrihkaesa
              </div>

              <div className='mt-4 inline-flex w-full items-center justify-center gap-1 rounded-lg border border-slate-200 py-1.5 text-xs font-semibold text-slate-700 transition-colors group-hover:bg-slate-900 group-hover:text-white dark:border-slate-700 dark:text-slate-300 dark:group-hover:bg-white dark:group-hover:text-slate-900'>
                <span>Lihat Profil</span>
                <FiExternalLink className='h-3 w-3' />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
