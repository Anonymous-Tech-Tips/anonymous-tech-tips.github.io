import { Game } from "./types";
import { resolveAssetUrl } from "@/utils/assetUrl";
export type { Game };

const rawGames: Game[] = [
  {
    "id": "slope",
    "title": "Slope",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/slope.webp",
    "url": "/games/html/slope/game/index.html"
  },
  {
    "id": "retro-bowl",
    "title": "Retro Bowl",
    "tags": [
      "Casual",
      "Sports"
    ],
    "thumbnail": "/games/img/retrobowl.webp",
    "url": "/games/html/retrobowl/game/index.html"
  },
  {
    "id": "fnaf",
    "title": "FNAF",
    "tags": [
      "Horror"
    ],
    "thumbnail": "/games/img/fnaf.webp",
    "url": "/games/html/fnaf/game/index.html"
  },
  {
    "id": "fnaf-2",
    "title": "FNAF 2",
    "tags": [
      "Horror"
    ],
    "thumbnail": "/games/img/fnaf.webp",
    "url": "/games/html/fnaf2/game/index.html"
  },
  {
    "id": "fnaf-3",
    "title": "Fnaf 3",
    "tags": [
      "Horror"
    ],
    "thumbnail": "/games/img/fnaf.webp",
    "url": "/games/html/fnaf3/game/index.html"
  },
  {
    "id": "fnaf-4",
    "title": "Fnaf 4",
    "tags": [
      "Horror"
    ],
    "thumbnail": "/games/img/fnaf.webp",
    "url": "/games/html/fnaf4/game/index.html"
  },
  {
    "id": "bitlife",
    "title": "Bitlife",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/bitlife.jpg",
    "url": "/games/html/bitlife/game/index.html"
  },
  {
    "id": "geometry-dash",
    "title": "Geometry Dash",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/dash.png",
    "url": "/games/html/Geometry Dash v1/game/Geometry Dash v1.html"
  },
  {
    "id": "tunnel-rush",
    "title": "Tunnel Rush",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/tunnelrush.webp",
    "url": "/games/html/tunnelrush/game/index.html"
  },
  {
    "id": "drift-boss",
    "title": "Drift Boss",
    "tags": [
      "Racing"
    ],
    "thumbnail": "/games/img/drift-boss.png",
    "url": "/games/html/drift-boss/game/index.html"
  },
  {
    "id": "drive-mad",
    "title": "Drive Mad",
    "tags": [
      "Racing"
    ],
    "thumbnail": "/games/img/drivemad.jpg",
    "url": "/games/html/drive-mad/game/index.html"
  },
  {
    "id": "temple-run-2",
    "title": "Temple Run 2",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/templerun.webp",
    "url": "/games/html/temple-run-2/game/index.html"
  },
  {
    "id": "moto-x3m",
    "title": "Moto X3m",
    "tags": [
      "Racing"
    ],
    "thumbnail": "/games/img/motox3m.webp",
    "url": "/games/html/motox3m/game/index.html"
  },
  {
    "id": "basketball-stars",
    "title": "Basketball Stars",
    "tags": [
      "Sports"
    ],
    "thumbnail": "/games/img/BAS.webp",
    "url": "/games/html/basketball-stars/game/index.html"
  },
  {
    "id": "soccer-random",
    "title": "Soccer Random",
    "tags": [
      "Sports"
    ],
    "thumbnail": "/games/img/Soccor Random.avif",
    "url": "/games/html/Soccer Random/game/index.html"
  },
  {
    "id": "bloxorz",
    "title": "Bloxorz",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/Bloxorz.png",
    "url": "/games/html/Bloxorz/game/index.html"
  },
  {
    "id": "idle-breakout",
    "title": "Idle Breakout",
    "tags": [
      "Casual",
      "Strategy"
    ],
    "thumbnail": "/games/img/idlebreakout.webp",
    "url": "/games/html/idle-breakout/game/index.html"
  },
  {
    "id": "cookie-clicker",
    "title": "Cookie Clicker",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/cookie.png",
    "url": "/games/html/cookieclicker/game/index.html"
  },
  {
    "id": "super-mario-64",
    "title": "Super Mario 64",
    "tags": [
      "Multiplayer"
    ],
    "thumbnail": "/games/img/sm64.jpg",
    "url": "/games/html/sm64/game/index.html"
  },
  {
    "id": "among-us",
    "title": "Among Us",
    "tags": [
      "Multiplayer"
    ],
    "thumbnail": "/games/img/amongus.png",
    "url": "/games/html/among-us/game/index.html"
  },
  {
    "id": "stickman-hook",
    "title": "Stickman Hook",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/stickmanhook.jpg",
    "url": "/games/html/stickman-hook/game/index.html"
  },
  {
    "id": "vex-3",
    "title": "Vex 3",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/vex3.webp",
    "url": "/games/html/vex3/game/index.html"
  },
  {
    "id": "vex-4",
    "title": "Vex 4",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/vex4.webp",
    "url": "/games/html/vex4/game/index.html"
  },
  {
    "id": "vex-5",
    "title": "Vex 5",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/vex5.webp",
    "url": "/games/html/vex5/game/index.html"
  },
  {
    "id": "vex-6",
    "title": "Vex 6",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/vex6.webp",
    "url": "/games/html/vex6/game/index.html"
  },
  {
    "id": "vex-7",
    "title": "Vex 7",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/vex7.webp",
    "url": "/games/html/vex7/game/index.html"
  },
  {
    "id": "ovo",
    "title": "Ovo",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/ovo.png",
    "url": "/games/html/ovo/game/index.html"
  },
  {
    "id": "2048",
    "title": "2048",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/2048.png",
    "url": "/games/html/2048-master/game/2048-master/index.html"
  },
  {
    "id": "getaway-shootout",
    "title": "Getaway Shootout",
    "tags": [
      "Shooter"
    ],
    "thumbnail": "/games/img/getaway-shootout.jfif",
    "url": "/games/html/getaway shootout/game/index.html"
  },
  {
    "id": "rooftop-snipers",
    "title": "Rooftop Snipers",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/Rooftop-Snipers.webp",
    "url": "/games/html/rooftop-snipers-2/game/index.html"
  },
  {
    "id": "10-minutes-till-dawn",
    "title": "10 Minutes Till Dawn",
    "tags": [
      "Shooter"
    ],
    "thumbnail": "/games/img/10m.webp",
    "url": "/games/html/10-minutes-till-dawn/game/index.html"
  },
  {
    "id": "100-pong",
    "title": "100 Pong",
    "tags": [
      "Arcade"
    ],
    "thumbnail": "/games/img/100pong.webp",
    "url": "/games/html/100-player-pong/game/index.html"
  },
  {
    "id": "2048-multitask",
    "title": "2048 Multitask",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/multit.webp",
    "url": "/games/html/2048-multitask/game/index.html"
  },
  {
    "id": "3-pandas-1",
    "title": "3 Pandas 1",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/pandas1.jpeg",
    "url": "/games/swf/pandas1/game/base.html"
  },
  {
    "id": "9007199254740992",
    "title": "9007199254740992",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/900.webp",
    "url": "/games/html/9007199254740992/game/index.html"
  },
  {
    "id": "a-dark-room",
    "title": "A Dark Room",
    "tags": [
      "Idle"
    ],
    "thumbnail": "/games/img/adarkroom.png",
    "url": "/games/html/adarkroom/game/index.html"
  },
  {
    "id": "a-grim-chase",
    "title": "A Grim Chase",
    "tags": [
      "Horror"
    ],
    "thumbnail": "/games/img/a grim chase.jpg",
    "url": "/games/html/a grim chase/game/index.html"
  },
  {
    "id": "a-grim-love-tale",
    "title": "A Grim Love Tale",
    "tags": [
      "Horror"
    ],
    "thumbnail": "/games/img/a grim love tale.jpg",
    "url": "/games/html/a grim love tale/game/index.html"
  },
  {
    "id": "achievementunlocked",
    "title": "Achievementunlocked",
    "tags": [
      "Arcade"
    ],
    "thumbnail": "/games/img/ache.webp",
    "url": "/games/html/achievementunlocked/game/index.html"
  },
  {
    "id": "adventure-capitolists",
    "title": "Adventure Capitolists",
    "tags": [
      "Idle"
    ],
    "thumbnail": "/games/img/capitolist.jpeg",
    "url": "/games/html/catpitolists/index.html"
  },
  {
    "id": "age-of-war",
    "title": "Age Of War",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/age of war.jpg",
    "url": "/games/swf/age of war/game/base.html"
  },
  {
    "id": "ages-of-conflict",
    "title": "Ages Of Conflict",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/ages-of-conflict.webp",
    "url": "/games/html/ages-of-conflict/game/index.html"
  },
  {
    "id": "algaes-escapade",
    "title": "Algaes Escapade",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/apple-touch-icon-114x114.png",
    "url": "/games/html/algaes-escapade/game/index.html"
  },
  {
    "id": "alien-hominid",
    "title": "Alien Hominid",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/alienhominid.webp",
    "url": "/games/html/alienhominid/game/index.html"
  },
  {
    "id": "alien-invasion",
    "title": "Alien Invasion",
    "tags": [
      "Action",
      "Multiplayer"
    ],
    "thumbnail": "/games/img/alien.png",
    "url": "/games/html/Alien Invasion/game/index.html"
  },
  {
    "id": "alien-theif",
    "title": "Alien Theif",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/alienthief.jpg",
    "url": "/games/swf/alienthief/game/base.html"
  },
  {
    "id": "amidst-the-clouds",
    "title": "Amidst The Clouds",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/amidst-the-clouds.webp",
    "url": "/games/html/amidst-the-clouds/game/index.html"
  },
  {
    "id": "ant-art-tycoon",
    "title": "Ant Art Tycoon",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/ant art tycoon.png",
    "url": "/games/html/ant art tycoon/game/index.html"
  },
  {
    "id": "appel",
    "title": "Appel",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/appel.png",
    "url": "/games/html/Appel/game/Appel.html"
  },
  {
    "id": "arcade-wizard",
    "title": "Arcade Wizard",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/arcade wizard.png",
    "url": "/games/html/arcade wizard/game/index.html"
  },
  {
    "id": "arcuz",
    "title": "Arcuz",
    "tags": [
      "RPG"
    ],
    "thumbnail": "/games/img/arcuz.jpg",
    "url": "/games/swf/arcuz/game/base.html"
  },
  {
    "id": "asciispace",
    "title": "Asciispace",
    "tags": [
      "Shooter"
    ],
    "thumbnail": "/games/img/asciispace.png",
    "url": "/games/html/asciispace/game/index.html"
  },
  {
    "id": "aspiring-artist",
    "title": "Aspiring Artist",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/aspiring artist.webp",
    "url": "/games/html/aspiring artist/game/index.html"
  },
  {
    "id": "asteroids",
    "title": "Asteroids",
    "tags": [
      "Shooter"
    ],
    "thumbnail": "/games/img/asteroids.png",
    "url": "/games/html/asteroids/game/index.html"
  },
  {
    "id": "astray",
    "title": "Astray",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/astray.png",
    "url": "/games/html/astray/game/index.html"
  },
  {
    "id": "avalanche",
    "title": "Avalanche",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/avalanche.webp",
    "url": "/games/html/avalanche/game/index.html"
  },
  {
    "id": "babel-tower",
    "title": "Babel Tower",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/babel tower.jpg",
    "url": "/games/html/babel tower/game/index.html"
  },
  {
    "id": "baldis-basics",
    "title": "Baldis Basics",
    "tags": [
      "Horror"
    ],
    "thumbnail": "/games/img/baldis-basics.webp",
    "url": "/games/html/baldis-basics/game/index.html"
  },
  {
    "id": "ball-platformer",
    "title": "Ball Platformer",
    "tags": [
      "Sports"
    ],
    "thumbnail": "/games/img/ball platformer.png",
    "url": "/games/html/ball platformer/game/ball platformer.html"
  },
  {
    "id": "ballhop",
    "title": "Ballhop",
    "tags": [
      "Sports"
    ],
    "thumbnail": "/games/img/ballhop.webp",
    "url": "/games/html/ball-hop/game/index.html"
  },
  {
    "id": "ballistic-chickens",
    "title": "Ballistic Chickens",
    "tags": [
      "Sports"
    ],
    "thumbnail": "/games/img/ballistic-chickens.webp",
    "url": "/games/html/ballistic-chickens/game/index.html"
  },
  {
    "id": "basket-random",
    "title": "Basket Random",
    "tags": [
      "Multiplayer"
    ],
    "thumbnail": "/games/img/Basket Random.jpg",
    "url": "/games/html/Basket Random/game/index.html"
  },
  {
    "id": "beam",
    "title": "Beam",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/beam.png",
    "url": "/games/html/beam/game/index.html"
  },
  {
    "id": "big-tower-tiny-square",
    "title": "Big Tower Tiny Square",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/btts.webp",
    "url": "/games/html/big-tower-tiny-square/game/index.html"
  },
  {
    "id": "blackholesquare",
    "title": "Blackholesquare",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/BlackHoleSquare.png",
    "url": "/games/html/blackholesquare/game/index.html"
  },
  {
    "id": "bloonstd",
    "title": "Bloonstd",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/bloonstd.webp",
    "url": "/games/html/bloonstd/game/index.html"
  },
  {
    "id": "bloonstd-2",
    "title": "Bloonstd 2",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/bloonstd2.webp",
    "url": "/games/html/bloonstd2/game/index.html"
  },
  {
    "id": "bloonstd-4",
    "title": "Bloonstd 4",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/bloonstd4.webp",
    "url": "/games/html/bloonstd4/game/index.html"
  },
  {
    "id": "blue",
    "title": "Blue",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/blue.png",
    "url": "/games/html/blue/game/index.html"
  },
  {
    "id": "bob-the-robber-2",
    "title": "Bob The Robber 2",
    "tags": [
      "Adventure"
    ],
    "thumbnail": "/games/img/bob.jpeg",
    "url": "/games/html/bob-the-robber-2/game/index.html"
  },
  {
    "id": "bombit-1",
    "title": "Bombit 1",
    "tags": [
      "Multiplayer"
    ],
    "thumbnail": "/games/img/bombit.jpeg",
    "url": "/games/swf/bombit/game/base.html"
  },
  {
    "id": "bombit-2",
    "title": "Bombit 2",
    "tags": [
      "Multiplayer"
    ],
    "thumbnail": "/games/img/bombit2.jpeg",
    "url": "/games/swf/bombit2/game/base.html"
  },
  {
    "id": "bombit-3",
    "title": "Bombit 3",
    "tags": [
      "Multiplayer"
    ],
    "thumbnail": "/games/img/bombit3.jpg",
    "url": "/games/swf/bombit3/game/base.html"
  },
  {
    "id": "bounceback",
    "title": "Bounceback",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/bounceback.png",
    "url": "/games/html/bounceback/game/index.html"
  },
  {
    "id": "boxing",
    "title": "Boxing",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/box.webp",
    "url": "/games/html/boxing-physics/game/index.html"
  },
  {
    "id": "breaking-the-bank",
    "title": "Breaking The Bank",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/breaking the bank.jpg",
    "url": "/games/swf/breaking the bank/game/base.html"
  },
  {
    "id": "breaklock",
    "title": "Breaklock",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/breaklock.png",
    "url": "/games/html/breaklock/game/index.html"
  },
  {
    "id": "breakout",
    "title": "Breakout",
    "tags": [
      "Arcade"
    ],
    "thumbnail": "/games/img/breakout.png",
    "url": "/games/html/breakout/game/index.html"
  },
  {
    "id": "breakout",
    "title": "Breakout",
    "tags": [
      "Arcade"
    ],
    "thumbnail": "/games/img/breakout.webp",
    "url": "/games/html/breakout/game/index.html"
  },
  {
    "id": "bubble-scratch",
    "title": "Bubble Scratch",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/bubble scratch.png",
    "url": "/games/html/Bubble Scratch/game/Bubble Scratch.html"
  },
  {
    "id": "bunnies-carrot",
    "title": "Bunnies Carrot",
    "tags": [
      "Racing"
    ],
    "thumbnail": "/games/img/bunnies carrot.jpg",
    "url": "/games/html/bunnies carrot/game/index.html"
  },
  {
    "id": "captain-callisto",
    "title": "Captain Callisto",
    "tags": [
      "Shooter"
    ],
    "thumbnail": "/games/img/capain.png",
    "url": "/games/html/captaincallisto/game/index.html"
  },
  {
    "id": "cat-house",
    "title": "Cat House",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/cat house.avif",
    "url": "/games/html/cat house/game/index.html"
  },
  {
    "id": "cataractae",
    "title": "Cataractae",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/cataractae.jpg",
    "url": "/games/html/cataractae/game/index.html"
  },
  {
    "id": "checkpoint",
    "title": "Checkpoint",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/checkpoint.jpg",
    "url": "/games/swf/checkpoint/game/base.html"
  },
  {
    "id": "chess",
    "title": "Chess",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/chess.png",
    "url": "/games/html/chess/game/index.html"
  },
  {
    "id": "chimney-trouble",
    "title": "Chimney Trouble",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/chimneytrouble.jpg",
    "url": "/games/swf/chimneytrouble/game/base.html"
  },
  {
    "id": "choppy-orc",
    "title": "Choppy Orc",
    "tags": [
      "Adventure"
    ],
    "thumbnail": "/games/img/choppy orc.jpg",
    "url": "/games/html/choppy orc/game/index.html"
  },
  {
    "id": "chroma",
    "title": "Chroma",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/chroma.png",
    "url": "/games/html/chroma/game/index.html"
  },
  {
    "id": "circlo",
    "title": "Circlo",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/circlo.webp",
    "url": "/games/html/circlo/game/index.html"
  },
  {
    "id": "clickventure",
    "title": "Clickventure",
    "tags": [
      "Adventure"
    ],
    "thumbnail": "/games/img/clickbenture.jpg",
    "url": "/games/html/clickventure/game/index.html"
  },
  {
    "id": "clickventure-castaway",
    "title": "Clickventure Castaway",
    "tags": [
      "Adventure"
    ],
    "thumbnail": "/games/img/clickventure castaway.jpg",
    "url": "/games/html/clickventure castaway/game/index.html"
  },
  {
    "id": "cluster-rush",
    "title": "Cluster Rush",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/cluster.webp",
    "url": "/games/html/cluster-rush/game/index.html"
  },
  {
    "id": "comic-book-cody",
    "title": "Comic Book Cody",
    "tags": [
      "Adventure"
    ],
    "thumbnail": "/games/img/comicbook.jpeg",
    "url": "/games/swf/comicbook/game/base.html"
  },
  {
    "id": "connect-3",
    "title": "Connect 3",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/con3.webp",
    "url": "/games/html/connect3/game/index.html"
  },
  {
    "id": "connect-4",
    "title": "Connect 4",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/c4.png",
    "url": "/games/html/c4/game/index.html"
  },
  {
    "id": "coreball",
    "title": "Coreball",
    "tags": [
      "Sports"
    ],
    "thumbnail": "/games/img/coreball.webp",
    "url": "/games/html/core-ball/game/index.html"
  },
  {
    "id": "couch-2048",
    "title": "Couch 2048",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/couch.jpg",
    "url": "/games/html/couch2048/index.html"
  },
  {
    "id": "crossyroad",
    "title": "Crossyroad",
    "tags": [
      "Racing"
    ],
    "thumbnail": "/games/img/crossyroad.webp",
    "url": "/games/html/crossyroad/game/index.html"
  },
  {
    "id": "csgo-clicker",
    "title": "Csgo Clicker",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/CSGO.webp",
    "url": "/games/html/csgo-clicker/game/index.html"
  },
  {
    "id": "cube-miner",
    "title": "Cube Miner",
    "tags": [
      "Arcade"
    ],
    "thumbnail": "/games/img/cube.png",
    "url": "/games/html/Cube Miner/game/Cube Miner.html"
  },
  {
    "id": "cubefield",
    "title": "Cubefield",
    "tags": [
      "Arcade"
    ],
    "thumbnail": "/games/img/cubefeild.png",
    "url": "/games/html/cubefield/game/index.html"
  },
  {
    "id": "cupcake-2048",
    "title": "Cupcake 2048",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/cupcakes.webp",
    "url": "/games/html/cupcakes/game/index.html"
  },
  {
    "id": "cursed-travels-below",
    "title": "Cursed Travels Below",
    "tags": [
      "Horror"
    ],
    "thumbnail": "/games/img/cursed travels below.png",
    "url": "/games/html/cursed travels below/game/index.html"
  },
  {
    "id": "cursed-travels-flame",
    "title": "Cursed Travels Flame",
    "tags": [
      "Horror"
    ],
    "thumbnail": "/games/img/cursed travels flame.png",
    "url": "/games/html/cursed travels flame/game/index.html"
  },
  {
    "id": "cut-the-rope",
    "title": "Cut The Rope",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/ctr.webp",
    "url": "/games/html/cuttherope/game/index.html"
  },
  {
    "id": "cyber-city-driver",
    "title": "Cyber City Driver",
    "tags": [
      "Racing"
    ],
    "thumbnail": "/games/img/cyber.webp",
    "url": "/games/html/cyber-city-driver/game/index.html"
  },
  {
    "id": "detective-bass-fish",
    "title": "Detective Bass Fish",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/detective bass fish.webp",
    "url": "/games/html/detective bass fish/game/index.html"
  },
  {
    "id": "digger-main",
    "title": "Digger Main",
    "tags": [
      "Arcade"
    ],
    "thumbnail": "/games/img/diggermain.png",
    "url": "/games/html/digger-main/game/digger-main/index.html"
  },
  {
    "id": "dinosaur",
    "title": "Dinosaur",
    "tags": [
      "Arcade"
    ],
    "thumbnail": "/games/img/dino.png",
    "url": "/games/html/dinosaur/game/index.html"
  },
  {
    "id": "disaster-will-strike",
    "title": "Disaster Will Strike",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/disasterwillstrike.jpg",
    "url": "/games/swf/diasterwillstrike/game/base.html"
  },
  {
    "id": "dogeminer",
    "title": "Dogeminer",
    "tags": [
      "Idle"
    ],
    "thumbnail": "/games/img/Dogecoin.webp",
    "url": "/games/html/dogeminer/game/index.html"
  },
  {
    "id": "doodle-alive",
    "title": "Doodle Alive",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/doodle alive.jpg",
    "url": "/games/html/doodle alive/game/index.html"
  },
  {
    "id": "doodle-jump",
    "title": "Doodle Jump",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/doodle.webp",
    "url": "/games/html/doodlejump/game/index.html"
  },
  {
    "id": "drake-and-the-wizards",
    "title": "Drake And The Wizards",
    "tags": [
      "RPG"
    ],
    "thumbnail": "/games/img/drakeandthewizards.jpg",
    "url": "/games/swf/drakeandthewizards/game/base.html"
  },
  {
    "id": "drift-king",
    "title": "Drift King",
    "tags": [
      "Racing"
    ],
    "thumbnail": "/games/img/driftking.webp",
    "url": "/games/html/driftking/game/index.html"
  },
  {
    "id": "dubstep-raven",
    "title": "Dubstep Raven",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/dubstep raven.png",
    "url": "/games/html/dubstep raven/game/index.html"
  },
  {
    "id": "duck-life",
    "title": "Duck Life",
    "tags": [
      "Idle"
    ],
    "thumbnail": "/games/img/ducklife.webp",
    "url": "/games/swf/ducklife1/game/base.html"
  },
  {
    "id": "duck-life-2",
    "title": "Duck Life 2",
    "tags": [
      "Idle"
    ],
    "thumbnail": "/games/img/ducklife2.webp",
    "url": "/games/swf/ducklife2/game/base.html"
  },
  {
    "id": "duck-life-3",
    "title": "Duck Life 3",
    "tags": [
      "Idle"
    ],
    "thumbnail": "/games/img/ducklife3.webp",
    "url": "/games/swf/ducklife3/game/base.html"
  },
  {
    "id": "dunkers-fight",
    "title": "Dunkers Fight",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/dunk.webp",
    "url": "/games/html/dunkers-fight/game/index.html"
  },
  {
    "id": "eatio",
    "title": "Eatio",
    "tags": [
      "Multiplayer"
    ],
    "thumbnail": "/games/img/eatio.webp",
    "url": "/games/html/eatio/game/index.html"
  },
  {
    "id": "ede-surf",
    "title": "Ede Surf",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/edge-surf.webp",
    "url": "/games/html/edge-surf/game/index.html"
  },
  {
    "id": "edge-not-found",
    "title": "Edge Not Found",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/edge.png",
    "url": "/games/html/edgenotfound/game/index.html"
  },
  {
    "id": "eel-slap",
    "title": "Eel Slap",
    "tags": [
      "Arcade"
    ],
    "thumbnail": "/games/img/eel-slap.webp",
    "url": "/games/html/eel-slap/game/index.html"
  },
  {
    "id": "eggy-car",
    "title": "Eggy Car",
    "tags": [
      "Racing"
    ],
    "thumbnail": "/games/img/eggy-car.webp",
    "url": "/games/html/eggy-car/game/index.html"
  },
  {
    "id": "electric-man-2",
    "title": "Electric Man 2",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/electricman2.jpg",
    "url": "/games/swf/electricman2/game/base.html"
  },
  {
    "id": "endless-war-3",
    "title": "Endless War 3",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/endlesswar3.webp",
    "url": "/games/html/endlesswar3/game/index.html"
  },
  {
    "id": "erase-box",
    "title": "Erase Box",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/erase box.jpg",
    "url": "/games/html/erase box/game/index.html"
  },
  {
    "id": "erase-box",
    "title": "Erase Box",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/erase box.jpg",
    "url": "/games/html/erase box/game/index.html"
  },
  {
    "id": "escaping-the-prison",
    "title": "Escaping The Prison",
    "tags": [
      "Adventure"
    ],
    "thumbnail": "/games/img/escaping the pirson.jpg",
    "url": "/games/swf/escaping the prison/game/base.html"
  },
  {
    "id": "evil-glich",
    "title": "Evil Glich",
    "tags": [
      "Shooter"
    ],
    "thumbnail": "/games/img/EvilGlitch.png",
    "url": "/games/html/evilglitch/game/index.html"
  },
  {
    "id": "evolution",
    "title": "Evolution",
    "tags": [
      "Multiplayer"
    ],
    "thumbnail": "/games/img/evolution.webp",
    "url": "/games/html/evolution/game/index.html"
  },
  {
    "id": "exo",
    "title": "Exo",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/exo.webp",
    "url": "/games/html/exo/game/index.html"
  },
  {
    "id": "factory-balls-1",
    "title": "Factory Balls 1",
    "tags": [
      "Sports"
    ],
    "thumbnail": "/games/img/factoryballs1.jpeg",
    "url": "/games/swf/factoryballs1/game/base.html"
  },
  {
    "id": "factory-balls-2",
    "title": "Factory Balls 2",
    "tags": [
      "Sports"
    ],
    "thumbnail": "/games/img/factoryballs2.jpeg",
    "url": "/games/swf/factoryballs2/game/base.html"
  },
  {
    "id": "factory-balls-3",
    "title": "Factory Balls 3",
    "tags": [
      "Sports"
    ],
    "thumbnail": "/games/img/factoryballs3.jpeg",
    "url": "/games/swf/factoryballs3/game/base.html"
  },
  {
    "id": "factory-balls-4",
    "title": "Factory Balls 4",
    "tags": [
      "Sports"
    ],
    "thumbnail": "/games/img/factoryballs4.jpeg",
    "url": "/games/swf/factoryballs4/game/base.html"
  },
  {
    "id": "fancy-pants-1",
    "title": "Fancy Pants 1",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/fancy1.jpg",
    "url": "/games/swf/fancy1/game/base.html"
  },
  {
    "id": "fancy-pants-3",
    "title": "Fancy Pants 3",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/fancy3.jpg",
    "url": "/games/swf/fancy3/game/base.html"
  },
  {
    "id": "farming",
    "title": "Farming",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/farm.png",
    "url": "/games/html/html5-farming-demo-master/game/html5-farming-demo-master/index.html"
  },
  {
    "id": "finding-santa",
    "title": "Finding Santa",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/santa.png",
    "url": "/games/swf/findingsanta/game/base.html"
  },
  {
    "id": "flappy-2048",
    "title": "Flappy 2048",
    "tags": [
      "Casual",
      "Strategy"
    ],
    "thumbnail": "/games/img/flappy2048.png",
    "url": "/games/html/flappy-2048/game/index.html"
  },
  {
    "id": "flappy-plane",
    "title": "Flappy Plane",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/flappyplae.jpeg",
    "url": "/games/html/flappyplane/game/index.html"
  },
  {
    "id": "fleeing-the-complex",
    "title": "Fleeing The Complex",
    "tags": [
      "Adventure"
    ],
    "thumbnail": "/games/img/fleeing the complex.jpg",
    "url": "/games/swf/fleeing the complex/game/base.html"
  },
  {
    "id": "fluid-simulation",
    "title": "Fluid Simulation",
    "tags": [
      "Strategy",
      "Multiplayer"
    ],
    "thumbnail": "/games/img/webgl-fluid-simulation.webp",
    "url": "/games/html/webgl-fluid-simulation/game/index.html"
  },
  {
    "id": "fortnite-z",
    "title": "Fortnite Z",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/fornitez.png",
    "url": "/games/html/Fortnite Z/game/Fortnite Z.html"
  },
  {
    "id": "freegear",
    "title": "Freegear",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/freegear.jpg",
    "url": "/games/swf/freegear/game/base.html"
  },
  {
    "id": "fruit-ninja",
    "title": "Fruit Ninja",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/fruit.png",
    "url": "/games/html/fruitninja/game/index.html"
  },
  {
    "id": "fruit-ninja",
    "title": "Fruit Ninja",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/fruitninja.webp",
    "url": "/games/html/fruitninja/game/index.html"
  },
  {
    "id": "funny-shooter",
    "title": "Funny Shooter",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/funnyshooter.webp",
    "url": "/games/html/funnyshooter/game/index.html"
  },
  {
    "id": "gem-twins",
    "title": "Gem Twins",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/gem twins.png",
    "url": "/games/html/gem twins/game/index.html"
  },
  {
    "id": "generic-fishing-game",
    "title": "Generic Fishing Game",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/generic fishing game.png",
    "url": "/games/html/generic fishing game/game/index.html"
  },
  {
    "id": "geometry-dash-meltdown",
    "title": "Geometry Dash Meltdown",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/dashmeltdown.png",
    "url": "/games/html/Geometry Dash Meltdown/game/Geometry Dash Meltdown.html"
  },
  {
    "id": "geometry-dash-subzero",
    "title": "Geometry Dash Subzero",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/dashsubzero.png",
    "url": "/games/html/Geometry Dash Subzero/game/Geometry Dash Subzero.html"
  },
  {
    "id": "geometry-dash-world-toxic",
    "title": "Geometry Dash World Toxic",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/dashtoxic.png",
    "url": "/games/html/Geometry Dash World Toxic factory/game/Geometry Dash World Toxic factory.html"
  },
  {
    "id": "getting-over-it",
    "title": "Getting Over It",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/over.png",
    "url": "/games/html/Getting Over It v1/game/Getting Over It v1.html"
  },
  {
    "id": "ginogen-arena",
    "title": "Ginogen Arena",
    "tags": [
      "Shooter"
    ],
    "thumbnail": "/games/img/dinogen arena.webp",
    "url": "/games/html/dinogen arena/game/index.html"
  },
  {
    "id": "gooballs",
    "title": "Gooballs",
    "tags": [
      "Sports"
    ],
    "thumbnail": "/games/img/gooballs.jpg",
    "url": "/games/swf/gooballs/game/base.html"
  },
  {
    "id": "goodbye-doggy",
    "title": "Goodbye Doggy",
    "tags": [
      "Horror"
    ],
    "thumbnail": "/games/img/goodbye doggy.jpg",
    "url": "/games/html/goodbye doggy/game/index.html"
  },
  {
    "id": "goodnight",
    "title": "Goodnight",
    "tags": [
      "Horror"
    ],
    "thumbnail": "/games/img/gn.webp",
    "url": "/games/html/goodnight/game/index.html"
  },
  {
    "id": "google-snake",
    "title": "Google Snake",
    "tags": [
      "Arcade"
    ],
    "thumbnail": "/games/img/googlesnake.jpg",
    "url": "/games/html/google-snake/game/index.html"
  },
  {
    "id": "green",
    "title": "Green",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/green.png",
    "url": "/games/html/green/game/index.html"
  },
  {
    "id": "gun-mayhem-2",
    "title": "Gun Mayhem 2",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/gun mayhem 2.jpg",
    "url": "/games/swf/gun mayhem 2/game/base.html"
  },
  {
    "id": "hasty-shaman",
    "title": "Hasty Shaman",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/hasty shaman.png",
    "url": "/games/html/hasty shaman/index.html"
  },
  {
    "id": "haunt-the-house",
    "title": "Haunt The House",
    "tags": [
      "Horror"
    ],
    "thumbnail": "/games/img/hauntthehouse.jpg",
    "url": "/games/swf/hauntthehouse/game/base.html"
  },
  {
    "id": "hexa-knot",
    "title": "Hexa Knot",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/hexa knot.png",
    "url": "/games/html/hexa knot/game/index.html"
  },
  {
    "id": "hexologic",
    "title": "Hexologic",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/hexlogic.jpg",
    "url": "/games/html/hexologic/game/index.html"
  },
  {
    "id": "hextris",
    "title": "Hextris",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/hex.png",
    "url": "/games/html/hextris/game/index.html"
  },
  {
    "id": "hoshi-saga-1",
    "title": "Hoshi Saga 1",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/hoshisaga1.png",
    "url": "/games/swf/hoshisaga1/game/base.html"
  },
  {
    "id": "hoshi-saga-2",
    "title": "Hoshi Saga 2",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/hoshisaga2.jpg",
    "url": "/games/swf/hoshisaga2/game/base.html"
  },
  {
    "id": "hoshi-saga-3",
    "title": "Hoshi Saga 3",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/hoshisaga3.jpg",
    "url": "/games/swf/hoshisaga3/game/base.html"
  },
  {
    "id": "hot-dog-bush",
    "title": "Hot Dog Bush",
    "tags": [
      "Racing"
    ],
    "thumbnail": "/games/img/hotdogbush.jpeg",
    "url": "/games/swf/hotdogbush/game/base.html"
  },
  {
    "id": "house-of-hazards",
    "title": "House Of Hazards",
    "tags": [
      "Multiplayer"
    ],
    "thumbnail": "/games/img/houseofhazards.jpg",
    "url": "/games/html/houseofhazards/game/index.html"
  },
  {
    "id": "hover-racer-drive",
    "title": "Hover Racer Drive",
    "tags": [
      "Racing"
    ],
    "thumbnail": "/games/img/hover racer drive.png",
    "url": "/games/html/hover racer drive/game/index.html"
  },
  {
    "id": "i-wanna-win",
    "title": "I Wanna Win",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/iwannawin.jpg",
    "url": "/games/swf/iwannawin/game/base.html"
  },
  {
    "id": "idle-shark",
    "title": "Idle Shark",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/sharkgame.webp",
    "url": "/games/html/idle-shark/game/index.html"
  },
  {
    "id": "impossible-quiz",
    "title": "Impossible Quiz",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/impossiblequiz.webp",
    "url": "/games/html/impossiblequiz/game/index.html"
  },
  {
    "id": "infiltrating-the-airship",
    "title": "Infiltrating The Airship",
    "tags": [
      "Adventure"
    ],
    "thumbnail": "/games/img/infiltrating the airship.jpg",
    "url": "/games/swf/infiltrating the airship/game/base.html"
  },
  {
    "id": "interactive-buddy",
    "title": "Interactive Buddy",
    "tags": [
      "Arcade"
    ],
    "thumbnail": "/games/img/interactivebuddy.webp",
    "url": "/games/html/interactivebuddy/game/index.html"
  },
  {
    "id": "iq-ball",
    "title": "Iq Ball",
    "tags": [
      "Sports"
    ],
    "thumbnail": "/games/img/iqball.jpg",
    "url": "/games/swf/iqball/game/base.html"
  },
  {
    "id": "jelly-go",
    "title": "Jelly Go!",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/jellygo.jpg",
    "url": "/games/swf/jellygo/game/base.html"
  },
  {
    "id": "jetpack-joyride",
    "title": "Jetpack Joyride",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/jetpack-joyride.webp",
    "url": "/games/html/jetpack-joyride/game/index.html"
  },
  {
    "id": "just-fall",
    "title": "Just Fall",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/just-fall.webp",
    "url": "/games/html/just-fall/game/index.html"
  },
  {
    "id": "just-one-boss",
    "title": "Just One Boss",
    "tags": [
      "Shooter"
    ],
    "thumbnail": "/games/img/oneboss.png",
    "url": "/games/html/just one boss/game/index.html"
  },
  {
    "id": "just-passing",
    "title": "Just Passing",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/just passing.png",
    "url": "/games/html/just passing/game/index.html"
  },
  {
    "id": "kingdom-rush",
    "title": "Kingdom Rush",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/kingdom rush.jpg",
    "url": "/games/swf/kingdom rush/game/base.html"
  },
  {
    "id": "kingdom-rush-frontie",
    "title": "Kingdom Rush Frontie",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/kingdom rush frontie.jpg",
    "url": "/games/swf/kingdom rush frontie/game/base.html"
  },
  {
    "id": "kitchen-gun-game",
    "title": "Kitchen Gun Game",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/kitchen-gun-game.webp",
    "url": "/games/html/kitchen-gun-game/game/index.html"
  },
  {
    "id": "kitten-cannon",
    "title": "Kitten Cannon",
    "tags": [
      "Arcade"
    ],
    "thumbnail": "/games/img/kittencannon.webp",
    "url": "/games/html/kittencannon/game/index.html"
  },
  {
    "id": "knight-errant",
    "title": "Knight Errant",
    "tags": [
      "RPG"
    ],
    "thumbnail": "/games/img/knight errant.png",
    "url": "/games/html/knight errant/game/index.html"
  },
  {
    "id": "konnekt",
    "title": "Konnekt",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/cone.png",
    "url": "/games/html/konnekt/game/index.html"
  },
  {
    "id": "laqueus-escape-chapter-1",
    "title": "Laqueus Escape Chapter 1",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/laqueus escape chapter 1.avif",
    "url": "/games/html/laqueus escape chapter 1/game/index.html"
  },
  {
    "id": "learn-to-fly",
    "title": "Learn To Fly",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/learntofly.webp",
    "url": "/games/html/learntofly/game/index.html"
  },
  {
    "id": "life-in-the-static",
    "title": "Life In The Static",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/life in the static.jpg",
    "url": "/games/html/life in the static/game/index.html"
  },
  {
    "id": "little-wheel",
    "title": "Little Wheel",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/littlewheel.jpg",
    "url": "/games/swf/littlewheel/game/base.html"
  },
  {
    "id": "maptroid",
    "title": "Maptroid",
    "tags": [
      "Adventure"
    ],
    "thumbnail": "/games/img/maptroid.jpg",
    "url": "/games/html/maptroid/game/index.html"
  },
  {
    "id": "mario",
    "title": "Mario",
    "tags": [
      "Multiplayer"
    ],
    "thumbnail": "/games/img/Mario.png",
    "url": "/games/html/Mario/game/Mario.html"
  },
  {
    "id": "min-hero-tower-of-sages",
    "title": "Min Hero Tower Of Sages",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/minhero.jpeg",
    "url": "/games/swf/minhero/game/base.html"
  },
  {
    "id": "minecraft-1-5-2-eaglercraft",
    "title": "Minecraft (1.5.2 Eaglercraft)",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/minecraft.jpeg",
    "url": "/games/html/eaglecraft/game/Offline_Download_Version.html"
  },
  {
    "id": "minekahn",
    "title": "Minekahn",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/khan.png",
    "url": "/games/html/minekhan/game/index.html"
  },
  {
    "id": "mini-putt-3",
    "title": "Mini Putt 3",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/miniputt3.jpg",
    "url": "/games/swf/miniputt3/game/base.html"
  },
  {
    "id": "mini-train",
    "title": "Mini Train",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/minitrain.jpg",
    "url": "/games/swf/minitrain/game/base.html"
  },
  {
    "id": "mirror-wizard",
    "title": "Mirror Wizard",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/mirror wizard.jpg",
    "url": "/games/html/mirror wizard/game/index.html"
  },
  {
    "id": "monkey-mart",
    "title": "Monkey Mart",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/monkey mart.png",
    "url": "/games/html/monkey mart/game/index.html"
  },
  {
    "id": "moto-x3m-2",
    "title": "Moto X3m 2",
    "tags": [
      "Racing"
    ],
    "thumbnail": "/games/img/motox3m2.webp",
    "url": "/games/html/motox3m2/game/index.html"
  },
  {
    "id": "moto-x3m-pool",
    "title": "Moto X3m Pool",
    "tags": [
      "Racing",
      "Sports"
    ],
    "thumbnail": "/games/img/motox3m-pool.webp",
    "url": "/games/html/motox3m-pool/game/index.html"
  },
  {
    "id": "moto-x3m-spooky",
    "title": "Moto X3m Spooky",
    "tags": [
      "Racing"
    ],
    "thumbnail": "/games/img/moto-spook.webp",
    "url": "/games/html/motox3m-spooky/game/index.html"
  },
  {
    "id": "moto-x3m-winter",
    "title": "Moto X3m Winter",
    "tags": [
      "Racing"
    ],
    "thumbnail": "/games/img/motox3m-winter.webp",
    "url": "/games/html/motox3m-winter/game/index.html"
  },
  {
    "id": "mountain-biking",
    "title": "Mountain Biking",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/Mountain Biking.jpg",
    "url": "/games/html/Mountain Biking/game/index.html"
  },
  {
    "id": "oil-race",
    "title": "Oil Race",
    "tags": [
      "Racing"
    ],
    "thumbnail": "/games/img/oil race.avif",
    "url": "/games/html/oil race/game/index.html"
  },
  {
    "id": "one-trick-mage",
    "title": "One Trick Mage",
    "tags": [
      "RPG"
    ],
    "thumbnail": "/games/img/one trick mage.png",
    "url": "/games/html/one trick mage/game/index.html"
  },
  {
    "id": "orange",
    "title": "Orange",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/orange.png",
    "url": "/games/html/orange/game/index.html"
  },
  {
    "id": "p-craft",
    "title": "P-craft",
    "tags": [
      "Arcade"
    ],
    "thumbnail": "/games/img/pcraft.png",
    "url": "/games/html/pico-8/game/PICO-8 Cartridge.html"
  },
  {
    "id": "packabunchas",
    "title": "Packabunchas",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/pack.png",
    "url": "/games/html/packabunchas/game/index.html"
  },
  {
    "id": "pacman",
    "title": "Pacman",
    "tags": [
      "Arcade"
    ],
    "thumbnail": "/games/img/pacman.webp",
    "url": "/games/html/pacman/game/index.html"
  },
  {
    "id": "papa-louies-1",
    "title": "Papa Louies 1",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/louie1.jpeg",
    "url": "/games/swf/louie1/game/base.html"
  },
  {
    "id": "papas-bakeria",
    "title": "Papas Bakeria",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/papasbakeria.jpg",
    "url": "/games/swf/papabakeria/game/base.html"
  },
  {
    "id": "papas-burgeria",
    "title": "Papas Burgeria",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/papasburgeria.jpg",
    "url": "/games/swf/papaburgeria/game/base.html"
  },
  {
    "id": "papas-cheeseria",
    "title": "Papas Cheeseria",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/papascheeseria.jpg",
    "url": "/games/swf/papacheeseria/game/base.html"
  },
  {
    "id": "papas-cupcakeria",
    "title": "Papas Cupcakeria",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/papascupcakeria.jpg",
    "url": "/games/swf/papacupcakeria/game/base.html"
  },
  {
    "id": "papas-donuteria",
    "title": "Papas Donuteria",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/papadonuteria.jpg",
    "url": "/games/swf/papadonuteria/game/base.html"
  },
  {
    "id": "papas-freezeria",
    "title": "Papas Freezeria",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/papasfreezeria.jpg",
    "url": "/games/swf/papafreezeria/game/base.html"
  },
  {
    "id": "papas-hotdoggeria",
    "title": "Papas Hotdoggeria",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/papashotdoggeria.jpg",
    "url": "/games/swf/papahotdoggeria/game/base.html"
  },
  {
    "id": "papas-pancakeria",
    "title": "Papas Pancakeria",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/papaspancakeria.jpg",
    "url": "/games/swf/papapancakeria/game/base.html"
  },
  {
    "id": "papas-pasteria",
    "title": "Papas Pasteria",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/papaspasteria.jpg",
    "url": "/games/swf/papapasteria/game/base.html"
  },
  {
    "id": "papas-pizzeria",
    "title": "Papas Pizzeria",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/papaspizzeria.jpg",
    "url": "/games/swf/papapizzeria/game/base.html"
  },
  {
    "id": "papas-scooperia",
    "title": "Papas Scooperia",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/papasscooperia.jpg",
    "url": "/games/swf/papascooperia/game/base.html"
  },
  {
    "id": "papas-sushiria",
    "title": "Papas Sushiria",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/papassushiria.jpg",
    "url": "/games/swf/papasushiria/game/base.html"
  },
  {
    "id": "papas-taco-mia",
    "title": "Papas Taco Mia",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/papataco.jpg",
    "url": "/games/swf/papataco/game/base.html"
  },
  {
    "id": "papas-wingeria",
    "title": "Papas Wingeria",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/papawingeria.jpg",
    "url": "/games/swf/papawingeria/game/base.html"
  },
  {
    "id": "paper-minecraft",
    "title": "Paper Minecraft",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/papermc.png",
    "url": "/games/html/Paper Minecraft/game/Paper Minecraft.html"
  },
  {
    "id": "paper-io",
    "title": "Paper.io",
    "tags": [
      "Multiplayer"
    ],
    "thumbnail": "/games/img/paperio.webp",
    "url": "/games/html/paperio/game/index.html"
  },
  {
    "id": "papery-planes",
    "title": "Papery Planes",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/paperplane.webp",
    "url": "/games/html/papery-planes/game/index.html"
  },
  {
    "id": "particle-clicker",
    "title": "Particle Clicker",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/parclick.webp",
    "url": "/games/html/particle-clicker/game/index.html"
  },
  {
    "id": "pathfinder",
    "title": "Pathfinder",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/Screenshot 2024-07-09 144933.png",
    "url": "/games/html/pathfinder/index.html"
  },
  {
    "id": "pe-norie",
    "title": "Pe Norie",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/pe norie.jpg",
    "url": "/games/html/pe norie/game/index.html"
  },
  {
    "id": "penguin-dinner",
    "title": "Penguin Dinner",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/penguin.jpeg",
    "url": "/games/swf/penguin/game/base.html"
  },
  {
    "id": "picky-package",
    "title": "Picky Package",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/pickyback.webp",
    "url": "/games/html/picky-package/game/index.html"
  },
  {
    "id": "pink",
    "title": "Pink",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/pink.png",
    "url": "/games/html/pink/game/index.html"
  },
  {
    "id": "pixel-battles",
    "title": "Pixel Battles",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/Pixel Battles.jpg",
    "url": "/games/html/Pixel Battles/game/index.html"
  },
  {
    "id": "pixoji",
    "title": "Pixoji",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/pixoji.png",
    "url": "/games/html/pixoji/game/index.html"
  },
  {
    "id": "planet-life",
    "title": "Planet Life",
    "tags": [
      "Idle"
    ],
    "thumbnail": "/games/img/planetlife.jpg",
    "url": "/games/html/planetlife/game/index.html"
  },
  {
    "id": "plants-vs-zombies-2",
    "title": "Plants Vs. Zombies 2",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/pvz2.jpg",
    "url": "/games/swf/pvz2/game/base.html"
  },
  {
    "id": "pong",
    "title": "Pong",
    "tags": [
      "Arcade"
    ],
    "thumbnail": "/games/img/pong.webp",
    "url": "/games/html/pong/game/index.html"
  },
  {
    "id": "portal",
    "title": "Portal",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/portal.jpg",
    "url": "/games/swf/portal/game/base.html"
  },
  {
    "id": "progress-knight",
    "title": "Progress Knight",
    "tags": [
      "Idle"
    ],
    "thumbnail": "/games/img/progress knight.png",
    "url": "/games/html/progress knight/game/index.html"
  },
  {
    "id": "racer",
    "title": "Racer",
    "tags": [
      "Racing"
    ],
    "thumbnail": "/games/img/racer.jpeg",
    "url": "/games/html/racer/game/index.html"
  },
  {
    "id": "racer",
    "title": "Racer",
    "tags": [
      "Racing"
    ],
    "thumbnail": "/games/img/Racer.webp",
    "url": "/games/html/racer/game/index.html"
  },
  {
    "id": "radius-raid",
    "title": "Radius Raid",
    "tags": [
      "Shooter"
    ],
    "thumbnail": "/games/img/radius.png",
    "url": "/games/html/radius raid/game/radius raid/index.html"
  },
  {
    "id": "raft-wars",
    "title": "Raft Wars",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/raftwars.jpg",
    "url": "/games/swf/raftwars/game/base.html"
  },
  {
    "id": "retrohaunt",
    "title": "Retrohaunt",
    "tags": [
      "Horror"
    ],
    "thumbnail": "/games/img/retro.jpeg",
    "url": "/games/html/retrohaunt/game/index.html"
  },
  {
    "id": "ricochet-arrow",
    "title": "Ricochet Arrow",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/ricochet arrow.jpg",
    "url": "/games/html/ricochet arrow/game/index.html"
  },
  {
    "id": "roadblocks",
    "title": "Roadblocks",
    "tags": [
      "Racing"
    ],
    "thumbnail": "/games/img/roadblocks.jpeg",
    "url": "/games/html/roadblocks/game/index.html"
  },
  {
    "id": "rocket-league",
    "title": "Rocket League",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/rocketleague.jpg",
    "url": "/games/html/rocket league/game/index.html"
  },
  {
    "id": "rogue-fable",
    "title": "Rogue Fable",
    "tags": [
      "RPG"
    ],
    "thumbnail": "/games/img/rogue fable.jpg",
    "url": "/games/html/rogue fable/game/index.html"
  },
  {
    "id": "roots",
    "title": "Roots",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/roots.jpg",
    "url": "/games/html/roots/game/index.html"
  },
  {
    "id": "run-1",
    "title": "Run 1",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/run.jpeg",
    "url": "/games/swf/run/game/base.html"
  },
  {
    "id": "run-2",
    "title": "Run 2",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/run2.jpeg",
    "url": "/games/swf/run2/game/base.html"
  },
  {
    "id": "sabotage",
    "title": "Sabotage",
    "tags": [
      "Adventure"
    ],
    "thumbnail": "/games/img/sabotage.webp",
    "url": "/games/html/sabotage/game/index.html"
  },
  {
    "id": "sand-and-water",
    "title": "Sand And Water",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/sand.png",
    "url": "/games/html/Sand and Water v3.html"
  },
  {
    "id": "sans",
    "title": "Sans",
    "tags": [
      "Horror"
    ],
    "thumbnail": "/games/img/sans.webp",
    "url": "/games/html/sans/game/index.html"
  },
  {
    "id": "scalak",
    "title": "Scalak",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/scalak.jpg",
    "url": "/games/html/scalak/game/index.html"
  },
  {
    "id": "scrap-meatal-heros",
    "title": "Scrap Meatal Heros",
    "tags": [
      "Shooter"
    ],
    "thumbnail": "/games/img/scrapmeatalheros.jpg",
    "url": "/games/swf/scrapmeatalheros/game/base.html"
  },
  {
    "id": "scratch-brawl-2",
    "title": "Scratch Brawl 2",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/scratchb.jpg",
    "url": "/games/html/Scratch Brawl 2.html"
  },
  {
    "id": "shape-shifter",
    "title": "Shape Shifter",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/shapeshifter.png",
    "url": "/games/swf/shapeshifter/game/base.html"
  },
  {
    "id": "shape-switcher",
    "title": "Shape Switcher",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/shapeswitcher.jpeg",
    "url": "/games/swf/shapeswitch/game/base.html"
  },
  {
    "id": "shortcut-race",
    "title": "Shortcut Race",
    "tags": [
      "Racing"
    ],
    "thumbnail": "/games/img/shortcut race.jpg",
    "url": "/games/html/shortcut race/game/index.html"
  },
  {
    "id": "shuttledeck",
    "title": "Shuttledeck",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/shuttle.png",
    "url": "/games/html/shuttledeck/game/index.html"
  },
  {
    "id": "sleeping-beauty",
    "title": "Sleeping Beauty",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/sleeping.png",
    "url": "/games/html/sleeping beauty/game/sleeping beauty/index.html"
  },
  {
    "id": "slither-io",
    "title": "Slither.io",
    "tags": [
      "Multiplayer"
    ],
    "thumbnail": "/games/img/slither.png",
    "url": "/games/html/slither.io v1.html"
  },
  {
    "id": "slope-2",
    "title": "Slope 2",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/slope2.jpg",
    "url": "/games/html/slope2/game/index.html"
  },
  {
    "id": "snow-rider-3d",
    "title": "Snow Rider 3d",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/snow-rider-3d-unblocked.png",
    "url": "/games/html/snow-rider-3d/game/index.html"
  },
  {
    "id": "sonny",
    "title": "Sonny",
    "tags": [
      "RPG"
    ],
    "thumbnail": "/games/img/sonny.png",
    "url": "/games/swf/sonny/game/base.html"
  },
  {
    "id": "sonny2",
    "title": "Sonny2",
    "tags": [
      "RPG"
    ],
    "thumbnail": "/games/img/sonny2.jpg",
    "url": "/games/swf/sonny2/game/base.html"
  },
  {
    "id": "soul-mirror",
    "title": "Soul Mirror",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/soul mirror.jpg",
    "url": "/games/html/soul mirror/game/index.html"
  },
  {
    "id": "space-company",
    "title": "Space Company",
    "tags": [
      "Idle"
    ],
    "thumbnail": "/games/img/images.png",
    "url": "/games/html/spacecompany/game/index.html"
  },
  {
    "id": "space-garden",
    "title": "Space Garden",
    "tags": [
      "Idle"
    ],
    "thumbnail": "/games/img/garden.jpeg",
    "url": "/games/html/spacegarden/game/index.html"
  },
  {
    "id": "space-huggers",
    "title": "Space Huggers",
    "tags": [
      "Shooter"
    ],
    "thumbnail": "/games/img/huggers.jpeg",
    "url": "/games/html/spacehuggers/game/index.html"
  },
  {
    "id": "space-invaders",
    "title": "Space Invaders",
    "tags": [
      "Shooter"
    ],
    "thumbnail": "/games/img/spaceinv.webp",
    "url": "/games/html/spaceinvaders/game/index.html"
  },
  {
    "id": "square-hero",
    "title": "Square Hero",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/squarehero.jpg",
    "url": "/games/swf/squarehero/game/base.html"
  },
  {
    "id": "stack",
    "title": "Stack",
    "tags": [
      "Casual",
      "Strategy"
    ],
    "thumbnail": "/games/img/stack.jpeg",
    "url": "/games/html/stack/game/index.html"
  },
  {
    "id": "stack",
    "title": "Stack",
    "tags": [
      "Casual",
      "Strategy"
    ],
    "thumbnail": "/games/img/stack.webp",
    "url": "/games/html/stack/game/index.html"
  },
  {
    "id": "stack-ball",
    "title": "Stack Ball",
    "tags": [
      "Casual",
      "Sports",
      "Strategy"
    ],
    "thumbnail": "/games/img/stackball.webp",
    "url": "/games/html/stack-ball/game/index.html"
  },
  {
    "id": "steal-this-election",
    "title": "Steal This Election",
    "tags": [
      "Multiplayer"
    ],
    "thumbnail": "/games/img/elec.webp",
    "url": "/games/html/steal-this-election/game/index.html"
  },
  {
    "id": "stealing-the-diamond",
    "title": "Stealing The Diamond",
    "tags": [
      "Adventure"
    ],
    "thumbnail": "/games/img/stealing the diamond.jpg",
    "url": "/games/swf/stealing the diamond/game/base.html"
  },
  {
    "id": "strike-force-kitty-1",
    "title": "Strike Force Kitty 1",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/strikeforcekitty.jpeg",
    "url": "/games/swf/strikeforcekitty/game/base.html"
  },
  {
    "id": "strike-force-kitty-2",
    "title": "Strike Force Kitty 2",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/strikeforcekitty2.jpeg",
    "url": "/games/swf/strikeforcekitty2/game/base.html"
  },
  {
    "id": "strike-force-kitty-3",
    "title": "Strike Force Kitty 3",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/strikeforcekitty3.jpeg",
    "url": "/games/swf/strikeforcekitty3/game/base.html"
  },
  {
    "id": "sugar-sugar",
    "title": "Sugar, Sugar",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/sugar.jpeg",
    "url": "/games/swf/sugar/game/base.html"
  },
  {
    "id": "swords-and-souls",
    "title": "Swords And Souls",
    "tags": [
      "Action",
      "Strategy"
    ],
    "thumbnail": "/games/img/swords and souls.avif",
    "url": "/games/swf/swords and souls/game/base.html"
  },
  {
    "id": "tabs",
    "title": "Tabs",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/tabs.jpeg",
    "url": "/games/html/tabs/index.html"
  },
  {
    "id": "tactical-weapon-pack",
    "title": "Tactical Weapon Pack",
    "tags": [
      "Shooter"
    ],
    "thumbnail": "/games/img/tactical weapon pack.png",
    "url": "/games/html/tactical weapon pack/game/index.html"
  },
  {
    "id": "tanuki-sunset",
    "title": "Tanuki Sunset",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/tanuki sunset.jpg",
    "url": "/games/html/tanuki sunset/game/index.html"
  },
  {
    "id": "tarzan-ball",
    "title": "Tarzan Ball",
    "tags": [
      "Sports"
    ],
    "thumbnail": "/games/img/tarzanball.jpg",
    "url": "/games/swf/tarzanball/game/base.html"
  },
  {
    "id": "tavern-master",
    "title": "Tavern Master",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/tavern master.png",
    "url": "/games/html/tavern master/game/index.html"
  },
  {
    "id": "terrain-generator",
    "title": "Terrain Generator",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/terrain.png",
    "url": "/games/html/Terrain Generator.html"
  },
  {
    "id": "terraria",
    "title": "Terraria",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/terraria.jpg",
    "url": "/games/html/Terraria.html"
  },
  {
    "id": "tetris",
    "title": "Tetris",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/tetris.jpeg",
    "url": "/games/html/tetris advanced/game/index.html"
  },
  {
    "id": "the-dark-one",
    "title": "The Dark One",
    "tags": [
      "Horror"
    ],
    "thumbnail": "/games/img/the dark one.jpg",
    "url": "/games/html/the dark one/game/index.html"
  },
  {
    "id": "the-ninja",
    "title": "The Ninja",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/n1.webp",
    "url": "/games/html/The Ninja.html"
  },
  {
    "id": "the-ninja-2",
    "title": "The Ninja 2",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/n2.png",
    "url": "/games/html/The Ninja 2.html"
  },
  {
    "id": "the-ninja-3",
    "title": "The Ninja 3",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/n3.webp",
    "url": "/games/html/The Ninja 3.html"
  },
  {
    "id": "the-ninja-4",
    "title": "The Ninja 4",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/n4.jpg",
    "url": "/games/html/The Ninja 4.html"
  },
  {
    "id": "the-ninja-5",
    "title": "The Ninja 5",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/n5.webp",
    "url": "/games/html/The Ninja 5.html"
  },
  {
    "id": "the-ninja-5-hacked",
    "title": "The Ninja 5 Hacked",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/n5h.png",
    "url": "/games/html/The Ninja 5 Hacked!.html"
  },
  {
    "id": "the-square",
    "title": "The Square",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/thesquare.webp",
    "url": "/games/html/thesquare/game/index.html"
  },
  {
    "id": "there-is-no-game",
    "title": "There Is No Game",
    "tags": [
      "Arcade"
    ],
    "thumbnail": "/games/img/there is no game.jpg",
    "url": "/games/html/there is no game/game/index.html"
  },
  {
    "id": "throw-a-potato-again",
    "title": "Throw A Potato Again",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/throwapotato2.png",
    "url": "/games/html/throw a potato again/game/index.html"
  },
  {
    "id": "throw-a-potato-in-space",
    "title": "Throw A Potato In Space",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/throwapotato3.png",
    "url": "/games/html/throw a potato in space/game/index.html"
  },
  {
    "id": "tic-tac-toe",
    "title": "Tic-tac-toe",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/toe.webp",
    "url": "/games/html/tic-tac-toe/game/index.html"
  },
  {
    "id": "time-shooters",
    "title": "Time Shooters",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/timeshooters.webp",
    "url": "/games/html/timeshooter/game/index.html"
  },
  {
    "id": "tiny-fishing",
    "title": "Tiny Fishing",
    "tags": [
      "Simulation"
    ],
    "thumbnail": "/games/img/fishing.jpeg",
    "url": "/games/html/tiny-fishing/game/index.html"
  },
  {
    "id": "tough-growth",
    "title": "Tough Growth",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/tough growth.jpg",
    "url": "/games/html/tough growth/game/index.html"
  },
  {
    "id": "tower-master",
    "title": "Tower Master",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/towermaster.webp",
    "url": "/games/html/towermaster/game/index.html"
  },
  {
    "id": "tower-of-the-scorche",
    "title": "Tower Of The Scorche",
    "tags": [
      "Strategy"
    ],
    "thumbnail": "/games/img/tower of the scorche.png",
    "url": "/games/html/tower of the scorche/game/index.html"
  },
  {
    "id": "trimps",
    "title": "Trimps",
    "tags": [
      "Idle"
    ],
    "thumbnail": "/games/img/trimps.png",
    "url": "/games/html/trimps/game/index.html"
  },
  {
    "id": "truck-loader",
    "title": "Truck Loader",
    "tags": [
      "Racing"
    ],
    "thumbnail": "/games/img/truckloader.jpg",
    "url": "/games/swf/truckloader/game/base.html"
  },
  {
    "id": "tv-static",
    "title": "Tv Static",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/tv-static.webp",
    "url": "/games/html/tv-static/game/index.html"
  },
  {
    "id": "unloop",
    "title": "Unloop",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/unloop.jpg",
    "url": "/games/html/unloop/game/index.html"
  },
  {
    "id": "veloce",
    "title": "Veloce",
    "tags": [
      "Platformer"
    ],
    "thumbnail": "/games/img/VELOCE.webp",
    "url": "/games/html/veloce/game/index.html"
  },
  {
    "id": "wall-smash",
    "title": "Wall Smash",
    "tags": [
      "Action"
    ],
    "thumbnail": "/games/img/wallsmash.webp",
    "url": "/games/html/wallsmash/game/index.html"
  },
  {
    "id": "water-works",
    "title": "Water Works",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/waterworks.webp",
    "url": "/games/html/waterworks/game/index.html"
  },
  {
    "id": "weave-silk",
    "title": "Weave Silk",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/weavesilk.webp",
    "url": "/games/html/weavesilk/game/index.html"
  },
  {
    "id": "web-retro",
    "title": "Web Retro",
    "tags": [
      "Arcade"
    ],
    "thumbnail": "/games/img/webretro.webp",
    "url": "/games/html/webretro/game/index.html"
  },
  {
    "id": "whac-a-mole",
    "title": "Whac-a-mole",
    "tags": [
      "Arcade"
    ],
    "thumbnail": "/games/img/Whac-A-Mole.webp",
    "url": "/games/html/whac-a-mole/game/index.html"
  },
  {
    "id": "winter-gifts",
    "title": "Winter Gifts",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/winter gifts.jpg",
    "url": "/games/html/winter gifts/game/index.html"
  },
  {
    "id": "working-stiffs",
    "title": "Working Stiffs",
    "tags": [
      "Idle"
    ],
    "thumbnail": "/games/img/workingstiffs.jpg",
    "url": "/games/swf/workingstiffs/game/base.html"
  },
  {
    "id": "world-s-hardest-game",
    "title": "World's Hardest Game",
    "tags": [
      "Puzzle"
    ],
    "thumbnail": "/games/img/whg.webp",
    "url": "/games/html/worlds-hardest-game/game/index.html"
  },
  {
    "id": "worlds-within-worlds",
    "title": "Worlds Within Worlds",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/worlds within worlds.png",
    "url": "/games/html/worlds within worlds/game/index.html"
  },
  {
    "id": "x-trial-racing",
    "title": "X Trial Racing",
    "tags": [
      "Racing"
    ],
    "thumbnail": "/games/img/xtr.webp",
    "url": "/games/html/x-trial-racing/game/index.html"
  },
  {
    "id": "xx142-b2exe",
    "title": "Xx142-b2exe",
    "tags": [
      "Shooter"
    ],
    "thumbnail": "/games/img/xx.png",
    "url": "/games/html/xx142-b2exe/game/index.html"
  },
  {
    "id": "poly-track",
    "title": "Poly Track",
    "tags": [
      "Racing",
      "Physics"
    ],
    "thumbnail": "/games/img/racer.jpeg",
    "url": "/games/poly-track-0.5.1/index.html"
  },
  {
    "id": "poly-track-classic",
    "title": "Poly Track (Classic)",
    "tags": [
      "Racing",
      "Physics"
    ],
    "thumbnail": "/games/img/racer.jpeg",
    "url": "/games/poly-track/index.html"
  },
  {
    "id": "poly-track-modded",
    "title": "Poly Track (Modded)",
    "tags": [
      "Racing",
      "Physics"
    ],
    "thumbnail": "/games/img/racer.jpeg",
    "url": "/games/poly-track-modded/index.html"
  },
  {
    "id": "yoshi-fabricator",
    "title": "Yoshi Fabricator",
    "tags": [
      "Casual"
    ],
    "thumbnail": "/games/img/YFS.webp",
    "url": "/games/html/yoshifabrication/game/index.html"
  },
  {
    "id": "pokemon-fire-red",
    "title": "Pokemon Fire Red",
    "tags": [
      "RPG",
      "Classic"
    ],
    "thumbnail": "/games/img/PokemonFireRed.webp",
    "url": "/games/html/pokemonfirered/game/index.html",
    "featured": true
  }
]

export const games: Game[] = rawGames.map(g => ({
  ...g,
  thumbnail: resolveAssetUrl(g.thumbnail),
  url: resolveAssetUrl(g.url),
}));
