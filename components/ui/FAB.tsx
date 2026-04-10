"use client";

import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

export type FABSize = "sm" | "md" | "lg" | "extended";

export interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** FAB size variant. Default is "md" (Standard 56dp). */
  size?: FABSize;
  /** Icon element (required for non-extended). */
  icon: ReactNode;
  /** Label text — only visible in Extended FAB. */
  label?: string;
  /** Accessible label for icon-only FAB (sm/md/lg). Falls back to `label`. */
  "aria-label"?: string;
}

const FAB = forwardRef<HTMLButtonElement, FABProps>(
  ({ size = "md", icon, label, className = "", ...rest }, ref) => {
    const sizeClass = `op-fab--${size}`;

    return (
      <button
        ref={ref}
        type="button"
        className={`op-fab ${sizeClass} ${className}`}
        aria-label={rest["aria-label"] ?? (size !== "extended" ? label : undefined)}
        {...rest}
      >
        <span className="op-fab__icon" aria-hidden="true">
          {icon}
        </span>
        {size === "extended" && label && (
          <span className="op-fab__label">{label}</span>
        )}
      </button>
    );
  }
);

FAB.displayName = "FAB";
export default FAB;
