import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sukmaaji.my.id";

  try {
    // Generate robots.txt content
    const robotsTxt = `# Robots.txt for ${baseUrl}
# Generated automatically by Sukma Aji Digital Website

# Allow all robots access to all content
User-agent: *
Allow: /

# Specific rules for major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 1

# AI and Content Crawlers
User-agent: GPTBot
Allow: /
Crawl-delay: 2

User-agent: ChatGPT-User
Allow: /
Crawl-delay: 2

User-agent: CCBot
Allow: /
Crawl-delay: 2

User-agent: anthropic-ai
Allow: /
Crawl-delay: 2

User-agent: Claude-Web
Allow: /
Crawl-delay: 2

# Social Media Crawlers
User-agent: facebookexternalhit
Allow: /
Crawl-delay: 1

User-agent: Twitterbot
Allow: /
Crawl-delay: 1

User-agent: LinkedInBot
Allow: /
Crawl-delay: 1

# Disallow access to admin areas and private files
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /out/
Disallow: /.git/
Disallow: /node_modules/
Disallow: /*.json$
Disallow: /*.env$
Disallow: /.*
Disallow: /*.map$
Disallow: /sw.js
Disallow: /workbox-*

# Allow access to public assets
Allow: /images/
Allow: /icons/
Allow: /favicon.ico
Allow: /site.webmanifest
Allow: /google*.html

# Sitemap locations
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap.txt

# Website: ${baseUrl}
# Contact: sukmaajidigital@gmail.com
# Last updated: ${new Date().toISOString().split("T")[0]}`;

    return new NextResponse(robotsTxt, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("Error generating robots.txt:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
