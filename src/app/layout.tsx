import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import PWAInstaller from "@/components/PWAInstaller";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sukma Aji Digital - Solusi untuk Bisnis Anda",
  description:
    "Sukma Aji Digital adalah perusahaan jasa digital yang menyediakan layanan pembuatan website, pengembangan sistem informasi, manajemen jaringan, dan penyewaan server VPS untuk mendukung pertumbuhan bisnis Anda.",
  keywords:
    "Sukma Aji Digital, Muhammad Aji Sukma, jasa digital, pembuatan website, pengembangan sistem informasi, manajemen jaringan, server VPS, web developer, teknologi digital, solusi bisnis",
  authors: [{ name: "Sukma Aji Digital" }],
  metadataBase: new URL("https://sukmaaji.my.id"),
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Sukma Aji Digital",
    locale: "id_ID",
    url: "https://sukmaaji.my.id",
    title: "Sukma Aji Digital - Solusi untuk Bisnis Anda",
    description:
      "Sukma Aji Digital adalah perusahaan jasa digital yang menyediakan layanan pembuatan website, pengembangan sistem informasi, manajemen jaringan, dan penyewaan server VPS untuk mendukung pertumbuhan bisnis Anda.",
    images: ["/images/logo.webp"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sukmaajidigital",
    title: "Sukma Aji Digital - Solusi untuk Bisnis Anda",
    description:
      "Sukma Aji Digital adalah perusahaan jasa digital yang menyediakan layanan pembuatan website, pengembangan sistem informasi, manajemen jaringan, dan penyewaan server VPS untuk mendukung pertumbuhan bisnis Anda.",
    images: ["/images/logo.webp"],
  },
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/images/logo.webp", sizes: "192x192", type: "image/webp" },
      { url: "/images/logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/images/logo.webp", sizes: "192x192", type: "image/webp" },
      { url: "/images/logo.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/images/logo.webp",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Sukma Aji Digital",
    "application-name": "Sukma Aji Digital",
    "msapplication-TileColor": "#6366f1",
    "msapplication-config": "/browserconfig.xml",
  },
};

export const viewport: Viewport = {
  themeColor: "#6366F1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.webp" />
        <link rel="mask-icon" href="/images/logo.webp" color="#6366f1" />
        <meta name="msapplication-TileImage" content="/images/logo.png" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${inter.className} antialiased text-slate-light`}>
        <PWAInstaller />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
