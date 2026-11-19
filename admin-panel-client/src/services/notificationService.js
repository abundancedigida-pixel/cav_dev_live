import api from "@/lib/apiClient";
import SummaryApi, { buildUrl } from "@/constants/SummaryApi";

// Backend envelope: { success, data: [], unreadCount, total }

export const normalizeNotification = (n) => ({
  id: n._id,
  type: n.type,
  title: n.title,
  message: n.message || "",
  entityId: n.entityId || null,
  isRead: !!n.isRead,
  createdAt: n.createdAt,
});

// -> { items, unread, total }
export const getNotifications = async (limit = 20) => {
  const { url, method } = SummaryApi.getNotifications;
  const res = await api({ url, method, params: { limit } });

  return {
    items: (res.data.data || []).map(normalizeNotification),
    unread: res.data.unreadCount ?? 0,
    total: res.data.total ?? 0,
  };
};

export const markNotificationRead = async (id) => {
  const { url, method } = buildUrl(SummaryApi.markNotificationRead, { id });
  await api({ url, method });
};

export const markAllNotificationsRead = async () => {
  const { url, method } = SummaryApi.markAllNotificationsRead;
  await api({ url, method });
};

export const deleteNotification = async (id) => {
  const { url, method } = buildUrl(SummaryApi.deleteNotification, { id });
  await api({ url, method });
};

// Permanently deletes every notification
export const clearAllNotifications = async () => {
  const { url, method } = SummaryApi.clearAllNotifications;
  await api({ url, method });
};