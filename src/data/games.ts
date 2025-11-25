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

export interface Game {
  id: string;
  title: string;
  tags: string[];
  thumbnail: string;
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
    tags: ["arcade", "reflex"],
    thumbnail: slope,
    url: "https://lizzyben1.github.io/poopygamesbeta/play/slope/",
    featured: true,
  },
  {
    id: "cookie-clicker",
    title: "Cookie Clicker",
    tags: ["idle", "clicker"],
    thumbnail: cookieClicker,
    url: "https://scherb96.github.io/",
    featured: true,
  },
  {
    id: "2048",
    title: "2048",
    tags: ["puzzle", "numbers"],
    thumbnail: game2048,
    url: "https://lizzyben1.github.io/poopygamesbeta/play/2048/",
    featured: true,
  },
  {
    id: "retro-bowl",
    title: "Retro Bowl",
    tags: ["sports", "football"],
    thumbnail: retroBowl,
    url: "https://vaz63.github.io/g5/class-400/",
    featured: true,
  },
  {
    id: "1v1-lol",
    title: "1v1.lol",
    tags: ["shooter", "battle royale", "multiplayer"],
    thumbnail: oneVOneLol,
    url: "https://vaz63.github.io/g77/class-439",
    featured: true,
  },
  {
    id: "subway-surfers-newyork",
    title: "Subway Surfers New York",
    tags: ["endless runner", "arcade"],
    thumbnail: subwaySurfers,
    url: "https://vaz63.github.io/g26/class-444",
    featured: true,
  },
  {
    id: "super-mario-bros",
    title: "Super Mario Bros",
    tags: ["platform", "classic"],
    thumbnail: superMarioBros,
    url: "https://math181124.github.io/g/class-826",
    featured: true,
  },
  {
    id: "tunnel-rush",
    title: "Tunnel Rush",
    tags: ["arcade", "reflex", "tunnel"],
    thumbnail: tunnelRush,
    url: "https://vaz63.github.io/g5/class-404",
    featured: true,
  },
  {
    id: "ovo",
    title: "Ovo",
    tags: ["action", "adventure", "platformer"],
    thumbnail: ovo,
    url: "https://vaz63.github.io/g5/class-456",
    featured: true,
  },
  {
    id: "monkey-mart",
    title: "Monkey Mart",
    tags: ["management", "idle"],
    thumbnail: monkeyMart,
    url: "https://vaz63.github.io/g77/class-829",
    featured: true,
  },

  // --- 🎮 All Games (Alphabetical) ---
  {
    id: "bob-robber-4",
    title: "Bob the Robber 4",
    tags: ["stealth", "strategy"],
    thumbnail: bobRobber4,
    url: "https://vaz63.github.io/g97/class-568",
  },
  {
    id: "car-drift-racers-2",
    title: "Car Drift Racers 2",
    tags: ["racing", "cars"],
    thumbnail: carDriftRacers2,
    url: "https://vaz63.github.io/g3/class-601",
  },
  {
    id: "crossy-road",
    title: "Crossy Road",
    tags: ["arcade", "endless runner"],
    thumbnail: crossyRoad,
    url: "https://vaz63.github.io/g20/class-402",
  },
  {
    id: "drive-mad",
    title: "Drive Mad",
    tags: ["cars", "physics"],
    thumbnail: driveMad,
    url: "https://lizzyben1.github.io/poopygamesbeta/play/drive-mad/",
    premium: true,
  },
  {
    id: "escaping-prison",
    title: "Escaping The Prison",
    tags: ["adventure", "escape"],
    thumbnail: escapingPrison,
    url: "https://vaz63.github.io/g97/class-780",
  },
  {
    id: "experimental-racer",
    title: "🔓 Experimental Racer",
    tags: ["racing", "experimental", "early access"],
    thumbnail: experimentalRacer,
    url: "https://vaz63.github.io/g3/class-601",
    earlyAccess: true,
  },
  {
    id: "fireboy-watergirl",
    title: "Fireboy and Watergirl 1: Forest Temple",
    tags: ["puzzle", "adventure"],
    thumbnail: fireboyWatergirl,
    url: "https://vaz63.github.io/g177/class-346",
  },
  {
    id: "fireboy-watergirl-4",
    title: "Fireboy and Watergirl 4: Crystal Temple",
    tags: ["puzzle", "adventure", "cooperative"],
    thumbnail: fireboyWatergirl4,
    url: "https://vaz63.github.io/g177/class-343",
  },
  {
    id: "flappy-bird",
    title: "Flappy Bird",
    tags: ["arcade", "reflex"],
    thumbnail: flappyBird,
    url: "https://vaz63.github.io/g26/class-434",
  },
  {
    id: "furious-racing-3d",
    title: "Furious Racing 3D",
    tags: ["racing", "cars"],
    thumbnail: furiousRacing3d,
    url: "https://math181124.github.io/g97/class-793",
  },
  {
    id: "moto-x3m-2",
    title: "Moto X3M 2",
    tags: ["racing", "motorcycle"],
    thumbnail: motoX3m2,
    url: "https://vaz63.github.io/g26/class-459",
  },
  {
    id: "poly-track",
    title: "Poly Track",
    tags: ["racing", "arcade"],
    thumbnail: polyTrack,
    url: "https://iliill1.github.io/polytrackfix/polytrack/",
  },
  {
    id: "raft-wars",
    title: "Raft Wars",
    tags: ["shooting", "strategy"],
    thumbnail: raftWars,
    url: "https://vaz63.github.io/g5/class-409",
  },
  {
    id: "red-ball-4",
    title: "Red Ball 4",
    tags: ["adventure", "platform"],
    thumbnail: redBall4,
    url: "https://vaz63.github.io/g22/class-491",
  },
  {
    id: "rooftop-snipers",
    title: "Rooftop Snipers",
    tags: ["shooter", "multiplayer"],
    thumbnail: rooftopSnipers,
    url: "https://vaz63.github.io/g5/class-481",
  },
  {
    id: "sausage-flip",
    title: "Sausage Flip",
    tags: ["arcade", "physics"],
    thumbnail: sausageFlip,
    url: "https://vaz63.github.io/g2/class-415",
  },
  {
    id: "poly-track-premium",
    title: "🎁 Secret Treasure Quest",
    tags: ["adventure", "puzzle", "secret"],
    thumbnail: secretTreasure,
    url: "https://vaz63.github.io/g97/class-568",
    secret: true,
  },
  {
    id: "slope-2",
    title: "Slope 2",
    tags: ["arcade", "reflex"],
    thumbnail: slope2,
    url: "https://vaz63.github.io/g2/class-437",
  },
  {
    id: "slope-3",
    title: "Slope 3",
    tags: ["arcade", "reflex"],
    thumbnail: slope3,
    url: "https://vaz63.github.io/g5/class-501",
  },
  {
    id: "soccer-random",
    title: "Soccer Random",
    tags: ["sports", "soccer"],
    thumbnail: soccerRandom,
    url: "https://vaz63.github.io/g26/class-511",
  },
  {
    id: "speed-pool-king",
    title: "Speed Pool King",
    tags: ["sports", "pool", "billiards"],
    thumbnail: speedPoolKing,
    url: "https://math181124.github.io/g6/class-146",
  },
  {
    id: "stickman-climb-2",
    title: "Stickman Climb 2",
    tags: ["arcade", "stickman", "platform"],
    thumbnail: stickmanClimb2,
    url: "https://vaz63.github.io/g2/class-426",
  },
  {
    id: "stickman-hook",
    title: "Stickman Hook",
    tags: ["arcade", "stickman"],
    thumbnail: stickmanHook,
    url: "https://vaz63.github.io/g5/class-406",
  },
  {
    id: "tomb-of-mask",
    title: "Tomb Of The Mask",
    tags: ["arcade", "maze"],
    thumbnail: tombOfMask,
    url: "https://vaz63.github.io/g26/class-438",
  },
  {
    id: "water-color-sort",
    title: "Water Color Sort",
    tags: ["puzzle", "casual"],
    thumbnail: waterColorSort,
    url: "https://vaz63.github.io/g69/class-635",
  },
  {
    id: "yohoho-io",
    title: "YoHoHo.io",
    tags: ["io", "battle royale", "multiplayer"],
    thumbnail: yohohoIo,
    url: "https://math181124.github.io/g77/class-828",
  },
];
