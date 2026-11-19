"use client";
import { motion } from "framer-motion";
import { Container, Reveal, WordReveal, Eyebrow, EASE, SERIF, SANS } from "@/components/ui/Animations";

const OurStory = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16`}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div>
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="mt-5 text-[#0B1F3A] font-medium tracking-[-0.03em] leading-[1.1] text-3xl sm:text-3xl md:text-4xl lg:text-5xl max-w-xl">
              <WordReveal text="Development Grounded in Responsibility" />
            </h2>

            <Reveal delay={0.2} className="mt-6 max-w-xl space-y-2">
              <p className="text-[15px] leading-[1.75] text-[#4F5963]">
                ARCA is a fictional prototype brand created to demonstrate a premium
                developer experience. The operating philosophy shown here brings
                architecture, commercial discipline and construction rigour into one
                accountable process.
              </p>
              <p className="text-[15px] leading-[1.75] text-[#4F5963]">
                Each development begins with context: climate, movement, neighbourhood,
                long-term use and the character of the people it serves.
              </p>
            </Reveal>
          </div>

          {/* Right: quote */}
          <div className="relative lg:pl-12">
            <motion.span
              className="absolute left-0 top-0 h-full w-[2px] origin-top bg-[#C5A46D]"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EASE }}
            />
            <Reveal delay={0.2} x={30} y={0} className="pl-6 lg:pl-0">
              <blockquote
                className={`${SERIF} text-[#0B1F3A] text-2xl sm:text-3xl lg:text-[38px] leading-[1.35]`}
              >
                &ldquo;We design not for first impressions alone, but for how a place
                will work, age and contribute over time.&rdquo;
              </blockquote>
              <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#4F5963]">
                Demo leadership statement
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OurStory;