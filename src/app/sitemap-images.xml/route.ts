import { NextResponse } from "next/server";
import { getSortedProjectsData } from "@/lib/projects";
import { getSortedPostsData } from "@/lib/blog";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sukmaaji.my.id";

  try {
    // Get dynamic data
    const projects = await getSortedProjectsData();
    const blogPosts = await getSortedPostsData();

    // Build image pages array dynamically
    const imagePages = [
      // Homepage images
      {
        url: `${baseUrl}/`,
        lastmod: new Date().toISOString(),
        images: [
          {
            loc: `${baseUrl}/images/ajipro.jpg`,
            title: "Muhammad Aji Sukma - Backend Developer",
            caption: "Profile picture of Muhammad Aji Sukma, Laravel & Backend Developer specializing in scalable web applications",
          },
          {
            loc: `${baseUrl}/images/logo.png`,
            title: "Sukma Aji Digital Logo",
            caption: "Official logo of Sukma Aji Digital - Professional Backend Development Services",
          },
          {
            loc: `${baseUrl}/images/banner.png`,
            title: "Sukma Aji Digital Banner",
            caption: "Main banner showcasing backend development and Laravel expertise",
          },
        ],
      },
      // About/Me page images
      {
        url: `${baseUrl}/me`,
        lastmod: new Date().toISOString(),
        images: [
          {
            loc: `${baseUrl}/images/ajipro.jpg`,
            title: "Muhammad Aji Sukma - Professional Photo",
            caption: "Professional headshot of Muhammad Aji Sukma, experienced in Laravel, PHP, and backend development",
          },
        ],
      },
    ];

    // Add project images dynamically
    projects.forEach(project => {
      if (project.image) {
        imagePages.push({
          url: `${baseUrl}/projects/${project.slug}`,
          lastmod: new Date(project.createdAt).toISOString(),
          images: [
            {
              loc: project.image.startsWith('http') ? project.image : `${baseUrl}${project.image}`,
              title: `${project.title} - Project Screenshot`,
              caption: `${project.description} | Technologies: ${project.technologies.join(', ')}`,
            },
          ],
        });
      }
    });

    // Add blog post images dynamically
    blogPosts.forEach(post => {
      if (post.image) {
        imagePages.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastmod: new Date(post.date).toISOString(),
          images: [
            {
              loc: post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
              title: `${post.title} - Blog Post Featured Image`,
              caption: `Featured image for blog post: ${post.title}. Tags: ${(post.tags || []).join(', ')}`,
            },
          ],
        });
      }
    });

    // Generate image sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imagePages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
${page.images
  .map(
    (image) => `    <image:image>
      <image:loc>${image.loc}</image:loc>
      <image:title><![CDATA[${image.title}]]></image:title>
      <image:caption><![CDATA[${image.caption}]]></image:caption>
    </image:image>`
  )
  .join("\n")}
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
    console.error("Error generating image sitemap:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
