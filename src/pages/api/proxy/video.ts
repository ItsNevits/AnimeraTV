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

    const contentType = response.headers.get("Content-Type") || "";

    // If it's an M3U8 playlist, we need to modify the URLs
    if (
      contentType.includes("mpegurl") ||
      contentType.includes("m3u8") ||
      targetUrl.endsWith(".m3u8")
    ) {
      let content = await response.text();

      // Get base URL for relative paths
      const baseUrl = targetUrl.substring(0, targetUrl.lastIndexOf("/") + 1);

      // Replace relative URLs with absolute URLs through our proxy
      content = content
        .split("\n")
        .map((line) => {
          if (line.startsWith("#") || line.trim() === "") {
            return line;
          }

          // Handle relative URLs
          let absoluteUrl = line;
          if (!line.startsWith("http")) {
            absoluteUrl = baseUrl + line;
          }

          // Proxy the URL
          return `/api/proxy/video?url=${encodeURIComponent(absoluteUrl)}`;
        })
        .join("\n");

      return new Response(content, {
        status: 200,
        headers: {
          "Content-Type": "application/vnd.apple.mpegurl",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Range",
          "Access-Control-Expose-Headers": "Content-Length, Content-Range",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    // For video segments, stream the response
    return new Response(response.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Range",
        "Access-Control-Expose-Headers": "Content-Length, Content-Range",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response("Failed to fetch video", { status: 500 });
  }
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Range",
      "Access-Control-Expose-Headers": "Content-Length, Content-Range",
    },
  });
};
