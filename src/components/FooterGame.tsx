import Link from "next/link";
import Image from "next/image";

export default function FooterGame() {
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
    <footer className="py-12 bg-white border-t border-gray-200">
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
          <span className="text-blue-600">Sukma</span>
          <span className="text-gray-900">Aji</span>
          <span className="text-blue-600">Digital</span>
        </Link>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Seorang penggiat teknologi informasi yang suka belajar hal baru dan berbagi ilmu.
        </p>

        <div className="flex justify-center space-x-6 my-6">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 text-xl transition-all"
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>

        <p className="text-sm text-gray-500">&copy; 2025 Sukma Aji Digital. All rights reserved.</p>
      </div>
    </footer>
  );
}
