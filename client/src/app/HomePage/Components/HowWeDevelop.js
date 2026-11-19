"use client";
import { motion } from "framer-motion";
import { Check, FileText, Shield, HelpCircle, TrendingUp } from "lucide-react";
import { Container, Reveal, EASE, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";

const stages = [
  { n: "01", title: "Location", text: "Context, access and long-term potential." },
  { n: "02", title: "Planning", text: "Efficient, human-centred spatial planning." },
  { n: "03", title: "Architecture", text: "Climate-aware and materially considered." },
  { n: "04", title: "Construction", text: "Capable teams and controlled execution." },
  { n: "05", title: "Quality", text: "Documented checks at every milestone." },
  { n: "06", title: "Delivery", text: "Transparent handover and aftercare." },
];

const promises = [
  { Icon: Check, title: "Quality", text: "Quality-focused construction and materials." },
  { Icon: FileText, title: "Transparency", text: "Clear documentation and communication." },
  { Icon: Shield, title: "Compliance", text: "Approved plans, documentation and responsible processes." },
  { Icon: HelpCircle, title: "Support", text: "Guidance from property selection through handover." },
  { Icon: TrendingUp, title: "Long-term Value", text: "Spaces designed for lasting value." },
];

const HowWeDevelop = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#F3F1EB] py-16`}>
      <Container>
        {/* Process */}
        <Eyebrow>How we develop</Eyebrow>
        <h2 className={`${SERIF} mt-4 text-[#0B1F3A] text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1]`}>
          <WordReveal text="Rigour at Every Stage" />
        </h2>
        <Reveal delay={0.2} className="mt-4">
          <p className="text-[15px] text-[#4F5963]">A disciplined process translates design intent into enduring places.</p>
        </Reveal>

        <div className="relative mt-12 md:mt-14">
          <motion.span
            className="absolute top-0 left-0 hidden lg:block h-px w-full origin-left bg-[#D9DCD9]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: EASE }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 border-t border-[#D9DCD9] lg:border-t-0">
            {stages.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1} y={30}>
                <div className="group relative h-full border-l border-[#D9DCD9] lg:last:border-r px-5 pt-8 pb-10 sm:pb-12 transition-colors duration-500 hover:bg-white/60">
                  <span className="absolute -top-[4px] -left-[4px] h-2 w-2 bg-[#C5A46D] transition-transform duration-500 group-hover:scale-150" />
                  <p className="text-[11px] font-bold text-[#1B4B7F]">{s.n}</p>
                  <h3 className={`${SERIF} mt-8 text-[22px] font-semibold text-[#0B1F3A]`}>{s.title}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-[#4F5963]">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Promise */}
        <div className="mt-12 md:mt-16">
          <Eyebrow className="!text-[10px]">Our Promise</Eyebrow>
          <h2 className="mt-4 text-[#0B1F3A] font-medium tracking-[-0.02em] leading-[1.1] text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
            <WordReveal text="What We Promise. What We Deliver. What Lasts." stagger={0.07} />
          </h2>

          <div className="mt-10 border-t border-[#C4C6CE4D] pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-8">
            {promises.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.1} y={30}>
                <div className="group">
                  <span className="flex h-9 w-9 items-center justify-center bg-[#3361921A] text-[#1B4B7F] transition-colors duration-300 group-hover:bg-[#0B1F3A] group-hover:text-white">
                    <Icon size={16} />
                  </span>
                  <h3 className="mt-4 text-[15px] font-bold uppercase tracking-wide text-[#171C22]">{title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#44474D] max-w-[15rem]">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HowWeDevelop;