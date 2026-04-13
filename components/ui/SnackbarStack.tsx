"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useSnackbar, type SnackbarItem } from "./SnackbarContext";

/* ─────────────────────────── Single item ───────────────────── */

function SnackbarItemView({
  item,
  onDismiss,
}: {
  item: SnackbarItem;
  onDismiss: () => void;
}) {
  const duration = item.duration ?? 4000;

  useEffect(() => {
    if (duration === 0) return;
    const t = setTimeout(onDismiss, duration);
    return () => clearTimeout(t);
  }, [duration, onDismiss]);

  return (
    <div
      role="status"
      aria-atomic="true"
      className="op-snackbar"
    >
      <span className="op-snackbar__message">{item.message}</span>

      {item.variant === "action" && (
        <button
          type="button"
          className="op-snackbar__action"
          onClick={() => {
            item.onAction?.();
            onDismiss();
          }}
        >
          {item.actionLabel ?? "실행취소"}
        </button>
      )}

      {item.variant === "close" && (
        <button
          type="button"
          className="op-snackbar__close"
          aria-label="닫기"
          onClick={onDismiss}
        >
          <X size={18} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────── Stack ─────────────────────────── */

/**
 * Renders the global Snackbar queue at `position: fixed` bottom-center.
 * Drop this once inside <SnackbarProvider> (e.g. in Providers.tsx).
 * The outer region div is always in the DOM so `aria-live` is pre-registered.
 */
export default function SnackbarStack() {
  const { items, dismiss } = useSnackbar();

  return (
    <div
      className="op-snackbar-region"
      aria-live="polite"
      aria-atomic="false"
    >
      {items.map((item) => (
        <SnackbarItemView
          key={item.id}
          item={item}
          onDismiss={() => dismiss(item.id)}
        />
      ))}
    </div>
  );
}
