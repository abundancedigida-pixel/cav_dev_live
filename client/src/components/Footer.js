"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import CavLogo from "@/assets/Logo.svg";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about-us" },
  { label: "Properties", href: "/properties" },
  { label: "Projects", href: "/projects" },
  { label: "Tailor-Made Homes", href: "/tailor-made" },
  { label: "Pre-Cast Homes", href: "/pre-cast-homes" },
  { label: "Blog", href: "/blog" },
  { label: "Contact us", href: "/contact-us" },
];

const initiatives = [
  { label: "Abundance Mindset Community", href: "/projects" },
  { label: "Abundance Luxury Villas", href: "/projects" },
  { label: "Abundance Tech Park", href: "/projects" },
  { label: "Abundance Sports Park", href: "/projects" },
  { label: "Abundance Residencies", href: "/projects" },
];

const offices = [
  {
    title: "Bengaluru Headquarters",
    lines: [
      "Vanguard Atelier, Level 14,",
      "The Oberoi Enclave, MG",
      "Road, Bengaluru 560001",
    ],
  },
  {
    title: "Hyderabad Atelier",
    lines: ["Road No. 36, Jubilee Hills,", "Hyderabad 500033"],
  },
  {
    title: "Mumbai Gallery",
    lines: ["Maker Chambers VI,", "Nariman Point, Mumbai", "400021"],
  },
  {
    title: "Global NRI Desk",
    lines: [
      "Dedicated Advisors for",
      "UAE, UK, Singapore &",
      "North America:",
      "nri@vanguard.co",
    ],
  },
];

const socials = [
  { label: "Instagram", href: "#", Icon: FaInstagram },
  { label: "Facebook", href: "#", Icon: FaFacebookF },
  { label: "Twitter", href: "#", Icon: FaTwitter },
];

/* Accordion on mobile, always-open column on md+ */
const FooterColumn = ({ title, children, className = "" }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b border-white/10 md:border-0 ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-4 md:py-0 md:mb-5 md:cursor-default text-left"
      >
        <span className="text-white text-[13px] font-semibold uppercase tracking-[0.12em]">
          {title}
        </span>
        <ChevronDown
          size={18}
          className={`md:hidden text-white/60 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out md:block ${
          open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        } md:grid-rows-none md:pb-0`}
      >
        <div className="overflow-hidden md:overflow-visible">{children}</div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full min-w-0 overflow-hidden">
      <div className="w-full mx-auto max-w-[1500px] px-5 sm:px-6 md:px-8 lg:px-8 xl:px-10 pt-12 md:pt-14 pb-6">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1.1fr_1.6fr] gap-x-8 lg:gap-x-10 gap-y-2 md:gap-y-10 pb-10 md:pb-12">
          {/* Brand */}
          <div className="min-w-0 md:col-span-2 lg:col-span-1 space-y-6 mb-6 md:mb-0 text-center md:text-left">
            <Link
              href="/"
              className="inline-flex flex-wrap items-center gap-3 justify-center md:justify-start max-w-full"
            >
              <Image
                src={CavLogo}
                alt="Canaan Avenue Ventures"
                className="h-12 md:h-14 w-auto object-contain shrink-0"
              />
              <span className="text-sm sm:text-base xl:text-lg font-medium uppercase tracking-[0.12em] leading-tight">
                Canaan Avenue Ventures
              </span>
            </Link>

            <p className="text-[15px] leading-relaxed text-[#7587A7] max-w-md mx-auto md:mx-0 lg:max-w-[380px]">
              Pioneers of monolithic architectural luxury, custom residential
              estates, and generational sanctuaries across India&apos;s premier
              metropolises. Engineering permanence with uncompromising craft.
            </p>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#EEF1FB] text-[#0B1F3B] flex items-center justify-center hover:bg-white hover:scale-105 transition"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                Architectural Accreditations
              </p>
              <p className="text-sm leading-relaxed text-[#7587A7]">
                Council of Architecture (CoA) Registered • IGBC Platinum
                Certified Developer • CREDAI Apex Member
              </p>
            </div>
          </div>

          {/* Navigation */}
          <FooterColumn title="Navigation">
            <ul className="space-y-2.5 text-sm">
              {navigation.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[#7587A7] hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Our Initiatives */}
          <FooterColumn title="Our Initiatives">
            <div className="space-y-3">
              <Link
                href="/projects"
                className="block rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition-colors py-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-serif text-[15px] font-semibold tracking-wide">
                    UNIQUE 70
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider text-[#D9A441] bg-[#D9A441]/15 px-2 py-0.5 rounded">
                    ELITE
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] leading-snug text-[#7587A7]">
                  THE FIRST 70 · India&apos;s Founding Elite Homes
                </p>
              </Link>

              <ul className="space-y-2.5 text-sm">
                {initiatives.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[#7587A7] hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </FooterColumn>

          {/* Regional offices */}
          <FooterColumn
            title="Regional Offices & NRI Desk"
            className="md:col-span-2 lg:col-span-1"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
              {offices.map((o) => (
                <div key={o.title} className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                    {o.title}
                  </p>
                  <address className="not-italic text-sm leading-relaxed text-[#7587A7]">
                    {o.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              ))}
            </div>
          </FooterColumn>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 text-sm text-[#8A9BC0] text-center sm:text-left">
          <p>
            Developed by{" "}
            <Link
              href="https://www.digida.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white text-[15px] font-extrabold transition-colors"
            >
              DigiDa
            </Link>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              href="/privacy-policy"
              target="_blank"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              target="_blank"
              className="hover:text-white transition-colors"
            >
              Terms of Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
