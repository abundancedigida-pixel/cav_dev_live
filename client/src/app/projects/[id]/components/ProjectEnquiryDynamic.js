"use client";
import { Container, Reveal, WordReveal, SERIF, SANS } from "@/components/ui/Animations";
import EnquiryForm from "@/components/common/EnquiryForm";

const ProjectEnquiryDynamic = ({ project }) => {
  return (
    <section id="enquiry" className={`${SANS} w-full min-w-0 bg-[#0B1F3A] py-16 scroll-mt-20`}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
          <div className="text-white">
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#A0824E]">
              Private Enquiry & Consultation
            </p>
            <h2 className={`${SERIF} mt-4 text-3xl sm:text-4xl leading-tight`}>
              <WordReveal text={`Register Interest in ${project.projectName}`} />
            </h2>
            <Reveal delay={0.2} className="mt-4 text-[#8FA3C0] text-sm leading-relaxed">
              <p>
                Connect with our development advisors to discuss master alignments, availability, and scheduling private visits for {project.location}.
              </p>
            </Reveal>
          </div>

          <Reveal y={30} delay={0.15}>
            <EnquiryForm
              defaultInterest={project.projectName}
              heading={`Enquire About ${project.projectName}`}
              description="Our concierge desk will respond with project documentation within 24 hours."
              secondaryAction={{ label: "View All Projects", href: "/projects" }}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default ProjectEnquiryDynamic;