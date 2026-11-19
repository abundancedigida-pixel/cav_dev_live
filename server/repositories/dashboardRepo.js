
import Blog from "../models/Blog.js";
import Property from "../models/Property.js";
import Project from "../models/Project.js";
import Enquiry from "../models/Enquiry.js";

// ------------------------------------------
// DASHBOARD SUMMARY COUNTS
// ------------------------------------------

export const getWebsiteDashboardCountsRepo = async () => {
  const [
    totalBlogs,
    activeProperties,
    activeProjects,
    newEnquiries,
  ] = await Promise.all([
    Blog.countDocuments(),

    Property.countDocuments({
      publicationStatus: "Published",
    }),

    Project.countDocuments({
      publicationStatus: "Published",
    }),

    Enquiry.countDocuments({
      status: "New",
    }),
  ]);

  return {
    totalBlogs,
    activeProperties,
    activeProjects,
    newEnquiries,
  };
};

// ------------------------------------------
// RECENT ENQUIRIES
// ------------------------------------------

export const getRecentEnquiriesRepo = async (limit = 5) => {
  return Enquiry.find()
    .select(
      "fullName email phoneNumber interestType status createdAt"
    )
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
};

// ------------------------------------------
// RECENTLY UPDATED BLOGS
// ------------------------------------------

export const getRecentlyUpdatedBlogsRepo = async (limit = 4) => {
  const blogs = await Blog.find()
    .select("title status updatedAt")
    .sort({ updatedAt: -1 })
    .limit(limit)
    .lean();

  return blogs.map((blog) => ({
    _id: blog._id,
    title: blog.title,
    type: "Blog Article",
    status: blog.status,
    updatedAt: blog.updatedAt,
    route: `/blogs/${blog._id}/edit`,
  }));
};

// ------------------------------------------
// RECENTLY UPDATED PROPERTIES
// ------------------------------------------

export const getRecentlyUpdatedPropertiesRepo = async (limit = 4) => {
  const properties = await Property.find()
    .select("propertyName publicationStatus updatedAt")
    .sort({ updatedAt: -1 })
    .limit(limit)
    .lean();

  return properties.map((property) => ({
    _id: property._id,
    title: property.propertyName,
    type: "Property Listing",
    status: property.publicationStatus,
    updatedAt: property.updatedAt,
    route: `/properties/${property._id}/edit`,
  }));
};

// ------------------------------------------
// RECENTLY UPDATED PROJECTS
// ------------------------------------------

export const getRecentlyUpdatedProjectsRepo = async (limit = 4) => {
  const projects = await Project.find()
    .select("projectName publicationStatus updatedAt")
    .sort({ updatedAt: -1 })
    .limit(limit)
    .lean();

  return projects.map((project) => ({
    _id: project._id,
    title: project.projectName,
    type: "Project Portfolio",
    status: project.publicationStatus,
    updatedAt: project.updatedAt,
    route: `/projects/${project._id}/edit`,
  }));
};
