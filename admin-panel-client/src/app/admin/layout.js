"use client";
import React, { useCallback, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import AuthGuard from "@/components/layout/AuthGuard";

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const handleMenu = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setCollapsed((c) => !c);
    } else {
      setMobileOpen(true);
    }
  };

  return (
    <AuthGuard>
      <div className="flex h-dvh overflow-hidden bg-surface">
        <Sidebar open={mobileOpen} collapsed={collapsed} onClose={closeMobile} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar onMenu={handleMenu} />
          <main className="flex-1 overflow-y-auto p-3 sm:p-6">{children}</main>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        newestOnTop
      />
    </AuthGuard>
  );
}