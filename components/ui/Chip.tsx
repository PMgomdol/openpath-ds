"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { Check, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────

export type ChipType = "assist" | "filter" | "input" | "suggestion";

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /**
   * Chip variant:
   * - `assist`     — action shortcut, optional leading icon
   * - `filter`     — toggleable filter; shows checkmark when selected
   * - `input`      — removable tag; renders as `<span>` with X button
   * - `suggestion` — system-suggested option (same visual as assist)
   */
  chipType?: ChipType;
  /** Chip label */
  label: string;
  /** Leading icon (18px). Ignored when type=filter in selected state (checkmark takes priority). */
  icon?: ReactNode;
  // ── Filter props ──
  /** Filter chip: selected state */
  selected?: boolean;
  /** Filter chip: called on click */
  onToggle?: () => void;
  // ── Input props ──
  /** Input chip: called when X is clicked */
  onRemove?: () => void;
  /** Input chip: accessible label for the X button (defaults to "{label} 제거") */
  removeLabel?: string;
}

// ─── Component ────────────────────────────────────────────────

export default function Chip({
  chipType = "assist",
  label,
  icon,
  selected = false,
  onToggle,
  onRemove,
  removeLabel,
  disabled,
  className = "",
  ...rest
}: ChipProps) {
  const base = `op-chip ${className}`;

  // ── Input chip ── rendered as <span> since it's not a button
  if (chipType === "input") {
    return (
      <span className={`${base} op-chip--input`} aria-label={label}>
        {icon && <span className="op-chip__icon" aria-hidden="true">{icon}</span>}
        <span>{label}</span>
        <button
          type="button"
          className="op-chip__remove"
          onClick={onRemove}
          aria-label={removeLabel ?? `${label} 제거`}
          tabIndex={0}
        >
          <X size={14} strokeWidth={2.5} />
        </button>
      </span>
    );
  }

  // ── Filter chip ──
  if (chipType === "filter") {
    return (
      <button
        type="button"
        className={`${base} op-chip--filter`}
        aria-pressed={selected}
        disabled={disabled}
        onClick={onToggle}
        {...rest}
      >
        {selected
          ? <span className="op-chip__icon" aria-hidden="true"><Check size={16} strokeWidth={2.5} /></span>
          : icon && <span className="op-chip__icon" aria-hidden="true">{icon}</span>
        }
        <span>{label}</span>
      </button>
    );
  }

  // ── Assist / Suggestion ──
  return (
    <button
      type="button"
      className={base}
      disabled={disabled}
      {...rest}
    >
      {icon && <span className="op-chip__icon" aria-hidden="true">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
