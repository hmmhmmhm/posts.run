"use client";
import { useEffect } from "react";

export function ClientProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    import("share-api-polyfill");
  }, []);

  return <>{children}</>;
}
