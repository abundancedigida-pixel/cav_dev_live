"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";
const Img2BHK = cloudinary.projectDetails.layout;
const Img3BHK = cloudinary.projectDetails.layout;

const homes = [
  {
    n: "01",
    title: "2BHK Architectural Residence",
    badge: "2 Bedrooms · 2 Baths",
    tag: "2BHK Typology",
    img: Img2BHK,
    alt: "2BHK ground and first floor plans",
    points: [
      "Foyer entrance opening into expansive living and dining hall",
      "Master bedroom with en-suite bath and acoustic isolation",
      "Separate dry utility yard adjacent to granite kitchen counter",
      "Private covered car parking plinth with Kota stone flooring",
    ],
    rooms: [
      ["Living", "10'3\" x 15'"],
      ["Dining", "7'3\" x 9'"],
      ["Kitchen", "9' x 8'"],
      ["Bedroom", "11' x 12'9\""],
      ["Restroom", "7' x 4'"],
      ["Terrace", "13'3\" x 14'3\""],
      ["Car Parking", "10' x 15'"],
    ],
  },
  {
    n: "02",
    title: "3BHK Courtyard Villa",
    badge: "3 Bedrooms · 3 Baths",
    tag: "3BHK Typology",
    img: Img3BHK,
    alt: "3BHK ground and first floor plans",
    points: [
      "Internal lightwell courtyard providing central daytime illumination",
      "Master suite with walk-in dressing alcove and premium bath partition",
      "Covered garden verandah seamlessly connected to formal living",
      "Dual car parking plinth with Kota stone flooring and paved apron",
    ],
    rooms: [
      ["Living", "10'3\" x 15'"],
      ["Dining", "7'3\" x 9'"],
      ["Kitchen", "9' x 8'"],
      ["Bedroom 1", "11' x 12'9\""],
      ["Bedroom 2", "11' x 12'9\""],
      ["Bedroom 3", "15' x 10'6\""],
      ["Car Parking", "10' x 15'"],
    ],
  },
];

const HomeCard = ({ h }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-full flex-col border border-[#E6E4DC] bg-white p-5 sm:p-6 shadow-[0_2px_12px_-6px_rgba(11,31,58,0.15)]">
      <div className="flex items-start justify-between gap-3 border-b border-[#EDEBE4] pb-4">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#336192]">Configuration {h.n}</p>
          <h3 className="mt-2 text-lg sm:text-xl font-medium text-[#0B1F3A]">{h.title}</h3>
        </div>
        <span className="shrink-0 bg-[#E8EDF6] px-2.5 py-1.5 text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.1em] text-[#171C22]">
          {h.badge}
        </span>
      </div>

      <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden border border-[#EDEBE4] bg-white">
        <Image
          src={h.img}
          alt={h.alt}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-contain"
        />
        <span className="absolute right-0 top-[18%] hidden sm:block bg-[#050A1A] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-white">
          {h.tag}
        </span>
      </div>

      <ul className="mt-5 space-y-2.5">
        {h.points.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-[13px] text-[#171C22]">
            <CircleCheck size={15} className="mt-0.5 shrink-0 text-[#336192]" />
            {p}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="w-full border border-[#0B1F3A] px-6 py-3.5 text-[10px] font-medium uppercase tracking-wide text-[#0B1F3A] transition-colors duration-300 hover:bg-[#0B1F3A] hover:text-white"
        >
          {open ? "Hide room dimensions" : "View detailed room dimensions"}
        </button>
        <div className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] pt-4" : "grid-rows-[0fr]"}`}>
          <ul className="overflow-hidden space-y-1.5 text-[12px] text-[#44474D]">
            {h.rooms.map(([room, size]) => (
              <li key={room} className="flex items-center justify-between border-b border-[#EDEBE4] pb-1.5">
                <span>{room}</span>
                <span className="font-semibold text-[#0B1F3A]">{size}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const HomeLayouts = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-12 md:py-16`}>
      <Container>
        <Eyebrow className="!text-[9px] !font-medium !tracking-[0.15em]">Designed Around Living</Eyebrow>
        <h2 className={`${SERIF} mt-3 max-w-md text-[#0B1F3A] text-3xl sm:text-4xl lg:text-5xl leading-[1.12]`}>
          <WordReveal text="Space for the Life You Imagine." />
        </h2>
        <Reveal delay={0.2} className="mt-3 max-w-md">
          <p className="text-sm leading-relaxed text-[#44474D]">
            Explore the proposed 2BHK and 3BHK home layouts prepared for the UNIQUE 70 development.
          </p>
        </Reveal>

        <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
          {homes.map((h, i) => (
            <Reveal key={h.n} delay={i * 0.12} y={50}>
              <HomeCard h={h} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HomeLayouts;