"use client";
import { FileText, Download } from "lucide-react";
import { Container, Reveal, SERIF, SANS } from "@/components/ui/Animations";

const BrochureDownload = ({ project }) => {
  if (!project.architecturalBrochure?.url) return null;

  return (
    <section className={`${SANS} w-full min-w-0 bg-[#0B1F3A] py-12 border-b border-white/30 text-white`}>
      <Container>
        <Reveal y={20}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 p-6 md:p-8 bg-[#061426]">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10">
                <FileText size={28} className="text-[#A0824E]" />
              </div>
              <div>
                <h3 className={`${SERIF} text-xl md:text-2xl`}>Master Architectural Brochure</h3>
                <p className="text-xs text-[#8FA3C0] mt-1">
                  Full specifications, floor alignments & elevation documents ({project.architecturalBrochure.originalFilename || "PDF"})
                </p>
              </div>
            </div>
            <a
              href={project.architecturalBrochure.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0B1F3A] hover:bg-[#F1F0EB] transition-colors"
            >
              <Download size={14} />
              Download Dossier
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default BrochureDownload;