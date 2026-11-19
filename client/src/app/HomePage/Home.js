import AbundanceGroup from "./Components/AbundanceGroup";
import AbundanceMindset from "./Components/AbundanceMindset";
import ArchitecturalDisciplines from "./Components/ArchitecturalDisciplines";
import Banner from "./Components/Banner";
import ExploreDreamHomes from "./Components/ExploreDreamHomes";
import HowWeDevelop from "./Components/HowWeDevelop";
import MindsetCommunity from "./Components/MindsetCommunity";
import OurApproach from "./Components/OurApproach";
import PrecastMethodology from "./Components/PrecastMethodology";
import ProjectStory from "./Components/ProjectStory";
import Testimonials from "./Components/Testimonials";
import TurnkeyConstruction from "./Components/TurnkeyConstruction ";
import WhatWeBuild from "./Components/WhatWeBuild";

export default function Home() {
  return (
    <div>
      <div className="w-full h-[3px] bg-white" />
      <Banner />
      <OurApproach />
      <MindsetCommunity />
      <AbundanceMindset />
      <WhatWeBuild />
      <AbundanceGroup />
      <ProjectStory />
      <HowWeDevelop />
      <ArchitecturalDisciplines />
      <ExploreDreamHomes />
      <PrecastMethodology />
      <TurnkeyConstruction />
      <Testimonials />
      <div className="w-full h-[80px] bg-white" />
    </div>
  );
}
