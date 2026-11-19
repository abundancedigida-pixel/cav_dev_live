"use client";
import { CheckCircle2, BadgeCheck, FileText, ClipboardCheck, ShieldCheck } from "lucide-react";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";

const mandatory = [
  "PAN Card (Entity & Promoters)",
  "GST Registration Certificate",
  "Current Bank Account & Cheque",
  "Business Address Proof",
  "Verified Mobile & Email Dossier",
  "Brand Trademark Registration",
  "Certified Product Catalogue",
  "High-Res Media & Walkthroughs",
  "Standardised Product Specs",
  "HSN Code & GST Breakup",
  "Warranty Policy Document",
  "Standard Tax Invoice Format",
];

const technical = [
  { title: "Structural Design Certificate", text: "IIT / Empaneled Structural Engineers vetting seismic, wind shear, and dead load capacities." },
  { title: "Material Test Reports (MTR)", text: "NABL laboratory cube compressive strength (M40/M50 grade), tensile rebar, and aggregate durability tests." },
  { title: "Quality Assurance (QA/QC) Dossier", text: "Plant-level steam curing logs, mold dimensional tolerance check sheets (within ±2mm margin)." },
  { title: "Installation & Grouting Manual", text: "Comprehensive field mechanical erection guide, non-shrink grout specifications, and crane rigging protocols." },
  { title: "10-Year Product Warranty Certificate", text: "Manufacturer warranty against structural degradation, concrete spalling, and waterproof seal integrity." },
  { title: "Transportation & Installation Guidelines", text: "Highway clearance permissions, low-bed multi-axle trailer parameters, and site turning radii requirements." },
];

const RegulatoryDocs = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#F1F0EB] py-12 md:py-16`}>
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow className="!text-[9px] !font-medium !tracking-[0.2em]">Compliance &amp; Verification Protocol</Eyebrow>
          <h2 className={`${SERIF} mt-3 text-[#0B1F3A] uppercase text-2xl sm:text-4xl lg:text-5xl leading-[1.1]`}>
            <WordReveal text="Regulatory & Technical Documentation" />
          </h2>
          <Reveal delay={0.2} className="mt-5 max-w-xl">
            <p className="text-[15px] leading-[1.7] text-[#44474D]">
              Strict technical transparency and corporate compliance frameworks ensuring frictionless marketplace
              listings, institutional finance, and statutory approvals.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Mandatory */}
          <Reveal y={40}>
            <div className="h-full border-t-[3px] border-t-[#0B1F3A] bg-white p-5 sm:p-8">
              <div className="flex items-center gap-3 border-b border-[#EDEBE4] pb-4">
                <FileText size={22} className="text-[#0B1F3A]" />
                <div>
                  <h3 className="text-base sm:text-lg font-medium uppercase text-[#171C22]">Mandatory Documents</h3>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#44474D]">Seller onboarding &amp; legal compliance</p>
                </div>
              </div>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {mandatory.map((m) => (
                  <li key={m} className="flex items-center gap-2.5 text-[13px] text-[#171C22]">
                    <CheckCircle2 size={16} className="shrink-0 fill-[#336192] text-white" />
                    {m}
                  </li>
                ))}
              </ul>
              <p className="mt-8 flex items-start gap-3 bg-[#E8EDF6] px-4 py-3.5 text-[11px] leading-relaxed text-[#44474D]">
                <ShieldCheck size={14} className="mt-0.5 shrink-0 text-[#336192]" />
                Direct integration with national marketplace seller portals under Chapter 68 building materials
                classification.
              </p>
            </div>
          </Reveal>

          {/* Technical */}
          <Reveal y={40} delay={0.12}>
            <div className="h-full border-t-[3px] border-t-[#FFDEA9] bg-white p-5 sm:p-8">
              <div className="flex items-center gap-3 border-b border-[#EDEBE4] pb-4">
                <ClipboardCheck size={22} className="text-[#336192]" />
                <div>
                  <h3 className="text-base sm:text-lg font-medium uppercase text-[#171C22]">Technical &amp; Quality Documents</h3>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#44474D]">Civil structural engineering verifications</p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {technical.map((t) => (
                  <div key={t.title} className="flex gap-3 bg-[#F1F0EB] px-4 py-4">
                    <BadgeCheck size={16} className="mt-1 shrink-0 fill-[#336192] text-white" />
                    <div>
                      <h4 className="text-base font-medium text-[#171C22]">{t.title}</h4>
                      <p className="mt-1 max-w-md text-xs leading-relaxed text-[#44474D]">{t.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default RegulatoryDocs;