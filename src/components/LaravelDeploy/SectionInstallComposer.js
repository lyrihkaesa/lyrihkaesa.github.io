// src/components/SectionInstallComposer.js
import React, { useState } from 'react'
import CodeBlock from '@theme/CodeBlock'

export default function SectionInstallComposer({ phpVersions }) {
  const steps = [
    {
      id: 'composer-update',
      title: 'Update package index',
      cmd: 'sudo apt update'
    },
    {
      id: 'composer-cd-home',
      title: 'Change to home directory',
      cmd: 'cd ~'
    },
    {
      id: 'composer-download',
      title: 'Download Composer installer',
      cmd: 'curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php'
    },
    {
      id: 'composer-verify',
      title: 'Verify installer',
      cmd: "HASH=`curl -sS https://composer.github.io/installer.sig`\nphp -r \"if (hash_file('SHA384', '/tmp/composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;\""
    },
    {
      id: 'composer-install',
      title: 'Install Composer globally',
      cmd: 'sudo php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer'
    },
    {
      id: 'composer-check',
      title: 'Check Composer version',
      cmd: 'composer'
    }
  ]

  return (
    <div
      id='composer-installation'
      className='mt-6 mb-6 scroll-m-20 rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900/80'
    >
      <h2 className='mb-2 text-xl font-bold'>Install Composer</h2>

      {steps.map((s) => (
        <div key={s.id} className='mb-4 rounded border p-2'>
          <h3 className='mb-1 font-semibold'>{s.title}</h3>
          <CodeBlock language='bash'>{s.cmd}</CodeBlock>
        </div>
      ))}

      {phpVersions.length > 0 && (
        <div className='mt-4 rounded border p-2'>
          <h3 className='mb-1 font-semibold'>Contoh menggunakan Composer</h3>
          {phpVersions.map((v) => (
            <div key={v} className='mb-2'>
              <p className='text-sm font-medium'>PHP {v}</p>
              <CodeBlock language='bash'>{`php${v} -r "require 'vendor/autoload.php';"`}</CodeBlock>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
