# GitHub Pages Setup Guide

This guide explains how to enable GitHub Pages for the documentation.

## Prerequisites

- Repository must be public (or have GitHub Pro/Team for private repos)
- Admin access to the repository

## Setup Steps

### 1. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/paufau/react-native-multiple-modals`
2. Click on **Settings** (gear icon in the top menu)
3. In the left sidebar, click on **Pages** under "Code and automation"
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - This will automatically use the workflow file at `.github/workflows/deploy-docs.yml`

### 2. Verify Workflow Permissions

1. Go to **Settings** → **Actions** → **General**
2. Scroll down to "Workflow permissions"
3. Ensure "Read and write permissions" is selected
4. Check "Allow GitHub Actions to create and approve pull requests"
5. Click **Save**

### 3. Trigger the Deployment

The deployment will automatically trigger when:
- Changes are pushed to the `main` branch in the `docs/` folder
- The workflow file `.github/workflows/deploy-docs.yml` is changed
- Or manually trigger it:
  1. Go to **Actions** tab
  2. Click on "Deploy Documentation" workflow
  3. Click "Run workflow"

### 4. Wait for Deployment

1. Go to the **Actions** tab
2. Watch the "Deploy Documentation" workflow run
3. Once completed (green checkmark), your site should be live

### 5. Access Your Documentation

Your documentation will be available at:
```
https://paufau.github.io/react-native-multiple-modals/
```

## Troubleshooting

### Site Not Loading

**Issue**: 404 error or blank page

**Solutions**:
1. Check that GitHub Pages is enabled in Settings → Pages
2. Verify the source is set to "GitHub Actions"
3. Check the Actions tab for any failed deployments
4. Ensure the baseUrl in `docusaurus.config.ts` matches `/react-native-multiple-modals/`

### Workflow Fails

**Issue**: GitHub Actions workflow fails

**Solutions**:
1. Check workflow permissions (Settings → Actions → General)
2. Review the error logs in the Actions tab
3. Ensure the workflow file syntax is correct
4. Verify Node.js version compatibility

### Assets Not Loading

**Issue**: CSS, JS, or images not loading

**Solutions**:
1. Check that `baseUrl` in `docusaurus.config.ts` is set correctly
2. Verify the build completed successfully
3. Check that static assets are in the `docs/static/` directory

### Old Content Showing

**Issue**: Changes not reflected on the live site

**Solutions**:
1. Clear your browser cache
2. Wait a few minutes for CDN to update
3. Check that the latest workflow run completed successfully
4. Try accessing the site in an incognito window

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to `docs/static/` with your domain:
   ```
   docs.yourdomain.com
   ```

2. Configure DNS with your domain provider:
   - Add a CNAME record pointing to `paufau.github.io`

3. In GitHub Settings → Pages:
   - Enter your custom domain
   - Check "Enforce HTTPS"

## Maintenance

### Updating Documentation

1. Edit files in the `docs/docs/` directory
2. Test locally: `cd docs && npm start`
3. Build to verify: `npm run build`
4. Commit and push to `main` branch
5. GitHub Actions will automatically deploy

### Adding New Pages

1. Create a new `.md` file in `docs/docs/`
2. Add frontmatter:
   ```markdown
   ---
   sidebar_position: X
   ---
   ```
3. Update `docs/sidebars.ts` if needed
4. Commit and push

## Monitoring

### Check Deployment Status

1. Go to **Actions** tab
2. View "Deploy Documentation" workflow runs
3. Check for any errors or warnings

### View Site Analytics (Optional)

To add analytics:

1. Add Google Analytics or similar to `docusaurus.config.ts`:
   ```typescript
   gtag: {
     trackingID: 'G-XXXXXXXXXX',
   },
   ```

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Docusaurus Deployment Guide](https://docusaurus.io/docs/deployment)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Need Help?

If you encounter issues:
1. Check the [Docusaurus Troubleshooting Guide](https://docusaurus.io/docs/troubleshooting)
2. Review GitHub Actions logs for error messages
3. Open an issue in the repository
