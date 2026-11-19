const SummaryApi = {
  // ===================== ENQUIRY PAGE ROUTES =====================

  createEnquiry: {
    url: "/api/cav/enquiry/create",
    method: "post",
  },

  // ===================== PROJECT PAGE ROUTES =====================
  getAllProjects: {
    url: "/api/cav/project/view-all",
    method: "get",
  },
  getProjectById: {
    url: "/api/cav/project/view-one",
    method: "get",
  },

  // ===================== PROPERTY ROUTES =====================
  getAllProperties: {
    url: "/api/cav/property/view-all",
    method: "get",
  },
  getPropertyBySlug: {
    url: "/api/cav/property/slug",
    method: "get",
  },

  // ===================== BLOG / INSIGHTS ROUTES =====================
  getAllBlogs: {
    url: "/api/cav/blogs/view-all",
    method: "get",
  },
  getBlogById: {
    url: "/api/cav/blogs/view-one",
    method: "get",
  },
};

export default SummaryApi;
