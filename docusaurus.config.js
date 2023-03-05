// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Kaesa Lyrih",
  tagline: "Memberikan Informasi yang Manusiawi ❤",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://lyrihkaesa.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "lyrihkaesa", // Usually your GitHub org/user name.
  projectName: "lyrihkaesa.github.io", // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "id",
    locales: ["id"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  plugins:
    /** @type {import('@docusaurus/preset-classic').plugins} */
    [
      [
        "@docusaurus/plugin-content-docs",
        {
          id: "course",
          path: "articles/course",
          routeBasePath: "course",
          sidebarPath: require.resolve("./sidebars.js"),
        },
      ],
    ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/ksa-logo-gradient-blue.png",
      navbar: {
        title: "Kaesa",
        logo: {
          alt: "Kaesa Lyrih Logo Gradient Blue",
          src: "img/ksa-logo-gradient-blue.png",
        },
        items: [
          // {
          //   type: "doc",
          //   docId: "intro",
          //   position: "left",
          //   label: "Tutorial",
          // },
          {
            to: "/course/intro",
            label: "Perkuliahan",
            position: "left",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/lyrihkaesa",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Sosial Media",
            items: [
              {
                label: "Fanpage Kaesa Lyrih",
                href: "https://www.facebook.com/lyrihkaesa.official",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/lyrihkaesa",
              },
            ],
          },
          {
            title: "Komunitas",
            items: [
              {
                label: "Facebook Kaesa Toram Online",
                href: "https://www.facebook.com/groups/kaesatoramonline",
              },
            ],
          },
          {
            title: "Lainnya",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/lyrihkaesa",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} lyrihkaesa 💙, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
