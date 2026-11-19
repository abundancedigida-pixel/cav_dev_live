"use client";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";

const points = [
  {
    n: "70/1",
    title: "A Number of Your Own",
    text: "Each residence is associated with an individual number from 1 to 70, represented through the proposed Founder's Plaque at the home entrance.",
  },
  {
    n: "70/2",
    title: "A Place in the Register",
    text: "The concept includes a permanent Founders' Register recording the names of the homeowners as part of the project's identity.",
  },
  {
    n: "70/3",
    title: "An Edition That Closes",
    text: "The concept defines the first 70 homes as a closed edition, with no repeat batch or lower-grade Phase 2 intended under the stated concept.",
  },
];

const IdeaBehind = () => {
  return (
    <section id="concept" className={`${SANS} w-full min-w-0 overflow-hidden bg-white pb-16 scroll-mt-20`}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#164A7A]/60" />
              <Eyebrow className="!text-[10px] !font-medium !tracking-[0.15em]">The Idea Behind UNIQUE 70</Eyebrow>
            </div>

            <h2 className={`${SERIF} mt-5 text-[#0B1F3A] text-4xl sm:text-5xl leading-[1.15]`}>
              <span className="block max-w-[16ch]">
                <WordReveal text="Not Homes by the Thousand." />
              </span>
              <span className="block text-[#C5A46D]">
                <WordReveal text="A Founding Edition of 70." delay={0.3} />
              </span>
            </h2>

            <Reveal delay={0.2} className="mt-6 max-w-[34rem] space-y-4">
              <p className="text-base md:text-[17px] leading-[1.75] text-[#171C22]">
                UNIQUE 70 is conceived as a limited residential edition. Each home is associated with a
                distinct founder number, creating a sense of identity and belonging within a deliberately
                limited community.
              </p>
              <p className="text-[15px] leading-[1.75] text-[#44474D]">
                Instead of anonymous apartments in repetitive multi-storey blocks, each of the 70 homes
                stands with permanent architectural character, custom wire-cut terracotta brick, deep-set
                waterproof pointing, and handcrafted basalt stone bases.
              </p>
            </Reveal>

            <Reveal delay={0.3} y={24} className="mt-8 max-w-[46rem]">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-l-2 border-[#336192] bg-[#EEF3FC] px-5 py-5 sm:px-7">
                <span className={`${SERIF} text-base sm:text-xl uppercase tracking-[0.08em] text-[#0B1F3A]`}>Prestige</span>
                <span className="text-sm text-[#C5A46D]" aria-hidden="true">✦</span>
                <span className={`${SERIF} text-base sm:text-xl uppercase tracking-[0.08em] text-[#0B1F3A]`}>Exclusivity</span>
                <span className="text-sm text-[#C5A46D]" aria-hidden="true">✦</span>
                <span className={`${SERIF} text-base sm:text-xl uppercase tracking-[0.08em] text-[#0B1F3A]`}>Legacy</span>
              </div>
            </Reveal>
          </div>

          {/* Right */}
          <div className="space-y-4">
            {points.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.12} y={40}>
                <div className="group flex gap-5 sm:gap-7 border border-[#EDEBE4] bg-white px-5 py-6 sm:px-7 sm:py-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(11,31,58,0.35)]">
                  <span className={`${SERIF} shrink-0 text-3xl sm:text-4xl leading-none text-[#336192]`}>{p.n}</span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium text-[#0B1F3A]">{p.title}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-[1.7] text-[#44474D]">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default IdeaBehind;