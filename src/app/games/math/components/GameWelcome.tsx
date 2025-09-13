import React from "react";

interface GameWelcomeProps {
  onStartGame: () => void;
}

const GameWelcome: React.FC<GameWelcomeProps> = ({ onStartGame }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center bg-white rounded-xl shadow-2xl p-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            🚀 Siap untuk Tantangan Math Game?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Tingkatkan kemampuan matematika Anda dengan permainan yang menantang! Kecepatan dan
            akurasi adalah kunci kesuksesan.
          </p>
        </div>

        {/* Game Rules Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">📋 Aturan Permainan</h3>

          {/* Level System */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="font-semibold text-blue-800 mb-2">📊 Level 1-10</div>
              <div className="text-blue-600 mb-2">Penjumlahan & Pengurangan</div>
              <div className="text-xs text-blue-500">Operasi dasar matematika</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="font-semibold text-green-800 mb-2">⚡ Level 11-30</div>
              <div className="text-green-600 mb-2">Perkalian & Pembagian</div>
              <div className="text-xs text-green-500">Tingkat menengah</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="font-semibold text-purple-800 mb-2">🔥 Level 31+</div>
              <div className="text-purple-600 mb-2">Kombinasi Kompleks</div>
              <div className="text-xs text-purple-500">Mode expert</div>
            </div>
          </div>

          {/* Rules List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h4 className="font-bold text-gray-800 mb-3">🎯 Sistem Scoring</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Setiap jawaban benar = Level × 10 poin</li>
                <li>• Level naik setiap 10 jawaban benar</li>
                <li>• Bonus waktu +100 detik setiap naik level</li>
                <li>• Akurasi mempengaruhi rating final</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border">
              <h4 className="font-bold text-gray-800 mb-3">⏱️ Sistem Waktu</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Waktu awal: 60 detik</li>
                <li>• Bonus +100 detik setiap level up</li>
                <li>• Game berakhir saat waktu habis</li>
                <li>• Kecepatan jawab tidak mempengaruhi skor</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border">
              <h4 className="font-bold text-gray-800 mb-3">🎮 Kontrol Game</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Ketik jawaban menggunakan keyboard</li>
                <li>• Tekan Enter untuk submit jawaban</li>
                <li>• Klik tombol Submit sebagai alternatif</li>
                <li>• Input langsung responsif tanpa delay</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border">
              <h4 className="font-bold text-gray-800 mb-3">🏆 Target Achievement</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Akurasi 90%+ = Rating Luar Biasa</li>
                <li>• Akurasi 75%+ = Rating Bagus Sekali</li>
                <li>• Akurasi 60%+ = Rating Cukup Baik</li>
                <li>• Capai level tertinggi yang bisa Anda raih</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-8">
          <h4 className="font-bold text-yellow-800 mb-2">💡 Tips Sukses</h4>
          <div className="text-sm text-yellow-700 grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>• Fokus pada akurasi daripada kecepatan</div>
            <div>• Gunakan teknik perhitungan mental</div>
            <div>• Manfaatkan bonus waktu dengan bijak</div>
            <div>• Tetap tenang saat level meningkat</div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStartGame}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-xl text-2xl font-bold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          🚀 Mulai Permainan
        </button>
      </div>
    </div>
  );
};

export default GameWelcome;
