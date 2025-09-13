"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

interface LeaderboardEntry {
  id: string;
  score: number;
  level_reached: number;
  correct_answers: number;
  total_questions: number;
  time_played: number;
  accuracy_percentage: number;
  created_at: string;
  users: {
    id: string;
    name: string;
    avatar_url?: string;
  };
}

interface UserStats {
  rank: number;
  bestScore: number;
  totalGames: number;
  avgAccuracy: number;
}

export default function Leaderboard() {
  const { data: session, status } = useSession();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, [session]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const userId = (session?.user as any)?.id;
      const url = userId ? `/api/game?limit=20&userId=${userId}` : "/api/game?limit=20";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard");
      }

      const data = await response.json();
      setLeaderboard(data.leaderboard || []);

      if (data.userStats) {
        setUserStats(data.userStats);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getRankBadge = (position: number) => {
    if (position === 1) return "🥇";
    if (position === 2) return "🥈";
    if (position === 3) return "🥉";
    return `#${position}`;
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
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
    <div className="p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏆 Leaderboard</h1>
          <p className="text-gray-600">Top players in Math Game Challenge</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Stats (if logged in) */}
          {session?.user && userStats && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  📊 Your Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-gray-700">Global Rank</span>
                    <span className="text-2xl font-bold text-blue-600">#{userStats.rank}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-gray-700">Best Score</span>
                    <span className="text-xl font-bold text-green-600">
                      {userStats.bestScore.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium text-gray-700">Total Games</span>
                    <span className="text-xl font-bold text-purple-600">
                      {userStats.totalGames}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium text-gray-700">Avg. Accuracy</span>
                    <span className="text-xl font-bold text-orange-600">
                      {userStats.avgAccuracy.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Leaderboard */}
          <div className={session?.user && userStats ? "lg:col-span-2" : "lg:col-span-3"}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <h3 className="text-2xl font-bold">Global Leaderboard</h3>
                <p className="opacity-90">Top 20 highest scores</p>
              </div>

              {leaderboard.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <div className="text-6xl mb-4">🎮</div>
                  <p className="text-lg">No games played yet!</p>
                  <p>Be the first to set a high score.</p>
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
                          Time
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
                              <div className="text-xs text-gray-500">
                                {entry.correct_answers}/{entry.total_questions}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatTime(entry.time_played)}
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

        {/* Refresh Button */}
        <div className="text-center mt-6">
          <button
            onClick={fetchLeaderboard}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🔄 Refresh Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}
