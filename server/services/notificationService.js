import mongoose from "mongoose";
import * as notificationRepo from "../repositories/notificationRepo.js";
import { emitToAdmins } from "../config/socket.js";

const validateObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid notification ID");
  }
};

// Reusable helper: saves the notification and pushes it live to the admin panel
export const createNotificationService = async ({
  type = "system",
  title,
  message = "",
  entityId = null,
}) => {
  if (typeof title !== "string" || !title.trim()) {
    throw new Error("Notification title is required");
  }

  const created = await notificationRepo.createNotificationRepo({
    type,
    title: title.trim(),
    message: String(message).trim(),
    entityId,
  });

  // plain JSON so the socket payload is always serializable
  emitToAdmins("notification:new", JSON.parse(JSON.stringify(created)));

  return created;
};

export const getNotificationsService = async (query = {}) => {
  const limit = Math.min(Math.max(Number(query.limit) || 20, 1), 50);

  const [notifications, unreadCount, total] = await Promise.all([
    notificationRepo.getNotificationsRepo(limit),
    notificationRepo.countNotificationsRepo({ isRead: false }),
    notificationRepo.countNotificationsRepo({}),
  ]);

  return { notifications, unreadCount, total };
};

export const markNotificationReadService = async (id) => {
  validateObjectId(id);

  const updated = await notificationRepo.markNotificationReadRepo(id);

  if (!updated) {
    throw new Error("Notification not found");
  }

  return updated;
};

export const markAllNotificationsReadService = async () => {
  await notificationRepo.markAllNotificationsReadRepo();
  return true;
};

export const deleteNotificationService = async (id) => {
  validateObjectId(id);

  const deleted = await notificationRepo.deleteNotificationRepo(id);

  if (!deleted) {
    throw new Error("Notification not found");
  }

  return true;
};

// Permanently deletes every notification
export const clearAllNotificationsService = async () => {
  await notificationRepo.clearAllNotificationsRepo();
  return true;
};