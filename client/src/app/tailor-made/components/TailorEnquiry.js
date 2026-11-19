"use client";
import Link from "next/link";
import { Container, Reveal, WordReveal, SERIF, SANS } from "@/components/ui/Animations";
import EnquiryForm from "@/components/common/EnquiryForm";

const TailorEnquiry = () => {
  return (
    <section id="enquiry" className={`${SANS} w-full min-w-0 overflow-hidden bg-[#0B1F3A] py-12 md:py-16 scroll-mt-20`}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-14 items-start">
          {/* Left */}
          <div>
            <Reveal y={16}>
              <span className="inline-block bg-[#1B2E4B] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#FFDEA9]">
                Let’s begin with your idea
              </span>
            </Reveal>
            <h2 className={`${SERIF} mt-5 max-w-md text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.15]`}>
              <WordReveal text="Tell Us About the Home You Have in Mind." />
            </h2>
            <Reveal delay={0.3} className="mt-6">
              <p className="max-w-md text-[15px] md:text-base leading-[1.75] text-white/80">
                Whether you already have a plot or are still exploring your options, start a conversation with
                Abundance Group about your home requirements.
              </p>
            </Reveal>

            <Reveal delay={0.4} y={30} className="mt-10 lg:mt-24">
              <div className="bg-[#16294A] p-6 sm:p-7">
                <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#FFDEA9]">
                  Seeking immediate possession?
                </p>
                <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-white/85">
                  Discover our active master-planned developments and signature completed residences ready for
                  ownership.
                </p>
                <Link
                  href="/properties"
                  className="group mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-white"
                >
                  Explore available properties
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right: shared form, Tailor Made preselected */}
          <Reveal y={40} delay={0.15}>
            <EnquiryForm defaultInterest="Tailor Made" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default TailorEnquiry;