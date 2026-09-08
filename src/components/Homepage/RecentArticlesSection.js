import React from 'react'
import Link from '@docusaurus/Link'
import { FiBookOpen, FiClock, FiArrowRight, FiCalendar } from 'react-icons/fi'

function formatPostDate(dateStr) {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  } catch {
    return dateStr
  }
}

export default function RecentArticlesSection({ recentPosts, homePageBlogMetadata }) {
  if (!recentPosts || recentPosts.length === 0) return null

  // Display at most 3 recent posts
  const postsToShow = recentPosts.slice(0, 3)
  const blogPath = homePageBlogMetadata?.path || '/blog'

  return (
    <section className='mb-24 scroll-mt-20'>
      <div className='mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
        <div>
          <h2 className='text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white'>
            Catatan Terkini
          </h2>
          <p className='mt-2 max-w-xl text-sm text-slate-600 sm:text-base dark:text-slate-400'>
            Rangkuman belajar, panduan konfigurasi server, dan solusi masalah teknis yang pernah
            saya temui.
          </p>
        </div>

        <Link
          to={blogPath}
          className='inline-flex items-center gap-1.5 self-start text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:no-underline sm:self-auto dark:text-indigo-400 dark:hover:text-indigo-300'
        >
          <span>Buka Semua Tulisan</span>
          <FiArrowRight className='h-3.5 w-3.5' />
        </Link>
      </div>

      <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
        {postsToShow.map((post, idx) => {
          const meta = post?.blogData?.metadata || {}
          const permalink = meta.permalink || '#'
          const title = meta.title || 'Catatan Baru'
          const description = meta.description || ''
          const date = meta.date
          const readingTime = meta.readingTime ? Math.ceil(meta.readingTime) : null

          return (
            <Link
              key={permalink || idx}
              to={permalink}
              className='group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/50 hover:shadow-lg hover:no-underline dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-indigo-500/40'
            >
              <div>
                <div className='mb-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400'>
                  {date && (
                    <span className='inline-flex items-center gap-1'>
                      <FiCalendar className='h-3 w-3 text-slate-400' />
                      <span>{formatPostDate(date)}</span>
                    </span>
                  )}
                  {readingTime && (
                    <span className='inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 font-medium dark:bg-slate-800'>
                      <FiClock className='h-3 w-3' />
                      <span>{readingTime} menit</span>
                    </span>
                  )}
                </div>

                <h3 className='line-clamp-2 text-base font-bold text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400'>
                  {title}
                </h3>

                {description && (
                  <p className='mt-2 line-clamp-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400'>
                    {description}
                  </p>
                )}
              </div>

              <div className='mt-5 flex items-center border-t border-slate-100 pt-3 text-xs font-semibold text-indigo-600 dark:border-slate-800 dark:text-indigo-400'>
                <span>Baca Selengkapnya</span>
                <FiArrowRight className='ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1' />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
