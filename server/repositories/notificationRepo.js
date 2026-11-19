import Notification from "../models/Notification.js";

export const createNotificationRepo = async (data) => {
  return await Notification.create(data);
};

export const getNotificationsRepo = async (limit = 20) => {
  return await Notification.find().sort({ createdAt: -1 }).limit(limit).lean();
};

export const countNotificationsRepo = async (filter = {}) => {
  return await Notification.countDocuments(filter);
};

export const markNotificationReadRepo = async (id) => {
  return await Notification.findByIdAndUpdate(
    id,
    { $set: { isRead: true } },
    { new: true }
  );
};

export const markAllNotificationsReadRepo = async () => {
  return await Notification.updateMany({ isRead: false }, { $set: { isRead: true } });
};

export const deleteNotificationRepo = async (id) => {
  return await Notification.findByIdAndDelete(id);
};

export const clearAllNotificationsRepo = async () => {
  return await Notification.deleteMany({});
};