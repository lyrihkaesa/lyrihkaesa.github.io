import React, { useMemo } from 'react'
import CodeBlock from '@theme/CodeBlock'

export default function SectionInstallPHP({
  phpVersions,
  extensions,
  includeXdebug,
  includeImagick,
  databases
}) {
  const pkgDescriptions = {
    'php-cli': 'PHP CLI – command line interface',
    'php-fpm': 'PHP FPM – FastCGI Process Manager',
    'php-common': 'PHP Common – file konfigurasi & library dasar',
    'php-xdebug': 'Xdebug – debugger & profiler',
    'php-imagick': 'Imagick – manipulasi gambar',
    'php-mbstring': 'mbstring – UTF-8 string support',
    'php-xml': 'xml – XML parsing library',
    'php-curl': 'curl – HTTP client library',
    'php-bcmath': 'bcmath – math operations',
    'php-zip': 'zip – zip archive support',
    'php-intl': 'intl – internationalization support',
    'php-mysql': 'MySQL extension',
    'php-pgsql': 'PostgreSQL extension',
    'php-sqlite3': 'SQLite3 extension',
    'php-redis': 'Redis extension'
  }

  const commands = useMemo(() => {
    return phpVersions.map((v) => {
      const pkgs = [`php${v}-cli`, `php${v}-fpm`, `php${v}-common`]
      extensions.forEach((e) => pkgs.push(`php${v}-${e}`))
      if (includeXdebug) pkgs.push(`php${v}-xdebug`)
      if (includeImagick) pkgs.push(`php-imagick`)
      if (databases.includes('mysql')) pkgs.push(`php${v}-mysql`)
      if (databases.includes('postgresql')) pkgs.push(`php${v}-pgsql`)
      if (databases.includes('sqlite')) pkgs.push(`php${v}-sqlite3`)
      if (databases.includes('redis')) pkgs.push(`php${v}-redis`)
      return {
        id: `php-${v}`,
        title: `PHP ${v}`,
        cmd: `sudo apt install -y ${pkgs.join(' ')}`,
        pkgs,
        note: `Installs PHP ${v} CLI & FPM plus selected extensions.`
      }
    })
  }, [phpVersions, extensions, includeXdebug, includeImagick, databases])

  return (
    <div>
      <h2 id='php-installation' className='mt-20 mb-2 scroll-m-20 text-xl font-bold'>
        PHP Installation
      </h2>
      {commands.map((s) => (
        <div
          key={s.id}
          id={s.id}
          className='mb-2 scroll-m-20 rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900/80'
        >
          <h3 className='mb-2 text-lg font-semibold'>{s.title}</h3>
          <CodeBlock language='bash'>{s.cmd}</CodeBlock>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>{s.note}</p>
          <details className='mb-4 rounded border bg-white/80 dark:bg-gray-900/80'>
            <summary className='cursor-pointer px-4 py-2 font-semibold'>Penjelasan Paket</summary>
            <div className='overflow-x-auto p-2'>
              <table className='w-full table-auto border-collapse border border-gray-200 dark:border-gray-700'>
                <thead>
                  <tr className='bg-gray-100 dark:bg-gray-800'>
                    <th className='border px-2 py-1 text-left text-sm'>Package</th>
                    <th className='border px-2 py-1 text-left text-sm'>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {s.pkgs.map((pkg) => {
                    const baseKey = pkg.replace(/^php\d+\.\d+-/, 'php-')
                    const desc = pkgDescriptions[baseKey] || 'PHP extension'
                    return (
                      <tr key={pkg}>
                        <td className='border px-2 py-1 font-mono text-sm'>
                          <code>{pkg}</code>
                        </td>
                        <td className='border px-2 py-1 text-sm text-gray-600 dark:text-gray-300'>
                          {desc}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </details>
        </div>
      ))}
    </div>
  )
}
