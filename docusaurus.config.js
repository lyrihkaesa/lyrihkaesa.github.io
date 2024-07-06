// @ts-nocheck
// Note: type annotations allow type checking and IDEs autocompletion

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Kaesa Lyrih',
  tagline: 'Memberikan Informasi yang Manusiawi ❤',
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

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'id',
    locales: ['id'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'articles/docs',
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/lyrihkaesa/lyrihkaesa.github.io/tree/main/',
        },
        blog: {
          showReadingTime: true,
          path: 'articles/blog',
          routeBasePath: 'blog',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/lyrihkaesa/lyrihkaesa.github.io/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins:
    /** @type {import('@docusaurus/preset-classic').plugins} */
    [
      [
        '@docusaurus/plugin-content-docs',
        {
          id: 'course',
          path: 'articles/course',
          routeBasePath: 'course',
          sidebarPath: require.resolve('./sidebars.js'),
        },
      ],
      [
        '@docusaurus/plugin-content-docs',
        {
          id: 'dicoding',
          path: 'articles/dicoding',
          routeBasePath: 'dicoding',
          sidebarPath: require.resolve('./sidebars.js'),
        },
      ],
      [
        '@docusaurus/plugin-content-docs',
        {
          id: 'learning',
          path: 'articles/learning',
          routeBasePath: 'learning',
          sidebarPath: require.resolve('./sidebars.js'),
        },
      ],
      [
        '@docusaurus/plugin-content-docs',
        {
          id: 'journal',
          path: 'articles/journal',
          routeBasePath: 'journal',
          sidebarPath: require.resolve('./sidebars.js'),
          exclude: ['**/exclude/**'],
        },
      ],
      [
        '@docusaurus/plugin-content-docs',
        {
          id: 'toram',
          path: 'articles/toram',
          routeBasePath: 'toram',
          sidebarPath: require.resolve('./sidebars.js'),
        },
      ],
    ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/ksa-logo-gradient-blue.png',
      navbar: {
        title: 'Kaesa',
        logo: {
          alt: 'Kaesa Lyrih Logo Gradient Blue',
          src: 'img/ksa-logo-gradient-blue.png',
        },
        items: [
          // {
          //   type: "doc",
          //   docId: "intro",
          //   position: "left",
          //   label: "Tutorial",
          // },
          {
            to: '/learning/',
            label: 'Belajar',
            position: 'left',
          },
          {
            to: '/toram/',
            label: 'Toram Online',
            position: 'left',
          },
          // {
          //   to: '/course/',
          //   label: 'Perkuliahan',
          //   position: 'left',
          // },
          // {
          //   to: '/blog',
          //   label: 'Blog',
          //   position: 'left',
          // },
          {
            href: 'https://github.com/lyrihkaesa',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Sosial Media',
            items: [
              {
                label: 'Fanpage Kaesa Lyrih',
                href: 'https://www.facebook.com/lyrihkaesa.official',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/lyrihkaesa',
              },
            ],
          },
          {
            title: 'Komunitas',
            items: [
              {
                label: 'Facebook Kaesa Toram Online',
                href: 'https://www.facebook.com/groups/kaesatoramonline',
              },
            ],
          },
          {
            title: 'Lainnya',
            items: [
              {
                label: 'Belajar',
                to: '/learning',
              },
              {
                label: 'Toram Online',
                to: '/toram',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Perkuliahan',
                to: '/course',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/lyrihkaesa',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} lyrihkaesa 💙, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.oneLight,
        darkTheme: prismThemes.oneDark,
        additionalLanguages: ['powershell', 'bash', 'php', 'java', 'dart', 'ignore'],
      },
    }),
};

module.exports = config;
