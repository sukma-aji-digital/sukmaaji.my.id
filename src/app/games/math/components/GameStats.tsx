import React from "react";

interface GameStatsProps {
  score: number;
  level: number;
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;
  timeLeft: number;
}

const GameStats: React.FC<GameStatsProps> = ({
  score,
  level,
  correctAnswers,
  totalQuestions,
  accuracy,
  timeLeft,
}) => {
  return (
    <div className="w-full lg:w-80 space-y-6">
      {/* Main Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          📊 Statistik Game
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <span className="text-gray-700 font-medium">Skor:</span>
            <span className="text-2xl font-bold text-blue-600">{score.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
            <span className="text-gray-700 font-medium">Level:</span>
            <span className="text-xl font-bold text-purple-600 flex items-center">
              {level} {level <= 10 ? "➕➖" : level <= 30 ? "✖️➗" : "🔥"}
            </span>
          </div>

          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <span className="text-gray-700 font-medium">Benar:</span>
            <span className="text-lg font-bold text-green-600">{correctAnswers}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
            <span className="text-gray-700 font-medium">Total:</span>
            <span className="text-lg font-bold text-orange-600">{totalQuestions}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
            <span className="text-gray-700 font-medium">Akurasi:</span>
            <span className="text-lg font-bold text-indigo-600">{accuracy}%</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border-2 border-red-200">
            <span className="text-gray-700 font-medium">Waktu:</span>
            <span
              className={`text-2xl font-bold flex items-center gap-1 ${
                timeLeft <= 10
                  ? "text-red-600 animate-pulse"
                  : timeLeft <= 30
                  ? "text-orange-600"
                  : "text-green-600"
              }`}
            >
              ⏰ {timeLeft}s
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
          📈 Progress Level
        </h3>
        <div className="w-full bg-gray-200 rounded-full h-6 mb-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-6 rounded-full transition-all duration-500 flex items-center justify-center"
            style={{ width: `${((correctAnswers % 10) / 10) * 100}%` }}
          >
            {((correctAnswers % 10) / 10) * 100 > 20 && (
              <span className="text-white text-xs font-bold">
                {Math.round(((correctAnswers % 10) / 10) * 100)}%
              </span>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600 text-center">
          <span className="font-semibold text-purple-600">{10 - (correctAnswers % 10)}</span>{" "}
          jawaban benar lagi untuk naik level
        </p>
        <div className="mt-3 text-center">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
              ✅ +10s
            </span>
            <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-full font-semibold">
              ❌ -4s
            </span>
          </div>
        </div>
      </div>

      {/* Level Info */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3">🎯 Info Level {level}</h3>
        <div className="text-sm text-gray-600">
          {level <= 10 ? (
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="font-semibold text-blue-800 mb-1">Tingkat Dasar</div>
              <div className="text-blue-600">Penjumlahan & Pengurangan</div>
              <div className="text-xs text-blue-500 mt-1">Angka: 1 - {level * 15}</div>
            </div>
          ) : level <= 30 ? (
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="font-semibold text-green-800 mb-1">Tingkat Menengah</div>
              <div className="text-green-600">Perkalian & Pembagian</div>
              <div className="text-xs text-green-500 mt-1">Angka: 2 - {level - 5}</div>
            </div>
          ) : (
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
              <div className="font-semibold text-purple-800 mb-1">Tingkat Expert</div>
              <div className="text-purple-600">Semua Operasi</div>
              <div className="text-xs text-purple-500 mt-1">Kombinasi kompleks</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameStats;
