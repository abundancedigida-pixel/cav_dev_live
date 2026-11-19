import express from "express";
import * as propertyController from "../controllers/propertyController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";
import { uploadPropertyImages } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Create Property (Login Required + Image Upload)
router.post(
  "/create",
  verifyToken,
  uploadPropertyImages,
  propertyController.createPropertyController
);

// Get All Properties (Public)
router.get(
  "/view-all",
  propertyController.getAllPropertiesController
);

// Get Property By ID (Public)
router.get(
  "/view-one/:id",
  propertyController.getPropertyByIdController
);

// Get Property By Slug (Public)
router.get(
  "/slug/:slug",
  propertyController.getPropertyBySlugController
);

// Update Property (Login Required + Image Upload)
router.put(
  "/update/:id",
  verifyToken,
  uploadPropertyImages,
  propertyController.updatePropertyController
);



// Delete Property (Public, as requested)
router.delete(
  "/delete/:id",
   verifyToken,
  propertyController.deletePropertyController
);

export default router;