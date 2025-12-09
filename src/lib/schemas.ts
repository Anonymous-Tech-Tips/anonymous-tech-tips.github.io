import { z } from "zod";

// Base schemas for common fields
const UrlOrPath = z.string().refine(
  s => /^https?:\/\//.test(s) || s.startsWith('/'),
  { message: 'Must be an absolute URL or a site-relative path' }
);

const ISOorOptional = z.string().datetime().optional();

const BaseItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(100),
  description: z.string().min(10).max(500),
  thumbnail: UrlOrPath,
  tags: z.array(z.string().min(1)).min(1).max(10),
  featured: z.boolean().default(false),
  createdAt: ISOorOptional,
  updatedAt: ISOorOptional,
});

// Game-specific schema
export const GameSchema = BaseItemSchema.extend({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(80),
  description: z.string().min(20).max(300),
  url: UrlOrPath,
  category: z.enum(["arcade","puzzle","strategy","sports","racing","simulation","idle","other"]),
  mobileFriendly: z.boolean().default(true),
  offline: z.boolean().default(false),
  assets: z.array(UrlOrPath).optional(),
  developer: z.string().optional(),
  instructions: z.string().optional(),
  controls: z.string().optional(),
  tips: z.array(z.string()).optional(),
  similar: z.array(z.string()).optional(),
});

// Utility tool schema
export const UtilitySchema = BaseItemSchema.extend({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(80),
  description: z.string().min(20).max(300),
  url: UrlOrPath,
  category: z.enum(["converter","generator","calculator","editor","analyzer","other"]),
  inputType: z.enum(["text","file","number","url","mixed"]),
  outputType: z.enum(["text","file","number","image","mixed"]),
  features: z.array(z.string()).optional(),
  limitations: z.string().optional(),
});

// Guide/education content schema
export const GuideSchema = BaseItemSchema.extend({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(100),
  description: z.string().min(30).max(400),
  content: z.string().min(100).max(10000), // Markdown content
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  estimatedTime: z.number().min(1).max(120), // minutes
  prerequisites: z.array(z.string()).optional(),
  steps: z.array(z.object({
    title: z.string(),
    content: z.string(),
    optional: z.boolean().default(false)
  })).min(1),
  relatedItems: z.array(z.string()).optional(),
});

// Collection schema for user-created collections
export const CollectionSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(50),
  description: z.string().max(200).optional(),
  itemIds: z.array(z.string()).min(1),
  itemType: z.enum(["games", "utilities", "guides"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  isPublic: z.boolean().default(false),
  shareId: z.string().optional(),
});

// User preferences schema
export const UserPrefsSchema = z.object({
  favorites: z.array(z.string()).default([]),
  history: z.array(z.object({
    itemId: z.string(),
    itemType: z.enum(["game", "utility", "guide"]),
    timestamp: z.string().datetime(),
    timeSpent: z.number().optional()
  })).default([]),
  settings: z.object({
    theme: z.enum(["light", "dark", "gamer"]).default("gamer"),
    reducedMotion: z.boolean().default(false),
    studyMode: z.boolean().default(false),
    soundEnabled: z.boolean().default(true),
    onboardingCompleted: z.boolean().default(false),
    streakCount: z.number().min(0).default(0),
    lastVisitDate: z.string().optional(),
    achievements: z.array(z.string()).default([]),
    // Reward-related settings
    customTheme: z.object({
      primary: z.string(),
      secondary: z.string(),
      background: z.string(),
    }).optional(),
    profileBorder: z.string().optional(),
    usernameFont: z.string().optional(),
    gameReactions: z.record(z.record(z.number())).optional(),
    gameRequests: z.array(z.object({
      id: z.string(),
      gameName: z.string(),
      gameUrl: z.string(),
      description: z.string().optional(),
      date: z.string(),
    })).optional(),
    gameStats: z.record(z.object({
      playCount: z.number(),
      totalTime: z.number().optional(),
      lastPlayed: z.string().optional(),
    })).optional(),
    doublePointsActiveUntil: z.string().optional(),
    activeTheme: z.string().nullable().optional(),
  }).default({}),
  collections: z.array(CollectionSchema).default([])
});

// Type exports
export type Game = z.infer<typeof GameSchema>;
export type Utility = z.infer<typeof UtilitySchema>;
export type Guide = z.infer<typeof GuideSchema>;
export type Collection = z.infer<typeof CollectionSchema>;
export type UserPrefs = z.infer<typeof UserPrefsSchema>;

// Validation functions
export const validateGame = (data: unknown) => GameSchema.parse(data);
export const validateUtility = (data: unknown) => UtilitySchema.parse(data);
export const validateGuide = (data: unknown) => GuideSchema.parse(data);
export const validateUserPrefs = (data: unknown) => UserPrefsSchema.parse(data);

// Safe validation with error handling
export const safeValidateGame = (data: unknown) => {
  try {
    return { success: true, data: validateGame(data) };
  } catch (error) {
    return { success: false, error };
  }
};

export const safeValidateUtility = (data: unknown) => {
  try {
    return { success: true, data: validateUtility(data) };
  } catch (error) {
    return { success: false, error };
  }
};

export const safeValidateGuide = (data: unknown) => {
  try {
    return { success: true, data: validateGuide(data) };
  } catch (error) {
    return { success: false, error };
  }
};
