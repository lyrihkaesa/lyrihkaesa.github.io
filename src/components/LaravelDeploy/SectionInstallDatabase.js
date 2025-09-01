import React, { useMemo } from 'react'
import CodeBlock from '@theme/CodeBlock'

export default function SectionInstallDatabase({ databases, phpVersions }) {
  const sections = useMemo(() => {
    const arr = []
    if (databases.includes('mysql'))
      arr.push({
        id: 'mysql',
        title: 'MariaDB (MySQL)',
        cmd: 'sudo apt install -y mariadb-server\nsudo mysql_secure_installation',
        note: 'Configure root password, remove test DB, and secure installation.'
      })
    if (databases.includes('postgresql'))
      arr.push({
        id: 'postgresql',
        title: 'PostgreSQL',
        cmd: 'sudo apt install -y postgresql postgresql-contrib',
        note: 'Create users/databases with sudo -u postgres createuser/createdb.'
      })
    if (databases.includes('sqlite'))
      arr.push({
        id: 'sqlite',
        title: 'SQLite & PHP extensions',
        cmd: `sudo apt install -y sqlite3\nsudo apt install -y ${phpVersions.map((v) => `php${v}-sqlite3`).join(' ')}`,
        note: 'SQLite suitable for small projects/testing.'
      })
    if (databases.includes('redis'))
      arr.push({
        id: 'redis',
        title: 'Redis & PHP extension',
        cmd: `sudo apt install -y redis-server\nsudo apt install -y ${phpVersions.map((v) => `php${v}-redis`).join(' ')}`,
        note: 'Redis used for cache/queue/session in Laravel.'
      })
    return arr
  }, [databases, phpVersions])

  return (
    <div>
      <h2 id='database-installation' className='mb-2 text-xl font-bold'>
        Database Installation
      </h2>
      {sections.map((s) => (
        <div
          key={s.id}
          id={s.id}
          className='mb-3 rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900/80'
        >
          <h3 className='mb-2 text-lg font-semibold'>{s.title}</h3>
          <CodeBlock language='bash'>{s.cmd}</CodeBlock>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>{s.note}</p>
        </div>
      ))}
    </div>
  )
}
