interface SEOConfig {
  siteTitle: string;
  simpleTitle: string;
  siteDescription: string;
  siteUrl: string;
  defaultImage: string;
  twitterHandle?: string;
  keywords: string[];
  organization: {
    name: string;
    logo: string;
    email: string;
  };
}

const seoConfig: SEOConfig = {
  siteTitle: "Animera TV - Anime Platform",
  simpleTitle: "Animera TV",
  siteDescription:
    "Watch your favorite anime anytime, anywhere with Animera TV. Stream high-quality episodes, discover new series, and join a community of anime enthusiasts.",
  siteUrl: "https://www.animeratv.com",
  defaultImage: "/default-image.png",
  keywords: [
    "animeratv",
    "anime",
    "anime streaming",
    "watch anime online",
    "anime episodes",
    "anime series",
    "anime news",
    "latest anime",
    "popular anime",
    "dubbed anime",
    "subbed anime",
    "anime movies",
    "manga",
    "otaku",
    "anime community",
    "anime releases",
    "seasonal anime",
    "anime genres",
    "action anime",
    "romance anime",
    "comedy anime",
    "shonen",
    "seinen",
    "shoujo",
    "isekai",
    "slice of life",
    "free anime",
    "HD anime",
    "anime platform",
    "anime database",
    "anime recommendations",
  ],
  organization: {
    name: "Animera TV",
    logo: "/favicon.svg",
    email: "bs.alvarado21@gmail.com",
  },
};

export default seoConfig;
