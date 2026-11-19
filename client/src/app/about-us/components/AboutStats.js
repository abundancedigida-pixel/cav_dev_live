"use client";
import { Container, Reveal, Counter, SERIF, SANS } from "@/components/ui/Animations";

const stats = [
  { to: 25, label: "Years" },
  { to: 120, label: "Projects" },
  { to: 4, label: "Sq.Ft.", suffix: "M+" },
  { to: 12, label: "Locations" },
];

const AboutStats = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#0B1F3A]`}>
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} y={20}>
              <div
                className={`h-full border-white/40 px-5 sm:px-8 py-8 md:py-10 ${
                  i === 0 ? "border-l-0" : "border-l"
                } ${i === 2 ? "max-lg:border-l-0" : ""} ${
                  i > 1 ? "max-lg:border-t" : ""
                } ${i === 1 ? "max-lg:border-l" : ""}`}
              >
                <p className={`${SERIF} text-3xl md:text-4xl text-white leading-none`}>
                  <Counter to={s.to} suffix={s.suffix || "+"} />
                </p>
                <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-white">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AboutStats;