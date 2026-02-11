
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PLAY_DIR = path.join(__dirname, '../public/topvaz66/play');
const OUTPUT_FILE = path.join(__dirname, '../src/data/topvaz-games.json');

// Helper to extract title
function extractTitle(html) {
    const titleMatch = html.match(/<h1 class="single-title">(.*?)<\/h1>/);
    if (titleMatch) return titleMatch[1].replace(' TopVAZ', '').trim();

    const titleTagMatch = html.match(/<title>(.*?)<\/title>/);
    if (titleTagMatch) return titleTagMatch[1].replace(' TopVAZ', '').trim();

    return 'Unknown Game';
}

async function scrape() {
    if (!fs.existsSync(PLAY_DIR)) {
        console.error('Play directory not found:', PLAY_DIR);
        return;
    }

    const files = fs.readdirSync(PLAY_DIR).filter(f => f.startsWith('class-') && f.endsWith('.html'));
    const games = [];

    console.log(`Found ${files.length} game files.`);

    for (const file of files) {
        const id = file.replace('.html', '');
        const content = fs.readFileSync(path.join(PLAY_DIR, file), 'utf-8');
        const title = extractTitle(content);

        // Image path based on observed pattern
        // The original HTML had: /img/class-XXX.png
        // Since we moved it to public/topvaz66, it should be /topvaz66/img/class-XXX.png
        const imageUrl = `/topvaz66/img/${id}.png`;

        // Iframe source
        // Original: /source/class-XXX
        // New: /topvaz66/source/class-XXX
        const iframeUrl = `/topvaz66/source/${id}/index.html`;

        games.push({
            id: `tv-${id}`, // Prefix to avoid collisions
            title: title,
            tags: ['arcade', 'imported'], // Default tags
            thumbnail: imageUrl, // We will map this string to a require/import later or use direct URL
            url: iframeUrl,
            isTopVaz: true
        });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(games, null, 2));
    console.log(`Scraped ${games.length} games to ${OUTPUT_FILE}`);
}

scrape();
