# React Native Multiple Modals - Documentation

This directory contains the Docusaurus-based documentation for React Native Multiple Modals.

The documentation is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory that can be served using any static hosting service.

### Serve Locally

After building, you can test the production build locally:

```bash
npm run serve
```

## 📁 Structure

```
docs/
├── docs/                      # Documentation markdown files
│   ├── intro.md              # Introduction page
│   ├── installation.md       # Installation guide
│   ├── usage.md              # Usage guide
│   ├── api/                  # API reference
│   │   └── properties.md     # Component properties
│   ├── troubleshooting.md    # Troubleshooting guide
│   ├── contribution.md       # Contribution guide
│   └── versions.md           # Version compatibility
├── src/                      # React components and pages
├── static/                   # Static assets (images, etc.)
├── docusaurus.config.ts      # Docusaurus configuration
└── sidebars.ts              # Sidebar configuration
```

## 🔧 Configuration

The main configuration file is `docusaurus.config.ts`. Key settings:

- **Title and Tagline**: Set in the config
- **Base URL**: `/react-native-multiple-modals/` for GitHub Pages
- **Organization**: `paufau`
- **Project**: `react-native-multiple-modals`

## 📝 Adding Documentation

1. Create a new markdown file in the `docs/` directory
2. Add frontmatter at the top:
   ```markdown
   ---
   sidebar_position: 1
   ---
   ```
3. Update `sidebars.ts` if needed to include the new page
4. Write your content using standard Markdown

## 🌐 Deployment

The documentation is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch.

The workflow file is located at `.github/workflows/deploy-docs.yml`.

### Manual Deployment (if needed)

```bash
npm run build
# Then use GitHub Pages deployment or your preferred hosting
```

## 🔗 Live Documentation

Once deployed, the documentation will be available at:
https://paufau.github.io/react-native-multiple-modals/

## 📚 Resources

- [Docusaurus Documentation](https://docusaurus.io/)
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Pages](https://pages.github.com/)

## 🤝 Contributing

To contribute to the documentation:

1. Make your changes in the appropriate markdown files
2. Test locally with `npm start`
3. Build to ensure no errors: `npm run build`
4. Submit a pull request

## 💡 Tips

- Use code blocks with syntax highlighting:
  ````markdown
  ```tsx
  // Your code here
  ```
  ````
- Add images to `static/img/` and reference them with `![Alt text](img/filename.png)`
- Use admonitions for important notes:
  ```markdown
  :::tip
  This is a tip
  :::
  ```
