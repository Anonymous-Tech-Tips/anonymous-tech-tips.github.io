const fs = require('fs');
let src = fs.readFileSync('src/data/games.ts', 'utf8');

const remap = {
  'slope': 'Platformer', 'slope-2': 'Platformer', 'tunnel-rush': 'Platformer',
  'vex-3': 'Platformer', 'vex-4': 'Platformer', 'vex-5': 'Platformer',
  'vex-6': 'Platformer', 'vex-7': 'Platformer', 'ovo': 'Platformer',
  'geometry-dash': 'Platformer', 'geometry-dash-meltdown': 'Platformer',
  'geometry-dash-subzero': 'Platformer', 'geometry-dash-world-toxic': 'Platformer',
  'getting-over-it': 'Platformer', 'run-1': 'Platformer', 'run-2': 'Platformer',
  'cluster-rush': 'Platformer', 'fancy-pants-1': 'Platformer', 'fancy-pants-3': 'Platformer',
  'jetpack-joyride': 'Platformer', 'pixel-speedrun': 'Platformer',
  'pixel-bear-adventure': 'Platformer', 'appel': 'Platformer',
  'flappy-bird': 'Platformer', 'flappy-plane': 'Platformer', 'doodle-jump': 'Platformer',
  'stickman-hook': 'Platformer', 'bad-icecream': 'Platformer',
  'bad-icecream-2': 'Platformer', 'bad-icecream-3': 'Platformer',
  'chimney-trouble': 'Platformer', 'just-fall': 'Platformer',
  'square-hero': 'Platformer', 'veloce': 'Platformer', 'temple-run-2': 'Platformer',
  'ede-surf': 'Platformer', 'tanuki-sunset': 'Platformer', 'snow-rider-3d': 'Platformer',
  'avalanche': 'Platformer', 'papery-planes': 'Platformer',
  'bloxorz': 'Puzzle', 'cut-the-rope': 'Puzzle', 'tetris': 'Puzzle',
  'hextris': 'Puzzle', 'hexa-knot': 'Puzzle', 'scalak': 'Puzzle',
  'unloop': 'Puzzle', 'konnekt': 'Puzzle', 'sugar-sugar': 'Puzzle',
  'erase-box': 'Puzzle', 'pixoji': 'Puzzle', 'ricochet-arrow': 'Puzzle',
  'pathfinder': 'Puzzle', 'mirror-wizard': 'Puzzle', 'breaklock': 'Puzzle',
  'hoshi-saga-1': 'Puzzle', 'hoshi-saga-2': 'Puzzle', 'hoshi-saga-3': 'Puzzle',
  'tic-tac-toe': 'Puzzle', 'disaster-will-strike': 'Puzzle', 'portal': 'Puzzle',
  'shape-shifter': 'Puzzle', 'shape-switcher': 'Puzzle', 'water-works': 'Puzzle',
  'world-s-hardest-game': 'Puzzle', 'chroma': 'Puzzle', 'circlo': 'Puzzle',
  'beam': 'Puzzle', 'green': 'Puzzle', 'pink': 'Puzzle', 'orange': 'Puzzle',
  'blue': 'Puzzle', 'jelly-go': 'Puzzle', 'mini-putt-3': 'Puzzle',
  'sand-and-water': 'Puzzle', 'laqueus-escape-chapter-1': 'Puzzle',
  'astray': 'Puzzle', 'little-wheel': 'Puzzle', 'blackholesquare': 'Puzzle',
  'picky-package': 'Puzzle', 'bounceback': 'Puzzle',
  'fnaf': 'Horror', 'fnaf-2': 'Horror', 'fnaf-3': 'Horror', 'fnaf-4': 'Horror',
  'baldis-basics': 'Horror', 'retrohaunt': 'Horror', 'haunt-the-house': 'Horror',
  'goodnight': 'Horror', 'sans': 'Horror', 'the-dark-one': 'Horror',
  'cursed-travels-below': 'Horror', 'cursed-travels-flame': 'Horror',
  'a-grim-chase': 'Horror', 'a-grim-love-tale': 'Horror', 'goodbye-doggy': 'Horror',
  'dogeminer': 'Idle', 'adventure-capitolists': 'Idle', 'space-company': 'Idle',
  'progress-knight': 'Idle', 'trimps': 'Idle', 'a-dark-room': 'Idle',
  'working-stiffs': 'Idle', 'space-garden': 'Idle', 'planet-life': 'Idle',
  'duck-life': 'Idle', 'duck-life-2': 'Idle', 'duck-life-3': 'Idle',
  'monkey-mart': 'Simulation', 'bitlife': 'Simulation', 'terraria': 'Simulation',
  'paper-minecraft': 'Simulation', 'minecraft-1-5-2-eaglercraft': 'Simulation',
  'minekahn': 'Simulation', 'tavern-master': 'Simulation',
  'generic-fishing-game': 'Simulation', 'tiny-fishing': 'Simulation',
  'papas-bakeria': 'Simulation', 'papas-burgeria': 'Simulation',
  'papas-cheeseria': 'Simulation', 'papas-cupcakeria': 'Simulation',
  'papas-donuteria': 'Simulation', 'papas-freezeria': 'Simulation',
  'papas-hotdoggeria': 'Simulation', 'papas-pancakeria': 'Simulation',
  'papas-pasteria': 'Simulation', 'papas-pizzeria': 'Simulation',
  'papas-scooperia': 'Simulation', 'papas-sushiria': 'Simulation',
  'papas-taco-mia': 'Simulation', 'papas-wingeria': 'Simulation',
  'papa-louies-1': 'Simulation',
  '10-minutes-till-dawn': 'Shooter', 'space-invaders': 'Shooter',
  'space-huggers': 'Shooter', 'tactical-weapon-pack': 'Shooter',
  'radius-raid': 'Shooter', 'scrap-meatal-heros': 'Shooter',
  'just-one-boss': 'Shooter', 'evil-glich': 'Shooter',
  'ginogen-arena': 'Shooter', 'asteroids': 'Shooter',
  'asciispace': 'Shooter', 'captain-callisto': 'Shooter',
  'getaway-shootout': 'Shooter', 'xx142-b2exe': 'Shooter',
  'electric-man-2': 'Action', 'strike-force-kitty-1': 'Action',
  'strike-force-kitty-2': 'Action', 'strike-force-kitty-3': 'Action',
  'maptroid': 'Adventure', 'ledegnd-of-zelda-maker': 'Adventure',
  'choppy-orc': 'Adventure', 'bob-the-robber-2': 'Adventure',
  'infiltrating-the-airship': 'Adventure', 'fleeing-the-complex': 'Adventure',
  'stealing-the-diamond': 'Adventure', 'escaping-the-prison': 'Adventure',
  'sabotage': 'Adventure', 'comic-book-cody': 'Adventure',
  'clickventure': 'Adventure', 'clickventure-castaway': 'Adventure',
  'sonny': 'RPG', 'sonny2': 'RPG', 'arcuz': 'RPG', 'knight-errant': 'RPG',
  'rogue-fable': 'RPG', 'pokemon-fire-red': 'RPG', 'drake-and-the-wizards': 'RPG',
  'one-trick-mage': 'RPG',
  'pacman': 'Arcade', 'google-snake': 'Arcade', 'kitten-cannon': 'Arcade',
  'whac-a-mole': 'Arcade', 'eel-slap': 'Arcade', 'interactive-buddy': 'Arcade',
  'pong': 'Arcade', '100-pong': 'Arcade', 'cubefield': 'Arcade',
  'breakout': 'Arcade', 'achievementunlocked': 'Arcade', 'there-is-no-game': 'Arcade',
  'web-retro': 'Arcade', 'retro-speed': 'Arcade', 'p-craft': 'Arcade',
  'digger-main': 'Arcade', 'dinosaur': 'Arcade', 'monke': 'Arcade',
  'cube-miner': 'Arcade',
  'among-us': 'Multiplayer', 'basket-random': 'Multiplayer',
  'bombit-1': 'Multiplayer', 'bombit-2': 'Multiplayer', 'bombit-3': 'Multiplayer',
  'house-of-hazards': 'Multiplayer', 'flat-guys': 'Multiplayer', '1v1-space': 'Multiplayer',
  'kingdom-rush': 'Strategy', 'kingdom-rush-frontie': 'Strategy',
  'ages-of-conflict': 'Strategy', 'bloonstd': 'Strategy',
  'bloonstd-2': 'Strategy', 'bloonstd-4': 'Strategy', 'tabs': 'Strategy',
};

// Split into individual game objects by splitting on opening braces that start a new entry
const lines = src.split(/\r?\n/);
let changed = 0;
let currentId = null;
const result = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const idMatch = line.match(/^\s+"id":\s+"([^"]+)"/);
  if (idMatch) currentId = idMatch[1];

  const newTag = currentId && remap[currentId];
  if (newTag && line.match(/^\s+"Casual",?$/)) {
    result.push(line.replace('"Casual"', `"${newTag}"`));
    changed++;
    currentId = null; // reset after first tag match per game
  } else {
    result.push(line);
  }
}

const out = result.join('\n');
fs.writeFileSync('src/data/games.ts', out);
console.log('Updated', changed, 'games');

// Tag counts
const tags = [...out.matchAll(/"tags":\s*\[([^\]]+)\]/g)]
  .flatMap(m => (m[1].match(/"([^"]+)"/g)||[]).map(t=>t.replace(/"/g,'')));
const counts = {};
tags.forEach(t => counts[t]=(counts[t]||0)+1);
Object.entries(counts).sort((a,b)=>b[1]-a[1]).forEach(([t,c])=>console.log(c,t));
