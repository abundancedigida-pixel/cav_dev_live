// "use client";
// import { PhoneCall } from "lucide-react";
// import {
//   Container,
//   Reveal,
//   WordReveal,
//   SANS,
// } from "@/components/ui/Animations";
// import EnquiryForm from "@/components/common/EnquiryForm";

// const PrivateConsultation = () => {
//   return (
//     <section
//       id="consultation"
//       className={`${SANS} w-full min-w-0 overflow-hidden bg-[#0B1F3A] py-16`}
//     >
//       <Container>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
//           {/* Left */}
//           <div>
//             <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFDEA9]">
//               Private Consultation
//             </p>
//             <h2 className="mt-5 max-w-lg font-light text-white tracking-[-0.02em] leading-[1.1] text-3xl md:text-4xl lg:text-5xl">
//               <WordReveal text="See It Before You Decide. Experience Aurelia in Person." />
//             </h2>
//             <span className="mt-6 block h-1 w-16 bg-[#E8C27A]" />
//             <Reveal delay={0.3} className="mt-6 max-w-xl">
//               <p className="text-lg leading-relaxed text-white/90">
//                 Walk the Italian marble corridors, measure the breeze on our
//                 cantilevered balconies, and examine the monolithic structural
//                 tolerances with an Atelier Senior Architectural Consultant.
//               </p>
//             </Reveal>

//             <Reveal delay={0.4} y={30} className="mt-8 max-w-xl">
//               <div className="bg-[#000615] p-5">
//                 <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide text-[#FFDEA9]">
//                   <PhoneCall size={14} /> Direct Client Desk
//                 </p>
//                 <p className="mt-2 text-sm text-white">
//                   Prefer an immediate confidential phone consultation?
//                 </p>
//                 <a
//                   href="tel:+914448902200"
//                   className="mt-2 block text-2xl font-medium text-[#FFDEA9]"
//                 >
//                   +91 44 4890 2200
//                 </a>
//                 <p className="mt-2 text-xs text-white/80">
//                   Available daily from 09:00 to 20:00 IST
//                 </p>
//               </div>
//             </Reveal>
//           </div>

//           {/* Right: shared form */}
//           <Reveal y={40} delay={0.15}>
//             <EnquiryForm
//               heading="Book Private Site Visit & Model Tour"
//               description="Complimentary chauffeur pickup available for verified appointments in Chennai & NRI visitors."
//             />
//           </Reveal>
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default PrivateConsultation;







"use client";
import { PhoneCall } from "lucide-react";
import {
  Container,
  Reveal,
  WordReveal,
  SANS,
} from "@/components/ui/Animations";
import EnquiryForm from "@/components/common/EnquiryForm";

const PrivateConsultation = ({ property }) => {
  return (
    <section
      id="consultation"
      className={`${SANS} w-full min-w-0 overflow-hidden bg-[#0B1F3A] py-16`}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFDEA9]">
              Private Consultation
            </p>
            <h2 className="mt-5 max-w-lg font-light text-white tracking-[-0.02em] leading-[1.1] text-3xl md:text-4xl lg:text-5xl">
              <WordReveal text={`See It Before You Decide. Experience ${property?.propertyName || "Your Residence"} in Person.`} />
            </h2>
            <span className="mt-6 block h-1 w-16 bg-[#E8C27A]" />
            <Reveal delay={0.3} className="mt-6 max-w-xl">
              <p className="text-lg leading-relaxed text-white/90">
                Walk through the spacious corridors, feel the natural cross-ventilation, and examine the
                exceptional structural tolerances with a Senior Consultant at {property?.propertyName}.
              </p>
            </Reveal>

            <Reveal delay={0.4} y={30} className="mt-8 max-w-xl">
              <div className="bg-[#000615] p-5">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide text-[#FFDEA9]">
                  <PhoneCall size={14} /> Direct Client Desk
                </p>
                <p className="mt-2 text-sm text-white">
                  Prefer an immediate confidential phone consultation?
                </p>
                <a
                  href="tel:+914448902200"
                  className="mt-2 block text-2xl font-medium text-[#FFDEA9]"
                >
                  +91 44 4890 2200
                </a>
                <p className="mt-2 text-xs text-white/80">
                  Available daily from 09:00 to 20:00 IST
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: shared form */}
          <Reveal y={40} delay={0.15}>
            <EnquiryForm
              heading="Book Private Site Visit & Model Tour"
              description={`Complimentary chauffeur pickup available for verified appointments to inspect ${property?.propertyName || "our developments"}.`}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default PrivateConsultation;