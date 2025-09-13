"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import AuthButtons from "@/components/AuthButtons";
import RegisteredUsers from "@/components/RegisteredUsers";
import Link from "next/link";
import FooterGame from "@/components/FooterGame";

interface GameItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  difficulty: "Easy" | "Medium" | "Hard";
  players: number;
}

interface GlobalLeaderboardEntry {
  id: string;
  score: number;
  level_reached: number;
  game_type: string;
  created_at: string;
  users: {
    id: string;
    name: string;
    avatar_url?: string;
  };
}

const GAMES: GameItem[] = [
  {
    id: "math",
    name: "Math Challenge",
    description: "Test your mathematical skills with increasing difficulty levels",
    icon: "🧮",
    path: "/games/math",
    difficulty: "Medium",
    players: 0,
  },
  // Future games can be added here
  {
    id: "memory",
    name: "Memory Game",
    description: "Coming Soon - Test your memory with pattern sequences",
    icon: "🧠",
    path: "#",
    difficulty: "Easy",
    players: 0,
  },
  {
    id: "word",
    name: "Word Puzzle",
    description: "Coming Soon - Solve word puzzles and expand your vocabulary",
    icon: "📝",
    path: "#",
    difficulty: "Hard",
    players: 0,
  },
];

interface UserStats {
  totalGames: number;
  bestScore: number;
  globalRank: number;
  totalTimePlayed: number;
}

export default function GamesPage() {
  const { data: session, status } = useSession();
  const [globalLeaderboard, setGlobalLeaderboard] = useState<GlobalLeaderboardEntry[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<string>("all");

  useEffect(() => {
    fetchGlobalLeaderboard();
    if (session?.user) {
      fetchUserStats();
    }
  }, [selectedGame, session]);

  const fetchUserStats = async () => {
    if (!session?.user) return;

    try {
      const userId = (session.user as any)?.id;
      if (!userId) return;

      const response = await fetch(`/api/game?userId=${userId}&limit=1`);
      if (response.ok) {
        const data = await response.json();
        if (data.userStats) {
          // Fetch additional stats for total time played and total games across all game types
          const allGamesResponse = await fetch(`/api/leaderboard/global?limit=1000`);
          if (allGamesResponse.ok) {
            const allGamesData = await allGamesResponse.json();
            const userGames = allGamesData.leaderboard.filter(
              (entry: any) => entry.users.id === userId
            );

            const totalTimePlayed = userGames.reduce(
              (sum: number, game: any) => sum + (game.time_played || 0),
              0
            );

            setUserStats({
              totalGames: data.userStats.totalGames,
              bestScore: data.userStats.bestScore,
              globalRank: data.userStats.rank,
              totalTimePlayed: Math.floor(totalTimePlayed / 3600), // Convert to hours
            });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  const fetchGlobalLeaderboard = async () => {
    try {
      setLoading(true);
      const gameFilter = selectedGame === "all" ? "" : `&gameType=${selectedGame}`;
      const response = await fetch(`/api/leaderboard/global?limit=10${gameFilter}`);

      if (response.ok) {
        const data = await response.json();
        setGlobalLeaderboard(data.leaderboard || []);
      }
    } catch (error) {
      console.error("Error fetching global leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
              >
                🎮 SukmaAji Games
              </Link>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Games List */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Section */}
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">🎯 Game Center</h1>
              <p className="text-lg text-gray-600 mb-6">
                Challenge yourself with our collection of brain games
              </p>
              {!session?.user && (
                <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg mb-6">
                  <p className="text-sm">
                    💡 <strong>Sign in</strong> to save your progress and compete on the
                    leaderboard!
                  </p>
                </div>
              )}
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GAMES.map((game) => (
                <div
                  key={game.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-200"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{game.icon}</div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                          game.difficulty
                        )}`}
                      >
                        {game.difficulty}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2">{game.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{game.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>👥</span>
                        <span>{game.players} players</span>
                      </div>
                      {session?.user && (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <span>✅</span>
                          <span>Signed In</span>
                        </div>
                      )}
                    </div>

                    {game.path === "#" ? (
                      <button
                        disabled
                        className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-medium cursor-not-allowed"
                      >
                        Coming Soon
                      </button>
                    ) : (
                      <Link
                        href={game.path}
                        className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium text-center transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        🚀 Play Now
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Section */}
            {session?.user && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  📊 Your Gaming Stats
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {userStats?.totalGames || 0}
                    </div>
                    <div className="text-sm text-gray-600">Games Played</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {userStats?.bestScore?.toLocaleString() || 0}
                    </div>
                    <div className="text-sm text-gray-600">Best Score</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {userStats?.globalRank ? `#${userStats.globalRank}` : "-"}
                    </div>
                    <div className="text-sm text-gray-600">Global Rank</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {userStats?.totalTimePlayed || 0}h
                    </div>
                    <div className="text-sm text-gray-600">Time Played</div>
                  </div>
                </div>

                {!userStats && (
                  <div className="text-center text-gray-500 text-sm mt-4">
                    Play some games to see your stats!
                  </div>
                )}
              </div>
            )}

            {/* Registered Users Section - Mobile */}
            <div className="lg:hidden">
              <RegisteredUsers limit={10} showStats={true} />
            </div>
          </div>

          {/* Sidebar - Global Leaderboard and Registered Users */}
          <div className="lg:col-span-1 space-y-6">
            {/* Global Leaderboard */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  🏆 Global Leaderboard
                </h3>
                <button
                  onClick={fetchGlobalLeaderboard}
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                  title="Refresh"
                >
                  🔄
                </button>
              </div>

              {/* Game Filter */}
              <div className="mb-4">
                <select
                  value={selectedGame}
                  onChange={(e) => setSelectedGame(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Games</option>
                  <option value="math">Math Challenge</option>
                </select>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-500">Loading...</p>
                </div>
              ) : globalLeaderboard.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-3xl mb-2">🎮</div>
                  <p className="text-sm">No scores yet!</p>
                  <p className="text-xs">Be the first to play!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {globalLeaderboard.slice(0, 10).map((entry, index) => (
                    <div
                      key={entry.id}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        session?.user?.email === entry.users.name ||
                        (session?.user as any)?.id === entry.users.id
                          ? "bg-blue-50 border-l-4 border-blue-500"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <div className="text-lg font-bold text-center w-8">
                        {getRankBadge(index + 1)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {entry.users.avatar_url && (
                            <img
                              src={entry.users.avatar_url}
                              alt="Avatar"
                              className="w-5 h-5 rounded-full"
                            />
                          )}
                          <span className="text-sm font-medium text-gray-800 truncate">
                            {entry.users.name}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="font-bold text-blue-600">
                            {entry.score.toLocaleString()}
                          </span>
                          <span>Lvl {entry.level_reached}</span>
                        </div>

                        <div className="text-xs text-gray-400 mt-1">
                          {formatDate(entry.created_at)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {globalLeaderboard.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link
                    href="/games/leaderboard"
                    className="block w-full text-center py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    View Full Leaderboard
                  </Link>
                </div>
              )}
            </div>

            {/* Registered Users - Desktop only */}
            <div className="hidden lg:block">
              <RegisteredUsers limit={15} showStats={true} />
            </div>
          </div>
        </div>
      </div>
      <FooterGame />
    </div>
  );
}
