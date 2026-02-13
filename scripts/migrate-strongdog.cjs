
const fs = require('fs');
const path = require('path');

const STRONGDOG_BASE = path.join(process.cwd(), 'strongdogxp');
const CARDS_DATA_PATH = path.join(STRONGDOG_BASE, 'cards-data.js');
const GAMES_TS_PATH = path.join(process.cwd(), 'src/data/games.ts');
const PUBLIC_GAMES_DIR = path.join(process.cwd(), 'public/games');

async function migrate() {
    console.log('Reading cards-data.js...');
    let rawData = fs.readFileSync(CARDS_DATA_PATH, 'utf8');

    // Simple extraction of the array content
    const arrayStart = rawData.indexOf('[');
    const arrayEnd = rawData.lastIndexOf(']');

    if (arrayStart === -1 || arrayEnd === -1) {
        console.error('Could not parse cards-data.js array');
        process.exit(1);
    }

    const arrayStr = rawData.substring(arrayStart, arrayEnd + 1);
    let gamesList;
    try {
        // Safe evaluation since it's just data
        gamesList = eval(arrayStr);
    } catch (e) {
        console.error('Error parsing array:', e);
        process.exit(1);
    }

    console.log(`Found ${gamesList.length} games to process.`);

    const newGames = [];
    const missingClean = [];

    for (const game of gamesList) {
        const { href, imgSrc, name } = game;

        let finalUrl = '';
        let type = 'html'; // Default

        // ID Generation
        const id = name.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        // Handle HTML Games
        if (href.includes('/html/')) {
            type = 'html';
            // Extract the potential game name from path
            // e.g. ./html/free kick classic/index.html -> free kick classic
            const parts = href.split('/html/')[1].split('/');
            const gameDirName = parts[0];

            // Check for clean /game/index.html
            const cleanPathLocal = path.join(PUBLIC_GAMES_DIR, 'html', gameDirName, 'game', 'index.html');
            const cleanUrl = `/games/html/${gameDirName}/game/index.html`;

            if (fs.existsSync(cleanPathLocal)) {
                finalUrl = cleanUrl;
            } else {
                // Check if it points deeper already (e.g. /html/Appel/game/Appel.html)
                // Use the href directly but mapped to /games/html
                const relativePath = href.replace(/^\.\/html\//, '');
                const directPathLocal = path.join(PUBLIC_GAMES_DIR, 'html', relativePath);

                if (fs.existsSync(directPathLocal)) {
                    finalUrl = `/games/html/${relativePath}`;
                } else {
                    // Fallback to wrapper if it exists (though undesired)
                    const wrapperPathLocal = path.join(PUBLIC_GAMES_DIR, 'html', gameDirName, 'index.html');
                    if (fs.existsSync(wrapperPathLocal)) {
                        finalUrl = `/games/html/${gameDirName}/index.html`;
                        missingClean.push(name);
                    }
                }
            }
        }

        // Handle SWF Games
        else if (href.includes('/swf/')) {
            type = 'flash';
            const parts = href.split('/swf/')[1].split('/');
            const gameDirName = parts[0];

            // Check for clean /game/base.html
            const cleanPathLocal = path.join(PUBLIC_GAMES_DIR, 'swf', gameDirName, 'game', 'base.html');
            const cleanUrl = `/games/swf/${gameDirName}/game/base.html`;

            if (fs.existsSync(cleanPathLocal)) {
                finalUrl = cleanUrl;
            } else {
                // Fallback to wrapper
                const wrapperPathLocal = path.join(PUBLIC_GAMES_DIR, 'swf', gameDirName, 'base.html');
                if (fs.existsSync(wrapperPathLocal)) {
                    finalUrl = `/games/swf/${gameDirName}/base.html`;
                    missingClean.push(name);
                }
            }
        }

        // Handle Image
        let finalImg = '/fallback.png';
        if (imgSrc) {
            // Images are in strongdogxp/img/ -> public/games/img/
            // imgSrc might be just filename or path
            const imgName = path.basename(imgSrc);
            finalImg = `/games/img/${imgName}`;
        }

        // Categorization Logic
        const lowerName = name.toLowerCase();

        let tags = [];
        // Default tags
        if (!tags.includes(type)) tags.push(type);

        const keywords = {
            'Action': ['shooter', 'gun', 'fight', 'war', 'battle', 'kill', 'sniper', 'zombie', 'alien', 'tank', 'combat', 'smash', 'brawl', 'ninja', 'sword', 'attack'],
            'Arcade': ['pacman', 'tetris', 'pong', 'breakout', 'snake', 'space', 'retro', 'classic', 'jump', 'run', 'dash', 'flappy', 'doodle', 'helix', 'stack', 'fall'],
            'Driving': ['car', 'race', 'racing', 'moto', 'bike', 'drive', 'drift', 'parking', 'truck', 'bus', 'kart', 'road', 'driver'],
            'Sports': ['soccer', 'football', 'basketball', 'tennis', 'golf', 'pool', 'billiard', 'sport', 'ball', 'bowl', 'skate', 'hockey', 'cricket'],
            'Puzzle': ['2048', 'candy', 'jewel', 'match', 'puzzle', 'logic', 'brain', 'quiz', 'trivia', 'word', 'sudoku', 'chess', 'solitaire', 'card', 'stack', 'connect'],
            'Strategy': ['tower', 'defense', 'idle', 'tycoon', 'empire', 'civ', 'strategy', 'rts', 'farm', 'sim', 'simulator', 'clicker', 'growth', 'evolve'],
            'Multiplayer': ['io', 'multiplayer', '2 player', 'online', 'pvp', 'mmo'],
            'Platformer': ['mario', 'sonic', 'platform', 'level', 'adventure', 'bros', 'boy', 'girl', 'explorer']
        };

        for (const [category, words] of Object.entries(keywords)) {
            if (words.some(word => lowerName.includes(word))) {
                if (!tags.includes(category)) tags.push(category);
            }
        }

        // Fallback for uncategorized
        if (tags.length === 1 && (tags[0] === 'html' || tags[0] === 'flash')) {
            tags.push('Casual');
        }

        if (finalUrl) {
            newGames.push({
                id,
                title: name,
                tags: tags,
                thumbnail: finalImg,
                url: finalUrl
            });
        }
    }

    const tsOutput = `import { Game } from "./types";
export type { Game };

export const games: Game[] = ${JSON.stringify(newGames, null, 2)};
`;

    fs.writeFileSync(GAMES_TS_PATH, tsOutput);
    console.log(`Migrated ${newGames.length} games.`);

    if (missingClean.length > 0) {
        console.log(`\nNote: ${missingClean.length} games are using wrappers (clean path not found).`);
        console.log('Examples:', missingClean.slice(0, 5));
    }
}

migrate();
