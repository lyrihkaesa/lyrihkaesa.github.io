// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

import { themes as prismThemes } from 'prism-react-renderer'
import { remarkKroki } from 'remark-kroki'
import { remarkCodeExample } from 'remark-code-example'
import { autoTabs } from 'remark-docusaurus'

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Kaesa Lyrih',
  tagline: 'Full-Stack Developer & Network Engineer',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  // url: 'https://lyrihkaesa.github.io',
  url: 'https://kaesa.charapon.my.id',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'lyrihkaesa', // Usually your GitHub org/user name.
  projectName: 'lyrihkaesa.github.io', // Usually your repo name.

  trailingSlash: false,
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: { defaultLocale: 'id', locales: ['id'] },

  // Enable Docusaurs Faster: https://github.com/facebook/docusaurus/issues/10556
  future: { experimental_faster: true },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars-custom.js'),
          path: 'articles/docs',
          routeBasePath: 'docs',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/lyrihkaesa/io.github.lyrihkaesa/tree/main',
          docItemComponent: '@theme/ApiItem' // Derived from docusaurus-theme-openapi
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/ksa-logo-gradient-blue.png',

      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true
        }
      },

      navbar: {
        title: 'Kaesa',
        logo: {
          alt: 'Kaesa lyrih',
          src: 'img/ksa-logo-gradient-blue.png'
        },

        items: [
          {
            to: '/learning',
            label: 'Learning',
            position: 'left'
          },

          {
            to: '/laravel',
            label: 'Laravel',
            position: 'left'
          },

          {
            to: '/flutter',
            label: 'Flutter',
            position: 'left'
          },

          {
            to: '/toram/',
            label: 'Toram Online',
            position: 'left'
          },
          // {
          //   to: '/community',
          //   label: 'Community',
          //   position: 'left'
          // },

          // {
          //   to: '/blog',
          //   label: 'Blog',
          //   position: 'left'
          // },
          // {
          //   label: 'Petstore API',
          //   position: 'left',
          //   to: '/docs/category/petstore-versioned-api'
          // },
          {
            'href': 'https://discord.gg/z5GUceqyhB',
            'position': 'right',
            'className': 'header-discord-link',
            'aria-label': 'Discord'
          },
          {
            'href': 'https://github.com/lyrihkaesa',
            'position': 'right',
            'className': 'header-github-link',
            'aria-label': 'GitHub repository'
          }
        ]
      },

      footer: {
        style: 'dark',
        links: [
          {
            title: 'Sosial Media',
            items: [
              {
                label: 'Fanpage Kaesa Lyrih',
                href: 'https://www.facebook.com/lyrihkaesa.official'
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/lyrihkaesa'
              }
            ]
          },
          {
            title: 'Komunitas',
            items: [
              {
                label: 'Facebook Kaesa Toram Online',
                href: 'https://www.facebook.com/groups/kaesatoramonline'
              },
              {
                label: 'Discord Comunity',
                href: 'https://discord.gg/z5GUceqyhB'
              }
            ]
          },
          {
            title: 'Lainnya',
            items: [
              // {
              //   label: 'Belajar',
              //   to: '/learning'
              // },
              // {
              //   label: 'Toram Online',
              //   to: '/toram'
              // },
              // {
              //   label: 'Blog',
              //   to: '/blog'
              // },
              // {
              //   label: 'Perkuliahan',
              //   to: '/course'
              // },
              {
                label: 'GitHub',
                href: 'https://github.com/lyrihkaesa'
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ‧ Build with 💗 Kaesa Lyrih ‧ Templates by <a href="https://github.com/namnguyenthanhwork" style="font-weight: bold;" target="_blank">Thành</a>`
      },
      prism: {
        theme: prismThemes.oneLight,
        darkTheme: prismThemes.oneDark,
        additionalLanguages: [
          'ruby',
          'csharp',
          'php',
          'java',
          'powershell',
          'json',
          'bash',
          'dart',
          'objectivec',
          'r',
          'ignore',
          'plant-uml'
        ]
      },
      languageTabs: [
        { highlight: 'python', language: 'python', logoClass: 'python' },
        { highlight: 'bash', language: 'curl', logoClass: 'curl' },
        { highlight: 'csharp', language: 'csharp', logoClass: 'csharp' },
        { highlight: 'go', language: 'go', logoClass: 'go' },
        { highlight: 'javascript', language: 'nodejs', logoClass: 'nodejs' },
        { highlight: 'ruby', language: 'ruby', logoClass: 'ruby' },
        { highlight: 'php', language: 'php', logoClass: 'php' },
        { highlight: 'java', language: 'java', logoClass: 'java', variant: 'unirest' },
        { highlight: 'powershell', language: 'powershell', logoClass: 'powershell' },
        { highlight: 'dart', language: 'dart', logoClass: 'dart' },
        { highlight: 'javascript', language: 'javascript', logoClass: 'javascript' },
        { highlight: 'c', language: 'c', logoClass: 'c' },
        { highlight: 'objective-c', language: 'objective-c', logoClass: 'objective-c' },
        { highlight: 'ocaml', language: 'ocaml', logoClass: 'ocaml' },
        { highlight: 'r', language: 'r', logoClass: 'r' },
        { highlight: 'swift', language: 'swift', logoClass: 'swift' },
        { highlight: 'kotlin', language: 'kotlin', logoClass: 'kotlin' },
        { highlight: 'rust', language: 'rust', logoClass: 'rust' }
      ]
    }),

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        indexPages: true,
        docsRouteBasePath: '/articles',
        hashed: true,
        // language: ['en'],
        highlightSearchTermsOnTargetPage: false,
        searchResultContextMaxLength: 50,
        searchResultLimits: 8,
        searchBarShortcut: true,
        searchBarShortcutHint: true
      }
    ],
    'docusaurus-theme-openapi-docs'
  ],

  plugins: [
    ['./src/plugins/tailwind-config.js', {}],

    // Dokumentasi Belajar
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'learning',
        path: 'articles/learning',
        routeBasePath: 'learning',
        sidebarPath: require.resolve('./sidebars.js'),
        beforeDefaultRemarkPlugins: [
          [
            remarkCodeExample,
            {
              target: 'mdx3'
            }
          ],
          [
            autoTabs,
            {
              labels: {
                'plantuml': 'Diagram PlantUML',
                'plant-uml': 'Kode PlantUML'
              }
            }
          ],
          [
            remarkKroki,
            {
              // ...options here
              alias: ['plantuml'],
              target: 'mdx3',
              server: 'https://kroki.io'
            }
          ]
        ]
      }
    ],

    // Dokumentasi Laravel
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'laravel',
        path: 'articles/laravel',
        routeBasePath: 'laravel',
        sidebarPath: require.resolve('./sidebars.js'),
        beforeDefaultRemarkPlugins: [
          [
            remarkCodeExample,
            {
              target: 'mdx3'
            }
          ],
          [
            autoTabs,
            {
              labels: {
                'plantuml': 'Diagram PlantUML',
                'plant-uml': 'Kode PlantUML'
              }
            }
          ],
          [
            remarkKroki,
            {
              // ...options here
              alias: ['plantuml'],
              target: 'mdx3',
              server: 'https://kroki.io'
            }
          ]
        ]
      }
    ],

    // Dokumentasi Flutter
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'flutter',
        path: 'articles/flutter',
        routeBasePath: 'flutter',
        sidebarPath: require.resolve('./sidebars.js'),
        beforeDefaultRemarkPlugins: [
          [
            remarkCodeExample,
            {
              target: 'mdx3'
            }
          ],
          [
            autoTabs,
            {
              labels: {
                'plantuml': 'Diagram PlantUML',
                'plant-uml': 'Kode PlantUML'
              }
            }
          ],
          [
            remarkKroki,
            {
              // ...options here
              alias: ['plantuml'],
              target: 'mdx3',
              server: 'https://kroki.io'
            }
          ]
        ]
      }
    ],

    // Dokumentasi Dicoding
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'dicoding',
        path: 'articles/dicoding',
        routeBasePath: 'dicoding',
        sidebarPath: require.resolve('./sidebars.js'),
        beforeDefaultRemarkPlugins: [
          [
            remarkCodeExample,
            {
              target: 'mdx3'
            }
          ],
          [
            autoTabs,
            {
              labels: {
                'plantuml': 'Diagram PlantUML',
                'plant-uml': 'Kode PlantUML'
              }
            }
          ],
          [
            remarkKroki,
            {
              // ...options here
              alias: ['plantuml'],
              target: 'mdx3',
              server: 'https://kroki.io'
            }
          ]
        ]
      }
    ],

    // Dokumentasi Toram
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'toram',
        path: 'articles/toram',
        routeBasePath: 'toram',
        sidebarPath: require.resolve('./sidebars.js')
      }
    ],

    // Dokumentasi Jurnal
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'journal',
        path: 'articles/journal',
        routeBasePath: 'journal',
        sidebarPath: require.resolve('./sidebars.js'),
        exclude: ['**/exclude/**']
      }
    ],

    // Comunity (Draft)
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'community',
        path: 'articles/community',
        routeBasePath: 'community',
        sidebarPath: './sidebars.js'
        // ... other options
      }
    ],

    // OpenAPI (Draft)
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'openapi',
        docsPluginId: 'classic',
        config: {
          // multiVersion
          petstore_versioned: {
            specPath: 'api-swagger/petstore.yaml',
            outputDir: 'articles/docs/petstore_versioned', // No trailing slash
            sidebarOptions: {
              groupPathsBy: 'tag',
              categoryLinkSource: 'tag'
            },
            version: '2.0.0', // Current version
            label: 'v2.0.0', // Current version label
            baseUrl: '/docs/petstore_versioned/swagger-petstore-yaml', // Leading slash is important
            downloadUrl:
              'https://raw.githubusercontent.com/lyrihkaesa/io.github.lyrihkaesa/main/api-swagger/petstore.yaml',
            versions: {
              '1.0.0': {
                specPath: 'api-swagger/petstore-1.0.0.yaml',
                outputDir: 'articles/docs/petstore_versioned/1.0.0', // No trailing slash
                label: 'v1.0.0',
                baseUrl: '/docs/petstore_versioned/1.0.0/swagger-petstore-yaml', // Leading slash is important
                downloadUrl:
                  'https://raw.githubusercontent.com/lyrihkaesa/io.github.lyrihkaesa/main/api-swagger/petstore-1.0.0.yaml'
              }
            }
          }
          // singleVersion
          // petstore: {
          //   specPath: 'api-swagger/petstore.yaml',
          //   outputDir: 'docs/petstore',
          //   sidebarOptions: { groupPathsBy: 'tag', categoryLinkSource: 'tag' },
          //   downloadUrl: '/petstore.yaml',
          //   hideSendButton: false,
          //   showSchemas: true
          // }
        }
      }
    ],

    [
      'ideal-image',
      /** @type {import('@docusaurus/plugin-ideal-image').PluginOptions} */
      ({
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        // Use false to debug, but it incurs huge perf costs
        disableInDev: true
      })
    ],

    [
      './src/plugins/blog-plugin',
      {
        path: 'blog',
        editLocalizedFiles: false,
        blogTitle: 'Blog',
        blogDescription: 'Blog description is here ...',
        blogSidebarCount: 'ALL',
        blogSidebarTitle: 'List blog',
        routeBasePath: 'blog',
        include: ['**/*.md', '**/*.mdx'],
        exclude: [
          '**/_*.{js,jsx,ts,tsx,md,mdx}',
          '**/_*/**',
          '**/*.test.{js,jsx,ts,tsx}',
          '**/__tests__/**'
        ],
        postsPerPage: 6,
        truncateMarker: /<!--\s*(truncate)\s*-->/,
        showReadingTime: true,
        onUntruncatedBlogPosts: 'ignore',
        // Remove this to remove the "edit this page" links.
        editUrl: 'https://github.com/lyrihkaesa/io.github.lyrihkaesa/tree/main/',
        remarkPlugins: [[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]]
      }
    ]
  ]
}

export default config
