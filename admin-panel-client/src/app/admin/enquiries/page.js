"use client";
import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Inbox, Mail, Clock, CheckCircle2 } from "lucide-react";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import DeepLink from "@/components/common/DeepLink";
import EnquiryFilters from "@/components/enquiries/EnquiryFilters";
import EnquiryTable from "@/components/enquiries/EnquiryTable";
import EnquiryDrawer from "@/components/enquiries/EnquiryDrawer";
import usePagedList from "@/components/hooks/usePagedList";
import { getEnquiries, getEnquiryById, deleteEnquiry } from "@/services/enquiryService";
import { getErrorMessage } from "@/utils/apiError";

const LIMIT = 10;
const DEFAULT_FILTERS = { search: "", interestType: "all", status: "all" };

const pad = (n) => String(n ?? 0).padStart(2, "0");

function EnquiriesContent() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [resetKey, setResetKey] = useState(0);

  const [drawer, setDrawer] = useState(null); // { enquiry, focusReply }
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const { data, total, stats, loading, error, reload } = usePagedList(getEnquiries, {
    page,
    limit: LIMIT,
    ...filters,
  });

  // keep the latest reload for the notification listener
  const reloadRef = useRef(reload);
  useEffect(() => {
    reloadRef.current = reload;
  });

  // refresh the list when a new enquiry notification arrives
  useEffect(() => {
    const onNotification = (e) => {
      if (e.detail?.type === "enquiry") reloadRef.current();
    };
    window.addEventListener("cav:notification", onNotification);
    return () => window.removeEventListener("cav:notification", onNotification);
  }, []);

  const applyFilter = useCallback((patch) => {
    setPage(1);
    setFilters((f) => ({ ...f, ...patch }));
  }, []);

  const handleSearch = useCallback((v) => applyFilter({ search: v }), [applyFilter]);

  const handleReset = () => {
    setPage(1);
    setFilters(DEFAULT_FILTERS);
    setResetKey((k) => k + 1);
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteEnquiry(toDelete.id);
      toast.success("Enquiry deleted");
      setToDelete(null);
      if (data.length === 1 && page > 1) setPage(page - 1);
      else reload();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  const statCards = [
    { label: "Total Inbound", value: stats?.total, note: "All-time records", icon: Inbox, status: "all" },
    { label: "New Enquiries", value: stats?.newCount, note: "Awaiting triage", icon: Mail, status: "New" },
    { label: "In Progress", value: stats?.inProgress, note: "Under review", icon: Clock, status: "In Progress" },
    { label: "Responded", value: stats?.responded, note: "Response dispatched", icon: CheckCircle2, status: "Responded" },
  ];

  return (
    <div className="space-y-5">
      {/* opens the enquiry from ?view=ID (notifications, dashboard, search) */}
      <DeepLink
        onView={async (id) => setDrawer({ enquiry: await getEnquiryById(id), focusReply: false })}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#1a1a1a] sm:text-3xl">Enquiries Management</h2>
          <p className="mt-1.5 max-w-[560px] text-[11px] leading-relaxed text-[#00000099] sm:text-xs">
            View incoming enquiries, manage follow-ups, and track responses from prospective patrons and buyers.
          </p>
        </div>
        <button
          onClick={() => applyFilter({ status: "New" })}
          aria-pressed={filters.status === "New"}
          className={`h-11 rounded-sm border px-5 text-[11px] font-semibold uppercase tracking-wider ${
            filters.status === "New"
              ? "border-navy bg-navy text-white"
              : "border-line bg-white text-navy hover:bg-surface"
          }`}
        >
          Quick Filter: New Only ({pad(stats?.newCount)})
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ label, value, note, icon: Icon, status }) => {
          const active = filters.status === status;
          return (
            <button
              key={label}
              onClick={() => applyFilter({ status })}
              aria-pressed={active}
              className={`rounded-lg border border-line border-b-2 bg-white p-4 text-left transition-colors hover:bg-surface ${
                active ? "border-b-navy" : "border-b-transparent"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#00000099]">{label}</p>
                <Icon size={16} className="text-navy" />
              </div>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="font-serif text-3xl font-semibold text-[#1a1a1a]">{pad(value)}</span>
                <span className="text-[9px] font-semibold uppercase tracking-wider text-[#00000080]">{note}</span>
              </p>
            </button>
          );
        })}
      </div>

      <EnquiryFilters
        key={resetKey}
        filters={filters}
        onSearch={handleSearch}
        onFilter={applyFilter}
        onReset={handleReset}
      />

      <EnquiryTable
        rows={data}
        loading={loading}
        error={error}
        onRetry={reload}
        page={page}
        total={total}
        limit={LIMIT}
        onPageChange={setPage}
        onView={(e) => setDrawer({ enquiry: e, focusReply: false })}
        onReply={(e) => setDrawer({ enquiry: e, focusReply: true })}
        onDelete={setToDelete}
      />

      {drawer && (
        <EnquiryDrawer
          key={drawer.enquiry.id}
          enquiry={drawer.enquiry}
          focusReply={drawer.focusReply}
          onClose={() => setDrawer(null)}
          onChanged={reload}
        />
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete enquiry?"
          message={`The enquiry from "${toDelete.name}" will be permanently deleted. This action cannot be undone.`}
          confirmLabel="Delete"
          busy={deleting}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  );
}

// useSearchParams (inside DeepLink) needs a Suspense boundary in the Next.js app router
export default function EnquiriesPage() {
  return (
    <Suspense fallback={null}>
      <EnquiriesContent />
    </Suspense>
  );
}