
import * as websiteDashboardRepo from "../repositories/dashboardRepo.js";

export const getWebsiteDashboardService = async () => {
  const [
    summary,
    recentEnquiries,
    recentBlogs,
    recentProperties,
    recentProjects,
  ] = await Promise.all([
    websiteDashboardRepo.getWebsiteDashboardCountsRepo(),

    websiteDashboardRepo.getRecentEnquiriesRepo(5),

    websiteDashboardRepo.getRecentlyUpdatedBlogsRepo(4),

    websiteDashboardRepo.getRecentlyUpdatedPropertiesRepo(4),

    websiteDashboardRepo.getRecentlyUpdatedProjectsRepo(4),
  ]);

  // Combine recently updated content from all three collections
  const recentlyUpdatedContent = [
    ...recentBlogs,
    ...recentProperties,
    ...recentProjects,
  ]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime()
    )
    .slice(0, 4);

  return {
    summary,
    recentEnquiries,
    recentlyUpdatedContent,
  };
};
