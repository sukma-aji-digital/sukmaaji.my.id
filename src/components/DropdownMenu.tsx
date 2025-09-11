"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface DropdownItem {
  title: string;
  href: string;
  description: string;
  icon: string;
}

interface DropdownMenuProps {
  title: string;
  items: DropdownItem[];
  isActive?: boolean;
}

export default function DropdownMenu({ title, items, isActive }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`nav-link transition-colors duration-200 flex items-center ${
          isActive
            ? "text-white font-semibold border-b-2 border-accent pb-1"
            : "text-slate-dark hover:text-white"
        }`}
      >
        {title}
        <i
          className={`fas fa-chevron-down ml-1 text-xs transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        ></i>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-full left-0 mt-2 w-80 bg-dark-200 rounded-xl border border-dark-100 shadow-xl transition-all duration-200 z-50 ${
          isOpen
            ? "opacity-100 visible transform translate-y-0"
            : "opacity-0 invisible transform translate-y-2"
        }`}
      >
        <div className="p-2">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-start p-3 rounded-lg hover:bg-dark-100 transition-colors group"
              onClick={() => setIsOpen(false)}
            >
              <div className="bg-accent/20 p-2 rounded-lg mr-3 group-hover:bg-accent/30 transition-colors">
                <i className={`${item.icon} text-accent text-sm`}></i>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium text-sm group-hover:text-accent transition-colors">
                  {item.title}
                </h4>
                <p className="text-slate-dark text-xs mt-1 leading-tight">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="border-t border-dark-100 p-3">
          <Link
            href="/services"
            className="flex items-center text-accent text-sm font-medium hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Lihat Semua Layanan
            <i className="fas fa-arrow-right ml-2 text-xs"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
