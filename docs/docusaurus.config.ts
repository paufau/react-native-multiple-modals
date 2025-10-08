import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'React Native Multiple Modals',
  tagline: 'Native Modal implementation which allows to display multiple Modals simultaneously',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://paufau.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/react-native-multiple-modals/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'paufau', // Usually your GitHub org/user name.
  projectName: 'react-native-multiple-modals', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/paufau/react-native-multiple-modals/tree/main/docs/',
          routeBasePath: '/', // Serve docs at the root
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'React Native Multiple Modals',
      logo: {
        alt: 'React Native Multiple Modals Logo',
        src: 'img/logo.svg',
        href: 'intro',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://www.npmjs.com/package/react-native-multiple-modals',
          label: 'npm',
          position: 'right',
        },
        {
          href: 'https://github.com/paufau/react-native-multiple-modals',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: 'intro',
            },
            {
              label: 'Installation',
              to: 'installation',
            },
            {
              label: 'API Reference',
              to: 'api/properties',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Issues',
              href: 'https://github.com/paufau/react-native-multiple-modals/issues',
            },
            {
              label: 'npm',
              href: 'https://www.npmjs.com/package/react-native-multiple-modals',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Examples',
              href: 'https://github.com/paufau/react-native-multiple-modals-examples',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/paufau/react-native-multiple-modals',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Pavel Pakseev. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'typescript', 'tsx', 'jsx'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
