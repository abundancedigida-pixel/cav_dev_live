"use client";
import Link from "next/link";
import { Container, Reveal, WordReveal, ParallaxImage, Counter, SANS } from "@/components/ui/Animations";
import Img from "@/assets/HomeImages/ProjectStory.webp"

const ProjectStory = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16`}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] items-start">
          <ParallaxImage
            src={Img}
            alt="Nexus Business Park aerial view"
            className="h-[300px] sm:h-[420px] lg:h-[500px] w-full"
            strength={8}
            reveal={false}
          />

          <Reveal y={0} x={40} delay={0.2} className="lg:min-h-[612px]">
            <div className="h-full bg-[#164A7A] text-white p-8 sm:p-10 lg:p-12 xl:p-14 lg:min-h-[612px] flex flex-col justify-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D5BD93]">Project Story</p>
              <h2 className="mt-5 font-light tracking-[-0.02em] leading-[1.05] text-3xl sm:text-3xl md:text-4xl lg:text-6xl">
                <WordReveal text="Creating Places That Become Landmarks" stagger={0.09} />
              </h2>
              <p className="mt-6 text-[13px] sm:text-sm leading-relaxed text-[#D8E2E9] max-w-sm">
                Nexus Business Park brings shaded courtyards, flexible floorplates and a
                climate-responsive facade together in one connected workplace campus.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4 border-y border-[#FFFFFF33] py-6 max-w-sm">
                <div>
                  <p className="text-xl sm:text-2xl font-light">
                    <Counter to={0.8} decimals={1} suffix="M" />
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-wide text-white">Sq.Ft.</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-light">2024</p>
                  <p className="mt-1 text-[9px] uppercase tracking-wide text-white">Completed</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-light">OMR</p>
                  <p className="mt-1 text-[9px] uppercase tracking-wide text-white">Chennai</p>
                </div>
              </div>

              <Link
                href="/projects"
                className="mt-8 inline-block w-fit bg-[#FFFFFF] px-6 py-3.5 text-xs font-extrabold text-[#0B1F3A] transition-all duration-300 hover:bg-[#E8C27A]"
              >
                Explore Project
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default ProjectStory;