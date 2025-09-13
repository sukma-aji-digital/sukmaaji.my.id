import { Metadata } from "next";
import Leaderboard from "@/components/Leaderboard";

export const metadata: Metadata = {
  title: "Math Game Leaderboard - Sukmaaji Digital",
  description:
    "Lihat ranking top players di Math Game dan bandingkan skor Anda dengan pemain lain di Sukmaaji Digital.",
  keywords: [
    "Math Game Leaderboard",
    "Top Scores",
    "Math Competition",
    "Sukmaaji Digital",
    "Educational Games",
    "Math Rankings",
    "High Scores",
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Math Game Leaderboard - Sukmaaji Digital",
    description:
      "Lihat ranking top players di Math Game dan bandingkan skor Anda dengan pemain lain di Sukmaaji Digital.",
    url: "https://sukmaaji.my.id/games/math/leaderboard",
    siteName: "Sukmaaji Digital",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://sukmaaji.my.id/images/ajipro.jpg",
        width: 800,
        height: 800,
        alt: "Math Game Leaderboard - Sukmaaji Digital",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Math Game Leaderboard - Sukmaaji Digital",
    description:
      "Lihat ranking top players di Math Game dan bandingkan skor Anda dengan pemain lain di Sukmaaji Digital.",
    images: [
      {
        url: "https://sukmaaji.my.id/images/ajipro.jpg",
        alt: "Math Game Leaderboard - Sukmaaji Digital",
      },
    ],
    creator: "@sukmaajidigital",
  },
  alternates: {
    canonical: "https://sukmaaji.my.id/games/math/leaderboard",
  },
};

export default function LeaderboardPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Math Game Leaderboard",
            description:
              "Lihat ranking top players di Math Game dan bandingkan skor Anda dengan pemain lain",
            url: "https://sukmaaji.my.id/games/math/leaderboard",
            isPartOf: {
              "@type": "WebSite",
              name: "Sukmaaji Digital",
              url: "https://sukmaaji.my.id",
            },
            about: {
              "@type": "Game",
              name: "Math Game",
              description: "Educational math game with competitive leaderboard",
              gamePlatform: "Web Browser",
              genre: "Educational",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://sukmaaji.my.id",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Games",
                  item: "https://sukmaaji.my.id/games",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Math Game",
                  item: "https://sukmaaji.my.id/games/math",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Leaderboard",
                  item: "https://sukmaaji.my.id/games/math/leaderboard",
                },
              ],
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Navigation Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <a
                  href="/"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  🏠 Home
                </a>
                <span className="text-gray-400">/</span>
                <a
                  href="/games"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  🎮 Games
                </a>
                <span className="text-gray-400">/</span>
                <a
                  href="/games/math"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  🧮 Math Game
                </a>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600 font-medium">🏆 Leaderboard</span>
              </div>

              <a
                href="/games/math"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                🎮 Play Game
              </a>
            </div>
          </div>
        </div>

        <Leaderboard />
      </div>
    </>
  );
}
