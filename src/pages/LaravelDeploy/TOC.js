// src/components/TOC.js
import React from 'react'

export default function TOC({ toc }) {
  return (
    <nav className='rounded-lg border bg-white/80 p-3 text-sm dark:bg-gray-900/80'>
      <h2 className='mb-2 text-base font-semibold'>Table of Contents</h2>
      <ul className='m-0 list-none p-0'>
        {toc.map((s) => (
          <li key={s.id} className='mb-1'>
            <a href={`#${s.id}`} className='text-blue-600 hover:underline'>
              {s.title}
            </a>
            {s.children?.length > 0 && (
              <ul className='mt-1 ml-2 list-none p-0'>
                {s.children.map((c) => (
                  <li key={c.id} className='mb-0.5'>
                    <a href={`#${c.id}`} className='text-xs text-blue-500 hover:underline'>
                      {c.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
