"use client";

import { forwardRef, HTMLAttributes, useState } from "react";
import { Info, AlertTriangle, XCircle, CheckCircle, X } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────

export type BannerVariant = "info" | "warning" | "error" | "success";

export interface BannerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: BannerVariant;
  /** Bold title line */
  title: string;
  /** Optional body text */
  description?: string;
  /** Optional text-link action */
  actionLabel?: string;
  /** Called when action is clicked */
  onAction?: () => void;
  /**
   * Show dismiss (X) button. Default: true.
   * When dismissed, renders null — parent can control externally
   * via onDismiss + managing open state, or let Banner manage internally.
   */
  dismissible?: boolean;
  /** Called when close button is clicked (after internal state update) */
  onDismiss?: () => void;
}

// ── Icon map ───────────────────────────────────────────────────

const ICONS: Record<BannerVariant, React.ReactNode> = {
  info:    <Info    size={20} aria-hidden="true" />,
  warning: <AlertTriangle size={20} aria-hidden="true" />,
  error:   <XCircle size={20} aria-hidden="true" />,
  success: <CheckCircle  size={20} aria-hidden="true" />,
};

// ── Component ──────────────────────────────────────────────────

const Banner = forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      variant = "info",
      title,
      description,
      actionLabel,
      onAction,
      dismissible = true,
      onDismiss,
      className = "",
      ...rest
    },
    ref
  ) => {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    const handleDismiss = () => {
      setDismissed(true);
      onDismiss?.();
    };

    return (
      <div
        ref={ref}
        role="alert"
        aria-atomic="true"
        className={[
          "op-banner",
          `op-banner--${variant}`,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {/* Left accent icon */}
        <span className="op-banner__icon">{ICONS[variant]}</span>

        {/* Body */}
        <div className="op-banner__body">
          <p className="op-banner__title">{title}</p>
          {description && (
            <p className="op-banner__description">{description}</p>
          )}
          {actionLabel && (
            <button
              type="button"
              className="op-banner__action"
              onClick={onAction}
            >
              {actionLabel}
            </button>
          )}
        </div>

        {/* Dismiss */}
        {dismissible && (
          <button
            type="button"
            className="op-banner__close"
            aria-label="배너 닫기"
            onClick={handleDismiss}
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);

Banner.displayName = "Banner";
export default Banner;
