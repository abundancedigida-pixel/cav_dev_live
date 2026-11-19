"use client";
import Link from "next/link";
import Image from "next/image";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";
const VillasImg = cloudinary.about.areaOne;
const ITImg = cloudinary.about.areaTwo;

const specs = [
  { k: "Dual-aspect natural cross breeze", v: "100% units" },
  { k: "Acoustic isolation rating", v: "STC 55+" },
  { k: "Ceiling clearance", v: "3.45m clear" },
];

const inclusions = ["Private Soil & Seismic Analysis", "Custom Joinery & Bronze Hardware", "Smart Home KNX Infrastructure"];

const precast = [
  { v: "50%", k: "Faster build" },
  { v: "Zero", k: "Plaster cracks" },
  { v: "M50+", k: "Concrete spec" },
  { v: "100 yr", k: "Design life" },
];

const Meta = ({ left, right, gold = false }) => (
  <div className="flex items-center justify-between gap-3 text-[9px] font-semibold uppercase tracking-[0.15em]">
    <span className={gold ? "text-[#E8C27A]" : "text-[#1B4B7F]"}>{left}</span>
    {right && <span className="text-[#171C22]">{right}</span>}
  </div>
);

const CardLink = ({ href, children, gold = false }) => (
  <Link
    href={href}
    className={`text-[11px] font-semibold uppercase tracking-wide transition-colors ${
      gold ? "text-[#E8C27A] hover:text-white" : "text-[#1B4B7F] hover:text-[#0B1F3A]"
    }`}
  >
    {children} →
  </Link>
);

const PracticeAreas = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16`}>
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <div>
            <Eyebrow className="!text-[10px] !font-semibold !tracking-[0.15em]">Practice Areas</Eyebrow>
            <h2 className={`${SERIF} mt-3 max-w-xl text-[#0B1F3A] text-3xl md:text-4xl lg:text-5xl leading-[1.12]`}>
              <WordReveal text="From Individual Homes to Large-Scale Developments." />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-xs text-[13px] leading-relaxed text-[#4F5963]">
              A coherent continuum of structural competence across luxury personal sanctuaries and
              institutional commercial landmarks.
            </p>
          </Reveal>
        </div>

        {/* Row 1 */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-6">
          <Reveal y={50}>
            <div className="group flex h-full flex-col bg-[#E8EDF6] p-6 md:p-8">
              <Meta left="01 • Residential Mastery" right="Bespoke Sanctuaries" />
              <h3 className="mt-4 text-xl md:text-[22px] font-light text-[#171C22]">Individual Homes &amp; Luxury Villas</h3>
              <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-[#44474D]">
                Private estate residences sculpted with massive granite colonnades, double-height light
                wells, hand-carved wood screens, and seamless landscape integrations designed for
                tropical microclimates.
              </p>
              <div className="relative mt-6 h-[220px] md:h-[260px] overflow-hidden">
                <Image
                  src={VillasImg}
                  alt="Artisans carving wooden screens in a courtyard home"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
                />
              </div>
              <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-xs text-[#44474D]">
                <span>Carpet Areas: 6,500 – 22,000 sq.ft.</span>
                <CardLink href="/properties">Explore capability</CardLink>
              </div>
            </div>
          </Reveal>

          <Reveal y={50} delay={0.12}>
            <div className="flex h-full flex-col border border-[#C4C6CE] bg-white p-6 md:p-8 transition-shadow duration-500 hover:shadow-[0_24px_50px_-28px_rgba(11,31,58,0.4)]">
              <Meta left="02 • High-Rise Enclaves" right="Vertical Estates" />
              <h3 className="mt-4 text-xl md:text-[22px] font-light text-[#171C22]">Masterplanned Apartments</h3>
              <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-[#44474D]">
                High-density luxury engineered with zero common walls between units, dual-aspect
                ventilation corridors, sound-isolated concrete slabs, and private high-speed sky foyers.
              </p>
              <div className="mt-auto space-y-2 bg-[#F7F8FD] p-4 mb-5 mt-8">
                {specs.map((s) => (
                  <div key={s.k} className="flex items-center justify-between gap-3 text-[9px] font-semibold uppercase tracking-[0.12em]">
                    <span className="text-[#171C22]">{s.k}</span>
                    <span className="text-[#1B4B7F]">{s.v}</span>
                  </div>
                ))}
              </div>
              <div>
                <CardLink href="/properties">Explore capability</CardLink>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Row 2 */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Reveal y={50}>
            <div className="group flex h-full flex-col border border-[#C4C6CE] bg-white p-5 md:p-6">
              <Meta left="03 • Commercial" />
              <h3 className="mt-4 text-xl font-light leading-snug text-[#171C22]">IT Parks &amp; Grade-A Towers</h3>
              <p className="mt-3 text-[13px] leading-relaxed text-[#44474D]">
                LEED Platinum corporate campuses built for Fortune 500 enterprises with column-free
                floor plates, integrated solar envelopes, and biophilic landscaped water boulevards.
              </p>
              <div className="relative mt-6 h-[170px] overflow-hidden">
                <Image
                  src={ITImg}
                  alt="Corporate campus with landscaped water boulevard"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
                />
              </div>
              <div className="mt-auto pt-5">
                <CardLink href="/projects">Explore capability</CardLink>
              </div>
            </div>
          </Reveal>

          <Reveal y={50} delay={0.12}>
            <div className="flex h-full flex-col bg-[#F1F0EB] p-5 md:p-6">
              <Meta left="04 • Private Reserves" />
              <h3 className="mt-4 text-xl font-light leading-snug text-[#171C22]">Tailor-Made Turnkey Homes</h3>
              <p className="mt-3 text-[13px] leading-relaxed text-[#44474D]">
                Complete turnkey design-and-build services for private landowners. From municipal
                approvals and structural foundations to bespoke interior carpentry and art lighting
                curation.
              </p>
              <div className="mt-auto mb-5 bg-[#F7F8FD] p-4 mt-8">
                <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#171C22]">Signature Inclusions</p>
                <ul className="mt-3 space-y-2 text-xs text-[#171C22]">
                  {inclusions.map((i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1B4B7F]" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <CardLink href="/tailor-made">Explore capability</CardLink>
              </div>
            </div>
          </Reveal>

          <Reveal y={50} delay={0.24} className="md:col-span-2 lg:col-span-1">
            <div className="flex h-full flex-col bg-[#0B1F3A] p-5 md:p-6 text-white">
              <Meta left="05 • Advanced Methods" gold />
              <h3 className={`${SERIF} mt-4 text-xl leading-snug`}>Precast Engineering</h3>
              <p className="mt-3 text-[13px] leading-relaxed text-[#DEE3EBA6]">
                Factory-manufactured precast elements with laser-guided casting lines. Superior structural
                resilience, factory-grade curing, and rapid zero-defect site assembly.
              </p>
              <div className="mt-auto mb-5 pt-8 grid grid-cols-2 gap-2">
                {precast.map((p) => (
                  <div key={p.k} className="bg-[#FFFFFF0D] px-3 py-3.5 text-center">
                    <p className="text-sm font-medium">{p.v}</p>
                    <p className="mt-1 text-[9px] uppercase tracking-wide text-[#DEE3EB99]">{p.k}</p>
                  </div>
                ))}
              </div>
              <div>
                <CardLink href="/pre-cast-homes" gold>Explore precast engineering</CardLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default PracticeAreas;