"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
          <Link href="/blog" className="nav-link text-slate-dark hover:text-white transition">
            Blog
          </Link>
          <Link href="/#about" className="nav-link text-slate-dark hover:text-white transition">
            Tentang
          </Link>
          <Link href="/#services" className="nav-link text-slate-dark hover:text-white transition">
            Jasa
          </Link>
          <Link href="/#portfolio" className="nav-link text-slate-dark hover:text-white transition">
            Portfolio
          </Link>
          <Link href="/#contact" className="nav-link text-slate-dark hover:text-white transition">
            Kontak
          </Link>
          <Link href="/owner" className="nav-link text-slate-dark hover:text-white transition">
            Owner
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
            className="py-2 text-slate-dark hover:text-white transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/#about"
            className="py-2 text-slate-dark hover:text-white transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Tentang
          </Link>
          <Link
            href="/#services"
            className="py-2 text-slate-dark hover:text-white transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Jasa
          </Link>
          <Link
            href="/#portfolio"
            className="py-2 text-slate-dark hover:text-white transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Portfolio
          </Link>
          <Link
            href="/#contact"
            className="py-2 text-slate-dark hover:text-white transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Kontak
          </Link>
          <Link
            href="/owner"
            className="py-2 text-slate-dark hover:text-white transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Owner
          </Link>
        </div>
      </div>
    </header>
  );
}
