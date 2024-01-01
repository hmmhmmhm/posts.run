"use client";
import { useScreenSize } from "@/lib/hook/screen";
import { useEffect } from "react";

export function ClientProvider({ children }: { children: React.ReactNode }) {
  useScreenSize();
  useEffect(() => {
    import("share-api-polyfill");
  }, []);

  return <>{children}</>;
}
