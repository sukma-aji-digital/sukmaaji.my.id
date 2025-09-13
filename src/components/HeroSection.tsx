import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <div className="text-center md:text-left animate-fade-in">
            <p className="text-accent font-medium mb-4">
              <span className="w-8 h-px bg-accent inline-block mr-3 align-middle"></span>
              Selamat Datang di Sukma Aji Digital
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Solusi Digital untuk Bisnis Anda
            </h1>
            <p className="text-slate-dark text-lg mb-8 max-w-xl">
              Sukma Aji Digital adalah perusahaan yang bergerak di bidang jasa digital website,
              pengembangan sistem informasi, manajemen jaringan, dan penyewaan server VPS. Kami
              berkomitmen memberikan layanan terbaik untuk mendukung pertumbuhan bisnis Anda di era
              digital.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                href="#services"
                className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-dark transition shadow-lg shadow-accent/20"
              >
                <i className="fas fa-briefcase mr-2"></i>Lihat Jasa Kami
              </Link>
            </div>
            <div className="flex gap-6 mt-12 justify-center md:justify-start">
              <a
                href="https://github.com/sukmaajidigital"
                className="text-slate-dark hover:text-accent text-xl transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/sukmaajidigital/"
                className="text-slate-dark hover:text-accent text-xl transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://instagram.com/sukmaaji.digital"
                className="text-slate-dark hover:text-accent text-xl transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          {/* Image Section */}
          <div className="animate-fade-in delay-300 flex justify-center">
            <Image
              src="/images/banner.png"
              alt="Digital Picture - Sukma Aji Digital"
              width={600}
              height={400}
              className="w-full h-full object-cover rounded-2xl shadow-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
