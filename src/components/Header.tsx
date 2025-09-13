"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import DropdownMenu from "./DropdownMenu";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileGamesOpen, setIsMobileGamesOpen] = useState(false);
  const pathname = usePathname();

  const gamesItems = [
    {
      title: "Math",
      href: "/games/math",
      description: "Game edukasi matematika yang menyenangkan",
      icon: "fas fa-calculator",
    },
  ];
  const serviceItems = [
    {
      title: "Pembuatan Website",
      href: "/services/website-development",
      description: "Website profesional dengan teknologi terkini",
      icon: "fas fa-globe",
    },
    {
      title: "Pengembangan Sistem Informasi",
      href: "/services/system-development",
      description: "Sistem informasi custom untuk perusahaan",
      icon: "fas fa-network-wired",
    },
    {
      title: "Manajemen Jaringan Perusahaan",
      href: "/services/network-management",
      description: "Setup dan maintenance jaringan enterprise",
      icon: "fas fa-server",
    },
    {
      title: "Penyewaan Server VPS",
      href: "/services/vps-hosting",
      description: "VPS hosting dengan uptime tinggi",
      icon: "fas fa-cloud",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    if (path === "/services") return pathname.startsWith("/services");
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
          <DropdownMenu title="Game" items={gamesItems} isActive={isActive("/games")} />
          <Link href="/projects" className={getLinkClasses("/projects")}>
            Projects
          </Link>
          <Link href="/#about" className={getLinkClasses("/#about")}>
            Tentang
          </Link>
          <DropdownMenu title="Jasa" items={serviceItems} isActive={isActive("/services")} />
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
          <div>
            <button
              onClick={() => setIsMobileGamesOpen(!isMobileGamesOpen)}
              className={`py-2 transition-colors duration-200 flex items-center justify-between w-full ${
                isActive("/games")
                  ? "text-white font-semibold border-l-4 border-accent pl-4"
                  : "text-slate-dark hover:text-white"
              }`}
            >
              Game
              <i
                className={`fas fa-chevron-down transition-transform duration-200 ${
                  isMobileGamesOpen ? "rotate-180" : ""
                }`}
              ></i>
            </button>
            {isMobileGamesOpen && (
              <div className="pl-4 mt-2 space-y-2">
                {gamesItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="block py-2 text-slate-dark hover:text-white text-sm"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsMobileGamesOpen(false);
                    }}
                  >
                    <i className={`${item.icon} mr-2 text-accent`}></i>
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
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

          {/* Mobile Services Dropdown */}
          <div>
            <button
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              className={`py-2 transition-colors duration-200 flex items-center justify-between w-full ${
                isActive("/services")
                  ? "text-white font-semibold border-l-4 border-accent pl-4"
                  : "text-slate-dark hover:text-white"
              }`}
            >
              Jasa
              <i
                className={`fas fa-chevron-down transition-transform duration-200 ${
                  isMobileServicesOpen ? "rotate-180" : ""
                }`}
              ></i>
            </button>
            {isMobileServicesOpen && (
              <div className="pl-4 mt-2 space-y-2">
                {serviceItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="block py-2 text-slate-dark hover:text-white text-sm"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsMobileServicesOpen(false);
                    }}
                  >
                    <i className={`${item.icon} mr-2 text-accent`}></i>
                    {item.title}
                  </Link>
                ))}
                <Link
                  href="/services"
                  className="block py-2 text-accent hover:text-white text-sm font-medium"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsMobileServicesOpen(false);
                  }}
                >
                  <i className="fas fa-arrow-right mr-2"></i>
                  Lihat Semua Layanan
                </Link>
              </div>
            )}
          </div>

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
