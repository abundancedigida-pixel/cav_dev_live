"use client";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";
import Img from "@/assets/HomeImages/Trunkey.webp";

const steps = [
  {
    n: "01",
    title: "Site, Soil Analysis & Solar Orientation",
    text: "Topographical contour mapping, borehole load tests, and climatic breeze simulation.",
    time: "Weeks 1 – 3",
  },
  {
    n: "02",
    title: "Bespoke Blueprint & 3D Virtual Immersion",
    text: "Iterative architectural schematics, structural calculation, and full 1:1 VR walkthroughs.",
    time: "Weeks 4 – 8",
  },
  {
    n: "03",
    title: "Structural Engineering & Material Procurement",
    text: "Direct sourcing of Italian marble blocks, German joinery hardware, and Fe-550D rebar.",
    time: "Weeks 9 – 14",
  },
  {
    n: "04",
    title: "Precision Construction & Milestone CCTV",
    text: "Daily digital site logs, 24/7 client CCTV access, and ISO-standard pouring protocols.",
    time: "Milestone driven",
  },
  {
    n: "05",
    title: "Quality Audit (350+ Checkpoints) & Keys",
    text: "Independent third-party acoustic, waterproofing, and electrical load certification.",
    time: "Final handover",
    gold: true,
  },
];

const TurnkeyConstruction = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-x-clip bg-white py-16`}>
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-8 border-b border-[#E4E2DA]">
          <div className="max-w-2xl">
            <Eyebrow>Turnkey Custom Construction</Eyebrow>
            <h2 className={`${SERIF} mt-4 text-[#0B1F3A] text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1]`}>
              <WordReveal text="Your Vision. Your Land. Your Home." />
            </h2>
            <Reveal delay={0.2} className="mt-5">
              <p className="text-[15px] leading-relaxed text-[#44474D] max-w-xl">
                Do you own a plot in Bengaluru, Hyderabad, Chennai, or Kochi? We assume full
                responsibility from site topography study to the final key handover. Zero contractor
                disputes, absolute cost predictability.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.3} className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/contact-us"
              className="bg-[#0B1F3A] px-6 py-3.5 text-xs font-medium uppercase tracking-wide text-white transition-colors hover:bg-[#1B4B7F]"
            >
              Start your home
            </Link>
            <Link
              href="/tailor-made"
              className="border border-[#D9D6CC] px-6 py-3.5 text-xs font-medium uppercase tracking-wide text-[#0B1F3A] transition-colors hover:border-[#0B1F3A]"
            >
              Get a pre-cost estimate
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-10 items-start">
          <div className="space-y-3.5">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08} y={30}>
                <div
                  className={`group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-[#EDEBE4] border-l-[3px] bg-white px-5 py-5 transition-all duration-500 hover:translate-x-1.5 hover:shadow-[0_16px_40px_-24px_rgba(11,31,58,0.4)] ${
                    s.gold ? "border-l-[#9A7B3F]" : "border-l-[#1B4B7F]"
                  }`}
                >
                  <div className="flex gap-4">
                    <span
                      className={`mt-0.5 h-fit px-2 py-1 text-[10px] font-bold tabular-nums ${
                        s.gold ? "bg-[#F3ECDD] text-[#9A7B3F]" : "bg-[#E8EEF6] text-[#1B4B7F]"
                      }`}
                    >
                      {s.n}
                    </span>
                    <div>
                      <h3 className="text-base md:text-[17px] font-medium text-[#0B1F3A]">{s.title}</h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-[#4A5568] max-w-md">{s.text}</p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 text-[10px] font-medium uppercase tracking-[0.1em] ${
                      s.gold ? "text-[#9A7B3F]" : "text-[#4A5568]"
                    }`}
                  >
                    {s.time}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} y={40} className="lg:sticky lg:top-28">
            <div className="bg-white p-5 md:p-6 shadow-[0_20px_60px_-30px_rgba(11,31,58,0.35)] border border-[#EDEBE4]">
              <div className="group relative h-[240px] md:h-[260px] overflow-hidden">
                <Image
                  src={Img}
                  alt="Woodwork, joinery and stone carving atelier"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-[#E8C27A]">On-site artisanal atelier</p>
                  <p className="mt-1 text-sm sm:text-base text-white">Woodwork, Joinery & Stone Carving</p>
                </div>
              </div>
              <h3 className="mt-6 text-xl font-medium text-[#0B1F3A]">Interactive Pre-Cost Benchmark</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#4A5568]">
                Calculate turn-key construction costs based on plot square footage, structural grade,
                and interior finishing specs within 60 seconds.
              </p>
              <div className="mt-5 flex items-end justify-between gap-4 bg-[#EEF3FC] p-4">
                <div>
                  <p className="text-[9px] uppercase tracking-wide text-[#4A5568]">Indicative turnkey range</p>
                  <p className="mt-1 text-lg font-semibold text-[#0B1F3A]">
                    ₹3,800 – ₹7,200 <span className="text-xs font-normal text-[#4A5568]">/ sq.ft.</span>
                  </p>
                </div>
                <Link
                  href="/tailor-made"
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-[#1B4B7F] hover:text-[#0B1F3A]"
                >
                  Launch tool <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default TurnkeyConstruction;