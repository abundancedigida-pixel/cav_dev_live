import * as notificationService from "../services/notificationService.js";

export const getNotificationsController = async (req, res) => {
  try {
    const result = await notificationService.getNotificationsService(req.query);

    return res.status(200).json({
      success: true,
      message: "Notifications fetched successfully",
      data: result.notifications,
      unreadCount: result.unreadCount,
      total: result.total,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const markNotificationReadController = async (req, res) => {
  try {
    const data = await notificationService.markNotificationReadService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
      data,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const markAllNotificationsReadController = async (req, res) => {
  try {
    await notificationService.markAllNotificationsReadService();

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read",
      data: null,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteNotificationController = async (req, res) => {
  try {
    await notificationService.deleteNotificationService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
      data: null,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const clearAllNotificationsController = async (req, res) => {
  try {
    await notificationService.clearAllNotificationsService();

    return res.status(200).json({
      success: true,
      message: "All notifications cleared",
      data: null,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};