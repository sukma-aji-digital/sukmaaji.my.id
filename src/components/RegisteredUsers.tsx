"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface RegisteredUser {
  id: string;
  name: string;
  avatar_url?: string;
  created_at: string;
  stats: {
    totalGames: number;
    bestScore: number;
  };
}

interface RegisteredUsersProps {
  limit?: number;
  showStats?: boolean;
}

const RegisteredUsers: React.FC<RegisteredUsersProps> = ({ limit = 20, showStats = true }) => {
  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Add cache-busting timestamp
        const timestamp = Date.now();
        const response = await fetch(`/api/users/registered?limit=${limit}&_t=${timestamp}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load registered users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [limit]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          👥 Registered Players
        </h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3 animate-pulse">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          👥 Registered Players
        </h3>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          👥 Registered Players
        </h3>
        <p className="text-gray-500 text-sm">No registered players yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        👥 Registered Players
        <span className="ml-2 text-sm font-normal text-gray-500">({users.length})</span>
      </h3>

      <div className="space-y-2 sm:space-y-3 max-h-96 overflow-y-auto">
        {users.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {/* Rank */}
            <div className="flex-shrink-0 w-6 text-center">
              <span
                className={`text-sm font-bold ${
                  index === 0
                    ? "text-yellow-600"
                    : index === 1
                    ? "text-gray-500"
                    : index === 2
                    ? "text-amber-600"
                    : "text-gray-400"
                }`}
              >
                {index + 1}
              </span>
            </div>

            {/* Avatar */}
            <div className="flex-shrink-0">
              {user.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm sm:text-base font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-800 text-sm sm:text-base truncate">
                {user.name}
              </div>
              {showStats && (
                <div className="text-xs sm:text-sm text-gray-500 flex space-x-3">
                  <span>🎮 {user.stats.totalGames} games</span>
                  <span>🏆 {user.stats.bestScore} best</span>
                </div>
              )}
            </div>

            {/* Badges for top performers */}
            {index === 0 && user.stats.bestScore > 0 && (
              <div className="flex-shrink-0">
                <span className="text-yellow-500 text-lg">👑</span>
              </div>
            )}
            {index === 1 && user.stats.bestScore > 0 && (
              <div className="flex-shrink-0">
                <span className="text-gray-400 text-lg">🥈</span>
              </div>
            )}
            {index === 2 && user.stats.bestScore > 0 && (
              <div className="flex-shrink-0">
                <span className="text-amber-600 text-lg">🥉</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {users.length >= limit && (
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">Showing top {limit} players</p>
        </div>
      )}
    </div>
  );
};

export default RegisteredUsers;
