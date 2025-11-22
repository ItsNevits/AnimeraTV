import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // Add cache headers for pages
  const url = new URL(context.request.url);

  // Cache static pages for 5 minutes
  if (url.pathname.startsWith("/anime/") || url.pathname.startsWith("/watch/")) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=300, stale-while-revalidate=600"
    );
  }

  // Cache listing pages for 10 minutes
  if (
    url.pathname === "/" ||
    url.pathname === "/popular" ||
    url.pathname === "/recent" ||
    url.pathname === "/schedule" ||
    url.pathname === "/top-airing"
  ) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=600, stale-while-revalidate=1200"
    );
  }

  return response;
});
