import React from 'react'
import clsx from 'clsx'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { PageMetadata, HtmlClassNameProvider, ThemeClassNames } from '@docusaurus/theme-common'
import BlogLayout from '@theme/BlogLayout'
import SearchMetadata from '@theme/SearchMetadata'
import BlogPostItems from '@theme/BlogPostItems'
import Image from '@theme/IdealImage'
import useBaseUrl from '@docusaurus/useBaseUrl'

import { BlogPagination } from '../BlogPagination'

function BlogListPageMetadata(props) {
  const { metadata } = props
  const {
    siteConfig: { title: siteTitle }
  } = useDocusaurusContext()
  const { blogDescription, blogTitle, permalink } = metadata
  const isBlogOnlyMode = permalink === '/'
  const title = isBlogOnlyMode ? siteTitle : blogTitle

  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag='blog_posts_list' />
    </>
  )
}

function BlogHeader(props) {
  const blogMetadata = props.metadata

  return (
    <div className='relative mb-12 overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 p-8 text-center sm:p-12 dark:border-slate-800 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950'>
      {/* Ambient background glow */}
      <div className='pointer-events-none absolute -top-12 left-1/2 -z-10 h-64 w-96 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/15 to-violet-500/10 blur-3xl' />

      <div className='mx-auto max-w-2xl'>
        <h1 className='text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white'>
          {blogMetadata.blogTitle || 'Catatan & Blog Teknis'}
        </h1>
        <p className='mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400'>
          {blogMetadata.blogDescription ||
            'Eksplorasi seputar web engineering, mobile Flutter, DevOps, dan solusi masalah teknis.'}
        </p>
      </div>
    </div>
  )
}

function BlogListPageContent(props) {
  const { metadata, items, sidebar } = props

  return (
    <BlogLayout sidebar={sidebar}>
      <BlogHeader {...props} />
      <BlogPostItems items={items} />
      <BlogPagination metadata={metadata} />
    </BlogLayout>
  )
}

export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogListPage)}
    >
      <BlogListPageMetadata {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  )
}
