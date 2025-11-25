import polyTrack from "@/assets/thumbnails/poly-track.jpg";
import cookieClicker from "@/assets/thumbnails/cookie-clicker.jpg";
import driveMad from "@/assets/thumbnails/drive-mad.jpg";
import game2048 from "@/assets/thumbnails/2048.jpg";
import slope from "@/assets/thumbnails/slope.jpg";
import bitlife from "@/assets/thumbnails/bitlife.jpg";
import retroBowl from "@/assets/thumbnails/retro-bowl.jpg";
import superMarioBros from "@/assets/thumbnails/super-mario-bros.jpg";
import oneVOneLol from "@/assets/thumbnails/1v1-lol.jpg";
import flappyBird from "@/assets/thumbnails/flappy-bird.jpg";
import subwaySurfers from "@/assets/thumbnails/subway-surfers.jpg";
import yohohoIo from "@/assets/thumbnails/yohoho-io.jpg";
import basketballStars from "@/assets/thumbnails/basketball-stars.jpg";
import ovo from "@/assets/thumbnails/ovo.jpg";
import basketBros from "@/assets/thumbnails/basket-bros.jpg";
import bobRobber4 from "@/assets/thumbnails/bob-robber-4.jpg";
import carDriftRacers2 from "@/assets/thumbnails/car-drift-racers-2.jpg";
import crossyRoad from "@/assets/thumbnails/crossy-road.jpg";
import secretTreasure from "@/assets/thumbnails/secret-treasure.jpg";
import experimentalRacer from "@/assets/thumbnails/experimental-racer.jpg";
import escapingPrison from "@/assets/thumbnails/escaping-prison.jpg";
import fireboyWatergirl from "@/assets/thumbnails/fireboy-watergirl.jpg";
import fireboyWatergirl4 from "@/assets/thumbnails/fireboy-watergirl-4.jpg";
import furiousRacing3d from "@/assets/thumbnails/furious-racing-3d.jpg";
import monkeyMart from "@/assets/thumbnails/monkey-mart.jpg";
import motoX3m2 from "@/assets/thumbnails/moto-x3m-2.jpg";
import raftWars from "@/assets/thumbnails/raft-wars.jpg";
import redBall4 from "@/assets/thumbnails/red-ball-4.jpg";
import rooftopSnipers from "@/assets/thumbnails/rooftop-snipers.jpg";
import sausageFlip from "@/assets/thumbnails/sausage-flip.jpg";
import slope2 from "@/assets/thumbnails/slope-2.jpg";
import slope3 from "@/assets/thumbnails/slope-3.jpg";
import soccerRandom from "@/assets/thumbnails/soccer-random.jpg";
import speedPoolKing from "@/assets/thumbnails/speed-pool-king.jpg";
import stickmanClimb2 from "@/assets/thumbnails/stickman-climb-2.jpg";
import stickmanHook from "@/assets/thumbnails/stickman-hook.jpg";
import tombOfMask from "@/assets/thumbnails/tomb-of-mask.jpg";
import tunnelRush from "@/assets/thumbnails/tunnel-rush.jpg";
import waterColorSort from "@/assets/thumbnails/water-color-sort.jpg";
import fallback from "@/assets/thumbnails/_fallback.png";
import stickmanBike from "@/assets/thumbnails/stickman-bike.jpg";
import geometryDash from "@/assets/thumbnails/geometry-dash.jpg";
import eggyCar from "@/assets/thumbnails/eggy-car.jpg";
import parkourRace from "@/assets/thumbnails/parkour-race.jpg";
import motoX3m from "@/assets/thumbnails/moto-x3m.jpg";
import crossyRoadNew from "@/assets/thumbnails/crossy-road-new.jpg";
import amongUsNew from "@/assets/thumbnails/among-us-new.jpg";
import driftBossNew from "@/assets/thumbnails/drift-boss-new.jpg";
import driftHuntersNew from "@/assets/thumbnails/drift-hunters-new.jpg";
import templeRun2New from "@/assets/thumbnails/temple-run-2-new.jpg";
import flappyBirdNew from "@/assets/thumbnails/flappy-bird-new.jpg";
import masterChessNew from "@/assets/thumbnails/master-chess-new.jpg";
import maskedForcesNew from "@/assets/thumbnails/masked-forces-new.jpg";
import clusterRushNew from "@/assets/thumbnails/cluster-rush-new.jpg";
import paperIo2New from "@/assets/thumbnails/paper-io-2-new.jpg";

