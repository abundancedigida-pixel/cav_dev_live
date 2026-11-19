"use client";
import React, { Suspense, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { Building2, CheckCircle2, Clock } from "lucide-react";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import DeepLink from "@/components/common/DeepLink";
import PropertyFilters from "@/components/properties/PropertyFilters";
import PropertyTable from "@/components/properties/PropertyTable";
import PropertyDrawer from "@/components/properties/PropertyDrawer";
import PropertyViewDrawer from "@/components/properties/PropertyViewDrawer";
import usePagedList from "@/components/hooks/usePagedList";
import { getProperties, deleteProperty, getPropertyById } from "@/services/propertyService";
import { getErrorMessage } from "@/utils/apiError";

const LIMIT = 10;
const DEFAULT_FILTERS = { search: "", propertyType: "all", availability: "all", status: "all" };

const pad = (n) => String(n ?? 0).padStart(2, "0");

export default function PropertiesPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [resetKey, setResetKey] = useState(0);

  const [drawer, setDrawer] = useState(null); // { property: null } = add, { property: obj } = edit
  const [viewing, setViewing] = useState(null); // property being viewed (read-only)
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const { data, total, stats, loading, error, reload } = usePagedList(getProperties, {
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
      await deleteProperty(toDelete.id);
      toast.success("Property deleted");
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
    { label: "Total Properties", value: stats?.total, note: "Across South India", icon: Building2, status: "all" },
    { label: "Published", value: stats?.published, note: "Live on public catalog", icon: CheckCircle2, status: "Published" },
    { label: "Drafts & Review", value: stats?.drafts, note: "Pending documentation", icon: Clock, status: "Draft" },
  ];

  return (
    <div className="space-y-5">
      <Suspense fallback={null}>
        <DeepLink
          onNew={() => setDrawer({ property: null })}
          onEdit={async (id) => setDrawer({ property: await getPropertyById(id) })}
        />
      </Suspense>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#1a1a1a] sm:text-3xl">Properties</h2>
          <p className="mt-1.5 max-w-[560px] text-[11px] leading-relaxed text-[#00000099] sm:text-xs">
            Manage the private residences, villas, and sky homes presented across the Abundance Group public estate
            registry.
          </p>
        </div>
        <button
          onClick={() => setDrawer({ property: null })}
          className="h-11 rounded-sm bg-navy px-6 text-[11px] font-semibold uppercase tracking-wider text-white hover:opacity-90"
        >
          + Add Property
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

      <PropertyFilters
        key={resetKey}
        filters={filters}
        onSearch={handleSearch}
        onFilter={applyFilter}
        onReset={handleReset}
      />

      <PropertyTable
        rows={data}
        loading={loading}
        error={error}
        onRetry={reload}
        page={page}
        total={total}
        limit={LIMIT}
        onPageChange={setPage}
        onView={setViewing}
        onEdit={(p) => setDrawer({ property: p })}
        onDelete={setToDelete}
      />

      {viewing && (
        <PropertyViewDrawer
          key={viewing.id}
          property={viewing}
          onClose={() => setViewing(null)}
          onEdit={() => {
            setDrawer({ property: viewing });
            setViewing(null);
          }}
        />
      )}

      {drawer && (
        <PropertyDrawer
          key={drawer.property?.id ?? "new"}
          property={drawer.property}
          onClose={() => setDrawer(null)}
          onSaved={reload}
        />
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete property?"
          message={`"${toDelete.name}" will be permanently deleted from the estate registry. This action cannot be undone.`}
          busy={deleting}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  );
}