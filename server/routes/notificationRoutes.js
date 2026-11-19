import express from "express";
import * as notificationController from "../controllers/notificationController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/view-all", verifyToken, notificationController.getNotificationsController);

router.patch("/read-all", verifyToken, notificationController.markAllNotificationsReadController);

router.patch("/read/:id", verifyToken, notificationController.markNotificationReadController);

// Permanently deletes every notification
router.delete("/clear-all", verifyToken, notificationController.clearAllNotificationsController);

router.delete("/delete/:id", verifyToken, notificationController.deleteNotificationController);

export default router;