export interface Game {
  id: string;
  title: string;
  tags: string[];
  thumbnail?: string;
  url: string;
  featured?: boolean;
  premium?: boolean;
  secret?: boolean;
  earlyAccess?: boolean;
}

export const games: Game[] = [
  // --- 🔥 Most Popular Games (Featured) ---
  {
    id: "slope",
    title: "Slope",
    tags: ["arcade", "reflex", "running"],
    thumbnail: slope,
    url: "https://basketballgamesonline.github.io/g5/class-450",
    featured: true,
  },
  {
    id: "retro-bowl",
    title: "Retro Bowl",
    tags: ["sports", "football"],
    thumbnail: retroBowl,
    url: "https://basketballgamesonline.github.io/g5/class-400",
    featured: true,
  },
  {
    id: "1v1-lol",
    title: "1v1.lol",
    tags: ["shooter", "multiplayer"],
    thumbnail: oneVOneLol,
    url: "https://basketballgamesonline.github.io/g77/class-439",
    featured: true,
  },
  {
    id: "subway-surfers",
    title: "Subway Surfers New York",
    tags: ["endless runner", "arcade"],
    thumbnail: subwaySurfers,
    url: "https://basketballgamesonline.github.io/g26/class-444",
    featured: true,
  },
  {
    id: "super-mario-bros",
    title: "Super Mario Bros",
    tags: ["platform", "classic"],
    thumbnail: superMarioBros,
    url: "https://basketballgamesonline.github.io/g/class-826",
    featured: true,
  },
  {
    id: "cookie-clicker",
    title: "Cookie Clicker",
    tags: ["idle", "clicker", "simulation"],
    thumbnail: cookieClicker,
    url: "https://basketballgamesonline.github.io/g5/class-448",
    featured: true,
  },
  {
    id: "geometry-dash",
    title: "Geometry Dash",
    tags: ["running", "rhythm", "arcade"],
    thumbnail: geometryDash,
    url: "https://basketballgamesonline.github.io/g26/class-453",
    featured: true,
  },
  {
    id: "bitlife",
    title: "Bitlife",
    tags: ["simulation", "life"],
    thumbnail: bitlife,
    url: "https://basketballgamesonline.github.io/g5/class-441",
    featured: true,
  },
  {
    id: "tunnel-rush",
    title: "Tunnel Rush",
    tags: ["arcade", "reflex"],
    thumbnail: tunnelRush,
    url: "https://basketballgamesonline.github.io/g5/class-404",
    featured: true,
  },
  {
    id: "eggy-car",
    title: "Eggy Car",
    tags: ["racing", "physics"],
    thumbnail: eggyCar,
    url: "https://basketballgamesonline.github.io/g5/class-463",
    featured: true,
  },

  // --- 🏃 Running & Parkour Games ---
  { id: "parkour-race", title: "Parkour Race", tags: ["running", "parkour"], thumbnail: parkourRace, url: "https://basketballgamesonline.github.io/g77/class-830" },
  { id: "cluster-rush", title: "Cluster Rush", tags: ["running", "arcade"], thumbnail: clusterRushNew, url: "https://basketballgamesonline.github.io/g26/class-526" },
  { id: "slope-2", title: "Slope 2", tags: ["running", "arcade"], thumbnail: slope2, url: "https://basketballgamesonline.github.io/g2/class-437" },
  { id: "run-3-editor", title: "Run 3 Editor", tags: ["running", "endless"], url: "https://basketballgamesonline.github.io/g/class-819" },
  { id: "ovo", title: "Ovo", tags: ["jumping", "platformer"], thumbnail: ovo, url: "https://basketballgamesonline.github.io/g5/class-456" },

  // --- 🏀 Sports Games ---
  { id: "basketball-stars", title: "Basketball Stars", tags: ["sports", "basketball"], thumbnail: basketballStars, url: "https://basketballgamesonline.github.io/g5/class-449" },
  { id: "basket-bros", title: "Basket Bros", tags: ["sports", "basketball"], thumbnail: basketBros, url: "https://basketballgamesonline.github.io/g97/class-482" },
  { id: "basket-random", title: "Basket Random", tags: ["sports", "basketball"], thumbnail: soccerRandom, url: "https://basketballgamesonline.github.io/g26/class-436" },
  { id: "soccer-random", title: "Soccer Random", tags: ["sports", "soccer"], thumbnail: soccerRandom, url: "https://basketballgamesonline.github.io/g26/class-511" },
  { id: "soccer-skills-cl", title: "Soccer Skills Champions League", tags: ["sports", "soccer"], url: "https://basketballgamesonline.github.io/g2/class-588" },
  { id: "super-liquid-soccer", title: "Super Liquid Soccer", tags: ["sports", "soccer"], url: "https://basketballgamesonline.github.io/g69/class-628" },
  { id: "penalty-shooters-2", title: "Penalty Shooters 2", tags: ["sports", "soccer"], url: "https://basketballgamesonline.github.io/g2/class-627" },
  { id: "rocket-soccer-derby", title: "Rocket Soccer Derby", tags: ["sports", "soccer"], url: "https://basketballgamesonline.github.io/g2/class-527" },
  { id: "tiny-fishing", title: "Tiny Fishing", tags: ["sports", "fishing"], url: "https://basketballgamesonline.github.io/g5/class-451" },
  { id: "4th-and-goal-2022", title: "4th And Goal 2022", tags: ["sports", "football"], url: "https://basketballgamesonline.github.io/g16/class-685" },
  { id: "blumgi-ball", title: "Blumgi Ball", tags: ["sports", "basketball"], url: "https://basketballgamesonline.github.io/g16/class-419" },
  { id: "dreadhead-parkour", title: "Dreadhead Parkour", tags: ["sports", "parkour"], url: "https://basketballgamesonline.github.io/g97/class-412" },
  { id: "tanuki-sunset", title: "Tanuki Sunset", tags: ["sports", "skateboarding"], url: "https://basketballgamesonline.github.io/g26/class-488" },
  { id: "speed-pool-king", title: "Speed Pool King", tags: ["sports", "pool"], thumbnail: speedPoolKing, url: "https://basketballgamesonline.github.io/g97/class-146" },

  // --- 🏎️ Racing Games ---
  { id: "moto-x3m", title: "Moto X3M", tags: ["racing", "motorcycle"], thumbnail: motoX3m, url: "https://basketballgamesonline.github.io/g26/class-458" },
  { id: "drive-mad", title: "Drive Mad", tags: ["racing", "cars"], thumbnail: driveMad, url: "https://basketballgamesonline.github.io/g20/class-401" },
  { id: "drift-boss", title: "Drift Boss", tags: ["racing", "drift"], thumbnail: driftBossNew, url: "https://basketballgamesonline.github.io/g5/class-472" },
  { id: "drift-hunters", title: "Drift Hunters", tags: ["racing", "drift"], thumbnail: driftHuntersNew, url: "https://basketballgamesonline.github.io/g5/class-447" },
  { id: "car-drift-racers-2", title: "Car Drift Racers 2", tags: ["racing", "drift"], thumbnail: carDriftRacers2, url: "https://basketballgamesonline.github.io/g3/class-601" },
  { id: "poly-track", title: "Poly Track", tags: ["racing", "arcade"], thumbnail: polyTrack, url: "https://lizzyben1.github.io/polytrackfix/polytrack/" },
  { id: "furious-racing-3d", title: "Furious Racing 3D", tags: ["racing", "cars"], thumbnail: furiousRacing3d, url: "https://basketballgamesonline.github.io/g97/class-793" },
  { id: "parking-fury-beach", title: "Parking Fury 3D Beach City", tags: ["racing", "parking"], url: "https://basketballgamesonline.github.io/g3/class-724" },
  { id: "madalin-stunt-cars-3", title: "Madalin Stunt Cars 3", tags: ["racing", "stunts"], url: "https://basketballgamesonline.github.io/g5/class-566" },
  { id: "highway-traffic", title: "Highway Traffic", tags: ["racing", "cars"], url: "https://basketballgamesonline.github.io/g97/class-522" },
  { id: "offroader-v5", title: "Offroader V5", tags: ["racing", "offroad"], url: "https://basketballgamesonline.github.io/g72/class-751" },

  // --- 🎮 Action Games ---
  { id: "stickman-hook", title: "Stickman Hook", tags: ["action", "stickman"], thumbnail: stickmanHook, url: "https://basketballgamesonline.github.io/g5/class-406" },
  { id: "stickman-climb-2", title: "Stickman Climb 2", tags: ["action", "stickman"], thumbnail: stickmanClimb2, url: "https://basketballgamesonline.github.io/g2/class-426" },
  { id: "stickman-bike", title: "Stickman Bike", tags: ["action", "stickman"], thumbnail: stickmanBike, url: "https://basketballgamesonline.github.io/g2/class-590" },
  { id: "rooftop-snipers", title: "Rooftop Snipers", tags: ["action", "shooter"], thumbnail: rooftopSnipers, url: "https://basketballgamesonline.github.io/g5/class-481" },
  { id: "masked-forces", title: "Masked Forces", tags: ["action", "shooter"], thumbnail: maskedForcesNew, url: "https://basketballgamesonline.github.io/g26/class-525" },
  { id: "raft-wars", title: "Raft Wars", tags: ["action", "strategy"], thumbnail: raftWars, url: "https://basketballgamesonline.github.io/g5/class-409" },
  { id: "red-ball-4", title: "Red Ball 4", tags: ["action", "platformer"], thumbnail: redBall4, url: "https://basketballgamesonline.github.io/g22/class-491" },
  { id: "bob-robber-4", title: "Bob The Robber 4", tags: ["action", "stealth"], thumbnail: bobRobber4, url: "https://basketballgamesonline.github.io/g97/class-568" },
  { id: "temple-run-2", title: "Temple Run 2", tags: ["action", "endless runner"], thumbnail: templeRun2New, url: "https://basketballgamesonline.github.io/g26/class-405" },
  { id: "temple-of-boom", title: "Temple Of Boom", tags: ["action", "shooter"], url: "https://basketballgamesonline.github.io/g69/class-411" },
  { id: "murder", title: "Murder", tags: ["action", "stealth"], url: "https://basketballgamesonline.github.io/g72/class-580" },
  { id: "hills-of-steel", title: "Hills Of Steel", tags: ["action", "tanks"], url: "https://basketballgamesonline.github.io/g22/class-359" },
  { id: "getaway-shootout", title: "Getaway Shootout", tags: ["action", "multiplayer"], url: "https://basketballgamesonline.github.io/g9/class-479" },
  { id: "level-devil", title: "Level Devil", tags: ["action", "platformer"], url: "https://basketballgamesonline.github.io/g22/class-356" },
  { id: "blumgi-dragon", title: "Blumgi Dragon", tags: ["action", "adventure"], url: "https://basketballgamesonline.github.io/g22/class-363" },
  { id: "bacon-may-die", title: "Bacon May Die", tags: ["action", "fighting"], url: "https://basketballgamesonline.github.io/g177/class-334" },
  { id: "flip-bros", title: "Flip Bros", tags: ["action", "multiplayer"], url: "https://basketballgamesonline.github.io/g22/class-358" },

  // --- 🎯 Shooting Games ---
  { id: "gunspin", title: "Gunspin", tags: ["shooting", "arcade"], url: "https://basketballgamesonline.github.io/g5/class-533" },

  // --- 🧩 Puzzle Games ---
  { id: "2048", title: "2048", tags: ["puzzle", "numbers"], thumbnail: game2048, url: "https://lizzyben1.github.io/poopygamesbeta/play/2048/" },
  { id: "water-color-sort", title: "Water Color Sort", tags: ["puzzle", "casual"], thumbnail: waterColorSort, url: "https://basketballgamesonline.github.io/g69/class-635" },
  { id: "impossible-quiz", title: "The Impossible Quiz", tags: ["puzzle", "quiz"], url: "https://basketballgamesonline.github.io/g26/class-480" },
  { id: "tomb-of-mask", title: "Tomb Of The Mask", tags: ["puzzle", "thinking"], thumbnail: tombOfMask, url: "https://basketballgamesonline.github.io/g26/class-438" },
  { id: "master-chess", title: "Master Chess", tags: ["puzzle", "strategy"], thumbnail: masterChessNew, url: "https://basketballgamesonline.github.io/g97/class-506" },
  { id: "traffic-escape", title: "Traffic Escape", tags: ["puzzle", "casual"], url: "https://basketballgamesonline.github.io/g22/class-357" },
  { id: "growmi", title: "Growmi", tags: ["puzzle", "platformer"], url: "https://basketballgamesonline.github.io/g4/class-182" },

  // --- 🎵 Rhythm Games ---
  { id: "fnf-b-sides", title: "Friday Night Funkin B-Sides", tags: ["rhythm", "music"], url: "https://basketballgamesonline.github.io/fnf3/class-348" },
  { id: "fnf-shaggy-matt", title: "Friday Night Funkin vs Shaggy x Matt", tags: ["rhythm", "music"], url: "https://basketballgamesonline.github.io/fnf3/class-347" },
  { id: "dance-fire-ice", title: "A Dance Of Fire And Ice", tags: ["rhythm", "music"], url: "https://basketballgamesonline.github.io/g26/class-498" },

  // --- 🎭 Adventure Games ---
  { id: "fireboy-watergirl", title: "Fireboy and Watergirl 1: Forest Temple", tags: ["adventure", "puzzle"], thumbnail: fireboyWatergirl, url: "https://basketballgamesonline.github.io/g177/class-346" },
  { id: "yohoho-io", title: "YoHoHo.io", tags: ["adventure", "io"], thumbnail: yohohoIo, url: "https://basketballgamesonline.github.io/g77/class-828" },
  { id: "escaping-prison", title: "Escaping The Prison", tags: ["adventure", "escape"], thumbnail: escapingPrison, url: "https://basketballgamesonline.github.io/g97/class-780" },
  { id: "archer-master-3d", title: "Archer Master 3D Castle Defense", tags: ["adventure", "strategy"], url: "https://basketballgamesonline.github.io/g177/class-340" },
  { id: "we-become-what-we-behold", title: "We Become What We Behold", tags: ["adventure", "story"], url: "https://basketballgamesonline.github.io/g69/class-485" },

  // --- 🎲 Strategy & Multiplayer ---
  { id: "among-us", title: "Among Us", tags: ["strategy", "multiplayer"], thumbnail: amongUsNew, url: "https://basketballgamesonline.github.io/g5/class-468" },
  { id: "paper-io-2", title: "Paper Io 2", tags: ["strategy", "io"], thumbnail: paperIo2New, url: "https://basketballgamesonline.github.io/g/class-505" },

  // --- 🕹️ Arcade & Skill Games ---
  { id: "crossy-road", title: "Crossy Road", tags: ["arcade", "endless runner"], thumbnail: crossyRoadNew, url: "https://basketballgamesonline.github.io/g20/class-402" },
  { id: "flappy-bird", title: "Flappy Bird Origin", tags: ["arcade", "skill"], thumbnail: flappyBirdNew, url: "https://basketballgamesonline.github.io/g26/class-434" },
  { id: "sausage-flip", title: "Sausage Flip", tags: ["arcade", "physics"], thumbnail: sausageFlip, url: "https://basketballgamesonline.github.io/g2/class-415" },
  { id: "blumgi-rocket", title: "Blumgi Rocket", tags: ["skill", "arcade"], url: "https://basketballgamesonline.github.io/g16/class-413" },
  { id: "blumgi-slime", title: "Blumgi Slime", tags: ["skill", "platformer"], url: "https://basketballgamesonline.github.io/g16/class-421" },
  { id: "house-of-hazards", title: "House Of Hazards", tags: ["skill", "multiplayer"], url: "https://basketballgamesonline.github.io/g5/class-490" },
  { id: "fruit-ninja", title: "Fruit Ninja", tags: ["skill", "arcade"], url: "https://basketballgamesonline.github.io/g50/class-22" },

  // --- 💤 Idle & Clicker Games ---
  { id: "monkey-mart", title: "Monkey Mart", tags: ["idle", "management"], thumbnail: monkeyMart, url: "https://basketballgamesonline.github.io/g77/class-829" },
  { id: "doge-miner", title: "Doge Miner", tags: ["clicker", "idle"], url: "https://basketballgamesonline.github.io/g97/class-476" },
  { id: "idle-ants", title: "Idle Ants", tags: ["idle", "simulation"], url: "https://basketballgamesonline.github.io/g72/class-631" },
  { id: "chicken-merge", title: "Chicken Merge", tags: ["idle", "merge"], url: "https://basketballgamesonline.github.io/g9/class-641" },

  // --- 🌸 Casual & Relaxing Games ---
  { id: "gold-digger-frvr", title: "Gold Digger Frvr", tags: ["casual", "mining"], url: "https://basketballgamesonline.github.io/g9/class-584" },

  // --- 🐯 Simulation Games ---
  { id: "tiger-simulator-3d", title: "Tiger Simulator 3D", tags: ["simulation", "3d"], url: "https://basketballgamesonline.github.io/g69/class-587" },

  // --- 🎭 Creative & Party Games ---
  { id: "make-it-meme", title: "Make it meme", tags: ["multiplayer", "creative"], url: "https://basketballgamesonline.github.io/g22/class-368" },
];

