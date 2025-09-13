import Link from "next/link";

export default function ServicesSection() {
  const services = [
    {
      icon: "fas fa-globe",
      title: "Pembuatan Website",
      description:
        "Membuat website profesional sesuai kebutuhan bisnis Anda dengan teknologi terkini.",
      slug: "website-development",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading"],
    },
    {
      icon: "fas fa-network-wired",
      title: "Pengembangan Sistem Informasi",
      description: "Membangun sistem informasi perusahaan yang efisien dan terintegrasi.",
      slug: "system-development",
      features: ["Custom Development", "Database Integration", "Real-time Reporting"],
    },
    {
      icon: "fas fa-server",
      title: "Manajemen Jaringan Perusahaan",
      description: "Mengelola dan mengoptimalkan jaringan perusahaan untuk performa maksimal.",
      slug: "network-management",
      features: ["Network Setup", "Security Configuration", "24/7 Support"],
    },
    {
      icon: "fas fa-cloud",
      title: "Penyewaan Server VPS",
      description: "Menyediakan server VPS handal dengan uptime tinggi untuk kebutuhan hosting.",
      slug: "vps-hosting",
      features: ["99.9% Uptime", "SSD Storage", "24/7 Monitoring"],
    },
  ];

  return (
    <section id="services" className="py-20 bg-dark-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white section-title inline-block">
            Jasa Kami
          </h2>
          <p className="text-slate-dark mt-4 max-w-2xl mx-auto">
            Layanan digital yang kami tawarkan untuk mendukung bisnis Anda
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={`/services/${service.slug}`}
              className="bg-dark-200 rounded-2xl p-8 border border-dark-100 card-hover group transition-all duration-300 hover:border-accent/50"
            >
              <div className="text-center">
                <div className="bg-accent/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <i className={`${service.icon} text-accent text-2xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-dark mb-4">{service.description}</p>

                <div className="mb-6">
                  <div className="flex flex-wrap justify-center gap-2">
                    {service.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-dark-100 text-slate-light px-3 py-1 rounded-full text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="inline-flex items-center text-accent font-medium group-hover:text-white transition-colors">
                  Pelajari Lebih Lanjut
                  <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center bg-accent text-dark-400 px-8 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Lihat Semua Layanan
            <i className="fas fa-external-link-alt ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
