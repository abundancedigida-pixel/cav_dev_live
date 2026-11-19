"use client";
import { Fragment } from "react";
import { ArrowRightLeft, Sparkles } from "lucide-react";
import { Container, Reveal, WordReveal, SERIF, SANS } from "@/components/ui/Animations";

const words = ["Dream", "Desire", "Discipline", "Direction", "Determination"];

const pillars = [
  {
    Icon: ArrowRightLeft,
    title: "Connect. Collaborate. Create. Grow.",
    text: "Active spaces conceived to foster mutual elevation, entrepreneurial partnerships, and community cohesion.",
  },
  {
    Icon: Sparkles,
    title: "Solutions • Convenience • Experience",
    text: "Three consumer pillars that transform physical architecture into effortless, high-trust everyday living.",
  },
];

/* Layout is plain CSS on purpose, so it does not depend on Tailwind scanning this file. */
const css = `
.bs-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:24px;align-items:start}
.bs-left{min-width:0}
.bs-right{min-width:0}
.bs-pillar{display:flex;align-items:flex-start;gap:16px}
.bs-dot{display:none;width:4px;height:4px;border-radius:9999px;background:#9AA4B5}
@media (min-width:640px){.bs-dot{display:block}}
@media (min-width:1024px){
  .bs-grid{grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:20px}
  .bs-left{padding-top:16px}
}
`;

const BetterSpaces = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16`}>
      <style>{css}</style>
      <Container>
        {/* faint outer frame, as in the design */}
        <div className="py-8">
          <div className="bs-grid">
            {/* Left: eyebrow, heading, paragraph, word strip */}
            <div className="bs-left">
              <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-[#9A7B3F]">
                The Abundance Mindset
              </p>
              <h2 className={`${SERIF} mt-3 max-w-lg text-[#171C22] text-3xl lg:text-4xl leading-[1.15]`}>
                <WordReveal text="Better Spaces. Stronger Communities." />
              </h2>
              <Reveal delay={0.2} className="mt-3">
                <p className="max-w-lg text-[15px] leading-[1.7] text-[#44474D]">
                  Our vision goes beyond individual buildings. We aim to create places that support better
                  living, meaningful connections, and lasting value across generations.
                </p>
              </Reveal>

              <Reveal delay={0.3} y={24} className="mt-6">
                <ul
                  className="bg-[#EEF3FC]"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    columnGap: 16,
                    rowGap: 8,
                    padding: "16px",
                    listStyle: "none",
                    margin: 0,
                  }}
                >
                  {words.map((w, i) => (
                    <Fragment key={w}>
                      <li className="text-[9px] font-bold uppercase tracking-[0.06em] text-[#171C22]">{w}</li>
                      {i < words.length - 1 && <li aria-hidden="true" className="bs-dot" />}
                    </Fragment>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Right: single box */}
            <Reveal delay={0.2} x={30} y={0} className="bs-right">
              <div className="bg-[#E8EDF6]" style={{ padding: "20px 24px" }}>
                {pillars.map(({ Icon, title, text }, i) => (
                  <div
                    key={title}
                    className="bs-pillar"
                    style={
                      i > 0
                        ? { marginTop: 16, paddingTop: 16, borderTop: "1px solid #D5DCEA" }
                        : undefined
                    }
                  >
                    <Icon size={16} color="#336192" style={{ flexShrink: 0, marginTop: 4 }} />
                    <div style={{ minWidth: 0 }}>
                      <h3 className="max-w-xs text-[15px] font-medium leading-snug text-[#171C22]">{title}</h3>
                      <p className="mt-2 max-w-xs text-[11px] leading-[1.7] text-[#44474D]">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BetterSpaces;