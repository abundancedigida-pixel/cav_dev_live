"use client";
import { Globe, Clock, UserCheck, Award, BookOpen, Banknote } from "lucide-react";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";

const benefits = [
  { Icon: Globe, title: "Pan-India Market Reach", text: "Direct access to suburban and peri-urban landholders seeking accelerated home construction across India." },
  { Icon: Clock, title: "24/7 Digital Visibility", text: "E-commerce discovery removes regional showroom boundaries with live virtual walkthroughs and spec sheets." },
  { Icon: UserCheck, title: "High-Quality Leads", text: "Pre-qualified enquiries with verified plot ownership, defined budgets, and immediate intent." },
  { Icon: Award, title: "Brand Credibility", text: "Backed by the trusted craftsmanship and vision of Abundance Edward with institutional-grade certifications." },
  { Icon: BookOpen, title: "Standardised Catalogue", text: "Predictable costing, standardized BOMs, and zero on-site material wastage or budget overruns." },
  { Icon: Banknote, title: "Digital Milestone Payments", text: "Transparent financial processing via digital milestone escrow accounts for complete client and builder security." },
];

const BusinessBenefits = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#E8EDF6] py-12 md:py-16`}>
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow className="!text-[9px] !font-medium !tracking-[0.2em]">Strategic Commercial Advantages</Eyebrow>
          <h2 className={`${SERIF} mt-3 text-[#0B1F3A] uppercase text-3xl sm:text-4xl lg:text-5xl leading-[1.1]`}>
            <WordReveal text="Business Benefits" />
          </h2>
          <Reveal delay={0.2} className="mt-4 max-w-xl">
            <p className="text-[15px] leading-[1.7] text-[#44474D]">
              Transforming conventional real-estate delays into accelerated industrial manufacturing cycles with
              national market reach.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {benefits.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.1} y={40}>
              <div className="group flex h-full gap-4 bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(11,31,58,0.35)]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0B1F3A] text-[#FFDEA9]">
                  <Icon size={16} />
                </span>
                <div>
                  <h3 className="text-base font-medium text-[#171C22]">{title}</h3>
                  <p className="mt-2 max-w-[16rem] text-xs leading-[1.7] text-[#44474D]">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BusinessBenefits;