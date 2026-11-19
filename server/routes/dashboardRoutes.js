
import express from "express";
import * as websiteDashboardController from "../controllers/dashboardController.js";
import {verifyToken} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/counts",
  verifyToken,
  websiteDashboardController.getWebsiteDashboardController
);

export default router;
