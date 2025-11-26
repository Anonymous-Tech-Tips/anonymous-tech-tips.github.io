#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import games from '../src/data/games.json' assert { type: 'json' };
import utilities from '../src/data/utilities.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseUrl = 'https://subset28.github.io/Anonymous-Tech-Tips';
const today = new Date().toISOString().split('T')[0];

const urls = [
  { loc: `${baseUrl}/`, lastmod: today, changefreq: 'weekly', priority: 1.0 },
  { loc: `${baseUrl}/#/games`, lastmod: today, changefreq: 'weekly', priority: 0.9 },
  { loc: `${baseUrl}/#/share`, lastmod: today, changefreq: 'monthly', priority: 0.8 },
  { loc: `${baseUrl}/#/seo-setup`, lastmod: today, changefreq: 'monthly', priority: 0.8 },
  { loc: `${baseUrl}/#/utilities`, lastmod: today, changefreq: 'monthly', priority: 0.8 },
  { loc: `${baseUrl}/#/optimizations`, lastmod: today, changefreq: 'monthly', priority: 0.8 },
  { loc: `${baseUrl}/#/education`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
  { loc: `${baseUrl}/#/entertainment`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
  { loc: `${baseUrl}/#/collections`, lastmod: today, changefreq: 'weekly', priority: 0.6 },
  { loc: `${baseUrl}/#/safe`, lastmod: today, changefreq: 'monthly', priority: 0.5 },
  { loc: `${baseUrl}/#/settings`, lastmod: today, changefreq: 'monthly', priority: 0.4 },
];

const itemUrls = [
  ...games.map(g => ({ loc: `${baseUrl}/#/games/${g.id}`, lastmod: today, changefreq: 'weekly', priority: 0.7 })),
  ...utilities.map(u => ({ loc: `${baseUrl}/#/utilities/${u.id}`, lastmod: today, changefreq: 'monthly', priority: 0.6 })),
];

const all = [...urls, ...itemUrls];

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
writeFileSync(out, sitemap);
console.log(`✅ Sitemap written: ${out} (${all.length} urls)`);
