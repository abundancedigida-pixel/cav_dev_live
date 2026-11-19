"use client";
import { Container, Reveal, SANS } from "@/components/ui/Animations";

const ProjectSpecs = ({ project }) => {
  const specs = [
    { label: "Category", value: project.category?.join(", ") || "Residential" },
    { label: "Location", value: project.location || "Regional" },
    { label: "Total Acreage", value: project.totalAcreage ? `${project.totalAcreage} Acres` : "Scale on Request" },
    { label: "Target Delivery", value: project.targetDelivery || "Consult Team" },
  ];

  return (
    <section className={`${SANS} w-full min-w-0 bg-white py-12`}>
      <Container>
        <Reveal y={20}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 border border-[#E6E4DC] bg-[#FAF9F6] p-6 sm:p-8">
            {specs.map((s) => (
              <div key={s.label} className="border-l-2 border-[#336192] pl-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#77787D]">{s.label}</p>
                <p className="mt-2 text-base sm:text-lg font-medium text-[#0B1F3A]">{s.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default ProjectSpecs;