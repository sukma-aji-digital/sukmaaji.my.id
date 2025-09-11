import Link from "next/link";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Jasa Pengembangan Sistem Informasi | Sukma Aji Digital",
  description:
    "Layanan pengembangan sistem informasi custom untuk optimasi bisnis. Solusi software terintegrasi untuk manajemen data dan proses bisnis yang efisien.",
  keywords:
    "sistem informasi, software development, aplikasi bisnis, manajemen data, custom software",
};

export default function SystemDevelopmentPage() {
  const solutions = [
    {
      icon: "fas fa-chart-line",
      title: "Sistem Manajemen Bisnis",
      description:
        "ERP, CRM, HRM dan sistem manajemen terintegrasi untuk operasional bisnis yang efisien",
    },
    {
      icon: "fas fa-shopping-cart",
      title: "E-commerce Platform",
      description:
        "Platform jual beli online dengan fitur lengkap: inventory, payment gateway, shipping",
    },
    {
      icon: "fas fa-graduation-cap",
      title: "Sistem Akademik",
      description:
        "LMS, sistem nilai, absensi digital, dan manajemen akademik untuk institusi pendidikan",
    },
    {
      icon: "fas fa-hospital",
      title: "Sistem Kesehatan",
      description: "Rekam medis elektronik, appointment system, dan manajemen rumah sakit/klinik",
    },
    {
      icon: "fas fa-warehouse",
      title: "Sistem Inventory",
      description: "Manajemen stok, gudang, purchase order, dan supply chain management",
    },
    {
      icon: "fas fa-users",
      title: "Sistem Keanggotaan",
      description: "Member management, loyalty program, dan sistem komunitas online",
    },
  ];

  const benefits = [
    {
      icon: "fas fa-cogs",
      title: "Otomatisasi Proses",
      description: "Mengotomatisasi tugas-tugas repetitif untuk meningkatkan efisiensi operasional",
    },
    {
      icon: "fas fa-chart-bar",
      title: "Real-time Analytics",
      description: "Dashboard dan laporan real-time untuk pengambilan keputusan yang tepat",
    },
    {
      icon: "fas fa-shield-alt",
      title: "Keamanan Data",
      description: "Sistem keamanan berlapis untuk melindungi data sensitif bisnis",
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Multi-platform",
      description: "Akses dari berbagai perangkat: desktop, tablet, dan smartphone",
    },
  ];

  const packages = [
    {
      name: "Sistem Basic",
      price: "Rp 15.000.000",
      period: "mulai dari",
      features: [
        "Analisis kebutuhan sistem",
        "Design database & UI/UX",
        "Development core features",
        "Testing & deployment",
        "User training",
        "3 bulan support",
        "Source code included",
      ],
    },
    {
      name: "Sistem Professional",
      price: "Rp 35.000.000",
      period: "mulai dari",
      features: [
        "Semua fitur Basic",
        "Advanced reporting",
        "API integration",
        "Multi-user roles",
        "Mobile responsive",
        "6 bulan support",
        "Performance optimization",
        "Documentation lengkap",
      ],
      popular: true,
    },
    {
      name: "Sistem Enterprise",
      price: "Rp 75.000.000+",
      period: "mulai dari",
      features: [
        "Semua fitur Professional",
        "Custom workflow engine",
        "Advanced analytics",
        "Third-party integrations",
        "Load balancing",
        "1 tahun support",
        "Dedicated support team",
        "Regular updates",
      ],
    },
  ];

  const methodology = [
    {
      step: "1",
      title: "Requirements Analysis",
      description: "Analisis mendalam kebutuhan bisnis dan spesifikasi sistem",
    },
    {
      step: "2",
      title: "System Design",
      description: "Perancangan arsitektur sistem, database, dan user interface",
    },
    {
      step: "3",
      title: "Development",
      description: "Pengembangan sistem dengan metodologi agile dan best practices",
    },
    {
      step: "4",
      title: "Testing & Deployment",
      description: "Quality assurance, deployment, dan training pengguna",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-dark-400 pt-20">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Layanan Jasa", href: "/services" },
            { label: "Pengembangan Sistem Informasi" },
          ]}
        />

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-dark-300 to-dark-400">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-accent/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <i className="fas fa-laptop-code text-accent text-3xl"></i>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Pengembangan Sistem Informasi
              </h1>
              <p className="text-slate-dark text-lg mb-8 max-w-2xl mx-auto">
                Solusi sistem informasi custom yang dirancang khusus untuk mengoptimalkan proses
                bisnis Anda. Dari konsep hingga implementasi dengan teknologi terdepan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#packages"
                  className="bg-accent text-dark-400 px-8 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
                >
                  Lihat Paket Harga
                </Link>
                <Link
                  href="/#contact"
                  className="border border-accent text-accent px-8 py-3 rounded-lg font-medium hover:bg-accent hover:text-dark-400 transition-colors"
                >
                  Konsultasi Gratis
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Solusi Sistem Informasi
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutions.map((solution, index) => (
                <div key={index} className="bg-dark-300 p-6 rounded-xl border border-dark-100">
                  <i className={`${solution.icon} text-accent text-3xl mb-4`}></i>
                  <h3 className="text-lg font-semibold text-white mb-3">{solution.title}</h3>
                  <p className="text-slate-dark text-sm">{solution.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-dark-300">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Manfaat Sistem Informasi Custom
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-dark-200 p-6 rounded-xl border border-dark-100 text-center"
                >
                  <i className={`${benefit.icon} text-accent text-2xl mb-4`}></i>
                  <h3 className="text-lg font-semibold text-white mb-3">{benefit.title}</h3>
                  <p className="text-slate-dark text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Metodologi Pengembangan
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {methodology.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-accent text-dark-400 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-dark">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="py-16 bg-dark-300">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Paket Pengembangan Sistem
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`bg-dark-200 rounded-xl p-8 border ${
                    pkg.popular ? "border-accent" : "border-dark-100"
                  } relative`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-accent text-dark-400 px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-3xl font-bold text-accent">{pkg.price}</span>
                    <span className="text-slate-dark ml-2 text-sm">{pkg.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-slate-dark text-sm">
                        <i className="fas fa-check text-accent text-xs mr-3"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/#contact"
                    className={`block text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                      pkg.popular
                        ? "bg-accent text-dark-400 hover:bg-accent/90"
                        : "border border-accent text-accent hover:bg-accent hover:text-dark-400"
                    }`}
                  >
                    Pilih Paket
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-r from-accent/20 to-accent/10 rounded-2xl p-8 md:p-12 text-center border border-accent/30">
              <h2 className="text-3xl font-bold text-white mb-4">
                Siap Mengoptimalkan Bisnis dengan Sistem Custom?
              </h2>
              <p className="text-slate-dark mb-8 max-w-2xl mx-auto">
                Konsultasikan kebutuhan sistem informasi bisnis Anda dengan tim ahli kami. Dapatkan
                solusi yang tepat untuk meningkatkan efisiensi operasional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#contact"
                  className="bg-accent text-dark-400 px-8 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
                >
                  Konsultasi Sekarang
                </Link>
                <Link
                  href="/services"
                  className="border border-accent text-accent px-8 py-3 rounded-lg font-medium hover:bg-accent hover:text-dark-400 transition-colors"
                >
                  Lihat Layanan Lain
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
