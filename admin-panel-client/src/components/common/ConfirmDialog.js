"use client";
import React from "react";
import { Loader2 } from "lucide-react";

export default function ConfirmDialog({
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  busy,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div onClick={onCancel} className="absolute inset-0 bg-black/40" />
      <div className="relative w-full max-w-[380px] rounded-xl bg-white p-6 shadow-2xl">
        <h3 className="text-base font-semibold text-[#1a1a1a]">{title}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-[#00000099]">{message}</p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={busy}
            className="h-9 rounded-md border border-line px-5 text-xs font-medium text-[#444] hover:bg-surface"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={busy}
            className="flex h-9 items-center gap-2 rounded-md bg-red-500 px-5 text-xs font-medium text-white hover:bg-red-600 disabled:opacity-60"
          >
            {busy && <Loader2 size={13} className="animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}