"use client";
import React, { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  FileText,
  Building2,
  FolderKanban,
  Mail,
  Globe,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { clearSession } from "@/services/authService";
import CavLogo from "@/assets/Logo.svg";

const menu = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutGrid },
  { label: "Blog Management", href: "/admin/blogs", icon: FileText },
  { label: "Properties", href: "/admin/properties", icon: Building2 },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Enquiries", href: "/admin/enquiries", icon: Mail },
];

// The "View Website" link is shown only when the public site URL is configured
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

const subscribe = () => () => {};

const isActive = (pathname, href) => pathname === href || pathname.startsWith(`${href}/`);

// Bare emblem, no circle (as in the design)
const BrandMark = () => (
  <Image src={CavLogo} alt="CAV logo" className="h-9 w-auto shrink-0 object-contain" priority />
);

// Small dark avatar used in the user card
const UserAvatar = () => (
  <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-black">
    <Image src={CavLogo} alt="" className="h-full w-full object-contain p-0.5" />
  </span>
);

export default function Sidebar({ open, collapsed, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const [confirmLogout, setConfirmLogout] = useState(false);

  // logged-in user (localStorage), null on the server render
  const rawUser = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem("user"),
    () => null
  );
  const user = useMemo(() => {
    try {
      return rawUser ? JSON.parse(rawUser) : null;
    } catch {
      return null;
    }
  }, [rawUser]);

  // Escape closes the mobile menu (skipped while the logout dialog is open)
  useEffect(() => {
    if (!open || confirmLogout) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, confirmLogout, onClose]);

  useEffect(() => {
    if (!confirmLogout) return;
    const onKey = (e) => e.key === "Escape" && setConfirmLogout(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmLogout]);

  const handleLogout = () => {
    clearSession();
    setConfirmLogout(false);
    onClose();
    router.replace("/login");
  };

  const username = user?.username || "admin";
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);
  const role = user?.role === "owner" ? "SUPER ADMIN" : (user?.role || "ADMIN").toUpperCase();

  const hideWhenCollapsed = collapsed ? "lg:hidden" : "";
  const footerLinkCls = `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-colors ${
    collapsed ? "lg:justify-center lg:px-0" : ""
  }`;

  return (
    <>
      {/* mobile / tablet overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] max-w-[85vw] flex-col bg-navy transition-all duration-300 lg:static lg:max-w-none lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "lg:w-[76px]" : "lg:w-[240px]"}`}
      >
        {/* Logo */}
        <div
          className={`flex h-[70px] shrink-0 items-center gap-3 border-b border-line-dark/60 px-5 ${
            collapsed ? "lg:justify-center lg:px-2" : ""
          }`}
        >
          <BrandMark />
          <div className={hideWhenCollapsed}>
            <p className="text-base font-semibold tracking-wide text-white">CAV</p>
            <p className="text-[9px] font-medium tracking-[0.22em] text-gold">ADMIN CONSOLE</p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto rounded-md p-1 text-white lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 pt-5">
          <p
            className={`px-3 pb-2 text-[10px] font-semibold tracking-[0.15em] text-white/30 ${hideWhenCollapsed}`}
          >
            NAVIGATION
          </p>
          {menu.map(({ label, href, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                title={collapsed ? label : undefined}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors ${
                  collapsed ? "lg:justify-center lg:px-0" : ""
                } ${
                  active
                    ? "bg-white text-navy"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={16} className="shrink-0" />
                <span className={`truncate ${hideWhenCollapsed}`}>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer links */}
        <div className="shrink-0 space-y-1 border-t border-line-dark/60 px-3 py-3">
          {SITE_URL && (
            <a
              href={SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              title={collapsed ? "View Website" : undefined}
              className={`${footerLinkCls} text-white/60 hover:bg-white/5 hover:text-white`}
            >
              <Globe size={16} className="shrink-0" />
              <span className={`truncate ${hideWhenCollapsed}`}>View Website</span>
            </a>
          )}
          <Link
            href="/admin/settings"
            onClick={onClose}
            title={collapsed ? "Settings" : undefined}
            aria-current={isActive(pathname, "/admin/settings") ? "page" : undefined}
            className={`${footerLinkCls} ${
              isActive(pathname, "/admin/settings")
                ? "bg-white text-navy"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Settings size={16} className="shrink-0" />
            <span className={`truncate ${hideWhenCollapsed}`}>Settings</span>
          </Link>
        </div>

        {/* User card */}
        <div className="shrink-0 border-t border-line-dark/60 p-3">
          <button
            onClick={() => setConfirmLogout(true)}
            title={collapsed ? "Sign out" : undefined}
            className={`flex w-full items-center gap-3 rounded-lg border border-white/5 bg-[#070d1a] px-3 py-2.5 text-left transition-colors hover:bg-black ${
              collapsed ? "lg:justify-center" : ""
            }`}
          >
            <UserAvatar />
            <div className={`min-w-0 flex-1 ${hideWhenCollapsed}`}>
              <p className="truncate text-xs font-semibold text-white">{displayName}</p>
              <p className="truncate text-[9px] font-medium tracking-wide text-gold">{role}</p>
            </div>
            <LogOut size={14} className={`shrink-0 text-white/40 ${hideWhenCollapsed}`} />
          </button>
        </div>
      </aside>

      {confirmLogout && (
        <ConfirmDialog
          title="Sign out?"
          message="Are you sure you want to sign out of the admin console?"
          confirmLabel="Sign Out"
          onConfirm={handleLogout}
          onCancel={() => setConfirmLogout(false)}
        />
      )}
    </>
  );
}