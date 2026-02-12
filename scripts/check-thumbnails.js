
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GAMES_FILE = path.join(__dirname, '../src/data/games.ts');
const PUBLIC_DIR = path.join(__dirname, '../public');
const ASSETS_DIR = path.join(__dirname, '../src/assets/thumbnails');

function check() {
    const gamesTsContent = fs.readFileSync(GAMES_FILE, 'utf8');

    // 1. Check imports
    const importRegex = /import\s+\w+\s+from\s+"@\/assets\/thumbnails\/([^"]+)"/g;
    let match;
    console.log('--- Checking Imports ---');
    while ((match = importRegex.exec(gamesTsContent)) !== null) {
        const fileName = match[1];
        const filePath = path.join(ASSETS_DIR, fileName);
        if (!fs.existsSync(filePath)) {
            console.warn(`❌ Missing import asset: ${fileName}`);
        }
    }

    // 2. Check string paths
    const pathRegex = /thumbnail:\s*"(\/[^"]+)"/g;
    console.log('\n--- Checking String Paths ---');
    const missingPaths = new Set();
    while ((match = pathRegex.exec(gamesTsContent)) !== null) {
        const relPath = match[1];
        const filePath = path.join(PUBLIC_DIR, relPath);
        if (!fs.existsSync(filePath)) {
            missingPaths.add(relPath);
        }
    }

    missingPaths.forEach(p => console.warn(`❌ Missing public asset: ${p}`));
    console.log(`\nFound ${missingPaths.size} missing public assets.`);
}

check();
