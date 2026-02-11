
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GAMES_FILE = path.join(__dirname, '../src/data/games.ts');

const content = fs.readFileSync(GAMES_FILE, 'utf-8');

// Split file at the TopVaz section marker
const MARKER = '// --- 📦 TopVaz66 Games (Imported) ---';
const parts = content.split(MARKER);

if (parts.length < 2) {
    console.error('Could not find TopVaz section marker.');
    process.exit(1);
}

const mainPart = parts[0];
const topVazPart = parts[1];

// Helper to extract title and URL from a raw object string
function parseGame(raw) {
    const titleMatch = raw.match(/title:\s*"([^"]+)"/);
    const urlMatch = raw.match(/url:\s*"([^"]+)"/);
    return {
        raw,
        title: titleMatch ? titleMatch[1] : null,
        url: urlMatch ? urlMatch[1] : null
    };
}

// Parse TopVaz Games (One per line usually)
const topVazGames = [];
const topVazLines = topVazPart.trim().split('\n');
const unmatchedTopVazGames = [];
const nativeUrlMap = new Map(); // Normalized Title -> URL

topVazLines.forEach(line => {
    line = line.trim();
    if (line.startsWith('{') && line.endsWith('},')) {
        const game = parseGame(line);
        if (game.title && game.url) {
            topVazGames.push(game);
            nativeUrlMap.set(game.title.toLowerCase().trim(), game.url);
        }
    } else if (line.startsWith('];')) {
        // End of array
    }
});

console.log(`Found ${topVazGames.length} imported TopVaz games.`);

// Process Main Part
// We need to find valid game objects in the main part and update their URLs if a match exists.
// We'll process line by line to preserve structure/comments, detecting object boundaries.

let newMainPart = '';
let buffer = '';
let inObject = false;

const lines = mainPart.split('\n');

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Simple heuristic: Objects in the main list start with `  {` and end with `  },`
    // We are looking to capture the block.

    if (line.trim().startsWith('{')) {
        inObject = true;
        buffer += line + '\n';
    } else if (inObject) {
        buffer += line + '\n';
        if (line.trim().startsWith('},') || line.trim().startsWith('}')) {
            inObject = false;
            // Process the buffered object
            const game = parseGame(buffer);
            if (game.title) {
                const normalizedTitle = game.title.toLowerCase().trim();
                if (nativeUrlMap.has(normalizedTitle)) {
                    console.log(`Merging Native URL for: ${game.title}`);
                    const newUrl = nativeUrlMap.get(normalizedTitle);
                    // Replace URL line
                    buffer = buffer.replace(/url:\s*"[^"]+"/, `url: "${newUrl}"`);
                    // Mark as matched in the map so we don't duplicate it at the end
                    nativeUrlMap.delete(normalizedTitle);
                }
            }
            newMainPart += buffer;
            buffer = '';
        }
    } else {
        newMainPart += line + '\n';
    }
}

// Identify remaining TopVaz games
const remainingGames = topVazGames.filter(g => {
    return nativeUrlMap.has(g.title.toLowerCase().trim());
});

console.log(`${remainingGames.length} new games to append.`);

// Reconstruct file
let output = newMainPart.trimEnd(); // Trim the last newline/comma
// Ensure it ends with a comma if we are appending
if (!output.trim().endsWith(',')) {
    // Check if the last char is '}' inside the array
    // The mainPart was split at the marker, which was inside the array?
    // Let's check the original file content structure around the marker.
    // The marker was: "  // --- 📦 TopVaz66 Games (Imported) ---"
    // It was INSIDE the `games` array.
    // So `mainPart` ends with valid array items (and maybe a comma).
}

output += '\n\n  ' + MARKER + '\n';

remainingGames.forEach(g => {
    output += '  ' + g.raw.trim() + '\n';
});

output += '];\n';

fs.writeFileSync(GAMES_FILE, output);
console.log('Deduplication complete.');
