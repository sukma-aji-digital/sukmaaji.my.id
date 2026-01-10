export default function AboutSection() {
  const features = [
    {
      icon: "fas fa-code",
      title: "Inovasi Digital",
      description: "Selalu berinovasi dalam solusi digital untuk bisnis Anda",
    },
    {
      icon: "fas fa-layer-group",
      title: "Teknologi Terkini",
      description: "Menggunakan teknologi terbaru untuk hasil optimal",
    },
    {
      icon: "fas fa-rocket",
      title: "Efisiensi & Performa",
      description: "Solusi yang efisien dan performa tinggi untuk bisnis Anda",
    },
    {
      icon: "fas fa-shield-alt",
      title: "Keamanan",
      description: "Keamanan data dan sistem adalah prioritas utama kami",
    },
  ];

  return (
    <section id="about" className="py-20 bg-dark-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white section-title inline-block">
            Tentang Kami
          </h2>
          <p className="text-slate-dark mt-4 max-w-2xl mx-auto">
            Mengenal lebih dekat Sukma Aji Digital dan komitmen kami dalam dunia digital
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-dark-200 rounded-2xl p-8 border border-dark-100 card-hover">
              <h3 className="text-xl font-semibold text-white mb-4">Profil</h3>
              <p className="text-slate-dark mb-6">
                Sukma Aji Digital menyediakan layanan pengembangan website, sistem informasi, dan
                server VPS dengan kualitas profesional untuk kebutuhan bisnis Anda.
              </p>
              <p className="text-slate-dark mb-6">
                Kami percaya bahwa solusi digital yang tepat dapat meningkatkan efisiensi,
                produktivitas, dan daya saing bisnis Anda. Tim kami berpengalaman dan selalu
                berinovasi untuk memberikan hasil terbaik.
              </p>
              <p className="text-slate-dark">
                Bersama Sukma Aji Digital, wujudkan visi digital Anda dengan layanan yang terpercaya
                dan berkualitas.
              </p>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-dark-200 rounded-2xl p-6 border border-dark-100 text-center card-hover"
                >
                  <div className="gradient-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`${feature.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-dark text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
