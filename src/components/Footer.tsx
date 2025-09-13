import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const socialLinks = [
    {
      href: "https://github.com/sukmaajidigital",
      icon: "fab fa-github",
    },
    {
      href: "https://www.linkedin.com/in/sukmaaji/",
      icon: "fab fa-linkedin",
    },
    {
      href: "https://instagram.com/sukmaaji.digital",
      icon: "fab fa-instagram",
    },
    {
      href: "https://x.com/sukmaajidigital",
      icon: "fab fa-x-twitter",
    },
  ];

  return (
    <footer className="py-12 bg-dark-400 border-t border-dark-300">
      <div className="container mx-auto px-6 text-center">
        <Link href="/" className="text-xl font-bold gradient-text flex items-center justify-center">
          <div className="p-2 mr-2">
            <Image
              src="/images/logo.webp"
              alt="Logo Sukma Aji Digital"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <span className="text-accent">Sukma</span>
          <span className="text-white">Aji</span>
          <span className="text-accent">Digital</span>
        </Link>

        <p className="text-slate-dark mt-4 max-w-2xl mx-auto">
          Seorang penggiat teknologi informasi yang suka belajar hal baru dan berbagi ilmu.
        </p>

        <div className="flex justify-center space-x-6 my-6">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-dark hover:text-accent text-xl transition-all"
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>

        {/* Legal Links */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 my-6">
          <Link
            href="/privacy-policy"
            className="text-slate-dark hover:text-accent text-sm transition-colors underline"
          >
            Kebijakan Privasi
          </Link>
          <Link
            href="/terms-of-service"
            className="text-slate-dark hover:text-accent text-sm transition-colors underline"
          >
            Syarat & Ketentuan
          </Link>
          <Link
            href="/games"
            className="text-slate-dark hover:text-accent text-sm transition-colors underline"
          >
            Game Center
          </Link>
        </div>

        <p className="text-sm text-slate-dark">
          &copy; 2025 Sukma Aji Digital. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
