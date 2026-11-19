// // "use client";
// // import Link from "next/link";
// // import { Container, Reveal, WordReveal, SERIF, SANS } from "@/components/ui/Animations";

// // const ExploreCTA = () => {
// //   return (
// //     <section className={`${SANS} relative w-full min-w-0 overflow-hidden bg-[#0B1F3A] py-16 md:py-24`}>
// //       {/* Decorative blueprint circle */}
// //       <div className="pointer-events-none absolute -bottom-40 -right-24 hidden h-[420px] w-[420px] rounded-full border border-white/10 md:block" />
// //       <div className="pointer-events-none absolute bottom-0 right-[8%] hidden h-[300px] w-px bg-white/10 md:block" />
// //       <div className="pointer-events-none absolute bottom-[120px] right-0 hidden h-px w-[420px] bg-white/10 md:block" />

// //       <Container className="relative">
// //         <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] gap-10 lg:gap-16 items-center">
// //           <div>
// //             <Reveal y={16} className="flex items-center gap-3">
// //               <span className="h-px w-8 bg-[#B07F2E]" />
// //               <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#C9942F]">Engagement &amp; Inquiry</p>
// //             </Reveal>
// //             <h2 className={`${SERIF} mt-5 text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.15]`}>
// //               <WordReveal text="Let’s Explore What’s Possible." />
// //             </h2>
// //             <Reveal delay={0.3} className="mt-6 max-w-xl">
// //               <p className="text-base leading-[1.75] text-[#9FB0CC]">
// //                 Discover an Abundance Group development that aligns with your interests, ambitions, and vision
// //                 for the future. Our development and advisory team is at your disposal.
// //               </p>
// //             </Reveal>

// //             <Reveal delay={0.4} y={30} className="mt-8 max-w-xl">
// //               <div className="border-l-2 border-[#B07F2E] bg-[#07162B] px-6 py-5">
// //                 <p className="text-base font-medium text-white">Looking for immediate residential acquisitions?</p>
// //                 <p className="mt-2 text-[13px] leading-relaxed text-[#9FB0CC]">
// //                   While our{" "}
// //                   <Link href="/projects" className="text-white hover:text-[#FFDEA9]">Projects</Link>{" "}
// //                   portal outlines broad master developments and long-term visions, our{" "}
// //                   <Link href="/properties" className="text-white underline underline-offset-2 hover:text-[#FFDEA9]">Properties</Link>{" "}
// //                   catalog showcases individual residences currently available for ownership.
// //                 </p>
// //               </div>
// //             </Reveal>
// //           </div>

// //           <Reveal delay={0.3} x={30} y={0}>
// //             <div className="mx-auto w-full max-w-md lg:max-w-none">
// //               <Link
// //                 href="/contact-us"
// //                 className="block bg-[#F7F8FD] px-6 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0B1F3A] transition-colors duration-300 hover:bg-white"
// //               >
// //                 Talk to our team
// //               </Link>
// //               <Link
// //                 href="/properties"
// //                 className="mt-4 block border border-[#C9942F] bg-[#B07F2E] px-6 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:bg-[#C9942F]"
// //               >
// //                 Explore properties catalog
// //               </Link>
// //               <p className="mt-4 text-center text-[8px] font-medium uppercase tracking-[0.12em] text-[#5E7396]">
// //                 Private wealth &amp; strategic advisory desk
// //               </p>
// //             </div>
// //           </Reveal>
// //         </div>
// //       </Container>
// //     </section>
// //   );
// // };

// // export default ExploreCTA;

// "use client";
// import Link from "next/link";
// import { Container, Reveal, WordReveal, SERIF, SANS } from "@/components/ui/Animations";

