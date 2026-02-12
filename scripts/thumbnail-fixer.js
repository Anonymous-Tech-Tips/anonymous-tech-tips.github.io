
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GAMES_FILE = path.join(__dirname, '../src/data/games.ts');
const PUBLIC_DIR = path.join(__dirname, '../public');
const ASSETS_DIR = path.join(__dirname, '../src/assets/thumbnails');

function fix() {
    let gamesTsContent = fs.readFileSync(GAMES_FILE, 'utf8');
    let fixCount = 0;

    // 1. Fix missing public assets by removing the thumbnail property so it uses the component-level fallback
    const thumbnailRegex = /thumbnail:\s*"(\/[^"]+)"/g;
    let match;
    const missingPaths = [];

    // We do multiple passes or collect matches carefully
    while ((match = thumbnailRegex.exec(gamesTsContent)) !== null) {
        const relPath = match[1];
        const filePath = path.join(PUBLIC_DIR, relPath);
        if (!fs.existsSync(filePath)) {
            missingPaths.push(match[0]);
        }
    }

    missingPaths.forEach(target => {
        // Instead of deleting, let's point to /fallback.png since that's safer for the build
        gamesTsContent = gamesTsContent.replace(target, 'thumbnail: "/fallback.png"');
        fixCount++;
    });

    // 2. Fix broken imports (if any)
    const importRegex = /import\s+(\w+)\s+from\s+"@\/assets\/thumbnails\/([^"]+)"/g;
    while ((match = importRegex.exec(gamesTsContent)) !== null) {
        const fileName = match[1];
        const assetFile = match[2];
        const filePath = path.join(ASSETS_DIR, assetFile);
        if (!fs.existsSync(filePath)) {
            console.warn(`⚠️ Broken import found: ${assetFile}. Attempting to use fallback.`);
            // Replace the import with a dummy line that points to fallback
            const targetLine = match[0];
            const newLine = `import ${fileName} from "@/assets/thumbnails/_fallback.png"`;
            gamesTsContent = gamesTsContent.replace(targetLine, newLine);
            fixCount++;
        }
    }

    if (fixCount > 0) {
        fs.writeFileSync(GAMES_FILE, gamesTsContent, 'utf8');
        console.log(`✅ Fixed ${fixCount} thumbnail issues in games.ts`);
    } else {
        console.log('No thumbnail issues found to fix.');
    }
}

fix();
