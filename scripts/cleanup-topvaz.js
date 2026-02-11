
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOPVAZ_DIR = path.join(__dirname, '../public/topvaz66');

if (!fs.existsSync(TOPVAZ_DIR)) {
    console.error('TopVaz directory not found!');
    process.exit(1);
}

// Folders to KEEP
const KEEP_FOLDERS = ['source', 'img', 'js', 'css', 'images', 'poki-sdk.js', 'cloak.js', 'UnityLoader.js', 'loader.js'];

// Get all items in directory
const items = fs.readdirSync(TOPVAZ_DIR);

items.forEach(item => {
    const itemPath = path.join(TOPVAZ_DIR, item);
    const isDir = fs.statSync(itemPath).isDirectory();

    if (KEEP_FOLDERS.includes(item)) {
        console.log(`✅ Keeping: ${item}`);
        return;
    }

    console.log(`🗑️ Deleting: ${item}`);
    if (isDir) {
        fs.rmSync(itemPath, { recursive: true, force: true });
    } else {
        fs.unlinkSync(itemPath);
    }
});

console.log('Cleanup complete.');
