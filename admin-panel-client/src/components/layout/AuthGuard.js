"use client";
import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

const subscribe = () => () => {};

export default function AuthGuard({ children }) {
  const router = useRouter();

  // server render: undefined | browser: token value or null
  const token = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem("token"),
    () => undefined
  );

  useEffect(() => {
    if (token === null) router.replace("/login");
  }, [token, router]);

  // undefined = server render, null = no token (redirecting)
  if (!token) return null;
  return children;
}