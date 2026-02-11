
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GAMES_FILE = path.join(__dirname, '../src/data/games.ts');
const TOPVAZ_FILE = path.join(__dirname, '../src/data/topvaz-games.json');

// 1. Read Files
console.log('Reading files...');
let gamesContent = fs.readFileSync(GAMES_FILE, 'utf-8');
const topVazContent = fs.readFileSync(TOPVAZ_FILE, 'utf-8');
// Dedupe TopVaz games: use a Map by title to ensure uniqueness
const topVazGames = new Map();
JSON.parse(topVazContent).forEach(g => {
    topVazGames.set(g.title.toLowerCase().trim(), g);
});

// Helper Regex
const urlRegex = /url:\s*"([^"]+)"/;

// 2. Update Native Games with Local URLs
// We scan the IDs/Titles in gamesContent and update their URLs if we match a TopVaz game.
console.log('Updating URLs...');

// We'll use a regex to find game blocks to be safe?
// Actually, simple string replacement for URLs might be safer if titles are unique.
// But titles in code might be `title: "Slope"`.

let updatedCount = 0;
for (const [title, game] of topVazGames) {
    // Look for this title in the file
    // escape regex special chars in title
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Regex: title: "Slope", ... url: "..."
    // We want to replace the URL associated with this title.
    // This is hard with regex globally. 

    // Alternative: We match the specific line `title: "Slope"` and then find the nearest `url:`?
    // Doing it simple: We know the blocked domains.
    // We only care about updating Native games that point to external.
}

// Better approach:
// 1. Replace ALL known external URLs with Local URLs if they match titles.
// 2. Tag ANY remaining external URLs as blocked.

// Strategy:
// Match objects: { ... }
// We can use a regex loop to find objects.
const objectRegex = /{\s*id:[\s\S]*?}/g;

gamesContent = gamesContent.replace(objectRegex, (match) => {
    // check title
    const titleMatch = match.match(/title:\s*"([^"]+)"/);
    if (!titleMatch) return match;

    const title = titleMatch[1];
    const normalizedTitle = title.toLowerCase().trim();
    const urlMatch = match.match(/url:\s*"([^"]+)"/);

    if (!urlMatch) return match;
    const currentUrl = urlMatch[1];

    // A. Update URL & Thumbnail
    if (topVazGames.has(normalizedTitle)) {
        const localGame = topVazGames.get(normalizedTitle);

        // Update URL
        if (currentUrl !== localGame.url) {
            match = match.replace(urlRegex, `url: "${localGame.url}"`);
            console.log(`✅ Updated URL: ${title}`);
        }

        // Update Thumbnail (Use TopVaz one)
        // Check if thumbnail line exists
        const thumbMatch = match.match(/thumbnail:\s*[^,\n]+/);
        if (thumbMatch) {
            match = match.replace(/thumbnail:\s*[^,\n]+/, `thumbnail: "${localGame.thumbnail}"`);
            console.log(`🖼️ Updated Thumbnail: ${title}`);
        } else {
            // Insert thumbnail before URL
            match = match.replace(/url:/, `thumbnail: "${localGame.thumbnail}",\n    url:`);
            console.log(`🖼️ Added Thumbnail: ${title}`);
        }

        // Remove from map to track what's left
        topVazGames.delete(normalizedTitle);
    }

    // B. Check Blocked
    // Re-check URL in case we updated it
    const newUrlMatch = match.match(/url:\s*"([^"]+)"/);
    const newUrl = newUrlMatch ? newUrlMatch[1] : currentUrl;

    if (newUrl.includes('github.io') || newUrl.includes('poki.com') || newUrl.includes('crazygames')) {
        if (!match.includes('"blocked"')) {
            // Add blocked tag
            match = match.replace(/tags:\s*\[/, 'tags: ["blocked", ');
            console.log(`🚫 Blocked: ${title}`);
        }
    }

    return match;
});

// 3. Append New Games
console.log(`Appending ${topVazGames.size} new games...`);

// Find the end of the array
const arrayEndRegex = /];\s*$/;
if (gamesContent.trim().endsWith('];')) {
    let newEntries = '\n  // --- 📦 New Local Games ---\n';

    for (const [title, game] of topVazGames) {
        const id = title.replace(/[^a-z0-9]+/g, '-');
        newEntries += `  {
    id: "${id}",
    title: "${game.title}",
    tags: ["imported", "local"],
    url: "${game.url}"
  },\n`;
    }

    // Insert before the last ];
    const lastBracketIndex = gamesContent.lastIndexOf('];');
    if (lastBracketIndex !== -1) {
        gamesContent = gamesContent.substring(0, lastBracketIndex) + newEntries + '];\n';
    }
} else {
    console.error("Could not find end of games array!");
}

fs.writeFileSync(GAMES_FILE, gamesContent);
console.log('Fixed library.');

// Helper Regex

