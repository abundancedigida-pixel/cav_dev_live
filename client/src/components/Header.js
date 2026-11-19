"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import CavLogo from "@/assets/Logo.svg";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About us", path: "/about-us" },
  { label: "Properties", path: "/properties" },
  { label: "Tailor Made", path: "/tailor-made" },
  { label: "Projects", path: "/projects" },
  { label: "Pre-cast Homes", path: "/pre-cast-homes" },
  { label: "Blog", path: "/blog" },
  { label: "Contact us", path: "/contact-us" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  // lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="bg-[#0B1F3A] w-full min-w-0 sticky top-0 left-0 z-50">
      <div className="w-full min-w-0 max-w-[1500px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1220px] 2xl:max-w-[1500px] mx-auto flex items-center justify-between px-3 sm:px-3 lg:px-4 xl:px-10 h-[68px] md:h-[76px] xl:h-[80px]">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src={CavLogo}
            alt="Canaan Avenue Ventures"
            className="h-10 md:h-12 xl:h-14 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-6 2xl:gap-9 mx-auto">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.path}
              className={`relative py-2 text-[13px] 2xl:text-sm font-light tracking-wide whitespace-nowrap transition-colors duration-200 ${
                isActive(link.path)
                  ? "text-white after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-white/80"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden xl:flex items-center shrink-0">
          <Link
            href="/contact-us"
            className="group inline-flex items-center gap-3 bg-white text-[#0B1F3A] text-[13px] font-bold uppercase tracking-wide px-5 py-3  transition-colors duration-200 whitespace-nowrap"
          >
            Book a Consultation
            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Mobile / Tablet right side */}
        <div className="flex items-center gap-2 xl:hidden">
          <Link
            href="/contact-us"
            className="hidden md:inline-flex items-center gap-2 bg-white text-[#0B1F3B] text-xs font-semibold uppercase tracking-wide px-4 py-2.5 whitespace-nowrap"
          >
            Book a Consultation
            <ArrowUpRight size={13} />
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded-md text-white hover:bg-white/10 transition-colors duration-200"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`xl:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-hidden="true"
      />

      {/* Slide-in drawer (mobile + tablet) */}
      <aside
        className={`xl:hidden fixed top-0 right-0 z-[70] h-dvh w-[86%] max-w-[380px] sm:max-w-[420px] bg-[#0B1F3B] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
      >
        {/* Drawer top */}
        <div className="flex items-center justify-between px-5 sm:px-7 h-[68px] md:h-[76px] border-b border-white/10 shrink-0">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Image
              src={CavLogo}
              alt="Canaan Avenue Ventures"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-md text-white hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X size={26} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-5 sm:px-7 py-4">
          <ul className="flex flex-col">
            {navLinks.map((link, i) => (
              <li key={link.label} className="border-b border-white/10">
                <Link
                  href={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between py-4 text-[17px] sm:text-lg font-medium tracking-wide transition-colors ${
                    isActive(link.path)
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <span className="text-xs text-white/40 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </span>
                  {isActive(link.path) && (
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer CTA */}
        <div className="px-5 sm:px-7 py-5 border-t border-white/10 shrink-0">
          <Link
            href="/contact-us"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-3 w-full bg-white text-[#0B1F3B] text-sm font-semibold uppercase tracking-wide px-5 py-3.5"
          >
            Book a Consultation
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </aside>
    </header>
  );
};

export default Header;
