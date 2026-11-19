"use client";
import { motion } from "framer-motion";
import {
  Container,
  ParallaxImage,
  WordReveal,
  Reveal,
  EASE,
  SANS,
} from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";
const IMG = cloudinary.about.hero;

const AboutHero = () => {
  return (
    <section
      className={`${SANS} relative isolate w-full min-w-0 overflow-hidden bg-[#0B1F3A] flex`}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <ParallaxImage
          src={IMG}
          alt="Glass-facade commercial towers against a cloudy sky"
          className="h-full w-full"
          strength={10}
          reveal={false}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061525CC] via-[#0615258F] to-[#06152526]" />
      </div>

      <Container className="relative flex flex-col justify-center pt-24 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#E8C27A]"
        >
          About ARCA
        </motion.p>

        <h1 className="mt-5 font-light text-white tracking-[-0.03em] leading-[1.02] text-[clamp(2.5rem,7vw,5.75rem)]">
          <span className="block">
            <WordReveal text="Building with Purpose." delay={0.3} stagger={0.1} />
          </span>
          <span className="block">
            <WordReveal text="Developing with" delay={0.6} stagger={0.1} />
          </span>
          <span className="block">
            <WordReveal text="Perspective." delay={0.9} stagger={0.1} />
          </span>
        </h1>

        <Reveal delay={1.2} y={24} className="mt-6 md:mt-8 max-w-[34rem]">
          <p className="text-sm md:text-base font-light leading-relaxed text-white">
            A design-led development practice creating residential and
            commercial environments for contemporary India.
          </p>
        </Reveal>
      </Container>
    </section>
  );
};

export default AboutHero;