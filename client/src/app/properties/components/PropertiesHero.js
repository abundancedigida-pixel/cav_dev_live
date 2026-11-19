"use client";
import { useState, useMemo } from "react";
// import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Building2, Clock, CheckCircle2, BadgeCheck, ArrowUpDown } from "lucide-react";
import {
  Container,
  ParallaxImage,
  WordReveal,
  Reveal,
  EASE,
  SANS,
} from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";

const IMG = cloudinary.properties.hero;
const trust = ["Transparent Documentation", "Quality Precast Construction", "Professional Project Management"];

const PropertiesHero = ({ properties = [], total = 0, onSearch }) => {
  // Extract unique filter options from backend response
  const dynamicFilters = useMemo(() => {
    const locations = ["All Locations", ...new Set(properties.map((p) => p.location).filter(Boolean))];
    const types = ["All Types", ...new Set(properties.map((p) => p.propertyType).filter(Boolean))];
    const statuses = ["All Statuses", ...new Set(properties.map((p) => p.developmentStatus).filter(Boolean))];

    return [
      { key: "location", label: "Location", Icon: MapPin, options: locations },
      { key: "type", label: "Property Type", Icon: Building2, options: types },
      { key: "availability", label: "Availability", Icon: Clock, options: statuses },
      {
        key: "sort",
        label: "Price Filter",
        Icon: ArrowUpDown,
        options: ["Default", "Price: Low to High", "Price: High to Low"],
      },
    ];
  }, [properties]);

  const [values, setValues] = useState({
    location: "All Locations",
    type: "All Types",
    availability: "All Statuses",
    sort: "Default",
  });

  return (
    <section className={`${SANS} relative isolate w-full min-w-0 overflow-hidden bg-[#0B1F3A] flex`}>
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <ParallaxImage
          src={IMG}
          alt="Modern living space with floor-to-ceiling windows"
          className="h-full w-full"
          strength={10}
          reveal={false}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061525CC] via-[#0615258F] to-[#06152526]" />
      </div>

      <Container className="relative flex flex-col justify-center pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="flex items-center justify-between gap-3"
        >
          <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8C27A]" />
            Abundance Homes
          </p>
          <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-1.5 text-xs text-white backdrop-blur-sm">
            <BadgeCheck size={12} /> {total} Properties Listed
          </span>
        </motion.div>

        <h1 className="mt-8 max-w-2xl font-light text-white tracking-[-0.03em] leading-[1.05] text-4xl md:text-5xl lg:text-6xl">
          <span className="block">
            <WordReveal text="Find Your" delay={0.3} stagger={0.1} />
          </span>
          <span className="block">
            <WordReveal text="Abundance." delay={0.5} stagger={0.1} />
          </span>
        </h1>

        <Reveal delay={0.8} y={24} className="mt-6 max-w-2xl">
          <p className="text-base md:text-lg font-light leading-relaxed text-white">
            Discover thoughtfully planned, fully furnished homes designed for comfortable living, built with
            quality precast construction and delivered with confidence.
          </p>
        </Reveal>

        {/* Search card */}
        <Reveal delay={1} y={30} className="mt-10 md:mt-12">
          <div className="bg-white p-5 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {dynamicFilters.map(({ key, label, Icon, options }) => (
                <label key={key} className="block">
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#44474D]">
                    <Icon size={12} /> {label}
                  </span>
                  <select
                    value={values[key]}
                    onChange={(e) => {
                      const updated = { ...values, [key]: e.target.value };
                      setValues(updated);
                      onSearch?.(updated);
                    }}
                    className="mt-2 w-full border border-[#D9D6CC] bg-white px-4 py-3.5 text-sm md:text-base text-[#171C22]"
                  >
                    {options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </label>
              ))}

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => onSearch?.(values)}
                  className="flex w-full items-center justify-between gap-4 bg-[#0B1F3A] px-6 py-4 text-xs font-medium uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#164A7A]"
                >
                  Explore Homes
                  <span className="text-base">({total})</span>
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {trust.map((t) => (
                  <li key={t} className="flex items-center gap-1.5 text-[13px] text-[#171C22]">
                    <CheckCircle2 size={14} className="text-[#1B4B7F]" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="text-[10px] font-medium uppercase tracking-wide text-[#44474D]">
                Total Properties: {total}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default PropertiesHero;