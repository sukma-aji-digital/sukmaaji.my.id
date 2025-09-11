import Link from "next/link";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Jasa Pengembangan Sistem Informasi | Sukma Aji Digital",
  description:
    "Layanan pengembangan sistem informasi custom untuk perusahaan. Solusi terintegrasi untuk meningkatkan efisiensi operasional bisnis Anda.",
  keywords:
    "sistem informasi, software development, aplikasi bisnis, sistem manajemen, custom software",
};

export default function SystemDevelopmentPage() {
  const solutions = [
    {
      title: "Sistem Manajemen Inventory",
      description: "Kelola stok barang, tracking, dan laporan inventory real-time",
      features: ["Real-time tracking", "Multi-warehouse", "Barcode integration", "Auto reorder"],
    },
    {
      title: "Sistem HR & Payroll",
      description: "Manajemen karyawan, absensi, dan penggajian terintegrasi",
      features: [
        "Employee management",
        "Attendance tracking",
        "Payroll automation",
        "Performance review",
      ],
    },
    {
      title: "Sistem CRM",
      description: "Customer relationship management untuk meningkatkan penjualan",
      features: ["Lead management", "Sales pipeline", "Customer data", "Analytics dashboard"],
    },
    {
      title: "Sistem Keuangan",
      description: "Pembukuan, laporan keuangan, dan cash flow management",
      features: [
        "Accounting automation",
        "Financial reports",
        "Budget planning",
        "Tax calculation",
      ],
    },
  ];

  const packages = [
    {
      name: "Starter System",
      price: "Rp 15.000.000",
      duration: "2-3 bulan",
      features: [
        "Basic CRUD Operations",
        "User Authentication",
        "Simple Dashboard",
        "Basic Reporting",
        "Desktop/Web Access",
        "3 Bulan Support",
      ],
    },
    {
      name: "Professional System",
      price: "Rp 35.000.000",
      duration: "3-4 bulan",
      features: [
        "Advanced Features",
        "Role-based Access",
        "Custom Dashboard",
        "Advanced Analytics",
        "API Integration",
        "Mobile App",
        "6 Bulan Support",
        "Training Sessions",
      ],
      popular: true,
    },
    {
      name: "Enterprise System",
      price: "Rp 75.000.000+",
      duration: "4-6 bulan",
      features: [
        "Full Customization",
        "Multi-tenant Architecture",
        "Advanced Security",
        "Real-time Sync",
        "Third-party Integration",
        "Scalable Infrastructure",
        "1 Tahun Support",
        "On-site Training",
      ],
    },
  ];

  const technologies = [
    { name: "Laravel", icon: "fas fa-code" },
    { name: "Vue.js", icon: "fas fa-vuejs" },
    { name: "MySQL", icon: "fas fa-database" },
    { name: "PostgreSQL", icon: "fas fa-database" },
    { name: "Docker", icon: "fas fa-docker" },
    { name: "AWS", icon: "fas fa-cloud" },
  ];

  const benefits = [
    {
      icon: "fas fa-chart-line",
      title: "Efisiensi Operasional",
      description: "Otomatisasi proses bisnis untuk meningkatkan produktivitas hingga 60%",
    },
    {
      icon: "fas fa-shield-alt",
      title: "Keamanan Data",
      description: "Perlindungan data dengan enkripsi dan backup otomatis",
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Multi-platform",
      description: "Akses dari desktop, web, dan mobile untuk fleksibilitas maksimal",
    },
    {
      icon: "fas fa-sync-alt",
      title: "Real-time Updates",
      description: "Data tersinkronisasi real-time di semua perangkat",
    },
  ];

  return (
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
              <i className="fas fa-network-wired text-accent text-3xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pengembangan Sistem Informasi
            </h1>
            <p className="text-slate-dark text-lg mb-8 max-w-2xl mx-auto">
              Transformasi digital bisnis Anda dengan sistem informasi custom yang dirancang khusus
              untuk meningkatkan efisiensi, produktivitas, dan pertumbuhan perusahaan.
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

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Manfaat Sistem Informasi Custom
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-dark-300 p-6 rounded-xl border border-dark-100 text-center"
              >
                <i className={`${benefit.icon} text-accent text-3xl mb-4`}></i>
                <h3 className="text-lg font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-slate-dark text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 bg-dark-300">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Solusi Sistem Informasi
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-dark-200 p-6 rounded-xl border border-dark-100">
                <h3 className="text-xl font-semibold text-white mb-3">{solution.title}</h3>
                <p className="text-slate-dark mb-4">{solution.description}</p>
                <div className="space-y-2">
                  <p className="text-white font-medium text-sm mb-2">Fitur Utama:</p>
                  {solution.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-slate-dark text-sm">
                      <i className="fas fa-check text-accent text-xs mr-2"></i>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Teknologi yang Kami Gunakan
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-dark-300 p-4 rounded-lg text-center border border-dark-100"
              >
                <i className={`${tech.icon} text-accent text-2xl mb-2`}></i>
                <p className="text-white font-medium">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-dark-300">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Metodologi Pengembangan
          </h2>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { title: "Analisis", desc: "Requirement gathering & business analysis" },
              { title: "Design", desc: "System architecture & UI/UX design" },
              { title: "Development", desc: "Agile development dengan sprint review" },
              { title: "Testing", desc: "Quality assurance & user acceptance testing" },
              { title: "Deployment", desc: "Go-live & training pengguna" },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-accent text-dark-400 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-slate-dark text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Paket Pengembangan Sistem
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`bg-dark-300 rounded-xl p-8 border ${
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
                <p className="text-3xl font-bold text-accent mb-2">{pkg.price}</p>
                <p className="text-slate-dark mb-6">Timeline: {pkg.duration}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-slate-dark">
                      <i className="fas fa-check text-accent text-sm mr-3"></i>
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
      <section className="py-16 bg-dark-300">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-accent/20 to-accent/10 rounded-2xl p-8 md:p-12 text-center border border-accent/30">
            <h2 className="text-3xl font-bold text-white mb-4">
              Transformasi Digital Dimulai Dari Sini
            </h2>
            <p className="text-slate-dark mb-8 max-w-2xl mx-auto">
              Konsultasikan kebutuhan sistem informasi perusahaan Anda. Dapatkan solusi yang tepat
              untuk meningkatkan efisiensi bisnis.
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
  );
}
