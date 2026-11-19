"use client";
import {
  Container,
  Reveal,
  WordReveal,
  ParallaxImage,
  Eyebrow,
  SERIF,
  SANS,
} from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";
const Img = cloudinary.about.growth;

const sectors = [
  "Residential Enclaves",
  "Luxury Custom Villas",
  "Masterplanned Apartments",
  "IT Parks & Campuses",
  "Grade-A Commercial",
  "Custom Turnkey Estates",
];

const AtelierOrigin = () => {
  return (
    <section
      className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16 md:py-20`}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3">
              <Eyebrow className="!text-[10px] !font-semibold !tracking-[0.18em]">
                Atelier Origin &amp; Growth
              </Eyebrow>
              <span className="h-px w-8 bg-[#164A7A]/40" />
            </div>

            <h2
              className={`${SERIF} mt-5 text-[#0B1F3A] text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1]`}
            >
              <span className="block">
                <WordReveal text="Built on Experience." />
              </span>
              <span className="block">
                <WordReveal text="Driven by Better Ideas." delay={0.25} />
              </span>
            </h2>

            <Reveal delay={0.2} className="mt-6 max-w-xl space-y-5">
              <p className="text-[15px] leading-[1.75] text-[#4F5963]">
                Vanguard &amp; Co. emerged from a generational commitment to
                tectonic purity and uncompromising structural craftsmanship.
                What commenced as an artisanal masonry and structural
                consultancy has transformed into one of India&apos;s most
                rigorous architectural development enterprises.
              </p>
              <p className="text-[15px] leading-[1.75] text-[#4F5963]">
                Across the high-velocity urban landscapes of Bengaluru,
                Hyderabad, Mumbai, and the National Capital Region, our studio
                merges European precast discipline with indigenous climate
                responsive design. We orchestrate every dimension from site
                excavation and high-strength concrete pours to custom teak
                joinery and computational facade optimization.
              </p>
            </Reveal>

            <Reveal delay={0.35} className="mt-6 sm:mt-7 w-full min-w-0">
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-[#171C22]">
                Core Sectors of Operation
              </p>

              <ul className="mt-3 flex flex-wrap items-start gap-2 w-full max-w-xl">
                {sectors.map((s) => (
                  <li
                    key={s}
                    className="max-w-full bg-[#EEF1FB] px-2.5 py-2 sm:px-3 sm:py-2.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.05em] sm:tracking-[0.08em] leading-relaxed text-[#0B1F3A] transition-colors duration-300 hover:bg-[#0B1F3A] hover:text-white break-words"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right: image + callout */}
          <div className="relative pb-16 sm:pb-12 lg:ml-6">
            <div className="bg-[#EAEFF8] pt-5 sm:pt-6 shadow-[0_24px_60px_-30px_rgba(11,31,58,0.35)]">
              <div className="relative">
                <ParallaxImage
                  src={Img}
                  alt="Team reviewing architectural drawings on a rooftop deck at dusk"
                  className="h-[300px] sm:h-[380px] lg:h-[330px] w-full"
                  strength={6}
                  reveal={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0B1F3A99] via-transparent to-transparent" />
                <div className="absolute top-4 left-4 right-4">
                  <p className="text-sm sm:text-base md:text-lg text-white">
                    Jubilee Hills Sky Sanctuary &bull; On-Site Verification
                    Review
                  </p>
                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#E8C27A]">
                    Field Operations &bull; Elevation Deck
                  </p>
                </div>
              </div>
            </div>

            <Reveal
              delay={0.4}
              y={30}
              className="absolute bottom-0 left-0 sm:-left-6 lg:-left-8"
            >
              <div className="w-[270px] sm:w-[290px] bg-[#0B1F3A] p-5 shadow-2xl">
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#E8C27A]">
                  Field Tolerance Standard
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-[#DEE3EB]">
                  Laser-guided robotic total station measurements accurate to
                  within &plusmn;1.5mm tolerance on load-bearing cantilevers.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AtelierOrigin;
