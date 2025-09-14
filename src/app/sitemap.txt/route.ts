import { NextResponse } from "next/server";
import { getSortedProjectsData } from "@/lib/projects";
import { getSortedPostsData } from "@/lib/blog";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sukmaaji.my.id";

  try {
    // Get dynamic data
    const blogPosts = await getSortedPostsData();
    const projects = await getSortedProjectsData();

    // Define all static pages
    const staticPages = [
      '',
      '/me',
      '/blog',
      '/projects',
      '/games',
      '/games/math',
      '/games/math/leaderboard',
      '/services',
      '/services/website-development',
      '/services/system-development',
      '/services/network-management',
      '/services/vps-hosting',
      '/privacy-policy',
      '/terms-of-service',
    ];

    // Generate all URLs
    const allUrls = [
      // Static pages
      ...staticPages.map(page => `${baseUrl}${page}`),
      
      // Blog posts
      ...blogPosts.map(post => `${baseUrl}/blog/${post.slug}`),
      
      // Project pages
      ...projects.map(project => `${baseUrl}/projects/${project.slug}`)
    ];

    // Join all URLs with newlines
    const sitemapTxt = allUrls.join('\n');

    return new NextResponse(sitemapTxt, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap.txt:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}