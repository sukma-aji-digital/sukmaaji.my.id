import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Games Portal - Educational Games & Brain Training | Sukmaaji Digital",
  description:
    "Bermain game edukatif yang menyenangkan dan menantang! Latih kemampuan matematika, memori, dan logika dengan leaderboard global. Main sekarang dan kompetisi dengan pemain lain!",
  keywords: [
    "games portal",
    "educational games",
    "brain training",
    "math games",
    "memory games",
    "logic games",
    "online games",
    "leaderboard",
    "competition",
    "learning games",
    "sukmaaji digital",
    "muhammad aji sukma",
    "game edukasi",
    "permainan online",
    "asah otak",
  ],
  authors: [{ name: "Muhammad Aji Sukma" }],
  creator: "Muhammad Aji Sukma",
  publisher: "Sukmaaji Digital",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Games Portal - Educational Games & Brain Training",
    description:
      "Bermain game edukatif yang menyenangkan! Latih kemampuan matematika, memori, dan logika dengan leaderboard global.",
    url: "https://sukmaaji.my.id/games",
    siteName: "Sukmaaji Digital",
    type: "website",
    images: [
      {
        url: "https://sukmaaji.my.id/images/game.png",
        width: 1200,
        height: 630,
        alt: "Sukmaaji Digital Games Portal - Educational Games",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Games Portal - Educational Games & Brain Training",
    description:
      "Bermain game edukatif yang menyenangkan! Latih kemampuan matematika, memori, dan logika.",
    creator: "@sukmaaji",
    images: ["https://sukmaaji.my.id/images/game.png"],
  },
  category: "games",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#3B82F6",
};

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
