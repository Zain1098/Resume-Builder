import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://careercraft.vercel.app");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard"],
      },
      // Explicitly allow ChatGPT Search, OpenAI crawlers
      {
        userAgent: ["OAI-SearchBot", "ChatGPT-User", "GPTBot"],
        allow: "/",
        disallow: ["/api/", "/dashboard"],
      },
      // Explicitly allow Perplexity AI search crawler
      {
        userAgent: ["PerplexityBot"],
        allow: "/",
        disallow: ["/api/", "/dashboard"],
      },
      // Explicitly allow Anthropic Claude crawlers
      {
        userAgent: ["ClaudeBot", "anthropic-ai"],
        allow: "/",
        disallow: ["/api/", "/dashboard"],
      },
      // Explicitly allow Google crawlers and AI Overviews
      {
        userAgent: ["Googlebot", "Google-Extended"],
        allow: "/",
        disallow: ["/api/", "/dashboard"],
      },
      // Explicitly allow Microsoft Bing and Copilot search
      {
        userAgent: ["Bingbot"],
        allow: "/",
        disallow: ["/api/", "/dashboard"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
