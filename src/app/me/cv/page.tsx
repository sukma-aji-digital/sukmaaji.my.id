import { Metadata } from "next";
import Image from "next/image";
import PrintButton from "./PrintButton";

export const metadata: Metadata = {
  title:
    "CV - Muhammad Aji Sukma | Full-Stack Web Developer & Software Engineer",
  description:
    "Curriculum Vitae Muhammad Aji Sukma — Software Engineer dan Full-Stack Web Developer berpengalaman dalam Laravel, React, Next.js, dan infrastruktur server Linux. Spesialisasi pengembangan aplikasi web modern.",
  keywords: [
    "CV Muhammad Aji Sukma",
    "Curriculum Vitae",
    "Full-Stack Developer",
    "Software Engineer",
    "Laravel Developer",
    "React Developer",
    "Next.js Developer",
    "Web Developer Indonesia",
    "Kudus",
  ],
  authors: [{ name: "Muhammad Aji Sukma" }],
  creator: "Muhammad Aji Sukma",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "CV - Muhammad Aji Sukma | Full-Stack Web Developer",
    description:
      "Curriculum Vitae Muhammad Aji Sukma — Software Engineer dan Full-Stack Web Developer berpengalaman dalam Laravel, React, Next.js, dan infrastruktur server Linux.",
    url: "https://sukmaaji.my.id/me/cv",
    siteName: "Sukmaaji Digital",
    locale: "id_ID",
    type: "profile",
    images: [
      {
        url: "https://sukmaaji.my.id/images/4x6.webp",
        width: 800,
        height: 800,
        alt: "Muhammad Aji Sukma - Full-Stack Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "CV - Muhammad Aji Sukma | Full-Stack Web Developer",
    description:
      "Curriculum Vitae Muhammad Aji Sukma — Software Engineer dan Full-Stack Web Developer.",
    images: [
      {
        url: "https://sukmaaji.my.id/images/4x6.webp",
        alt: "Muhammad Aji Sukma",
      },
    ],
  },
  alternates: {
    canonical: "https://sukmaaji.my.id/me/cv",
  },
};

export default function CVPage() {
  return (
    <>
      {/* JSON-LD Structured Data for ATS & SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Muhammad Aji Sukma",
            jobTitle: "Software Engineer & Full-Stack Web Developer",
            description:
              "Software Engineer dan Full-Stack Web Developer dengan spesialisasi ekosistem PHP (Laravel) dan JavaScript/TypeScript (React, Next.js, Vue.js).",
            url: "https://sukmaaji.my.id/me/cv",
            image: "https://sukmaaji.my.id/images/4x6.webp",
            email: "sukmaaji.digital@gmail.com",
            telephone: "+62-857-1188-6139",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Kudus",
              addressRegion: "Jawa Tengah",
              addressCountry: "ID",
            },
            alumniOf: {
              "@type": "EducationalOrganization",
              name: "Universitas Muria Kudus",
            },
            knowsAbout: [
              "Laravel",
              "PHP",
              "React",
              "Next.js",
              "Vue.js",
              "TypeScript",
              "MySQL",
              "Redis",
              "Docker",
              "Nginx",
              "Linux",
              "RESTful API",
              "Git",
            ],
            sameAs: [
              "https://www.linkedin.com/in/sukmaaji/",
              "https://github.com/sukmaajidigital",
              "https://sukmaaji.my.id",
            ],
          }),
        }}
      />

      <div className="cv-page">
        {/* Print Header Watermark */}
        <div className="cv-print-watermark">sukmaaji.my.id/me/cv</div>

        <main className="cv-container" role="main">
          {/* ===== HEADER / PROFILE ===== */}
          <header className="cv-header" id="cv-header">
            <div className="cv-header-photo">
              <Image
                src="/images/4x6.webp"
                alt="Muhammad Aji Sukma - Full-Stack Web Developer"
                width={120}
                height={180}
                className="cv-photo"
                priority
              />
            </div>
            <div className="cv-header-info">
              <h1 className="cv-name">Muhammad Aji Sukma</h1>
              <p className="cv-title">
                Software Engineer &amp; Full-Stack Web Developer
              </p>
              <div className="cv-contact-grid">
                <div className="cv-contact-item">
                  <i className="fas fa-map-marker-alt cv-contact-icon"></i>
                  <span>Kudus, Jawa Tengah</span>
                </div>
                <div className="cv-contact-item">
                  <i className="fas fa-envelope cv-contact-icon"></i>
                  <a href="mailto:sukmaaji.digital@gmail.com">
                    sukmaaji.digital@gmail.com
                  </a>
                </div>
                <div className="cv-contact-item">
                  <i className="fas fa-phone cv-contact-icon"></i>
                  <a href="tel:+6285711886139">+62 851-7974-2322</a>
                </div>
                <div className="cv-contact-item">
                  <i className="fab fa-linkedin cv-contact-icon"></i>
                  <a
                    href="https://www.linkedin.com/in/sukmaaji/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linkedin.com/in/sukmaaji
                  </a>
                </div>
                <div className="cv-contact-item">
                  <i className="fab fa-github cv-contact-icon"></i>
                  <a
                    href="https://github.com/sukmaajidigital"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/sukmaajidigital
                  </a>
                </div>
                <div className="cv-contact-item">
                  <i className="fas fa-globe cv-contact-icon"></i>
                  <a
                    href="https://sukmaaji.my.id"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    sukmaaji.my.id
                  </a>
                </div>
              </div>
            </div>
          </header>

          {/* ===== RINGKASAN PROFESIONAL ===== */}
          <section className="cv-section" id="cv-summary">
            <h2 className="cv-section-title">
              <i className="fas fa-user-tie cv-section-icon"></i>
              Ringkasan Profesional
            </h2>
            <div className="cv-section-content">
              <p className="cv-summary-text">
                Software Engineer dan Full-Stack Web Developer lulusan Sistem
                Informasi dengan spesialisasi pengembangan aplikasi web modern
                berbasis ekosistem PHP Laravel dan JavaScript. Berpengalaman
                dalam merancang arsitektur sistem hulu-ke-hilir, mulai dari
                pemodelan basis data, perancangan RESTful API, integrasi front-end
                dinamis, hingga deployment dan konfigurasi server Linux (Nginx,
                Apache). Memiliki rekam jejak dalam mengembangkan sistem
                enterprise terintegrasi dan aplikasi web berbasis data.
              </p>
            </div>
          </section>

          {/* ===== KEAHLIAN TEKNIS ===== */}
          <section className="cv-section" id="cv-skills">
            <h2 className="cv-section-title">
              <i className="fas fa-cogs cv-section-icon"></i>
              Keahlian Teknis
            </h2>
            <div className="cv-section-content">
              <div className="cv-skills-grid">
                <div className="cv-skill-row">
                  <span className="cv-skill-category">Backend Framework</span>
                  <span className="cv-skill-items">
                    PHP (Laravel Framework),  RESTful API
                  </span>
                </div>
                <div className="cv-skill-row">
                  <span className="cv-skill-category">Frontend Framework</span>
                  <span className="cv-skill-items">
                    JavaScript, Tailwind CSS, Bootstrap
                  </span>
                </div>
                <div className="cv-skill-row">
                  <span className="cv-skill-category">
                    Basis Data &amp; Caching
                  </span>
                  <span className="cv-skill-items">
                    MySQL, MariaDB, Postgresql, Redis
                  </span>
                </div>
                <div className="cv-skill-row">
                  <span className="cv-skill-category">
                    Infrastruktur &amp; DevOps
                  </span>
                  <span className="cv-skill-items">
                    Linux/Ubuntu Server, CloudPanel, cPanel, Nginx, Apache,
                    Docker, SSH, Git/GitHub
                  </span>
                </div>
                <div className="cv-skill-row">
                  <span className="cv-skill-category">
                    Data Integration &amp; Utilities
                  </span>
                  <span className="cv-skill-items">
                    Postman, Shell/Bash Scripting
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ===== PENGALAMAN KERJA & PROYEK ===== */}
          <section className="cv-section" id="cv-experience">
            <h2 className="cv-section-title">
              <i className="fas fa-briefcase cv-section-icon"></i>
              Pengalaman Kerja &amp; Proyek
            </h2>
            <div className="cv-section-content">
              {/* Experience 1 */}
              <article className="cv-experience-item">
                <div className="cv-experience-header">
                  <div>
                    <h3 className="cv-experience-role">
                      Full-Stack Web Developer & IT
                    </h3>
                    <p className="cv-experience-company">Muria Batik Kudus</p>
                  </div>
                  <div className="cv-experience-meta">
                    <span className="cv-experience-date">
                      <i className="far fa-calendar-alt"></i> September 2021 –
                      Sekarang
                    </span>
                    <span className="cv-experience-location">
                      <i className="fas fa-map-marker-alt"></i> Kudus, Jawa
                      Tengah
                    </span>
                  </div>
                </div>
                <ul className="cv-experience-list">
                  <li>
                    Merancang dan mengembangkan aplikasi dashboard enterprise
                    terintegrasi mencakup modul Point of Sale (POS), manajemen
                    inventaris multi-gudang, sistem penagihan (invoicing), dan
                    pembukuan transaksi berbasis Laravel dan MySQL.
                  </li>
                  <li>
                    Melakukan otomatisasi alur sinkronisasi transaksi penjualan dan
                    rekapitulasi stok harian untuk meningkatkan akurasi data
                    serta mempercepat rekonsiliasi laporan keuangan.
                  </li>
                  <li>
                    Mengoptimalkan performa kueri basis data dan
                    mengimplementasikan caching menggunakan Redis guna
                    memastikan respons antarmuka sistem tetap cepat pada
                    transaksi intensif.
                  </li>
                  <li>
                    Menyediakan dukungan teknis dan pemeliharaan berkelanjutan
                    untuk menjaga ketersediaan sistem, menangani insiden, dan
                    mengimplementasikan pembaruan sesuai kebutuhan bisnis.
                  </li>
                </ul>
              </article>

              {/* Experience 2 */}
              <article className="cv-experience-item">
                <div className="cv-experience-header">
                  <div>
                    <h3 className="cv-experience-role">
                      Full-Stack Developer (Proyek Mandiri &amp; Open-Source)
                    </h3>
                    <p className="cv-experience-company">Personal</p>
                  </div>
                  <div className="cv-experience-meta">
                    <span className="cv-experience-date">
                      <i className="far fa-calendar-alt"></i> Desember 2023 –
                      Sekarang
                    </span>
                  </div>
                </div>
                <ul className="cv-experience-list">
                  <li>
                    Mengembangkan dan men-deploy situs web portofolio statis
                    berperforma tinggi menggunakan Next.js dan GitHub Pages
                    dengan implementasi Static Site Generator (SSG), optimasi
                    SEO, serta Open Graph metadata.
                  </li>
                  <li>
                    Mengonfigurasi dan mengelola infrastruktur web server mandiri
                    berbasis Ubuntu Server, Nginx reverse proxy, manajemen SSL
                    Let&apos;s Encrypt, dan CloudPanel.
                  </li>
                </ul>
              </article>

              {/* Experience 3 */}
              <article className="cv-experience-item">
                <div className="cv-experience-header">
                  <div>
                    <h3 className="cv-experience-role">
                      Backend Developer (Program Pengabdian Masyarakat)
                    </h3>
                    <p className="cv-experience-company">KKN Desa Bae</p>
                  </div>
                  <div className="cv-experience-meta">
                    <span className="cv-experience-date">
                      <i className="far fa-calendar-alt"></i> Juli 2025 – Agustus
                      2025
                    </span>
                    <span className="cv-experience-location">
                      <i className="fas fa-map-marker-alt"></i> Kudus, Jawa
                      Tengah
                    </span>
                  </div>
                </div>
                <ul className="cv-experience-list">
                  <li>
                    Mengembangkan platform katalog UMKM web digital{" "}
                    <a
                      href="https://desa-bae.kuduskab.go.id/lapakbae/public"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <em>Lapakbae (https://desa-bae.kuduskab.go.id/lapakbae/public)</em>
                    </a>{" "}
                    untuk digitalisasi produk dan katalog pelaku UMKM lokal.
                  </li>
                  <li>
                    Merancang skema basis data (Entity-Relationship Diagram) untuk
                    mendukung katalog produk, kategori, data UMKM.
                  </li>
                </ul>
              </article>

              {/* Experience 4 */}
              <article className="cv-experience-item">
                <div className="cv-experience-header">
                  <div>
                    <h3 className="cv-experience-role">
                      System Designer &amp; Full-Stack Developer <span style={{ color: "#94a3b8", fontWeight: 400, fontSize: "13px" }}>
                        (Freelance Project)
                      </span>
                    </h3>
                    <p className="cv-experience-company">
                      PT Multi Agen Indonesia Sejahtera{" "}
                      
                    </p>
                  </div>
                  <div className="cv-experience-meta">
                    <span className="cv-experience-date">
                      <i className="far fa-calendar-alt"></i> Agustus 2025 – November 2025
                    </span>
                  </div>
                </div>
                <ul className="cv-experience-list">
                  <li>
                    Merancang arsitektur sistem dan basis data untuk Sistem
                    Informasi Manajemen Sales Haji dan Umroh, mencakup pengelolaan
                    data jamaah, riwayat transaksi, dan administrasi paket.
                  </li>
                  <li>
                    Mengembangkan aplikasi web full-stack dari tahap perancangan
                    (UI/UX wireframe, ERD, sistem arsitektur) hingga deployment
                    dan launching di lingkungan produksi.
                  </li>
                  <li>
                    Mengimplementasikan modul manajemen jamaah, tracking status
                    pendaftaran, dan dashboard analitik penjualan untuk
                    meningkatkan efisiensi manajemen sales.
                  </li>
                </ul>
              </article>
            </div>
          </section>

          {/* ===== PENDIDIKAN ===== */}
          <section className="cv-section" id="cv-education">
            <h2 className="cv-section-title">
              <i className="fas fa-graduation-cap cv-section-icon"></i>
              Pendidikan
            </h2>
            <div className="cv-section-content">
              <article className="cv-education-item">
                <div className="cv-experience-header">
                  <div>
                    <h3 className="cv-experience-role">
                      Sarjana Komputer (S.Kom.) dalam Sistem Informasi
                    </h3>
                    <p className="cv-experience-company">
                      Universitas Muria Kudus
                    </p>
                  </div>
                  <div className="cv-experience-meta">
                    <span className="cv-experience-date">
                      <i className="far fa-calendar-alt"></i> 2022 - Februari
                      2026
                    </span>
                    <span className="cv-education-gpa">
                      <i className="fas fa-star"></i> IPK: 3.69
                    </span>
                  </div>
                </div>
                <ul className="cv-experience-list">
                  <li>
                    Fokus Studi: Rekayasa Perangkat Lunak, Basis Data, dan
                    Arsitektur Sistem Informasi.
                  </li>
                </ul>
              </article>

              <article className="cv-education-item" style={{ marginTop: "20px" }}>
                <div className="cv-experience-header">
                  <div>
                    <h3 className="cv-experience-role">
                      Teknik Komputer dan Jaringan (TKJ)
                    </h3>
                    <p className="cv-experience-company">
                      SMK Negeri 2 Kudus
                    </p>
                  </div>
                  <div className="cv-experience-meta">
                    <span className="cv-experience-date">
                      <i className="far fa-calendar-alt"></i> 2018 – 2021
                    </span>
                  </div>
                </div>
              </article>
            </div>
          </section>
          <footer className="cv-footer">
            <div className="cv-footer-line"></div>
            <p className="cv-footer-text">
              Curriculum Vitae ini dapat diverifikasi secara online di{" "}
              <a
                href="https://sukmaaji.my.id/me/cv"
                target="_blank"
                rel="noopener noreferrer"
              >
                sukmaaji.my.id/me/cv
              </a>
            </p>
            <p className="cv-footer-update">Terakhir diperbarui: September 2026</p>
          </footer>
        </main>

        {/* Back to Profile Link */}
        <div className="cv-back-link-container">
          <a href="/me" className="cv-back-link">
            <i className="fas fa-arrow-left"></i>
            Kembali ke Profil
          </a>
          <PrintButton />
        </div>
      </div>
    </>
  );
}
