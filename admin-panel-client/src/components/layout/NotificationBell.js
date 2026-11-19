"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { Bell, BellOff, CheckCheck, Trash2, X, Mail, Info } from "lucide-react";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  clearAllNotifications,
  normalizeNotification,
} from "@/services/notificationService";
import { timeAgo } from "@/utils/dateFormat";

// Socket.io needs the server origin only (no path)
const socketUrl = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL).origin;
  } catch {
    return undefined;
  }
})();

export default function NotificationBell() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [clearing, setClearing] = useState(false);

  // initial load
  useEffect(() => {
    let cancelled = false;

    getNotifications()
      .then((r) => {
        if (cancelled) return;
        setItems(r.items);
        setUnread(r.unread);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // live notifications
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !socketUrl) return;

    const socket = io(socketUrl, { auth: { token } });

    const onNew = (raw) => {
      const n = normalizeNotification(raw);
      setItems((prev) => [n, ...prev.filter((x) => x.id !== n.id)].slice(0, 30));
      setUnread((u) => u + 1);
      toast.info(n.title);
      // lets pages (for example the enquiries list) refresh themselves
      window.dispatchEvent(new CustomEvent("cav:notification", { detail: n }));
    };

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    socket.on("notification:new", onNew);
    socket.on("connect_error", (err) => console.warn("Notification socket:", err.message));

    return () => {
      socket.off("notification:new", onNew);
      socket.disconnect();
    };
  }, []);

  // Escape closes the drawer (skipped while the confirm dialog is open)
  useEffect(() => {
    if (!open || confirmClear) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, confirmClear]);

  const openItem = (n) => {
    setOpen(false);

    if (!n.isRead) {
      setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, isRead: true } : x)));
      setUnread((u) => Math.max(0, u - 1));
      markNotificationRead(n.id).catch(() => {});
    }

    if (n.type === "enquiry" && n.entityId) {
      router.push(`/admin/enquiries?view=${n.entityId}`);
    }
  };

  const removeItem = (e, n) => {
    e.stopPropagation();
    setItems((prev) => prev.filter((x) => x.id !== n.id));
    if (!n.isRead) setUnread((u) => Math.max(0, u - 1));
    deleteNotification(n.id).catch(() => toast.error("Could not delete notification"));
  };

  const markAll = () => {
    if (unread === 0) return;
    setItems((prev) => prev.map((x) => ({ ...x, isRead: true })));
    setUnread(0);
    markAllNotificationsRead().catch(() => toast.error("Could not update notifications"));
  };

  const clearAll = async () => {
    setClearing(true);
    try {
      await clearAllNotifications();
      setItems([]);
      setUnread(0);
      setConfirmClear(false);
      toast.success("All notifications cleared");
    } catch {
      toast.error("Could not clear notifications");
    } finally {
      setClearing(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
        aria-expanded={open}
        className="relative rounded-md p-2 text-[#444] hover:bg-surface"
      >
        <Bell size={18} />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open &&
        createPortal(
          <>
            <div
              onClick={() => setOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 z-[70] bg-black/40"
            />

            <aside
              role="dialog"
              aria-label="Notifications"
              className="animate-drawer-in fixed right-0 top-0 z-[75] flex h-dvh w-full max-w-[400px] flex-col bg-white shadow-2xl"
            >
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between bg-navy px-5 py-4 text-white">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-gold">
                    <Bell size={16} />
                  </span>
                  <div>
                    <h2 className="font-serif text-base font-semibold">Notifications</h2>
                    <p className="flex items-center gap-2 text-[10px] text-white/60">
                      {unread > 0 ? `${unread} unread` : "All caught up"}
                      <span className="flex items-center gap-1">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${connected ? "bg-green-400" : "bg-white/30"}`}
                        />
                        {connected ? "Live" : "Offline"}
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="rounded p-1 hover:bg-white/10"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Actions */}
              {items.length > 0 && (
                <div className="flex shrink-0 items-center justify-between border-b border-line bg-[#eaf0fb] px-4 py-2">
                  <button
                    type="button"
                    onClick={markAll}
                    disabled={unread === 0}
                    className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-navy disabled:opacity-40"
                  >
                    <CheckCheck size={13} /> Mark all read
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmClear(true)}
                    className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-red-500"
                  >
                    <Trash2 size={13} /> Clear all
                  </button>
                </div>
              )}

              {/* List */}
              <div className="flex-1 overflow-y-auto">
                {loading && <p className="px-4 py-10 text-center text-xs text-[#00000080]">Loading...</p>}

                {!loading && items.length === 0 && (
                  <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center text-[#00000066]">
                    <BellOff size={26} />
                    <p className="text-sm font-medium text-[#222]">No notifications</p>
                    <p className="text-xs">New enquiries will appear here.</p>
                  </div>
                )}

                {items.map((n) => (
                  <div
                    key={n.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => openItem(n)}
                    onKeyDown={(e) => e.key === "Enter" && openItem(n)}
                    className={`flex cursor-pointer items-start gap-3 border-b border-line px-4 py-3.5 hover:bg-surface ${
                      n.isRead ? "" : "bg-navy/5"
                    }`}
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy/10 text-navy">
                      {n.type === "enquiry" ? <Mail size={14} /> : <Info size={14} />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`truncate text-xs ${n.isRead ? "font-medium" : "font-semibold"} text-[#1a1a1a]`}>
                        {n.title}
                      </p>
                      {n.message && (
                        <p className="mt-0.5 line-clamp-2 text-[11px] text-[#00000099]">{n.message}</p>
                      )}
                      <p className="mt-1 text-[10px] text-[#00000066]">{timeAgo(n.createdAt)}</p>
                    </div>
                    {!n.isRead && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-navy" />}
                    <button
                      type="button"
                      onClick={(e) => removeItem(e, n)}
                      aria-label="Delete notification"
                      className="shrink-0 rounded p-1 text-[#00000066] hover:bg-white hover:text-red-500"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </aside>
          </>,
          document.body
        )}

      {confirmClear && 
        createPortal(
        <ConfirmDialog
          title="Clear all notifications?"
          message="All notifications will be permanently deleted. This action cannot be undone."
          confirmLabel="Clear all"
          busy={clearing}
          onConfirm={clearAll}
          onCancel={() => setConfirmClear(false)}   
        />,
           document.body
      )}
    </>
  );
}