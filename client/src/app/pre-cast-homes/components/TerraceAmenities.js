"use client";
import Image from "next/image";
import { Waves, Dumbbell, Info } from "lucide-react";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";
const PoolImg = cloudinary.preCastHome.roofOne;
const GymImg =cloudinary.preCastHome.roofTwo;

const cards = [
  {
    img: PoolImg,
    alt: "Rooftop pool with sunken lounge and fire pit",
    title: "Swimming Pool & Sunken Lounge",
    Icon: Waves,
    text: "Engineered with modular fiberglass shell or composite tiled finish, water recycling filtration pumps, and load-reinforced precast substructure. Creates an elevated personal sanctuary for relaxation.",
    left: "Available on Duplex & Villa",
    right: "Custom Sizing Feasible",
  },
  {
    img: GymImg,
    alt: "Glass-wrapped rooftop gym and yoga deck",
    title: "Wellness Rooftop Gym & Yoga Deck",
    Icon: Dumbbell,
    text: "Glass-wrapped structural pavilion equipped for modern endurance equipment, climate control, and anti-vibration composite flooring. Seamlessly transitions into an open-air yoga observation veranda.",
    left: "Available on all G+1 Units",
    right: "Acoustic Glazing Included",
  },
];

const TerraceAmenities = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-12 md:py-16`}>
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <div>
            <Eyebrow className="!text-[9px] !font-semibold !tracking-[0.2em]">Modular Rooftop Innovation</Eyebrow>
            <h2 className={`${SERIF} mt-2 text-[#0B1F3A] uppercase text-3xl md:text-4xl lg:text-5xl leading-[1.1]`}>
              <WordReveal text="Terrace Amenities" />
            </h2>
          </div>
          <Reveal delay={0.2} className="lg:text-right">
            <span className="inline-block bg-[#0B1F3A] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#FFDEA9]">
              Live luxuriously. Live sustainably.
            </span>
            <p className="mt-2 text-xs text-[#44474D]">
              Turnkey luxury additions engineered for high load-bearing precast floor slabs.
            </p>
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.12} y={50}>
              <div className="group flex h-full flex-col bg-[#EEF3FC]">
                <div className="relative h-[260px] sm:h-[320px] overflow-hidden">
                  <Image
                    src={c.img}
                    alt={c.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 bg-[#0B1F3A] px-5 py-4">
                  <h3 className="text-sm sm:text-base font-semibold uppercase tracking-wide text-white">{c.title}</h3>
                  <c.Icon size={18} className="shrink-0 text-[#FFDEA9]" />
                </div>
                <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
                  <p className="max-w-md text-xs leading-[1.8] text-[#44474D]">{c.text}</p>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#D5DCEA] pt-4 mt-5 text-[8px] sm:text-[9px]">
                    <span className="font-semibold uppercase tracking-[0.08em] text-[#171C22]">{c.left}</span>
                    <span className="font-semibold tracking-[0.08em] text-[#336192]">{c.right}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal y={20} className="mt-6">
          <p className="flex items-center justify-center gap-2 bg-[#F4F5F9] px-4 py-3.5 text-center text-xs leading-relaxed text-[#44474D]">
            <Info size={13} className="shrink-0 text-[#336192]" />
            Terrace amenities represent optional architectural upgrades configured to your blueprint. Site soil
            load bearing capacity and municipal building height guidelines apply.
          </p>
        </Reveal>
      </Container>
    </section>
  );
};

export default TerraceAmenities;