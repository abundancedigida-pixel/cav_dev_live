"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  Container,
  ParallaxImage,
  WordReveal,
  Reveal,
  EASE,
  SANS,
} from "@/components/ui/Animations";
import IMG from "@/assets/HomeImages/Banner.webp";

const Banner = () => {
  return (
    <section
      className={`${SANS} relative isolate w-full min-w-0 overflow-hidden bg-[#0B1F3A] flex`}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <ParallaxImage
          src={IMG}
          alt="Premium villa at dusk"
          className="h-full w-full"
          strength={10}
          reveal={false}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061525B8] to-[#0615251F]/10" />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/10 to-[#0B1F3A]" /> */}
      </div>

      <Container className="relative flex flex-col justify-center pt-24 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.28em] text-white"
        >
          Premium Home Building
        </motion.p>

        <h1 className="mt-5 md:mt-6 font-light text-white tracking-[-0.03em] leading-[0.98] text-[clamp(2.75rem,9vw,7rem)] max-w-[12ch] sm:max-w-[14ch]">
          <WordReveal
            text="Homes, Made Around You."
            delay={0.3}
            stagger={0.12}
          />
        </h1>

        <Reveal delay={0.9} y={24} className="mt-6 md:mt-8 max-w-[34rem]">
          <p className="text-base md:text-lg font-light leading-relaxed text-white">
            Tailor-made and pre-cost homes built with clarity, craft and
            purpose.
          </p>
        </Reveal>

        <Reveal
          delay={1.1}
          y={24}
          className="mt-8 md:mt-10 flex flex-wrap gap-3 md:gap-4"
        >
          <Link
            href="/properties"
            className="bg-white text-[#0B1F3A] text-[13px] font-bold px-6 py-3.5 transition-all duration-300 hover:bg-[#E8C27A]"
          >
            Explore Properties
          </Link>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 border border-white/80 text-white text-[13px] font-bold px-6 py-3.5 transition-all duration-300 hover:bg-white hover:text-[#0B1F3A]"
          >
            Discover Our Projects
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </Container>

      {/* Bottom meta */}
      <div className="absolute bottom-6 md:bottom-8 inset-x-0 hidden md:block">
        <Container className="flex items-end justify-end gap-8">
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-white">
            Scroll to discover
            <span className="relative block h-px w-16 overflow-hidden bg-white/30">
              <motion.span
                className="absolute inset-y-0 left-0 w-1/2 bg-white"
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </span>
          </div>

          <div className="text-right text-xs text-white">
            <p className="font-light">Featured demo development</p>
            <p className="mt-0.5 font-semibold text-white">
              Verde Villas · ECR, Chennai
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Banner;
