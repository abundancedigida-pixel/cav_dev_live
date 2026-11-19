"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { MessageCircle, Phone, CalendarCheck, X } from "lucide-react";

// TODO: replace with the real Canaan Avenue Ventures number (country code, no + or spaces)
const PHONE = "919999999999";

const WHATSAPP_MESSAGE = `Hello Canaan Avenue Ventures team,

I'm contacting you through your website and I'm interested in your homes and developments.

Please share the available properties, pricing and other details.

Thank you.`;

const EASE = [0.22, 1, 0.36, 1];

const actions = [
  {
    label: "Book a Consultation",
    href: "/contact-us#form",
    Icon: CalendarCheck,
    internal: true,
  },
  {
    label: "Call Us",
    href: `tel:+${PHONE}`,
    Icon: Phone,
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    Icon: FaWhatsapp,
    external: true,
    accent: true,
  },
];

const FloatingChat = () => {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  // appear after a short delay / first scroll so it doesn't fight the hero animation
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1800);
    const onScroll = () => {
      if (window.scrollY > 120) setReady(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // hide while footer is in view
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hidden = !ready || footerVisible;

  return (
    <motion.div
      initial={false}
      animate={{ opacity: hidden ? 0 : 1, y: hidden ? 24 : 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`fixed bottom-5 right-4 sm:bottom-8 sm:right-6 z-40 flex flex-col items-end gap-2.5 ${
        hidden ? "pointer-events-none" : ""
      }`}
    >
      <AnimatePresence>
        {open &&
          actions.map(
            ({ label, href, Icon, internal, external, accent }, i) => {
              const idx = actions.length - 1 - i; // stagger from the toggle upward
              const content = (
                <>
                  <span className="hidden sm:block bg-white text-[#0B1F3A] text-[11px] font-bold uppercase tracking-[0.14em] px-3.5 py-2.5 shadow-[0_12px_30px_-12px_rgba(11,31,58,0.5)] whitespace-nowrap transition-colors duration-300 group-hover:bg-[#FFDEA9]">
                    {label}
                  </span>
                  <span
                    className={`flex h-12 w-12 items-center justify-center shadow-[0_12px_30px_-10px_rgba(11,31,58,0.6)] transition-colors duration-300 ${
                      accent
                        ? "bg-[#E8C27A] text-[#0B1F3A] group-hover:bg-white"
                        : "bg-[#0B1F3A] text-[#E8C27A] group-hover:bg-[#164B7E] group-hover:text-white"
                    }`}
                  >
                    <Icon size={19} />
                  </span>
                </>
              );
              const cls = "group flex items-center gap-2";
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 24, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 24, scale: 0.9 }}
                  transition={{ duration: 0.45, delay: idx * 0.07, ease: EASE }}
                >
                  {internal ? (
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      aria-label={label}
                      className={cls}
                    >
                      {content}
                    </Link>
                  ) : (
                    <a
                      href={href}
                      aria-label={label}
                      className={cls}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {content}
                    </a>
                  )}
                </motion.div>
              );
            },
          )}
      </AnimatePresence>

      {/* Toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close contact options" : "Open contact options"}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#164A7A] to-[#0B1F3A] text-white shadow-[0_8px_30px_rgba(11,31,58,0.35)] border border-[#E8C27A]/40 transition-all duration-300 hover:scale-110 hover:shadow-[0_10px_35px_rgba(232,194,122,0.3)]"
      >
        <span className="relative flex h-6 w-6 items-center justify-center text-[#E8C27A]">
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute"
              >
                <X size={20} />
              </motion.span>
            ) : (
              <motion.span
                key="m"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute"
              >
                <MessageCircle size={20} />
              </motion.span>
            )}
          </AnimatePresence>
          {/* live pulse */}
          {!open && (
            <span className="absolute inset-0 rounded-full border border-[#E8C27A]/50 animate-ping opacity-30" />
          )}
        </span>

        <span className="hidden sm:block text-[11px] font-bold uppercase tracking-[0.16em]">
          {open ? "" : ""}
        </span>
      </button>
    </motion.div>
  );
};

export default FloatingChat;
