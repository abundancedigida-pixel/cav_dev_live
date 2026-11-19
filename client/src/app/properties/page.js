"use client";
import React, { useEffect, useState, useMemo } from "react";

import PropertiesHero from "./components/PropertiesHero";
import ExploreByLifestyle from "./components/ExploreByLifestyle";
import FeaturedShowcase from "./components/FeaturedShowcase";
import BelongCTA from "./components/BelongCTA";
import UpcomingHomes from "./components/UpcomingHomes";
import MoreThanProperty from "./components/MoreThanProperty";
import StartConversation from "@/components/common/StartConversation";
import SampleOfferings from "./components/SampleOfferings";
import api from "@/common/apiClient";
import SummaryApi from "@/common/SummaryApi";

const Page = () => {
  const [properties, setProperties] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    location: "All Locations",
    type: "All Types",
    availability: "All Statuses",
    sort: "Default",
  });

  useEffect(() => {
    let isMounted = true;

    const fetchProperties = async () => {
      try {
        const res = await api({
          url: SummaryApi.getAllProperties.url,
          method: SummaryApi.getAllProperties.method,
          params: {
            publicationStatus: "Published",
            paginate: false,
          },
        });

        if (
          isMounted &&
          res.data?.success &&
          res.data?.data?.properties
        ) {
          setProperties(res.data.data.properties);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching properties:", error?.response?.data || error.message);
        }
      }
    };

    fetchProperties();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter & Sort properties dynamically based on Hero search
  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (selectedFilters.location && selectedFilters.location !== "All Locations") {
      result = result.filter((item) => item.location === selectedFilters.location);
    }

    if (selectedFilters.type && selectedFilters.type !== "All Types") {
      result = result.filter((item) => item.propertyType === selectedFilters.type);
    }

    if (selectedFilters.availability && selectedFilters.availability !== "All Statuses") {
      result = result.filter((item) => item.developmentStatus === selectedFilters.availability);
    }

    if (selectedFilters.sort === "Price: Low to High") {
      result.sort((a, b) => (a.pricePerSqft || 0) - (b.pricePerSqft || 0));
    } else if (selectedFilters.sort === "Price: High to Low") {
      result.sort((a, b) => (b.pricePerSqft || 0) - (a.pricePerSqft || 0));
    }

    return result;
  }, [properties, selectedFilters]);

  // The very recent property goes to Featured Showcase
  const featuredProperty = filteredProperties[0] || null;

  // All remaining properties go to Cards below
  const remainingProperties = filteredProperties.slice(1);

  // Properties under construction for Upcoming section
  const upcomingProperties = useMemo(() => {
    return properties.filter((p) => p.developmentStatus === "Constructing");
  }, [properties]);

  const handleSearch = (filterValues) => {
    setSelectedFilters(filterValues);
  };

  return (
    <div>
      <div className="w-full h-[3px] bg-white" />
      <PropertiesHero
        properties={properties}
        total={filteredProperties.length}
        onSearch={handleSearch}
      />
      <ExploreByLifestyle />
      {featuredProperty && <FeaturedShowcase property={featuredProperty} />}
      <SampleOfferings properties={remainingProperties} />
      <BelongCTA />
      {upcomingProperties.length > 0 && <UpcomingHomes properties={upcomingProperties} />}
      <MoreThanProperty />
      <StartConversation
        eyebrow="Start a Conversation"
        title="Let's Build Something Worth Coming Home To."
        primaryCTA={{
          label: "Schedule a Consultation",
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