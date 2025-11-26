#!/usr/bin/env node

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import games from '../src/data/games.json' assert { type: 'json' };
import utilities from '../src/data/utilities.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseUrl = 'https://subset28.github.io/Anonymous-Tech-Tips';
const distDir = join(__dirname, '../dist');

interface PrerenderedPage {
  path: string;
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogImage?: string;
  structuredData?: any;
}

// Generate HTML for a prerendered page
function generateHTML(page: PrerenderedPage): string {
  const structuredDataScript = page.structuredData 
    ? `<script type="application/ld+json">${JSON.stringify(page.structuredData, null, 2)}</script>`
    : '';

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="${baseUrl}/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${page.title}</title>
    <meta name="title" content="${page.title}" />
    <meta name="description" content="${page.description}" />
    <meta name="keywords" content="${page.keywords}" />
    <meta name="author" content="Tech Tips" />
    <meta name="robots" content="index, follow" />
    <meta name="googlebot" content="index, follow" />
    <meta name="google-site-verification" content="aKDAYtznOmmv7PU-UdPLEc9Bfa5bBP9FCLs4NeiYbik" />
    <link rel="canonical" href="${page.canonical}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${page.canonical}" />
    <meta property="og:title" content="${page.title}" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:image" content="${page.ogImage || baseUrl + '/placeholder.svg'}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Tech Tips" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${page.canonical}" />
    <meta name="twitter:title" content="${page.title}" />
    <meta name="twitter:description" content="${page.description}" />
    <meta name="twitter:image" content="${page.ogImage || baseUrl + '/placeholder.svg'}" />
    
    ${structuredDataScript}
    
    <!-- Redirect to hash route for SPA -->
    <meta http-equiv="refresh" content="0;url=${baseUrl}/#${page.path.replace(/^\//, '')}" />
    
    <style>
      body {
        font-family: system-ui, -apple-system, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
        background: #0b0b0b;
        color: #fff;
      }
      .loader {
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="loader">
      <h1>Loading ${page.title}...</h1>
      <p>Redirecting to ${page.canonical}</p>
    </div>
  </body>
</html>`;
}

// Create directory if it doesn't exist
function ensureDir(path: string) {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

// Main pages to prerender
const mainPages: PrerenderedPage[] = [
  {
    path: '/',
    title: 'Tech Tips - Best Unblocked Games Hub | Free Gaming Site 2025',
    description: '🎮 #1 Unblocked Games Site! Play 145+ free games instantly - no downloads needed. Featuring Slope, Retro Bowl, 2048, utilities, PC optimization guides & more.',
    keywords: 'unblocked games, free online games, school games unblocked, gaming hub 2025, play games online free, best unblocked games site',
    canonical: baseUrl + '/',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Tech Tips",
      "url": baseUrl,
      "description": "The best unblocked games hub with 145+ free games, utilities, and PC optimization guides.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${baseUrl}/?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    }
  },
  {
    path: '/games',
    title: 'Unblocked Games - Play 145+ Free Games Online | Tech Tips',
    description: 'Play 145+ unblocked games online for free! Including Slope, Retro Bowl, 2048, Drive Mad, Basketball, and more. No downloads, instant play.',
    keywords: 'unblocked games, free games, online games, slope unblocked, retro bowl, basketball games, action games',
    canonical: baseUrl + '/games',
  },
  {
    path: '/utilities',
    title: 'Free Online Utilities - Password Generator, QR Codes & More | Tech Tips',
    description: 'Free online utilities including password generator, QR code generator, color picker, text converter, JSON formatter, and more developer tools.',
    keywords: 'password generator, qr code generator, color picker, text converter, free utilities, online tools',
    canonical: baseUrl + '/utilities',
  },
  {
    path: '/optimizations',
    title: 'PC Optimization Guides - Speed Up Your Computer | Tech Tips',
    description: 'Complete PC optimization guides for Windows. Learn how to speed up your computer, improve gaming performance, and maintain your system.',
    keywords: 'pc optimization, windows optimization, speed up computer, gaming performance, system maintenance',
    canonical: baseUrl + '/optimizations',
  },
  {
    path: '/education',
    title: 'Educational Resources & Study Tools | Tech Tips',
    description: 'Free educational resources, study guides, and learning tools for students. Improve your grades with our comprehensive educational content.',
    keywords: 'education, study tools, learning resources, student guides, educational content',
    canonical: baseUrl + '/education',
  },
  {
    path: '/entertainment',
    title: 'Entertainment Hub - Movies, Shows & More | Tech Tips',
    description: 'Access streaming platform alternatives and entertainment resources. Watch movies, shows, anime, and more.',
    keywords: 'entertainment, streaming, movies, tv shows, anime, watch online',
    canonical: baseUrl + '/entertainment',
  },
  {
    path: '/share',
    title: 'Share Tech Tips - QR Codes, Links & Messages | Tech Tips',
    description: 'Share Tech Tips with friends! Generate QR codes, copy shareable links, and use pre-made messages for Discord, Google Docs, and more.',
    keywords: 'share, qr code, shareable links, discord, google docs, bookmarklets',
    canonical: baseUrl + '/share',
  },
  {
    path: '/safe',
    title: 'Safe Mode - Disguise Screen | Tech Tips',
    description: 'Safe Mode feature - quickly disguise your screen with a fake Notes, Calculator, or Docs interface.',
    keywords: 'safe mode, privacy, disguise screen, stealth mode',
    canonical: baseUrl + '/safe',
  },
];

// Generate game pages
const gamePages: PrerenderedPage[] = games.map((game: any) => {
  const genres = game.tags?.slice(0, 3) || ['Action'];
  return {
    path: `/games/${game.id}`,
    title: `${game.title} - Play Unblocked Online Free | Tech Tips`,
    description: `Play ${game.title} unblocked for free! ${game.description || 'Enjoy this exciting game instantly with no downloads required.'}`,
    keywords: `${game.title} unblocked, ${game.title} game, play ${game.title}, ${game.tags?.join(', ') || 'online game'}`,
    canonical: `${baseUrl}/games/${game.id}`,
    ogImage: game.thumbnail ? baseUrl + game.thumbnail : undefined,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "VideoGame",
      "name": game.title,
      "url": `${baseUrl}/games/${game.id}`,
      "description": game.description || `Play ${game.title} unblocked online for free.`,
      "genre": genres,
      "author": {
        "@type": "Organization",
        "name": "Tech Tips"
      },
      "applicationCategory": "Game",
      "operatingSystem": "Web Browser",
      "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
      "image": game.thumbnail ? baseUrl + game.thumbnail : baseUrl + '/placeholder.svg',
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    }
  };
});

// Generate utility pages
const utilityPages: PrerenderedPage[] = utilities.map((utility: any) => ({
  path: `/utilities/${utility.id}`,
  title: `${utility.title} - Free Online Tool | Tech Tips`,
  description: utility.description,
  keywords: utility.tags?.join(', ') || 'online tool, utility',
  canonical: `${baseUrl}/utilities/${utility.id}`,
}));

// Combine all pages
const allPages = [...mainPages, ...gamePages, ...utilityPages];

console.log(`🚀 Generating ${allPages.length} prerendered pages...`);

let generated = 0;
let errors = 0;

for (const page of allPages) {
  try {
    const pagePath = page.path === '/' ? '/index.html' : `${page.path}/index.html`;
    const fullPath = join(distDir, pagePath);
    const dirPath = dirname(fullPath);
    
    ensureDir(dirPath);
    
    const html = generateHTML(page);
    writeFileSync(fullPath, html);
    generated++;
    
    if (generated % 20 === 0) {
      console.log(`  Generated ${generated}/${allPages.length} pages...`);
    }
  } catch (error) {
    console.error(`  ❌ Error generating ${page.path}:`, error);
    errors++;
  }
}

console.log(`\n✅ Prerendering complete!`);
console.log(`  Generated: ${generated} pages`);
if (errors > 0) {
  console.log(`  Errors: ${errors} pages`);
}
console.log(`\n📁 Output directory: ${distDir}`);
