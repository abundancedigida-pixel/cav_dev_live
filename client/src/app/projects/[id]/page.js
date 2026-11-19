"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HeroDynamic from "./components/HeroDynamic";
import OverviewHighlights from "./components/OverviewHighlights";
import ProjectSpecs from "./components/ProjectSpecs";
import GalleryShowcase from "./components/GalleryShowcase";
import BrochureDownload from "./components/BrochureDownload";
import ProjectEnquiryDynamic from "./components/ProjectEnquiryDynamic";
import api from "@/common/apiClient";
import SummaryApi from "@/common/SummaryApi";

const ProjectDetailsPage = () => {
  const params = useParams();
  const id = params?.id;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await api.get(`${SummaryApi.getProjectById.url}/${id}`);
        if (res.data?.success) {
          setProject(res.data.data);
        } else {
          setError("Failed to fetch project details");
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(err?.response?.data?.message || "Project not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0B1F3A] border-t-transparent" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-serif text-[#0B1F3A]">Project Not Found</h2>
        <p className="mt-2 text-sm text-gray-600">{error || "The requested development does not exist."}</p>
      </div>
    );
  }

  return (
    // <main className="w-full min-w-0 bg-white">
    <div>
      <HeroDynamic project={project} />
      <OverviewHighlights project={project} />
      <ProjectSpecs project={project} />
      {project.galleryImages?.length > 0 && (
        <GalleryShowcase project={project} />
      )}
      {project.architecturalBrochure?.url && (
        <BrochureDownload project={project} />
      )}
      <ProjectEnquiryDynamic project={project} />
    {/* </main> */}
    </div>
  );
};

export default ProjectDetailsPage;