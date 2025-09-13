import { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Muhammad Aji Sukma - Backend Developer & Tech Enthusiast | Sukmaaji Digital",
  description:
    "Muhammad Aji Sukma adalah seorang backend developer dan founder Sukmaaji Digital yang berpengalaman dalam Laravel, PHP, dan pengembangan sistem informasi. Passionate dalam problem solving dan continuous learning.",
  keywords: [
    "Muhammad Aji Sukma",
    "Backend Developer",
    "Laravel Developer",
    "PHP Developer",
    "Sukmaaji Digital",
    "Web Developer Indonesia",
    "API Development",
    "MySQL",
    "Tech Enthusiast",
    "Freelance Developer",
  ],
  authors: [{ name: "Muhammad Aji Sukma" }],
  creator: "Muhammad Aji Sukma",
  publisher: "Sukmaaji Digital",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Muhammad Aji Sukma - Backend Developer & Tech Enthusiast",
    description:
      "Founder Sukmaaji Digital yang passionate dalam pengembangan aplikasi web dan sistem informasi. Spesialisasi Laravel, PHP, dan arsitektur API scalable.",
    url: "https://sukmaaji.my.id/me",
    siteName: "Sukmaaji Digital",
    locale: "id_ID",
    type: "profile",
    images: [
      {
        url: "https://sukmaaji.my.id/images/ajipro.jpg",
        width: 800,
        height: 800,
        alt: "Muhammad Aji Sukma - Backend Developer & Tech Enthusiast",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Aji Sukma - Backend Developer & Tech Enthusiast",
    description:
      "Founder Sukmaaji Digital yang passionate dalam pengembangan aplikasi web dan sistem informasi. Spesialisasi Laravel, PHP, dan arsitektur API scalable.",
    images: [
      {
        url: "https://sukmaaji.my.id/images/ajipro.jpg",
        alt: "Muhammad Aji Sukma - Backend Developer & Tech Enthusiast",
      },
    ],
    creator: "@sukmaajidigital",
  },
  alternates: {
    canonical: "https://sukmaaji.my.id/me",
  },
  other: {
    "profile:first_name": "Muhammad Aji",
    "profile:last_name": "Sukma",
    "profile:username": "sukmaajidigital",
    "article:author": "Muhammad Aji Sukma",
    "og:profile:first_name": "Muhammad Aji",
    "og:profile:last_name": "Sukma",
    "og:profile:username": "sukmaajidigital",
  },
};

export default function MePage() {
  const experiences = [
    {
      title: "Founder & Backend Developer",
      company: "Sukmaaji Digital",
      period: "2022 - Sekarang",
      description:
        "Membangun dan memimpin perusahaan jasa digital yang berfokus pada pengembangan website, sistem informasi, dan solusi teknologi untuk UMKM dan perusahaan.",
      skills: ["Laravel", "MySQL", "Leadership", "Project Management"],
    },
    {
      title: "Freelance Web Developer",
      company: "Various Clients",
      period: "2020 - 2022",
      description:
        "Mengerjakan berbagai project website dan aplikasi web untuk klien dari berbagai industri, mulai dari e-commerce, sistem manajemen, hingga website company profile.",
      skills: ["PHP", "JavaScript", "WordPress", "Client Relations"],
    },
  ];

  const skills = [
    {
      category: "Backend Development",
      icon: "fas fa-server",
      items: [
        { name: "Laravel", level: 5 },
        { name: "PHP", level: 4 },
        { name: "API Development", level: 5 },
      ],
    },
    {
      category: "Database & Tools",
      icon: "fas fa-database",
      items: [
        { name: "MySQL", level: 5 },
        { name: "Git", level: 4 },
        { name: "Docker", level: 3 },
      ],
    },
    {
      category: "Frontend & Design",
      icon: "fas fa-paint-brush",
      items: [
        { name: "Tailwind CSS", level: 5 },
        { name: "JavaScript", level: 4 },
        { name: "React", level: 3 },
      ],
    },
  ];

  const features = [
    {
      icon: "fas fa-graduation-cap",
      title: "Continuous Learning",
      description: "Selalu belajar teknologi baru dan mengikuti perkembangan industri",
    },
    {
      icon: "fas fa-users",
      title: "Kolaborasi",
      description: "Suka bekerja dalam tim dan berbagi knowledge dengan developer lain",
    },
    {
      icon: "fas fa-lightbulb",
      title: "Problem Solving",
      description: "Passionate dalam memecahkan masalah kompleks dengan solusi sederhana",
    },
    {
      icon: "fas fa-heart",
      title: "Passion",
      description: "Mencintai apa yang saya kerjakan dan selalu berusaha memberikan yang terbaik",
    },
  ];

  const contacts = [
    {
      icon: "fas fa-envelope",
      title: "Email",
      info: "sukmaajidigital@gmail.com",
      link: "mailto:sukmaajidigital@gmail.com",
      linkText: "Kirim Email",
    },
    {
      icon: "fab fa-linkedin",
      title: "LinkedIn",
      info: "Muhammad Aji Sukma",
      link: "https://www.linkedin.com/in/sukmaaji/",
      linkText: "Connect",
    },
    {
      icon: "fab fa-whatsapp",
      title: "WhatsApp",
      info: "+62 851-7974-2322",
      link: "https://wa.me/6285179742322",
      linkText: "Chat Sekarang",
    },
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Muhammad Aji Sukma",
            alternateName: ["Aji Sukma", "Sukma Aji"],
            description: "Backend Developer & Tech Enthusiast, Founder of Sukmaaji Digital",
            url: "https://sukmaaji.my.id/me",
            image: {
              "@type": "ImageObject",
              url: "https://sukmaaji.my.id/images/ajipro.jpg",
              width: 800,
              height: 800,
              caption: "Muhammad Aji Sukma - Backend Developer & Tech Enthusiast",
            },
            sameAs: [
              "https://www.linkedin.com/in/sukmaaji/",
              "https://github.com/sukmaajidigital",
              "https://wa.me/6285179742322",
            ],
            email: "sukmaajidigital@gmail.com",
            telephone: "+62-851-7974-2322",
            jobTitle: "Backend Developer & Founder",
            worksFor: {
              "@type": "Organization",
              name: "Sukmaaji Digital",
              url: "https://sukmaaji.my.id",
            },
            knowsAbout: [
              "Laravel",
              "PHP",
              "MySQL",
              "API Development",
              "Backend Development",
              "Web Development",
              "JavaScript",
              "Tailwind CSS",
              "Git",
              "Docker",
            ],
            hasOccupation: {
              "@type": "Occupation",
              name: "Backend Developer",
              description:
                "Developing web applications and information systems using Laravel and PHP",
              skills: "Laravel, PHP, MySQL, API Development, JavaScript",
            },
            foundedOrganization: {
              "@type": "Organization",
              name: "Sukmaaji Digital",
              description:
                "Digital services company focusing on web development and information systems",
              foundingDate: "2022",
              url: "https://sukmaaji.my.id",
            },
          }),
        }}
      />

      <Header />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left animate-fade-in">
              <p className="text-accent font-medium mb-4">
                <span className="w-8 h-px bg-accent inline-block mr-3 align-middle"></span>
                Halo, Saya
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Muhammad Aji Sukma
              </h1>
              <p className="text-xl text-accent mb-4 font-medium">
                Backend Developer & Tech Enthusiast
              </p>
              <p className="text-slate-dark text-lg mb-8 max-w-xl">
                Seorang backend developer yang passionate dalam pengembangan aplikasi web dan sistem
                informasi. Saya suka belajar teknologi baru dan berbagi pengetahuan dengan komunitas
                developer.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a
                  href="#contact"
                  className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-dark transition shadow-lg shadow-accent/20"
                >
                  <i className="fas fa-envelope mr-2"></i>Contact
                </a>
                <a
                  href="https://github.com/sukmaajidigital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-accent text-accent px-6 py-3 rounded-lg font-medium hover:bg-accent/10 transition"
                >
                  <i className="fab fa-github mr-2"></i>gitHub
                </a>
              </div>
            </div>
            <div className="animate-fade-in delay-300 flex justify-center">
              <div className="relative">
                <Image
                  src="/images/ajipro.jpg"
                  alt="Muhammad Aji Sukma"
                  width={320}
                  height={320}
                  className="w-80 h-80 object-cover rounded-2xl shadow-xl animate-float"
                />
                <div className="absolute -bottom-4 -right-4 bg-accent text-white px-4 py-2 rounded-lg shadow-lg">
                  <i className="fas fa-code mr-2"></i>IT Enthusiast
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-dark-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white section-title inline-block">
              Tentang Saya
            </h2>
            <p className="text-slate-dark mt-4 max-w-2xl mx-auto">
              Mengenal lebih dekat tentang perjalanan dan passion saya di dunia teknologi
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-dark-200 rounded-2xl p-8 border border-dark-100 card-hover">
                <h3 className="text-xl font-semibold text-white mb-4">Perjalanan Saya</h3>
                <p className="text-slate-dark mb-6">
                  Saya Muhammad Aji Sukma, seorang backend developer yang memulai perjalanan di
                  dunia programming sejak tahun 2020. Passion saya terhadap teknologi dimulai dari
                  ketertarikan pada bagaimana sistem bekerja dan bagaimana kode dapat menyelesaikan
                  masalah nyata.
                </p>
                <p className="text-slate-dark mb-6">
                  Sebagai founder Sukmaaji Digital, saya memiliki misi untuk membantu bisnis dan
                  organisasi bertransformasi digital dengan solusi teknologi yang tepat dan
                  inovatif.
                </p>
                <p className="text-slate-dark">
                  Saat ini saya fokus pada pengembangan aplikasi web menggunakan Laravel, sistem
                  manajemen database, dan arsitektur API yang scalable.
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

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white section-title inline-block">
              Pengalaman & Project
            </h2>
            <p className="text-slate-dark mt-4 max-w-2xl mx-auto">
              Beberapa pengalaman dan project yang telah saya kerjakan
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-dark-200 rounded-2xl p-8 border border-dark-100 card-hover mb-8"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{exp.title}</h3>
                    <p className="text-accent font-medium">{exp.company}</p>
                  </div>
                  <span className="text-slate-dark text-sm mt-2 md:mt-0">{exp.period}</span>
                </div>
                <p className="text-slate-dark mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-dark-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white section-title inline-block">
              Keahlian Teknis
            </h2>
            <p className="text-slate-dark mt-4 max-w-2xl mx-auto">
              Teknologi dan tools yang saya kuasai dan gunakan dalam pengembangan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillCategory, index) => (
              <div
                key={index}
                className="bg-dark-200 rounded-2xl p-8 border border-dark-100 card-hover"
              >
                <div className="gradient-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className={`${skillCategory.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  {skillCategory.category}
                </h3>
                <div className="space-y-3">
                  {skillCategory.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-center">
                      <span className="text-slate-dark">{item.name}</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div
                            key={star}
                            className={`w-3 h-3 rounded-full ${
                              star <= item.level ? "bg-accent" : "bg-dark-100"
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white section-title inline-block">
              Mari Terhubung
            </h2>
            <p className="text-slate-dark mt-4 max-w-2xl mx-auto">
              Tertarik untuk berkolaborasi atau sekedar ngobrol tentang teknologi? Jangan ragu untuk
              menghubungi saya!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {contacts.map((contact, index) => (
              <div key={index} className="bg-dark-200 rounded-2xl p-6 text-center card-hover">
                <div className="gradient-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${contact.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-white font-semibold mb-2">{contact.title}</h3>
                <p className="text-slate-dark mb-3">{contact.info}</p>
                <a
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent text-sm hover:text-accent-light"
                >
                  {contact.linkText} <i className="fas fa-arrow-right ml-1 text-xs"></i>
                </a>
              </div>
            ))}
          </div>

          {/* Personal Quote */}
          <div className="mt-16 text-center">
            <div className="bg-dark-200 rounded-2xl p-8 border border-dark-100 card-hover max-w-2xl mx-auto">
              <i className="fas fa-quote-left text-accent text-2xl mb-4"></i>
              <p className="text-lg text-white font-medium italic mb-4">
                &quot;Make The World Better.&quot;
              </p>
              <p className="text-slate-dark">- Muhammad Aji Sukma</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
