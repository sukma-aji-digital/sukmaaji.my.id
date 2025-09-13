import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Kebijakan Privasi</h1>
            <p className="text-lg text-gray-600">
              Terakhir diperbarui:{" "}
              {new Date().toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1. Informasi yang Kami Kumpulkan
              </h2>
              <p className="text-gray-600 mb-4">
                Sukma Aji Digital ("kami", "website ini") mengumpulkan informasi berikut:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  <strong>Informasi Akun:</strong> Nama, email, dan foto profil dari Google OAuth
                </li>
                <li>
                  <strong>Data Game:</strong> Skor, level, akurasi, dan statistik permainan
                </li>
                <li>
                  <strong>Data Teknis:</strong> Alamat IP, browser, perangkat, dan data penggunaan
                </li>
                <li>
                  <strong>Cookies:</strong> Token sesi dan preferensi pengguna
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2. Bagaimana Kami Menggunakan Informasi
              </h2>
              <p className="text-gray-600 mb-4">Informasi yang dikumpulkan digunakan untuk:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Menyediakan dan meningkatkan layanan website dan games</li>
                <li>Menampilkan leaderboard dan statistik game</li>
                <li>Autentikasi dan keamanan akun</li>
                <li>Analisis penggunaan untuk perbaikan layanan</li>
                <li>Komunikasi terkait layanan</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Penyimpanan Data</h2>
              <p className="text-gray-600 mb-4">Data Anda disimpan dengan aman menggunakan:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  <strong>Supabase:</strong> Database terenkripsi untuk data pengguna dan game
                </li>
                <li>
                  <strong>Google OAuth:</strong> Autentikasi aman melalui Google
                </li>
                <li>
                  <strong>Vercel:</strong> Hosting dengan keamanan tingkat enterprise
                </li>
                <li>Enkripsi data in-transit dan at-rest</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Berbagi Informasi</h2>
              <p className="text-gray-600 mb-4">
                Kami TIDAK menjual atau menyewakan data pribadi Anda. Informasi hanya dibagikan
                dalam kondisi berikut:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Dengan persetujuan eksplisit Anda</li>
                <li>Untuk mematuhi hukum yang berlaku</li>
                <li>Dengan penyedia layanan terpercaya (Google, Supabase, Vercel)</li>
                <li>Data leaderboard yang dapat dilihat publik (nama dan skor saja)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Hak Pengguna</h2>
              <p className="text-gray-600 mb-4">Sebagai pengguna, Anda memiliki hak untuk:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Mengakses data pribadi yang kami miliki tentang Anda</li>
                <li>Meminta koreksi data yang tidak akurat</li>
                <li>Meminta penghapusan akun dan data Anda</li>
                <li>Menarik persetujuan kapan saja</li>
                <li>Mengunduh data Anda dalam format yang dapat dibaca</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                6. Cookies dan Teknologi Tracking
              </h2>
              <p className="text-gray-600 mb-4">Website ini menggunakan cookies untuk:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Menjaga sesi login Anda</li>
                <li>Mengingat preferensi Anda</li>
                <li>Analisis penggunaan website (Google Analytics, Vercel Analytics)</li>
                <li>Meningkatkan performa website</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Anda dapat mengontrol cookies melalui pengaturan browser Anda.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Keamanan Data</h2>
              <p className="text-gray-600 mb-4">
                Kami menerapkan langkah-langkah keamanan berikut:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Enkripsi HTTPS untuk semua komunikasi</li>
                <li>Autentikasi OAuth yang aman</li>
                <li>Regular security updates dan monitoring</li>
                <li>Akses terbatas ke data sensitif</li>
                <li>Backup data yang terenkripsi</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Data Anak-anak</h2>
              <p className="text-gray-600">
                Website ini tidak secara sengaja mengumpulkan informasi pribadi dari anak-anak di
                bawah usia 13 tahun. Jika Anda adalah orang tua dan mengetahui bahwa anak Anda telah
                memberikan informasi pribadi kepada kami, silakan hubungi kami untuk penghapusan
                data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Perubahan Kebijakan</h2>
              <p className="text-gray-600">
                Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan
                signifikan akan dinotifikasi melalui email atau pemberitahuan di website. Tanggal
                "Terakhir diperbarui" di bagian atas halaman akan mencerminkan versi terbaru.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Kontak Kami</h2>
              <p className="text-gray-600 mb-4">
                Jika Anda memiliki pertanyaan tentang kebijakan privasi ini atau ingin menggunakan
                hak Anda, silakan hubungi kami:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@sukmaaji.my.id
                </p>
                <p className="text-gray-700">
                  <strong>Website:</strong> https://sukmaaji.my.id
                </p>
                <p className="text-gray-700">
                  <strong>Alamat:</strong> Indonesia
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Yurisdiksi</h2>
              <p className="text-gray-600">
                Kebijakan privasi ini diatur oleh hukum Republik Indonesia. Setiap sengketa yang
                timbul akan diselesaikan melalui pengadilan yang berwenang di Indonesia.
              </p>
            </section>
          </div>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                ← Kembali ke Beranda
              </Link>
              <Link
                href="/terms-of-service"
                className="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Syarat & Ketentuan →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
