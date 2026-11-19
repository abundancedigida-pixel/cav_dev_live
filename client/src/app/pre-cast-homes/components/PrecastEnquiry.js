"use client";
import { Container, Reveal, SANS } from "@/components/ui/Animations";
import EnquiryForm from "@/components/common/EnquiryForm";

const PrecastEnquiry = () => {
  return (
    <section
      id="enquiry"
      className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-12 md:py-16 scroll-mt-20`}
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal y={40}>
            {/* Shared form, Precast preselected */}
            <EnquiryForm
              eyebrow="DIRECT CLIENT DESK"
              heading="LOOKING FOR YOUR IDEAL PRECAST HOME?"
              description="Explore our home designs, discuss the available specifications, and share you requirements with Abundance Group architectural engineers."
              defaultInterest="Precast"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default PrecastEnquiry;
