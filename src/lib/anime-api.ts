import { ANIME } from "@consumet/extensions";
import { cache } from "./cache";

const zoro = new ANIME.Zoro();

// Cache TTL in seconds
const CACHE_TTL = {
  ANIME_INFO: 600, // 10 minutes
  EPISODE_SOURCES: 1800, // 30 minutes
  TRENDING: 600, // 10 minutes
  POPULAR: 600, // 10 minutes
  RECENT: 300, // 5 minutes
  TOP_AIRING: 600, // 10 minutes
};

export async function fetchAnimeInfo(id: string): Promise<any> {
  const cacheKey = `anime:info:${id}`;

  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  // Fetch from API
  const data = await zoro.fetchAnimeInfo(id);

  // Store in cache
  cache.set(cacheKey, data, CACHE_TTL.ANIME_INFO);

  return data;
}

export async function fetchEpisodeSources(
  episodeId: string,
  server?: any
): Promise<any> {
  const cacheKey = `anime:sources:${episodeId}:${server || "default"}`;

  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  // Fetch from API
  const data = await zoro.fetchEpisodeSources(episodeId, server);

  // Store in cache
  cache.set(cacheKey, data, CACHE_TTL.EPISODE_SOURCES);

  return data;
}

export async function fetchMostPopular(page: number = 1): Promise<any> {
  const cacheKey = `anime:popular:${page}`;

  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const data = await zoro.fetchMostPopular(page);

  cache.set(cacheKey, data, CACHE_TTL.POPULAR);

  return data;
}

export async function fetchRecentEpisodes(page: number = 1): Promise<any> {
  const cacheKey = `anime:recent:${page}`;

  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const data = await zoro.fetchRecentlyUpdated(page);

  cache.set(cacheKey, data, CACHE_TTL.RECENT);

  return data;
}

export async function fetchTopAiring(page: number = 1): Promise<any> {
  const cacheKey = `anime:top-airing:${page}`;

  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const data = await zoro.fetchTopAiring(page);

  cache.set(cacheKey, data, CACHE_TTL.TOP_AIRING);

  return data;
}

export function getAnimeProvider(provider: string = "zoro"): any {
  if (provider === "zoro") {
    return zoro;
  }
  // Add more providers here if needed
  return zoro;
}
