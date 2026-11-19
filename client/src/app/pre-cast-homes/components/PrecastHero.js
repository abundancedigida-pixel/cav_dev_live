"use client";
import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, Building2, Ruler, Cog, Square, House, ArrowUpRight } from "lucide-react";
import { Container, Reveal, WordReveal, SERIF, SANS } from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";
const IMG = cloudinary.preCastHome.hero;

const specs = [
  { Icon: Ruler, k: "Land Area", v: "800 Sqft" },
  { Icon: Building2, k: "Building Area", v: "850 Sqft" },
  { Icon: Cog, k: "Technology", tag: "Precast Reinforced", tagCls: "bg-[#336192] text-white" },
  { Icon: Square, k: "Configuration", v: "DUPLEX (G+1)", gold: true },
  { Icon: House, k: "Fitout Level", tag: "Furnished Options", tagCls: "bg-[#FFDEA9] text-[#0B1F3A]" },
];

const PrecastHero = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-10 md:py-14`}>
      <Container>
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div>
            <Reveal y={16} className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-[#0B1F3A] px-3 py-1.5 text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.1em] text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E8C27A]" />
                An initiative of Abundance Edward
              </span>
              <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] text-[#336192]">
                · Industrial Precision Engineering
              </span>
            </Reveal>
            <p className={`${SERIF} mt-4 text-lg sm:text-xl uppercase tracking-[0.18em] text-[#336192]`}>Abundance Quality</p>
            <h1 className={`${SERIF} mt-1 text-[#0B1F3A] uppercase text-5xl sm:text-6xl lg:text-7xl leading-[1.05]`}>
              <WordReveal text="Pre Cast Homes" />
            </h1>
            <Reveal delay={0.3}>
              <p className={`${SERIF} mt-3 text-lg italic text-[#44474D]`}>&quot;Stronger. Smarter. Sustainable.&quot;</p>
            </Reveal>
          </div>

          <Reveal delay={0.3} className="lg:max-w-[420px] lg:border-l lg:border-[#EDEBE4] lg:pl-6">
            <p className="text-sm leading-[1.8] text-[#44474D]">
              Pioneering monolithic reinforced precast modules designed for multigenerational permanence.
              Turnkey delivery, climate-responsive insulation, and turnkey structural handover in weeks.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="#enquiry"
                className="bg-[#0B1F3A] px-6 py-3.5 text-[11px] font-medium uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#1B4B7F]"
              >
                Explore Home
              </Link>
              <Link
                href="#enquiry"
                className="border border-[#C9A55C] px-6 py-3.5 text-[11px] font-medium uppercase tracking-wide text-[#A0824E] transition-colors duration-300 hover:bg-[#FFDEA9] hover:text-[#0B1F3A]"
              >
                Enquire Now
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Image + dossier */}
        <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-[1.9fr_1fr] gap-6">
          <Reveal y={50}>
            <div className="group relative h-[340px] sm:h-[440px] lg:h-full lg:min-h-[540px] overflow-hidden shadow-[0_28px_60px_-30px_rgba(11,31,58,0.45)]">
              <Image
                src={IMG}
                alt="Dual-floor luxury monolith precast residence at dusk"
                fill
                priority
                sizes="(min-width: 1024px) 62vw, 100vw"
                className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3AE6] via-[#0B1F3A00] to-[#0B1F3A00]" />
              <span className="absolute left-4 top-4 inline-flex items-center gap-2 bg-[#0B1F3AE5] px-3 py-2 text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.08em] text-white">
                <BadgeCheck size={12} /> Featured Reference Design: Model D-850
              </span>
              <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#FFDEA9]">Standard G+1 Configuration</p>
                  <p className={`${SERIF} mt-1 text-xl sm:text-2xl text-white`}>Dual-Floor Luxury Monolith Residence</p>
                </div>
                <span className="w-fit bg-[#0B1F3A99] px-3 py-1.5 text-[8px] uppercase tracking-[0.08em] text-white">
                  Across all 38 districts of Tamil Nadu
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal y={50} delay={0.15}>
            <div className="flex h-full flex-col bg-gradient-to-b from-[#0B1F3A] to-[#0D2547] p-5 sm:p-6 text-white shadow-[0_28px_60px_-30px_rgba(11,31,58,0.5)]">
              <div className="flex items-start justify-between border-b border-white/15 pb-3">
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#E8C27A]">Specification Dossier</p>
                  <p className="mt-1 text-base sm:text-lg font-medium uppercase">Duplex Reference 4B</p>
                </div>
                <Building2 size={18} className="text-[#FFDEA9]" />
              </div>
              <p className="mt-4 max-w-[16rem] text-xs leading-relaxed text-white/70">
                Standard engineered reference metrics for our flagship precast duplex. Scalable for independent
                plots and gated township clusters.
              </p>

              <div className="mt-5 space-y-2">
                {specs.map(({ Icon, k, v, tag, tagCls, gold }) => (
                  <div key={k} className="flex items-center justify-between gap-3 bg-[#13294A] px-3 py-3">
                    <span className="flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.08em] text-white/85">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E3659]">
                        <Icon size={13} />
                      </span>
                      {k}
                    </span>
                    {tag ? (
                      <span className={`px-2 py-1 text-[8px] font-bold uppercase tracking-wide ${tagCls}`}>{tag}</span>
                    ) : (
                      <span className={`text-base font-medium ${gold ? "text-[#FFDEA9]" : "text-white"}`}>{v}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-auto border-t border-white/15 pt-5">
                <Link
                  href="#enquiry"
                  className="group flex items-center justify-center gap-2 bg-[#FFDEA9] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.08em] text-[#0B1F3A] transition-colors hover:bg-white"
                >
                  Enquire about this duplex
                  <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <p className="mt-3 text-center text-[8px] uppercase tracking-[0.08em] text-white/50">
                  Site engineering &amp; logistics assessed pan-India
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default PrecastHero;