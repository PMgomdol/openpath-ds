"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { SnackbarVariant } from "./Snackbar";

/* ─────────────────────────── Types ─────────────────────────── */

export interface SnackbarItem {
  id: string;
  message: string;
  variant?: SnackbarVariant;
  actionLabel?: string;
  onAction?: () => void;
  /** Auto-dismiss ms. Default 4000. Set 0 for no auto-dismiss. */
  duration?: number;
}

export type ShowSnackbarOptions = Omit<SnackbarItem, "id">;

interface SnackbarContextValue {
  items: SnackbarItem[];
  show: (options: ShowSnackbarOptions) => string;
  dismiss: (id: string) => void;
}

/* ─────────────────────────── Context ───────────────────────── */

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

/* ─────────────────────────── Provider ──────────────────────── */

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<SnackbarItem[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const show = useCallback((options: ShowSnackbarOptions): string => {
    const id = `sb-${Date.now()}-${++counter.current}`;
    setItems((prev) => [...prev, { ...options, id }]);
    return id;
  }, []);

  return (
    <SnackbarContext.Provider value={{ items, show, dismiss }}>
      {children}
    </SnackbarContext.Provider>
  );
}

/* ─────────────────────────── Hook ──────────────────────────── */

export function useSnackbar(): SnackbarContextValue {
  const ctx = useContext(SnackbarContext);
  if (!ctx) {
    throw new Error("useSnackbar must be used within <SnackbarProvider>");
  }
  return ctx;
}
