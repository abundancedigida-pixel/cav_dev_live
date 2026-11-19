"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Building2,
  ClipboardCheck,
  Inbox,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Mail,
  PenLine,
  FolderKanban,
  Home,
} from "lucide-react";
import { getDashboard, formatWhen } from "@/services/dashboardService";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

const ROUTES = {
  blogs: "/admin/blogs",
  properties: "/admin/properties",
  projects: "/admin/projects",
  enquiries: "/admin/enquiries",
};

// backend "type" -> admin page
const CONTENT_ROUTES = {
  "Blog Article": ROUTES.blogs,
  "Property Listing": ROUTES.properties,
  "Project Portfolio": ROUTES.projects,
};

const pad = (n) => String(n ?? 0).padStart(2, "0");

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "?";

// ---------- small pieces ----------

const ENQUIRY_STATUS = {
  new: "bg-[#e6ecf7] text-[#3d4a66]",
  "in progress": "bg-amber-100 text-amber-800",
  contacted: "bg-[#e6ecf7] text-[#3d4a66]",
  closed: "bg-gray-100 text-gray-500",
};

function EnquiryStatus({ value }) {
  const cls = ENQUIRY_STATUS[value.toLowerCase()] || "bg-gray-100 text-gray-600";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide ${cls}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {value}
    </span>
  );
}

function ContentStatus({ value }) {
  const published = value.toLowerCase() === "published";
  return (
    <span
      className={`rounded-sm px-2 py-1 text-[9px] font-semibold uppercase tracking-wide ${
        published ? "bg-[#e6ecf7] text-[#3d4a66]" : "bg-gray-100 text-gray-500"
      }`}
    >
      {value || "—"}
    </span>
  );
}

function StatCard({ label, value, note, icon: Icon, accent, badge, loading }) {
  return (
    <div
      className={`flex min-h-[132px] flex-col justify-between rounded-lg border border-line border-t-2 bg-white p-4 ${
        accent ? "border-t-gold" : "border-t-transparent"
      }`}
    >
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#00000099]">{label}</p>
        <Icon size={16} className="text-navy" />
      </div>
      <div>
        {loading ? (
          <div className="h-9 w-16 animate-pulse rounded bg-surface" />
        ) : (
          <p className="flex items-baseline gap-2">
            <span className={`font-serif text-4xl font-semibold ${accent ? "text-gold-dark" : "text-[#1a1a1a]"}`}>
              {pad(value)}
            </span>
            {badge}
          </p>
        )}
        <p className="mt-2 text-xs text-[#00000099]">{note}</p>
      </div>
    </div>
  );
}

function NewContentMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const items = [
    { label: "Blog post", href: `${ROUTES.blogs}?new=1` },
    { label: "Property listing", href: `${ROUTES.properties}?new=1` },
    { label: "Development project", href: `${ROUTES.projects}?new=1` },  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-10 items-center gap-2 rounded-sm bg-navy px-5 text-[11px] font-semibold uppercase tracking-wider text-white hover:opacity-90"
      >
        + New Content <ChevronDown size={13} className={open ? "rotate-180" : ""} />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-20 mt-2 w-52 overflow-hidden rounded-lg border border-line bg-white shadow-lg"
        >
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-xs text-[#222] hover:bg-surface"
            >
              {i.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- data hook ----------

function useDashboard() {
  const [state, setState] = useState({ data: null, loading: true, error: false, syncedAt: null });
  const [key, setKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    getDashboard()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: false, syncedAt: new Date() });
      })
      .catch((err) => {
        console.error("Failed to load dashboard:", err);
        if (!cancelled) setState((s) => ({ ...s, loading: false, error: true }));
      });

    return () => {
      cancelled = true;
    };
  }, [key]);

  const reload = () => {
    setState((s) => ({ ...s, loading: true, error: false }));
    setKey((k) => k + 1);
  };

  return { ...state, reload };
}

// ---------- page ----------

