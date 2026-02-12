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
    thumbnail: "/strongdog/img/tunnelrush.webp",
    url: "/strongdog/html/tank trouble 2.html",
    featured: true,
  },
  {
    id: "retro-bowl",
    title: "Retro Bowl",
    tags: ["blocked", "sports", "football"],
    thumbnail: "/strongdog/img/red ball 4.jpg",
    url: "https://vaz63.github.io/g5/class-400",
    featured: true,
  },
  {
    id: "1v1-lol",
    title: "1v1.lol",
    tags: ["blocked", "shooter", "multiplayer"],
    thumbnail: "/strongdog/img/idle ants.jpg",
    url: "https://vaz63.github.io/g77/class-439",
    featured: true,
  },
  {
    id: "subway-surfers",
    title: "Subway Surfers New York",
    tags: ["blocked", "endless runner", "arcade"],
    thumbnail: "/strongdog/img/getaway-shootout.jfif",
    url: "https://vaz63.github.io/g26/class-444",
    featured: true,
  },
  {
    id: "super-mario-bros",
    title: "Super Mario Bros",
    tags: ["blocked", "platform", "classic"],
    thumbnail: "/strongdog/img/gunspin.jpg",
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
    thumbnail: "/strongdog/img/we become what we behold.jpg",
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
    thumbnail: "/strongdog/img/tag.jpg",
    url: "https://vaz63.github.io/g5/class-463",
    featured: true,
  },

  // --- 🏃 Running & Parkour Games ---
  { id: "parkour-race", title: "Parkour Race", tags: ["blocked", "running", "parkour"], thumbnail: "/strongdog/img/level devil.jpg", url: "https://vaz63.github.io/g77/class-830" },
  { id: "cluster-rush", title: "Cluster Rush", tags: ["blocked", "running", "arcade"], thumbnail: "/strongdog/img/water color sort.png", url: "https://vaz63.github.io/g26/class-526" },
  { id: "slope-2", title: "Slope 2", tags: ["running", "arcade"], thumbnail: "/topvaz66/img/class-437.png", url: "/topvaz66/source/class-437/index.html" },
  { id: "run-3-editor", title: "Run 3 Editor", tags: ["blocked", "running", "endless"], thumbnail: "/strongdog/img/supper liquid soccer.jfif", url: "https://vaz63.github.io/g/class-819" },
  { id: "ovo", title: "Ovo", tags: ["blocked", "jumping", "platformer"], thumbnail: "/strongdog/img/basket and ball.jfif", url: "https://vaz63.github.io/g5/class-456" },

  // --- 🏀 Sports Games ---
  { id: "basketball-stars", title: "Basketball Stars", tags: ["blocked", "sports", "basketball"], thumbnail: "/strongdog/img/adventure drivers.jfif", url: "https://vaz63.github.io/g5/class-449" },
  { id: "basket-bros", title: "Basket Bros", tags: ["sports", "basketball"], thumbnail: "/topvaz66/img/class-482.png", url: "/topvaz66/source/class-482/index.html" },
  { id: "basket-random", title: "Basket Random", tags: ["blocked", "sports", "basketball"], thumbnail: "/strongdog/img/draw the hill.jfif", url: "https://vaz63.github.io/g26/class-436" },
  { id: "soccer-random", title: "Soccer Random", tags: ["blocked", "sports", "soccer"], thumbnail: "/strongdog/img/toumb-of-the-mask.png", url: "https://vaz63.github.io/g26/class-511" },
  { id: "soccer-skills-cl", title: "Soccer Skills Champions League", tags: ["blocked", "sports", "soccer"], thumbnail: "/strongdog/img/adofai.png", url: "https://vaz63.github.io/g2/class-588" },
  { id: "super-liquid-soccer", title: "Super Liquid Soccer", tags: ["blocked", "sports", "soccer"], thumbnail: "/strongdog/img/knights blade.webp", url: "https://vaz63.github.io/g69/class-628" },
  { id: "penalty-shooters-2", title: "Penalty Shooters 2", tags: ["blocked", "sports", "soccer"], thumbnail: "/strongdog/img/polytrack.jfif", url: "https://vaz63.github.io/g2/class-627" },
  { id: "rocket-soccer-derby", title: "Rocket Soccer Derby", tags: ["sports", "soccer"], thumbnail: "/topvaz66/img/class-527.png", url: "/topvaz66/source/class-527/index.html" },
  { id: "tiny-fishing", title: "Tiny Fishing", tags: ["sports", "fishing"], thumbnail: "/topvaz66/img/class-451.png", url: "/topvaz66/source/class-451/index.html" },
  { id: "4th-and-goal-2022", title: "4th And Goal 2022", tags: ["blocked", "sports", "football"], thumbnail: "/strongdog/img/yohoho.io.jfif", url: "https://vaz63.github.io/g16/class-685" },
  { id: "blumgi-ball", title: "Blumgi Ball", tags: ["blocked", "sports", "basketball"], thumbnail: "/strongdog/img/escaping the pirson.jpg", url: "https://vaz63.github.io/g16/class-419" },
  { id: "dreadhead-parkour", title: "Dreadhead Parkour", tags: ["blocked", "sports", "parkour"], thumbnail: "/strongdog/img/breaking the bank.jpg", url: "https://vaz63.github.io/g97/class-412" },
  { id: "tanuki-sunset", title: "Tanuki Sunset", tags: ["sports", "skateboarding"], thumbnail: "/topvaz66/img/class-488.png", url: "/topvaz66/source/class-488/index.html" },
  { id: "speed-pool-king", title: "Speed Pool King", tags: ["blocked", "sports", "pool"], thumbnail: "/strongdog/img/monkey mart.png", url: "https://vaz63.github.io/g97/class-146" },

  // --- 🏎️ Racing Games ---
  { id: "moto-x3m", title: "Moto X3M", tags: ["blocked", "racing", "motorcycle"], thumbnail: "/strongdog/img/erase box.jpg", url: "https://vaz63.github.io/g26/class-458" },
  { id: "drive-mad", title: "Drive Mad", tags: ["blocked", "racing", "cars"], thumbnail: "/strongdog/img/raftwars.jpg", url: "https://vaz63.github.io/g20/class-401" },
  { id: "drift-boss", title: "Drift Boss", tags: ["blocked", "racing", "drift"], thumbnail: "/strongdog/img/stickmanhook.jpg", url: "https://vaz63.github.io/g5/class-472" },
  { id: "drift-hunters", title: "Drift Hunters", tags: ["blocked", "racing", "drift"], thumbnail: "/strongdog/img/snow-rider-3d-unblocked.png", url: "https://vaz63.github.io/g5/class-447" },
  { id: "car-drift-racers-2", title: "Car Drift Racers 2", tags: ["blocked", "racing", "drift"], thumbnail: "/strongdog/img/houseofhazards.jpg", url: "https://vaz63.github.io/g3/class-601" },
  { id: "poly-track", title: "Poly Track", tags: ["blocked", "racing", "arcade"], thumbnail: "/strongdog/img/ducklife.webp", url: "https://polytrack-online.github.io/file/" },
  { id: "snow-rider", title: "Snow Rider 3D", tags: ["blocked", "racing", "winter"], thumbnail: "/strongdog/img/ducklife2.webp", url: "https://snow-rider3d.github.io/file/" },
  { id: "furious-racing-3d", title: "Furious Racing 3D", tags: ["blocked", "racing", "cars"], thumbnail: "/strongdog/img/amongus.png", url: "https://vaz63.github.io/g97/class-793" },
  { id: "parking-fury-beach", title: "Parking Fury 3D Beach City", tags: ["blocked", "racing", "parking"], thumbnail: "/strongdog/img/2048.png", url: "https://vaz63.github.io/g3/class-724" },
  { id: "madalin-stunt-cars-3", title: "Madalin Stunt Cars 3", tags: ["blocked", "racing", "stunts"], thumbnail: "/strongdog/img/FlappyBird.png", url: "https://vaz63.github.io/g5/class-566" },
  { id: "highway-traffic", title: "Highway Traffic", tags: ["blocked", "racing", "cars"], thumbnail: "/strongdog/img/fruit.png", url: "https://vaz63.github.io/g97/class-522" },
  { id: "offroader-v5", title: "Offroader V5", tags: ["blocked", "racing", "offroad"], thumbnail: "/strongdog/img/papermc.png", url: "https://vaz63.github.io/g72/class-751" },

  // --- 🎮 Action Games ---
  { id: "stickman-hook", title: "Stickman Hook", tags: ["blocked", "action", "stickman"], thumbnail: "/strongdog/img/stack.jpeg", url: "https://vaz63.github.io/g5/class-406" },
  { id: "stickman-climb-2", title: "Stickman Climb 2", tags: ["blocked", "action", "stickman"], thumbnail: "/strongdog/img/breakout.webp", url: "https://vaz63.github.io/g2/class-426" },
  { id: "stickman-bike", title: "Stickman Bike", tags: ["blocked", "action", "stickman"], thumbnail: "/strongdog/img/doodle.webp", url: "https://vaz63.github.io/g2/class-590" },
  { id: "rooftop-snipers", title: "Rooftop Snipers", tags: ["blocked", "action", "shooter"], thumbnail: "/strongdog/img/fruitninja.webp", url: "https://vaz63.github.io/g5/class-481" },
  { id: "masked-forces", title: "Masked Forces", tags: ["blocked", "action", "shooter"], thumbnail: "/strongdog/img/multit.webp", url: "https://vaz63.github.io/g26/class-525" },
  { id: "raft-wars", title: "Raft Wars", tags: ["blocked", "action", "strategy"], thumbnail: "/strongdog/img/Racer.webp", url: "https://vaz63.github.io/g5/class-409" },
  { id: "red-ball-4", title: "Red Ball 4", tags: ["blocked", "action", "platformer"], thumbnail: "/strongdog/img/stack.webp", url: "https://vaz63.github.io/g22/class-491" },
  { id: "bob-robber-4", title: "Bob The Robber 4", tags: ["blocked", "action", "stealth"], thumbnail: "/strongdog/img/stackball.webp", url: "https://vaz63.github.io/g97/class-568" },
  { id: "temple-run-2", title: "Temple Run 2", tags: ["action", "endless runner"], thumbnail: "/topvaz66/img/class-405.png", url: "/topvaz66/source/class-405/index.html" },
  { id: "temple-of-boom", title: "Temple Of Boom", tags: ["blocked", "action", "shooter"], thumbnail: "/strongdog/img/vex6.webp", url: "https://vaz63.github.io/g69/class-411" },
  { id: "murder", title: "Murder", tags: ["blocked", "action", "stealth"], thumbnail: "/strongdog/img/tank trouble 2.png", url: "https://vaz63.github.io/g72/class-580" },
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

  {
    id: "free-kick-classic",
    title: "free kick classic",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/free kick classic.jpg",
    url: "/strongdog/html/free kick classic/index.html",
  },

  {
    id: "idle-restaurants-tycoon",
    title: "idle restaurants tycoon",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/idle restaurants tycoon.jpg",
    url: "/strongdog/html/idle restaurants tycoon/index.html",
  },

  {
    id: "jewels-blitz-2",
    title: "jewels blitz 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/jewels blitz 2.jpg",
    url: "/strongdog/html/jewels blitz 2/index.html",
  },

  {
    id: "infinite-soccer",
    title: "infinite soccer",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/infinite soccer.jpg",
    url: "/strongdog/html/infinite soccer/index.html",
  },

  {
    id: "save-the-doge",
    title: "save the doge",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/save the doge.jpg",
    url: "/strongdog/html/save the doge/index.html",
  },

  {
    id: "rise-of-neon-square",
    title: "rise of neon square",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/rise of neon square.jpg",
    url: "/strongdog/html/rise of neon square/index.html",
  },

  {
    id: "b-side",
    title: "b-side",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/b-side.jpg",
    url: "/strongdog/html/b-side/index.html",
  },

  {
    id: "baw",
    title: "baw",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/baw.jpg",
    url: "/strongdog/html/baw/index.html",
  },

  {
    id: "pixel-gun-apocalypse-2",
    title: "pixel gun apocalypse 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/pixel gun apocalypse 2.jpg",
    url: "/strongdog/html/pixel gun apocalypse 2/index.html",
  },

  {
    id: "minecraft-case-simulator",
    title: "minecraft case simulator",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/minecraft case simulator.jpg",
    url: "/strongdog/html/minecraft case simulator/index.html",
  },

  {
    id: "roper",
    title: "roper",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/roper.jpg",
    url: "/strongdog/html/roper/index.html",
  },

  {
    id: "bit-planes",
    title: "bit planes",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/bit planes.jpg",
    url: "/strongdog/html/bit planes/index.html",
  },

  {
    id: "idle-tree-city",
    title: "idle tree city",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/idle tree city.jpg",
    url: "/strongdog/html/idle tree city/index.html",
  },

  {
    id: "little-alchemy-2",
    title: "little alchemy 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/little alchemy 2.jpg",
    url: "/strongdog/html/little alchemy 2/index.html",
  },

  {
    id: "hanger",
    title: "hanger",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/hanger.jpg",
    url: "/strongdog/html/hanger/index.html",
  },

  {
    id: "get-on-top",
    title: "get on top",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/get on top.jpg",
    url: "/strongdog/html/get on top/index.html",
  },

  {
    id: "running-fred",
    title: "running fred",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/running fred.jpg",
    url: "/strongdog/html/running fred/index.html",
  },

  {
    id: "mutazone",
    title: "mutazone",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/mutazone.jpg",
    url: "/strongdog/html/mutazone/index.html",
  },

  {
    id: "moto-maniac-3",
    title: "moto maniac 3",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/moto maniac 3.jpg",
    url: "/strongdog/html/moto maniac 3/index.html",
  },

  {
    id: "gobdun",
    title: "gobdun",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/gobdun.jpg",
    url: "/strongdog/html/gobdun/index.html",
  },

  {
    id: "money-rush",
    title: "money rush",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/money rush.jpg",
    url: "/strongdog/html/money rush/index.html",
  },

  {
    id: "ovo-3d",
    title: "ovo 3d",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/ovo 3d.jpg",
    url: "/strongdog/html/ovo 3d/index.html",
  },

  {
    id: "ragdoll-hit",
    title: "ragdoll hit",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/ragdoll hit.jpg",
    url: "/strongdog/html/ragdoll hit/index.html",
  },

  {
    id: "skyblock",
    title: "skyblock",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/skyblock.jpg",
    url: "/strongdog/html/skyblock/index.html",
  },

  {
    id: "cannon-basketball",
    title: "cannon basketball",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cannon basketball.jpg",
    url: "/strongdog/html/cannon basketball/index.html",
  },

  {
    id: "cannon-basketball-2",
    title: "cannon basketball 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cannon basketball 2.jpg",
    url: "/strongdog/html/cannon basketball 2/index.html",
  },

  {
    id: "president-simulator",
    title: "president simulator",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/president simulator.jpg",
    url: "/strongdog/html/president simulator/index.html",
  },

  {
    id: "sausage-flipping",
    title: "sausage flipping",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/sausage flip.jpg",
    url: "/strongdog/html/sausage flipping/index.html",
  },

  {
    id: "pixel-smash-duel",
    title: "pixel smash duel",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/pixel smash duel.jpg",
    url: "/strongdog/html/pixel smash duel/index.html",
  },

  {
    id: "rocket-soccer-durbey",
    title: "rocket soccer durbey",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/rocket soccer durbey.jpg",
    url: "/strongdog/html/rocket soccer durbey/index.html",
  },

  {
    id: "rolly-vortex-ball",
    title: "rolly vortex ball",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/rolly vortex ball.jpg",
    url: "/strongdog/html/rolly vortex ball/index.html",
  },

  {
    id: "pacman-remake",
    title: "pacman remake",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/pacman remake.png",
    url: "/strongdog/html/pacman remake/index.html",
  },

  {
    id: "cannon-basketball-3",
    title: "cannon basketball 3",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cannon basketball 3.jpg",
    url: "/strongdog/html/cannon basketball 3/index.html",
  },

  {
    id: "trafficmania",
    title: "trafficmania",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/trafficmania.jpg",
    url: "/strongdog/html/trafficmania/index.html",
  },

  {
    id: "candy-clicker",
    title: "candy clicker",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/candy clicker.jpg",
    url: "/strongdog/html/candy clicker/index.html",
  },

  {
    id: "babel-tower",
    title: "babel tower",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/babel tower.jpg",
    url: "/strongdog/html/babel tower/index.html",
  },

  {
    id: "top-speed-3d",
    title: "top speed 3d",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/top speed 3d.jpg",
    url: "/strongdog/html/top speed 3d/index.html",
  },

  {
    id: "time-shooter-3",
    title: "time shooter 3",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/time shooter 3.jpg",
    url: "/strongdog/html/time shooter 3/index.html",
  },

  {
    id: "timber-man",
    title: "timber man",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/timber man.png",
    url: "/strongdog/html/timber man/index.html",
  },

  {
    id: "tap-tap-shots",
    title: "tap tap shots",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/tap tap shots.jpg",
    url: "/strongdog/html/tap tap shots/index.html",
  },

  {
    id: "gunblood",
    title: "gunblood",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/gunblood.jpg",
    url: "/strongdog/swf/gunblood/index.html",
  },

  {
    id: "tennis-random",
    title: "tennis random",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/tennis random.jpg",
    url: "/strongdog/html/tennis random/index.html",
  },

  {
    id: "zompocalypse",
    title: "zompocalypse",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/zompocalypse.jpg",
    url: "/strongdog/swf/zompocalypse/index.html",
  },

  {
    id: "zuck-vs-musk-beatdown",
    title: "zuck vs musk beatdown",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/zuck vs musk beatdown.jpg",
    url: "/strongdog/html/zuck vs musk beatdown/index.html",
  },

  {
    id: "ultimate-offroad-simulator",
    title: "ultimate offroad simulator",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/ultimate offroad simulator.jpg",
    url: "/strongdog/html/ultimate offroad simulator/index.html",
  },

  {
    id: "turn-turn",
    title: "turn turn",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/turn turn.jpg",
    url: "/strongdog/html/turn turn/index.html",
  },

  {
    id: "stickman-boost-2",
    title: "stickman boost 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/stickman boost 2.jpg",
    url: "/strongdog/html/stickman boost 2/index.html",
  },

  {
    id: "stickman-boost",
    title: "stickman boost",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/stickman boost.jpg",
    url: "/strongdog/html/stickman boost/index.html",
  },

  {
    id: "stick-duel-battle",
    title: "stick duel battle",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/stick duel battle.jpg",
    url: "/strongdog/html/stick duel battle/index.html",
  },

  {
    id: "stick-archers-battle",
    title: "stick archers battle",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/stick archers battle.jpg",
    url: "/strongdog/html/stick archers battle/index.html",
  },

  {
    id: "starblast-io",
    title: "starblast.io",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/starblast.io.jpg",
    url: "/strongdog/html/starblast.io/index.html",
  },

  {
    id: "sprinter",
    title: "sprinter",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/sprinter.jpg",
    url: "/strongdog/html/sprinter/index.html",
  },

  {
    id: "soccer-skills-euro-cup",
    title: "soccer skills euro cup",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/soccer skills euro cup.jpg",
    url: "/strongdog/html/soccer skills euro cup/index.html",
  },

  {
    id: "snow-battle-io",
    title: "snow battle.io",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/snow battle.io.jpg",
    url: "/strongdog/html/snow battle.io/index.html",
  },

  {
    id: "sniper-shot",
    title: "sniper shot",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/sniper shot.jpg",
    url: "/strongdog/html/sniper shot/index.html",
  },

  {
    id: "throw-a-potato-again",
    title: "Throw a Potato Again",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/throwapotato2.png",
    url: "/strongdog/html/throw a potato again/index.html",
  },

  {
    id: "throw-a-potato-in-space",
    title: "Throw a Potato in Space",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/throwapotato3.png",
    url: "/strongdog/html/throw a potato in space/index.html",
  },

  {
    id: "tube-clicker",
    title: "tube clicker",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/tube clicker.jpg",
    url: "/strongdog/html/tube clicker/index.html",
  },

  {
    id: "crossy-cat",
    title: "crossy cat",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/crossy cat.jpg",
    url: "/strongdog/html/crossy cat/game/index.html",
  },

  {
    id: "twin-shot-2",
    title: "twin shot 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/twin shot 2.jpg",
    url: "/strongdog/swf/twin shot 2/index.html",
  },

  {
    id: "block-shooter-frenzy",
    title: "block shooter frenzy",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/block shooter frenzy.jpg",
    url: "/strongdog/html/block shooter frenzy/index.html",
  },

  {
    id: "three-goblets",
    title: "three goblets",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/three goblets.png",
    url: "/strongdog/html/three goblets/index.html",
  },

  {
    id: "super-pickleball-adventure",
    title: "super pickleball adventure",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/super pickleball adventure.png",
    url: "/strongdog/html/super pickleball adventure/index.html",
  },

  {
    id: "squarex",
    title: "squareX",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/squarex.jpg",
    url: "/strongdog/html/squareX/index.html",
  },

  {
    id: "metrocubevania",
    title: "metrocubevania",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/metrocubevania.png",
    url: "/strongdog/html/metrocubevania/index.html",
  },

  {
    id: "knightin",
    title: "knightin",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/knightin.jpg",
    url: "/strongdog/html/knightin/index.html",
  },

  {
    id: "islander",
    title: "ISLANDER",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/ISLANDER.png",
    url: "/strongdog/html/ISLANDER/index.html",
  },

  {
    id: "final-earth-2",
    title: "final earth 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/finalearth2.png",
    url: "/strongdog/html/final earth 2/index.html",
  },

  {
    id: "delia-the-traveling-witch",
    title: "delia the traveling witch",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/delia the traveling witch.png",
    url: "/strongdog/html/delia the traveling witch/index.html",
  },

  {
    id: "dark-tomb",
    title: "dark tomb",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/dark tomb.jpg",
    url: "/strongdog/html/dark tomb/index.html",
  },

  {
    id: "another-gentlemans-adventure",
    title: "another gentlemans adventure",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/another gentlemans adventure.jpg",
    url: "/strongdog/html/another gentlemans adventure/index.html",
  },

  {
    id: "throw-a-potato",
    title: "Throw a Potato",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/Throw a Potato.png",
    url: "/strongdog/html/Throw a Potato/index.html",
  },

  {
    id: "westoon",
    title: "westoon",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/westoon.jpg",
    url: "/strongdog/html/westoon/index.html",
  },

  {
    id: "thumb-fighter-christmas",
    title: "thumb fighter christmas",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/thumb fighter christmas.jpg",
    url: "/strongdog/html/thumb fighter christmas/index.html",
  },

  {
    id: "sink-it",
    title: "sink it",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/sink it.jpg",
    url: "/strongdog/html/sink it/index.html",
  },

  {
    id: "minibattles",
    title: "minibattles",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/minibattles.jpg",
    url: "/strongdog/html/minibattles/index.html",
  },

  {
    id: "blocky-snakes",
    title: "blocky snakes",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/blocky snakes.jpg",
    url: "/strongdog/html/blocky snakes/index.html",
  },

  {
    id: "tiny-heist",
    title: "tiny heist",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/tiny heist.jpg",
    url: "/strongdog/html/tiny heist/index.html",
  },

  {
    id: "poker",
    title: "poker",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/poker.jpg",
    url: "/strongdog/html/poker/index.html",
  },

  {
    id: "blackjack",
    title: "blackjack",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/blackjack.jpg",
    url: "/strongdog/html/blackjack/index.html",
  },

  {
    id: "leader-strike",
    title: "leader strike",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/leader-strike.jfif",
    url: "/strongdog/html/leader-strike/index.html",
  },

  {
    id: "idle-lumber-inc",
    title: "idle lumber inc",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/idle lumber inc.jpg",
    url: "/strongdog/html/idle lumber inc/index.html",
  },

  {
    id: "idle-digging-tycoon",
    title: "idle digging tycoon",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/idle digging tycoon.jpg",
    url: "/strongdog/html/idle digging tycoon/index.html",
  },

  {
    id: "bomber-royale",
    title: "bomber royale",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/bomber royale.jpg",
    url: "/strongdog/html/bomber royale/index.html",
  },

  {
    id: "blumgi-paintball",
    title: "blumgi paintball",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/blumgi paintball.jpg",
    url: "/strongdog/html/blumgi paintball/index.html",
  },

  {
    id: "badegg-io",
    title: "badegg.io",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/badegg.io.jpg",
    url: "/strongdog/html/badegg.io/index.html",
  },

  {
    id: "cactus-mccoy",
    title: "cactus mccoy",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cactus mccoy.jpg",
    url: "/strongdog/swf/cactus mccoy/index.html",
  },

  {
    id: "cactus-mccoy-2",
    title: "cactus mccoy 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cactus mccoy 2.jpg",
    url: "/strongdog/swf/cactus mccoy 2/index.html",
  },

  {
    id: "terretorial-io",
    title: "terretorial.io",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/terretorial.io.jpeg",
    url: "/strongdog/html/terretorial.io/index.html",
  },

  {
    id: "just-passing-2",
    title: "just passing 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/just passing 2.jpg",
    url: "/strongdog/html/just passing 2/index.html",
  },

  {
    id: "jacksmith",
    title: "jacksmith",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/jacksmith.jpg",
    url: "/strongdog/swf/jacksmith/index.html",
  },

  {
    id: "pre-civilization-bronze-age",
    title: "Pre Civilization Bronze Age",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/Pre Civilization Bronze Age.jpg",
    url: "/strongdog/html/Pre Civilization Bronze Age/index.html",
  },

  {
    id: "strongdog-chat",
    title: "Strongdog Chat",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/strongdog chat.png",
    url: "/strongdog/html/strongdog chat/index.html",
  },

  {
    id: "shipo-io",
    title: "shipo.io",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/shipo.io.jpg",
    url: "/strongdog/html/shipo.io/index.html",
  },

  {
    id: "conq-io",
    title: "conq.io",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/conq.io.jpg",
    url: "/strongdog/html/conq.io/index.html",
  },

  {
    id: "sheep-party",
    title: "sheep party",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/sheep party.jpg",
    url: "/strongdog/html/sheep party/index.html",
  },

  {
    id: "friday-night-funkin",
    title: "friday night funkin",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/friday night funkin.jpg",
    url: "/strongdog/html/friday night funkin/index.html",
  },

  {
    id: "tanko-io",
    title: "tanko.io",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/tanko.io.jpg",
    url: "/strongdog/html/tanko.io/index.html",
  },

  {
    id: "checkers",
    title: "checkers",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/checkers.png",
    url: "/strongdog/html/checkers/index.html",
  },

  {
    id: "gladihoppers",
    title: "gladihoppers",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/gladdihoppers.jfif",
    url: "/strongdog/html/gladihoppers/index.html",
  },

  {
    id: "fireboy-and-watergirl-6",
    title: "fireboy and watergirl 6",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/fireboy and watergirl 6.jfif",
    url: "/strongdog/html/fireboy and watergirl 6/index.html",
  },

  {
    id: "fireboy-and-watergirl-5",
    title: "Fireboy and Watergirl 5",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/Fireboy and Watergirl 5.webp",
    url: "/strongdog/html/Fireboy and Watergirl 5/index.html",
  },

  {
    id: "fireboy-and-watergirl-4",
    title: "Fireboy and Watergirl 4",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/Fireboy and Watergirl 4.jfif",
    url: "/strongdog/html/Fireboy and Watergirl 4/index.html",
  },

  {
    id: "fireboy-and-watergirl-3",
    title: "Fireboy and Watergirl 3",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/Fireboy and Watergirl 3.jfif",
    url: "/strongdog/html/Fireboy and Watergirl 3/index.html",
  },

  {
    id: "fireboy-and-watergirl-2",
    title: "Fireboy and Watergirl 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/Fireboy and Watergirl 2.jfif",
    url: "/strongdog/html/Fireboy and Watergirl 2/index.html",
  },

  {
    id: "fireboy-and-watergirl-1",
    title: "Fireboy and Watergirl 1",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/Fireboy and Watergirl 1.jfif",
    url: "/strongdog/html/Fireboy and Watergirl 1/index.html",
  },

  {
    id: "earn-to-die",
    title: "earn to die",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/earn to die.png",
    url: "/strongdog/swf/earn to die/index.html",
  },

  {
    id: "paper-minecraft-ender-dragon",
    title: "paper minecraft ender dragon",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/paper minecraft ender dragon.jfif",
    url: "/strongdog/html/paper minecraft ender dragon/index.html",
  },

  {
    id: "grindcraft",
    title: "grindcraft",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/grindcraft.jfif",
    url: "/strongdog/html/grindcraft/index.html",
  },

  {
    id: "pixwars-2",
    title: "pixwars 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/pixwars 2.jfif",
    url: "/strongdog/html/pixwars 2/index.html",
  },

  {
    id: "strike-force-heros",
    title: "strike force heros",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/strke force heros.jfif",
    url: "/strongdog/swf/strike force heros/index.html",
  },

  {
    id: "burger-tycoon",
    title: "burger tycoon",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/burger tycoon.jfif",
    url: "/strongdog/swf/burger tycoon/index.html",
  },

  {
    id: "miragine-war",
    title: "miragine war",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/miragine war.jfif",
    url: "/strongdog/swf/miragine war/index.html",
  },

  {
    id: "traffic-tour",
    title: "traffic tour",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/traffic tour.jfif",
    url: "/strongdog/html/traffic tour/index.html",
  },

  {
    id: "superfighters",
    title: "superfighters",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/superfighters.jfif",
    url: "/strongdog/html/superfighters/index.html",
  },

  {
    id: "spelunky",
    title: "spelunky",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/spelunky.jfif",
    url: "/strongdog/html/spelunky/index.html",
  },

  {
    id: "rabbit-samurai-2",
    title: "rabbit samurai 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/rabbit samurai 2.jfif",
    url: "/strongdog/html/rabbit samurai 2/index.html",
  },

  {
    id: "rabbit-samurai",
    title: "rabbit samurai",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/rabbit samurai.jfif",
    url: "/strongdog/html/rabbit samurai/index.html",
  },

  {
    id: "quake",
    title: "quake",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/quake.jfif",
    url: "/strongdog/html/quake/index.html",
  },

  {
    id: "pizza-tower",
    title: "pizza tower",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/pizza tower.jfif",
    url: "/strongdog/html/pizza tower/index.html",
  },

  {
    id: "party-project",
    title: "party project",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/party project.jfif",
    url: "/strongdog/html/party project/index.html",
  },

  {
    id: "onion-boy",
    title: "onion boy",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/onion boy.jfif",
    url: "/strongdog/html/onion boy/index.html",
  },

  {
    id: "ng-stars",
    title: "NG stars",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/NG stars.jfif",
    url: "/strongdog/html/NG stars/index.html",
  },

  {
    id: "n-gon",
    title: "n-gon",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/n-gon.png",
    url: "/strongdog/html/n-gon/index.html",
  },

  {
    id: "gunnight",
    title: "gunnight",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/gunnight.jfif",
    url: "/strongdog/html/gunnight/index.html",
  },

  {
    id: "freefall-tournament",
    title: "freefall tournament",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/freefall tournament.jfif",
    url: "/strongdog/html/freefall tournament/index.html",
  },

  {
    id: "fighter-aircraft-piolet",
    title: "fighter aircraft piolet",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/fighter aircraft piolet.jfif",
    url: "/strongdog/html/fighter aircraft piolet/index.html",
  },

  {
    id: "die-in-the-dungeon",
    title: "die in the dungeon",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/die in the dungeon.png",
    url: "/strongdog/html/die in the dungeon/index.html",
  },

  {
    id: "cannon-basketball-4",
    title: "cannon basketball 4",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cannon basketball.jfif",
    url: "/strongdog/html/cannon basketball 4/index.html",
  },

  {
    id: "burrito-bison",
    title: "burrito bison",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/burrito bison.jfif",
    url: "/strongdog/html/burrito bison/index.html",
  },

  {
    id: "bumpyball-io",
    title: "bumpyball.io",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/bumpyball.io.jfif",
    url: "/strongdog/html/bumpyball.io/index.html",
  },

  {
    id: "basket-legend-2020",
    title: "basket legend 2020",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/basket legend 2020.jfif",
    url: "/strongdog/html/basket legend 2020/index.html",
  },

  {
    id: "tank-trouble-2",
    title: "tank trouble 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/tank trouble 2.jfif",
    url: "/strongdog/html/tank trouble 2/index.html",
  },

  {
    id: "super-santa-kicker",
    title: "super santa kicker",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/super santa kicker.png",
    url: "/strongdog/html/super santa kicker/index.html",
  },

  {
    id: "solitaire",
    title: "solitaire",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/solitaire.jfif",
    url: "/strongdog/html/solitaire/index.html",
  },

  {
    id: "nitroclash-io",
    title: "nitroclash.io",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/nitroclash.io.jfif",
    url: "/strongdog/html/nitroclash.io/index.html",
  },

  {
    id: "gravity-soccer",
    title: "gravity soccer",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/gravity soccer.jfif",
    url: "/strongdog/html/gravity soccer/index.html",
  },

  {
    id: "going-balls",
    title: "going balls",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/going balls.jfif",
    url: "/strongdog/html/going balls/index.html",
  },

  {
    id: "falling-fox",
    title: "falling fox",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/falling fox.jfif",
    url: "/strongdog/html/falling fox/index.html",
  },

  {
    id: "color-switch",
    title: "color switch",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/color switch.png",
    url: "/strongdog/html/color switch/index.html",
  },

  {
    id: "brawlguys-io",
    title: "brawlguys.io",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/brawlguys.io.jfif",
    url: "/strongdog/html/brawlguys.io/index.html",
  },

  {
    id: "basketbros-io",
    title: "basketbros.io",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/basketbros.io.jfif",
    url: "/strongdog/html/basketbros.io/index.html",
  },

  {
    id: "ballistic",
    title: "ballistic",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/ballistic.jfif",
    url: "/strongdog/html/ballistic/index.html",
  },

  {
    id: "two-punk-racing",
    title: "two punk racing",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/two-punk-racing.jfif",
    url: "/strongdog/html/two-punk-racing/index.html",
  },

  {
    id: "tube-jumpers",
    title: "tube jumpers",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/tube-jumpers.jfif",
    url: "/strongdog/html/tube-jumpers/index.html",
  },

  {
    id: "tank-io",
    title: "tank.io",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/tank.io.png",
    url: "/strongdog/html/tank-io/index.html",
  },

  {
    id: "racing-turbo-drift",
    title: "racing turbo drift",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/supra-speed-racing-turbo-drift.jfif",
    url: "/strongdog/html/supra-speed-racing-turbo-drift/index.html",
  },

  {
    id: "sports",
    title: "sports",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/sports.png",
    url: "/strongdog/html/sports/index.html",
  },

  {
    id: "sonic-revert",
    title: "sonic revert",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/sonic-revert.jfif",
    url: "/strongdog/html/sonic-revert/index.html",
  },

  {
    id: "pixel-foosball",
    title: "pixel foosball",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/pixel-foosball.jfif",
    url: "/strongdog/html/pixelfoosball/index.html",
  },

  {
    id: "penguin-io",
    title: "Penguin.io",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/penguin-io.jfif",
    url: "/strongdog/html/Penguinio/index.html",
  },

  {
    id: "nova-billiards",
    title: "nova billiards",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/nova-billiards.jfif",
    url: "/strongdog/html/novabilliards/index.html",
  },

  {
    id: "madalin-cars",
    title: "madalin cars",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/madalin-cars.jfif",
    url: "/strongdog/html/madalin-cars/index.html",
  },

  {
    id: "kart-fight-io",
    title: "kart fight.io",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/kart-fight-io.jfif",
    url: "/strongdog/html/kart-fight-io/index.html",
  },

  {
    id: "blocky-gangster",
    title: "blocky gangster",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/gungame-shooting-warfare-blocky-gangster.jfif",
    url: "/strongdog/html/gungame-shooting-warfare-blocky-gangster/index.html",
  },

  {
    id: "grab-party-io",
    title: "grab party.io",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/grab-party-io.jfif",
    url: "/strongdog/html/grab-party-io/index.html",
  },

  {
    id: "dunkers",
    title: "dunkers",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/dunkers.png",
    url: "/strongdog/html/dunkers/index.html",
  },

  {
    id: "drift",
    title: "drift",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/drift.jfif",
    url: "/strongdog/html/drift/index.html",
  },

  {
    id: "doomz-io",
    title: "doomz.io",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/doomz-io.jfif",
    url: "/strongdog/html/doomz-io/index.html",
  },

  {
    id: "disc-us",
    title: "disc us",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/discus.jfif",
    url: "/strongdog/html/discus/index.html",
  },

  {
    id: "death-run-3d",
    title: "death run 3d",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/death-run-3d.jfif",
    url: "/strongdog/html/death-run-3d/index.html",
  },

  {
    id: "cube-flip",
    title: "cube flip",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cube-flip.jfif",
    url: "/strongdog/html/cube-flip/index.html",
  },

  {
    id: "pixel-apocalypse",
    title: "pixel apocalypse",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/crazy-pixel-apocalypse-3.jfif",
    url: "/strongdog/html/crazy-pixel-apocalypse-3/index.html",
  },

  {
    id: "cleanup-io",
    title: "cleanup.io",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cleanupio.jfif",
    url: "/strongdog/html/cleanupio/index.html",
  },

  {
    id: "call-of-ops-2",
    title: "call of ops 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/call-of-ops-2.jfif",
    url: "/strongdog/html/call-of-ops-2/index.html",
  },

  {
    id: "blocky-gun-paintball",
    title: "blocky gun paintball",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/blocky-gun-paintball-3.jfif",
    url: "/strongdog/html/blocky-gun-paintball-3/index.html",
  },

  {
    id: "basketball-io",
    title: "basketball.io",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/basketball_io.jfif",
    url: "/strongdog/html/basketball_io/index.html",
  },

  {
    id: "baseball-fury",
    title: "baseball fury",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/baseballfury.jfif",
    url: "/strongdog/html/baseballfury/index.html",
  },

  {
    id: "ball-mayhem",
    title: "ball mayhem",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/ball-mayhem.png",
    url: "/strongdog/html/ball-mayhem/index.html",
  },

  {
    id: "sleepy-knight",
    title: "sleepy knight",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/sleepy knight.png",
    url: "/strongdog/html/sleepy knight/index.html",
  },

  {
    id: "greedy-mimic",
    title: "greedy mimic",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/greedy mimic.png",
    url: "/strongdog/html/greedy mimic/index.html",
  },

  {
    id: "sticky-sourcerer",
    title: "sticky sourcerer",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/sticky sourcerer.png",
    url: "/strongdog/html/sticky sorcerer/index.html",
  },

  {
    id: "yarne",
    title: "yarne",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/yarne.png",
    url: "/strongdog/html/yarne/index.html",
  },

  {
    id: "two-timin-towers",
    title: "two timin towers",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/two timin towers.jpg",
    url: "/strongdog/html/two timin towers/index.html",
  },

  {
    id: "slimoban-2",
    title: "slimoban 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/slimoban 2.jpg",
    url: "/strongdog/html/slimoban 2/index.html",
  },

  {
    id: "slide-fill",
    title: "slide fill",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/slide fill.jpg",
    url: "/strongdog/html/slide fill/index.html",
  },

  {
    id: "sheep",
    title: "sheep",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/sheep.png",
    url: "/strongdog/html/sheep/index.html",
  },

  {
    id: "roll-merge-3d",
    title: "roll merge 3d",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/roll merge 3d.jpg",
    url: "/strongdog/html/roll merge 3d/index.html",
  },

  {
    id: "ordeals-of-december",
    title: "ordeals of december",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/ordeals of december.jpg",
    url: "/strongdog/html/ordeals of december/index.html",
  },

  {
    id: "one-screen-run-2",
    title: "one screen run 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/one screen run 2.png",
    url: "/strongdog/html/one screen run 2/index.html",
  },

  {
    id: "indestructotank-gb",
    title: "indestructotank gb",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/indestructotank gb.jpg",
    url: "/strongdog/html/indestructotank gb/index.html",
  },

  {
    id: "gaia",
    title: "gaia",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/gaia.webp",
    url: "/strongdog/html/gaia/index.html",
  },

  {
    id: "bokdown",
    title: "bokdown",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/bokdown.png",
    url: "/strongdog/html/bokdown/index.html",
  },

  {
    id: "yin-and-yang",
    title: "yin and yang",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/yin and yang.jpg",
    url: "/strongdog/html/yin and yang/index.html",
  },

  {
    id: "top-outpost",
    title: "top outpost",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/top outpost.jpg",
    url: "/strongdog/html/top outpost/index.html",
  },

  {
    id: "spirit-dungeons",
    title: "spirit dungeons",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/spirit dungeons.webp",
    url: "/strongdog/html/spirit dungeons/index.html",
  },

  {
    id: "pixel-tap-dungeon",
    title: "pixel tap dungeon",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/pixel tap dungeon.png",
    url: "/strongdog/html/pixel tap dungeon/index.html",
  },

  {
    id: "out-of-ctrl",
    title: "out of ctrl",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/out of ctrl.jpg",
    url: "/strongdog/html/out of ctrl/index.html",
  },

  {
    id: "mad-pirate-skeleton",
    title: "mad pirate skeleton",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/mad pirate skeleton.jpg",
    url: "/strongdog/html/mad pirate skeleton/index.html",
  },

  {
    id: "kity-builder-prototype",
    title: "kity builder prototype",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/kity builder prototype.png",
    url: "/strongdog/html/kity builder prototype/index.html",
  },

  {
    id: "jetscout-boot-camp",
    title: "jetscout boot camp",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/jetscout boot camp.png",
    url: "/strongdog/html/jetscout boot camp/index.html",
  },

  {
    id: "idle-fill-factory",
    title: "idle fill factory",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/idle fill factory.jpg",
    url: "/strongdog/html/idle fill factory/index.html",
  },

  {
    id: "find-a-way-out",
    title: "find a way out",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/find a way out.jpg",
    url: "/strongdog/html/find a way out/index.html",
  },

  {
    id: "cursed-travels-flame-of-the-banshee",
    title: "cursed travels flame of the banshee",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cursed travels flame of the banshee.png",
    url: "/strongdog/html/cursed travels flame of the banshee/index.html",
  },

  {
    id: "cognite",
    title: "cognite",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cognite.jpg",
    url: "/strongdog/html/cognite/index.html",
  },

  {
    id: "white-pen-road",
    title: "white pen road",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/white pen road.webp",
    url: "/strongdog/html/white pen road/index.html",
  },

  {
    id: "space-cowboy",
    title: "space cowboy",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/space cowboy.jpg",
    url: "/strongdog/html/space cowboy/index.html",
  },

  {
    id: "rail-connect",
    title: "rail connect",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/rail connect.jpg",
    url: "/strongdog/html/rail connect/index.html",
  },

  {
    id: "put-a-ring-on-it",
    title: "put a ring on it",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/put a ring on it.jpg",
    url: "/strongdog/html/put a ring on it/index.html",
  },

  {
    id: "mutual-destruction",
    title: "mutual destruction",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/mutual destruction.jpg",
    url: "/strongdog/html/mutual destruction/index.html",
  },

  {
    id: "mini-bubbles",
    title: "mini bubbles",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/mini bubbles.jpg",
    url: "/strongdog/html/mini bubbles/index.html",
  },

  {
    id: "leapoid",
    title: "leapoid",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/leapoid.jpg",
    url: "/strongdog/html/leapoid/index.html",
  },

  {
    id: "keyholder",
    title: "keyholder",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/keyholder.jpg",
    url: "/strongdog/html/keyholder/index.html",
  },

  {
    id: "icy-north",
    title: "icy north",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/icy north.png",
    url: "/strongdog/html/icy north/index.html",
  },

  {
    id: "evolutionary-psychol",
    title: "evolutionary psychol",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/evolutionary psychology.jpg",
    url: "/strongdog/html/evolutionary psychol/index.html",
  },

  {
    id: "escape-kid",
    title: "escape kid",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/escape kid.webp",
    url: "/strongdog/html/escape kid/index.html",
  },

  {
    id: "cursed-travels-the-shattered-labyrinth",
    title: "cursed travels the shattered labyrinth",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cursed travels the shattered labyrinth.png",
    url: "/strongdog/html/cursed travels the shattered labyrinth/index.html",
  },

  {
    id: "crystal-wizards",
    title: "crystal wizards",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/crystal wizards.jpg",
    url: "/strongdog/html/crystal wizards/index.html",
  },

  {
    id: "calturin",
    title: "calturin",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/calturin.jpg",
    url: "/strongdog/html/calturin/index.html",
  },

  {
    id: "binary",
    title: "binary",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/binary.png",
    url: "/strongdog/html/binary/index.html",
  },

  {
    id: "are-you-human",
    title: "are you human",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/are you human.webp",
    url: "/strongdog/html/are you human/index.html",
  },

  {
    id: "anyek-the-keyboard-puzzle",
    title: "anyek the keyboard puzzle",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/anyek the keyboard puzzle.jpg",
    url: "/strongdog/html/anyek the keyboard puzzle/index.html",
  },

  {
    id: "adventure-boy-jailbreak",
    title: "adventure boy jailbreak",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/adventure boy jailbreak.jpg",
    url: "/strongdog/html/adventure boy jailbreak/index.html",
  },

  {
    id: "the-impossible-quiz-2",
    title: "the impossible quiz 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/the impossible quiz 2.avif",
    url: "/strongdog/swf/the impossible quiz 2/index.html",
  },

  {
    id: "shaky-structure",
    title: "shaky structure",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/shaky structure.webp",
    url: "/strongdog/html/shaky structure/index.html",
  },

  {
    id: "orb-of-creation",
    title: "orb of creation",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/orb of creation.jpg",
    url: "/strongdog/html/orb of creation/index.html",
  },

  {
    id: "incub8",
    title: "incub8",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/incub8.png",
    url: "/strongdog/html/incub8/index.html",
  },

  {
    id: "tryh4rd",
    title: "tryh4rd",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/tryh4rd.jpg",
    url: "/strongdog/html/tryh4rd/index.html",
  },

  {
    id: "runick",
    title: "runick",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/runick.jpg",
    url: "/strongdog/html/runick/index.html",
  },

  {
    id: "laqueus-escape-chapter-5",
    title: "laqueus escape chapter 5",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/laqueus escape chapter 5.jpg",
    url: "/strongdog/html/laqueus escape chapter 5/index.html",
  },

  {
    id: "drag-box",
    title: "drag box",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/drag box.jpg",
    url: "/strongdog/html/drag box/index.html",
  },

  {
    id: "cloudhopper",
    title: "cloudhopper",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cloudhopper.webp",
    url: "/strongdog/html/cloudhopper/index.html",
  },

  {
    id: "yarn-untangled",
    title: "yarn untangled",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/yarn untangled.jpg",
    url: "/strongdog/html/yarn untangled/index.html",
  },

  {
    id: "towerland",
    title: "towerland",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/towerland.jpg",
    url: "/strongdog/html/towerland/index.html",
  },

  {
    id: "the-mage",
    title: "the mage",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/the mage.jpg",
    url: "/strongdog/html/the mage/index.html",
  },

  {
    id: "telepobox-2",
    title: "telepobox 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/telepobox2.jpg",
    url: "/strongdog/html/telepobox 2/index.html",
  },

  {
    id: "snail-trail",
    title: "snail trail",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/snail trail.webp",
    url: "/strongdog/html/snail trail/index.html",
  },

  {
    id: "robox",
    title: "robox",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/robox.jpg",
    url: "/strongdog/html/robox/index.html",
  },

  {
    id: "reel-deep",
    title: "reel deep",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/reel deep.webp",
    url: "/strongdog/html/reel deep/index.html",
  },

  {
    id: "planet-d4rk",
    title: "planet d4rk",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/planet d4rk.png",
    url: "/strongdog/html/planet d4rk/index.html",
  },

  {
    id: "moosha",
    title: "moosha",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/moosha.jpg",
    url: "/strongdog/html/moosha/index.html",
  },

  {
    id: "may-i-have-your-attention-please",
    title: "may i have your attention, please",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/may i have your attention, please.png",
    url: "/strongdog/html/may i have your attention, please/index.html",
  },

  {
    id: "laqueus-escape-chapter-6",
    title: "laqueus escape chapter 6",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/laqueus escape chapter 6.avif",
    url: "/strongdog/html/laqueus escape chapter 6/index.html",
  },

  {
    id: "house-pusher",
    title: "house pusher",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/house pusher.png",
    url: "/strongdog/html/house pusher/index.html",
  },

  {
    id: "gobo-desert-of-cubes",
    title: "gobo desert of cubes",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/gobo desert of cubes.jpg",
    url: "/strongdog/html/gobo desert of cubes/index.html",
  },

  {
    id: "forward-winds",
    title: "forward winds",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/forward winds.png",
    url: "/strongdog/html/forward winds/index.html",
  },

  {
    id: "fluctuoid",
    title: "fluctuoid",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/fluctuoid.webp",
    url: "/strongdog/html/fluctuoid/index.html",
  },

  {
    id: "cursed-travels-a-forgotten-seal",
    title: "cursed travels a forgotten seal",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cursed travels a forgotten seal.png",
    url: "/strongdog/html/cursed travels a forgotten seal/index.html",
  },

  {
    id: "blacken-slash-demo",
    title: "blacken slash demo",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/blacken slash.jpg",
    url: "/strongdog/html/blacken slash demo/index.html",
  },

  {
    id: "magirune",
    title: "magirune",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/magirune.jpg",
    url: "/strongdog/html/magirune/index.html",
  },

  {
    id: "logica-emotica",
    title: "logica emotica",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/logica emotica.jpg",
    url: "/strongdog/html/logica emotica/index.html",
  },

  {
    id: "hall-of-palettes",
    title: "hall of palettes",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/hall of palettes.png",
    url: "/strongdog/html/hall of palettes/index.html",
  },

  {
    id: "nova-cloudwalkers",
    title: "nova cloudwalkers",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/nova cloudwalkers.jpg",
    url: "/strongdog/html/nova cloudwalkers/index.html",
  },

  {
    id: "notebook-jam",
    title: "notebook jam",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/notebook jam.jpg",
    url: "/strongdog/html/notebook jam/index.html",
  },

  {
    id: "gods-of-defense",
    title: "gods of defense",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/gods of defense.jpg",
    url: "/strongdog/html/gods of defense/index.html",
  },

  {
    id: "slide-box",
    title: "slide box",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/slide box.png",
    url: "/strongdog/html/slide box/index.html",
  },

  {
    id: "sector-01",
    title: "sector 01",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/sector 01.jpg",
    url: "/strongdog/html/sector 01/index.html",
  },

  {
    id: "erase-box",
    title: "erase box",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/erase box.jpg",
    url: "/strongdog/html/erase box/index.html",
  },

  {
    id: "sum-lines",
    title: "sum lines",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/sum lines.webp",
    url: "/strongdog/html/sum lines/index.html",
  },

  {
    id: "strg-snek",
    title: "strg snek",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/strg snek.png",
    url: "/strongdog/html/strg snek/index.html",
  },

  {
    id: "rotate-box",
    title: "rotate box",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/rotate box.jpg",
    url: "/strongdog/html/rotate box/index.html",
  },

  {
    id: "red-scarf-platformer",
    title: "red scarf platformer",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/red scarf platformer.jpg",
    url: "/strongdog/html/red scarf platformer/index.html",
  },

  {
    id: "peeper-reaper",
    title: "peeper reaper",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/peeper reaper.jpg",
    url: "/strongdog/html/peeper reaper/index.html",
  },

  {
    id: "ninja-auto-run",
    title: "ninja auto run",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/ninja auto run.webp",
    url: "/strongdog/html/ninja auto run/index.html",
  },

  {
    id: "murder-is-game-over",
    title: "murder is game over",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/murder is game over.jpg",
    url: "/strongdog/html/murder is game over/index.html",
  },

  {
    id: "mirror-wizard",
    title: "mirror wizard",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/mirror wizard.jpg",
    url: "/strongdog/html/mirror wizard/index.html",
  },

  {
    id: "mini-swim",
    title: "mini swim",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/mini swim.jpg",
    url: "/strongdog/html/mini swim/index.html",
  },

  {
    id: "mini-flips",
    title: "mini flips",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/mini flips.jpg",
    url: "/strongdog/html/mini flips/index.html",
  },

  {
    id: "marcus-osnail",
    title: "marcus osnail",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/marcus osnail.png",
    url: "/strongdog/html/marcus osnail/index.html",
  },

  {
    id: "knights-blade",
    title: "knights blade",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/knights blade.webp",
    url: "/strongdog/html/knights blade/index.html",
  },

  {
    id: "infinite-night-the-cunning-princess",
    title: "infinite night the cunning princess",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/infinite night the cunning princess.jpg",
    url: "/strongdog/html/infinite night the cunning princess/index.html",
  },

  {
    id: "in-space",
    title: "in space",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/in space.jpg",
    url: "/strongdog/html/in space/index.html",
  },

  {
    id: "hummin-out",
    title: "hummin out",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/hummin out.webp",
    url: "/strongdog/html/hummin out/index.html",
  },

  {
    id: "haunted-rooms",
    title: "haunted rooms",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/haunted rooms.webp",
    url: "/strongdog/html/haunted rooms/index.html",
  },

  {
    id: "darkraid-delilah",
    title: "darkraid delilah",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/darkraid delilah.jpg",
    url: "/strongdog/html/darkraid delilah/index.html",
  },

  {
    id: "cordovan",
    title: "cordovan",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cordovan.webp",
    url: "/strongdog/html/cordovan/index.html",
  },

  {
    id: "contractomaton",
    title: "contractomaton",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/contractomaton.jpg",
    url: "/strongdog/html/contractomaton/index.html",
  },

  {
    id: "arrow-box",
    title: "arrow box",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/arrow box.webp",
    url: "/strongdog/html/arrow box/index.html",
  },

  {
    id: "viscous-ventures",
    title: "viscous ventures",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/viscous ventures.jpg",
    url: "/strongdog/html/viscous ventures/index.html",
  },

  {
    id: "steel-and-claw",
    title: "steel and claw",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/steel and claw.png",
    url: "/strongdog/html/steel and claw/index.html",
  },

  {
    id: "slime-knight",
    title: "slime knight",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/slime knight.avif",
    url: "/strongdog/html/slime knight/index.html",
  },

  {
    id: "platformation",
    title: "platformation",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/platformation.jpg",
    url: "/strongdog/html/platformation/index.html",
  },

  {
    id: "path-of-arrows",
    title: "path of arrows",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/path of arrows.jpg",
    url: "/strongdog/html/path of arrows/index.html",
  },

  {
    id: "ninja-kite",
    title: "ninja kite",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/ninja kite.jpg",
    url: "/strongdog/html/ninja kite/index.html",
  },

  {
    id: "mutato-potato",
    title: "mutato potato",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/mutato potato.avif",
    url: "/strongdog/html/mutato potato/index.html",
  },

  {
    id: "mini-rocket",
    title: "mini rocket",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/mini rocket.avif",
    url: "/strongdog/html/mini rocket/index.html",
  },

  {
    id: "magnet-master-redux",
    title: "magnet master redux",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/magnet master redux.jpg",
    url: "/strongdog/html/magnet master redux/index.html",
  },

  {
    id: "inversion",
    title: "inversion",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/inversion.jpg",
    url: "/strongdog/html/inversion/index.html",
  },

  {
    id: "handle",
    title: "handle",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/handle.jpg",
    url: "/strongdog/html/handle/index.html",
  },

  {
    id: "dispersal-vectors",
    title: "dispersal vectors",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/dispersal vectors.jpg",
    url: "/strongdog/html/dispersal vectors/index.html",
  },

  {
    id: "cata-catapult",
    title: "cata catapult",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cata catapult.png",
    url: "/strongdog/html/cata catapult/index.html",
  },

  {
    id: "astro-steve-adventure",
    title: "astro steve adventure",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/astro steve adventure.jpg",
    url: "/strongdog/html/astro steve adventure/index.html",
  },

  {
    id: "elephant-rave-2",
    title: "elephant rave 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/elephant rave 2.webp",
    url: "/strongdog/swf/elephant rave 2/index.html",
  },

  {
    id: "the-designer",
    title: "the designer",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/the designer.jpg",
    url: "/strongdog/html/the designer/index.html",
  },

  {
    id: "stress-chess",
    title: "stress chess",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/stress chess.jpg",
    url: "/strongdog/html/stress chess/index.html",
  },

  {
    id: "specters-of-the-sun",
    title: "specters of the sun",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/specters of the sun.jpg",
    url: "/strongdog/html/specters of the sun/index.html",
  },

  {
    id: "space-order-mine",
    title: "space order mine",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/space order mine.jpg",
    url: "/strongdog/html/space order mine/index.html",
  },

  {
    id: "scraplegs",
    title: "scraplegs",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/scraplegs.webp",
    url: "/strongdog/html/scraplegs/index.html",
  },

  {
    id: "last-plant-on-earth",
    title: "last plant on earth",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/last plant on earth.webp",
    url: "/strongdog/html/last plant on earth/index.html",
  },

  {
    id: "gloop",
    title: "gloop",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/gloop.webp",
    url: "/strongdog/html/gloop/index.html",
  },

  {
    id: "doubleup",
    title: "doubleup",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/doubleup.webp",
    url: "/strongdog/html/doubleup/index.html",
  },

  {
    id: "toms-trial",
    title: "toms trial",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/toms trial.jpg",
    url: "/strongdog/html/toms trial/index.html",
  },

  {
    id: "jetpack-kiwi",
    title: "jetpack kiwi",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/jetpack kiwi.jpg",
    url: "/strongdog/html/jetpack kiwi/index.html",
  },

  {
    id: "dungeon-scroller",
    title: "dungeon scroller",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/dongeon scroller.jpg",
    url: "/strongdog/html/dungeon scroller/index.html",
  },

  {
    id: "a-maniac",
    title: "a maniac",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/a maniac.webp",
    url: "/strongdog/html/a maniac/index.html",
  },

  {
    id: "pixel-shooter",
    title: "Pixel shooter",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/pixelshooter.jpeg",
    url: "/strongdog/html/pixelshooter/index.html",
  },

  {
    id: "retro-bowl-college",
    title: "retro bowl college",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/retro bowl college.png",
    url: "/strongdog/html/retro bowl college/game/index.html",
  },

  {
    id: "agar-io",
    title: "agar.io",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/agar.jpeg",
    url: "/strongdog/html/jptragar/web/index.html",
  },

  {
    id: "giraffes-volleyball",
    title: "giraffes volleyball",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/giraffe.png",
    url: "/strongdog/html/giraffe/index.html",
  },

  {
    id: "duck-life-tresure-hunt",
    title: "duck life tresure hunt",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/duck life tresure hunt.png",
    url: "/strongdog/swf/duck life tresure hunt/index.html",
  },

  {
    id: "un-evergreen",
    title: "un evergreen",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/un evergreen.png",
    url: "/strongdog/html/un evergreen/index.html",
  },

  {
    id: "super-gauntlent",
    title: "super gauntlent",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/super gauntlent.jpg",
    url: "/strongdog/html/super gauntlent/index.html",
  },

  {
    id: "slis",
    title: "slis",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/slis.webp",
    url: "/strongdog/html/slis/index.html",
  },

  {
    id: "mini-magbot",
    title: "mini magbot",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/mini magbot.jpg",
    url: "/strongdog/html/mini magbot/index.html",
  },

  {
    id: "driftmania",
    title: "driftmania",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/driftmania.png",
    url: "/strongdog/html/driftmania/index.html",
  },

  {
    id: "club-tycoon",
    title: "club tycoon",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/club tycoon.jpg",
    url: "/strongdog/html/club tycoon/index.html",
  },

  {
    id: "blasting-marbles",
    title: "blasting marbles",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/blasting marbles.jpg",
    url: "/strongdog/html/blasting marbles/index.html",
  },

  {
    id: "deepest-sword",
    title: "deepest sword",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/deepest sword.jpg",
    url: "/strongdog/html/deepest sword/index.html",
  },

  {
    id: "sort-the-court",
    title: "sort the court",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/sort the court.jpg",
    url: "/strongdog/html/sort the court/index.html",
  },

  {
    id: "resent-client-mc-",
    title: "Resent client (mc)",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/resent.png",
    url: "/strongdog/html/resent/Resent-4.0-Patch-2-English.html",
  },

  {
    id: "smash-karts",
    title: "Smash Karts",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/smash karts.avif",
    url: "/strongdog/html/smash karts/index.html",
  },

  {
    id: "pathfinder",
    title: "Pathfinder",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/Screenshot 2024-07-09 144933.png",
    url: "/strongdog/html/pathfinder/index.html",
  },

  {
    id: "hasty-shaman",
    title: "Hasty Shaman",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/hasty shaman.png",
    url: "/strongdog/html/hasty shaman/index.html",
  },

  {
    id: "one-trick-mage",
    title: "One Trick Mage",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/one trick mage.png",
    url: "/strongdog/html/one trick mage/index.html",
  },

  {
    id: "arcuz",
    title: "Arcuz",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/arcuz.jpg",
    url: "/strongdog/swf/arcuz/base.html",
  },

  {
    id: "age-of-war",
    title: "Age of war",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/age of war.jpg",
    url: "/strongdog/swf/age of war/base.html",
  },

  {
    id: "winter-gifts",
    title: "Winter Gifts",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/winter gifts.jpg",
    url: "/strongdog/html/winter gifts/index.html",
  },

  {
    id: "tough-growth",
    title: "Tough Growth",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/tough growth.jpg",
    url: "/strongdog/html/tough growth/index.html",
  },

  {
    id: "the-dark-one",
    title: "The Dark One",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/the dark one.jpg",
    url: "/strongdog/html/the dark one/index.html",
  },

  {
    id: "tactical-weapon-pack",
    title: "Tactical Weapon Pack",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/tactical weapon pack.png",
    url: "/strongdog/html/tactical weapon pack/index.html",
  },

  {
    id: "soul-mirror",
    title: "Soul Mirror",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/soul mirror.jpg",
    url: "/strongdog/html/soul mirror/index.html",
  },

  {
    id: "push",
    title: "Push",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/push.jpg",
    url: "/strongdog/html/push/index.html",
  },

  {
    id: "progress-knight",
    title: "Progress Knight",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/progress knight.png",
    url: "/strongdog/html/progress knight/index.html",
  },

  {
    id: "pe-norie",
    title: "Pe Norie",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/pe norie.jpg",
    url: "/strongdog/html/pe norie/index.html",
  },

  {
    id: "orange",
    title: "Orange",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/orange.png",
    url: "/strongdog/html/orange/index.html",
  },

  {
    id: "mini-sticky",
    title: "Mini Sticky",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/mini sticky.avif",
    url: "/strongdog/html/mini sticky/index.html",
  },

  {
    id: "mini-jumps",
    title: "Mini Jumps",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/mini jumps.png",
    url: "/strongdog/html/mini jumps/index.html",
  },

  {
    id: "life-in-the-static",
    title: "Life in the Static",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/life in the static.jpg",
    url: "/strongdog/html/life in the static/index.html",
  },

  {
    id: "laqueus-escape-chapter-1",
    title: "Laqueus Escape Chapter 1",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/laqueus escape chapter 1.avif",
    url: "/strongdog/html/laqueus escape chapter 1/index.html",
  },

  {
    id: "just-passing",
    title: "Just Passing",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/just passing.png",
    url: "/strongdog/html/just passing/index.html",
  },

  {
    id: "hexa-knot",
    title: "Hexa Knot",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/hexa knot.png",
    url: "/strongdog/html/hexa knot/index.html",
  },

  {
    id: "goodbye-doggy",
    title: "Goodbye Doggy",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/goodbye doggy.jpg",
    url: "/strongdog/html/goodbye doggy/index.html",
  },

  {
    id: "generic-fishing-game",
    title: "Generic Fishing Game",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/generic fishing game.png",
    url: "/strongdog/html/generic fishing game/index.html",
  },

  {
    id: "dubstep-raven",
    title: "Dubstep Raven",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/dubstep raven.png",
    url: "/strongdog/html/dubstep raven/index.html",
  },

  {
    id: "doodle-alive",
    title: "Doodle Alive",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/doodle alive.jpg",
    url: "/strongdog/html/doodle alive/index.html",
  },

  {
    id: "detective-bass-fish",
    title: "Detective Bass Fish",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/detective bass fish.webp",
    url: "/strongdog/html/detective bass fish/index.html",
  },

  {
    id: "cursed-travels-below",
    title: "Cursed Travels Below",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cursed travels below.png",
    url: "/strongdog/html/cursed travels below/index.html",
  },

  {
    id: "clickventure-castaway",
    title: "Clickventure Castaway",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/clickventure castaway.jpg",
    url: "/strongdog/html/clickventure castaway/index.html",
  },

  {
    id: "choppy-orc",
    title: "Choppy Orc",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/choppy orc.jpg",
    url: "/strongdog/html/choppy orc/index.html",
  },

  {
    id: "cataractae",
    title: "Cataractae",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cataractae.jpg",
    url: "/strongdog/html/cataractae/index.html",
  },

  {
    id: "cat-house",
    title: "Cat House",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cat house.avif",
    url: "/strongdog/html/cat house/index.html",
  },

  {
    id: "cardinal-chains",
    title: "Cardinal Chains",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cardinal chains.png",
    url: "/strongdog/html/cardinal chains/index.html",
  },

  {
    id: "bunnies-carrot",
    title: "Bunnies Carrot",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/bunnies carrot.jpg",
    url: "/strongdog/html/bunnies carrot/index.html",
  },

  {
    id: "aspiring-artist",
    title: "Aspiring Artist",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/aspiring artist.webp",
    url: "/strongdog/html/aspiring artist/index.html",
  },

  {
    id: "arcade-wizard",
    title: "Arcade Wizard",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/arcade wizard.png",
    url: "/strongdog/html/arcade wizard/index.html",
  },

  {
    id: "ant-art-tycoon",
    title: "Ant Art Tycoon",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/ant art tycoon.png",
    url: "/strongdog/html/ant art tycoon/index.html",
  },

  {
    id: "swords-and-souls",
    title: "Swords and Souls",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/swords and souls.avif",
    url: "/strongdog/swf/swords and souls/base.html",
  },

  {
    id: "sonny2",
    title: "Sonny2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/sonny2.jpg",
    url: "/strongdog/swf/sonny2/base.html",
  },

  {
    id: "sonny",
    title: "Sonny",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/sonny.png",
    url: "/strongdog/swf/sonny/base.html",
  },

  {
    id: "kingdom-rush-frontie",
    title: "Kingdom Rush Frontie",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/kingdom rush frontie.jpg",
    url: "/strongdog/swf/kingdom rush frontie/base.html",
  },

  {
    id: "kingdom-rush",
    title: "Kingdom Rush",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/kingdom rush.jpg",
    url: "/strongdog/swf/kingdom rush/base.html",
  },

  {
    id: "worlds-within-worlds",
    title: "Worlds Within Worlds",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/worlds within worlds.png",
    url: "/strongdog/html/worlds within worlds/index.html",
  },

  {
    id: "unloop",
    title: "Unloop",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/unloop.jpg",
    url: "/strongdog/html/unloop/index.html",
  },

  {
    id: "tower-of-the-scorche",
    title: "Tower of the Scorche",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/tower of the scorche.png",
    url: "/strongdog/html/tower of the scorche/index.html",
  },

  {
    id: "there-is-no-game",
    title: "There is No Game",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/there is no game.jpg",
    url: "/strongdog/html/there is no game/index.html",
  },

  {
    id: "scalak",
    title: "Scalak",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/scalak.jpg",
    url: "/strongdog/html/scalak/index.html",
  },

  {
    id: "sabotage",
    title: "Sabotage",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/sabotage.webp",
    url: "/strongdog/html/sabotage/index.html",
  },

  {
    id: "roots",
    title: "Roots",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/roots.jpg",
    url: "/strongdog/html/roots/index.html",
  },

  {
    id: "rogue-fable",
    title: "Rogue Fable",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/rogue fable.jpg",
    url: "/strongdog/html/rogue fable/index.html",
  },

  {
    id: "pixoji",
    title: "Pixoji",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/pixoji.png",
    url: "/strongdog/html/pixoji/index.html",
  },

  {
    id: "pink",
    title: "Pink",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/pink.png",
    url: "/strongdog/html/pink/index.html",
  },

  {
    id: "knight-errant",
    title: "Knight Errant",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/knight errant.png",
    url: "/strongdog/html/knight errant/index.html",
  },

  {
    id: "hexologic",
    title: "Hexologic",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/hexlogic.jpg",
    url: "/strongdog/html/hexologic/index.html",
  },

  {
    id: "gragyriss",
    title: "Gragyriss",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/gragyriss.avif",
    url: "/strongdog/html/gragyriss/index.html",
  },

  {
    id: "gem-twins",
    title: "Gem Twins",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/gem twins.png",
    url: "/strongdog/html/gem twins/index.html",
  },

  {
    id: "ginogen-arena",
    title: "Ginogen Arena",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/dinogen arena.webp",
    url: "/strongdog/html/dinogen arena/index.html",
  },

  {
    id: "cursed-travels-flame",
    title: "Cursed Travels Flame",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cursed travels flame.png",
    url: "/strongdog/html/cursed travels flame/index.html",
  },

  {
    id: "clickventure",
    title: "Clickventure",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/clickbenture.jpg",
    url: "/strongdog/html/clickventure/index.html",
  },

  {
    id: "blue",
    title: "Blue",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/blue.png",
    url: "/strongdog/html/blue/index.html",
  },

  {
    id: "beam",
    title: "Beam",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/beam.png",
    url: "/strongdog/html/beam/index.html",
  },

  {
    id: "a-grim-love-tale",
    title: "A Grim Love Tale",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/a grim love tale.jpg",
    url: "/strongdog/html/a grim love tale/index.html",
  },

  {
    id: "a-grim-chase",
    title: "A Grim Chase",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/a grim chase.jpg",
    url: "/strongdog/html/a grim chase/index.html",
  },

  {
    id: "tavern-master",
    title: "Tavern Master",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/tavern master.png",
    url: "/strongdog/html/tavern master/index.html",
  },

  {
    id: "green",
    title: "Green",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/green.png",
    url: "/strongdog/html/green/index.html",
  },

  {
    id: "stealing-the-diamond",
    title: "Stealing the Diamond",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/stealing the diamond.jpg",
    url: "/strongdog/swf/stealing the diamond/base.html",
  },

  {
    id: "infiltrating-the-airship",
    title: "Infiltrating the Airship",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/infiltrating the airship.jpg",
    url: "/strongdog/swf/infiltrating the airship/base.html",
  },

  {
    id: "fleeing-the-complex",
    title: "Fleeing the Complex",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/fleeing the complex.jpg",
    url: "/strongdog/swf/fleeing the complex/base.html",
  },

  {
    id: "ricochet-arrow",
    title: "Ricochet Arrow",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/ricochet arrow.jpg",
    url: "/strongdog/html/ricochet arrow/index.html",
  },

  {
    id: "pixel-battles",
    title: "Pixel Battles",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/Pixel Battles.jpg",
    url: "/strongdog/html/Pixel Battles/index.html",
  },

  {
    id: "oil-race",
    title: "Oil Race",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/oil race.avif",
    url: "/strongdog/html/oil race/index.html",
  },

  {
    id: "mountain-biking",
    title: "Mountain Biking",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/Mountain Biking.jpg",
    url: "/strongdog/html/Mountain Biking/index.html",
  },

  {
    id: "maptroid",
    title: "Maptroid",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/maptroid.jpg",
    url: "/strongdog/html/maptroid/index.html",
  },

  {
    id: "hover-racer-drive",
    title: "Hover Racer Drive",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/hover racer drive.png",
    url: "/strongdog/html/hover racer drive/index.html",
  },

  {
    id: "hole-io",
    title: "Hole.io",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/hole.io.jpg",
    url: "/strongdog/html/hole.io/index.html",
  },

  {
    id: "gun-mayhem-2",
    title: "Gun Mayhem 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/gun mayhem 2.jpg",
    url: "/strongdog/swf/gun mayhem 2/base.html",
  },

  {
    id: "shortcut-race",
    title: "Shortcut Race",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/shortcut race.jpg",
    url: "/strongdog/html/shortcut race/index.html",
  },

  {
    id: "alien-theif",
    title: "Alien Theif",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/alienthief.jpg",
    url: "/strongdog/swf/alienthief/base.html",
  },

  {
    id: "checkpoint",
    title: "Checkpoint",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/checkpoint.jpg",
    url: "/strongdog/swf/checkpoint/base.html",
  },

  {
    id: "chimney-trouble",
    title: "Chimney Trouble",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/chimneytrouble.jpg",
    url: "/strongdog/swf/chimneytrouble/base.html",
  },

  {
    id: "disaster-will-strike",
    title: "Disaster Will Strike",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/disasterwillstrike.jpg",
    url: "/strongdog/swf/diasterwillstrike/base.html",
  },

  {
    id: "drake-and-the-wizards",
    title: "Drake and the Wizards",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/drakeandthewizards.jpg",
    url: "/strongdog/swf/drakeandthewizards/base.html",
  },

  {
    id: "electric-man-2",
    title: "Electric Man 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/electricman2.jpg",
    url: "/strongdog/swf/electricman2/base.html",
  },

  {
    id: "freegear",
    title: "Freegear",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/freegear.jpg",
    url: "/strongdog/swf/freegear/base.html",
  },

  {
    id: "gooballs",
    title: "Gooballs",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/gooballs.jpg",
    url: "/strongdog/swf/gooballs/base.html",
  },

  {
    id: "hoshi-saga-1",
    title: "Hoshi Saga 1",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/hoshisaga1.png",
    url: "/strongdog/swf/hoshisaga1/base.html",
  },

  {
    id: "hoshi-saga-2",
    title: "Hoshi Saga 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/hoshisaga2.jpg",
    url: "/strongdog/swf/hoshisaga2/base.html",
  },

  {
    id: "hoshi-saga-3",
    title: "Hoshi Saga 3",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/hoshisaga3.jpg",
    url: "/strongdog/swf/hoshisaga3/base.html",
  },

  {
    id: "iq-ball",
    title: "IQ Ball",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/iqball.jpg",
    url: "/strongdog/swf/iqball/base.html",
  },

  {
    id: "i-wanna-win",
    title: "I Wanna Win",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/iwannawin.jpg",
    url: "/strongdog/swf/iwannawin/base.html",
  },

  {
    id: "jelly-go-",
    title: "Jelly Go!",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/jellygo.jpg",
    url: "/strongdog/swf/jellygo/base.html",
  },

  {
    id: "little-wheel",
    title: "Little Wheel",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/littlewheel.jpg",
    url: "/strongdog/swf/littlewheel/base.html",
  },

  {
    id: "mini-putt-3",
    title: "Mini Putt 3",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/miniputt3.jpg",
    url: "/strongdog/swf/miniputt3/base.html",
  },

  {
    id: "mini-train",
    title: "Mini Train",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/minitrain.jpg",
    url: "/strongdog/swf/minitrain/base.html",
  },

  {
    id: "papas-bakeria",
    title: "Papas Bakeria",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/papasbakeria.jpg",
    url: "/strongdog/swf/papabakeria/base.html",
  },

  {
    id: "papas-burgeria",
    title: "Papas Burgeria",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/papasburgeria.jpg",
    url: "/strongdog/swf/papaburgeria/base.html",
  },

  {
    id: "papas-cheeseria",
    title: "Papas Cheeseria",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/papascheeseria.jpg",
    url: "/strongdog/swf/papacheeseria/base.html",
  },

  {
    id: "papas-cupcakeria",
    title: "Papas Cupcakeria",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/papascupcakeria.jpg",
    url: "/strongdog/swf/papacupcakeria/base.html",
  },

  {
    id: "papas-donuteria",
    title: "Papas Donuteria",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/papadonuteria.jpg",
    url: "/strongdog/swf/papadonuteria/base.html",
  },

  {
    id: "papas-freezeria",
    title: "Papas Freezeria",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/papasfreezeria.jpg",
    url: "/strongdog/swf/papafreezeria/base.html",
  },

  {
    id: "papas-hotdoggeria",
    title: "Papas Hotdoggeria",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/papashotdoggeria.jpg",
    url: "/strongdog/swf/papahotdoggeria/base.html",
  },

  {
    id: "papas-pancakeria",
    title: "Papas Pancakeria",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/papaspancakeria.jpg",
    url: "/strongdog/swf/papapancakeria/base.html",
  },

  {
    id: "papas-pasteria",
    title: "Papas Pasteria",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/papaspasteria.jpg",
    url: "/strongdog/swf/papapasteria/base.html",
  },

  {
    id: "papas-pizzeria",
    title: "Papas Pizzeria",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/papaspizzeria.jpg",
    url: "/strongdog/swf/papapizzeria/base.html",
  },

  {
    id: "papas-scooperia",
    title: "Papas Scooperia",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/papasscooperia.jpg",
    url: "/strongdog/swf/papascooperia/base.html",
  },

  {
    id: "papas-sushiria",
    title: "Papas Sushiria",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/papassushiria.jpg",
    url: "/strongdog/swf/papasushiria/base.html",
  },

  {
    id: "papas-taco-mia",
    title: "Papas Taco Mia",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/papataco.jpg",
    url: "/strongdog/swf/papataco/base.html",
  },

  {
    id: "papas-wingeria",
    title: "Papas Wingeria",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/papawingeria.jpg",
    url: "/strongdog/swf/papawingeria/base.html",
  },

  {
    id: "portal",
    title: "Portal",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/portal.jpg",
    url: "/strongdog/swf/portal/base.html",
  },

  {
    id: "plants-vs-zombies-2",
    title: "Plants Vs. Zombies 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/pvz2.jpg",
    url: "/strongdog/swf/pvz2/base.html",
  },

  {
    id: "scrap-meatal-heros",
    title: "Scrap Meatal Heros",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/scrapmeatalheros.jpg",
    url: "/strongdog/swf/scrapmeatalheros/base.html",
  },

  {
    id: "shape-shifter",
    title: "Shape Shifter",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/shapeshifter.png",
    url: "/strongdog/swf/shapeshifter/base.html",
  },

  {
    id: "square-hero",
    title: "Square Hero",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/squarehero.jpg",
    url: "/strongdog/swf/squarehero/base.html",
  },

  {
    id: "tarzan-ball",
    title: "Tarzan Ball",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/tarzanball.jpg",
    url: "/strongdog/swf/tarzanball/base.html",
  },

  {
    id: "tasty-planet-dinotime",
    title: "Tasty Planet Dinotime",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/tastyplanetdinotime.jpg",
    url: "/strongdog/swf/tastyplanetdinotime/base.html",
  },

  {
    id: "truck-loader",
    title: "Truck Loader",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/truckloader.jpg",
    url: "/strongdog/swf/truckloader/base.html",
  },

  {
    id: "working-stiffs",
    title: "Working Stiffs",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/workingstiffs.jpg",
    url: "/strongdog/swf/workingstiffs/base.html",
  },

  {
    id: "minecraft-1-5-2-eaglercraft-",
    title: "Minecraft (1.5.2 Eaglercraft)",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/minecraft.jpeg",
    url: "/strongdog/html/eaglecraft/game/Offline_Download_Version.html",
  },

  {
    id: "super-mario-64",
    title: "Super Mario 64",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/sm64.jpg",
    url: "/strongdog/html/sm64/index.html",
  },

  {
    id: "rocket-league",
    title: "Rocket League",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/rocketleague.jpg",
    url: "/strongdog/html/rocket league/index.html",
  },

  {
    id: "google-snake",
    title: "Google Snake",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/googlesnake.jpg",
    url: "/strongdog/html/google-snake/index.html",
  },

  {
    id: "planet-life",
    title: "Planet Life",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/planetlife.jpg",
    url: "/strongdog/html/planetlife/index.html",
  },

  {
    id: "finding-santa",
    title: "Finding Santa",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/santa.png",
    url: "/strongdog/swf/findingsanta/base.html",
  },

  {
    id: "haunt-the-house",
    title: "Haunt the House",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/hauntthehouse.jpg",
    url: "/strongdog/swf/hauntthehouse/base.html",
  },

  {
    id: "couch-2048",
    title: "Couch 2048",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/couch.jpg",
    url: "/strongdog/html/couch2048/index.html",
  },

  {
    id: "tabs",
    title: "Tabs",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/tabs.jpeg",
    url: "/strongdog/html/tabs/index.html",
  },

  {
    id: "adventure-capitolists",
    title: "AdVenture Capitolists",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/capitolist.jpeg",
    url: "/strongdog/html/catpitolists/advcap.html",
  },

  {
    id: "duck-life-3",
    title: "Duck Life 3",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/ducklife3.webp",
    url: "/strongdog/swf/ducklife3/base.html",
  },

  {
    id: "factory-balls-1",
    title: "Factory Balls 1",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/factoryballs1.jpeg",
    url: "/strongdog/swf/factoryballs1/base.html",
  },

  {
    id: "factory-balls-2",
    title: "Factory Balls 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/factoryballs2.jpeg",
    url: "/strongdog/swf/factoryballs2/base.html",
  },

  {
    id: "factory-balls-3",
    title: "Factory Balls 3",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/factoryballs3.jpeg",
    url: "/strongdog/swf/factoryballs3/base.html",
  },

  {
    id: "factory-balls-4",
    title: "Factory Balls 4",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/factoryballs4.jpeg",
    url: "/strongdog/swf/factoryballs4/base.html",
  },

  {
    id: "run-1",
    title: "Run 1",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/run.jpeg",
    url: "/strongdog/swf/run/base.html",
  },

  {
    id: "run-2",
    title: "Run 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/run2.jpeg",
    url: "/strongdog/swf/run2/base.html",
  },

  {
    id: "big-ice-tower-tiny-square",
    title: "Big Ice Tower Tiny Square",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/bitts.png",
    url: "/strongdog/html/bitts/index.html",
  },

  {
    id: "fancy-pants-1",
    title: "Fancy Pants 1",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/fancy1.jpg",
    url: "/strongdog/swf/fancy1/base.html",
  },

  {
    id: "fancy-pants-3",
    title: "Fancy Pants 3",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/fancy3.jpg",
    url: "/strongdog/swf/fancy3/base.html",
  },

  {
    id: "penguin-dinner",
    title: "Penguin Dinner",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/penguin.jpeg",
    url: "/strongdog/swf/penguin/base.html",
  },

  {
    id: "bombit-1",
    title: "Bombit 1",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/bombit.jpeg",
    url: "/strongdog/swf/bombit/base.html",
  },

  {
    id: "bombit-2",
    title: "Bombit 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/bombit2.jpeg",
    url: "/strongdog/swf/bombit2/base.html",
  },

  {
    id: "bombit-3",
    title: "Bombit 3",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/bombit3.jpg",
    url: "/strongdog/swf/bombit3/base.html",
  },

  {
    id: "comic-book-cody",
    title: "Comic Book Cody",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/comicbook.jpeg",
    url: "/strongdog/swf/comicbook/base.html",
  },

  {
    id: "hot-dog-bush",
    title: "Hot Dog Bush",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/hotdogbush.jpeg",
    url: "/strongdog/swf/hotdogbush/base.html",
  },

  {
    id: "papa-louies-1",
    title: "Papa Louies 1",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/louie1.jpeg",
    url: "/strongdog/swf/louie1/base.html",
  },

  {
    id: "min-hero-tower-of-sages",
    title: "Min Hero Tower of Sages",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/minhero.jpeg",
    url: "/strongdog/swf/minhero/base.html",
  },

  {
    id: "3-pandas-1",
    title: "3 Pandas 1",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/pandas1.jpeg",
    url: "/strongdog/swf/pandas1/base.html",
  },

  {
    id: "shape-switcher",
    title: "Shape Switcher",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/shapeswitcher.jpeg",
    url: "/strongdog/swf/shapeswitch/base.html",
  },

  {
    id: "strike-force-kitty-1",
    title: "Strike Force Kitty 1",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/strikeforcekitty.jpeg",
    url: "/strongdog/swf/strikeforcekitty/base.html",
  },

  {
    id: "strike-force-kitty-2",
    title: "Strike Force Kitty 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/strikeforcekitty2.jpeg",
    url: "/strongdog/swf/strikeforcekitty2/base.html",
  },

  {
    id: "strike-force-kitty-3",
    title: "Strike Force Kitty 3",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/strikeforcekitty3.jpeg",
    url: "/strongdog/swf/strikeforcekitty3/base.html",
  },

  {
    id: "sugar-sugar",
    title: "Sugar, Sugar",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/sugar.jpeg",
    url: "/strongdog/swf/sugar/base.html",
  },

  {
    id: "bob-the-robber-2",
    title: "Bob the Robber 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/bob.jpeg",
    url: "/strongdog/html/bob-the-robber-2/index.html",
  },

  {
    id: "a-dark-room",
    title: "A Dark Room",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/adarkroom.png",
    url: "/strongdog/html/adarkroom/index.html",
  },

  {
    id: "algaes-escapade",
    title: "Algaes Escapade",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/apple-touch-icon-114x114.png",
    url: "/strongdog/html/algaes-escapade/index.html",
  },

  {
    id: "alien-invasion",
    title: "Alien Invasion",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/alien.png",
    url: "/strongdog/html/Alien Invasion/Alien Invasion/index.html",
  },

  {
    id: "appel",
    title: "Appel",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/appel.png",
    url: "/strongdog/html/Appel/game/Appel.html",
  },

  {
    id: "asciispace",
    title: "Asciispace",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/asciispace.png",
    url: "/strongdog/html/asciispace/index.html",
  },

  {
    id: "asteroids",
    title: "Asteroids",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/asteroids.png",
    url: "/strongdog/html/asteroids/index.html",
  },

  {
    id: "astray",
    title: "Astray",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/astray.png",
    url: "/strongdog/html/astray/index.html",
  },

  {
    id: "ball-platformer",
    title: "Ball Platformer",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/ball platformer.png",
    url: "/strongdog/html/ball platformer/game/ball platformer.html",
  },

  {
    id: "blackholesquare",
    title: "Blackholesquare",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/BlackHoleSquare.png",
    url: "/strongdog/html/blackholesquare/index.html",
  },

  {
    id: "bloxorz",
    title: "Bloxorz",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/bloxorz.png",
    url: "/strongdog/html/bloxorz/game/index.html",
  },

  {
    id: "bounceback",
    title: "Bounceback",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/bounceback.png",
    url: "/strongdog/html/bounceback/index.html",
  },

  {
    id: "breaklock",
    title: "Breaklock",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/breaklock.png",
    url: "/strongdog/html/breaklock/index.html",
  },

  {
    id: "breakout",
    title: "Breakout",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/breakout.png",
    url: "/strongdog/html/breakout/index.html",
  },

  {
    id: "bubble-scratch",
    title: "Bubble Scratch",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/bubble scratch.png",
    url: "/strongdog/html/Bubble Scratch/game/Bubble Scratch.html",
  },

  {
    id: "connect-4",
    title: "Connect 4",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/c4.png",
    url: "/strongdog/html/c4/game/index.html",
  },

  {
    id: "captain-callisto",
    title: "Captain Callisto",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/capain.png",
    url: "/strongdog/html/captaincallisto/index.html",
  },

  {
    id: "chess",
    title: "Chess",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/chess.png",
    url: "/strongdog/html/chess/index.html",
  },

  {
    id: "chroma",
    title: "Chroma",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/chroma.png",
    url: "/strongdog/html/chroma/index.html",
  },

  {
    id: "crystal-seeker",
    title: "Crystal Seeker",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/crystal.png",
    url: "/strongdog/html/Crystal Seeker.html",
  },

  {
    id: "cube-miner",
    title: "Cube Miner",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cube.png",
    url: "/strongdog/html/Cube Miner/game/Cube Miner.html",
  },

  {
    id: "cubefield",
    title: "Cubefield",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cubefeild.png",
    url: "/strongdog/html/cubefield/index.html",
  },

  {
    id: "digger-main",
    title: "Digger Main",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/diggermain.png",
    url: "/strongdog/html/digger-main/digger-main/index.html",
  },

  {
    id: "dinosaur",
    title: "Dinosaur",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/dino.png",
    url: "/strongdog/html/dinosaur/index.html",
  },

  {
    id: "edge-not-found",
    title: "Edge Not Found",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/edge.png",
    url: "/strongdog/html/edgenotfound/index.html",
  },

  {
    id: "evil-glich",
    title: "Evil Glich",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/EvilGlitch.png",
    url: "/strongdog/html/evilglitch/index.html",
  },

  {
    id: "flappy-2048",
    title: "Flappy 2048",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/flappy2048.png",
    url: "/strongdog/html/flappy-2048/index.html",
  },

  {
    id: "fortnite-z",
    title: "Fortnite Z",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/fornitez.png",
    url: "/strongdog/html/Fortnite Z/game/Fortnite Z.html",
  },

  {
    id: "geometry-dash-meltdown",
    title: "Geometry Dash Meltdown",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/dashmeltdown.png",
    url: "/strongdog/html/Geometry Dash Meltdown/game/Geometry Dash Meltdown.html",
  },

  {
    id: "geometry-dash-subzero",
    title: "Geometry Dash Subzero",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/dashsubzero.png",
    url: "/strongdog/html/Geometry Dash Subzero/game/Geometry Dash Subzero.html",
  },

  {
    id: "geometry-dash-world-toxic",
    title: "Geometry Dash World Toxic",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/dashtoxic.png",
    url: "/strongdog/html/Geometry Dash World Toxic factory/game/Geometry Dash World Toxic factory.html",
  },

  {
    id: "getting-over-it",
    title: "Getting Over It",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/over.png",
    url: "/strongdog/html/Getting Over It v1/game/Getting Over It v1.html",
  },

  {
    id: "horse-master",
    title: "Horse Master",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/horse.png",
    url: "/strongdog/html/hearse mster/-=HORSE MASTER=- The Game of Horse Mastery.html",
  },

  {
    id: "hextris",
    title: "Hextris",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/hex.png",
    url: "/strongdog/html/hextris/index.html",
  },

  {
    id: "farming",
    title: "Farming",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/farm.png",
    url: "/strongdog/html/html5-farming-demo-master/html5-farming-demo-master/farming.html",
  },

  {
    id: "konnekt",
    title: "Konnekt",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cone.png",
    url: "/strongdog/html/konnekt/index.html",
  },

  {
    id: "mario",
    title: "Mario",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/Mario.png",
    url: "/strongdog/html/Mario/game/Mario.html",
  },

  {
    id: "minekahn",
    title: "MineKahn",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/khan.png",
    url: "/strongdog/html/minekhan/index.html",
  },

  {
    id: "packabunchas",
    title: "Packabunchas",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/pack.png",
    url: "/strongdog/html/packabunchas/index.html",
  },

  {
    id: "just-one-boss",
    title: "Just One Boss",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/oneboss.png",
    url: "/strongdog/html/just one boss/index.html",
  },

  {
    id: "push-back",
    title: "Push Back",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/back.png",
    url: "/strongdog/html/pushback/index.html",
  },

  {
    id: "racer",
    title: "Racer",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/racer.jpeg",
    url: "/strongdog/html/racer/index.html",
  },

  {
    id: "radius-raid",
    title: "Radius Raid",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/radius.png",
    url: "/strongdog/html/radius raid/radius raid/index.html",
  },

  {
    id: "p-craft",
    title: "P-Craft",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/pcraft.png",
    url: "/strongdog/html/pico-8/PICO-8 Cartridge.html",
  },

  {
    id: "retrohaunt",
    title: "Retrohaunt",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/retro.jpeg",
    url: "/strongdog/html/retrohaunt/index.html",
  },

  {
    id: "roadblocks",
    title: "Roadblocks",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/roadblocks.jpeg",
    url: "/strongdog/html/roadblocks/index.html",
  },

  {
    id: "shuttledeck",
    title: "Shuttledeck",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/shuttle.png",
    url: "/strongdog/html/shuttledeck/index.html",
  },

  {
    id: "sleeping-beauty",
    title: "Sleeping Beauty",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/sleeping.png",
    url: "/strongdog/html/sleeping beauty/sleeping beauty/index.html",
  },

  {
    id: "space-company",
    title: "Space Company",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/images.png",
    url: "/strongdog/html/spacecompany/index.html",
  },

  {
    id: "space-garden",
    title: "Space Garden",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/garden.jpeg",
    url: "/strongdog/html/spacegarden/index.html",
  },

  {
    id: "space-huggers",
    title: "Space Huggers",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/huggers.jpeg",
    url: "/strongdog/html/spacehuggers/index.html",
  },

  {
    id: "tetris",
    title: "Tetris",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/tetris.jpeg",
    url: "/strongdog/html/tetris advanced/index.html",
  },

  {
    id: "trimps",
    title: "Trimps",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/trimps.png",
    url: "/strongdog/html/trimps/index.html",
  },

  {
    id: "xx142-b2exe",
    title: "xx142-b2exe",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/xx.png",
    url: "/strongdog/html/xx142-b2exe/index.html",
  },

  {
    id: "sand-and-water",
    title: "Sand and Water",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/sand.png",
    url: "/strongdog/html/Sand and Water v3.html",
  },

  {
    id: "scratch-brawl-2",
    title: "Scratch Brawl 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/scratchb.jpg",
    url: "/strongdog/html/Scratch Brawl 2.html",
  },

  {
    id: "slither-io",
    title: "Slither.io",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/slither.png",
    url: "/strongdog/html/slither.io v1.html",
  },

  {
    id: "terrain-generator",
    title: "Terrain Generator",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/terrain.png",
    url: "/strongdog/html/Terrain Generator.html",
  },

  {
    id: "terraria",
    title: "Terraria",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/terraria.jpg",
    url: "/strongdog/html/Terraria.html",
  },

  {
    id: "the-ninja",
    title: "The Ninja",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/n1.webp",
    url: "/strongdog/html/The Ninja.html",
  },

  {
    id: "the-ninja-2",
    title: "The Ninja 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/n2.png",
    url: "/strongdog/html/The Ninja 2.html",
  },

  {
    id: "the-ninja-3",
    title: "The Ninja 3",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/n3.webp",
    url: "/strongdog/html/The Ninja 3.html",
  },

  {
    id: "the-ninja-4",
    title: "The Ninja 4",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/n4.jpg",
    url: "/strongdog/html/The Ninja 4.html",
  },

  {
    id: "the-ninja-5",
    title: "The Ninja 5",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/n5.webp",
    url: "/strongdog/html/The Ninja 5.html",
  },

  {
    id: "the-ninja-5-hacked",
    title: "The Ninja 5 Hacked",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/n5h.png",
    url: "/strongdog/html/The Ninja 5 Hacked!.html",
  },

  {
    id: "-100-unicorn",
    title: "$100 Unicorn",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/100uc.png",
    url: "/strongdog/html/100uc.html",
  },

  {
    id: "the-executor",
    title: "The Executor",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/executor.png",
    url: "/strongdog/html/theexocutor",
  },

  {
    id: "1v1-space",
    title: "1v1 Space",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/1v1space.webp",
    url: "/strongdog/html/1v1space/index.html",
  },

  {
    id: "10-minutes-till-dawn",
    title: "10 Minutes Till Dawn",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/10m.webp",
    url: "/strongdog/html/10-minutes-till-dawn/index.html",
  },

  {
    id: "100-pong",
    title: "100 Pong",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/100pong.webp",
    url: "/strongdog/html/100-player-pong/index.html",
  },

  {
    id: "9007199254740992",
    title: "9007199254740992",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/900.webp",
    url: "/strongdog/html/9007199254740992/index.html",
  },

  {
    id: "achievementunlocked",
    title: "Achievementunlocked",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/ache.webp",
    url: "/strongdog/html/achievementunlocked/index.html",
  },

  {
    id: "ages-of-conflict",
    title: "Ages of Conflict",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/ages-of-conflict.webp",
    url: "/strongdog/html/ages-of-conflict/index.html",
  },

  {
    id: "alien-hominid",
    title: "Alien Hominid",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/alienhominid.webp",
    url: "/strongdog/html/alienhominid/index.html",
  },

  {
    id: "amidst-the-clouds",
    title: "Amidst the Clouds",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/amidst-the-clouds.webp",
    url: "/strongdog/html/amidst-the-clouds/index.html",
  },

  {
    id: "avalanche",
    title: "Avalanche",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/avalanche.webp",
    url: "/strongdog/html/avalanche/index.html",
  },

  {
    id: "backrooms",
    title: "Backrooms",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/backrooms.webp",
    url: "/strongdog/html/backrooms/index.html",
  },

  {
    id: "bad-icecream",
    title: "Bad Icecream",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/bad-ice-cream.webp",
    url: "/strongdog/html/bad-ice-cream/index.html",
  },

  {
    id: "bad-icecream-2",
    title: "Bad Icecream 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/bad-ice-cream-2.webp",
    url: "/strongdog/html/bad-ice-cream-2/index.html",
  },

  {
    id: "bad-icecream-3",
    title: "Bad Icecream 3",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/bad-ice-cream-3.webp",
    url: "/strongdog/html/bad-ice-cream-3/index.html",
  },

  {
    id: "baldis-basics",
    title: "Baldis Basics",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/baldis-basics.webp",
    url: "/strongdog/html/baldis-basics/index.html",
  },

  {
    id: "ballhop",
    title: "Ballhop",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/ballhop.webp",
    url: "/strongdog/html/ball-hop/index.html",
  },

  {
    id: "ballistic-chickens",
    title: "Ballistic Chickens",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/ballistic-chickens.webp",
    url: "/strongdog/html/ballistic-chickens/index.html",
  },

  {
    id: "biters",
    title: "Biters",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/biters.webp",
    url: "/strongdog/html/biters-io/index.html",
  },

  {
    id: "blocky-tower",
    title: "Blocky tower",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/blocky.webp",
    url: "/strongdog/html/blocky-tower/index.html",
  },

  {
    id: "bloonstd",
    title: "Bloonstd",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/bloonstd.webp",
    url: "/strongdog/html/bloonstd/index.html",
  },

  {
    id: "bloonstd-2",
    title: "Bloonstd 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/bloonstd2.webp",
    url: "/strongdog/html/bloonstd2/index.html",
  },

  {
    id: "bloonstd-4",
    title: "Bloonstd 4",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/bloonstd4.webp",
    url: "/strongdog/html/bloonstd4/index.html",
  },

  {
    id: "boxing",
    title: "Boxing",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/box.webp",
    url: "/strongdog/html/boxing-physics/index.html",
  },

  {
    id: "browserquest",
    title: "Browserquest",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/BrowserQuest.webp",
    url: "/strongdog/html/browserquest/index.html",
  },

  {
    id: "big-tower-tiny-square",
    title: "Big Tower Tiny Square",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/btts.webp",
    url: "/strongdog/html/big-tower-tiny-square/index.html",
  },

  {
    id: "circlo",
    title: "Circlo",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/circlo.webp",
    url: "/strongdog/html/circlo/index.html",
  },

  {
    id: "connect-3",
    title: "Connect 3",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/con3.webp",
    url: "/strongdog/html/connect3/index.html",
  },

  {
    id: "coreball",
    title: "Coreball",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/coreball.webp",
    url: "/strongdog/html/core-ball/index.html",
  },

  {
    id: "crossyroad",
    title: "Crossyroad",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/crossyroad.webp",
    url: "/strongdog/html/crossyroad/index.html",
  },

  {
    id: "csgo-clicker",
    title: "CSGO Clicker",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/CSGO.webp",
    url: "/strongdog/html/csgo-clicker/index.html",
  },

  {
    id: "cut-the-rope",
    title: "Cut the Rope",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/ctr.webp",
    url: "/strongdog/html/cuttherope/index.html",
  },

  {
    id: "cupcake-2048",
    title: "Cupcake 2048",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cupcakes.webp",
    url: "/strongdog/html/cupcakes/index.html",
  },

  {
    id: "cyber-city-driver",
    title: "Cyber City Driver",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/cyber.webp",
    url: "/strongdog/html/cyber-city-driver/index.html",
  },

  {
    id: "dogeminer",
    title: "Dogeminer",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/Dogecoin.webp",
    url: "/strongdog/html/dogeminer/index.html",
  },

  {
    id: "drift-city",
    title: "Drift City",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/driftc.webp",
    url: "/strongdog/html/drift-city/index.html",
  },

  {
    id: "drift-king",
    title: "Drift King",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/driftking.webp",
    url: "/strongdog/html/driftking/index.html",
  },

  {
    id: "dunkers-fight",
    title: "Dunkers Fight",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/dunk.webp",
    url: "/strongdog/html/dunkers-fight/index.html",
  },

  {
    id: "eatio",
    title: "Eatio",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/eatio.webp",
    url: "/strongdog/html/eatio/index.html",
  },

  {
    id: "ede-surf",
    title: "Ede Surf",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/edge-surf.webp",
    url: "/strongdog/html/edge-surf/index.html",
  },

  {
    id: "eel-slap",
    title: "Eel Slap",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/eel-slap.webp",
    url: "/strongdog/html/eel-slap/index.html",
  },

  {
    id: "steal-this-election",
    title: "Steal this Election",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/elec.webp",
    url: "/strongdog/html/steal-this-election/index.html",
  },

  {
    id: "endless-war-3",
    title: "Endless War 3",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/endlesswar3.webp",
    url: "/strongdog/html/endlesswar3/index.html",
  },

  {
    id: "evolution",
    title: "Evolution",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/evolution.webp",
    url: "/strongdog/html/evolution/index.html",
  },

  {
    id: "exo",
    title: "Exo",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/exo.webp",
    url: "/strongdog/html/exo/index.html",
  },

  {
    id: "flappy-plane",
    title: "Flappy Plane",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/flappyplae.jpeg",
    url: "/strongdog/html/flappyplane/index.html",
  },

  {
    id: "flip-hero",
    title: "Flip Hero",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/fliphero.webp",
    url: "/strongdog/html/fliphero/index.html",
  },

  {
    id: "fnaf",
    title: "FNAF",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/fnaf.webp",
    url: "/strongdog/html/fnaf/index.html",
  },

  {
    id: "fnaf-2",
    title: "FNAF 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/fnaf.webp",
    url: "/strongdog/html/fnaf2/index.html",
  },

  {
    id: "fnaf-3",
    title: "FNAF 3",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/fnaf.webp",
    url: "/strongdog/html/fnaf3/index.html",
  },

  {
    id: "fnaf-4",
    title: "FNAF 4",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/fnaf.webp",
    url: "/strongdog/html/fnaf4/index.html",
  },

  {
    id: "funny-shooter",
    title: "Funny Shooter",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/funnyshooter.webp",
    url: "/strongdog/html/funnyshooter/index.html",
  },

  {
    id: "goodnight",
    title: "Goodnight",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/gn.webp",
    url: "/strongdog/html/goodnight/index.html",
  },

  {
    id: "idle-breakout",
    title: "Idle Breakout",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/idlebreakout.webp",
    url: "/strongdog/html/idle-breakout/index.html",
  },

  {
    id: "impossible-quiz",
    title: "Impossible Quiz",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/impossiblequiz.webp",
    url: "/strongdog/html/impossiblequiz/index.html",
  },

  {
    id: "interactive-buddy",
    title: "Interactive Buddy",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/interactivebuddy.webp",
    url: "/strongdog/html/interactivebuddy/index.html",
  },

  {
    id: "jetpack-joyride",
    title: "Jetpack Joyride",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/jetpack-joyride.webp",
    url: "/strongdog/html/jetpack-joyride/index.html",
  },

  {
    id: "just-fall",
    title: "Just Fall",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/just-fall.webp",
    url: "/strongdog/html/just-fall/index.html",
  },

  {
    id: "kitchen-gun-game",
    title: "Kitchen Gun Game",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/kitchen-gun-game.webp",
    url: "/strongdog/html/kitchen-gun-game/index.html",
  },

  {
    id: "kitten-cannon",
    title: "Kitten Cannon",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/kittencannon.webp",
    url: "/strongdog/html/kittencannon/index.html",
  },

  {
    id: "krunker",
    title: "Krunker",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/krunker.webp",
    url: "/strongdog/html/krunker/index.html",
  },

  {
    id: "learn-to-fly",
    title: "Learn to Fly",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/learntofly.webp",
    url: "/strongdog/html/learntofly/index.html",
  },

  {
    id: "moto-x3m-spooky",
    title: "Moto X3M Spooky",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/moto-spook.webp",
    url: "/strongdog/html/motox3m-spooky/index.html",
  },

  {
    id: "moto-x3m-pool",
    title: "Moto X3M Pool",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/motox3m-pool.webp",
    url: "/strongdog/html/motox3m-pool/index.html",
  },

  {
    id: "moto-x3m-winter",
    title: "Moto X3M Winter",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/motox3m-winter.webp",
    url: "/strongdog/html/motox3m-winter/index.html",
  },

  {
    id: "moto-x3m-2",
    title: "Moto X3M 2",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/motox3m2.webp",
    url: "/strongdog/html/motox3m2/index.html",
  },

  {
    id: "pacman",
    title: "Pacman",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/pacman.webp",
    url: "/strongdog/html/pacman/index.html",
  },

  {
    id: "paper-io",
    title: "Paper.io",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/paperio.webp",
    url: "/strongdog/html/paperio/index.html",
  },

  {
    id: "papery-planes",
    title: "Papery Planes",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/paperplane.webp",
    url: "/strongdog/html/papery-planes/index.html",
  },

  {
    id: "particle-clicker",
    title: "Particle Clicker",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/parclick.webp",
    url: "/strongdog/html/particle-clicker/index.html",
  },

  {
    id: "picky-package",
    title: "Picky Package",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/pickyback.webp",
    url: "/strongdog/html/picky-package/index.html",
  },

  {
    id: "pokemon-fire-red",
    title: "Pokemon Fire Red",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/PokemonFireRed.webp",
    url: "/strongdog/html/pokemonfirered/index.html",
  },

  {
    id: "pong",
    title: "Pong",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/pong.webp",
    url: "/strongdog/html/pong/index.html",
  },

  {
    id: "sans",
    title: "Sans",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/sans.webp",
    url: "/strongdog/html/sans/index.html",
  },

  {
    id: "idle-shark",
    title: "Idle Shark",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/sharkgame.webp",
    url: "/strongdog/html/idle-shark/index.html",
  },

  {
    id: "space-invaders",
    title: "Space Invaders",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/spaceinv.webp",
    url: "/strongdog/html/spaceinvaders/index.html",
  },

  {
    id: "subway-surfers-san-fran",
    title: "Subway Surfers San Fran",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/subsan.webp",
    url: "/strongdog/html/subwaysurferssanfrancisco/index.html",
  },

  {
    id: "subway-surfers-beijing",
    title: "Subway Surfers BeiJing",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/subwaysurferbeijing.webp",
    url: "/strongdog/html/subwaysurfersbeijing/index.html",
  },

  {
    id: "subway-surfers-houston",
    title: "Subway Surfers Houston",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/subwaysurfershouston.webp",
    url: "/strongdog/html/subwaysurfershouston/index.html",
  },

  {
    id: "subway-surfers-monaco",
    title: "Subway Surfers Monaco",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/SubwayMonaco.webp",
    url: "/strongdog/html/subwaysurfersmonaco/index.html",
  },

  {
    id: "the-square",
    title: "The Square",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/thesquare.webp",
    url: "/strongdog/html/thesquare/index.html",
  },

  {
    id: "time-shooters",
    title: "Time Shooters",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/timeshooters.webp",
    url: "/strongdog/html/timeshooter/index.html",
  },

  {
    id: "tic-tac-toe",
    title: "Tic-Tac-Toe",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/toe.webp",
    url: "/strongdog/html/tic-tac-toe/index.html",
  },

  {
    id: "tic-tac-toe-ai",
    title: "Tic-Tac-Toe AI",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/toeai.webp",
    url: "/strongdog/html/tic-tac-toe-ai/index.html",
  },

  {
    id: "tower-master",
    title: "Tower Master",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/towermaster.webp",
    url: "/strongdog/html/towermaster/index.html",
  },

  {
    id: "tv-static",
    title: "TV Static",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/tv-static.webp",
    url: "/strongdog/html/tv-static/index.html",
  },

  {
    id: "veloce",
    title: "Veloce",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/VELOCE.webp",
    url: "/strongdog/html/veloce/index.html",
  },

  {
    id: "vex-3",
    title: "Vex 3",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/vex3.webp",
    url: "/strongdog/html/vex3/index.html",
  },

  {
    id: "vex-4",
    title: "Vex 4",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/vex4.webp",
    url: "/strongdog/html/vex4/index.html",
  },

  {
    id: "vex-5",
    title: "Vex 5",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/vex5.webp",
    url: "/strongdog/html/vex5/index.html",
  },

  {
    id: "vex-7",
    title: "Vex 7",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/vex7.webp",
    url: "/strongdog/html/vex7/index.html",
  },

  {
    id: "wall-smash",
    title: "Wall Smash",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/wallsmash.webp",
    url: "/strongdog/html/wallsmash/index.html",
  },

  {
    id: "water-works",
    title: "Water Works",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/waterworks.webp",
    url: "/strongdog/html/waterworks/index.html",
  },

  {
    id: "weave-silk",
    title: "Weave Silk",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/weavesilk.webp",
    url: "/strongdog/html/weavesilk/index.html",
  },

  {
    id: "fluid-simulation",
    title: "Fluid Simulation",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/webgl-fluid-simulation.webp",
    url: "/strongdog/html/webgl-fluid-simulation/index.html",
  },

  {
    id: "web-retro",
    title: "Web Retro",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/webretro.webp",
    url: "/strongdog/html/webretro/index.html",
  },

  {
    id: "whac-a-mole",
    title: "Whac-A-Mole",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/Whac-A-Mole.webp",
    url: "/strongdog/html/whac-a-mole/index.html",
  },

  {
    id: "world-s-hardest-game",
    title: "World's Hardest Game",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/whg.webp",
    url: "/strongdog/html/worlds-hardest-game/index.html",
  },

  {
    id: "wordle",
    title: "Wordle",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/wordle.webp",
    url: "/strongdog/html/wordle/index.html",
  },

  {
    id: "x-trial-racing",
    title: "X Trial Racing",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/xtr.webp",
    url: "/strongdog/html/x-trial-racing/index.html",
  },

  {
    id: "yoshi-fabricator",
    title: "Yoshi Fabricator",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/YFS.webp",
    url: "/strongdog/html/yoshifabrication/index.html",
  },

  {
    id: "zombs-royale",
    title: "Zombs Royale",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/zombs-royale.webp",
    url: "/strongdog/html/zombs-royale/index.html",
  },

  {
    id: "zoro",
    title: "Zoro",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/zoro.webp",
    url: "/strongdog/html/zoro/index.html",
  },

  {
    id: "ledegnd-of-zelda-maker",
    title: "Ledegnd of Zelda Maker",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/lozmaker.png",
    url: "/strongdog/html/lozmaker/game/lozmaker.html",
  },

  {
    id: "tower-defence",
    title: "Tower Defence",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/towerdef.png",
    url: "/strongdog/html/towerdef.html",
  },

  {
    id: "yet-another-world",
    title: "Yet Another World",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/yetanotherworld.png",
    url: "/strongdog/html/yetanotherworld.html",
  },

  {
    id: "afterlife",
    title: "Afterlife",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/afterlife.png",
    url: "/strongdog/html/afterlife/game/afterlife.html",
  },

  {
    id: "earth-sausage",
    title: "Earth Sausage",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/earth.png",
    url: "/strongdog/html/earthsausage/game/earthsausage.html",
  },

  {
    id: "flat-guys",
    title: "Flat Guys",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/flatguys.png",
    url: "/strongdog/html/flatguys/game/flatguys.html",
  },

  {
    id: "monke",
    title: "Monke",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/monke.png",
    url: "/strongdog/html/monke/game/monke.html",
  },

  {
    id: "pixel-bear-adventure",
    title: "Pixel Bear Adventure",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/pixelbearadventure.png",
    url: "/strongdog/html/pixelbearadventure/game/pixelbearadventure.html",
  },

  {
    id: "pixel-speedrun",
    title: "Pixel Speedrun",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/pixelspeedrun.png",
    url: "/strongdog/html/pixelspeedrun/game/pixelspeedrun.html",
  },

  {
    id: "pizza-challange",
    title: "Pizza Challange",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/pizzachallenge.png",
    url: "/strongdog/html/pizzachallenge/game/pizzachallenge.html",
  },

  {
    id: "retro-speed",
    title: "Retro Speed",
    tags: ["imported", "strongdog"],
    thumbnail: "/strongdog/img/retro speed.png",
    url: "/strongdog/html/retro speed/game/retro speed.html speed.html",
  },
];
