"use client";
import { MapPin, Star } from "lucide-react";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";

const testimonials = [
  {
    quote:
      "Building a 9,000 sq.ft. home in Bengaluru while operating our software firm was intimidating. Vanguard provided a level of structural craftsmanship and transparent billing that felt as disciplined as an enterprise tech project.",
    name: "Vikram & Ananya Rao",
    meta: "Villa Owners · Vanguard Meadows, Bengaluru",
    role: "Tech Founders",
  },
  {
    quote:
      "Living in Dubai, I visited my Kochi plot only twice during the entire 18-month construction cycle. The weekly milestone video audits and zero cost escalations proved Vanguard's NRI service is unparalleled.",
    name: "Rajiv Menon",
    meta: "NRI Client · Custom Tailor-Made Villa in Kochi",
    role: "Managing Partner, Private Equity (Dubai)",
  },
  {
    quote:
      "Onyx Horizon Tower delivered on every single institutional parameter: acoustic thresholds, energy consumption meters, and Grade-A HVAC design. They delivered 45 days ahead of our fit-out schedule.",
    name: "S. K. Singhania",
    meta: "Commercial IT Anchor Tenant · Hyderabad",
    role: "Managing Director, Global Logistics",
  },
];

const locations = [
  { city: "Vellore", tags: "Homes · Communities · Development" },
  { city: "Chennai", tags: "Residential · Commercial · Development" },
  { city: "Bengaluru", tags: "Residential · Commercial · Future Developments" },
];

const Testimonials = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#F3F1EB] py-16`}>
      <Container>
        <Eyebrow className="!text-[10px]">Client Monograph · Perspectives</Eyebrow>
        <h2 className={`${SERIF} mt-4 text-[#0B1F3A] text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1]`}>
          <WordReveal text="Enduring Partnerships." />
        </h2>
        <Reveal delay={0.2} className="mt-4 max-w-xl">
          <p className="text-[15px] leading-relaxed text-[#44474D]">
            Read what leaders, founders, and overseas property patrons say about our process and
            execution permanence.
          </p>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12} y={50} className={i === 2 ? "md:col-span-2 lg:col-span-1" : ""}>
              <figure className="group flex h-full flex-col bg-white p-7 md:p-8 shadow-[0_10px_40px_-26px_rgba(11,31,58,0.3)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-28px_rgba(11,31,58,0.4)]">
                <div className="flex gap-1 text-[#9A7B3F]">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={15} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="mt-5 text-[15px] leading-[1.75] text-[#171C22]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto pt-8">
                  <div className="border-t border-[#EDEBE4] pt-5">
                    <p className="text-base font-medium text-[#0B1F3A]">{t.name}</p>
                    <p className="mt-1 text-xs text-[#4A5568]">{t.meta}</p>
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-[#1B4B7F]">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Where we are */}
        <div className="mt-12 md:mt-16">
          <Eyebrow className="!text-[10px]">Where we are</Eyebrow>
          <h2 className="mt-4 text-[#0B1F3A] font-medium tracking-[-0.02em] leading-[1.1] text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
            <WordReveal text="Building Across South India." />
          </h2>

          <div className="mt-10 border-t border-[#E0DDD3] pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((l, i) => (
              <Reveal key={l.city} delay={i * 0.12} y={30}>
                <div className="group">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center bg-[#E3E8EF] text-[#1B4B7F] transition-colors duration-300 group-hover:bg-[#0B1F3A] group-hover:text-white">
                      <MapPin size={16} />
                    </span>
                    <h3 className="text-lg font-medium uppercase tracking-wide text-[#0B1F3A]">{l.city}</h3>
                  </div>
                  <p className="mt-5 text-[13px] text-[#4A5568]">{l.tags}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;