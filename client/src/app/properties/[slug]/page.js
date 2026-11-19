// import React from "react";
// import PropertyHero from "./components/PropertyHero";
// import MasterplanParameters from "./components/MasterplanParameters";
// import ArchitecturalVision from "./components/ArchitecturalVision";
// import Explore3D from "./components/Explore3D";
// import FloorPlans from "./components/FloorPlans";
// import UnitInventory from "./components/UnitInventory";
// import ResortAmenities from "./components/ResortAmenities";
// import SpecificationsMaterials from "./components/SpecificationsMaterials";
// import ConnectedLocation from "./components/ConnectedLocation";
// import PrivateConsultation from "./components/PrivateConsultation";
// import SimilarDevelopments from "./components/SimilarDevelopments";
// import StartConversation from "@/components/common/StartConversation";

// const page = () => {
//   return (
//     <div>
//       <PropertyHero />
//       <MasterplanParameters />
//       <ArchitecturalVision />
//       <Explore3D />
//       <FloorPlans />
//       <UnitInventory />
//       <ResortAmenities />
//       <SpecificationsMaterials />
//       <ConnectedLocation />
//       <PrivateConsultation />
//       <SimilarDevelopments />
//       <StartConversation
//         eyebrow="Start a Conversation"
//         title="Let's Build Something Worth Coming Home To."
//         primaryCTA={{
//           label: "Schedule a Site Visit",
//           href: "/contact-us",
//         }}
//         secondaryCTA={{
//           label: "Explore Homes",
//           href: "/pre-cast-homes",
//         }}
//       />
//     </div>
//   );
// };

// export default page;


"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import PropertyHero from "./components/PropertyHero";
import MasterplanParameters from "./components/MasterplanParameters";
import ArchitecturalVision from "./components/ArchitecturalVision";
import Explore3D from "./components/Explore3D";
import FloorPlans from "./components/FloorPlans";
import UnitInventory from "./components/UnitInventory";
import ResortAmenities from "./components/ResortAmenities";
import SpecificationsMaterials from "./components/SpecificationsMaterials";
import ConnectedLocation from "./components/ConnectedLocation";
import PrivateConsultation from "./components/PrivateConsultation";
import SimilarDevelopments from "./components/SimilarDevelopments";
import StartConversation from "@/components/common/StartConversation";
import api from "@/common/apiClient";
import SummaryApi from "@/common/SummaryApi";

const Page = () => {
  const params = useParams();
  const slug = params?.slug;

  const [property, setProperty] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchPropertyData = async () => {
      try {
        setLoading(true);

        // 1. Fetch current single property by slug
        const res = await api({
          url: `${SummaryApi.getPropertyBySlug.url}/${slug}`,
          method: SummaryApi.getPropertyBySlug.method,
        });

        if (res.data?.success && res.data?.data) {
          setProperty(res.data.data);
        }

        // 2. Fetch other published properties for "Similar Developments"
        const listRes = await api({
          url: SummaryApi.getAllProperties.url,
          method: SummaryApi.getAllProperties.method,
          params: { publicationStatus: "Published", paginate: false },
        });

        if (listRes.data?.success && listRes.data?.data) {
          const list = Array.isArray(listRes.data.data)
            ? listRes.data.data
            : listRes.data.data.properties || [];

          const others = list.filter((p) => p.slug !== slug);
          setSimilarProperties(others.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching property:", error?.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#0B1F3A] border-r-transparent" />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-[#0B1F3A]">
            Loading Residence Details...
          </p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center bg-white px-6">
        <div className="text-center">
          <h2 className="text-2xl font-light text-[#171C22]">Property Not Found</h2>
          <p className="mt-2 text-xs text-[#44474D]">
            The requested property could not be found or has not been published yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PropertyHero property={property} />
      <MasterplanParameters property={property} />
      <ArchitecturalVision property={property} />
      <Explore3D property={property} />
      <FloorPlans property={property} />
      <UnitInventory property={property} />
      <ResortAmenities property={property} />
      <SpecificationsMaterials property={property} />
      <ConnectedLocation property={property} />
      <PrivateConsultation property={property} />
      <SimilarDevelopments properties={similarProperties} />
      <StartConversation
        eyebrow="Start a Conversation"
        title="Let's Build Something Worth Coming Home To."
        primaryCTA={{
          label: "Schedule a Site Visit",
          href: "/contact-us",
        }}
        secondaryCTA={{
          label: "Explore Homes",
          href: "/properties",
        }}
      />
    </div>
  );
};

export default Page;