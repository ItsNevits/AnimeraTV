export const prerender = false;

import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get("url");

  if (!targetUrl) {
    return new Response("Missing url parameter", { status: 400 });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Origin: "https://hianime.to",
        Referer: "https://hianime.to/",
      },
    });

    if (!response.ok) {
      return new Response(`Failed to fetch: ${response.statusText}`, {
        status: response.status,
      });
    }

    const data = await response.text();

    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "text/vtt",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response("Failed to fetch subtitle", { status: 500 });
  }
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
