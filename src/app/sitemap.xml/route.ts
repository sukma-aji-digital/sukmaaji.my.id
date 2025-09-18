import { NextResponse } from "next/server";
import { getSortedProjectsData } from "@/lib/projects";
import { getSortedPostsData } from "@/lib/blog";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sukmaaji.my.id";

  try {
    // Get dynamic data
    const blogPosts = await getSortedPostsData();
    const projects = await getSortedProjectsData();

    // Get last modified dates
    const now = new Date().toISOString();
    const lastBlogUpdate =
      blogPosts.length > 0
        ? new Date(
            Math.max(...blogPosts.map((post) => new Date(post.date).getTime()))
          ).toISOString()
        : now;

    const lastProjectUpdate =
      projects.length > 0
        ? new Date(
            Math.max(...projects.map((project) => new Date(project.createdAt).getTime()))
          ).toISOString()
        : now;

    // Define all static pages with their priorities and change frequencies
    const staticPages = [
      { url: "", priority: "1.0", changefreq: "daily", lastmod: now },
      { url: "/me", priority: "0.8", changefreq: "monthly", lastmod: now },
      { url: "/blog", priority: "0.9", changefreq: "daily", lastmod: lastBlogUpdate },
      { url: "/projects", priority: "0.9", changefreq: "weekly", lastmod: lastProjectUpdate },
      { url: "/games", priority: "0.8", changefreq: "weekly", lastmod: now },
      { url: "/games/math", priority: "0.8", changefreq: "weekly", lastmod: now },
      { url: "/games/math/leaderboard", priority: "0.7", changefreq: "daily", lastmod: now },
      { url: "/services", priority: "0.8", changefreq: "weekly", lastmod: now },
      {
        url: "/services/website-development",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: now,
      },
      { url: "/services/system-development", priority: "0.7", changefreq: "monthly", lastmod: now },
      { url: "/services/network-management", priority: "0.7", changefreq: "monthly", lastmod: now },
      { url: "/services/vps-hosting", priority: "0.7", changefreq: "monthly", lastmod: now },
      { url: "/privacy-policy", priority: "0.5", changefreq: "yearly", lastmod: now },
      { url: "/terms-of-service", priority: "0.5", changefreq: "yearly", lastmod: now },
    ];

    // Generate complete sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Static Pages -->
${staticPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}

  <!-- Blog Posts -->
${blogPosts
  .map(
    (post) => `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <news:news>
      <news:publication>
        <news:name>Sukma Aji Digital Blog</news:name>
        <news:language>id</news:language>
      </news:publication>
      <news:publication_date>${
        new Date(post.date).toISOString().split("T")[0]
      }</news:publication_date>
      <news:title><![CDATA[${post.title}]]></news:title>
    </news:news>
    <image:image>
      <image:loc>${baseUrl}${post.image || "/images/newpp2.png"}</image:loc>
      <image:title><![CDATA[${post.title}]]></image:title>
      <image:caption><![CDATA[${post.title}]]></image:caption>
    </image:image>
  </url>`
  )
  .join("\n")}

  <!-- Project Pages -->
${projects
  .map(
    (project) => `  <url>
    <loc>${baseUrl}/projects/${project.slug}</loc>
    <lastmod>${new Date(project.createdAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <image:image>
      <image:loc>${baseUrl}${project.image || "/images/newpp2.png"}</image:loc>
      <image:title><![CDATA[${project.title}]]></image:title>
      <image:caption><![CDATA[${
        project.shortDescription || project.description || project.title || ""
      }]]></image:caption>
    </image:image>
  </url>`
  )
  .join("\n")}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
