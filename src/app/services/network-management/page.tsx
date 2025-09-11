import Link from "next/link";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Jasa Manajemen Jaringan Perusahaan | Sukma Aji Digital",
  description:
    "Layanan manajemen jaringan perusahaan profesional. Setup, monitoring, maintenance, dan optimasi jaringan untuk performa maksimal dan keamanan terjamin.",
  keywords:
    "manajemen jaringan, network administration, IT infrastructure, network security, server management",
};

export default function NetworkManagementPage() {
  const services = [
    {
      title: "Network Design & Setup",
      description: "Perancangan dan instalasi infrastruktur jaringan yang optimal",
      features: [
        "Network topology design",
        "Hardware installation",
        "Cable management",
        "Performance optimization",
      ],
    },
    {
      title: "Network Security",
      description: "Implementasi keamanan jaringan untuk melindungi data perusahaan",
      features: ["Firewall configuration", "VPN setup", "Access control", "Security monitoring"],
    },
    {
      title: "Network Monitoring",
      description: "Monitoring real-time performa dan status jaringan 24/7",
      features: [
        "Real-time monitoring",
        "Performance analytics",
        "Alert system",
        "Troubleshooting",
      ],
    },
    {
      title: "Maintenance & Support",
      description: "Pemeliharaan rutin dan support teknis untuk jaringan perusahaan",
      features: [
        "Regular maintenance",
        "24/7 technical support",
        "Performance tuning",
        "Documentation",
      ],
    },
  ];

  const packages = [
    {
      name: "Basic Network",
      price: "Rp 5.000.000",
      duration: "Setup + 3 bulan support",
      features: [
        "Small Office Setup (10-20 devices)",
        "Basic Switch & Router Config",
        "Wireless Network Setup",
        "Basic Security Config",
        "Documentation",
        "3 Bulan Remote Support",
      ],
    },
    {
      name: "Professional Network",
      price: "Rp 15.000.000",
      duration: "Setup + 6 bulan support",
      features: [
        "Medium Office Setup (20-50 devices)",
        "Managed Switch & Router",
        "Enterprise WiFi",
        "Advanced Firewall",
        "VPN Setup",
        "Network Monitoring",
        "6 Bulan On-site Support",
        "Monthly Health Check",
      ],
      popular: true,
    },
    {
      name: "Enterprise Network",
      price: "Rp 35.000.000+",
      duration: "Custom setup + 1 tahun support",
      features: [
        "Large Office Setup (50+ devices)",
        "Redundant Infrastructure",
        "Advanced Security Suite",
        "Load Balancing",
        "Network Segmentation",
        "24/7 Monitoring & Support",
        "Disaster Recovery Plan",
        "Quarterly Review & Optimization",
      ],
    },
  ];

  const technologies = [
    { name: "Cisco", icon: "fas fa-network-wired" },
    { name: "Mikrotik", icon: "fas fa-router" },
    { name: "Ubiquiti", icon: "fas fa-wifi" },
    { name: "pfSense", icon: "fas fa-shield-alt" },
    { name: "PRTG", icon: "fas fa-chart-line" },
    { name: "Zabbix", icon: "fas fa-eye" },
  ];

  const benefits = [
    {
      icon: "fas fa-tachometer-alt",
      title: "Performa Optimal",
      description: "Network yang stabil dengan uptime hingga 99.9% untuk produktivitas maksimal",
    },
    {
      icon: "fas fa-lock",
      title: "Keamanan Tinggi",
      description: "Perlindungan berlapis dari ancaman cyber dan akses tidak sah",
    },
    {
      icon: "fas fa-expand-arrows-alt",
      title: "Scalable",
      description: "Infrastruktur yang dapat berkembang seiring pertumbuhan bisnis",
    },
    {
      icon: "fas fa-headset",
      title: "24/7 Support",
      description: "Tim technical support siap membantu kapan saja dibutuhkan",
    },
  ];

  const process = [
    {
      step: "1",
      title: "Network Assessment",
      description: "Evaluasi infrastruktur existing dan kebutuhan bisnis",
    },
    {
      step: "2",
      title: "Design & Planning",
      description: "Perancangan arsitektur jaringan yang optimal",
    },
    {
      step: "3",
      title: "Implementation",
      description: "Instalasi dan konfigurasi perangkat jaringan",
    },
    {
      step: "4",
      title: "Testing & Optimization",
      description: "Testing performa dan optimasi konfigurasi",
    },
    {
      step: "5",
      title: "Monitoring & Support",
      description: "Monitoring berkelanjutan dan support maintenance",
    },
  ];

  return (
    <div className="min-h-screen bg-dark-400 pt-20">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Layanan Jasa", href: "/services" },
          { label: "Manajemen Jaringan Perusahaan" },
        ]}
      />
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-dark-300 to-dark-400">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-accent/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <i className="fas fa-server text-accent text-3xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Manajemen Jaringan Perusahaan
            </h1>
            <p className="text-slate-dark text-lg mb-8 max-w-2xl mx-auto">
              Solusi lengkap manajemen jaringan untuk perusahaan. Dari perancangan, instalasi,
              hingga maintenance jaringan yang stabil, aman, dan berperforma tinggi.
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
            Mengapa Pilih Layanan Network Management Kami?
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

      {/* Services */}
      <section className="py-16 bg-dark-300">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Layanan Network Management
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-dark-200 p-6 rounded-xl border border-dark-100">
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-slate-dark mb-4">{service.description}</p>
                <div className="space-y-2">
                  <p className="text-white font-medium text-sm mb-2">Yang Termasuk:</p>
                  {service.features.map((feature, idx) => (
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
          <h2 className="text-3xl font-bold text-white text-center mb-12">Technology Partners</h2>
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
          <h2 className="text-3xl font-bold text-white text-center mb-12">Proses Implementation</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-accent text-dark-400 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-slate-dark text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Paket Network Management
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
                <p className="text-slate-dark mb-6">{pkg.duration}</p>
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
              Upgrade Infrastruktur Jaringan Perusahaan Anda
            </h2>
            <p className="text-slate-dark mb-8 max-w-2xl mx-auto">
              Konsultasikan kebutuhan jaringan perusahaan Anda dengan tim ahli kami. Dapatkan solusi
              network yang reliable, secure, dan scalable.
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
