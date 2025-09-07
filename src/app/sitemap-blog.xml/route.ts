import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sukmaajidigital.github.io";

  try {
    // Blog posts data (make this dynamic later)
    const blogPosts = [
      {
        slug: "hello-world",
        title: "Hello World - Selamat Datang di Blog Sukma Aji Digital",
        date: "2025-01-01",
        author: "Muhammad Aji Sukma",
        tags: ["introduction", "blog", "welcome"],
        image: "/images/blog/hello-world.jpg",
      },
      {
        slug: "laravel-umkm-tutorial",
        title: "Tutorial Laravel untuk UMKM - Membangun Aplikasi Web Sederhana",
        date: "2025-01-15",
        author: "Muhammad Aji Sukma",
        tags: ["laravel", "tutorial", "umkm"],
        image: "/images/blog/laravel-tutorial.jpg",
      },
    ];

    // Generate blog/news sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
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
      <news:title>${post.title}</news:title>
    </news:news>
    <image:image>
      <image:loc>${baseUrl}${post.image}</image:loc>
      <image:title>${post.title}</image:title>
      <image:caption>${post.title}</image:caption>
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
    console.error("Error generating blog sitemap:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
