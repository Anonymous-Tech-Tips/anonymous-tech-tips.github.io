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
import run3Editor from "@/assets/thumbnails/run-3-editor.png";
import soccerSkillsCL from "@/assets/thumbnails/soccer-skills-cl.png";
import superLiquidSoccer from "@/assets/thumbnails/super-liquid-soccer.png";
import penaltyShooters2 from "@/assets/thumbnails/penalty-shooters-2.png";
import rocketSoccerDerby from "@/assets/thumbnails/rocket-soccer-derby.png";
import tinyFishing from "@/assets/thumbnails/tiny-fishing.png";
import game4thAndGoal from "@/assets/thumbnails/4th-and-goal-2022.png";
import blumgiBall from "@/assets/thumbnails/blumgi-ball.png";
import dreadheadParkour from "@/assets/thumbnails/dreadhead-parkour.png";
import tanukiSunset from "@/assets/thumbnails/tanuki-sunset.png";
import snowRider3D from "@/assets/thumbnails/snow-rider-3d.png";
import parkingFuryBeach from "@/assets/thumbnails/parking-fury-beach.png";
import madalinStuntCars3 from "@/assets/thumbnails/madalin-stunt-cars-3.png";
import highwayTraffic from "@/assets/thumbnails/highway-traffic.png";
import offroaderV5 from "@/assets/thumbnails/offroader-v5.png";
import templeOfBoom from "@/assets/thumbnails/temple-of-boom.png";
import murderGame from "@/assets/thumbnails/murder.png";
import hillsOfSteel from "@/assets/thumbnails/hills-of-steel.png";
import chickenMerge from "@/assets/thumbnails/chicken-merge.png";
import goldDiggerFrvr from "@/assets/thumbnails/gold-digger-frvr.png";
import tigerSimulator3d from "@/assets/thumbnails/tiger-simulator-3d.png";
import makeItMeme from "@/assets/thumbnails/make-it-meme.png";
import getawayShootout from "@/assets/thumbnails/getaway-shootout.png";
import levelDevil from "@/assets/thumbnails/level-devil.png";
import blumgiDragon from "@/assets/thumbnails/blumgi-dragon.png";
import baconMayDie from "@/assets/thumbnails/bacon-may-die.png";
import flipBros from "@/assets/thumbnails/flip-bros.png";
import gunspin from "@/assets/thumbnails/gunspin.png";
import impossibleQuiz from "@/assets/thumbnails/impossible-quiz.png";
import trafficEscape from "@/assets/thumbnails/traffic-escape.png";

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
    thumbnail: "/topvaz66/img/class-450.png",
    url: "/topvaz66/source/class-450/index.html",
    featured: true,
  },
  {
    id: "retro-bowl",
    title: "Retro Bowl",
    tags: ["blocked", "sports", "football"],
    thumbnail: retroBowl,
    url: "https://vaz63.github.io/g5/class-400",
    featured: true,
  },
  {
    id: "1v1-lol",
    title: "1v1.lol",
    tags: ["blocked", "shooter", "multiplayer"],
    thumbnail: oneVOneLol,
    url: "https://vaz63.github.io/g77/class-439",
    featured: true,
  },
  {
    id: "subway-surfers",
    title: "Subway Surfers New York",
    tags: ["blocked", "endless runner", "arcade"],
    thumbnail: subwaySurfers,
    url: "https://vaz63.github.io/g26/class-444",
    featured: true,
  },
  {
    id: "super-mario-bros",
    title: "Super Mario Bros",
    tags: ["blocked", "platform", "classic"],
    thumbnail: superMarioBros,
    url: "https://vaz63.github.io/g/class-826",
    featured: true,
  },
  {
    id: "cookie-clicker",
    title: "Cookie Clicker",
    tags: ["idle", "clicker", "simulation"],
    thumbnail: "/topvaz66/img/class-448.png",
    url: "/topvaz66/source/class-448/index.html",
    featured: true,
  },
  {
    id: "geometry-dash",
    title: "Geometry Dash",
    tags: ["running", "rhythm", "arcade"],
    thumbnail: "/topvaz66/img/class-453.png",
    url: "/topvaz66/source/class-453/index.html",
    featured: true,
  },
  {
    id: "bitlife",
    title: "Bitlife",
    tags: ["blocked", "simulation", "life"],
    thumbnail: bitlife,
    url: "https://vaz63.github.io/g5/class-441",
    featured: true,
  },
  {
    id: "tunnel-rush",
    title: "Tunnel Rush",
    tags: ["arcade", "reflex"],
    thumbnail: "/topvaz66/img/class-404.png",
    url: "/topvaz66/source/class-404/index.html",
    featured: true,
  },
  {
    id: "eggy-car",
    title: "Eggy Car",
    tags: ["blocked", "racing", "physics"],
    thumbnail: eggyCar,
    url: "https://vaz63.github.io/g5/class-463",
    featured: true,
  },

  // --- 🏃 Running & Parkour Games ---
  { id: "parkour-race", title: "Parkour Race", tags: ["blocked", "running", "parkour"], thumbnail: parkourRace, url: "https://vaz63.github.io/g77/class-830" },
  { id: "cluster-rush", title: "Cluster Rush", tags: ["blocked", "running", "arcade"], thumbnail: clusterRushNew, url: "https://vaz63.github.io/g26/class-526" },
  { id: "slope-2", title: "Slope 2", tags: ["running", "arcade"], thumbnail: "/topvaz66/img/class-437.png", url: "/topvaz66/source/class-437/index.html" },
  { id: "run-3-editor", title: "Run 3 Editor", tags: ["blocked", "running", "endless"], thumbnail: run3Editor, url: "https://vaz63.github.io/g/class-819" },
  { id: "ovo", title: "Ovo", tags: ["blocked", "jumping", "platformer"], thumbnail: ovo, url: "https://vaz63.github.io/g5/class-456" },

  // --- 🏀 Sports Games ---
  { id: "basketball-stars", title: "Basketball Stars", tags: ["blocked", "sports", "basketball"], thumbnail: basketballStars, url: "https://vaz63.github.io/g5/class-449" },
  { id: "basket-bros", title: "Basket Bros", tags: ["sports", "basketball"], thumbnail: "/topvaz66/img/class-482.png", url: "/topvaz66/source/class-482/index.html" },
  { id: "basket-random", title: "Basket Random", tags: ["blocked", "sports", "basketball"], thumbnail: soccerRandom, url: "https://vaz63.github.io/g26/class-436" },
  { id: "soccer-random", title: "Soccer Random", tags: ["blocked", "sports", "soccer"], thumbnail: soccerRandom, url: "https://vaz63.github.io/g26/class-511" },
  { id: "soccer-skills-cl", title: "Soccer Skills Champions League", tags: ["blocked", "sports", "soccer"], thumbnail: soccerSkillsCL, url: "https://vaz63.github.io/g2/class-588" },
  { id: "super-liquid-soccer", title: "Super Liquid Soccer", tags: ["blocked", "sports", "soccer"], thumbnail: superLiquidSoccer, url: "https://vaz63.github.io/g69/class-628" },
  { id: "penalty-shooters-2", title: "Penalty Shooters 2", tags: ["blocked", "sports", "soccer"], thumbnail: penaltyShooters2, url: "https://vaz63.github.io/g2/class-627" },
  { id: "rocket-soccer-derby", title: "Rocket Soccer Derby", tags: ["sports", "soccer"], thumbnail: "/topvaz66/img/class-527.png", url: "/topvaz66/source/class-527/index.html" },
  { id: "tiny-fishing", title: "Tiny Fishing", tags: ["sports", "fishing"], thumbnail: "/topvaz66/img/class-451.png", url: "/topvaz66/source/class-451/index.html" },
  { id: "4th-and-goal-2022", title: "4th And Goal 2022", tags: ["blocked", "sports", "football"], thumbnail: game4thAndGoal, url: "https://vaz63.github.io/g16/class-685" },
  { id: "blumgi-ball", title: "Blumgi Ball", tags: ["blocked", "sports", "basketball"], thumbnail: blumgiBall, url: "https://vaz63.github.io/g16/class-419" },
  { id: "dreadhead-parkour", title: "Dreadhead Parkour", tags: ["blocked", "sports", "parkour"], thumbnail: dreadheadParkour, url: "https://vaz63.github.io/g97/class-412" },
  { id: "tanuki-sunset", title: "Tanuki Sunset", tags: ["sports", "skateboarding"], thumbnail: "/topvaz66/img/class-488.png", url: "/topvaz66/source/class-488/index.html" },
  { id: "speed-pool-king", title: "Speed Pool King", tags: ["blocked", "sports", "pool"], thumbnail: speedPoolKing, url: "https://vaz63.github.io/g97/class-146" },

  // --- 🏎️ Racing Games ---
  { id: "moto-x3m", title: "Moto X3M", tags: ["blocked", "racing", "motorcycle"], thumbnail: motoX3m, url: "https://vaz63.github.io/g26/class-458" },
  { id: "drive-mad", title: "Drive Mad", tags: ["blocked", "racing", "cars"], thumbnail: driveMad, url: "https://vaz63.github.io/g20/class-401" },
  { id: "drift-boss", title: "Drift Boss", tags: ["blocked", "racing", "drift"], thumbnail: driftBossNew, url: "https://vaz63.github.io/g5/class-472" },
  { id: "drift-hunters", title: "Drift Hunters", tags: ["blocked", "racing", "drift"], thumbnail: driftHuntersNew, url: "https://vaz63.github.io/g5/class-447" },
  { id: "car-drift-racers-2", title: "Car Drift Racers 2", tags: ["blocked", "racing", "drift"], thumbnail: carDriftRacers2, url: "https://vaz63.github.io/g3/class-601" },
  { id: "poly-track", title: "Poly Track", tags: ["blocked", "racing", "arcade"], thumbnail: polyTrack, url: "https://polytrack-online.github.io/file/" },
  { id: "snow-rider", title: "Snow Rider 3D", tags: ["blocked", "racing", "winter"], thumbnail: snowRider3D, url: "https://snow-rider3d.github.io/file/" },
  { id: "furious-racing-3d", title: "Furious Racing 3D", tags: ["blocked", "racing", "cars"], thumbnail: furiousRacing3d, url: "https://vaz63.github.io/g97/class-793" },
  { id: "parking-fury-beach", title: "Parking Fury 3D Beach City", tags: ["blocked", "racing", "parking"], thumbnail: parkingFuryBeach, url: "https://vaz63.github.io/g3/class-724" },
  { id: "madalin-stunt-cars-3", title: "Madalin Stunt Cars 3", tags: ["blocked", "racing", "stunts"], thumbnail: madalinStuntCars3, url: "https://vaz63.github.io/g5/class-566" },
  { id: "highway-traffic", title: "Highway Traffic", tags: ["blocked", "racing", "cars"], thumbnail: highwayTraffic, url: "https://vaz63.github.io/g97/class-522" },
  { id: "offroader-v5", title: "Offroader V5", tags: ["blocked", "racing", "offroad"], thumbnail: offroaderV5, url: "https://vaz63.github.io/g72/class-751" },

  // --- 🎮 Action Games ---
  { id: "stickman-hook", title: "Stickman Hook", tags: ["blocked", "action", "stickman"], thumbnail: stickmanHook, url: "https://vaz63.github.io/g5/class-406" },
  { id: "stickman-climb-2", title: "Stickman Climb 2", tags: ["blocked", "action", "stickman"], thumbnail: stickmanClimb2, url: "https://vaz63.github.io/g2/class-426" },
  { id: "stickman-bike", title: "Stickman Bike", tags: ["blocked", "action", "stickman"], thumbnail: stickmanBike, url: "https://vaz63.github.io/g2/class-590" },
  { id: "rooftop-snipers", title: "Rooftop Snipers", tags: ["blocked", "action", "shooter"], thumbnail: rooftopSnipers, url: "https://vaz63.github.io/g5/class-481" },
  { id: "masked-forces", title: "Masked Forces", tags: ["blocked", "action", "shooter"], thumbnail: maskedForcesNew, url: "https://vaz63.github.io/g26/class-525" },
  { id: "raft-wars", title: "Raft Wars", tags: ["blocked", "action", "strategy"], thumbnail: raftWars, url: "https://vaz63.github.io/g5/class-409" },
  { id: "red-ball-4", title: "Red Ball 4", tags: ["blocked", "action", "platformer"], thumbnail: redBall4, url: "https://vaz63.github.io/g22/class-491" },
  { id: "bob-robber-4", title: "Bob The Robber 4", tags: ["blocked", "action", "stealth"], thumbnail: bobRobber4, url: "https://vaz63.github.io/g97/class-568" },
  { id: "temple-run-2", title: "Temple Run 2", tags: ["action", "endless runner"], thumbnail: "/topvaz66/img/class-405.png", url: "/topvaz66/source/class-405/index.html" },
  { id: "temple-of-boom", title: "Temple Of Boom", tags: ["blocked", "action", "shooter"], thumbnail: templeOfBoom, url: "https://vaz63.github.io/g69/class-411" },
  { id: "murder", title: "Murder", tags: ["blocked", "action", "stealth"], thumbnail: murderGame, url: "https://vaz63.github.io/g72/class-580" },
  { id: "hills-of-steel", title: "Hills Of Steel", tags: ["blocked", "action", "tanks"], thumbnail: hillsOfSteel, url: "https://vaz63.github.io/g22/class-359" },
  { id: "getaway-shootout", title: "Getaway Shootout", tags: ["blocked", "action", "multiplayer"], thumbnail: getawayShootout, url: "https://vaz63.github.io/g9/class-479" },
  { id: "level-devil", title: "Level Devil", tags: ["action", "platformer"], thumbnail: "/topvaz66/img/class-356.png", url: "/topvaz66/source/class-356/index.html" },
  { id: "blumgi-dragon", title: "Blumgi Dragon", tags: ["blocked", "action", "adventure"], thumbnail: blumgiDragon, url: "https://vaz63.github.io/g22/class-363" },
  { id: "bacon-may-die", title: "Bacon May Die", tags: ["blocked", "action", "fighting"], thumbnail: baconMayDie, url: "https://vaz63.github.io/g177/class-334" },
  { id: "flip-bros", title: "Flip Bros", tags: ["blocked", "action", "multiplayer"], thumbnail: flipBros, url: "https://vaz63.github.io/g22/class-358" },

  // --- 🎯 Shooting Games ---
  { id: "gunspin", title: "Gunspin", tags: ["blocked", "shooting", "arcade"], thumbnail: gunspin, url: "https://vaz63.github.io/g5/class-533" },

  // --- 🧩 Puzzle Games ---
  { id: "2048", title: "2048", tags: ["puzzle", "numbers"], thumbnail: "/topvaz66/img/class-452.png", url: "/topvaz66/source/class-452/index.html" },
  { id: "water-color-sort", title: "Water Color Sort", tags: ["blocked", "puzzle", "casual"], thumbnail: waterColorSort, url: "https://vaz63.github.io/g69/class-635" },
  { id: "impossible-quiz", title: "The Impossible Quiz", tags: ["blocked", "puzzle", "quiz"], thumbnail: impossibleQuiz, url: "https://vaz63.github.io/g26/class-480" },
  { id: "tomb-of-mask", title: "Tomb Of The Mask", tags: ["blocked", "puzzle", "thinking"], thumbnail: tombOfMask, url: "https://vaz63.github.io/g26/class-438" },
  { id: "master-chess", title: "Master Chess", tags: ["blocked", "puzzle", "strategy"], thumbnail: masterChessNew, url: "https://vaz63.github.io/g97/class-506" },
  { id: "traffic-escape", title: "Traffic Escape", tags: ["puzzle", "casual"], thumbnail: "/topvaz66/img/class-357.png",
    url: "/topvaz66/source/class-357/index.html" },
  { id: "growmi", title: "Growmi", tags: ["blocked", "puzzle", "platformer"], url: "https://vaz63.github.io/g4/class-182" },

  // --- 🎵 Rhythm Games ---
  { id: "fnf-b-sides", title: "Friday Night Funkin B-Sides", tags: ["blocked", "rhythm", "music"], url: "https://vaz63.github.io/fnf3/class-348" },
  { id: "fnf-shaggy-matt", title: "Friday Night Funkin vs Shaggy x Matt", tags: ["blocked", "rhythm", "music"], url: "https://vaz63.github.io/fnf3/class-347" },
  { id: "dance-fire-ice", title: "A Dance Of Fire And Ice", tags: ["blocked", "rhythm", "music"], url: "https://vaz63.github.io/g26/class-498" },

  // --- 🎭 Adventure Games ---
  { id: "fireboy-watergirl", title: "Fireboy and Watergirl 1: Forest Temple", tags: ["blocked", "adventure", "puzzle"], thumbnail: fireboyWatergirl, url: "https://vaz63.github.io/g177/class-346" },
  { id: "yohoho-io", title: "YoHoHo.io", tags: ["blocked", "adventure", "io"], thumbnail: yohohoIo, url: "https://vaz63.github.io/g77/class-828" },
  { id: "escaping-prison", title: "Escaping The Prison", tags: ["blocked", "adventure", "escape"], thumbnail: escapingPrison, url: "https://vaz63.github.io/g97/class-780" },
  { id: "archer-master-3d", title: "Archer Master 3D Castle Defense", tags: ["blocked", "adventure", "strategy"], url: "https://vaz63.github.io/g177/class-340" },
  { id: "we-become-what-we-behold", title: "We Become What We Behold", tags: ["blocked", "adventure", "story"], url: "https://vaz63.github.io/g69/class-485" },

  // --- 🎲 Strategy & Multiplayer ---
  { id: "among-us", title: "Among Us", tags: ["strategy", "multiplayer"], thumbnail: "/topvaz66/img/class-468.png", url: "/topvaz66/source/class-468/index.html" },
  { id: "paper-io-2", title: "Paper Io 2", tags: ["blocked", "strategy", "io"], thumbnail: paperIo2New, url: "https://vaz63.github.io/g/class-505" },

  // --- 🕹️ Arcade & Skill Games ---
  { id: "crossy-road", title: "Crossy Road", tags: ["arcade", "endless runner"], thumbnail: "/topvaz66/img/class-402.png", url: "/topvaz66/source/class-402/index.html" },
  { id: "flappy-bird", title: "Flappy Bird Origin", tags: ["blocked", "arcade", "skill"], thumbnail: flappyBirdNew, url: "https://vaz63.github.io/g26/class-434" },
  { id: "sausage-flip", title: "Sausage Flip", tags: ["blocked", "arcade", "physics"], thumbnail: sausageFlip, url: "https://vaz63.github.io/g2/class-415" },
  { id: "blumgi-rocket", title: "Blumgi Rocket", tags: ["blocked", "skill", "arcade"], url: "https://vaz63.github.io/g16/class-413" },
  { id: "blumgi-slime", title: "Blumgi Slime", tags: ["blocked", "skill", "platformer"], url: "https://vaz63.github.io/g16/class-421" },
  { id: "house-of-hazards", title: "House Of Hazards", tags: ["blocked", "skill", "multiplayer"], url: "https://vaz63.github.io/g5/class-490" },
  { id: "fruit-ninja", title: "Fruit Ninja", tags: ["blocked", "skill", "arcade"], url: "https://vaz63.github.io/g50/class-22" },

  // --- 💤 Idle & Clicker Games ---
  { id: "monkey-mart", title: "Monkey Mart", tags: ["blocked", "idle", "management"], thumbnail: monkeyMart, url: "https://vaz63.github.io/g77/class-829" },
  { id: "doge-miner", title: "Doge Miner", tags: ["blocked", "clicker", "idle"], url: "https://vaz63.github.io/g97/class-476" },
  { id: "idle-ants", title: "Idle Ants", tags: ["blocked", "idle", "simulation"], url: "https://vaz63.github.io/g72/class-631" },
  { id: "chicken-merge", title: "Chicken Merge", tags: ["blocked", "idle", "merge"], thumbnail: chickenMerge, url: "https://vaz63.github.io/g9/class-641" },

  // --- 🌸 Casual & Relaxing Games ---
  { id: "gold-digger-frvr", title: "Gold Digger Frvr", tags: ["blocked", "casual", "mining"], thumbnail: goldDiggerFrvr, url: "https://vaz63.github.io/g9/class-584" },

  // --- 🐯 Simulation Games ---
  { id: "tiger-simulator-3d", title: "Tiger Simulator 3D", tags: ["blocked", "simulation", "3d"], thumbnail: tigerSimulator3d, url: "https://vaz63.github.io/g69/class-587" },

  // --- 🎭 Creative & Party Games ---
  { id: "make-it-meme", title: "Make it meme", tags: ["blocked", "multiplayer", "creative"], thumbnail: makeItMeme, url: "https://vaz63.github.io/g22/class-368" },

  // --- 📦 New Local Games ---
  {
    id: "bad-ice-cream-2",
    title: "Bad Ice-Cream 2",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-273.png",
    url: "/topvaz66/source/class-273/index.html"
  },
  {
    id: "doodle-jump",
    title: "Doodle Jump",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-407.png",
    url: "/topvaz66/source/class-407/index.html"
  },
  {
    id: "flappy-bird",
    title: "Flappy Bird",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-435.png",
    url: "/topvaz66/source/class-435/index.html"
  },
  {
    id: "tetris-flash",
    title: "Tetris Flash",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-455.png",
    url: "/topvaz66/source/class-455/index.html"
  },
  {
    id: "minesweeper",
    title: "Minesweeper",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-465.png",
    url: "/topvaz66/source/class-465/index.html"
  },
  {
    id: "dinosaur-game",
    title: "Dinosaur Game",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-467.png",
    url: "/topvaz66/source/class-467/index.html"
  },
  {
    id: "wordle-unlimited",
    title: "Wordle Unlimited",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-469.png",
    url: "/topvaz66/source/class-469/index.html"
  },
  {
    id: "duck-life",
    title: "Duck Life",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-477.png",
    url: "/topvaz66/source/class-477/index.html"
  },
  {
    id: "duck-life-4",
    title: "Duck Life 4",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-478.png",
    url: "/topvaz66/source/class-478/index.html"
  },
  {
    id: "stack",
    title: "Stack",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-499.png",
    url: "/topvaz66/source/class-499/index.html"
  },
  {
    id: "scrap-metal",
    title: "Scrap Metal",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-504.png",
    url: "/topvaz66/source/class-504/index.html"
  },
  {
    id: "jelly-truck",
    title: "Jelly Truck",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-512.png",
    url: "/topvaz66/source/class-512/index.html"
  },
  {
    id: "draw-the-hill",
    title: "Draw The Hill",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-532.png",
    url: "/topvaz66/source/class-532/index.html"
  },
  {
    id: "stack-ball",
    title: "Stack Ball",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-536.png",
    url: "/topvaz66/source/class-536/index.html"
  },
  {
    id: "adventure-drivers",
    title: "Adventure Drivers",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-546.png",
    url: "/topvaz66/source/class-546/index.html"
  },
  {
    id: "duck-life-2",
    title: "Duck Life 2",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-560.png",
    url: "/topvaz66/source/class-560/index.html"
  },
  {
    id: "duck-life-3-evolution",
    title: "Duck Life 3 Evolution",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-561.png",
    url: "/topvaz66/source/class-561/index.html"
  },
  {
    id: "gun-mayhem",
    title: "Gun Mayhem",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-570.png",
    url: "/topvaz66/source/class-570/index.html"
  },
  {
    id: "basket-and-ball",
    title: "Basket And Ball",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-597.png",
    url: "/topvaz66/source/class-597/index.html"
  },
  {
    id: "tag",
    title: "Tag",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-633.png",
    url: "/topvaz66/source/class-633/index.html"
  },
  {
    id: "breaking-the-bank",
    title: "Breaking The Bank",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-782.png",
    url: "/topvaz66/source/class-782/index.html"
  },
  {
    id: "bloons-tower-defense-1",
    title: "Bloons Tower Defense 1",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-784.png",
    url: "/topvaz66/source/class-784/index.html"
  },
  {
    id: "2048-multitask",
    title: "2048 Multitask",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-790.png",
    url: "/topvaz66/source/class-790/index.html"
  },
  {
    id: "vex-6",
    title: "Vex 6",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-809.png",
    url: "/topvaz66/source/class-809/index.html"
  },
  {
    id: "paper-minecraft",
    title: "Paper Minecraft",
    tags: ["imported", "local"],
    thumbnail: "/topvaz66/img/class-827.png",
    url: "/topvaz66/source/class-827/index.html"
  },

  // --- 📦 New Local Games ---
];
