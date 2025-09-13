"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import AuthButtons from "@/components/AuthButtons";
import Link from "next/link";

interface GlobalLeaderboardEntry {
  id: string;
  score: number;
  level_reached: number;
  game_type: string;
  accuracy_percentage: number;
  created_at: string;
  users: {
    id: string;
    name: string;
    avatar_url?: string;
  };
}

interface GameStats {
  [gameType: string]: number;
}

const GAME_NAMES: Record<string, string> = {
  math: "Math Challenge",
  memory: "Memory Game",
  word: "Word Puzzle",
};

const GAME_ICONS: Record<string, string> = {
  math: "🧮",
  memory: "🧠",
  word: "📝",
};

export default function GlobalLeaderboardPage() {
  const { data: session, status } = useSession();
  const [leaderboard, setLeaderboard] = useState<GlobalLeaderboardEntry[]>([]);
  const [gameStats, setGameStats] = useState<GameStats>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<string>("all");

  useEffect(() => {
    fetchLeaderboard();
  }, [selectedGame]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const gameFilter = selectedGame === "all" ? "" : `&gameType=${selectedGame}`;
      const response = await fetch(`/api/leaderboard/global?limit=50${gameFilter}`);

      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard");
      }

      const data = await response.json();
      setLeaderboard(data.leaderboard || []);
      setGameStats(data.gameStats || {});
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRankBadge = (position: number) => {
    if (position === 1) return "🥇";
    if (position === 2) return "🥈";
    if (position === 3) return "🥉";
    return `#${position}`;
  };

  const getGameName = (gameType: string) => {
    return GAME_NAMES[gameType] || gameType;
  };

  const getGameIcon = (gameType: string) => {
    return GAME_ICONS[gameType] || "🎮";
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchLeaderboard}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link href="/games" className="text-blue-500 hover:text-blue-600 transition-colors">
                ← Back to Games
              </Link>
              <div className="text-2xl font-bold text-gray-800">🏆 Global Leaderboard</div>
            </div>
            <div className="flex items-center gap-4">
              {session?.user && (
                <div className="text-sm text-gray-600">
                  Welcome, <span className="font-medium">{session.user.name}</span>
                </div>
              )}
              <AuthButtons />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Game Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Game Filter */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Filter Games</h3>
              <select
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Games</option>
                {Object.entries(gameStats).map(([gameType, count]) => (
                  <option key={gameType} value={gameType}>
                    {getGameIcon(gameType)} {getGameName(gameType)} ({count})
                  </option>
                ))}
              </select>
            </div>

            {/* Game Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Game Statistics</h3>
              <div className="space-y-3">
                {Object.entries(gameStats).map(([gameType, count]) => (
                  <div
                    key={gameType}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getGameIcon(gameType)}</span>
                      <span className="text-sm font-medium text-gray-700">
                        {getGameName(gameType)}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">{count}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">
                    {Object.values(gameStats).reduce((sum, count) => sum + count, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Games Played</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/games/math"
                  className="block w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-center text-sm font-medium transition-colors"
                >
                  🧮 Play Math Challenge
                </Link>
                <button
                  onClick={fetchLeaderboard}
                  className="w-full py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  🔄 Refresh Data
                </button>
              </div>
            </div>
          </div>

          {/* Main Content - Leaderboard */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-purple-500 to-blue-600 text-white">
                <h2 className="text-3xl font-bold mb-2">
                  {selectedGame === "all"
                    ? "🌟 All Games"
                    : `${getGameIcon(selectedGame)} ${getGameName(selectedGame)}`}
                </h2>
                <p className="opacity-90">
                  {selectedGame === "all"
                    ? `Showing top ${leaderboard.length} players across all games`
                    : `Top ${leaderboard.length} players in ${getGameName(selectedGame)}`}
                </p>
              </div>

              {leaderboard.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  <div className="text-6xl mb-4">🎮</div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">No scores yet!</h3>
                  <p className="text-gray-500 mb-6">
                    Be the first to set a high score in this category.
                  </p>
                  <Link
                    href="/games"
                    className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                  >
                    🚀 Start Playing
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rank
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Player
                        </th>
                        {selectedGame === "all" && (
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Game
                          </th>
                        )}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Score
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Level
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Accuracy
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {leaderboard.map((entry, index) => {
                        const isCurrentUser =
                          session?.user?.email === entry.users?.name ||
                          (session?.user as any)?.id === entry.users?.id;

                        return (
                          <tr
                            key={entry.id}
                            className={`hover:bg-gray-50 ${
                              isCurrentUser ? "bg-blue-50 border-l-4 border-blue-500" : ""
                            }`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-lg font-bold">{getRankBadge(index + 1)}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {entry.users?.avatar_url && (
                                  <img
                                    src={entry.users.avatar_url}
                                    alt="Avatar"
                                    className="w-8 h-8 rounded-full mr-3 border-2 border-gray-200"
                                  />
                                )}
                                <div>
                                  <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                    {entry.users?.name || "Anonymous"}
                                    {isCurrentUser && (
                                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                        You
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                            {selectedGame === "all" && (
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                  {getGameIcon(entry.game_type)} {getGameName(entry.game_type)}
                                </span>
                              </td>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-lg font-bold text-gray-900">
                                {entry.score.toLocaleString()}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Level {entry.level_reached}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {entry.accuracy_percentage.toFixed(1)}%
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(entry.created_at)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
