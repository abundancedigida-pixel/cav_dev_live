"use client";
import React, { useEffect } from "react";
import { X, Pencil } from "lucide-react";

export const ViewSection = ({ title, children }) => (
  <section className="mt-6">
    <h3 className="border-b border-line pb-2 text-[10px] font-bold uppercase tracking-widest text-navy">{title}</h3>
    <div className="mt-3">{children}</div>
  </section>
);

export const Field = ({ label, children }) => (
  <div className="min-w-0">
    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#00000080]">{label}</p>
    <div className="mt-1 break-words text-[13px] font-medium text-[#1a1a1a]">{children || "—"}</div>
  </div>
);

export const Pill = ({ children }) => (
  <span className="rounded-full bg-navy/10 px-2.5 py-1 text-[11px] font-medium text-navy">{children}</span>
);

export default function ViewDrawer({ eyebrow, title, onClose, onEdit, children }) {
  // close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-[60] bg-black/40" />
      <aside className="fixed right-0 top-0 z-[70] flex h-dvh w-full max-w-[520px] flex-col bg-white shadow-2xl">
        <div className="flex shrink-0 items-start justify-between border-b border-line px-5 py-4">
          <div className="min-w-0">
            {eyebrow && (
              <p className="text-[9px] font-semibold uppercase tracking-widest text-[#00000080]">{eyebrow}</p>
            )}
            <h2 className="truncate font-serif text-lg font-semibold text-[#1a1a1a]">{title}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-3 shrink-0 rounded p-1 text-[#00000066] hover:bg-surface"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-8">{children}</div>

        <div className="flex shrink-0 items-center justify-end gap-3 border-t border-line bg-white px-5 py-4">
          <button
            onClick={onClose}
            className="h-11 px-3 text-[11px] font-semibold uppercase tracking-wider text-[#444] hover:underline"
          >
            Close
          </button>
          <button
            onClick={onEdit}
            className="flex h-11 items-center gap-2 rounded-md bg-navy px-6 text-[11px] font-semibold uppercase tracking-wider text-white hover:opacity-90"
          >
            <Pencil size={13} /> Edit
          </button>
        </div>
      </aside>
    </>
  );
}