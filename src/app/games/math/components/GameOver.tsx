import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface GameOverProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  level: number;
  accuracy: number;
  onRestartGame: () => void;
  timeTaken?: number;
}

const GameOver: React.FC<GameOverProps> = ({
  score,
  correctAnswers,
  totalQuestions,
  level,
  accuracy,
  onRestartGame,
  timeTaken = 60, // Default time taken
}) => {
  const { data: session, status } = useSession();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    // Auto-save score if user is logged in
    if (session?.user && !saved && !saving) {
      saveGameScore();
    }
  }, [session, saved, saving]);

  const saveGameScore = async () => {
    if (!session?.user || saving || saved) return;

    setSaving(true);
    setSaveError(null);

    try {
      const response = await fetch("/api/game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score,
          level,
          correctAnswers,
          totalQuestions,
          timePlayed: timeTaken,
          gameDuration: timeTaken,
          gameType: "math",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save score");
      }

      const result = await response.json();
      setSaved(true);
      console.log("Score saved successfully:", result);
    } catch (error) {
      console.error("Error saving score:", error);
      setSaveError(error instanceof Error ? error.message : "Failed to save score");
    } finally {
      setSaving(false);
    }
  };

  const getRatingMessage = (accuracy: number) => {
    if (accuracy >= 90)
      return { message: "🏆 Luar Biasa!", color: "text-yellow-600", bg: "bg-yellow-50" };
    if (accuracy >= 75)
      return { message: "🎉 Bagus Sekali!", color: "text-green-600", bg: "bg-green-50" };
    if (accuracy >= 60)
      return { message: "👍 Cukup Baik!", color: "text-blue-600", bg: "bg-blue-50" };
    return { message: "💪 Terus Berlatih!", color: "text-purple-600", bg: "bg-purple-50" };
  };

  const rating = getRatingMessage(accuracy);

  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-200 rounded-full opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-200 rounded-full opacity-20"></div>

        <div className="relative z-10">
          {/* Save Status Notification */}
          {session?.user && (
            <div className="mb-6">
              {saving && (
                <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg">
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <span>Saving your score...</span>
                  </div>
                </div>
              )}

              {saved && !saving && (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg">
                  <div className="flex items-center justify-center gap-2">
                    <span>✅</span>
                    <span>Score saved to leaderboard!</span>
                  </div>
                </div>
              )}

              {saveError && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
                  <div className="flex items-center justify-center gap-2">
                    <span>❌</span>
                    <span>Error saving score: {saveError}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">⏰ Game Selesai!</h2>
            <p className="text-xl text-gray-600">
              Selamat! Anda telah menyelesaikan tantangan matematika
            </p>
            {session?.user && (
              <p className="text-sm text-gray-500 mt-2">
                Playing as: <span className="font-medium">{session.user.name}</span>
              </p>
            )}
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{score.toLocaleString()}</div>
              <div className="text-sm font-medium text-gray-600">Total Skor</div>
              <div className="text-xs text-blue-500 mt-1">🎯 Point earned</div>
            </div>

            <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200 shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">{correctAnswers}</div>
              <div className="text-sm font-medium text-gray-600">Jawaban Benar</div>
              <div className="text-xs text-green-500 mt-1">✅ Correct answers</div>
            </div>

            <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200 shadow-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">{totalQuestions}</div>
              <div className="text-sm font-medium text-gray-600">Total Soal</div>
              <div className="text-xs text-orange-500 mt-1">📊 Questions answered</div>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200 shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">{level}</div>
              <div className="text-sm font-medium text-gray-600">Level Tertinggi</div>
              <div className="text-xs text-purple-500 mt-1">🚀 Highest level</div>
            </div>
          </div>

          {/* Accuracy Rating */}
          <div className={`${rating.bg} border-2 border-gray-200 p-6 rounded-xl mb-8 shadow-lg`}>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              🎯 Tingkat Akurasi: {accuracy}%
            </div>
            <div className={`text-2xl font-bold ${rating.color} mb-4`}>{rating.message}</div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${accuracy}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-600">
              {accuracy >= 90
                ? "Anda adalah seorang jenius matematika!"
                : accuracy >= 75
                ? "Kemampuan matematika yang sangat baik!"
                : accuracy >= 60
                ? "Terus tingkatkan kemampuan Anda!"
                : "Jangan menyerah, latihan membuat sempurna!"}
            </div>
          </div>

          {/* Performance Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg border shadow-sm">
              <div className="font-bold text-gray-800 mb-2">📈 Performa</div>
              <div className="text-sm text-gray-600">
                {totalQuestions > 0 ? (
                  <>
                    <div>Rata-rata per menit: {Math.round(totalQuestions / 1)} soal</div>
                    <div>
                      Efisiensi jawaban: {Math.round((correctAnswers / totalQuestions) * 100)}%
                    </div>
                  </>
                ) : (
                  "Belum ada data"
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border shadow-sm">
              <div className="font-bold text-gray-800 mb-2">🎖️ Pencapaian</div>
              <div className="text-sm text-gray-600">
                <div>Level dicapai: {level}</div>
                <div>Kategori: {level <= 10 ? "Pemula" : level <= 30 ? "Menengah" : "Expert"}</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border shadow-sm">
              <div className="font-bold text-gray-800 mb-2">💡 Saran</div>
              <div className="text-sm text-gray-600">
                {accuracy >= 85
                  ? "Coba tingkatkan kecepatan"
                  : accuracy >= 60
                  ? "Fokus pada akurasi"
                  : "Latih perhitungan dasar"}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onRestartGame}
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-3 rounded-xl text-xl font-bold hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                🔄 Main Lagi
              </button>

              <a
                href="/games/math/leaderboard"
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-xl text-xl font-bold hover:from-purple-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                🏆 Lihat Leaderboard
              </a>
            </div>

            {!session?.user && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
                <p className="text-sm">
                  💡 <strong>Tip:</strong> Sign in to save your scores and compete with other
                  players!
                </p>
              </div>
            )}

            <div className="text-sm text-gray-500">
              💪 Tantang diri Anda untuk mencapai akurasi 90%+
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
