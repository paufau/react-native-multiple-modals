# React Native Multiple Modals - Documentation

This directory contains the Docusaurus-based documentation for React Native Multiple Modals.

## Quick Start

### Local Development

```bash
npm install
npm start
```

### Build

```bash
npm run build
```

## Deployment

The documentation automatically deploys to GitHub Pages via GitHub Actions on changes to `main`.

**Initial Setup** (one-time):
1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Verify workflow permissions in Settings → Actions → General

Once configured, the site will be live at: https://paufau.github.io/react-native-multiple-modals/

## Structure

- `docs/` - Documentation markdown files
- `static/` - Static assets (images, etc.)
- `docusaurus.config.ts` - Configuration
- `sidebars.ts` - Sidebar structure

## Contributing

1. Edit markdown files in `docs/`
2. Test locally with `npm start`
3. Build to verify: `npm run build`
4. Submit a pull request
