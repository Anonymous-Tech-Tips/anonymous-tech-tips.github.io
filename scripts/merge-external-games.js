
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import the external data directly
// Note: This relies on the file being a valid JS module.
// If it fails, we might need to read it as text and parse it, but let's try import first.
import strongDogGames from '../strongdogxp/cards-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GAMES_FILE = path.join(__dirname, '../src/data/games.ts');

try {
    let gamesTsContent = fs.readFileSync(GAMES_FILE, 'utf8');
    let updatedCount = 0;
    let addedCount = 0;

    console.log(`Loaded ${strongDogGames.length} games from StrongDogXP.`);

    for (const game of strongDogGames) {
        // Normalize name
        const normName = game.name ? game.name.trim() : '';
        if (!normName) continue;

        // Construct local paths
        // href: "./html/foo/index.html" -> "/strongdog/html/foo/index.html"
        let playUrl = game.href;
        if (playUrl.startsWith('.')) {
            playUrl = '/strongdog' + playUrl.substring(1); // remove '.'
        } else {
            // ensure it starts with /strongdog if not already
            if (!playUrl.startsWith('/strongdog')) {
                playUrl = '/strongdog/' + playUrl;
            }
        }

        // imgSrc: "foo.jpg" -> "/strongdog/img/foo.jpg"
        let thumbnailUrl = game.imgSrc;
        if (!thumbnailUrl.startsWith('/') && !thumbnailUrl.startsWith('http')) {
            thumbnailUrl = '/strongdog/img/' + thumbnailUrl;
        }

        // Find match in games.ts
        const escapedName = normName.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const gameBlockRegex = new RegExp(`({[\\s\\S]*?title:\\s*["']${escapedName}["'][\\s\\S]*?})`, 'i');
        const gameMatch = gamesTsContent.match(gameBlockRegex);

        if (gameMatch) {
            let gameBlock = gameMatch[1];
            let newGameBlock = gameBlock;

            // Update URL
            if (newGameBlock.includes(`url: "`)) {
                newGameBlock = newGameBlock.replace(/url:\s*"[^"]*"/, `url: "${playUrl}"`);
            }

            // Update Thumbnail
            if (newGameBlock.match(/thumbnail:\s*[a-zA-Z0-9_]+,/)) {
                newGameBlock = newGameBlock.replace(/thumbnail:\s*[a-zA-Z0-9_]+,/, `thumbnail: "${thumbnailUrl}",`);
            } else if (newGameBlock.match(/thumbnail:\s*"[^"]*",/)) {
                newGameBlock = newGameBlock.replace(/thumbnail:\s*"[^"]*"/, `thumbnail: "${thumbnailUrl}"`);
            }

            if (gameBlock !== newGameBlock) {
                gamesTsContent = gamesTsContent.replace(gameBlock, newGameBlock);
                console.log(`✅ Updated: ${game.name}`);
                updatedCount++;
            }
        } else {
            // Add new game
            const newId = normName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const newEntry = `
  {
    id: "${newId}",
    title: "${game.name}",
    tags: ["imported", "strongdog"],
    thumbnail: "${thumbnailUrl}",
    url: "${playUrl}",
  },`;

            const lastBracketIndex = gamesTsContent.lastIndexOf('];');
            if (lastBracketIndex !== -1) {
                gamesTsContent = gamesTsContent.slice(0, lastBracketIndex) + newEntry + '\n' + gamesTsContent.slice(lastBracketIndex);
                console.log(`✨ Added: ${game.name}`);
                addedCount++;
            }
        }
    }

    fs.writeFileSync(GAMES_FILE, gamesTsContent, 'utf8');
    console.log(`\n🎉 Done! Updated: ${updatedCount}, Added: ${addedCount}`);

} catch (err) {
    console.error('Error processing:', err);
}
