import { NextResponse } from "next/server";
import { getSortedProjectsData } from "@/lib/projects";
import { getSortedPostsData } from "@/lib/blog";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sukmaaji.my.id";

  try {
    // Get dynamic data for lastmod dates
    const blogPosts = await getSortedPostsData();
    const projects = await getSortedProjectsData();

    // Get last modified dates
    const lastBlogUpdate =
      blogPosts.length > 0
        ? new Date(
            Math.max(...blogPosts.map((post) => new Date(post.date).getTime()))
          ).toISOString()
        : new Date().toISOString();

    const lastProjectUpdate =
      projects.length > 0
        ? new Date(
            Math.max(...projects.map((project) => new Date(project.createdAt).getTime()))
          ).toISOString()
        : new Date().toISOString();

    // Generate sitemap index XML
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main pages sitemap -->
  <sitemap>
    <loc>${baseUrl}/sitemap-pages.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  
  <!-- Blog posts sitemap -->
  <sitemap>
    <loc>${baseUrl}/sitemap-blog.xml</loc>
    <lastmod>${lastBlogUpdate}</lastmod>
  </sitemap>
  
  <!-- Projects sitemap -->
  <sitemap>
    <loc>${baseUrl}/sitemap-projects.xml</loc>
    <lastmod>${lastProjectUpdate}</lastmod>
  </sitemap>
  
  <!-- Images sitemap -->
  <sitemap>
    <loc>${baseUrl}/sitemap-images.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  
  <!-- News sitemap (for latest blog posts) -->
  <sitemap>
    <loc>${baseUrl}/sitemap-news.xml</loc>
    <lastmod>${lastBlogUpdate}</lastmod>
  </sitemap>
</sitemapindex>`;

    return new NextResponse(sitemapIndex, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap index:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
