import { NextResponse } from "next/server";
import { getSortedPostsData } from "@/lib/blog";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sukmaaji.my.id";

  try {
    const posts = await getSortedPostsData();

    // Only include posts from the last 2 days for Google News
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const recentPosts = posts.filter((post) => {
      const postDate = new Date(post.date);
      return postDate >= twoDaysAgo;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${recentPosts
  .map(
    (post) => `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Sukma Aji Digital</news:name>
        <news:language>id</news:language>
      </news:publication>
      <news:publication_date>${new Date(post.date).toISOString()}</news:publication_date>
      <news:title><![CDATA[${post.title}]]></news:title>
      <news:keywords><![CDATA[${
        post.tags ? post.tags.join(", ") : "technology, programming, web development"
      }]]></news:keywords>
    </news:news>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=1800, stale-while-revalidate=3600", // Shorter cache for news
      },
    });
  } catch (error) {
    console.error("Error generating news sitemap:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
