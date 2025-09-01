// src/components/SectionConfigWebserver.js
import React, { useMemo } from 'react'
import CodeBlock from '@theme/CodeBlock'

export default function SectionConfigWebserver({ webServers, domains, phpVersions }) {
  const sections = useMemo(() => {
    const arr = []

    if (webServers.includes('nginx')) {
      domains.forEach((domain) => {
        phpVersions.forEach((phpVer) => {
          const id = `nginx-${domain}-php${phpVer.replace('.', '')}` // id unik
          const title = `NGINX - ${domain} - PHP ${phpVer}` // judul jelas
          const docroot = `/var/www/${domain}/public`

          arr.push({
            id,
            title,
            cmd: [
              `sudo mkdir -p ${docroot}`,
              `sudo chown -R $USER:www-data ${docroot}`,
              `sudo chmod -R 755 ${docroot}`,
              `sudo tee /etc/nginx/sites-available/${domain}.conf > /dev/null <<'NGINXCONF'`,
              `server {`,
              `    listen 80;`,
              `    server_name ${domain} www.${domain};`,
              `    root ${docroot};`,
              `    index index.php index.html;`,
              `    location / { try_files $uri $uri/ /index.php?$query_string; }`,
              `    location ~ \\.php$ {`,
              `        include snippets/fastcgi-php.conf;`,
              `        fastcgi_pass unix:/run/php/php${phpVer}-fpm.sock;`,
              `        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;`,
              `        include fastcgi_params;`,
              `    }`,
              `    location ~ /\\. { deny all; }`,
              `    access_log /var/log/nginx/${domain}_access.log;`,
              `    error_log /var/log/nginx/${domain}_error.log;`,
              `}`,
              `NGINXCONF`,
              `sudo ln -s /etc/nginx/sites-available/${domain}.conf /etc/nginx/sites-enabled/${domain}.conf || true`,
              `sudo nginx -t`,
              `sudo systemctl reload nginx`
            ].join('\n'),
            note: `Nginx virtual host for ${domain} using PHP ${phpVer}. Adjust document root to your Laravel public folder.`
          })
        })
      })
    }

    if (webServers.includes('apache')) {
      domains.forEach((domain) => {
        phpVersions.forEach((phpVer) => {
          const id = `apache-${domain}-php${phpVer.replace('.', '')}`
          const title = `APACHE - ${domain} - PHP ${phpVer}`
          arr.push({
            id,
            title,
            cmd: `# Apache virtual host config for ${domain} with PHP ${phpVer} (example template)`,
            note: `Enable site and reload Apache.`
          })
        })
      })
    }

    return arr
  }, [webServers, domains, phpVersions])

  return (
    <div>
      <h2 id='webserver-config' className='mb-2 text-xl font-bold'>
        Webserver Configuration
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
