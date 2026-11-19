"use client";
import { SunMedium } from "lucide-react";
import { Container, Reveal, WordReveal, Counter, SERIF, SANS } from "@/components/ui/Animations";

const stats = [
  { node: <Counter to={100} suffix="%" />, label: "Solar Ready", color: "text-[#2E7D32]" },
  { node: <Counter to={40} prefix="-" suffix="%" />, label: "Energy Costs", color: "text-[#171C22]" },
  { node: <Counter to={50} suffix="+ Yr" />, label: "Thermal Shell", color: "text-[#336192]" },
];

const SolarEnergy = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#0B1F3A] py-12 md:py-16`}>
      <Container>
        <Reveal y={40}>
          <div className="flex flex-col gap-8 border-l-4 border-[#2E7D32] bg-white px-6 py-8 sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#2E7D32]">
                <SunMedium size={16} /> Zero-Carbon Grid Independence
              </p>
              <h2 className={`${SERIF} mt-3 text-[#0B1F3A] uppercase text-2xl sm:text-3xl lg:text-4xl leading-[1.15]`}>
                <WordReveal text="Powered by Solar Energy & Wind Energy" />
              </h2>
              <p className="mt-3 text-base italic text-[#171C22]">Clean Energy. Lower Bills. Better Future.</p>
              <p className="mt-4 text-xs leading-[1.8] text-[#44474D]">
                Every precast unit is engineered with integrated roof-load bearing conduits for solar
                micro-inverter arrays, high-density insulation minimizing HVAC loads by 42%, and bidirectional
                battery backup hookups. Actual clean energy capacity is tailored to individual site solar
                irradiance and home sizing.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:shrink-0">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.2 + i * 0.1} y={20}>
                  <div className="flex h-full min-w-[92px] flex-col items-center justify-center bg-[#E8EDF6] px-3 py-5 sm:px-6">
                    <p className={`text-2xl sm:text-4xl font-light ${s.color}`}>{s.node}</p>
                    <p className="mt-2 text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.08em] text-[#44474D]">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default SolarEnergy;