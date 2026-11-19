"use client";
import Image from "next/image";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";
import GroupOne from "@/assets/HomeImages/GROUP1.webp";
import GroupTwo from "@/assets/HomeImages/GROUP2.webp";
import GroupThree from "@/assets/HomeImages/GROUP3.webp";
import GroupFour from "@/assets/HomeImages/GROUP4.webp";

const Panel = ({ label, text, big = false }) => (
  <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 bg-[#0B1F3AE5] backdrop-blur-sm px-5 py-5 sm:px-6 transition-transform duration-500 group-hover:-translate-y-1.5">
    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8C27A]">{label}</p>
    <p className={`mt-2 text-white leading-snug ${big ? "text-xl md:text-2xl" : "text-base md:text-[17px]"}`}>
      {text}
    </p>
  </div>
);

const Tile = ({ img, className = "", children, gray = false, delay = 0 }) => (
  <Reveal delay={delay} y={50} className={className}>
    <div className="group relative h-full min-h-[260px] lg:min-h-0 overflow-hidden bg-[#E7E5DE]">
      <Image
        src={img}
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={`object-cover transition-transform duration-[1600ms] shadow-[#0000000D] ease-out group-hover:scale-[1.06] ${
          gray ? "grayscale" : ""
        }`}
      />
      {children}
    </div>
  </Reveal>
);

const AbundanceGroup = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#F1F0EB] pt-8 pb-16`}>
      <Container>
        <Eyebrow>Abundance Group</Eyebrow>
        <h2 className={`${SERIF} mt-4 text-[#0B1F3A] text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1]`}>
          <WordReveal text="One Vision. Many Ways to Create Abundance." />
        </h2>
        <Reveal delay={0.2} className="mt-4">
          <p className="text-[15px] text-[#4F5963] leading-relaxed">
            An ecosystem of spaces, developments and experiences designed around better living,
            working, health, recreation and community.
          </p>
        </Reveal>

        <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.57fr_1fr_1fr] lg:grid-rows-[200px_200px_162px] gap-6 lg:gap-x-8">
          <Tile img={GroupOne} className="md:col-span-2 lg:col-span-1 lg:row-span-3 lg:row-start-1" >
            <Panel
              big
              label="Abundance Villas"
              text="Premium residential communities and independent homes."
            />
          </Tile>

          <Tile img={GroupTwo} delay={0.1} className="lg:col-start-2 lg:row-start-1">
            <Panel label="Abundance Tech Park" text="Modern environments for technology, business and innovation." />
          </Tile>

          <Tile img={GroupThree} gray delay={0.2} className="lg:col-start-3 lg:row-start-1">
            <Panel label="Abundance Medi Park" text="Purpose-built spaces supporting healthcare and medical development." />
          </Tile>

          <Tile img={GroupFour} delay={0.1} className="md:col-span-2 lg:col-span-2 lg:col-start-2 lg:row-start-2">
            <Panel label="Abundance Sports Park" text="Spaces designed around sports, wellness, recreation and community." />
          </Tile>

          <Reveal delay={0.2} y={50} className="md:col-span-2 lg:col-span-2 lg:col-start-2 lg:row-start-3">
            <div className="group relative h-full min-h-[180px] bg-[#0B1F3A] px-6 sm:px-8 py-8 flex flex-col justify-center overflow-hidden">
              <span className="absolute inset-y-0 left-0 w-1 bg-[#E8C27A] origin-top scale-y-0 transition-transform duration-700 group-hover:scale-y-100" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8C27A]">
                Abundance Mindset Community
              </p>
              <p className="mt-3 text-white text-xl md:text-2xl leading-snug max-w-3xl">
                A broader community built around Solutions, Convenience and Experience.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default AbundanceGroup;