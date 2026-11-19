"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

/**
 * Opens a form or drawer from the URL, then removes the query
 * so that a refresh does not open it again.
 *   ?new=1      -> onNew()
 *   ?edit=<id>  -> onEdit(id)
 *   ?view=<id>  -> onView(id)
 * It must be rendered inside <Suspense>.
 */
export default function DeepLink({ onNew, onEdit, onView }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const isNew = params.get("new");
  const edit = params.get("edit");
  const view = params.get("view");

  const latest = useRef({ onNew, onEdit, onView });
  useEffect(() => {
    latest.current = { onNew, onEdit, onView };
  });

  // prevents a double run (React Strict Mode in development)
  const handled = useRef("");

  useEffect(() => {
    const key = isNew ? "new" : edit ? `edit:${edit}` : view ? `view:${view}` : "";

    if (!key) {
      handled.current = "";
      return;
    }
    if (handled.current === key) return;
    handled.current = key;

    const clean = () => router.replace(pathname);

    if (isNew) {
      latest.current.onNew?.();
      clean();
      return;
    }

    const action = edit ? latest.current.onEdit : latest.current.onView;
    const id = edit || view;

    Promise.resolve(action?.(id))
      .catch(() => toast.error("This item no longer exists"))
      .finally(clean);
  }, [isNew, edit, view, pathname, router]);

  return null;
}