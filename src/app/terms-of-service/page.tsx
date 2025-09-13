import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Syarat dan Ketentuan</h1>
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
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Penerimaan Syarat</h2>
              <p className="text-gray-600 mb-4">
                Dengan mengakses dan menggunakan website Sukma Aji Digital ("Website", "Layanan"),
                Anda menyetujui untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak setuju
                dengan syarat ini, mohon untuk tidak menggunakan layanan kami.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Deskripsi Layanan</h2>
              <p className="text-gray-600 mb-4">Sukma Aji Digital menyediakan:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Layanan pengembangan website dan sistem informasi</li>
                <li>Manajemen jaringan dan infrastruktur IT</li>
                <li>Penyewaan server VPS</li>
                <li>Games online dan platform gaming</li>
                <li>Konsultasi teknologi digital</li>
                <li>Portfolio dan showcase project</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Akun Pengguna</h2>
              <h3 className="text-xl font-medium text-gray-700 mb-3">3.1 Pendaftaran Akun</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Akun dibuat melalui Google OAuth dengan informasi yang akurat</li>
                <li>Anda bertanggung jawab atas keamanan akun Anda</li>
                <li>Satu person hanya diperbolehkan memiliki satu akun</li>
                <li>Penggunaan akun palsu atau informasi yang salah dilarang</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-700 mb-3">
                3.2 Tanggung Jawab Pengguna
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Menjaga kerahasiaan informasi login</li>
                <li>Melaporkan aktivitas mencurigakan pada akun</li>
                <li>Tidak berbagi akun dengan orang lain</li>
                <li>Memperbarui informasi akun secara berkala</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Aturan Penggunaan</h2>
              <h3 className="text-xl font-medium text-gray-700 mb-3">
                4.1 Penggunaan yang Diizinkan
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Menggunakan layanan sesuai dengan tujuan yang dimaksudkan</li>
                <li>Bermain games dengan sportif dan fair play</li>
                <li>Mengakses informasi dan portfolio untuk keperluan bisnis</li>
                <li>Berinteraksi dengan respek terhadap pengguna lain</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-700 mb-3">
                4.2 Penggunaan yang Dilarang
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Menggunakan bot, cheat, atau tool otomatis dalam games</li>
                <li>Mengunggah konten yang melanggar hukum atau tidak pantas</li>
                <li>Melakukan spamming atau aktivitas yang mengganggu</li>
                <li>Mencoba mengakses sistem tanpa izin (hacking)</li>
                <li>Menyalahgunakan kerentanan keamanan</li>
                <li>Melakukan reverse engineering pada layanan</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                5. Gaming dan Leaderboard
              </h2>
              <h3 className="text-xl font-medium text-gray-700 mb-3">5.1 Aturan Permainan</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Bermain dengan jujur tanpa menggunakan tools eksternal</li>
                <li>Skor yang mencurigakan akan diperiksa dan dapat dihapus</li>
                <li>Multiple account untuk manipulasi skor dilarang</li>
                <li>Leaderboard dapat direset secara berkala</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-700 mb-3">5.2 Data Game</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Skor dan statistik game disimpan secara permanen</li>
                <li>Data leaderboard dapat dilihat oleh publik</li>
                <li>Kami berhak memverifikasi skor yang tidak wajar</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Layanan Profesional</h2>
              <h3 className="text-xl font-medium text-gray-700 mb-3">
                6.1 Konsultasi dan Pengembangan
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Layanan disediakan berdasarkan kesepakatan tertulis</li>
                <li>Timeline dan deliverables akan ditentukan per project</li>
                <li>Pembayaran sesuai dengan invoice yang disepakati</li>
                <li>Revisi terbatas sesuai kontrak yang ditandatangani</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-700 mb-3">6.2 VPS dan Hosting</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Uptime guarantee sesuai dengan paket yang dipilih</li>
                <li>Fair usage policy berlaku untuk semua layanan</li>
                <li>Backup data menjadi tanggung jawab klien</li>
                <li>Konten ilegal tidak diperbolehkan</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                7. Hak Kekayaan Intelektual
              </h2>
              <h3 className="text-xl font-medium text-gray-700 mb-3">7.1 Konten Website</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Semua konten website adalah milik Sukma Aji Digital</li>
                <li>Logo, desain, dan kode source dilindungi hak cipta</li>
                <li>Penggunaan konten memerlukan izin tertulis</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-700 mb-3">7.2 Konten Pengguna</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Pengguna bertanggung jawab atas konten yang diunggah</li>
                <li>Kami berhak menghapus konten yang melanggar</li>
                <li>Dengan mengunggah, Anda memberikan lisensi penggunaan kepada kami</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Privasi dan Data</h2>
              <p className="text-gray-600 mb-4">
                Penggunaan data pribadi Anda diatur dalam{" "}
                <Link
                  href="/privacy-policy"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Kebijakan Privasi
                </Link>
                yang terpisah. Dengan menggunakan layanan ini, Anda juga menyetujui kebijakan
                privasi tersebut.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                9. Pembatasan Tanggung Jawab
              </h2>
              <h3 className="text-xl font-medium text-gray-700 mb-3">9.1 Ketersediaan Layanan</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Layanan disediakan "sebagaimana adanya"</li>
                <li>Kami tidak menjamin ketersediaan 100% tanpa gangguan</li>
                <li>Maintenance dan downtime akan diinformasikan sebelumnya</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-700 mb-3">9.2 Batasan Ganti Rugi</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Tanggung jawab terbatas pada nilai layanan yang dibayarkan</li>
                <li>Tidak bertanggung jawab atas kerugian tidak langsung</li>
                <li>Force majeure dikecualikan dari tanggung jawab</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                10. Penangguhan dan Penghentian
              </h2>
              <h3 className="text-xl font-medium text-gray-700 mb-3">10.1 Penangguhan Akun</h3>
              <p className="text-gray-600 mb-4">
                Kami berhak menangguhkan atau menghentikan akun jika:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Melanggar syarat dan ketentuan</li>
                <li>Menggunakan layanan untuk aktivitas ilegal</li>
                <li>Mengganggu operasional sistem atau pengguna lain</li>
                <li>Tidak membayar tagihan yang jatuh tempo</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-700 mb-3">
                10.2 Penghentian oleh Pengguna
              </h3>
              <p className="text-gray-600">
                Pengguna dapat menghentikan penggunaan layanan kapan saja dengan menghubungi kami
                untuk penghapusan akun dan data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Perubahan Syarat</h2>
              <p className="text-gray-600 mb-4">
                Kami berhak mengubah syarat dan ketentuan ini kapan saja. Perubahan akan:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Dinotifikasi melalui email atau pengumuman di website</li>
                <li>Berlaku 30 hari setelah pemberitahuan</li>
                <li>Penggunaan berlanjut dianggap sebagai persetujuan</li>
                <li>Tanggal "Terakhir diperbarui" akan diubah</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Hukum yang Berlaku</h2>
              <p className="text-gray-600 mb-4">
                Syarat dan ketentuan ini diatur oleh hukum Republik Indonesia. Setiap sengketa akan
                diselesaikan melalui:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Musyawarah dan mediasi sebagai langkah pertama</li>
                <li>Arbitrase jika mediasi tidak berhasil</li>
                <li>Pengadilan yang berwenang di Indonesia sebagai upaya terakhir</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Kontak dan Bantuan</h2>
              <p className="text-gray-600 mb-4">
                Untuk pertanyaan, keluhan, atau bantuan terkait syarat dan ketentuan ini, silakan
                hubungi kami:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> support@sukmaaji.my.id
                </p>
                <p className="text-gray-700">
                  <strong>Email Legal:</strong> legal@sukmaaji.my.id
                </p>
                <p className="text-gray-700">
                  <strong>Website:</strong> https://sukmaaji.my.id
                </p>
                <p className="text-gray-700">
                  <strong>Alamat:</strong> Indonesia
                </p>
                <p className="text-gray-700">
                  <strong>Jam Operasional:</strong> Senin - Jumat, 09:00 - 17:00 WIB
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">14. Ketentuan Tambahan</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Jika ada ketentuan yang tidak berlaku, ketentuan lain tetap berlaku</li>
                <li>Tidak ada pengesampingan hak kecuali tertulis dan ditandatangani</li>
                <li>Syarat ini merupakan kesepakatan lengkap antara kedua belah pihak</li>
                <li>Versi bahasa Indonesia yang berlaku jika ada perbedaan terjemahan</li>
              </ul>
            </section>
          </div>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link
                href="/privacy-policy"
                className="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                ← Kebijakan Privasi
              </Link>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Kembali ke Beranda →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
