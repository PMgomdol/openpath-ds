"use client";

import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

// ─── Types ────────────────────────────────────────────────────

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
  /**
   * Required accessible label — describes the action to screen readers.
   * Must be set for every icon-only button. No exceptions.
   *
   * @example aria-label="닫기"  aria-label="메뉴 열기"
   */
  "aria-label": string;
  /** Icon element (18-24px recommended) */
  children: ReactNode;
  /** Visual tap target size. Defaults to "md" (40px). Touch area is always ≥ 48px. */
  size?: "sm" | "md" | "lg";
}

// ─── Component ────────────────────────────────────────────────

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, disabled, size = "md", className = "", ...rest }, ref) => (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={["op-icon-btn", `op-icon-btn--${size}`, className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </button>
  )
);

IconButton.displayName = "IconButton";
export default IconButton;