// const ExploreCTA = () => {
//   return (
//     <section className={`${SANS} relative w-full min-w-0 overflow-hidden bg-[#0B1F3A] py-16 md:py-24`}>
//       {/* Decorative blueprint lines */}
//       <div className="pointer-events-none absolute -bottom-40 -right-24 hidden h-[420px] w-[420px] rounded-full border border-white/10 md:block" />
//       <div className="pointer-events-none absolute bottom-0 right-[8%] hidden h-[300px] w-px bg-white/10 md:block" />
//       <div className="pointer-events-none absolute bottom-[120px] right-0 hidden h-px w-[420px] bg-white/10 md:block" />

//       <Container className="relative">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
//           {/* Left */}
//           <div className="min-w-0 lg:col-span-8">
//             <Reveal y={16} className="flex items-center gap-3">
//               <span className="block h-px w-8 bg-[#B07F2E]" />
//               <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#C9942F]">
//                 Engagement &amp; Inquiry
//               </p>
//             </Reveal>

//             <h2 className={`${SERIF} mt-5 text-3xl sm:text-4xl lg:text-5xl leading-[1.15] text-white`}>
//               <WordReveal text="Let’s Explore What’s Possible." />
//             </h2>

//             <Reveal delay={0.3} className="mt-6 max-w-xl">
//               <p className="text-base leading-[1.75] text-[#9FB0CC]">
//                 Discover an Abundance Group development that aligns with your interests, ambitions, and vision
//                 for the future. Our development and advisory team is at your disposal.
//               </p>
//             </Reveal>

//             <Reveal delay={0.4} y={30} className="mt-8 max-w-xl">
//               <div className="border-l-2 border-[#B07F2E] bg-[#07162B] px-6 py-5">
//                 <p className="text-base font-medium text-white">Looking for immediate residential acquisitions?</p>
//                 <p className="mt-2 text-[13px] leading-relaxed text-[#9FB0CC]">
//                   While our{" "}
//                   <Link href="/projects" className="text-white hover:text-[#FFDEA9]">Projects</Link>{" "}
//                   portal outlines broad master developments and long-term visions, our{" "}
//                   <Link href="/properties" className="text-white underline underline-offset-2 hover:text-[#FFDEA9]">Properties</Link>{" "}
//                   catalog showcases individual residences currently available for ownership.
//                 </p>
//               </div>
//             </Reveal>
//           </div>

//           {/* Right: buttons */}
//           <Reveal delay={0.3} x={30} y={0} className="min-w-0 lg:col-span-4">
//             <div className="mx-auto w-full max-w-md lg:max-w-none">
//               <Link
//                 href="/contact-us"
//                 className="block bg-[#F7F8FD] px-6 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0B1F3A] transition-colors duration-300 hover:bg-white"
//               >
//                 Talk to our team
//               </Link>
//               <Link
//                 href="/properties"
//                 className="mt-4 block border border-[#C9942F] bg-[#B07F2E] px-6 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:bg-[#C9942F]"
//               >
//                 Explore properties catalog
//               </Link>
//               <p className="mt-4 text-center text-[8px] font-medium uppercase tracking-[0.12em] text-[#5E7396]">
//                 Private wealth &amp; strategic advisory desk
//               </p>
//             </div>
//           </Reveal>
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default ExploreCTA;

"use client";
import Link from "next/link";
import {
  Container,
  Reveal,
  WordReveal,
  SERIF,
  SANS,
} from "@/components/ui/Animations";

