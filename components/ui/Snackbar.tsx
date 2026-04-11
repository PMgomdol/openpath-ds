"use client";

import { forwardRef, HTMLAttributes, useEffect } from "react";
import { X } from "lucide-react";

export type SnackbarVariant = "text" | "action" | "close";

export interface SnackbarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Controls visibility */
  open: boolean;
  /** Notification message */
  message: string;
  /**
   * "text"   — message only (default)
   * "action" — message + text action button
   * "close"  — message + X close button
   */
  variant?: SnackbarVariant;
  /** Action button label. Only used when variant="action". Default: "실행취소" */
  actionLabel?: string;
  /** Called when the action button is clicked */
  onAction?: () => void;
  /**
   * Called when the auto-timer fires or the close/action button is pressed.
   * Required — consumer must set open=false here.
   */
  onClose: () => void;
  /**
   * Auto-dismiss delay in ms. Default 4000.
   * Set to 0 to disable auto-dismiss (only valid for "close" variant).
   */
  duration?: number;
}

const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  (
    {
      open,
      message,
      variant = "text",
      actionLabel = "실행취소",
      onAction,
      onClose,
      duration = 4000,
      className = "",
      ...rest
    },
    ref
  ) => {
    /*
     * Auto-dismiss timer.
     * Resets whenever the message changes (new toast) or open flips.
     */
    useEffect(() => {
      if (!open || duration === 0) return;
      const t = setTimeout(onClose, duration);
      return () => clearTimeout(t);
    }, [open, message, duration, onClose]);

    /*
     * The outer region div is *always* in the DOM so the aria-live region
     * is registered with assistive technology before any announcement occurs.
     * When content appears inside it, screen readers announce the message.
     */
    return (
      <div
        className="op-snackbar-region"
        aria-live="polite"
        aria-atomic="true"
      >
        {open && (
          <div
            ref={ref}
            role="status"
            className={["op-snackbar", className].filter(Boolean).join(" ")}
            {...rest}
          >
            <span className="op-snackbar__message">{message}</span>

            {variant === "action" && (
              <button
                type="button"
                className="op-snackbar__action"
                onClick={() => {
                  onAction?.();
                  onClose();
                }}
              >
                {actionLabel}
              </button>
            )}

            {variant === "close" && (
              <button
                type="button"
                className="op-snackbar__close"
                aria-label="닫기"
                onClick={onClose}
              >
                <X size={18} aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

Snackbar.displayName = "Snackbar";
export default Snackbar;