export default function DashboardPage() {
  const { data, loading, error, syncedAt, reload } = useDashboard();
  const s = data?.summary;

  const manage = [
    { title: "Blog Management", text: "Create, edit, and publish articles", icon: PenLine, href: ROUTES.blogs },
    { title: "Properties", text: "Update home listings and details", icon: Home, href: ROUTES.properties },
    { title: "Projects", text: "Maintain the development portfolio", icon: FolderKanban, href: ROUTES.projects },
    { title: "Enquiries", text: "Review customer enquiries", icon: Mail, href: ROUTES.enquiries },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-widest text-gold-dark">
            Abundance Group | Administration
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-navy">Website Overview</h2>
          <p className="mt-2 max-w-[460px] text-xs leading-relaxed text-[#00000099]">
            Manage your website content, keep property and project information up to date, and respond to customer
            enquiries from one place.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={SITE_URL || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 items-center gap-1.5 rounded-sm border border-line bg-white px-4 text-[11px] font-semibold uppercase tracking-wider text-[#222] hover:bg-surface"
          >
            View Website <ArrowUpRight size={13} />
          </a>
          <NewContentMenu />
        </div>
      </div>

      {error && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
          Unable to load the dashboard.
          <button onClick={reload} className="font-semibold underline">
            Retry
          </button>
        </div>
      )}

      {/* Stat cards */}
      <div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Blogs" value={s?.blogs} note="Total articles" icon={FileText} loading={loading && !data} />
          <StatCard
            label="Active Properties"
            value={s?.properties}
            note="Currently listed"
            icon={Building2}
            loading={loading && !data}
          />
          <StatCard
            label="Active Projects"
            value={s?.projects}
            note="Across development portfolio"
            icon={ClipboardCheck}
            loading={loading && !data}
          />
          <StatCard
            label="New Enquiries"
            value={s?.newEnquiries}
            note="Awaiting immediate review"
            icon={Inbox}
            accent
            loading={loading && !data}
            badge={
              s?.newEnquiries > 0 ? (
                <span className="text-[8px] font-bold uppercase tracking-wider text-red-600">Action required</span>
              ) : null
            }
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[9px] uppercase tracking-wider text-[#00000066]">
          <span>Live data from the Abundance CMS</span>
          <span>
            Last synchronized:{" "}
            {syncedAt ? syncedAt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "—"}
          </span>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap items-center gap-2 border-t border-line pt-5">
        <span className="mr-1 text-[10px] font-semibold uppercase tracking-wider text-[#00000099]">Quick actions:</span>
              <Link
          href={`${ROUTES.blogs}?new=1`}
          className="rounded-sm bg-navy px-3.5 py-2 text-[10px] font-semibold uppercase tracking-wider text-white hover:opacity-90"
        >
          + Add Blog Post
        </Link>
        <Link
          href={`${ROUTES.properties}?new=1`}
          className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#444] hover:underline"
        >
          + Add Property Listing
        </Link>
               <Link
          href={`${ROUTES.projects}?new=1`}
          className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#444] hover:underline"
        >
          + Add Development Project
        </Link>
        <Link
          href={ROUTES.enquiries}
          className="flex items-center gap-1.5 rounded-sm bg-[#e6ecf7] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-wider text-navy hover:bg-[#dbe4f3]"
        >
          <Mail size={12} /> View All Enquiries{s ? ` (${s.newEnquiries})` : ""}
        </Link>
      </div>

      {/* Recent enquiries */}
      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl font-semibold text-navy">Recent Enquiries</h3>
            <p className="mt-1 text-xs text-[#00000099]">Customer leads awaiting review and advisory response</p>
          </div>
          <Link
            href={ROUTES.enquiries}
            className="flex items-center gap-1 text-[11px] font-semibold text-navy hover:underline"
          >
            View All Enquiries <ArrowRight size={12} />
          </Link>
        </div>

        <div className="mt-3 overflow-hidden rounded-lg border border-line bg-white">
          <div className="hidden bg-[#eaf0fb] text-[9px] font-semibold uppercase tracking-wider text-[#00000099] md:grid md:grid-cols-[2fr_1.5fr_1fr_1fr_1fr] md:px-5 md:py-3">
            <span>Customer & Contact</span>
            <span>Enquiry Type</span>
            <span>Received</span>
            <span>Status</span>
            <span className="text-right">Action</span>
          </div>

          {loading && !data &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse border-t border-line px-5 py-4">
                <div className="h-8 rounded bg-surface" />
              </div>
            ))}

          {data?.recentEnquiries.map((e) => {
            const when = formatWhen(e.date);
            return (
              <div
                key={e.id}
                className="grid grid-cols-1 gap-2 border-t border-line px-5 py-3.5 text-xs first:border-t-0 md:grid-cols-[2fr_1.5fr_1fr_1fr_1fr] md:items-center"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-[#e6ecf7] text-[10px] font-bold text-navy">
                    {initials(e.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-[#1a1a1a]">{e.name}</p>
                    <p className="truncate text-[11px] text-[#00000099]">{e.email || "—"}</p>
                  </div>
                </div>
                <div>
                  <span className="inline-block rounded-sm bg-[#e6ecf7] px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-[#3d4a66]">
                    {e.type}
                  </span>
                </div>
                <div className="leading-tight">
                  <p className="font-semibold text-[#1a1a1a]">{when.day}</p>
                  <p className="text-[10px] text-[#00000066]">{when.time}</p>
                </div>
                <div>
                  <EnquiryStatus value={e.status} />
                </div>
                <div className="md:text-right">
                                  <Link
                    href={`${ROUTES.enquiries}?view=${e.id}`}
                    className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-navy hover:underline"
                  >
                    View details <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            );
          })}

          {data && data.recentEnquiries.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-[#00000099]">No enquiries yet.</p>
          )}
        </div>
      </section>

      {/* Manage + recently updated */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.6fr]">
        <section>
          <h3 className="font-serif text-xl font-semibold text-navy">Manage Your Website</h3>
          <p className="mt-1 text-xs text-[#00000099]">Direct shortcuts to core CMS content modules</p>

          <div className="mt-3 space-y-2">
            {manage.map(({ title, text, icon: Icon, href }) => (
              <Link
                key={title}
                href={href}
                className="flex items-center gap-3 rounded-lg border border-line bg-white p-3.5 hover:bg-surface"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[#e6ecf7] text-navy">
                  <Icon size={16} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-[#1a1a1a]">{title}</span>
                  <span className="block truncate text-[11px] text-[#00000099]">{text}</span>
                </span>
                <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-navy">
                  Manage <ArrowRight size={11} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h3 className="font-serif text-xl font-semibold text-navy">Recently Updated Content</h3>
          <p className="mt-1 text-xs text-[#00000099]">Audit logs of recently modified pages, listings, and editorial articles</p>

          <div className="mt-3 overflow-hidden rounded-lg border border-line bg-white">
            <div className="hidden bg-[#eaf0fb] text-[9px] font-semibold uppercase tracking-wider text-[#00000099] sm:grid sm:grid-cols-[2fr_1fr_1fr_0.6fr] sm:px-5 sm:py-3">
              <span>Title & Type</span>
              <span>Last Updated</span>
              <span>Status</span>
              <span className="text-right">Action</span>
            </div>

            {loading && !data &&
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse border-t border-line px-5 py-4">
                  <div className="h-8 rounded bg-surface" />
                </div>
              ))}

            {data?.recentContent.map((c) => {
              const when = formatWhen(c.date);
              return (
                <div
                  key={`${c.type}-${c.id}`}
                  className="grid grid-cols-1 gap-1.5 border-t border-line px-5 py-3.5 text-xs first:border-t-0 sm:grid-cols-[2fr_1fr_1fr_0.6fr] sm:items-center"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-[#1a1a1a]">{c.title}</p>
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[#00000066]">{c.type}</p>
                  </div>
                  <div className="leading-tight">
                    <p className="font-semibold text-[#1a1a1a]">{when.day}</p>
                    <p className="text-[10px] text-[#00000066]">{when.time}</p>
                  </div>
                  <div>
                    <ContentStatus value={c.status} />
                  </div>
                  <div className="sm:text-right">
                    <Link
                                           href={`${CONTENT_ROUTES[c.type] || ROUTES.blogs}?edit=${c.id}`}
                      className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-navy hover:underline"
                    >
                      Edit <ArrowUpRight size={11} />
                    </Link>
                  </div>
                </div>
              );
            })}

            {data && data.recentContent.length === 0 && (
              <p className="px-5 py-10 text-center text-sm text-[#00000099]">No content updated yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}