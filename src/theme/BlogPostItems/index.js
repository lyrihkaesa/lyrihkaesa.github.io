import React from 'react'
import Link from '@docusaurus/Link'
import Image from '@theme/IdealImage'
import useBaseUrl from '@docusaurus/useBaseUrl'
import BlogPostItem from '@theme/BlogPostItem'
import TagsListInline from '@theme/TagsListInline'
import { FiBookOpen, FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi'

import TimeStamp from '../../components/TimeStamp'
import { Avatar } from '../../components/ui/avatar'

export default function BlogPostItems({ items, component: BlogPostItemComponent = BlogPostItem }) {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {items.map((blog) => {
        const meta = blog.content.metadata
        const hasImage = Boolean(meta.frontMatter?.image)

        return (
          <article
            key={meta.permalink}
            className='group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/50 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-indigo-500/40'
          >
            <div>
              {/* Image banner or decorative fallback */}
              <Link to={meta.permalink} className='block overflow-hidden'>
                {hasImage ? (
                  <div className='relative h-44 w-full overflow-hidden border-b border-slate-100 bg-slate-950 dark:border-slate-800'>
                    <Image
                      className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                      img={useBaseUrl(meta.frontMatter.image)}
                      alt={meta.title}
                      loading='lazy'
                    />
                  </div>
                ) : (
                  <div className='relative flex h-32 w-full items-center justify-between border-b border-slate-100 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-5 text-white dark:border-slate-800'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur'>
                      <FiBookOpen className='h-5 w-5 text-indigo-400' />
                    </div>
                    <span className='rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-slate-300'>
                      Catatan
                    </span>
                  </div>
                )}
              </Link>

              {/* Content body */}
              <div className='p-5'>
                {/* Date & Reading time */}
                <div className='mb-2.5 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400'>
                  <span className='inline-flex items-center gap-1'>
                    <FiCalendar className='h-3 w-3 text-slate-400' />
                    <TimeStamp timestamp={meta.date} />
                  </span>
                  <span>•</span>
                  <span className='inline-flex items-center gap-1'>
                    <FiClock className='h-3 w-3 text-slate-400' />
                    <span>{Math.ceil(meta.readingTime)} menit</span>
                  </span>
                </div>

                {/* Title */}
                <Link to={meta.permalink} className='hover:no-underline'>
                  <h2 className='line-clamp-2 text-base font-bold tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400'>
                    {meta.title}
                  </h2>
                </Link>

                {/* Description */}
                {meta.description && (
                  <p className='mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400'>
                    {meta.description}
                  </p>
                )}

                {/* Authors */}
                {meta.authors && meta.authors.length > 0 && (
                  <div className='mt-4 flex items-center gap-2'>
                    {meta.authors.map((author, index) => (
                      <Link
                        href={author.page?.permalink || author.url}
                        title={author.name}
                        key={index}
                        className='inline-flex items-center gap-2 text-xs font-medium text-slate-700 hover:text-indigo-600 hover:no-underline dark:text-slate-300 dark:hover:text-indigo-400'
                      >
                        {author.imageURL && (
                          <Avatar className='h-5 w-5'>
                            <Image
                              alt={author.name}
                              img={useBaseUrl(author.imageURL)}
                              className='aspect-square h-full w-full'
                            />
                          </Avatar>
                        )}
                        <span>{author.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer with Tags and Read Action */}
            <div className='border-t border-slate-100 p-5 pt-3 dark:border-slate-800'>
              {meta.tags && meta.tags.length > 0 && (
                <div className='mb-3 flex flex-wrap gap-1.5'>
                  <TagsListInline tags={meta.tags} />
                </div>
              )}

              <Link
                to={meta.permalink}
                className='inline-flex items-center text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:no-underline dark:text-indigo-400 dark:hover:text-indigo-300'
              >
                <span>Baca Selengkapnya</span>
                <FiArrowRight className='ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1' />
              </Link>
            </div>
          </article>
        )
      })}
    </div>
  )
}
