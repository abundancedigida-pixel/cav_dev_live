
import express from "express";
import  blogController from "../controllers/blogController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { uploadBlogImages } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Create Blog
router.post(
  "/create",
  verifyToken,
  uploadBlogImages,
  blogController.create
);

router.get(
  "/view-all",
  blogController.getAll
);

router.get(
  "/view-one/:id",
  blogController.getById
);

// Update Blog
router.put(
  "/update/:id",
  verifyToken,
  uploadBlogImages,
  blogController.update
);

// Delete Blog
router.delete(
  "/delete/:id",
  verifyToken,
  blogController.remove
);

export default router;
