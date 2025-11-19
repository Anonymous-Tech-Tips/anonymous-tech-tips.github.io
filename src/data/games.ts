import polyTrack from "@/assets/thumbnails/poly-track.jpg";
import cookieClicker from "@/assets/thumbnails/cookie-clicker.jpg";
import driveMad from "@/assets/thumbnails/drive-mad.jpg";
import game2048 from "@/assets/thumbnails/2048.jpg";
import slope from "@/assets/thumbnails/slope.jpg";
import bitlife from "@/assets/thumbnails/bitlife.jpg";
import retroBowl from "@/assets/thumbnails/retro-bowl.jpg";
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
  // --- 🔥 Most Popular Games ---
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
    id: "super-mario-bros",
    title: "Super Mario Bros",
    tags: ["platform", "classic"],
    thumbnail: fallback,
    url: "https://math181124.github.io/g/class-826",
    featured: true,
  },
  {
    id: "1v1-lol",
    title: "1v1.lol",
    tags: ["shooter", "battle royale", "multiplayer"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g77/class-439",
    featured: true,
  },
  {
    id: "slope",
    title: "Slope",
    tags: ["arcade", "reflex"],
    thumbnail: slope,
    url: "https://lizzyben1.github.io/poopygamesbeta/play/slope/",
    featured: true,
  },
  {
    id: "flappy-bird",
    title: "Flappy Bird",
    tags: ["arcade", "reflex"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g26/class-434",
    featured: true,
  },
  {
    id: "subway-surfers-newyork",
    title: "Subway Surfers Newyork",
    tags: ["endless runner", "arcade"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g26/class-444",
    featured: true,
  },
  {
    id: "yohoho-io",
    title: "YoHoHo.io",
    tags: ["io", "battle royale", "multiplayer"],
    thumbnail: fallback,
    url: "https://math181124.github.io/g77/class-828",
    featured: true,
  },
  {
    id: "basketball-stars",
    title: "Basketball Stars",
    tags: ["sports", "basketball", "arcade"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g5/class-449",
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

  // --- 🎮 All Games (Alphabetical) ---
  {
    id: 'ovo',
    title: 'Ovo',
    tags: ['action', 'adventure', 'platformer'],
    thumbnail: fallback,
    url: 'https://vaz63.github.io/g5/class-456',
  },
  {
    id: "basket-bros",
    title: "Basket Bros",
    tags: ["sports", "basketball", "multiplayer"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g97/class-482",
  },
  {
    id: "bitlife",
    title: "Bitlife",
    tags: ["sim", "life"],
    thumbnail: bitlife,
    url: "https://vaz63.github.io/g5/class-441",
    premium: true,
  },
  {
    id: "bob-robber-4",
    title: "Bob the Robber 4",
    tags: ["stealth", "strategy"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g97/class-568",
  },
  {
    id: "car-drift-racers-2",
    title: "Car Drift Racers 2",
    tags: ["racing", "cars"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g3/class-601",
  },
  {
    id: "crossy-road",
    title: "Crossy Road",
    tags: ["arcade", "endless runner"],
    thumbnail: fallback,
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
    id: "poly-track-premium",
    title: "🎁 Secret Treasure Quest",
    tags: ["adventure", "puzzle", "secret"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g97/class-568",
    secret: true,
  },
  {
    id: "experimental-racer",
    title: "🔓 Experimental Racer",
    tags: ["racing", "experimental", "early access"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g3/class-601",
    earlyAccess: true,
  },
  {
    id: "escaping-prison",
    title: "Escaping The Prison",
    tags: ["adventure", "escape"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g97/class-780",
  },
  {
    id: "fireboy-watergirl",
    title: "Fireboy and Watergirl 1: Forest Temple",
    tags: ["puzzle", "adventure"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g177/class-346",
  },
  {
    id: "fireboy-watergirl-4",
    title: "Fireboy and Watergirl 4: Crystal Temple",
    tags: ["puzzle", "adventure", "cooperative"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g177/class-343",
  },
  {
    id: "furious-racing-3d",
    title: "Furious Racing 3D",
    tags: ["racing", "cars"],
    thumbnail: fallback,
    url: "https://math181124.github.io/g97/class-793",
  },
  {
    id: "monkey-mart",
    title: "Monkey Mart",
    tags: ["management", "idle"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g77/class-829",
  },
  {
    id: "moto-x3m-2",
    title: "Moto X3M 2",
    tags: ["racing", "motorcycle"],
    thumbnail: fallback,
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
    thumbnail: fallback,
    url: "https://vaz63.github.io/g5/class-409",
  },
  {
    id: "red-ball-4",
    title: "Red Ball 4",
    tags: ["adventure", "platform"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g22/class-491",
  },
  {
    id: "rooftop-snipers",
    title: "Rooftop Snipers",
    tags: ["shooter", "multiplayer"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g5/class-481",
  },
  {
    id: "sausage-flip",
    title: "Sausage Flip",
    tags: ["arcade", "physics"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g2/class-415",
  },
  {
    id: "slope-2",
    title: "Slope 2",
    tags: ["arcade", "reflex"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g2/class-437",
  },
  {
    id: "slope-3",
    title: "Slope 3",
    tags: ["arcade", "reflex"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g5/class-501",
  },
  {
    id: "soccer-random",
    title: "Soccer Random",
    tags: ["sports", "soccer"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g26/class-511",
  },
  {
    id: "speed-pool-king",
    title: "Speed Pool King",
    tags: ["sports", "pool", "billiards"],
    thumbnail: fallback,
    url: "https://math181124.github.io/g6/class-146",
  },
  {
    id: "stickman-climb-2",
    title: "Stickman Climb 2",
    tags: ["arcade", "stickman", "platform"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g2/class-426",
  },
  {
    id: "stickman-hook",
    title: "Stickman Hook",
    tags: ["arcade", "stickman"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g5/class-406",
  },
  {
    id: "tomb-of-mask",
    title: "Tomb Of The Mask",
    tags: ["arcade", "maze"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g26/class-438",
  },
  {
    id: "tunnel-rush",
    title: "Tunnel Rush",
    tags: ["arcade", "reflex", "tunnel"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g5/class-404",
  },
  {
    id: "water-color-sort",
    title: "Water Color Sort",
    tags: ["puzzle", "casual"],
    thumbnail: fallback,
    url: "https://vaz63.github.io/g69/class-635",
  },
];
