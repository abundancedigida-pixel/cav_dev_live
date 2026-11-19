// "use client";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { ArrowDown } from "lucide-react";
// import {
//   Container,
//   ParallaxImage,
//   WordReveal,
//   Reveal,
//   Counter,
//   EASE,
//   SERIF,
//   SANS,
// } from "@/components/ui/Animations";
// import { cloudinary } from "@/assets/Cloudinary";
// const IMG = cloudinary.projects.hero;

// const stats = [
//   { value: "06+", label: "Active Projects" },
//   { value: "03", label: "Metropolitan Hubs" },
//   { counter: { to: 100, suffix: "%" }, label: "Statutory Compliance" },
//   { value: "IGBC", label: "Green Benchmarking" },
// ];

// const ProjectsHero = () => {
//   return (
//     <section
//       className={`${SANS} relative isolate flex w-full min-w-0 overflow-hidden bg-[#0B1F3A]`}
//     >
//       {/* Background */}
//       <div className="absolute inset-0 -z-10">
//         <ParallaxImage
//           src={IMG}
//           alt="High-rise towers lit up against a night sky"
//           className="h-full w-full"
//           strength={10}
//           reveal={false}
//           priority
//           sizes="100vw"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-[#061525CC] via-[#0615258F] to-[#06152526]" />
//       </div>

//       <Container className="relative flex flex-col justify-center pt-32 pb-16">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
//           className="flex flex-wrap items-center gap-3"
//         >
//           <span className="block h-px w-12 bg-[#C9942F]" />
//           <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#C9942F]">
//             Our Projects
//           </p>
//           <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/60">
//             / Portfolio Archive
//           </p>
//         </motion.div>

//         <h1 className="mt-5 max-w-3xl font-light leading-[1.05] tracking-[-0.03em] text-white text-[clamp(2.5rem,6vw,4.5rem)]">
//           <span className="block">
//             <WordReveal text="Creating Places That" delay={0.3} stagger={0.1} />
//           </span>
//           <span className="block">
//             <WordReveal text="Become Landmarks." delay={0.6} stagger={0.1} />
//           </span>
//         </h1>

//         <Reveal delay={0.9} y={24} className="mt-6 md:mt-8 max-w-[38rem]">
//           <p className="text-base md:text-lg font-light leading-relaxed text-white/80">
//             Explore the developments shaped by Abundance Group, from thoughtfully planned residential
//             communities to spaces designed for business, healthcare, and recreation across Vellore, Chennai,
//             and Bengaluru.
//           </p>
//         </Reveal>

//         <Reveal delay={1.1} y={24} className="mt-8 md:mt-10 flex flex-wrap items-stretch gap-3 md:gap-4">
//           <Link
//             href="#developments"
//             className="group inline-flex items-center gap-3 bg-white px-6 py-4 text-[13px] font-medium uppercase tracking-wide text-[#0B1F3A] transition-all duration-300 hover:bg-[#E8C27A]"
//           >
//             Explore our developments
//             <ArrowDown
//               size={14}
//               className="transition-transform duration-300 group-hover:translate-y-1"
//             />
//           </Link>
//           <p className="inline-flex items-center bg-white/10 px-5 py-4 text-[10px] font-medium uppercase tracking-[0.12em] text-white/80 backdrop-blur-sm">
//             Residential • Commercial • Community Development
//           </p>
//         </Reveal>

//         {/* Stats strip */}
//         <Reveal delay={1.3} y={30} className="mt-10 md:mt-14 w-full max-w-5xl">
//           <div className="grid grid-cols-2 gap-y-6 rounded-r-2xl border border-white/30 bg-white/5 px-4 py-6 backdrop-blur-md sm:px-5 lg:grid-cols-4">
//             {stats.map((s) => (
//               <div key={s.label}>
//                 <p className={`${SERIF} text-3xl md:text-4xl leading-none text-white`}>
//                   {s.counter ? <Counter to={s.counter.to} suffix={s.counter.suffix} /> : s.value}
//                 </p>
//                 <p className="mt-3 text-[9px] font-medium uppercase tracking-[0.1em] text-[#E8C27A]">
//                   {s.label}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </Reveal>
//       </Container>
//     </section>
//   );
// };

// export default ProjectsHero;



"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import {
  Container,
  ParallaxImage,
  WordReveal,
  Reveal,
  Counter,
  EASE,
  SERIF,
  SANS,
} from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";
const IMG = cloudinary.projects.hero;

const stats = [
  { value: "06+", label: "Active Projects" },
  { value: "03", label: "Metropolitan Hubs" },
  { counter: { to: 100, suffix: "%" }, label: "Statutory Compliance" },
  { value: "IGBC", label: "Green Benchmarking" },
];

const ProjectsHero = () => {
  return (
    <section
      className={`${SANS} relative isolate w-full min-w-0 overflow-hidden bg-[#0B1F3A] flex`}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <ParallaxImage
          src={IMG}
          alt="High-rise towers lit up against a night sky"
          className="h-full w-full"
          strength={10}
          reveal={false}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061525CC] via-[#0615258F] to-[#06152526]" />
      </div>

      <Container className="relative flex flex-col justify-center pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="flex flex-wrap items-center gap-3"
        >
          <span className="block h-px w-12 bg-[#E8C27A]" />
          <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#E8C27A]">
            Our Projects
          </p>
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/80">
            / Portfolio Archive
          </p>
        </motion.div>

        <h1 className="mt-5 max-w-2xl font-light text-white tracking-[-0.03em] leading-[1.05] text-4xl md:text-5xl lg:text-6xl">
          <span className="block">
            <WordReveal text="Creating Places That" delay={0.3} stagger={0.1} />
          </span>
          <span className="block">
            <WordReveal text="Become Landmarks." delay={0.6} stagger={0.1} />
          </span>
        </h1>

        <Reveal delay={0.9} y={24} className="mt-6 md:mt-8 max-w-2xl">
          <p className="text-base md:text-lg font-light leading-relaxed text-white/80">
            Explore the developments shaped by Abundance Group, from thoughtfully planned residential
            communities to spaces designed for business, healthcare, and recreation across Vellore, Chennai,
            and Bengaluru.
          </p>
        </Reveal>

        <Reveal delay={1.1} y={24} className="mt-8 md:mt-10 flex flex-wrap items-stretch gap-3 md:gap-4">
          <Link
            href="#developments"
            className="group inline-flex items-center gap-3 bg-white text-[#0B1F3A] text-[13px] font-bold px-6 py-3.5 transition-all duration-300 hover:bg-[#E8C27A]"
          >
            Explore Our Developments
            <ArrowDown
              size={14}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </Link>
          <p className="inline-flex items-center bg-white/10 px-5 py-3.5 text-[10px] uppercase tracking-[0.15em] text-white/80 backdrop-blur-sm">
            Residential • Commercial • Community Development
          </p>
        </Reveal>

        {/* Stats strip */}
        <Reveal delay={1.3} y={30} className="mt-10 md:mt-14 w-full max-w-5xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 rounded-lg border border-white/40 bg-white/10 px-5 py-6 backdrop-blur-sm">
            {stats.map((s) => (
              <div key={s.label}>
                <p className={`${SERIF} text-3xl md:text-4xl leading-none text-white`}>
                  {s.counter ? <Counter to={s.counter.to} suffix={s.counter.suffix} /> : s.value}
                </p>
                <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.15em] text-[#E8C27A]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default ProjectsHero;