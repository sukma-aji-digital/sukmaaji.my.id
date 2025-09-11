import Link from "next/link";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Jasa Pembuatan Website Profesional | Sukma Aji Digital",
  description:
    "Layanan pembuatan website profesional dengan teknologi terkini. Website responsif, SEO optimized, dan performa tinggi untuk bisnis Anda.",
  keywords: "pembuatan website, web development, website profesional, responsive design, SEO",
};

export default function WebsiteDevelopmentPage() {
  const packages = [
    {
      name: "Basic",
      price: "Rp 2.500.000",
      features: [
        "Landing Page (1-3 halaman)",
        "Responsive Design",
        "Basic SEO Setup",
        "Contact Form",
        "Social Media Integration",
        "1 Bulan Maintenance",
      ],
    },
    {
      name: "Professional",
      price: "Rp 5.000.000",
      features: [
        "Website Multi-page (5-10 halaman)",
        "Content Management System",
        "Advanced SEO Optimization",
        "Blog Integration",
        "Analytics Setup",
        "3 Bulan Maintenance",
        "Free SSL Certificate",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Rp 10.000.000+",
      features: [
        "Custom Web Application",
        "E-commerce Integration",
        "User Authentication",
        "Database Integration",
        "API Development",
        "6 Bulan Maintenance",
        "Performance Optimization",
      ],
    },
  ];

  const technologies = [
    { name: "Next.js", icon: "fas fa-react" },
    { name: "React", icon: "fas fa-react" },
    { name: "TypeScript", icon: "fas fa-code" },
    { name: "Tailwind CSS", icon: "fas fa-palette" },
    { name: "Node.js", icon: "fas fa-server" },
    { name: "MongoDB", icon: "fas fa-database" },
  ];

  const process = [
    {
      step: "1",
      title: "Konsultasi & Analisis",
      description: "Diskusi kebutuhan, target audience, dan tujuan website",
    },
    {
      step: "2",
      title: "Design & Wireframe",
      description: "Pembuatan mockup dan prototype sesuai brand identity",
    },
    {
      step: "3",
      title: "Development",
      description: "Coding website dengan teknologi terkini dan best practices",
    },
    {
      step: "4",
      title: "Testing & Launch",
      description: "Quality assurance, deployment, dan training penggunaan",
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
            { label: "Pembuatan Website" },
          ]}
        />
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-dark-300 to-dark-400">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-accent/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <i className="fas fa-globe text-accent text-3xl"></i>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Jasa Pembuatan Website Profesional
              </h1>
              <p className="text-slate-dark text-lg mb-8 max-w-2xl mx-auto">
                Wujudkan presence online bisnis Anda dengan website modern, responsif, dan
                SEO-friendly yang dirancang khusus untuk meningkatkan konversi dan engagement
                pelanggan.
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

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Mengapa Memilih Layanan Kami?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-dark-300 p-6 rounded-xl border border-dark-100">
                <i className="fas fa-mobile-alt text-accent text-2xl mb-4"></i>
                <h3 className="text-xl font-semibold text-white mb-3">Responsive Design</h3>
                <p className="text-slate-dark">
                  Website yang sempurna di semua perangkat - desktop, tablet, dan mobile
                </p>
              </div>
              <div className="bg-dark-300 p-6 rounded-xl border border-dark-100">
                <i className="fas fa-search text-accent text-2xl mb-4"></i>
                <h3 className="text-xl font-semibold text-white mb-3">SEO Optimized</h3>
                <p className="text-slate-dark">
                  Optimasi mesin pencari untuk meningkatkan visibility dan traffic organik
                </p>
              </div>
              <div className="bg-dark-300 p-6 rounded-xl border border-dark-100">
                <i className="fas fa-rocket text-accent text-2xl mb-4"></i>
                <h3 className="text-xl font-semibold text-white mb-3">Performance Tinggi</h3>
                <p className="text-slate-dark">
                  Loading time cepat dan optimasi performa untuk user experience terbaik
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="py-16 bg-dark-300">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Teknologi yang Kami Gunakan
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="bg-dark-200 p-4 rounded-lg text-center border border-dark-100"
                >
                  <i className={`${tech.icon} text-accent text-2xl mb-2`}></i>
                  <p className="text-white font-medium">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Proses Pengerjaan</h2>
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
            <h2 className="text-3xl font-bold text-white text-center mb-12">Paket Layanan</h2>
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
                  <p className="text-3xl font-bold text-accent mb-6">{pkg.price}</p>
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
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-r from-accent/20 to-accent/10 rounded-2xl p-8 md:p-12 text-center border border-accent/30">
              <h2 className="text-3xl font-bold text-white mb-4">
                Siap Memulai Project Website Anda?
              </h2>
              <p className="text-slate-dark mb-8 max-w-2xl mx-auto">
                Konsultasikan kebutuhan website bisnis Anda dengan tim ahli kami. Dapatkan penawaran
                terbaik dan solusi yang tepat sasaran.
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
