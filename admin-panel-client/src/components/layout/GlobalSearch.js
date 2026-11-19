"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, FileText, Building2, FolderKanban, Mail } from "lucide-react";
import { searchAll } from "@/services/searchService";

const MIN_CHARS = 2;

const GROUPS = [
  { key: "blogs", label: "Blogs", icon: FileText },
  { key: "properties", label: "Properties", icon: Building2 },
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "enquiries", label: "Enquiries", icon: Mail },
];

export default function GlobalSearch({ autoFocus = false, shortcut = false, onClose }) {
  const router = useRouter();
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const term = query.trim();
  const ready = term.length >= MIN_CHARS;

  // debounced request (state is only set after the response arrives)
  useEffect(() => {
    if (!ready) return;
    let cancelled = false;

    const timer = setTimeout(() => {
      searchAll(term)
        .then((r) => {
          if (cancelled) return;
          setResults(r);
          setActive(0);
        })
        .catch(() => {
          if (!cancelled) setResults({ blogs: [], properties: [], projects: [], enquiries: [] });
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [term, ready]);

  // flat list for keyboard navigation
  const flat = useMemo(
    () =>
      results ? GROUPS.flatMap((g) => (results[g.key] || []).map((item) => ({ ...item, group: g.key }))) : [],
    [results]
  );

  // close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => !wrapRef.current?.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Ctrl/Cmd + K focuses the search
  useEffect(() => {
    if (!shortcut) return;
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shortcut]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setOpen(true);

    if (value.trim().length >= MIN_CHARS) {
      setLoading(true);
    } else {
      setLoading(false);
      setResults(null);
    }
  };

  const go = (item) => {
    setOpen(false);
    setQuery("");
    setResults(null);
    onClose?.();
    router.push(item.href);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(flat.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && flat[active]) {
      e.preventDefault();
      go(flat[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
      onClose?.();
    }
  };

  const showPanel = open && ready;
  const empty = results && flat.length === 0 && !loading;

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 focus-within:border-gold">
        {loading ? (
          <Loader2 size={14} className="shrink-0 animate-spin text-[#00000066]" />
        ) : (
          <Search size={14} className="shrink-0 text-[#00000066]" />
        )}
        <input
          ref={inputRef}
          value={query}
          onChange={handleChange}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          placeholder="Search records, assets, enquiries..."
          aria-label="Search"
          className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#00000066]"
        />
        {shortcut && (
          <kbd className="hidden shrink-0 rounded border border-line bg-white px-1.5 py-0.5 text-[9px] font-semibold text-[#00000066] xl:block">
            Ctrl K
          </kbd>
        )}
      </div>

      {showPanel && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-xl border border-line bg-white shadow-xl sm:left-auto sm:right-0 sm:w-[420px]">
          {!results && <p className="px-4 py-6 text-center text-xs text-[#00000080]">Searching...</p>}

          {empty && (
            <p className="px-4 py-6 text-center text-xs text-[#00000080]">No results for &ldquo;{term}&rdquo;</p>
          )}

          {results &&
            GROUPS.map((g) => {
              const items = flat.filter((i) => i.group === g.key);
              if (!items.length) return null;
              const Icon = g.icon;

              return (
                <div key={g.key} className="border-b border-line last:border-b-0">
                  <p className="flex items-center gap-1.5 bg-[#eaf0fb] px-4 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-[#00000099]">
                    <Icon size={11} /> {g.label}
                  </p>
                  {items.map((item) => {
                    const index = flat.indexOf(item);
                    return (
                      <button
                        key={`${g.key}-${item.id}`}
                        type="button"
                        onClick={() => go(item)}
                        onMouseEnter={() => setActive(index)}
                        className={`block w-full px-4 py-2.5 text-left ${
                          index === active ? "bg-surface" : ""
                        }`}
                      >
                        <span className="block truncate text-xs font-semibold text-[#1a1a1a]">{item.title}</span>
                        {item.sub && (
                          <span className="block truncate text-[11px] text-[#00000099]">{item.sub}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}