"use client";
import { useEffect, useState } from "react";

// fetcher(params) -> { data, total, stats }
export default function usePagedList(fetcher, params) {
  const [reloadKey, setReloadKey] = useState(0);
  const [res, setRes] = useState({ id: null, data: [], total: 0, stats: null, error: false });
  const reqId = `${JSON.stringify(params)}|${reloadKey}`;

  useEffect(() => {
    let cancelled = false;

    fetcher(params)
      .then((r) => {
        if (cancelled) return;
        setRes({ id: reqId, data: r.data, total: r.total, stats: r.stats, error: false });
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to load list:", err);
        setRes((s) => ({ ...s, id: reqId, error: true }));
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reqId]);

  const loading = res.id !== reqId;

  return {
    data: res.data,
    total: res.total,
    stats: res.stats,
    loading,
    error: !loading && res.error,
    reload: () => setReloadKey((k) => k + 1),
  };
}