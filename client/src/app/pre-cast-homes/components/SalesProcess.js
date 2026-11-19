"use client";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";

const steps = [
  { title: "Register as Seller", text: "Establish legal compliance, verify GST and brand registrations across authorized marketplace channels." },
  { title: "Create Product Listings", text: "Structure standardised precast home SKU configurations with fixed dimensions and customization tiers." },
  { title: "Upload Visual Assets", text: "Publish photo portfolios, 3D interactive walk-throughs, elevation renderings, and certified floor plans." },
  { title: "Receive Enquiries", text: "Immediate engagement with prospective homeowners, capturing plot coordinates, access roads, and sizing." },
  { title: "Site Survey & Quote", text: "Civil engineer dispatch to assess soil conditions, road approach clearance, foundation requirements, and quote." },
  { title: "Sales Agreement", text: "Sign formal bipartite civil contract, lock finishes, agree payment milestones, and establish delivery timeline." },
  { title: "Precast Manufacture", text: "Precision automated robotic casting in factory environment, high-grade steam curing, and QA batch testing." },
  { title: "Deliver & Install", text: "Transport modules to site via heavy trailers; crane erection onto pre-laid plinth within 3 to 7 days." },
  { title: "Customer Handover", text: "Final joinery sealing, MEP integration, deep cleaning, client walkthrough inspection, and key delivery." },
];

const tone = (i) => {
  if (i < 4) return { top: "border-t-[#0B1F3A]", num: "text-[#E0E0E0]" };
  if (i < 6) return { top: "border-t-[#336192]", num: "text-[#336192]" };
  return { top: "border-t-[#F0DFB9]", num: "text-[#9A7B3F]" };
};

const SalesProcess = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-12 md:py-16`}>
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <div>
            <Eyebrow className="!text-[9px] !font-semibold !tracking-[0.15em]">Turnkey Delivery Method</Eyebrow>
            <h2 className={`${SERIF} mt-2 text-[#0B1F3A] uppercase text-3xl md:text-4xl lg:text-5xl leading-[1.1]`}>
              <WordReveal text="Sales & Execution Process" />
            </h2>
            <Reveal delay={0.2} className="mt-3 max-w-lg">
              <p className="text-sm leading-relaxed text-[#44474D]">
                A linear nine-phase engineering protocol from initial marketplace discovery to physical key handover.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.3}>
            <span className="inline-block bg-[#E8EDF6] px-3 py-2 text-[10px] uppercase tracking-wide text-[#44474D]">
              Standard lead time: 30 - 45 days
            </span>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
          {steps.map((s, i) => {
            const t = tone(i);
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.1} y={40}>
                <div className={`group h-full border-t-2 ${t.top} border-x border-b border-x-[#F1F0EB] border-b-[#F1F0EB] bg-white px-5 pt-4 pb-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(11,31,58,0.35)]`}>
                  <p className={`font-mono text-3xl font-bold ${t.num}`}>{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-[15px] font-semibold uppercase tracking-wide text-[#0B1F3A]">{s.title}</h3>
                  <p className="mt-2 max-w-[17rem] text-xs leading-[1.7] text-[#44474D]">{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default SalesProcess;