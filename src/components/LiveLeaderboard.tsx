"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface LeaderboardEntry {
  id: string;
  score: number;
  level_reached: number;
  correct_answers: number;
  total_questions: number;
  time_played: number;
  accuracy_percentage: number;
  game_type: string;
  created_at: string;
  users: {
    id: string;
    name: string;
    avatar_url?: string;
  };
}

interface LiveLeaderboardProps {
  gameType?: string;
  refreshInterval?: number;
}

export default function LiveLeaderboard({
  gameType = "math",
  refreshInterval = 30000, // 30 seconds
}: LiveLeaderboardProps) {
  const { data: session } = useSession();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    fetchLeaderboard();

    // Set up interval for auto-refresh
    const interval = setInterval(() => {
      fetchLeaderboard(false); // Silent refresh
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [gameType, refreshInterval]);

  const fetchLeaderboard = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);

      // Add cache-busting timestamp
      const timestamp = Date.now();
      const response = await fetch(
        `/api/leaderboard/global?limit=8&gameType=${gameType}&_t=${timestamp}`,
        {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data.leaderboard || []);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error("Error fetching live leaderboard:", error);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const getRankBadge = (position: number) => {
    if (position === 1) return "🥇";
    if (position === 2) return "🥈";
    if (position === 3) return "🥉";
    return `#${position}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 h-fit">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 flex items-center gap-2">
          🏆 Live Rankings
        </h3>
        <button
          onClick={() => fetchLeaderboard()}
          className="text-blue-500 hover:text-blue-600 transition-colors text-sm"
          title="Refresh"
        >
          🔄
        </button>
      </div>

      <div className="text-xs text-gray-500 mb-3">Updated: {formatTime(lastUpdated)}</div>

      {leaderboard.length === 0 ? (
        <div className="text-center py-4 sm:py-6 text-gray-500">
          <div className="text-xl sm:text-2xl mb-2">🎮</div>
          <p className="text-xs sm:text-sm">No scores yet!</p>
        </div>
      ) : (
        <div className="space-y-1 sm:space-y-2">
          {leaderboard.map((entry, index) => {
            const isCurrentUser =
              session?.user?.email === entry.users.name ||
              (session?.user as any)?.id === entry.users.id ||
              session?.user?.email === entry.users.name; // Check email match

            return (
              <div
                key={entry.id}
                className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                  isCurrentUser
                    ? "bg-blue-50 border-l-2 border-blue-500"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="text-xs sm:text-sm font-bold text-center w-5 sm:w-6">
                  {getRankBadge(index + 1)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    {entry.users.avatar_url && (
                      <img
                        src={entry.users.avatar_url}
                        alt="Avatar"
                        className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                      />
                    )}
                    <span className="text-xs font-medium text-gray-800 truncate">
                      {entry.users?.name || "Anonymous Player"}
                      {isCurrentUser && <span className="ml-1 text-blue-600">•</span>}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-600">{entry.score.toLocaleString()}</span>
                    <span className="text-gray-500">Lvl {entry.level_reached}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-3 sm:mt-4 pt-3 border-t border-gray-200">
        <a
          href="/games/leaderboard"
          className="block w-full text-center py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-medium transition-colors"
        >
          View Full Board
        </a>
      </div>
    </div>
  );
}
