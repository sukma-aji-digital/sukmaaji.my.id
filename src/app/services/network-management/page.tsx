import Link from "next/link";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Jasa Manajemen Jaringan IT | Sukma Aji Digital",
  description:
    "Layanan manajemen jaringan IT profesional untuk perusahaan. Setup, monitoring, maintenance, dan security jaringan komputer yang handal.",
  keywords:
    "manajemen jaringan, network management, IT support, network security, infrastruktur IT",
};

export default function NetworkManagementPage() {
  const services = [
    {
      icon: "fas fa-network-wired",
      title: "Network Setup & Configuration",
      description: "Perancangan dan konfigurasi jaringan LAN/WAN sesuai kebutuhan bisnis",
    },
    {
      icon: "fas fa-shield-alt",
      title: "Network Security",
      description: "Implementasi firewall, VPN, dan sistem keamanan jaringan berlapis",
    },
    {
      icon: "fas fa-chart-line",
      title: "Network Monitoring",
      description: "Monitoring 24/7 performa jaringan dengan alert system real-time",
    },
    {
      icon: "fas fa-tools",
      title: "Maintenance & Support",
      description: "Pemeliharaan rutin dan technical support untuk kontinuitas jaringan",
    },
    {
      icon: "fas fa-wifi",
      title: "Wireless Network",
      description: "Setup dan optimasi jaringan WiFi enterprise dengan coverage optimal",
    },
    {
      icon: "fas fa-server",
      title: "Server Management",
      description: "Manajemen server, backup system, dan disaster recovery planning",
    },
  ];

  const benefits = [
    {
      icon: "fas fa-clock",
      title: "Uptime 99.9%",
      description: "Jaminan ketersediaan jaringan hampir 100% untuk operasional bisnis",
    },
    {
      icon: "fas fa-tachometer-alt",
      title: "Performa Optimal",
      description: "Optimasi bandwidth dan traffic management untuk performa maksimal",
    },
    {
      icon: "fas fa-lock",
      title: "Keamanan Tinggi",
      description: "Proteksi dari cyber threats dengan sistem keamanan berlapis",
    },
    {
      icon: "fas fa-headset",
      title: "Support 24/7",
      description: "Tim technical support siap membantu kapan saja dibutuhkan",
    },
  ];

  const packages = [
    {
      name: "Network Basic",
      price: "Rp 5.000.000",
      period: "/bulan",
      features: [
        "Network monitoring",
        "Basic firewall setup",
        "Email support",
        "Monthly reporting",
        "Remote troubleshooting",
        "Coverage up to 50 devices",
      ],
    },
    {
      name: "Network Professional",
      price: "Rp 10.000.000",
      period: "/bulan",
      features: [
        "Semua fitur Basic",
        "Advanced security setup",
        "VPN configuration",
        "24/7 monitoring",
        "On-site support",
        "Coverage up to 200 devices",
        "Backup & recovery",
        "Performance optimization",
      ],
      popular: true,
    },
    {
      name: "Network Enterprise",
      price: "Rp 20.000.000+",
      period: "/bulan",
      features: [
        "Semua fitur Professional",
        "Dedicated support team",
        "Custom security policies",
        "Load balancing",
        "Disaster recovery",
        "Unlimited devices",
        "SLA guarantee",
        "Regular security audits",
      ],
    },
  ];

  const process = [
    {
      step: "1",
      title: "Network Assessment",
      description: "Evaluasi infrastruktur jaringan existing dan identifikasi kebutuhan",
    },
    {
      step: "2",
      title: "Design & Planning",
      description: "Perancangan arsitektur jaringan optimal sesuai requirements",
    },
    {
      step: "3",
      title: "Implementation",
      description: "Implementasi solusi dengan minimal downtime untuk bisnis",
    },
    {
      step: "4",
      title: "Monitoring & Support",
      description: "Monitoring berkelanjutan dengan support dan maintenance rutin",
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
            { label: "Manajemen Jaringan IT" },
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
                Manajemen Jaringan IT
              </h1>
              <p className="text-slate-dark text-lg mb-8 max-w-2xl mx-auto">
                Layanan manajemen jaringan IT komprehensif untuk memastikan infrastruktur teknologi
                perusahaan Anda berjalan optimal, aman, dan reliable.
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

        {/* Services */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Layanan Manajemen Jaringan
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div key={index} className="bg-dark-300 p-6 rounded-xl border border-dark-100">
                  <i className={`${service.icon} text-accent text-3xl mb-4`}></i>
                  <h3 className="text-lg font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-slate-dark text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-dark-300">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Mengapa Pilih Layanan Kami?
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

        {/* Process */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Proses Implementation
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {process.map((item, index) => (
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
              Paket Manajemen Jaringan
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
                    <span className="text-slate-dark ml-1">{pkg.period}</span>
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
                Siap Mengoptimalkan Jaringan IT Perusahaan?
              </h2>
              <p className="text-slate-dark mb-8 max-w-2xl mx-auto">
                Konsultasikan kebutuhan jaringan IT perusahaan Anda dengan tim ahli kami. Dapatkan
                solusi yang tepat untuk infrastruktur yang robust dan secure.
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
