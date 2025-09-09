import { NextResponse } from "next/server";
import { getSortedProjectsData } from "@/lib/projects";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sukmaaji.my.id";

  try {
    // Get dynamic projects data
    const projects = await getSortedProjectsData();

    // Generate projects sitemap XML with images
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${projects
  .map(
    (project) => `  <url>
    <loc>${baseUrl}/projects/${project.slug}</loc>
    <lastmod>${new Date(project.createdAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${baseUrl}${project.image || "/images/ajipro.jpg"}</image:loc>
      <image:title>${project.title}</image:title>
      <image:caption>${project.description}</image:caption>
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
    console.error("Error generating projects sitemap:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
