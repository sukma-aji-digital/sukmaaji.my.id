import Link from "next/link";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Jasa Penyewaan Server VPS | Sukma Aji Digital",
  description:
    "Layanan penyewaan server VPS berkualitas tinggi dengan uptime 99.9%. Solusi hosting yang reliable untuk website dan aplikasi bisnis Anda.",
  keywords: "VPS hosting, server VPS, cloud hosting, dedicated server, web hosting Indonesia",
};

export default function VPSHostingPage() {
  const features = [
    {
      icon: "fas fa-hdd",
      title: "SSD Storage",
      description: "Penyimpanan SSD untuk performa loading yang super cepat",
    },
    {
      icon: "fas fa-shield-alt",
      title: "Daily Backup",
      description: "Backup otomatis setiap hari untuk keamanan data Anda",
    },
    {
      icon: "fas fa-headset",
      title: "24/7 Support",
      description: "Tim technical support siap membantu kapan saja",
    },
    {
      icon: "fas fa-chart-line",
      title: "Real-time Monitoring",
      description: "Monitoring server real-time untuk performa optimal",
    },
  ];

  const packages = [
    {
      name: "VPS Starter",
      price: "Rp 200.000",
      period: "/bulan",
      specs: {
        cpu: "1 vCPU",
        ram: "1 GB RAM",
        storage: "25 GB SSD",
        bandwidth: "1 TB Transfer",
        ip: "1 Dedicated IP",
      },
      features: [
        "Full Root Access",
        "24/7 Monitoring",
        "Daily Backup",
        "99.9% Uptime",
        "Email Support",
      ],
    },
    {
      name: "VPS Professional",
      price: "Rp 350.000",
      period: "/bulan",
      specs: {
        cpu: "2 vCPU",
        ram: "4 GB RAM",
        storage: "50 GB SSD",
        bandwidth: "2 TB Transfer",
        ip: "1 Dedicated IP",
      },
      features: [
        "Full Root Access",
        "24/7 Monitoring",
        "Daily Backup",
        "99.9% Uptime",
        "Priority Support",
        "Control Panel",
      ],
      popular: true,
    },
    {
      name: "VPS Enterprise",
      price: "Rp 600.000",
      period: "/bulan",
      specs: {
        cpu: "4 vCPU",
        ram: "8 GB RAM",
        storage: "100 GB SSD",
        bandwidth: "5 TB Transfer",
        ip: "2 Dedicated IP",
      },
      features: [
        "Full Root Access",
        "24/7 Monitoring",
        "Daily Backup",
        "99.9% Uptime",
        "Priority Support",
        "Advanced Control Panel",
        "Load Balancer",
        "DDoS Protection",
      ],
    },
  ];

  const useCases = [
    {
      icon: "fas fa-globe",
      title: "Website & Blog",
      description: "Hosting website dengan traffic tinggi dan performa optimal",
    },
    {
      icon: "fas fa-shopping-cart",
      title: "E-commerce",
      description: "Platform online shop dengan keamanan dan kecepatan tinggi",
    },
    {
      icon: "fas fa-code",
      title: "Development & Testing",
      description: "Environment development yang isolated dan fleksibel",
    },
    {
      icon: "fas fa-database",
      title: "Database Server",
      description: "Server database dengan performa dan backup yang handal",
    },
  ];

  const process = [
    {
      step: "1",
      title: "Pilih Paket",
      description: "Pilih paket VPS yang sesuai dengan kebutuhan Anda",
    },
    {
      step: "2",
      title: "Setup & Configuration",
      description: "Tim kami akan setup server sesuai spesifikasi yang dipilih",
    },
    {
      step: "3",
      title: "Deployment",
      description: "Server siap digunakan dalam waktu maksimal 24 jam",
    },
    {
      step: "4",
      title: "Support & Maintenance",
      description: "Dukungan teknis berkelanjutan untuk kelancaran operasional",
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
            { label: "Penyewaan Server VPS" },
          ]}
        />

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-dark-300 to-dark-400">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-accent/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <i className="fas fa-cloud text-accent text-3xl"></i>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Penyewaan Server VPS
              </h1>
              <p className="text-slate-dark text-lg mb-8 max-w-2xl mx-auto">
                Solusi hosting VPS berkualitas tinggi dengan performa optimal, uptime terjamin
                99.9%, dan support 24/7 untuk kebutuhan bisnis digital Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#packages"
                  className="bg-accent text-dark-400 px-8 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
                >
                  Lihat Paket VPS
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

        {/* Features */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Mengapa Pilih VPS Kami?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-dark-300 p-6 rounded-xl border border-dark-100">
                  <i className={`${feature.icon} text-accent text-3xl mb-4`}></i>
                  <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-dark text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 bg-dark-300">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Ideal Untuk Berbagai Kebutuhan
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="bg-dark-200 p-6 rounded-xl border border-dark-100 text-center"
                >
                  <i className={`${useCase.icon} text-accent text-2xl mb-4`}></i>
                  <h3 className="text-lg font-semibold text-white mb-3">{useCase.title}</h3>
                  <p className="text-slate-dark text-sm">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Paket VPS Hosting</h2>
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
                  <div className="flex items-baseline mb-6">
                    <span className="text-3xl font-bold text-accent">{pkg.price}</span>
                    <span className="text-slate-dark ml-1">{pkg.period}</span>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-3">Spesifikasi Server:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-slate-dark">
                        <span>CPU:</span>
                        <span className="text-white">{pkg.specs.cpu}</span>
                      </div>
                      <div className="flex justify-between text-slate-dark">
                        <span>RAM:</span>
                        <span className="text-white">{pkg.specs.ram}</span>
                      </div>
                      <div className="flex justify-between text-slate-dark">
                        <span>Storage:</span>
                        <span className="text-white">{pkg.specs.storage}</span>
                      </div>
                      <div className="flex justify-between text-slate-dark">
                        <span>Bandwidth:</span>
                        <span className="text-white">{pkg.specs.bandwidth}</span>
                      </div>
                      <div className="flex justify-between text-slate-dark">
                        <span>IP Address:</span>
                        <span className="text-white">{pkg.specs.ip}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-white font-medium mb-3">Yang Termasuk:</h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-slate-dark text-sm">
                          <i className="fas fa-check text-accent text-xs mr-3"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/#contact"
                    className={`block text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                      pkg.popular
                        ? "bg-accent text-dark-400 hover:bg-accent/90"
                        : "border border-accent text-accent hover:bg-accent hover:text-dark-400"
                    }`}
                  >
                    Order Sekarang
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-dark-300">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Proses Order VPS</h2>
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

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-r from-accent/20 to-accent/10 rounded-2xl p-8 md:p-12 text-center border border-accent/30">
              <h2 className="text-3xl font-bold text-white mb-4">Siap Upgrade Ke VPS?</h2>
              <p className="text-slate-dark mb-8 max-w-2xl mx-auto">
                Konsultasikan kebutuhan hosting Anda dengan tim ahli kami. Dapatkan rekomendasi
                paket VPS yang sesuai dengan budget dan requirement.
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
