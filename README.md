# 🎬 Animera TV

An open-source anime information aggregator built with Astro, featuring server-side rendering, dynamic content, and modern web technologies. Created as an educational project.

## ✨ Features

- 📺 **Anime Information** - Browse anime details, episodes, and metadata
- 📰 **News Integration** - Latest anime news from Anime News Network
- 🔍 **Advanced Search** - Find anime by title, genre, and more
- 📅 **Schedule** - Keep track of airing times with timezone conversion
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop
- ⚡ **Fast Performance** - Server-side rendering with caching
- 🎨 **Modern UI** - Dark theme with Tailwind CSS
- 🔒 **Privacy-Focused** - No ads, no tracking, no monetization

## 🏗️ Project Structure

```text
/
├── public/
│   ├── robots.txt              # SEO configuration
│   ├── site.webmanifest        # PWA manifest
│   └── favicon.*               # Icons and favicons
├── src/
│   ├── actions/                # Server actions
│   │   └── contact/            # Contact form handler
│   ├── components/             # Reusable components
│   │   ├── AnimeCard.astro
│   │   ├── EpisodeCard.astro
│   │   ├── EpisodeGrid.astro
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── config/                 # Configuration files
│   │   └── seo.ts              # SEO defaults
│   ├── layouts/
│   │   └── MainLayout.astro    # Main page layout
│   ├── lib/                    # Utilities
│   │   ├── anime-api.ts        # API wrapper with caching
│   │   ├── cache.ts            # Memory cache system
│   │   ├── email.ts            # Resend integration
│   │   └── timezone.ts         # JST conversion
│   ├── pages/                  # Routes
│   │   ├── index.astro         # Homepage
│   │   ├── anime/[id].astro    # Anime details
│   │   ├── watch/[id]/episode/[number].astro  # Video player
│   │   ├── news/[...id].astro  # News article
│   │   ├── api/proxy/          # CORS proxy endpoints
│   │   └── ...                 # Other pages
│   ├── styles/
│   │   └── global.css          # Global styles
│   └── middleware.ts           # Request middleware
└── astro.config.mjs            # Astro configuration
```

## 🚀 Tech Stack

- **Framework:** [Astro](https://astro.build) v5.15.8 (SSR)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) v4.1.17
- **Email:** [Resend](https://resend.com)
- **Analytics:** [Vercel Analytics](https://vercel.com/analytics)
- **Deployment:** [Vercel](https://vercel.com)

## 🛠️ Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/ItsNevits/anime-web.git
   cd anime-web
   ```

2. **Install dependencies:**

   ```sh
   pnpm install
   ```

3. **Set up environment variables:**

   ```sh
   cp .env.example .env
   ```

   Edit `.env` and configure:

   - `RESEND_API_KEY` - For contact form functionality
   - `ENABLE_VIDEO_PLAYER` - Set to `true` to enable video player (disabled by default for legal compliance)

4. **Start development server:**
   ```sh
   pnpm dev
   ```

## 🧞 Commands

All commands are run from the root of the project:

| Command        | Action                                 |
| :------------- | :------------------------------------- |
| `pnpm install` | Install dependencies                   |
| `pnpm dev`     | Start dev server at `localhost:4321`   |
| `pnpm build`   | Build production site to `./dist/`     |
| `pnpm preview` | Preview build locally before deploying |

## 📦 Key Features Implementation

### **Caching System**

The app uses an in-memory cache (`src/lib/cache.ts`) to reduce API calls:

- **TTL:** 5 minutes for anime data
- **Automatic cleanup:** Expired entries are removed automatically

### **CORS Proxy**

Three proxy endpoints handle cross-origin requests:

- `/api/proxy/image` - Images from external sources
- `/api/proxy/video` - M3U8 playlists with URL rewriting
- `/api/proxy/stream` - Video segments

### **Timezone Conversion**

Automatically converts JST (Japan Standard Time) to user's local timezone for anime schedules.

### **Video Player**

Optional video player that can be enabled/disabled via environment variable:

- Set `ENABLE_VIDEO_PLAYER=true` to enable
- Default is `false` for legal compliance
- When disabled, the site serves as an anime information database

## 🔧 Configuration

### SEO (`src/config/seo.ts`)

Update site metadata, social links, and default SEO values.

## 📝 Environment Variables

```env
# Contact form (optional)
RESEND_API_KEY=your_resend_api_key_here

# Video player control (recommended: false)
ENABLE_VIDEO_PLAYER=false
```

## 🚢 Deployment

The project is configured for Vercel deployment with:

- ✅ Server-side rendering enabled
- ✅ Automatic sitemap generation
- ✅ Analytics integration
- ✅ Edge functions for API routes

Push to the `main` branch to trigger automatic deployment.

## 📄 License

MIT License - This is an open-source educational project.

## ⚖️ Legal Notice

This project is designed as an **anime information database and aggregator** for educational purposes. The video player is disabled by default to ensure legal compliance. This application does not host any copyrighted content on its servers.

**Important:**

- By default, video streaming is **disabled** (`ENABLE_VIDEO_PLAYER=false`)
- The application displays anime metadata, schedules, and information only
- Enabling the video player is at your own risk and responsibility
- Users must ensure they have proper rights and licenses for any content they access

## 🙏 Acknowledgments

- [Anime News Network](https://www.animenewsnetwork.com) - News source
- [Astro](https://astro.build) - Amazing framework

---

**Note:** This is an unofficial anime aggregator that embeds third-party content. We do not host any anime content on our servers.

---

<div align="center">
  <strong>✨ Made with ❤️ and 🌿🚬💨 by Nevits</strong>
</div>
