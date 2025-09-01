import React from 'react'
import CodeBlock from '@theme/CodeBlock'

export default function GuideUFW() {
  return (
    <div
      id='guide-ufw'
      className='mt-20 mb-6 scroll-m-20 rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900/80'
    >
      <h2 className='mb-2 text-xl font-bold'>Panduan Firewall UFW</h2>
      <p className='mb-2 text-gray-600 dark:text-gray-300'>
        UFW (Uncomplicated Firewall) adalah tool untuk mengatur firewall server Laravel Anda.
      </p>
      <CodeBlock language='bash'>{`sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
sudo ufw status verbose`}</CodeBlock>
      <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
        Pastikan membuka port yang diperlukan sesuai kebutuhan server Anda.
      </p>
    </div>
  )
}
