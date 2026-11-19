"use client";
import { motion } from "framer-motion";
import { Container, Reveal, EASE, WordReveal, Eyebrow, SANS } from "@/components/ui/Animations";

const items = [
  { n: "01", title: "Dream", text: "Imagine what is possible." },
  { n: "02", title: "Desire", text: "Turn possibility into ambition." },
  { n: "03", title: "Discipline", text: "Build the standards required to move forward." },
  { n: "04", title: "Direction", text: "Choose the right path." },
  { n: "05", title: "Determination", text: "Turn vision into reality.", gold: true },
];

const AbundanceMindset = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-12`}>
      <Container>
        <Eyebrow>The Abundance Mindset</Eyebrow>
        <h2 className="mt-4 text-[#0B1F3A] font-medium tracking-[-0.02em] leading-[1.1] text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
          <WordReveal text="Dream. Desire. Discipline. Direction. Determination." stagger={0.09} />
        </h2>

        <div className="relative mt-10 md:mt-12 pt-8">
          <motion.span
            className="absolute top-0 left-0 h-px w-full origin-left bg-[#C4C6CE4D]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: EASE }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-8">
            {items.map((it, i) => (
              <Reveal key={it.n} delay={i * 0.1} y={30}>
                <div className="group">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-1 text-[11px] font-bold tabular-nums transition-colors duration-300 ${
                        it.gold
                          ? "bg-[#3361921A] text-[#336192]"
                          : "bg-[#E8EEF6] text-[#1B4B7F] group-hover:bg-[#0B1F3A] group-hover:text-white"
                      }`}
                    >
                      {it.n}
                    </span>
                    <h3 className="text-base md:text-lg font-medium uppercase tracking-wide text-[#171C22]">
                      {it.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#44474D] max-w-[16rem]">{it.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AbundanceMindset;