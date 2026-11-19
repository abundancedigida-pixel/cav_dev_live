"use client";
import Image from "next/image";
import { Hammer, Layers, Sun } from "lucide-react";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";
const IMG = cloudinary.tailorMade.differ;

const items = [
  {
    Icon: Hammer,
    title: "Timber & Teak Joinery",
    text: "Seasoned hardwood frames, carved decorative jali screens, and tactile entrance portals engineered for tropical humidity and thermal stability.",
  },
  {
    Icon: Layers,
    title: "Natural Stone & Masonry",
    text: "Chiseled Sadahalli granite plinths, leathered travertine, exposed clay brickwork, and honed marble slabs laid with hairline joints.",
  },
  {
    Icon: Sun,
    title: "Climate & Acoustic Glazing",
    text: "Double-glazed thermal break assemblies, deep veranda overhangs, and recessed openings that dampen external noise while bathing interiors in soft natural light.",
  },
];

const ArtisanalDetails = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-12 md:py-16`}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <Eyebrow className="!text-[9px] !font-semibold !tracking-[0.22em]">Artisanal Rigor</Eyebrow>
            <h2 className={`${SERIF} mt-3 max-w-md text-[#0B1F3A] text-3xl md:text-4xl lg:text-5xl leading-[1.12]`}>
              <WordReveal text="The Details Make a Difference." />
            </h2>
            <Reveal delay={0.2} className="mt-5 max-w-xl">
              <p className="text-[15px] leading-[1.75] text-[#44474D]">
                Materials, finishes, fittings, and construction specifications influence the character and
                functionality of a home. These choices should be discussed in relation to the project brief,
                technical requirements, and agreed scope.
              </p>
            </Reveal>

            <div className="mt-8 max-w-xl">
              {items.map(({ Icon, title, text }, i) => (
                <Reveal key={title} delay={i * 0.1} y={24}>
                  <div className="group border-b border-[#EDEBE4] px-3 py-4 transition-colors duration-300 hover:bg-[#F7F8FD]">
                    <h3 className="flex items-center gap-2 text-base font-medium text-[#0B1F3A]">
                      <Icon size={15} className="text-[#1B4B7F]" />
                      {title}
                    </h3>
                    <p className="mt-1.5 pl-[23px] text-xs leading-relaxed text-[#44474D]">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal y={50} delay={0.15}>
            <div className="group relative h-[320px] sm:h-[400px] lg:h-[450px] overflow-hidden shadow-[0_28px_60px_-30px_rgba(11,31,58,0.4)]">
              <Image
                src={IMG}
                alt="Artisans hand-finishing carved timber jali screens at a construction site"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3AE6] via-[#0B1F3A00] to-[#0B1F3A00]" />
              <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
                <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-white">On-site Execution</p>
                <p className="mt-1 text-base sm:text-lg font-medium text-white">Hand-Finished Stone &amp; Timber Details</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default ArtisanalDetails;