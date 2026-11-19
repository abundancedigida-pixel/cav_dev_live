
import Project from "../models/Project.js";

// Create Project
export const createProjectRepo = async (data) => {
  return await Project.create(data);
};

// Get All Projects
export const getAllProjectsRepo = async (
  filter = {},
  skip = 0,
  limit = 10
) => {
  return await Project.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
};

// Get Project By ID
export const getProjectByIdRepo = async (id) => {
  return await Project.findById(id);
};

// Get Project By Slug
export const getProjectBySlugRepo = async (slug) => {
  return await Project.findOne({ slug });
};

// Get Project By Name
export const getProjectByNameRepo = async (projectName) => {
  return await Project.findOne({
    projectName: {
      $regex: `^${projectName}$`,
      $options: "i",
    },
  });
};

// Update Project
export const updateProjectRepo = async (id, data) => {
  return await Project.findByIdAndUpdate(
    id,
    { $set: data },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
};

// Delete Project
export const deleteProjectRepo = async (id) => {
  return await Project.findByIdAndDelete(id);
};

// Count Projects
export const countProjectsRepo = async (filter = {}) => {
  return await Project.countDocuments(filter);
};

// Count Published Projects
export const countPublishedProjectsRepo = async () => {
  return await Project.countDocuments({
    publicationStatus: "Published",
  });
};

// Count Draft Projects
export const countDraftProjectsRepo = async () => {
  return await Project.countDocuments({
    publicationStatus: "Draft",
  });
};
