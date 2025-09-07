import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sukma Aji Digital - Solusi Digital untuk Bisnis Anda",
  description:
    "Sukma Aji Digital adalah perusahaan jasa digital yang menyediakan layanan pembuatan website, pengembangan sistem informasi, manajemen jaringan, dan penyewaan server VPS untuk mendukung pertumbuhan bisnis Anda.",
  keywords:
    "Sukma Aji Digital, Muhammad Aji Sukma, jasa digital, pembuatan website, pengembangan sistem informasi, manajemen jaringan, server VPS, web developer, teknologi digital, solusi bisnis",
  authors: [{ name: "Sukma Aji Digital" }],
  metadataBase: new URL("https://sukmaaji.my.id"),
  openGraph: {
    type: "website",
    siteName: "Sukma Aji Digital",
    locale: "id_ID",
    url: "https://sukmaaji.my.id",
    title: "Sukma Aji Digital - Solusi Digital untuk Bisnis Anda",
    description:
      "Sukma Aji Digital adalah perusahaan jasa digital yang menyediakan layanan pembuatan website, pengembangan sistem informasi, manajemen jaringan, dan penyewaan server VPS untuk mendukung pertumbuhan bisnis Anda.",
    images: ["/images/logo.webp"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sukmaajidigital",
    title: "Sukma Aji Digital - Solusi Digital untuk Bisnis Anda",
    description:
      "Sukma Aji Digital adalah perusahaan jasa digital yang menyediakan layanan pembuatan website, pengembangan sistem informasi, manajemen jaringan, dan penyewaan server VPS untuk mendukung pertumbuhan bisnis Anda.",
    images: ["/images/logo.webp"],
  },
  robots: "index, follow",
  icons: {
    icon: "/images/logo.webp",
    apple: "/images/logo.webp",
    shortcut: "/images/logo.webp",
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
      </head>
      <body className={`${inter.className} antialiased text-slate-light`}>{children}</body>
    </html>
  );
}
