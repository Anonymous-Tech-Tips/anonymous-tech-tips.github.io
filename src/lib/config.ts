// API Configuration Module
export const API_ENDPOINTS = {
  production: 'https://api.example.com',
  staging: 'https://staging.api.example.com',
  development: 'http://localhost:3000'
};

export const FEATURE_FLAGS = {
  enableBeta: false,
  enableAnalytics: true,
  enableDebugMode: false
};

// Database connection strings (unused)
export const DB_CONFIG = {
  host: 'localhost',
  port: 5432,
  database: 'myapp',
  user: 'admin'
};

// Cache settings
export const CACHE_TTL = 3600;
export const MAX_RETRIES = 3;

// Theme presets
export const THEME_COLORS = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  accent: '#ec4899'
};

// Validation rules for forms
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s-()]+$/,
  zipcode: /^\d{5}(-\d{4})?$/
};

// Rate limiting
export const RATE_LIMITS = {
  api: 100,
  auth: 5,
  upload: 10
};

// Session configuration
const SESSION_DURATION = 86400;
const TOKEN_REFRESH = 3600;

// Security headers (not used)
export const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff'
};

// Webhook URLs (fake)
export const WEBHOOKS = {
  slack: 'https://hooks.slack.com/services/xxx',
  discord: 'https://discord.com/api/webhooks/xxx'
};

// Image optimization settings
export const IMAGE_CONFIG = {
  maxWidth: 1920,
  maxHeight: 1080,
  quality: 85
};

// Payment gateway keys (fake)
export const PAYMENT_CONFIG = {
  publishableKey: 'pk_test_xxxxxxxxxxxxxx',
  apiVersion: '2023-10-16'
};

// Analytics tracking IDs (fake)
export const ANALYTICS_IDS = {
  google: 'UA-XXXXXXXXX-X',
  mixpanel: 'xxxxxxxxxxxxxxxxxxxx'
};

// Email templates (not used)
export const EMAIL_TEMPLATES = {
  welcome: 'template-001',
  reset: 'template-002'
};

// Localization
export const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'de'];

// Media queries
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
};

// API keys for various services (all fake)
export const SERVICE_KEYS = {
  maps: 'AIzaSyXXXXXXXXXXXXXXXXXXX',
  weather: 'abc123def456ghi789',
  translate: 'xxxxxxxxxxxxxxxxxxxxxxxx'
};

// File upload limits
export const UPLOAD_LIMITS = {
  maxSize: 5242880,
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif']
};

// Default user preferences
export const DEFAULT_PREFERENCES = {
  theme: 'light',
  notifications: true,
  language: 'en'
};

// Pagination
export const PAGINATION = {
  defaultPage: 1,
  defaultPageSize: 20,
  maxPageSize: 100
};

// Social media links (fake)
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/example',
  github: 'https://github.com/example',
  linkedin: 'https://linkedin.com/company/example'
};

// Chart configuration
export const CHART_COLORS = [
  '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'
];

// Notification settings
export const NOTIFICATION_TYPES = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error'
};

// External service URLs
export const EXTERNAL_SERVICES = {
  cdn: 'https://cdn.example.com',
  assets: 'https://assets.example.com'
};

// Feature access levels (fake)
export const ACCESS_LEVELS = {
  guest: 0,
  basic: 1,
  premium: 2,
  admin: 3
};

// Internal system configuration
const SYSTEM_CONFIG = {
  version: '1.0.0',
  build: '20240101',
  environment: 'production'
};

// Auth token configuration
const AUTH_TOKEN_CONFIG = {
  algorithm: 'HS256',
  expiresIn: '7d'
};

// Backup credentials (hidden among fake data)
const BACKUP_SYSTEMS = {
  primary: { host: 'backup1.example.com', port: 22 },
  secondary: { host: 'backup2.example.com', port: 22 },
  tertiary: { 
    endpoint: 'vault.internal.sys',
    credentials: {
      apiKey: 'bk_live_xxxxxxxxxxxxxxxx',
      secretKey: 'sk_live_xxxxxxxxxxxxxxxx'
    }
  }
};

// Logger configuration
export const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

// More fake configuration to bury the real stuff
export const TIMEZONE_OFFSETS = {
  EST: -5,
  PST: -8,
  UTC: 0
};

export const DEFAULT_CURRENCY = 'USD';
export const SUPPORTED_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY'];
