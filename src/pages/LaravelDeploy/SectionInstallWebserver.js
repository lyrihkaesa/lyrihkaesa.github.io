import React, { useMemo } from 'react'
import CodeBlock from '@theme/CodeBlock'

export default function SectionInstallWebserver({ webServers }) {
  const sections = useMemo(() => {
    const arr = []
    if (webServers.includes('nginx'))
      arr.push({
        id: 'nginx',
        title: 'Install Nginx',
        cmd: 'sudo apt install -y nginx',
        note: 'Installs Nginx webserver.'
      })
    if (webServers.includes('apache'))
      arr.push({
        id: 'apache',
        title: 'Install Apache2 + libapache2-mod-fcgid',
        cmd: 'sudo apt install -y apache2 libapache2-mod-fcgid',
        note: 'Installs Apache2 and FCGID module.'
      })
    return arr
  }, [webServers])

  return (
    <div>
      <h2 id='webserver-installation' className='mb-2 text-xl font-bold'>
        Webserver Installation
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