/* Layout + colours are plain CSS on purpose, so they do not depend on Tailwind scanning this file. */
const css = `
.ec-section{position:relative;width:100%;min-width:0;overflow:hidden;background:#0B1F3A;padding:64px 0}
.ec-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:40px;align-items:center}
.ec-left,.ec-right{min-width:0}

.ec-eyebrow{display:flex;align-items:center;gap:12px}
.ec-line{display:block;width:32px;height:1px;background:#B07F2E}
.ec-eyebrow-text{margin:0;font-size:10px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:#C9942F}

.ec-h2{margin:20px 0 0;color:#fff;font-size:30px;line-height:1.15;font-weight:400}
.ec-para{margin:24px 0 0;max-width:36rem;font-size:16px;line-height:1.75;color:#9FB0CC}

.ec-note{margin-top:32px;max-width:36rem;border-left:2px solid #B07F2E;background:#07162B;padding:20px 24px}
.ec-note-title{margin:0;font-size:16px;font-weight:500;color:#fff}
.ec-note-text{margin:8px 0 0;font-size:13px;line-height:1.65;color:#9FB0CC}
.ec-note-text a{color:#fff;text-decoration:none;transition:color .3s}
.ec-note-text a:hover{color:#FFDEA9}
.ec-note-text a.ec-underline{text-decoration:underline;text-underline-offset:2px}

.ec-right-inner{width:100%;max-width:28rem;margin:0 auto}
.ec-btn{display:block;padding:16px 24px;text-align:center;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;transition:background .3s,color .3s}
.ec-btn-light{background:#F7F8FD;color:#0B1F3A}
.ec-btn-light:hover{background:#fff}
.ec-btn-gold{margin-top:16px;background:#B07F2E;border:1px solid #C9942F;color:#fff}
.ec-btn-gold:hover{background:#C9942F}
.ec-caption{margin:16px 0 0;text-align:center;font-size:8px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#5E7396}

.ec-deco{display:none;position:absolute;pointer-events:none}
.ec-deco-circle{bottom:-160px;right:-96px;width:420px;height:420px;border-radius:9999px;border:1px solid rgba(255,255,255,.1)}
.ec-deco-v{bottom:0;right:8%;width:1px;height:300px;background:rgba(255,255,255,.1)}
.ec-deco-h{bottom:120px;right:0;width:420px;height:1px;background:rgba(255,255,255,.1)}

@media (min-width:640px){.ec-h2{font-size:36px}}
@media (min-width:768px){
  .ec-section{padding:96px 0}
  .ec-deco{display:block}
}
@media (min-width:1024px){
  .ec-h2{font-size:48px}
  .ec-grid{grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr);gap:64px}
  .ec-right-inner{max-width:none}
}
`;

const ExploreCTA = () => {
  return (
    <section className={`${SANS} ec-section`}>
      <style>{css}</style>

      {/* Decorative blueprint lines */}
      <div className="ec-deco ec-deco-circle" />
      <div className="ec-deco ec-deco-v" />
      <div className="ec-deco ec-deco-h" />

      <Container className="relative">
        <div className="ec-grid">
          {/* Left */}
          <div className="ec-left">
            <Reveal y={16} className="ec-eyebrow">
              <span className="ec-line" />
              <p className="ec-eyebrow-text">Engagement &amp; Inquiry</p>
            </Reveal>

            <h2 className={`${SERIF} ec-h2`}>
              <WordReveal text="Let’s Explore What’s Possible." />
            </h2>

            <Reveal delay={0.3}>
              <p className="ec-para">
                Discover an Abundance Group development that aligns with your
                interests, ambitions, and vision for the future. Our development
                and advisory team is at your disposal.
              </p>
            </Reveal>

            <Reveal delay={0.4} y={30}>
              <div className="ec-note">
                <p className="ec-note-title">
                  Looking for immediate residential acquisitions?
                </p>
                <p className="ec-note-text">
                  While our <Link href="/projects">Projects</Link> portal
                  outlines broad master developments and long-term visions, our{" "}
                  <Link href="/properties" className="ec-underline">
                    Properties
                  </Link>{" "}
                  catalog showcases individual residences currently available
                  for ownership.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: buttons */}
          <Reveal delay={0.3} x={30} y={0} className="ec-right">
            <div className="ec-right-inner">
              <Link href="/contact-us" className="ec-btn ec-btn-light">
                Talk to our team
              </Link>
              <Link href="/properties" className="ec-btn ec-btn-gold">
                Explore properties catalog
              </Link>
              <p className="ec-caption">
                Private wealth &amp; strategic advisory desk
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default ExploreCTA;
