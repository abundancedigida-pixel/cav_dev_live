"use client";
import { Mail, Phone } from "lucide-react";
import { Container, Reveal, WordReveal, SERIF, SANS } from "@/components/ui/Animations";
import EnquiryForm from "@/components/common/EnquiryForm";

const ProjectEnquiry = () => {
  return (
    <section
      id="enquiry"
      className={`${SANS} w-full min-w-0 overflow-hidden bg-[#0B1F3A] py-14 md:py-20 scroll-mt-20`}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 lg:gap-16 items-stretch">
          {/* Left */}
          <div className="flex flex-col">
            <Reveal y={16}>
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white">
                Founding Register Access
              </p>
            </Reveal>
            <h2 className={`${SERIF} mt-4 max-w-md text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.15]`}>
              <WordReveal text="Begin Your UNIQUE 70 Conversation." />
            </h2>
            <Reveal delay={0.3} className="mt-5">
              <p className="max-w-md text-[15px] md:text-[17px] leading-[1.7] text-[#8FA3C0]">
                Connect with the Abundance Group team to learn more about the proposed residences,
                home layouts, plot details, and the founding concept.
              </p>
            </Reveal>

            <Reveal delay={0.4} y={30} className="mt-8 md:mt-10 max-w-[38rem]">
              <div className="border border-white/10 bg-[#061426] p-5 sm:p-6">
                <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
                  Reservation Advisory
                </p>
                <p className="mt-3 max-w-md text-[13px] leading-relaxed text-[#8FA3C0]">
                  Private previews are arranged individually. Refundable reservation tokens to secure
                  an edition allocation are handled in accordance with the project charter.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.5} y={20} className="mt-10 lg:mt-auto lg:pt-16">
              <div className="space-y-3 text-[15px] text-[#8FA3C0]">
                <a
                  href="mailto:direct.enquiry@abundancegroup.in"
                  className="flex items-center gap-3 transition-colors hover:text-white"
                >
                  <Mail size={16} className="shrink-0" />
                  direct.enquiry@abundancegroup.in
                </a>
                <a href="tel:+914162207070" className="flex items-center gap-3 transition-colors hover:text-white">
                  <Phone size={16} className="shrink-0" />
                  Direct Concierge Desk: +91 416 220 7070
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: shared form (see EnquiryForm patch for these props) */}
          <Reveal y={40} delay={0.15}>
            <EnquiryForm
              defaultInterest="Independent Homes"
              hideInterest
              soft
              heading="Private Preview Registration"
              description="Please provide your details to request an invitation to the preview briefing."
              secondaryAction={{ label: "Contact Abundance Group", href: "/contact" }}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default ProjectEnquiry;