"use client";
import React, { useState } from "react";
import { ChevronDown, Globe, Triangle, ShieldCheck, House, SquareArrowOutUpRight } from "lucide-react";
import { Container, Reveal, WordReveal, SERIF } from "@/components/ui/Animations";

const groups = [
  {
    title: "Builder & Engineering Certifications",
    items: [
      {
        logo: { Icon: Globe, top: "ISO", sub: "9001:2015", bg: "bg-[#0B1F3A]" },
        status: "Active & Validated",
        title: "ISO 9001:2015 Quality Management Systems",
        issuer: "International Certification Services & BIS",
        text: "Monolithic post-tensioned casting and site quality protocols certified against statutory international management frameworks.",
        details: ["Standard: ISO 9001:2015", "Scope: post-tensioned casting & site quality protocols", "Issuer: International Certification Services & BIS"],
      },
      {
        logo: { Icon: Triangle, top: "BIS / NBC", sub: "IS 1893:2016", bg: "bg-[#164A7A]" },
        status: "Licensed & Verified",
        title: "Structural Engineering & Earth Retention Compliance",
        issuer: "Bureau of Indian Standards & NBC III",
        text: "Earthquake-resistant RCC design adhering to Zone III seismic codes, wind tunnel testing, and deep-foundation geotechnical clearance.",
        details: ["Code: IS 1893:2016", "Scope: Zone III seismic design, wind tunnel testing", "Issuer: Bureau of Indian Standards & NBC III"],
      },
    ],
  },
  {
    title: "Registrations & Industry Accreditations",
    items: [
      {
        logo: { Icon: ShieldCheck, top: "TN-RERA", sub: "TN/29/0192", bg: "bg-[#0B1F3A]" },
        status: "Statutory Registered",
        title: "TN-RERA Real Estate Regulatory Authority",
        issuer: "Tamil Nadu Real Estate Regulatory Authority",
        text: "100% compliance across project disclosures, carpet-area transparency, quarterly milestone filings, and designated escrow banking.",
        details: ["Registration: TN/29/0192", "Scope: disclosures, carpet-area transparency, milestone filings", "Issuer: Tamil Nadu Real Estate Regulatory Authority"],
      },
      {
        logo: { Icon: House, top: "CREDAI", sub: "Apex Member", bg: "bg-[#14673F]" },
        status: "Membership Active",
        title: "CREDAI Apex Member Accreditation",
        issuer: "Confederation of Real Estate Developers' Associations of India",
        text: "Committed to the CREDAI Code of Conduct, zero hidden charges, transparent customer charter, and independent arbitration protocols.",
        details: ["Membership: Apex Member", "Scope: Code of Conduct, customer charter, arbitration", "Issuer: CREDAI"],
      },
    ],
  },
];

const CertCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  const { logo } = item;
  return (
    <div className="flex h-full flex-col rounded-lg border border-[#E6E4DC] bg-white p-5 sm:p-7 shadow-[0_2px_12px_-6px_rgba(11,31,58,0.12)] transition-shadow duration-500 hover:shadow-[0_24px_50px_-28px_rgba(11,31,58,0.35)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-12 items-center gap-2 border border-[#EDEBE4] bg-[#FAFAF7] px-3">
          <span className={`flex h-6 w-6 items-center justify-center rounded ${logo.bg} text-white`}>
            <logo.Icon size={14} />
          </span>
          <span className="leading-none">
            <span className="block text-[9px] font-bold text-[#0B1F3A]">{logo.top}</span>
            <span className="mt-0.5 block text-[6px] text-[#4A5568]">{logo.sub}</span>
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#EDEBE4] bg-[#FAFAF7] px-3 py-1 text-[11px] text-[#0B1F3A]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0E9F6E]" />
          {item.status}
        </span>
      </div>

      <h4 className="mt-5 text-lg font-bold text-[#0B1F3A] leading-snug">{item.title}</h4>
      <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#7587A7]">{item.issuer}</p>
      <p className="mt-4 max-w-md text-[13px] leading-[1.75] text-[#171C22]">{item.text}</p>

      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="flex w-full items-center justify-between border-t border-[#EDEBE4] pt-4 text-left"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.06em] text-[#0B1F3A]">
            View Details <SquareArrowOutUpRight size={12} className="text-[#336192]" />
          </span>
          <ChevronDown size={14} className={`text-[#0B1F3A] transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
        <div className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] pt-4" : "grid-rows-[0fr]"}`}>
          <ul className="overflow-hidden space-y-1.5 text-[12px] text-[#4A5568]">
            {item.details.map((d) => (
              <li key={d}>• {d}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Certifications = () => {
  return (
    <section className={`${SERIF} w-full min-w-0 overflow-hidden bg-[#FAFAF7] py-16`}>
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 pb-8 border-b border-[#E6E4DC]">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C5A46D]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B08D4A]">
                Credibility · Compliance · Professional Standards
              </p>
            </div>
            <h2 className="mt-3 text-[#0B1F3A] text-3xl sm:text-4xl md:text-5xl leading-[1.1]">
              <WordReveal text="Certifications & Accreditations" />
            </h2>
            <Reveal delay={0.2} className="mt-3">
              <p className="text-base text-[#0B1F3A]">Our Commitment to Professional Standards</p>
            </Reveal>
          </div>
          <Reveal delay={0.3}>
            <p className="max-w-sm text-[13px] leading-[1.9] text-[#4A5568]">
              We believe that responsible development begins with quality, accountability, and a
              commitment to professional standards.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 space-y-12">
          {groups.map((g) => (
            <div key={g.title}>
              <Reveal y={20}>
                <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0B1F3A]">
                  <span className="h-2 w-2 rounded-full bg-[#C5A46D]" />
                  {g.title}
                </p>
              </Reveal>
              <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {g.items.map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.12} y={40}>
                    <CertCard item={item} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Reveal y={20} className="mx-auto mt-14 max-w-xl text-center">
          <div className="border-t border-[#E6E4DC] pt-6">
            <p className="italic text-[15px] text-[#0B1F3A]">
              &ldquo;Quality is not just a promise. It is a standard we work toward.&rdquo;
            </p>
            <span className="mx-auto mt-4 block h-[2px] w-12 bg-[#C5A46D]" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default Certifications;