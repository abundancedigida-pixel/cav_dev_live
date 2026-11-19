
import express from "express";

import * as projectController from "../controllers/projectController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";

import { uploadProjectFiles } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// -------------------------------------
// Create Project
// -------------------------------------
router.post(
  "/create",
  verifyToken,
  uploadProjectFiles,
  projectController.createProjectController
);

// -------------------------------------
// Get All Projects
// -------------------------------------
router.get(
  "/view-all",
  projectController.getAllProjectsController
);


// -------------------------------------
// Get Project By ID
// -------------------------------------
router.get(
  "/view-one/:id",
  projectController.getProjectByIdController
);

// -------------------------------------
// Update Project
// -------------------------------------
router.put(
  "/update/:id",
  verifyToken,
  uploadProjectFiles,
  projectController.updateProjectController
);

// -------------------------------------
// Delete Project
// -------------------------------------
router.delete(
  "/delete/:id",
  verifyToken,
  projectController.deleteProjectController
);

export default router;
