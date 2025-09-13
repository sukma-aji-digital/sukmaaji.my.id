"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import AuthButtons from "./AuthButtons";

interface GameHeaderProps {
  title: string;
  backLink?: string;
  backLabel?: string;
  showEndGameButton?: boolean;
  onEndGame?: () => void;
  extraInfo?: React.ReactNode;
}

export default function GameHeader({
  title,
  backLink = "/games",
  backLabel = "Back to Games",
  showEndGameButton = false,
  onEndGame,
  extraInfo,
}: GameHeaderProps) {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Left side - Logo and Title */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Mobile hamburger menu */}
              <button
                onClick={toggleMobileMenu}
                className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-gray-600`}></i>
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center">
                <div className="p-1 mr-2">
                  <Image
                    src="/images/logo.webp"
                    alt="Logo Sukma Aji Digital"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="hidden sm:flex">
                  <span className="text-blue-600 font-bold">Sukma</span>
                  <span className="text-gray-900 font-bold">Aji</span>
                  <span className="text-blue-600 font-bold">Digital</span>
                </span>
              </Link>

              {/* Back button - desktop */}
              <div className="hidden sm:flex items-center">
                <span className="text-gray-300 mx-2">|</span>
                <Link
                  href={backLink}
                  className="text-blue-500 hover:text-blue-600 transition-colors text-sm sm:text-base flex items-center gap-1"
                >
                  <i className="fas fa-arrow-left"></i>
                  {backLabel}
                </Link>
              </div>

              {/* Game title */}
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 flex items-center gap-2">
                {title}
              </div>
            </div>

            {/* Right side - User info and actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Extra info (like game stats) */}
              {extraInfo && <div className="hidden lg:block">{extraInfo}</div>}

              {/* User info - desktop */}
              {session?.user && (
                <div className="hidden md:flex items-center gap-3">
                  {session.user.image && (
                    <img
                      src={session.user.image}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full border-2 border-gray-200"
                    />
                  )}
                  <div className="text-xs sm:text-sm text-gray-600">
                    <span className="font-medium">{session.user.name}</span>
                  </div>
                </div>
              )}

              {/* End game button */}
              {showEndGameButton && onEndGame && (
                <button
                  onClick={onEndGame}
                  className="px-2 sm:px-4 py-1 sm:py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors text-xs sm:text-sm"
                >
                  <i className="fas fa-stop mr-1"></i>
                  <span className="hidden sm:inline">End Game</span>
                </button>
              )}

              {/* Auth buttons - desktop */}
              <div className="hidden sm:block">
                <AuthButtons />
              </div>

              {/* Mobile menu button for authenticated actions */}
              <button
                onClick={toggleMobileMenu}
                className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <i className="fas fa-user text-gray-600"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="px-4 py-3 space-y-3">
            {/* Back button - mobile */}
            <Link
              href={backLink}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="fas fa-arrow-left"></i>
              {backLabel}
            </Link>

            {/* Quick navigation */}
            <div className="border-t pt-3 space-y-2">
              <Link
                href="/"
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-home mr-2"></i>
                Beranda
              </Link>
              <Link
                href="/games"
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-gamepad mr-2"></i>
                Game Center
              </Link>
              <Link
                href="/games/math/leaderboard"
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-trophy mr-2"></i>
                Leaderboard
              </Link>
            </div>

            {/* User section - mobile */}
            {session?.user ? (
              <div className="border-t pt-3">
                <div className="flex items-center gap-3 mb-3">
                  {session.user.image && (
                    <img
                      src={session.user.image}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full border-2 border-gray-200"
                    />
                  )}
                  <div>
                    <div className="font-medium text-gray-800">{session.user.name}</div>
                    <div className="text-sm text-gray-500">{session.user.email}</div>
                  </div>
                </div>
                <AuthButtons />
              </div>
            ) : (
              <div className="border-t pt-3">
                <AuthButtons />
              </div>
            )}

            {/* Extra info - mobile */}
            {extraInfo && <div className="border-t pt-3">{extraInfo}</div>}
          </div>
        </div>
      )}
    </>
  );
}
