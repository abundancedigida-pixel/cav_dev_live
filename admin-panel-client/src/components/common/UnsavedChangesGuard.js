"use client";
import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle } from "lucide-react";

function UnsavedChangesDialog({ onKeep, onDiscard }) {
  // Esc = keep editing (captured before the drawer's own handlers)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        onKeep();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onKeep]);

  return createPortal(
    <div className="fixed inset-0 z-[110] overflow-hidden bg-black/20">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="unsaved-title"
        className="absolute left-1/2 top-4 w-[calc(100%-1.5rem)] max-w-[420px] -translate-x-1/2 rounded-xl border border-line bg-white p-4 shadow-2xl sm:top-6"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
            <AlertTriangle size={17} />
          </span>
          <div className="min-w-0 flex-1">
            <h3 id="unsaved-title" className="text-sm font-semibold text-[#222]">
              Unsaved changes
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-[#00000099]">
              You have unsaved changes. If you leave now, your changes will be lost.
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onKeep}
            className="h-9 rounded-md border border-navy bg-white px-4 text-xs font-medium text-navy hover:bg-surface"
          >
            Keep editing
          </button>
          <button
            type="button"
            onClick={onDiscard}
            className="h-9 rounded-md bg-red-500 px-4 text-xs font-semibold text-white hover:bg-red-600"
          >
            Discard
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

/**
 * const { requestClose, guardDialog } = useUnsavedGuard(dirty, onClose, { escape: true });
 * Use requestClose for backdrop / X / Cancel / Esc. Call onClose() directly after a successful save.
 */
export function useUnsavedGuard(dirty, onClose, { escape = false } = {}) {
  const [showDialog, setShowDialog] = useState(false);

  const requestClose = useCallback(() => {
    if (dirty) setShowDialog(true);
    else onClose();
  }, [dirty, onClose]);

  // browser refresh / tab close
  useEffect(() => {
    if (!dirty) return;
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  useEffect(() => {
    if (!escape) return;
    const onKey = (e) => e.key === "Escape" && requestClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [escape, requestClose]);

  const guardDialog = showDialog ? (
    <UnsavedChangesDialog
      onKeep={() => setShowDialog(false)}
      onDiscard={() => {
        setShowDialog(false);
        onClose();
      }}
    />
  ) : null;

  return { requestClose, guardDialog };
}