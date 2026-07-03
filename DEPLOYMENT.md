# Birthday Application - Production Deployment Guide

## Overview
This document outlines the process for deploying the birthday application to production.

## Prerequisites
- Node.js (v18 or later)
- npm (v9 or later)
- Git
- Access to production hosting environment

## Build Process

### 1. Environment Setup
Ensure you have the required dependencies installed:
```bash
node --version  # Should be v18+
npm --version   # Should be v9+
```

### 2. Install Dependencies
```bash
npm ci
```

### 3. Production Build
To create an optimized production build:
```bash
npm run build
```

This command uses Next.js with Turbopack to generate an optimized production build in the `.next` directory.

### 4. Build Verification
After building, verify that:
- No build errors occur
- The `.next` directory contains the compiled assets
- The build output is ready for deployment

## Deployment Options

### Vercel (Recommended)
The application is optimized for Vercel deployment:
1. Push code to GitHub repository
2. Import project in Vercel dashboard
3. Vercel automatically detects Next.js project and deploys

### Self-Hosted
For self-hosted deployment:
1. Ensure Node.js is installed on the server
2. Copy the built application to the server
3. Install production dependencies: `npm ci --only=production`
4. Start the application: `npm start`
5. Use a process manager like PM2 for production reliability

## Environment Variables
Required environment variables for production:
- `NODE_ENV=production`
- Any additional API keys or configuration values

## Performance Optimization
The build includes several optimizations:
- Image optimization via Next.js Image component
- Code splitting and lazy loading
- Minification and compression
- Asset fingerprinting for cache busting
- SEO optimizations (meta tags, Open Graph)
- Accessibility improvements

## Testing in Production
After deployment, verify:
1. Application loads correctly
2. All images load properly
3. Interactive elements work as expected
4. Responsive design functions on various screen sizes
5. SEO meta tags are present in page source
6. Accessibility features function correctly

## Rollback Procedure
To rollback to a previous version:
1. Redeploy the previous commit/tag
2. Verify the application functions correctly
3. Monitor for any issues

## Maintenance
- Regularly update dependencies with `npm update`
- Monitor application logs for errors
- Periodically run `npm audit` to check for security vulnerabilities
- Keep Node.js version up to date