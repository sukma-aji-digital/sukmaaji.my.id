import Image from "next/image";

export default function PortfolioSection() {
  const projects = [
    {
      title: "Content Management System",
      description:
        "CMS untuk manajemen konten website dengan fitur user management, artikel, dan kategori.",
      image: "/images/project/muria.jpg",
      technologies: ["Laravel", "MySQL", "Tailwind"],
      demoLink: "https://muriabatikkudus.com",
      githubLink: "https://github.com/sukmaajidigital",
    },
    {
      title: "UMKM Management System",
      description:
        "CMS untuk memnajement UMKM dengan fitur produk, kategori, dan laporan penjualan. dan semua kebutuhan umkm serta kustomisasi dinamiskan sesuai kebutuhan UMKM.",
      image: "/images/project/dashboardmuria.jpg",
      technologies: ["Laravel", "MySQL", "Tailwind"],
      demoLink: "https://sukmaaji.my.id/mycode/dashboard_umkm/",
      githubLink: "https://github.com/sukmaajidigital",
    },
  ];

  return (
    <section id="portfolio" className="py-20 bg-dark-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white section-title inline-block">
            Project Portfolio
          </h2>
          <p className="text-slate-dark mt-4 max-w-2xl mx-auto">Beberapa projek saya</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-dark-200 rounded-2xl overflow-hidden border border-dark-100 card-hover"
            >
              <div className="h-48 relative overflow-hidden">
                <Image src={project.image} alt={project.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-slate-dark mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-light text-sm font-medium"
                  >
                    <i className="fas fa-external-link-alt mr-1"></i> Lihat Detail
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-dark hover:text-white"
                  >
                    <i className="fab fa-github text-lg"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://sukmaaji.my.id/mycode"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center border border-accent text-accent px-6 py-3 rounded-lg font-medium hover:bg-accent/10 transition"
          >
            <i className="fab fa-github mr-2"></i>show more projects
          </a>
        </div>
      </div>
    </section>
  );
}
