import { thumb } from "@/lib/thumb";

interface ThumbnailCache {
  [gameId: string]: {
    url: string;
    timestamp: number;
  };
}

const CACHE_KEY = 'game-thumbnails-cache';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

class ThumbnailGenerator {
  private cache: ThumbnailCache = {};
  private generatingQueue = new Set<string>();

  constructor() {
    this.loadCache();
  }

  private loadCache() {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        this.cache = JSON.parse(cached);
        // Clean expired entries
        const now = Date.now();
        Object.keys(this.cache).forEach(key => {
          if (now - this.cache[key].timestamp > CACHE_DURATION) {
            delete this.cache[key];
          }
        });
        this.saveCache();
      }
    } catch (error) {
      console.error('Failed to load thumbnail cache:', error);
      this.cache = {};
    }
  }

  private saveCache() {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(this.cache));
    } catch (error) {
      console.error('Failed to save thumbnail cache:', error);
    }
  }

  async generateThumbnail(gameId: string, gameTitle: string): Promise<string> {
    // Check cache first
    if (this.cache[gameId]) {
      return this.cache[gameId].url;
    }

    // Avoid duplicate generation requests
    if (this.generatingQueue.has(gameId)) {
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (this.cache[gameId]) {
            clearInterval(checkInterval);
            resolve(this.cache[gameId].url);
          }
        }, 500);
      });
    }

    this.generatingQueue.add(gameId);

    try {
      // Generate thumbnail using AI
      const prompt = `Create a vibrant, gaming thumbnail for "${gameTitle}". 
      Style: Modern, colorful, eye-catching game icon with bold graphics. 
      Focus on the game's theme and make it instantly recognizable. 
      High quality, professional game thumbnail design. 1:1 aspect ratio.`;

      const response = await fetch('/api/generate-thumbnail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, gameId, gameTitle })
      });

      if (!response.ok) {
        throw new Error('Thumbnail generation failed');
      }

      const data = await response.json();
      const thumbnailUrl = data.url;

      // Cache the result
      this.cache[gameId] = {
        url: thumbnailUrl,
        timestamp: Date.now()
      };
      this.saveCache();

      return thumbnailUrl;
    } catch (error) {
      console.error(`Failed to generate thumbnail for ${gameTitle}:`, error);
      throw error;
    } finally {
      this.generatingQueue.delete(gameId);
    }
  }

  getThumbnail(gameId: string, fallbackThumbnail?: string): string {
    return this.cache[gameId]?.url || thumb(fallbackThumbnail);
  }

  hasCachedThumbnail(gameId: string): boolean {
    return !!this.cache[gameId];
  }

  clearCache() {
    this.cache = {};
    localStorage.removeItem(CACHE_KEY);
  }

  prefetchThumbnails(games: Array<{ id: string; title: string; thumbnail?: string }>, maxConcurrent = 3) {
    const gamesNeedingThumbnails = games.filter(g => !g.thumbnail && !this.hasCachedThumbnail(g.id));
    
    let currentIndex = 0;
    const generateNext = async () => {
      if (currentIndex >= gamesNeedingThumbnails.length) return;
      
      const game = gamesNeedingThumbnails[currentIndex++];
      try {
        await this.generateThumbnail(game.id, game.title);
      } catch (error) {
        console.error(`Failed to prefetch thumbnail for ${game.title}`);
      }
      
      // Generate next in queue
      generateNext();
    };

    // Start concurrent generation
    for (let i = 0; i < Math.min(maxConcurrent, gamesNeedingThumbnails.length); i++) {
      generateNext();
    }
  }
}

export const thumbnailGenerator = new ThumbnailGenerator();
