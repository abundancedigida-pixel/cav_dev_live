"use client";
import React, { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  ChevronDown,
  LogOut,
  Search,
  X,
  SlidersHorizontal,
  PenLine,
  Building2,
  FolderKanban,
  Mail,
  Settings,
} from "lucide-react";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import NotificationBell from "@/components/layout/NotificationBell";
import GlobalSearch from "@/components/layout/GlobalSearch";
import { clearSession } from "@/services/authService";
import CavLogo from "@/assets/Logo.svg";

const titles = {
  "/admin/dashboard": "Dashboard",
  "/admin/blogs": "Blog Management",
  "/admin/properties": "Properties",
  "/admin/projects": "Projects",
  "/admin/enquiries": "Enquiries",
  "/admin/settings": "Settings",
};

const QUICK_ACTIONS = [
  { label: "Add Blog Post", href: "/admin/blogs?new=1", icon: PenLine },
  { label: "Add Property", href: "/admin/properties?new=1", icon: Building2 },
  { label: "Add Project", href: "/admin/projects?new=1", icon: FolderKanban },
  { label: "View Enquiries", href: "/admin/enquiries", icon: Mail },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

const subscribe = () => () => {};

export default function Topbar({ onMenu }) {
  const pathname = usePathname();
  const router = useRouter();
  const userBoxRef = useRef(null);
  const quickBoxRef = useRef(null);

  const [userMenu, setUserMenu] = useState(false);
  const [quickMenu, setQuickMenu] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

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

  const username = user?.username || "admin";
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);
  const email = user?.email || "";
  const role = user?.role === "owner" ? "Administrator" : user?.role || "Administrator";

  const title =
    Object.entries(titles).find(([path]) => pathname.startsWith(path))?.[1] || "Dashboard";

  // outside click / Escape closes the user menu and the quick actions menu
  useEffect(() => {
    if (!userMenu && !quickMenu) return;

    const onDown = (e) => {
      if (userMenu && !userBoxRef.current?.contains(e.target)) setUserMenu(false);
      if (quickMenu && !quickBoxRef.current?.contains(e.target)) setQuickMenu(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setUserMenu(false);
        setQuickMenu(false);
      }
    };

    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [userMenu, quickMenu]);

  useEffect(() => {
    if (!confirmLogout) return;

    const onKey = (e) => e.key === "Escape" && setConfirmLogout(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmLogout]);

  const askLogout = () => {
    setUserMenu(false);
    setConfirmLogout(true);
  };

  const handleLogout = () => {
    clearSession();
    setConfirmLogout(false);
    router.replace("/login");
  };

  return (
    <>
      <header className="relative z-30 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-line bg-white px-3 sm:h-[72px] sm:px-6">
        {/* Left: menu + title */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={onMenu}
            aria-label="Toggle menu"
            className="shrink-0 rounded-md p-1.5 text-[#444] hover:bg-surface"
          >
            <Menu size={18} />
          </button>

          <div className="min-w-0">
            <p className="hidden text-[9px] font-semibold uppercase tracking-[0.18em] text-[#00000066] sm:block">
              Operational Directorate
            </p>
            <h1 className="truncate font-serif text-base font-semibold text-[#1a1a1a] sm:text-lg">
              {title}
            </h1>
          </div>
        </div>

        {/* Right: search, notifications, quick actions, user */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {/* Search (desktop) */}
          <div className="mr-2 hidden w-[280px] xl:w-[320px] lg:block">
            <GlobalSearch shortcut />
          </div>

          {/* Search toggle (mobile / tablet) */}
          <button
            onClick={() => setMobileSearch((v) => !v)}
            aria-label={mobileSearch ? "Close search" : "Open search"}
            aria-expanded={mobileSearch}
            className="rounded-md p-2 text-[#444] hover:bg-surface lg:hidden"
          >
            {mobileSearch ? <X size={18} /> : <Search size={18} />}
          </button>

          <NotificationBell />

          {/* Quick actions */}
                   <div ref={quickBoxRef} className="sm:relative">
            <button
              onClick={() => {
                setQuickMenu((v) => !v);
                setUserMenu(false);
              }}
              aria-label="Quick actions"
              aria-haspopup="menu"
              aria-expanded={quickMenu}
              title="Quick actions"
              className={`rounded-md p-2 text-[#444] hover:bg-surface ${quickMenu ? "bg-surface" : ""}`}
            >
              <SlidersHorizontal size={18} />
            </button>

            {quickMenu && (
              <div
                role="menu"
                className="absolute inset-x-3 top-full mt-2 overflow-hidden rounded-lg border border-line bg-white shadow-lg sm:inset-x-auto sm:right-0 sm:mt-3 sm:w-56"
              >
                <p className="bg-[#eaf0fb] px-4 py-2 text-[9px] font-semibold uppercase tracking-wider text-[#00000099]">
                  Quick actions
                </p>
                {QUICK_ACTIONS.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    role="menuitem"
                    onClick={() => setQuickMenu(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs text-[#222] hover:bg-surface"
                  >
                    <Icon size={14} className="text-navy" />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* User menu */}
                <div ref={userBoxRef} className="relative ml-1 border-l border-line pl-2 sm:pl-4">
            <button
              onClick={() => {
                setUserMenu((v) => !v);
                setQuickMenu(false);
              }}
              aria-haspopup="menu"
              aria-expanded={userMenu}
              className="flex items-center gap-2"
            >
              <div className="hidden text-right sm:block">
                <p className="text-[11px] font-semibold text-[#1a1a1a]">{displayName}</p>
                <p className="text-[9px] uppercase tracking-wide text-[#00000066]">{role}</p>
              </div>

              <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black">
                <Image src={CavLogo} alt="" className="h-full w-full object-contain p-1" />
              </span>

              <ChevronDown
                size={12}
                className={`transition-transform ${userMenu ? "rotate-180" : ""}`}
              />
            </button>

            {userMenu && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-3 w-52 overflow-hidden rounded-lg border border-line bg-white shadow-lg"
              >
                <div className="border-b border-line px-4 py-3">
                  <p className="truncate text-xs font-semibold text-[#1a1a1a]">{displayName}</p>
                  <p className="truncate text-[10px] text-[#00000099]">{email}</p>
                </div>

                <button
                  role="menuitem"
                  onClick={askLogout}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-xs text-red-500 hover:bg-red-50"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search bar (mobile / tablet) */}
        {mobileSearch && (
          <div className="absolute inset-x-0 top-full z-40 border-b border-line bg-white p-3 shadow-sm lg:hidden">
            <GlobalSearch autoFocus onClose={() => setMobileSearch(false)} />
          </div>
        )}
      </header>

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