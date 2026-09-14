import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'React Native Multiple Modals',

  future: {
    v4: true,
  },

  // GitHub Pages project site
  url: 'https://paufau.github.io',
  baseUrl: '/react-native-multiple-modals/',
  // GitHub Pages serves `/page/` and redirects `/page`; emit matching links and canonical URLs
  trailingSlash: true,

  presets: [
    [
      'classic',
      {
        docs: {
          // docs-only mode: no landing page, docs served from the site root
          routeBasePath: '/',
          editUrl:
            'https://github.com/paufau/react-native-multiple-modals/tree/main/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'React Native Multiple Modals',
      items: [
        {
          href: 'https://github.com/paufau/react-native-multiple-modals',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
