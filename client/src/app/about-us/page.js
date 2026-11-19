import React from "react";
import AboutHero from "./components/AboutHero";
import OurStory from "./components/OurStory";
import AboutStats from "./components/AboutStats";
import AtelierOrigin from "./components/AtelierOrigin";
import DesignPrinciples from "./components/DesignPrinciples";
import PracticeAreas from "./components/PracticeAreas";
import VisionToReality from "./components/VisionToReality";
import Certifications from "./components/Certifications";
import WhyClientsBuild from "./components/WhyClientsBuild";
import QuoteBanner from "./components/QuoteBanner";
import StartConversation from "../../components/common/StartConversation";

const page = () => {
  return (
    <div>
      <div className="w-full h-[3px] bg-white" />
      <AboutHero />
      <OurStory />
      <AboutStats />
      <AtelierOrigin />
      <DesignPrinciples />
      <PracticeAreas />
      <VisionToReality />
      <Certifications />
      <div className="w-full h-[80px] bg-white" />
      <WhyClientsBuild />
      <div className="w-full h-[80px] bg-white" />
      <QuoteBanner />
 
      <StartConversation
        eyebrow="Start a Conversation"
        title="Let's Build Something Worth Coming Home To."
        primaryCTA={{
          label: "Schedule a Consultation",
          href: "/contact-us",
        }}
        secondaryCTA={{
          label: "Explore Properties",
          href: "/properties",
        }}
      />
    </div>
  );
};

export default page;
