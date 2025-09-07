import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sukmaaji.my.id";

  try {
    // Image data for sitemap
    const imagePages = [
      {
        url: `${baseUrl}/`,
        images: [
          {
            loc: `${baseUrl}/images/logo.webp`,
            title: "Logo Sukma Aji Digital",
            caption: "Logo perusahaan Sukma Aji Digital - Backend Developer & Tech Solutions",
          },
          {
            loc: `${baseUrl}/images/banner.png`,
            title: "Banner Sukma Aji Digital",
            caption: "Banner utama website Sukma Aji Digital",
          },
          {
            loc: `${baseUrl}/images/ajipro.jpg`,
            title: "Muhammad Aji Sukma Profile Picture",
            caption: "Foto profil Muhammad Aji Sukma, Founder Sukma Aji Digital",
          },
        ],
      },
      {
        url: `${baseUrl}/me`,
        images: [
          {
            loc: `${baseUrl}/images/ajipro.jpg`,
            title: "Muhammad Aji Sukma",
            caption: "Backend Developer dan Founder Sukma Aji Digital",
          },
        ],
      },
      {
        url: `${baseUrl}/projects/muria-batik-cms`,
        images: [
          {
            loc: `${baseUrl}/images/project/muria.jpg`,
            title: "Muria Batik CMS Project",
            caption: "Screenshot dari website Muria Batik CMS yang dikembangkan dengan Laravel",
          },
        ],
      },
      {
        url: `${baseUrl}/projects/muria-dashboard`,
        images: [
          {
            loc: `${baseUrl}/images/project/dashboardmuria.jpg`,
            title: "Muria Dashboard Admin Panel",
            caption: "Dashboard admin untuk mengelola website Muria Batik",
          },
        ],
      },
    ];

    // Generate image sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imagePages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
${page.images
  .map(
    (image) => `    <image:image>
      <image:loc>${image.loc}</image:loc>
      <image:title>${image.title}</image:title>
      <image:caption>${image.caption}</image:caption>
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
