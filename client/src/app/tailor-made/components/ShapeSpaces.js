"use client";
import Image from "next/image";
import { Check } from "lucide-react";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";
const Img1 = cloudinary.tailorMade.homeOne;
const Img2 = cloudinary.tailorMade.homeTwo;
const Img3 = cloudinary.tailorMade.homeThree;
const Img4 = cloudinary.tailorMade.homeFour;

const rows = [
  {
    tag: "01 / Volume & Circulation",
    title: "Layout and Space Planning",
    text: "Explore how rooms, circulation, privacy, and shared spaces can work together around your household’s daily rhythms. Create fluid open-concept living while preserving serene, acoustic boundaries for bedrooms and studies.",
    points: ["Optimised natural light ingress & wind tunnels", "Zoned separation for guests, staff, and private quarters"],
    img: Img1,
    alt: "Double-height living space with a central courtyard and floor plan overlay",
  },
  {
    tag: "02 / Structural Identity",
    title: "Exterior Architecture",
    text: "Discuss the architectural character of your home, from clean monolithic contemporary forms with cantilevered eaves to timeless tropical residential styles incorporating vernacular courtyards and deep verandas.",
    points: ["Locally sourced stone masonry & durable timber louvers", "Climate-responsive shading projections and overhangs"],
    img: Img2,
    alt: "Contemporary villa with cantilevered roof reflected in a pool at dusk",
  },
  {
    tag: "03 / Material Tactility",
    title: "Interiors and Finishes",
    text: "Explore the look and feel of your living spaces, including tactile materials, natural colour palettes, ceiling treatments, and finish preferences curated to mature gracefully across generations.",
    points: ["Tailored stone floor patterns & bespoke artisan plaster", "Architectural cove lighting and bronze hardware accents"],
    img: Img3,
    alt: "Warm living room with natural plaster and timber joinery",
  },
  {
    tag: "04 / Everyday Rituals",
    title: "Functional Living",
    text: "Consider the practical details that shape everyday life: seamless hidden storage, climate-controlled walk-in pantries, quiet professional home offices, and open courtyards designed for barefoot indoor-outdoor living.",
    points: ["Integration of EV charging, solar conduits & smart energy systems", "Acoustic buffering between entertainment zones and suites"],
    img: Img4,
    alt: "Open timber pavilion overlooking a koi pond and tropical garden",
  },
];

const ShapeSpaces = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#EFF3FC] py-12 md:py-16`}>
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Eyebrow className="!text-[9px] !font-medium !tracking-[0.15em]">Your home, considered in detail</Eyebrow>
          <h2 className={`${SERIF} mt-3 text-[#0B1F3A] text-3xl sm:text-4xl lg:text-5xl leading-[1.12]`}>
            <WordReveal text="Shape the Spaces That Matter Most." />
          </h2>
          <Reveal delay={0.2} className="mt-3">
            <p className="text-sm leading-relaxed text-[#44474D]">
              From the foundational plot footprint to the tactile tact of raw materials, every layer of your
              future home is open to collaborative definition.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 md:mt-12 space-y-8 md:space-y-10">
          {rows.map((r, i) => {
            const imageRight = i % 2 === 1;
            return (
              <Reveal key={r.title} y={50}>
                <div className="group grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10 bg-white p-5 md:p-7 shadow-[0_2px_12px_-8px_rgba(11,31,58,0.25)]">
                  <div className={`relative h-[240px] sm:h-[300px] md:h-[330px] overflow-hidden ${imageRight ? "md:order-2" : ""}`}>
                    <Image
                      src={r.img}
                      alt={r.alt}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className={`${imageRight ? "md:order-1" : "md:pl-2"}`}>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#336192]">{r.tag}</p>
                    <h3 className={`${SERIF} mt-3 text-2xl md:text-[32px] leading-tight text-[#0B1F3A]`}>{r.title}</h3>
                    <p className="mt-3 max-w-lg text-[15px] leading-[1.75] text-[#44474D]">{r.text}</p>
                    <ul className="mt-5 space-y-2">
                      {r.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-[13px] text-[#171C22]">
                          <Check size={13} className="mt-1 shrink-0 text-[#336192]" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal y={20} className="mt-8">
          <p className="mx-auto bg-[#E8EDF6] px-5 py-4 text-center text-xs leading-relaxed text-[#44474D]">
            <strong className="font-semibold text-[#171C22]">Architectural Advisory:</strong> Design
            considerations for collaborative exploration. Final specifications, structural configurations, and
            scope depend on site feasibility, statutory bylaws, and the agreed project brief.
          </p>
        </Reveal>
      </Container>
    </section>
  );
};

export default ShapeSpaces;