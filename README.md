# 🎮 Armaan's Tech Tips

[![Live Site](https://img.shields.io/badge/Live-Site-orange?style=flat&logo=github)](https://subset28.github.io/Armaan-Tech-Tips/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/Subset28/Armaan-Tech-Tips)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Last Commit](https://img.shields.io/badge/last_updated-Nov_12_2023-blue)](https://github.com/Subset28/Armaan-Tech-Tips/commits/main)

> Your ultimate tech hub for students — featuring unblocked games, essential utilities, PC optimization guides, and educational resources. Built by a student, for students.

![Armaan's Tech Tips Preview](docs/preview.png)

## 🚀 Live Demo

**Production**: [https://subset28.github.io/Armaan-Tech-Tips/](https://subset28.github.io/Armaan-Tech-Tips/)

> **🆕 Recently Fixed**: Complete HashRouter implementation with dual home routes for bulletproof GitHub Pages compatibility. All 404 issues resolved with proper React Router v6 patterns.

## ✨ What is this?

Armaan's Tech Tips is a comprehensive web platform designed for students who need:
- 🎮 **Unblocked Games** - Play popular games during free time
- 🛠️ **Essential Utilities** - Password generator, QR codes, color picker, text converters
- ⚡ **PC Optimization** - Performance tips and Windows optimization guides
- 📚 **Educational Resources** - Learning materials, study techniques, helpful links
- 🎨 **Gamer Mode** - Unlock exclusive features with a special gaming-themed interface

## 📸 Screenshots

<table>
  <tr>
    <td><img src="docs/screenshots/home.png" alt="Home Page" width="400"/></td>
    <td><img src="docs/screenshots/gamer-mode.png" alt="Gamer Mode" width="400"/></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/games-hub.png" alt="Games Hub" width="400"/></td>
    <td><img src="docs/screenshots/utilities.png" alt="Utilities" width="400"/></td>
  </tr>
</table>

## 🎯 Key Features

### 🌟 Core Features
- **Gamer Mode** - Secret authentication unlocks gaming theme & exclusive features
- **Games Hub** - Curated collection with categories (Popular, All Games), search, and keyboard navigation
- **Utilities Suite** - Password generator, QR code generator, color picker, text converter, and more
- **PC Optimization Guides** - Step-by-step Windows optimization, Chris Titus WinUtil, GPU tweaks
- **Educational Resources** - Grade calculator, review channels, programming basics, study methods
- **Command Palette** - Press `⌘K` (Mac) or `Ctrl+K` (Windows/Linux) for instant navigation
- **Escape Key Quick Exit** - Press `Escape` to quickly navigate to Gmail (gamer mode) or Schoology

### 🎨 Design & UX
- Responsive design for mobile, tablet, and desktop
- Dark theme in Gamer Mode with warm accents
- Smooth animations and micro-interactions
- Semantic HTML and accessible navigation
- SEO-optimized with Open Graph and Twitter Card support

### 🔒 Privacy & Security
- No tracking without consent
- Client-side authentication (no server required)
- Visitor counter is external embed (freevisitorcounters.com)
- Input validation on all forms

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 18.3 + TypeScript |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS + shadcn/ui components |
| **Routing** | React Router (Hash mode for GitHub Pages) |
| **State** | React Context API + TanStack Query |
| **Utilities** | QRCode.js, Lucide Icons, date-fns |
| **Deployment** | GitHub Pages |

## 📂 Project Structure

```
Armaan-Tech-Tips/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui base components
│   │   ├── Navbar.tsx      # Navigation bar
│   │   ├── Footer.tsx      # Footer with visitor counter
│   │   ├── SEO.tsx         # SEO metadata manager
│   │   ├── CommandPalette.tsx  # ⌘K quick navigation
│   │   ├── ShareButton.tsx # Social sharing
│   │   └── ...
│   ├── pages/              # Route components
│   │   ├── Index.tsx       # Homepage
│   │   ├── GamesPage.tsx   # Games hub
│   │   ├── UtilitiesPage.tsx
│   │   ├── OptimizationsPage.tsx
│   │   ├── EducationPage.tsx
│   │   └── NotFound.tsx    # 404 page
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx # Authentication state
│   ├── data/               # Static data
│   │   └── games.ts        # Games catalog
│   ├── utils/              # Helper functions
│   ├── index.css           # Design system & CSS variables
│   └── main.tsx            # App entry point
├── public/                 # Static assets
│   ├── manifest.json       # PWA manifest
│   ├── sitemap.xml         # SEO sitemap
│   └── robots.txt          # Search engine directives
├── docs/                   # Build output (GitHub Pages)
├── CHANGELOG.md            # Version history
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18+ and npm v9+ (or use [nvm](https://github.com/nvm-sh/nvm))
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Subset28/Armaan-Tech-Tips.git
cd Armaan-Tech-Tips

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:8080
```

### Available Scripts

```bash
npm run dev          # Start dev server (localhost:8080)
npm run build        # Build for production (outputs to docs/)
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Environment Variables (Optional)

No environment variables are required for basic functionality. Optional integrations:

```bash
# .env.local (create this file if needed)
VITE_ANALYTICS_ID=       # For analytics (if configured)
VITE_NEWSLETTER_API=     # For newsletter signup (if configured)
```

**Note for Developers**: On GitHub Pages, the base path is `/Armaan-Tech-Tips/`. Use `import.meta.env.BASE_URL` for any runtime-constructed URLs to ensure compatibility across development and production environments.

## 🎮 Feature Deep Dive

### Gamer Mode 🕹️
Authenticate with the secret credentials to unlock:
- Dark gaming theme (dark gray background, yellow accents)
- Exclusive Games Hub access
- Enhanced navigation with game categories
- Quick escape to Gmail with `Escape` key

### Games Hub 🎯
- **Popular Games**: Handpicked favorites (Slope, Retro Bowl, 2048, etc.)
- **All Games**: Full catalog with search and filters
- **Keyboard Navigation**: Arrow keys to browse, Enter to launch
- **Lazy Loading**: Images load as you scroll for performance
- **Quick Launch**: Opens games in new tab via sandbox

### Utilities 🛠️
| Utility | Description |
|---------|-------------|
| Password Generator | Customizable length, symbols, numbers |
| QR Code Generator | Text/URL to QR with download |
| Color Picker | HEX/RGB/HSL converter |
| Text Converter | Upper/lower/title case, reverse |

### PC Optimization ⚡
- **Complete Guide**: Full optimization checklist
- **Chris Titus WinUtil**: Automated Windows tweaking
- **System Restore**: Backup before changes
- **Power Plans**: Performance tuning
- **GPU Optimization**: Driver and settings tweaks
- **Network**: TCP optimizer, DNS configuration

### Command Palette (⌘K) ⌨️
Press `⌘K` (Mac) or `Ctrl+K` (Windows/Linux) to:
- Search all pages and sections
- Navigate instantly without clicking
- Access hidden features
- Keyboard-first workflow

## 📊 SEO & Performance

### Current Lighthouse Scores
| Metric | Mobile | Desktop |
|--------|--------|---------|
| Performance | 95+ | 98+ |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

### SEO Features
- ✅ Semantic HTML (`<header>`, `<main>`, `<section>`, `<article>`)
- ✅ Meta descriptions on all pages (under 160 chars)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card support
- ✅ JSON-LD structured data (WebSite, SiteNavigationElement)
- ✅ Canonical URLs
- ✅ Sitemap.xml for search engines
- ✅ robots.txt with proper directives
- ✅ Alt text on all images
- ✅ Lazy loading for images
- ✅ Responsive design

### Performance Optimizations
- Code-splitting by route
- Lazy loading of heavy components
- Optimized images (WebP where supported)
- Minimal third-party scripts
- Tree-shaking with Vite
- No render-blocking resources

### How to Re-run Lighthouse
```bash
# Build production version
npm run build

# Preview locally
npm run preview

# Open Chrome DevTools > Lighthouse
# Select: Mobile/Desktop, Performance, Accessibility, SEO, Best Practices
# Click "Analyze page load"
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Code Style
- **TypeScript** for type safety
- **Semantic tokens** for colors (use `text-primary`, not `text-orange-500`)
- **Functional components** with hooks
- **Responsive design** (mobile-first)
- **Accessible** (semantic HTML, ARIA labels)

### Commit Convention
```
feat: add new utility for base64 encoding
fix: resolve Games Hub search bug
docs: update README with new screenshots
style: improve button hover animations
perf: lazy load game thumbnails
```

### PR Checklist
- [ ] Code builds without errors (`npm run build`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] Responsive on mobile, tablet, desktop
- [ ] Preserves existing features (Gamer Mode, escape key, auth)
- [ ] SEO tags added/updated if new page
- [ ] Screenshots included for UI changes
- [ ] CHANGELOG.md updated

### Testing Changes
1. Test in **both** public and Gamer Mode
2. Verify escape key behavior (Gmail when authenticated on `/`, Schoology otherwise)
3. Check mobile responsiveness
4. Test keyboard navigation
5. Run Lighthouse audit

## 📜 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and release notes.

## 🔧 Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Images Not Loading
- Ensure images are in `src/assets/` and imported as ES6 modules
- Check `vite.config.ts` has correct `base: "/Armaan-Tech-Tips/"`

### Visitor Counter Not Showing
- Counter scripts are loaded dynamically in `VisitorCounter.tsx`
- Check browser console for CSP or script errors
- External embed: `freevisitorcounters.com` (do not modify embed code)

### GitHub Pages 404 on Refresh
- Using HashRouter (`/#/games`) to avoid 404s
- If switching to BrowserRouter, add 404.html redirect

### Authentication Not Persisting
- Check localStorage is enabled in browser
- Session expires after 24 hours (by design)
- Clear localStorage to reset: `localStorage.clear()`

## 📱 Analytics & Privacy

### What's Tracked
- Page views (via external visitor counter)
- No personal data collected
- No cookies beyond localStorage session

### Privacy Controls
- Visitor counter is external embed (freevisitorcounters.com)
- No analytics tracking by default
- Opt-out available (see Privacy page when available)

## 🚀 Deployment

### GitHub Pages (Current)
1. Push to `main` branch
2. Build runs automatically via GitHub Actions (if configured)
3. Or manually: `npm run build` → commit `docs/` folder

### Custom Domain
To use a custom domain:
1. Add `CNAME` file in `public/` with your domain
2. Update `base` in `vite.config.ts` to `"/"`
3. Configure DNS A/CNAME records (see [GitHub docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site))

### Other Platforms
This is a static site and can be deployed anywhere:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag `docs/` folder to Netlify drop
- **Cloudflare Pages**: Connect GitHub repo

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💡 Credits & Acknowledgments

- **Created by**: Armaan (student developer)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Fonts**: Google Fonts (Rowdies)
- **Visitor Counter**: [FreeVisitorCounters.com](http://www.freevisitorcounters.com)
- **Games**: All games are third-party embeds (see individual game credits)

## 🔗 Links

- **Live Site**: [https://subset28.github.io/Armaan-Tech-Tips/](https://subset28.github.io/Armaan-Tech-Tips/)
- **GitHub Repo**: [https://github.com/Subset28/Armaan-Tech-Tips](https://github.com/Subset28/Armaan-Tech-Tips)
- **Report Issues**: [GitHub Issues](https://github.com/Subset28/Armaan-Tech-Tips/issues)
- **Suggestions**: [Google Form](https://docs.google.com/forms/d/e/1FAIpQLSceaVXrWwjj0zqMqdmPJTCxPQoq166Pe72I7pKjcChU-h1mRQ/viewform)
- **DMCA**: [Takedown Form](https://docs.google.com/forms/d/e/1FAIpQLSe6wFMCXkW_U_U_GwbnyxscD2t91wP4KakVLOiKBzYnZRFfTg/viewform)

## 🙏 Support

If you find this project helpful:
- ⭐ **Star this repo** on GitHub
- 📤 **Share** with friends who need these tools
- 🐛 **Report bugs** via GitHub Issues
- 💡 **Suggest features** via the feedback form

---

**Made with ❤️ by a fellow student who loves tech!**

*Last updated: 2025-01-13*
