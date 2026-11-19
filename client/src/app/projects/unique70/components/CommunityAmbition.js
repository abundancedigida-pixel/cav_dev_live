"use client";
import { Container, Reveal, WordReveal, ParallaxImage, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";
const IMG = cloudinary.projectDetails.ambition;

const traits = [
  { t: "Quiet Demeanor", s: "Absence of loud commercial traffic or speculative churn." },
  { t: "Family Anchor", s: "Crafted to be held and passed down across generations." },
];

const CommunityAmbition = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-12 md:py-16`}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: image card */}
          <Reveal y={50}>
            <div className="border border-[#EDEBE4] bg-white p-3 sm:p-3.5 shadow-[0_24px_60px_-30px_rgba(11,31,58,0.35)]">
              <ParallaxImage
                src={IMG}
                alt="Two contemporary courtyard villas with warm interior lighting"
                className="h-[300px] sm:h-[400px] lg:h-[465px] w-full"
                strength={6}
                reveal={false}
              />
              <div className="flex items-center justify-between gap-3 bg-[#050A1A] px-4 py-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-white">Architectural Sanctuary</p>
                <p className="text-[9px] font-medium tracking-[0.08em] text-white">Private Courtyards &amp; Study</p>
              </div>
            </div>
          </Reveal>

          {/* Right */}
          <div className="lg:pl-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#164A7A]/60" />
              <Eyebrow className="!text-[9px] !font-medium !tracking-[0.15em]">A Community with Shared Ambition</Eyebrow>
            </div>
            <h2 className={`${SERIF} mt-4 max-w-md text-[#0B1F3A] text-3xl sm:text-4xl lg:text-5xl leading-[1.15]`}>
              <WordReveal text="For Those Building More Than a Career." />
            </h2>

            <Reveal delay={0.2} className="mt-5 max-w-[30rem] space-y-4">
              <p className="text-base md:text-[17px] leading-[1.7] text-[#171C22]">
                UNIQUE 70 is conceived for people who value their work, their family, their privacy, and
                the legacy they hope to build.
              </p>
              <p className="text-[15px] leading-[1.75] text-[#44474D]">
                Designed with doctors, chartered accountants, visionary industrialists, and enterprise
                builders in mind—patrons who seek an authentic sanctuary shielded from density and
                speculative turnover.
              </p>
            </Reveal>

            <Reveal delay={0.35} y={24} className="mt-6 max-w-[34rem]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#EDEBE4] pt-5">
                {traits.map((t) => (
                  <div key={t.t}>
                    <h3 className="text-base font-medium text-[#0B1F3A]">{t.t}</h3>
                    <p className="mt-1.5 max-w-[14rem] text-xs leading-relaxed text-[#44474D]">{t.s}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CommunityAmbition;