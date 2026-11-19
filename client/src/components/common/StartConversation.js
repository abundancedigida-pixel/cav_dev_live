
"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import {
  Container,
  Reveal,
  WordReveal,
  SERIF,
  SANS,
} from "@/components/ui/Animations";

const StartConversation = ({
  eyebrow = "Start a Conversation",
  title = "Let's Build Something Worth Coming Home To.",
  description,
  primaryCTA,
  secondaryCTA,
  quickLinks = [],
}) => {
  return (
    <section
      className={`${SANS} w-full min-w-0 overflow-hidden bg-[#0B1F3A] py-16 md:py-20`}
    >
      <Container className="flex flex-col items-center text-center">

        {/* Eyebrow */}
        {eyebrow && (
          <Reveal y={20}>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#E8C27A]">
              {eyebrow}
            </p>
          </Reveal>
        )}

        {/* Heading */}
        <h2
          className={`${SERIF} mt-6 max-w-4xl text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15]`}
        >
          <WordReveal text={title} stagger={0.08} />
        </h2>

        {/* Optional Description */}
        {description && (
          <Reveal delay={0.2} y={20} className="mt-6 max-w-2xl">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#9AAAC0]">
              {description}
            </p>
          </Reveal>
        )}

        {/* CTA Buttons */}
        {(primaryCTA || secondaryCTA) && (
          <Reveal
            delay={0.4}
            y={24}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4"
          >
            {primaryCTA && (
              <Link
                href={primaryCTA.href}
                className="inline-flex items-center justify-center bg-[#E8C27A] px-6 py-3.5 text-[13px] font-bold text-[#0B1F3A] transition-all duration-300 hover:bg-[#FAFAF7]"
              >
                {primaryCTA.label}
                {primaryCTA.icon && (
                  <ArrowRight size={14} className="ml-2" />
                )}
              </Link>
            )}

            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className="group inline-flex items-center justify-center gap-2 border border-white/70 px-6 py-3.5 text-[13px] font-bold text-white transition-all duration-300 hover:bg-white hover:text-[#0B1F3A]"
              >
                {secondaryCTA.label}
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            )}
          </Reveal>
        )}

        {/* Optional Quick Links */}
        {quickLinks.length > 0 && (
          <Reveal delay={0.6} y={20} className="mt-12 w-full">
            <div className="border-t border-white/10 pt-8">
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                {quickLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:text-[#E8C27A]"
                  >
                    {item.label}
                    <ChevronRight
                      size={12}
                      className="text-white/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#E8C27A]"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        )}

      </Container>
    </section>
  );
};

export default StartConversation;