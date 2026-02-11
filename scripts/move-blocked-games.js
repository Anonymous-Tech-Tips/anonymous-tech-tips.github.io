
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GAMES_FILE = path.join(__dirname, '../src/data/games.ts');

const content = fs.readFileSync(GAMES_FILE, 'utf-8');

const blockedIds = [
    "retro-bowl",
    "1v1-lol",
    "subway-surfers",
    "super-mario-bros",
    "bitlife",
    "eggy-car"
];

// Split file into lines
const lines = content.split('\n');
const newLines = [];
const blockedGames = [];

let inObject = false;
let currentObjectLines = [];
let currentBuffer = "";

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for object start
    if (line.trim().startsWith('{')) {
        inObject = true;
        currentObjectLines = [line];
        currentBuffer = line;
    } else if (inObject) {
        currentObjectLines.push(line);
        currentBuffer += "\n" + line;

        // Check for object end
        if (line.trim().startsWith('},') || line.trim().startsWith('}')) {
            inObject = false;

            // Analyze the object
            let isBlocked = false;
            for (const id of blockedIds) {
                if (currentBuffer.includes(`id: "${id}"`)) {
                    isBlocked = true;
                    break;
                }
            }

            if (isBlocked) {
                // Add "blocked" tag
                let modifiedBuffer = currentBuffer.replace(/tags: \[(.*?)\]/, (match, group1) => {
                    if (group1.includes('"blocked"')) return match;
                    return `tags: ["blocked", ${group1}]`;
                });

                // Keep it for later
                blockedGames.push(modifiedBuffer);
            } else {
                // Keep it in place
                newLines.push(...currentObjectLines);
            }

            currentObjectLines = [];
            currentBuffer = "";
        }
    } else {
        // Just a normal line (comments, exports, etc)
        // If it's the end of array, we pause to insert blocked games
        if (line.trim().startsWith('];')) {
            // Do not add it yet
        } else {
            newLines.push(line);
        }
    }
}

// Reconstruct
let output = newLines.join('\n');

// Ensure we are inside the array before closing
if (output.trim().endsWith(',')) {
    // fine
}

output += '\n\n  // --- 🚫 Blocked Games (External / Broken) ---\n';

blockedGames.forEach(gameBlock => {
    output += gameBlock + '\n';
});

output += '];\n';

fs.writeFileSync(GAMES_FILE, output);
console.log(`Moved ${blockedGames.length} blocked games.`);
