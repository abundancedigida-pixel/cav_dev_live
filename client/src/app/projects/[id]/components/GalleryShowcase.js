"use client";
import Image from "next/image";
import { Container, Reveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";

const GalleryShowcase = ({ project }) => {
  const gallery = project.galleryImages || [];
  if (gallery.length === 0) return null;

  return (
    <section className={`${SANS} w-full min-w-0 bg-white pb-16 pt-8`}>
      <Container>
        <Eyebrow className="!text-[10px]">Visual Portfolio</Eyebrow>
        <h2 className={`${SERIF} mt-3 text-3xl sm:text-4xl text-[#0B1F3A]`}>
          Gallery & Perspectives
        </h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((img, i) => (
            <Reveal key={img.public_id || i} delay={i * 0.1} y={30}>
              <div className="group relative h-[260px] sm:h-[300px] overflow-hidden border border-[#EDEBE4] bg-[#F1F0EB]">
                <Image
                  src={img.url}
                  alt={img.originalFilename || `${project.projectName} visual ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default GalleryShowcase;