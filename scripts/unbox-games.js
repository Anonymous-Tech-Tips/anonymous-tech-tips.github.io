
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STRONGDOG_DIR = path.join(__dirname, '../public/strongdog/html');
const GAMES_FILE = path.join(__dirname, '../src/data/games.ts');

function unbox() {
    if (!fs.existsSync(STRONGDOG_DIR)) {
        console.error('StrongDog directory not found:', STRONGDOG_DIR);
        return;
    }

    let gamesTsContent = fs.readFileSync(GAMES_FILE, 'utf8');
    let unboxedCount = 0;

    // We only care about games that point to a .html file in strongdog
    const strongDogHtmlRegex = /url:\s*"(\/strongdog\/html\/[^"]+\.html)"/g;
    let match;

    while ((match = strongDogHtmlRegex.exec(gamesTsContent)) !== null) {
        const relativeUrl = match[1];
        const filePath = path.join(__dirname, '..', 'public', relativeUrl);

        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8').trim();

            // Look for a single iframe pattern
            // Example: <iframe ... src="https://..." ...></iframe>
            const iframeMatch = content.match(/<iframe[^>]+src=["'](https?:\/\/[^"']+)["'][^>]*><\/iframe>/i);

            if (iframeMatch) {
                const actualUrl = iframeMatch[1];
                console.log(`📦 Unboxing: ${relativeUrl} -> ${actualUrl}`);

                // Replace the local URL with the actual URL in games.ts content
                // We use a more specific replacement to avoid global issues
                const targetLine = match[0];
                const newLine = `url: "${actualUrl}"`;
                gamesTsContent = gamesTsContent.replace(targetLine, newLine);
                unboxedCount++;
            }
        }
    }

    if (unboxedCount > 0) {
        fs.writeFileSync(GAMES_FILE, gamesTsContent, 'utf8');
        console.log(`\n🎉 Success! Unboxed ${unboxedCount} games in games.ts`);
    } else {
        console.log('\nNo games found to unbox.');
    }
}

unbox();
