const API = "/api/cav";

const SummaryApi = {
  /* ---------- AUTH (backend ready) ---------- */
  login: { url: `${API}/auth/login`, method: "post" },
  getProfile: { url: `${API}/auth/profile`, method: "get" },
  forgotPassword: { url: `${API}/auth/forgot-password`, method: "post" },
  verifyOtp: { url: `${API}/auth/verify-otp`, method: "post" },
  resetPassword: { url: `${API}/auth/reset-password`, method: "post" },

  /* ---------- PROPERTY (backend ready) ---------- */
  getProperties: { url: `${API}/property/view-all`, method: "get" },
  getPropertyById: { url: `${API}/property/view-one/:id`, method: "get" },
    getPropertyBySlug: { url: `${API}/property/slug/:slug`, method: "get" },
  createProperty: { url: `${API}/property/create`, method: "post" },
  updateProperty: { url: `${API}/property/update/:id`, method: "put" },
  deleteProperty: { url: `${API}/property/delete/:id`, method: "delete" },

  /* ---------- PROJECT (backend ready) ---------- */
  getProjects: { url: `${API}/project/view-all`, method: "get" },
  getProjectById: { url: `${API}/project/view-one/:id`, method: "get" },
  createProject: { url: `${API}/project/create`, method: "post" },
  updateProject: { url: `${API}/project/update/:id`, method: "put" },
  deleteProject: { url: `${API}/project/delete/:id`, method: "delete" },

  /* ---------- PENDING: design/code vandhadhum confirm pannuvom ---------- */
  // ENQUIRY
  getEnquiries: { url: `${API}/enquiry/view-all`, method: "get" },
  getEnquiryById: { url: `${API}/enquiry/view-one/:id`, method: "get" },
  updateEnquiry: { url: `${API}/enquiry/update/:id`, method: "put" },
  updateEnquiryStatus: { url: `${API}/enquiry/status/:id`, method: "patch" },
  deleteEnquiry: { url: `${API}/enquiry/delete/:id`, method: "delete" },
    replyEnquiry: { url: `${API}/enquiry/send-email/:id`, method: "post" },


      // NOTIFICATION
  getNotifications: { url: `${API}/notification/view-all`, method: "get" },
  markNotificationRead: { url: `${API}/notification/read/:id`, method: "patch" },
  markAllNotificationsRead: { url: `${API}/notification/read-all`, method: "patch" },
  deleteNotification: { url: `${API}/notification/delete/:id`, method: "delete" },
  clearAllNotifications: { url: `${API}/notification/clear-all`, method: "delete" },

  // BLOG
  getBlogs: { url: `${API}/blogs/view-all`, method: "get" },
  getBlogById: { url: `${API}/blogs/view-one/:id`, method: "get" },
  createBlog: { url: `${API}/blogs/create`, method: "post" },
  updateBlog: { url: `${API}/blogs/update/:id`, method: "put" },
  deleteBlog: { url: `${API}/blogs/delete/:id`, method: "delete" },

  // DASHBOARD
  getDashboard: { url: `${API}/dashboard/counts`, method: "get" },
};

// :id, :slug maadhiri params replace panna helper
export const buildUrl = (endpoint, params = {}) => ({
  ...endpoint,
  url: Object.entries(params).reduce(
    (u, [k, v]) => u.replace(`:${k}`, encodeURIComponent(v)),
    endpoint.url
  ),
});

export default SummaryApi;