#!/bin/bash

# SEO-optimized build script for Tech Tips
# This script builds the site and generates prerendered pages for Google indexing

echo "🚀 Starting SEO-optimized build..."

# Build the Vite app
echo "📦 Building Vite application..."
npm run build

# Generate updated sitemap
echo "🗺️  Generating sitemap..."
tsx scripts/generate-sitemap.ts

# Prerendering is handled by vite.config.ts closeBundle hook
echo "✅ SEO build complete!"
echo "📊 Summary:"
echo "  - Static HTML pages generated for all routes"
echo "  - Sitemap updated with clean URLs"
echo "  - Meta tags and JSON-LD included in all pages"
echo "  - Ready for Google Search Console submission"
