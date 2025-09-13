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
  [key: string]: number;
}

const GAME_NAMES: { [key: string]: string } = {
  math: "🧮 Math Challenge",
  memory: "🧩 Memory Game",
  word: "📝 Word Puzzle",
};

const GAME_COLORS: { [key: string]: string } = {
  math: "bg-blue-100 text-blue-800 border-blue-200",
  memory: "bg-purple-100 text-purple-800 border-purple-200",
  word: "bg-green-100 text-green-800 border-green-200",
};

export default function GlobalLeaderboardPage() {
  const { data: session } = useSession();
  const [leaderboard, setLeaderboard] = useState<GlobalLeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState("all");
  const [gameStats, setGameStats] = useState<GameStats>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 50;

  useEffect(() => {
    fetchLeaderboard();
  }, [selectedGame, currentPage]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const gameFilter = selectedGame === "all" ? "" : `&gameType=${selectedGame}`;
      const offset = (currentPage - 1) * itemsPerPage;
      const response = await fetch(
        `/api/leaderboard/global?limit=${itemsPerPage}&offset=${offset}${gameFilter}`
      );

      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data.leaderboard || []);
        setGameStats(data.gameStats || {});
        setTotalPages(Math.ceil((data.total || 0) / itemsPerPage));
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
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

  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-100 text-yellow-800 border-yellow-300";
    if (rank === 2) return "bg-gray-100 text-gray-800 border-gray-300";
    if (rank === 3) return "bg-orange-100 text-orange-800 border-orange-300";
    return "bg-blue-100 text-blue-800 border-blue-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header Section */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-green-600 hover:text-green-800 transition-colors"
                aria-label="Home"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </Link>
              <span className="text-gray-400">/</span>
              <Link
                href="/games"
                className="text-green-600 hover:text-green-800 transition-colors font-medium"
              >
                Games
              </Link>
              <span className="text-gray-400">/</span>
              <h1 className="text-3xl font-bold text-gray-800">🏆 Global Leaderboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <AuthButtons />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {Object.values(gameStats)
                  .reduce((a, b) => a + b, 0)
                  .toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 mt-1">Total Games Played</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {gameStats.math?.toLocaleString() || "0"}
              </div>
              <div className="text-sm text-gray-600 mt-1">Math Games</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {gameStats.memory?.toLocaleString() || "0"}
              </div>
              <div className="text-sm text-gray-600 mt-1">Memory Games</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">
                {leaderboard.length > 0 ? leaderboard.length.toLocaleString() : "0"}
              </div>
              <div className="text-sm text-gray-600 mt-1">Active Players</div>
            </div>
          </div>
        </div>

        {/* Filter and Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Filter by Game:</label>
              <select
                value={selectedGame}
                onChange={(e) => {
                  setSelectedGame(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Games</option>
                <option value="math">🧮 Math Challenge</option>
                <option value="memory">🧩 Memory Game</option>
                <option value="word">📝 Word Puzzle</option>
              </select>
            </div>
            <button
              onClick={fetchLeaderboard}
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <span>🔄</span>
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="grid grid-cols-5 md:grid-cols-7 gap-4 text-sm font-medium text-gray-700">
                  <div>Rank</div>
                  <div className="col-span-2">Player</div>
                  <div className="hidden md:block">Game</div>
                  <div>Score</div>
                  <div className="hidden md:block">Level</div>
                  <div className="hidden md:block">Date</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {leaderboard.map((entry, index) => {
                  const rank = (currentPage - 1) * itemsPerPage + index + 1;
                  const isCurrentUser = session?.user?.email === entry.users.name;

                  return (
                    <div
                      key={entry.id}
                      className={`px-6 py-4 hover:bg-gray-50 transition-colors ${
                        isCurrentUser ? "bg-green-50" : ""
                      }`}
                    >
                      <div className="grid grid-cols-5 md:grid-cols-7 gap-4 items-center">
                        {/* Rank */}
                        <div>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold border ${getRankBadgeColor(
                              rank
                            )}`}
                          >
                            {getRankIcon(rank)}
                          </span>
                        </div>

                        {/* Player */}
                        <div className="col-span-2">
                          <div className="flex items-center space-x-3">
                            {entry.users.avatar_url && (
                              <img
                                src={entry.users.avatar_url}
                                alt={entry.users.name}
                                className="w-8 h-8 rounded-full"
                              />
                            )}
                            <div>
                              <div className="font-medium text-gray-800">
                                {entry.users.name}
                                {isCurrentUser && (
                                  <span className="ml-2 text-green-600 text-xs font-bold">
                                    (You)
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-500">
                                {entry.accuracy_percentage}% accuracy
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Game */}
                        <div className="hidden md:block">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                              GAME_COLORS[entry.game_type] ||
                              "bg-gray-100 text-gray-800 border-gray-200"
                            }`}
                          >
                            {GAME_NAMES[entry.game_type] || entry.game_type}
                          </span>
                        </div>

                        {/* Score */}
                        <div>
                          <div className="font-bold text-gray-800">
                            {entry.score.toLocaleString()}
                          </div>
                        </div>

                        {/* Level */}
                        <div className="hidden md:block">
                          <div className="text-sm text-gray-600">Level {entry.level_reached}</div>
                        </div>

                        {/* Date */}
                        <div className="hidden md:block">
                          <div className="text-xs text-gray-500">
                            {formatDate(entry.created_at)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                      {Math.min(currentPage * itemsPerPage, leaderboard.length)} of{" "}
                      {leaderboard.length} results
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-white border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Previous
                      </button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 border rounded text-sm ${
                              currentPage === page
                                ? "bg-green-500 text-white border-green-500"
                                : "bg-white border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-white border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <Link
            href="/games"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
          >
            <span>🎮</span>
            <span>Play Games to Climb the Leaderboard!</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
