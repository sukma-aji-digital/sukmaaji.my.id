export default function ServicesSection() {
  const services = [
    {
      icon: "fas fa-globe",
      title: "Pembuatan Website",
      description: "Membuat website profesional sesuai kebutuhan bisnis Anda.",
    },
    {
      icon: "fas fa-network-wired",
      title: "Pengembangan Sistem Informasi",
      description: "Membangun sistem informasi perusahaan yang efisien dan terintegrasi.",
    },
    {
      icon: "fas fa-server",
      title: "Manajemen Jaringan Perusahaan",
      description: "Mengelola dan mengoptimalkan jaringan perusahaan Anda.",
    },
    {
      icon: "fas fa-cloud",
      title: "Penyewaan Server VPS",
      description: "Menyediakan server VPS handal untuk kebutuhan bisnis Anda.",
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
            <div
              key={index}
              className="bg-dark-200 rounded-2xl p-8 border border-dark-100 card-hover text-center"
            >
              <i className={`${service.icon} text-accent text-4xl mb-4`}></i>
              <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-slate-dark">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
