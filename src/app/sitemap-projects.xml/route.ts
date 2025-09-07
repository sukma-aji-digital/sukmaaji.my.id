import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sukmaaji.my.id";

  try {
    // Projects data (make this dynamic later)
    const projects = [
      {
        slug: "muria-batik-cms",
        title: "Muria Batik Kudus - Content Management System",
        description:
          "Sistem manajemen konten untuk website Muria Batik Kudus yang memungkinkan pengelolaan produk batik, artikel, dan informasi perusahaan secara dinamis.",
        image: "/images/project/muria.jpg",
        createdAt: "2023-08-15",
        technologies: ["Laravel", "MySQL", "Tailwind CSS", "PHP", "JavaScript", "Bootstrap"],
      },
      {
        slug: "muria-dashboard",
        title: "Muria Dashboard - Admin Panel",
        description:
          "Dashboard admin untuk mengelola website Muria Batik dengan fitur analytics, user management, dan content management.",
        image: "/images/project/dashboardmuria.jpg",
        createdAt: "2023-09-01",
        technologies: ["Laravel", "Vue.js", "MySQL", "Chart.js"],
      },
    ];

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
      <image:loc>${baseUrl}${project.image}</image:loc>
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
