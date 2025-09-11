export default function ContactSection() {
  const contacts = [
    {
      icon: "fas fa-envelope",
      title: "Email",
      info: "sukmaajidigital@gmail.com",
      link: "mailto:sukmaajidigital@gmail.com",
      linkText: "Kirim Pesan",
    },
    {
      icon: "fab fa-linkedin",
      title: "LinkedIn",
      info: "MUHAMMAD AJI SUKMA",
      link: "https://www.linkedin.com/in/sukmaaji/",
      linkText: "Terhubung",
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
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white section-title inline-block">
            Hubungi Saya
          </h2>
          <p className="text-slate-dark mt-4 max-w-2xl mx-auto">
            Tertarik untuk berkolaborasi? Mari berbicara tentang proyek Anda
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
      </div>
    </section>
  );
}
