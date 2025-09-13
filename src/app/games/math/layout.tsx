import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Math Challenge - Brain Training Game | Sukmaaji Digital",
  description:
    "Latih kemampuan matematika Anda dengan Math Challenge! Game edukatif dengan level yang meningkat, leaderboard global, dan kompetisi real-time. Cocok untuk semua usia.",
  keywords: [
    "math challenge",
    "math game",
    "educational math",
    "brain training",
    "arithmetic game",
    "math practice",
    "mental calculation",
    "math competition",
    "leaderboard",
    "math skills",
    "number game",
    "sukmaaji digital",
    "muhammad aji sukma",
    "game matematika",
    "latihan matematika",
    "hitung cepat",
    "asah otak matematika",
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
    title: "Math Challenge - Brain Training Game",
    description:
      "Latih kemampuan matematika Anda dengan Math Challenge! Game edukatif dengan level yang meningkat dan leaderboard global.",
    url: "https://sukmaaji.my.id/games/math",
    siteName: "Sukmaaji Digital",
    type: "website",
    images: [
      {
        url: "https://sukmaaji.my.id/images/math-challenge-og.png",
        width: 1200,
        height: 630,
        alt: "Math Challenge - Educational Math Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Math Challenge - Brain Training Game",
    description:
      "Latih kemampuan matematika Anda dengan Math Challenge! Game edukatif dengan level yang meningkat.",
    creator: "@sukmaaji",
    images: ["https://sukmaaji.my.id/images/math-challenge-og.png"],
  },
  category: "games",
  other: {
    "game-type": "educational",
    difficulty: "adaptive",
    "target-age": "8+",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#3B82F6",
};

export default function MathGamesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
