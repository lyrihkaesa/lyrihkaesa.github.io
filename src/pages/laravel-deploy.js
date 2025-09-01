import React, { useState, useMemo } from 'react'
import Layout from '@theme/Layout'
import TOC from '../components/LaravelDeploy/TOC'
import SectionInstallPHP from '../components/LaravelDeploy/SectionInstallPHP'
import SectionInstallDatabase from '../components/LaravelDeploy/SectionInstallDatabase'
import SectionInstallWebserver from '../components/LaravelDeploy/SectionInstallWebserver'
import GuideUFW from '../components/LaravelDeploy/GuideUFW'
import SectionConfigWebserver from '../components/LaravelDeploy/SectionConfigWebserver'
import SectionInstallComposer from '../components/LaravelDeploy/SectionInstallComposer'

// ---------------- Main Page ----------------
export default function LaravelDeployPage() {
  const [phpVersions, setPhpVersions] = useState(['8.2'])
  const [extensions, setExtensions] = useState(['mbstring', 'xml', 'curl', 'bcmath', 'zip', 'intl'])
  const [databases, setDatabases] = useState(['mysql'])
  const [webServers, setWebServers] = useState(['nginx'])
  const [domainsText, setDomainsText] = useState('laravel.test')
  const [enableSSL, setEnableSSL] = useState(true)
  const [includeXdebug, setIncludeXdebug] = useState(false)
  const [includeImagick, setIncludeImagick] = useState(false)
  const [showUFW, setShowUFW] = useState(false)
  const [showComposer, setShowComposer] = useState(false)

  const domains = useMemo(
    () =>
      domainsText
        .split(/\r?\n|,/)
        .map((d) => d.trim())
        .filter(Boolean),
    [domainsText]
  )

  const toggleArray = (arr, setter, value) =>
    setter((prev) => (prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]))

  // ---------------- TOC ----------------
  const toc = useMemo(() => {
    const tocArr = [
      {
        id: 'php-installation',
        title: 'PHP Installation',
        children: phpVersions.map((v) => ({ id: `php-${v}`, title: `PHP ${v}` }))
      },
      {
        id: 'database-installation',
        title: 'Database Installation',
        children: databases.map((db) => ({ id: db, title: db.toUpperCase() }))
      },
      {
        id: 'webserver-installation',
        title: 'Webserver Installation',
        children: webServers.map((ws) => ({ id: ws, title: ws }))
      },
      {
        id: 'webserver-configuration',
        title: 'Webserver Configuration',
        children: webServers.flatMap((ws) =>
          domains.flatMap((domain) =>
            phpVersions.map((phpVer) => ({
              id: `${ws}-${domain}-php${phpVer.replace('.', '')}`,
              title: `${ws.toUpperCase()} - ${domain} - PHP ${phpVer}`
            }))
          )
        )
      }
    ]
    if (showUFW) tocArr.push({ id: 'guide-ufw', title: 'Panduan Firewall UFW' })
    if (showComposer) tocArr.push({ id: 'composer-installation', title: 'Install Composer' })
    return tocArr
  }, [phpVersions, databases, webServers, domains, showUFW])

  return (
    <Layout title='Laravel Server Generator'>
      <div className='mx-auto max-w-6xl px-4 py-10'>
        <header className='mb-6'>
          <h1 className='text-3xl font-bold'>Laravel / PHP Server Setup Generator</h1>
          <p className='mt-2 text-gray-600 dark:text-gray-300'>
            Pilih versi PHP, ekstensi, webserver, database, domain, dan SSL. Panduan otomatis
            ter-generate di bawah.
          </p>
        </header>

        <div className='mx-auto max-w-7xl px-4 py-10 md:grid md:grid-cols-4 md:gap-6'>
          {/* Sidebar TOC */}
          <aside className='sticky top-20 hidden h-[calc(100vh-5rem)] overflow-y-auto md:col-span-1 md:block'>
            <TOC toc={toc} />
          </aside>

          {/* Main Content */}
          <main className='space-y-6 md:col-span-3'>
            {/* Controls */}
            <div className='grid gap-4 md:grid-cols-3'>
              {/* PHP Versions */}
              <div className='rounded-lg border bg-white/80 p-4 dark:bg-gray-900/80'>
                <h4 className='mb-2 font-semibold'>PHP Versions</h4>
                {['7.4', '8.0', '8.1', '8.2', '8.3'].map((v) => (
                  <label key={v} className='mr-2 inline-flex items-center gap-2'>
                    <input
                      type='checkbox'
                      checked={phpVersions.includes(v)}
                      onChange={() => toggleArray(phpVersions, setPhpVersions, v)}
                      className='h-4 w-4'
                    />
                    <span className='text-sm'>PHP {v}</span>
                  </label>
                ))}
              </div>

              {/* Databases */}
              <div className='rounded-lg border bg-white/80 p-4 dark:bg-gray-900/80'>
                <h4 className='mb-2 font-semibold'>Databases</h4>
                {['mysql', 'postgresql', 'sqlite', 'redis'].map((db) => (
                  <label key={db} className='mr-2 inline-flex items-center gap-2'>
                    <input
                      type='checkbox'
                      checked={databases.includes(db)}
                      onChange={() => toggleArray(databases, setDatabases, db)}
                      className='h-4 w-4'
                    />
                    <span className='text-sm'>{db}</span>
                  </label>
                ))}
              </div>

              {/* Webserver */}
              <div className='rounded-lg border bg-white/80 p-4 dark:bg-gray-900/80'>
                <h4 className='mb-2 font-semibold'>Webserver</h4>
                {['nginx', 'apache'].map((ws) => (
                  <label key={ws} className='mr-2 inline-flex items-center gap-2'>
                    <input
                      type='checkbox'
                      checked={webServers.includes(ws)}
                      onChange={() => toggleArray(webServers, setWebServers, ws)}
                      className='h-4 w-4'
                    />
                    <span className='text-sm'>{ws}</span>
                  </label>
                ))}
              </div>

              {/* Domains + SSL */}
              <div className='rounded-lg border bg-white/80 p-4 md:col-span-3 dark:bg-gray-900/80'>
                <h4 className='mb-2 font-semibold'>Domains</h4>
                <textarea
                  rows={3}
                  className='w-full rounded border p-2 text-sm dark:bg-gray-800'
                  value={domainsText}
                  onChange={(e) => setDomainsText(e.target.value)}
                />
                <label className='mt-2 inline-flex items-center gap-2'>
                  <input
                    type='checkbox'
                    checked={enableSSL}
                    onChange={(e) => setEnableSSL(e.target.checked)}
                    className='h-4 w-4'
                  />
                  <span className='text-sm'>Enable SSL (certbot)</span>
                </label>
              </div>
              {/* Options: Firewall UFW & Composer */}
              <div className='grid gap-4 md:col-span-3'>
                {/* UFW */}
                <label className='inline-flex items-center gap-2'>
                  <input
                    type='checkbox'
                    checked={showUFW}
                    onChange={(e) => setShowUFW(e.target.checked)}
                    className='h-4 w-4'
                  />
                  <span className='text-sm'>Tampilkan Panduan Firewall UFW</span>
                </label>

                {/* Composer */}
                <label className='inline-flex items-center gap-2'>
                  <input
                    type='checkbox'
                    checked={showComposer}
                    onChange={(e) => setShowComposer(e.target.checked)}
                    className='h-4 w-4'
                  />
                  <span className='text-sm'>Install Composer</span>
                </label>
              </div>
            </div>

            {/* Sections */}
            <SectionInstallPHP
              {...{ phpVersions, extensions, includeXdebug, includeImagick, databases }}
            />
            <SectionInstallDatabase {...{ databases, phpVersions }} />
            <SectionInstallWebserver {...{ webServers }} />
            <SectionConfigWebserver {...{ webServers, domains, phpVersions }} />

            {/* UFW */}
            {showUFW && <GuideUFW />}

            {/* Composer */}
            {showComposer && <SectionInstallComposer {...{ phpVersions }} />}

            <footer className='mt-8 text-sm text-gray-500 dark:text-gray-400'>
              <strong>Catatan Penting:</strong> Semua perintah bersifat template. Review sebelum
              dijalankan di server produksi. Disable Xdebug di production.
            </footer>
          </main>
        </div>
      </div>
    </Layout>
  )
}
