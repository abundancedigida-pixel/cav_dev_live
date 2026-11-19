"use client";
import React, { Suspense, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { FileText, Globe, Clock } from "lucide-react";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import DeepLink from "@/components/common/DeepLink";
import BlogFilters from "@/components/blogs/BlogFilters";
import BlogTable from "@/components/blogs/BlogTable";
import BlogDrawer from "@/components/blogs/BlogDrawer";
import BlogViewDrawer from "@/components/blogs/BlogViewDrawer";
import usePagedList from "@/components/hooks/usePagedList";
import { getBlogs, deleteBlog, getBlogById } from "@/services/blogService";
import { getErrorMessage } from "@/utils/apiError";

const LIMIT = 10;
const DEFAULT_FILTERS = { search: "", category: "all", status: "all" };

const pad = (n) => String(n ?? 0).padStart(2, "0");

export default function BlogsPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [resetKey, setResetKey] = useState(0);

  const [drawer, setDrawer] = useState(null); // { blog: null } = add, { blog: obj } = edit
  const [viewing, setViewing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const { data, total, stats, loading, error, reload } = usePagedList(getBlogs, {
    page,
    limit: LIMIT,
    ...filters,
  });

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
      await deleteBlog(toDelete.id);
      toast.success("Blog deleted");
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
    { label: "Total Manuscripts", value: stats?.total, note: "All articles", icon: FileText, status: "all" },
    { label: "Published Live", value: stats?.published, note: "Live on public journal", icon: Globe, status: "Published" },
    { label: "Drafts & In Review", value: stats?.drafts, note: "Pending curation", icon: Clock, status: "Draft" },
  ];

  return (
    <div className="space-y-5">
      <Suspense fallback={null}>
        <DeepLink
          onNew={() => setDrawer({ blog: null })}
          onEdit={async (id) => setDrawer({ blog: await getBlogById(id) })}
        />
      </Suspense>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#1a1a1a] sm:text-3xl">Blog Management</h2>
          <p className="mt-1.5 max-w-[560px] text-[11px] leading-relaxed text-[#00000099] sm:text-xs">
            Create, edit, and orchestrate architectural editorial articles published on the Abundance Group public
            journal.
          </p>
        </div>
        <button
          onClick={() => setDrawer({ blog: null })}
          className="h-11 rounded-sm bg-navy px-6 text-[11px] font-semibold uppercase tracking-wider text-white hover:opacity-90"
        >
          + Add Blog
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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

      <BlogFilters
        key={resetKey}
        filters={filters}
        onSearch={handleSearch}
        onFilter={applyFilter}
        onReset={handleReset}
      />

      <BlogTable
        rows={data}
        loading={loading}
        error={error}
        onRetry={reload}
        page={page}
        total={total}
        limit={LIMIT}
        onPageChange={setPage}
        onView={setViewing}
        onEdit={(b) => setDrawer({ blog: b })}
        onDelete={setToDelete}
      />

      {viewing && (
        <BlogViewDrawer
          key={viewing.id}
          blog={viewing}
          onClose={() => setViewing(null)}
          onEdit={() => {
            setDrawer({ blog: viewing });
            setViewing(null);
          }}
        />
      )}

      {drawer && (
        <BlogDrawer
          key={drawer.blog?.id ?? "new"}
          blog={drawer.blog}
          onClose={() => setDrawer(null)}
          onSaved={reload}
        />
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete blog?"
          message={`"${toDelete.title}" will be permanently deleted along with its images. This action cannot be undone.`}
          confirmLabel="Delete"
          busy={deleting}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  );
}