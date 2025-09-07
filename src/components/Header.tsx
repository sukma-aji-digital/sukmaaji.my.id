"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const getLinkClasses = (path: string) => {
    const baseClasses = "nav-link transition-colors duration-200";
    const activeClasses = "text-white font-semibold border-b-2 border-accent pb-1";
    const inactiveClasses = "text-slate-dark hover:text-white";

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  const getMobileLinkClasses = (path: string) => {
    const baseClasses = "py-2 transition-colors duration-200";
    const activeClasses = "text-white font-semibold border-l-4 border-accent pl-4";
    const inactiveClasses = "text-slate-dark hover:text-white";

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <header className="fixed w-full z-50 bg-dark-300/90 backdrop-blur-md border-b border-dark-100">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold gradient-text flex items-center">
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

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/blog" className={getLinkClasses("/blog")}>
            Blog
          </Link>
          <Link href="/projects" className={getLinkClasses("/projects")}>
            Projects
          </Link>
          <Link href="/#about" className={getLinkClasses("/#about")}>
            Tentang
          </Link>
          <Link href="/#services" className={getLinkClasses("/#services")}>
            Jasa
          </Link>
          <Link href="/#portfolio" className={getLinkClasses("/#portfolio")}>
            Portfolio
          </Link>
          <Link href="/#contact" className={getLinkClasses("/#contact")}>
            Kontak
          </Link>
          <Link href="/me" className={getLinkClasses("/me")}>
            Me
          </Link>
        </div>

        <button onClick={toggleMobileMenu} className="md:hidden text-xl bg-dark-200 p-2 rounded-lg">
          <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-slate-light`}></i>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden bg-dark-200 border-t border-dark-100`}
      >
        <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
          <Link
            href="/blog"
            className={getMobileLinkClasses("/blog")}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/projects"
            className={getMobileLinkClasses("/projects")}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Projects
          </Link>
          <Link
            href="/#about"
            className={getMobileLinkClasses("/#about")}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Tentang
          </Link>
          <Link
            href="/#services"
            className={getMobileLinkClasses("/#services")}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Jasa
          </Link>
          <Link
            href="/#portfolio"
            className={getMobileLinkClasses("/#portfolio")}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Portfolio
          </Link>
          <Link
            href="/#contact"
            className={getMobileLinkClasses("/#contact")}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Kontak
          </Link>
          <Link
            href="/me"
            className={getMobileLinkClasses("/me")}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Me
          </Link>
        </div>
      </div>
    </header>
  );
}
