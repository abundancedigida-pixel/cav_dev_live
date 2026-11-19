import React from "react";
import ContactHero from "./components/ContactHero";
import AdvisoryDirectory from "./components/AdvisoryDirectory";
import StreamlinedAdvisory from "./components/StreamlinedAdvisory";
import StartConversation from "@/components/common/StartConversation";

const page = () => {
  return (
    <div>
      <ContactHero />
      <AdvisoryDirectory />
      <StreamlinedAdvisory />
      <div className="w-full h-[80px] bg-white" />
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