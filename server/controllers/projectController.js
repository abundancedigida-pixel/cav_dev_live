
import * as projectService from "../services/projectService.js";

// -------------------------------------
// Create Project
// -------------------------------------
export const createProjectController = async (req, res) => {
  try {
    const project = await projectService.createProjectService(
      req.body,
      req.files
    );

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// -------------------------------------
// Get All Projects
// -------------------------------------
export const getAllProjectsController = async (req, res) => {
  try {
    const result = await projectService.getAllProjectsService(req.query);

    return res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      data: result.projects,
      summary: result.summary,
      pagination: result.pagination,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// -------------------------------------
// Get Project By ID
// -------------------------------------
export const getProjectByIdController = async (req, res) => {
  try {
    const project = await projectService.getProjectByIdService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      data: project,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



// -------------------------------------
// Update Project
// -------------------------------------
export const updateProjectController = async (req, res) => {
  try {
    const project = await projectService.updateProjectService(
      req.params.id,
      req.body,
      req.files
    );

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// -------------------------------------
// Delete Project
// -------------------------------------
export const deleteProjectController = async (req, res) => {
  try {
    const project = await projectService.deleteProjectService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: project,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
