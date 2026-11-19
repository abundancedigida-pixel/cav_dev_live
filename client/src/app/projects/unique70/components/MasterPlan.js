"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container, Reveal, WordReveal, Eyebrow, EASE, SERIF, SANS } from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";
const PLAN = cloudinary.projectDetails.plan;

/* PLACEHOLDER DATA: replace with verified project data. x / y = hotspot position on the plan image in %. */
const tiers = {
  founders: {
    badge: "Founders Tier",
    stage: "Stage 1: Founders Release",
    note: "Founders Tier plots boast immediate adjacency to the landscaped central boulevard, bespoke stone name carving, and priority registration.",
    dot: "bg-[#0B1F3A] text-white",
  },
  pioneers: {
    badge: "Pioneers Tier",
    stage: "Stage 2: Pioneers Release",
    note: "Pioneers Tier plots offer direct access to secondary parkways with balanced courtyard garden orientations.",
    dot: "bg-[#336192] text-white",
  },
  legacy: {
    badge: "Legacy Tier",
    stage: "Stage 3: Legacy Release",
    note: "Legacy Tier plots complete the founding edition, after which the master register is permanently sealed.",
    dot: "bg-[#D5D9E4] text-[#0B1F3A]",
  },
};

const plots = [
  { n: "01", tier: "founders", area: "2,650 sq.ft.", typology: "3BHK Courtyard Villa", orientation: "East · Central Boulevard Facing", x: 9, y: 14 },
  { n: "14", tier: "pioneers", area: "2,400 sq.ft.", typology: "3BHK Courtyard Villa", orientation: "North · Parkway Facing", x: 46, y: 28 },
  { n: "45", tier: "legacy", area: "2,200 sq.ft.", typology: "2BHK Architectural Residence", orientation: "West · Garden Facing", x: 72, y: 62 },
];

const tabs = [
  { id: "all", label: "All 70" },
  { id: "founders", label: "Founders (01-10)" },
  { id: "pioneers", label: "Pioneers (11-40)" },
  { id: "legacy", label: "Legacy (41-70)" },
];

const legend = [
  { label: "Founders (01-10)", cls: "bg-[#0B1F3A]" },
  { label: "Pioneers (11-40)", cls: "bg-[#336192]" },
  { label: "Legacy (41-70)", cls: "bg-[#D5D9E4]" },
];

const MasterPlan = () => {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState("01");

  const plot = plots.find((p) => p.n === selected) ?? plots[0];
  const tier = tiers[plot.tier];
  const visible = filter === "all" ? plots : plots.filter((p) => p.tier === filter);

  const handleFilter = (id) => {
    setFilter(id);
    if (id !== "all" && plot.tier !== id) {
      const first = plots.find((p) => p.tier === id);
      if (first) setSelected(first.n);
    }
  };

  const rows = [
    { k: "Verified Plot Area", v: plot.area, big: true },
    { k: "Recommended Typology", v: plot.typology },
    { k: "Orientation", v: plot.orientation },
    { k: "Allocation Stage", v: tier.stage, link: true },
  ];

  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#F1F0EB] py-12 md:py-16`}>
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <Eyebrow className="!text-[10px] !font-medium !tracking-[0.15em]">The Layout</Eyebrow>
            <h2 className={`${SERIF} mt-3 text-[#0B1F3A] text-3xl sm:text-4xl lg:text-5xl leading-[1.12]`}>
              <WordReveal text="70 Residences. One Considered Plan." />
            </h2>
            <Reveal delay={0.2} className="mt-3 max-w-xl">
              <p className="text-[15px] leading-relaxed text-[#44474D]">
                Explore the proposed residential layout for UNIQUE 70 in Ranipet and discover how the 70
                plots are arranged within the development.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.3} y={16}>
            <div className="flex flex-wrap gap-2">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleFilter(t.id)}
                  aria-pressed={filter === t.id}
                  className={`px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors duration-300 ${
                    filter === t.id
                      ? "bg-[#0B1F3A] text-white"
                      : "bg-[#E8EDF6] text-[#0B1F3A] hover:bg-[#DCE4F3]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-6 items-start">
          {/* Plan */}
          <Reveal y={50}>
            <div className="bg-white p-4 sm:p-5 shadow-[0_2px_12px_-6px_rgba(11,31,58,0.2)]">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EDEBE4] pb-3">
                <p className="flex items-center gap-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#171C22]">
                  <span className="h-2 w-2 bg-[#336192]" />
                  Proposed 70-Plot Masterplan Vector · Ranipet Enclave
                </p>
                <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-[#44474D]">Scale 1:500 Concept</p>
              </div>

              <div className="relative mt-4 h-[240px] sm:h-[300px] lg:h-[330px] w-full overflow-hidden">
                <Image
                  src={PLAN}
                  alt="Aerial masterplan of the 70-plot Ranipet enclave"
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
                {visible.map((p) => (
                  <button
                    key={p.n}
                    type="button"
                    onClick={() => setSelected(p.n)}
                    aria-label={`Inspect plot ${p.n}`}
                    style={{ left: `calc(${p.x}% - 12px)`, top: `calc(${p.y}% - 12px)` }}
                    className={`absolute flex h-6 w-6 items-center justify-center rounded-full text-[8px] font-bold transition-transform duration-300 hover:scale-125 ${tiers[p.tier].dot} ${
                      selected === p.n ? "ring-2 ring-white scale-125" : ""
                    }`}
                  >
                    {p.n}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  {legend.map((l) => (
                    <li key={l.label} className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#171C22]">
                      <span className={`h-2 w-2 ${l.cls}`} />
                      {l.label}
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] text-[#44474D]">Click any plot to inspect details</p>
              </div>
            </div>
          </Reveal>

          {/* Plot selector */}
          <Reveal y={50} delay={0.12}>
            <div className="bg-white p-5 sm:p-6 shadow-[0_8px_30px_-18px_rgba(11,31,58,0.35)]">
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#336192]">Interactive Plot Selector</p>

              <motion.div
                key={plot.n}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-b border-[#EDEBE4] pb-3">
                  <h3 className={`${SERIF} text-3xl sm:text-4xl text-[#0B1F3A]`}>Plot #{plot.n}</h3>
                  <span className="bg-[#0B1F3A] px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-white">
                    {tier.badge}
                  </span>
                </div>

                <dl>
                  {rows.map((r) => (
                    <div key={r.k} className="flex items-start justify-between gap-4 border-b border-[#EDEBE4] py-3 text-[13px]">
                      <dt className="max-w-[8rem] text-[#44474D]">{r.k}</dt>
                      <dd
                        className={`text-right ${
                          r.big
                            ? "text-base font-semibold text-[#0B1F3A]"
                            : r.link
                              ? "font-medium text-[#336192]"
                              : "font-semibold text-[#0B1F3A]"
                        }`}
                      >
                        {r.v}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-5 bg-[#EEF3FC] p-4 text-[13px] leading-[1.7] text-[#44474D]">{tier.note}</p>
              </motion.div>

              <Link
                href="#enquiry"
                className="mt-6 block bg-[#0B1F3A] px-6 py-4 text-center text-[11px] font-medium uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#1B4B7F]"
              >
                Enquire about plot selection
              </Link>
              <p className="mt-4 text-center text-[9px] leading-relaxed tracking-[0.04em] text-[#44474D]">
                Plot information is based on the supplied project layout. Please contact the Abundance
                Group team for the latest verified project information.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default MasterPlan;