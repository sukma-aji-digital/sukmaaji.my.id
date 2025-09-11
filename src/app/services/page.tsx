import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export default function ServicesPage() {
  const services = [
    {
      slug: "website-development",
      icon: "fas fa-globe",
      title: "Pembuatan Website",
      description:
        "Membuat website profesional sesuai kebutuhan bisnis Anda dengan teknologi terkini.",
      features: [
        "Website Responsif",
        "SEO Optimized",
        "Fast Loading",
        "Modern Design",
        "Mobile Friendly",
      ],
    },
    {
      slug: "system-development",
      icon: "fas fa-network-wired",
      title: "Pengembangan Sistem Informasi",
      description:
        "Membangun sistem informasi perusahaan yang efisien dan terintegrasi untuk meningkatkan produktivitas.",
      features: [
        "Custom Development",
        "Database Integration",
        "User Management",
        "Real-time Reporting",
        "API Integration",
      ],
    },
    {
      slug: "network-management",
      icon: "fas fa-server",
      title: "Manajemen Jaringan Perusahaan",
      description:
        "Mengelola dan mengoptimalkan jaringan perusahaan untuk performa maksimal dan keamanan terjamin.",
      features: [
        "Network Setup",
        "Security Configuration",
        "Performance Monitoring",
        "24/7 Support",
        "Backup Solutions",
      ],
    },
    {
      slug: "vps-hosting",
      icon: "fas fa-cloud",
      title: "Penyewaan Server VPS",
      description:
        "Menyediakan server VPS handal dengan uptime tinggi untuk kebutuhan hosting aplikasi bisnis Anda.",
      features: ["99.9% Uptime", "SSD Storage", "Free SSL", "Daily Backup", "24/7 Monitoring"],
    },
  ];

  return (
    <div className="min-h-screen bg-dark-400 pt-20">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Layanan Jasa" }]} />
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Layanan Jasa Kami</h1>
          <p className="text-slate-dark text-lg max-w-3xl mx-auto">
            Kami menyediakan berbagai layanan digital profesional untuk mendukung pertumbuhan bisnis
            Anda
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-dark-300 rounded-2xl p-8 border border-dark-100 card-hover"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-accent/20 p-3 rounded-lg">
                  <i className={`${service.icon} text-accent text-2xl`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-slate-dark mb-4">{service.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-white font-medium mb-3">Fitur Utama:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-slate-dark">
                      <i className="fas fa-check text-accent text-sm mr-3"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center bg-accent text-dark-400 px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
              >
                Pelajari Lebih Lanjut
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-dark-300 rounded-2xl p-8 border border-dark-100">
            <h2 className="text-2xl font-bold text-white mb-4">Butuh Konsultasi?</h2>
            <p className="text-slate-dark mb-6">
              Hubungi kami untuk mendiskusikan kebutuhan project Anda
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center bg-accent text-dark-400 px-8 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              Hubungi Kami
              <i className="fas fa-phone ml-2"></i>
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "Berapa lama waktu pengerjaan website?",
                answer:
                  "Waktu pengerjaan bervariasi tergantung kompleksitas. Website basic membutuhkan 2-3 minggu, professional 4-6 minggu, dan enterprise 8-12 minggu.",
              },
              {
                question: "Apakah ada garansi untuk layanan yang diberikan?",
                answer:
                  "Ya, kami memberikan garansi maintenance gratis sesuai paket yang dipilih. Selain itu, kami juga memberikan garansi bug-fix selama 30 hari setelah launch.",
              },
              {
                question: "Apakah bisa request revisi selama proses development?",
                answer:
                  "Tentu saja. Kami menggunakan metodologi agile dengan sprint review regular, sehingga Anda bisa memberikan feedback dan request revisi di setiap tahap.",
              },
              {
                question: "Bagaimana dengan ownership dan source code?",
                answer:
                  "Setelah project selesai dan pembayaran lunas, semua source code dan ownership akan diserahkan sepenuhnya kepada klien.",
              },
            ].map((faq, index) => (
              <div key={index} className="mb-4 bg-dark-300 rounded-xl border border-dark-100">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-white mb-3">{faq.question}</h3>
                  <p className="text-slate-dark leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
