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
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: "https://www.animenewsnetwork.com/",
      },
    });

    if (!response.ok) {
      return new Response(`Failed to fetch image: ${response.statusText}`, {
        status: response.status,
      });
    }

    const contentType = response.headers.get("Content-Type") || "image/jpeg";
    const imageBuffer = await response.arrayBuffer();

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error proxying image:", error);
    return new Response("Failed to fetch image", { status: 500 });
  }
};
