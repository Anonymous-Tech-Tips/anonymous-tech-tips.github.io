#!/usr/bin/env node

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import games from '../src/data/games.json' assert { type: 'json' };
import utilities from '../src/data/utilities.json' assert { type: 'json' };
import guides from '../src/data/guides.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseUrl = 'https://anonymous-tech-tips.github.io';
const today = new Date().toISOString().split('T')[0];

// Only include real server-accessible paths (no # fragment URLs — spec-invalid, Google ignores them)
const staticUrls = [
  { loc: `${baseUrl}/`, lastmod: today, changefreq: 'daily', priority: 1.0 },
  { loc: `${baseUrl}/learn`, lastmod: today, changefreq: 'weekly', priority: 0.9 },
  { loc: `${baseUrl}/safe`, lastmod: today, changefreq: 'weekly', priority: 0.7 },
  { loc: `${baseUrl}/games`, lastmod: today, changefreq: 'daily', priority: 0.8 },
  { loc: `${baseUrl}/utilities`, lastmod: today, changefreq: 'weekly', priority: 0.7 },
  { loc: `${baseUrl}/optimizations`, lastmod: today, changefreq: 'weekly', priority: 0.7 },
  { loc: `${baseUrl}/education`, lastmod: today, changefreq: 'weekly', priority: 0.6 },
  { loc: `${baseUrl}/entertainment`, lastmod: today, changefreq: 'weekly', priority: 0.6 },
  { loc: `${baseUrl}/share`, lastmod: today, changefreq: 'weekly', priority: 0.5 },
];

const itemUrls = [
  ...guides.map(g => ({ loc: `${baseUrl}/learn/${g.id}`, lastmod: today, changefreq: 'weekly', priority: 0.9 })),
  ...games.map(g => ({ loc: `${baseUrl}/games/${g.id}`, lastmod: today, changefreq: 'daily', priority: 0.8 })),
  ...utilities.map(u => ({ loc: `${baseUrl}/utilities/${u.id}`, lastmod: today, changefreq: 'weekly', priority: 0.7 })),
];

const all = [...staticUrls, ...itemUrls];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

const out = join(__dirname, '../public/sitemap.xml');
const outDir = dirname(out);
mkdirSync(outDir, { recursive: true });
writeFileSync(out, sitemap);
console.log(`✅ Sitemap written: ${out} (${all.length} urls)`);
