"use client";
import React, { useCallback, useEffect, useState } from "react";
import OurMethodology from "./components/OurMethodology";
import BetterSpaces from "./components/BetterSpaces";
import ExploreCTA from "./components/ExploreCTA";
import ProjectsHero from "./components/ProjectsHero";
import ProjectsFilterBar from "./components/ProjectsFilterBar";
import VisionAcross from "./components/VisionAcross";
import Unique70 from "./components/Unique70";
import MasterRoster from "./components/MasterRoster";
import api from "@/common/apiClient";
import SummaryApi from "@/common/SummaryApi";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState({
    categories: ["All Projects"],
    locations: ["All Locations"],
    statuses: ["All Statuses"],
  });
  const [filters, setFilters] = useState({
    category: "All Projects",
    location: "All Locations",
    status: "All Statuses",
  });

  const fetchProjects = useCallback(async (currentFilters) => {
    setLoading(true);
    try {
      const isUnfiltered =
        currentFilters.category === "All Projects" &&
        currentFilters.location === "All Locations" &&
        currentFilters.status === "All Statuses";

      const params = {
        publicationStatus: "Published",
        paginate: false,
      };

      if (currentFilters.category !== "All Projects") {
        params.category = currentFilters.category;
      }
      if (currentFilters.status !== "All Statuses") {
        params.developmentStatus = currentFilters.status;
      }
      if (currentFilters.location !== "All Locations") {
        params.search = currentFilters.location;
      }

      const res = await api({
        url: SummaryApi.getAllProjects.url,
        method: SummaryApi.getAllProjects.method,
        params,
      });

      const list = res.data?.data || [];
      setProjects(list);
      setTotal(res.data?.pagination?.total ?? list.length ?? 0);

      // Initial unfiltered response-la irunthu dynamic filter options build pannurom
      if (isUnfiltered) {
        const categories = [
          "All Projects",
          ...new Set(
            list
              .flatMap((p) => p.category || [])
              .map((c) => c.trim())
              .filter(Boolean),
          ),
        ];
        const locations = [
          "All Locations",
          ...new Set(
            list
              .flatMap((p) => (p.location ? p.location.split(",") : []))
              .map((l) => l.trim())
              .filter(Boolean),
          ),
        ];
        const statuses = [
          "All Statuses",
          ...new Set(
            list
              .flatMap((p) => p.developmentStatus || [])
              .map((s) => s.trim())
              .filter(Boolean),
          ),
        ];

        setFilterOptions({ categories, locations, statuses });
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setProjects([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => fetchProjects(filters), 0);
    return () => clearTimeout(timeoutId);
  }, [fetchProjects, filters]);

  return (
    <div>
      <div className="w-full h-[3px] bg-white" />
      <ProjectsHero />
      <div
        className="w-full bg-white"
        style={{ height: "40px", minHeight: "40px", flexShrink: 0 }}
      />
      <ProjectsFilterBar
        categories={filterOptions.categories}
        locations={filterOptions.locations}
        statuses={filterOptions.statuses}
        total={total}
        onChange={setFilters}
      />
      <VisionAcross />
      <Unique70 />
      <MasterRoster projects={projects} loading={loading} />
      <OurMethodology />
      <BetterSpaces />
      <ExploreCTA />
    </div>
  );
};

export default ProjectsPage;
