"use client";

import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { Check } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────

export type ListVariant = "single" | "two" | "three";

export type ListLeading =
  | { type: "icon";     node: ReactNode }
  | { type: "avatar";   text: string }
  | { type: "checkbox"; checked: boolean }
  | { type: "radio";    checked: boolean };

export type ListTrailing =
  | { type: "icon";   node: ReactNode }
  | { type: "text";   text: string }
  | { type: "switch"; on: boolean; onToggle: (next: boolean) => void; label?: string };

export interface ListItemProps extends Omit<HTMLAttributes<HTMLLIElement>, "onClick"> {
  onClick?: () => void;
  /** Row height variant */
  variant?: ListVariant;
  /** Primary (title) text */
  primary: string;
  /** Secondary text — shown in two/three variants */
  secondary?: string;
  /** Selected / active state */
  selected?: boolean;
  disabled?: boolean;
  /** Show divider below this item */
  divider?: boolean;
  /** Leading element — icon / avatar / checkbox / radio */
  leading?: ListLeading;
  /** Trailing element — icon / text / switch */
  trailing?: ListTrailing;
}

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode;
}

// ── List container ─────────────────────────────────────────────

export const List = forwardRef<HTMLUListElement, ListProps>(
  ({ children, className = "", ...rest }, ref) => (
    <ul
      ref={ref}
      role="list"
      className={["op-list", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </ul>
  )
);
List.displayName = "List";

// ── Internal helpers ───────────────────────────────────────────

function LeadingNode({
  leading,
  selected,
  disabled,
}: {
  leading: ListLeading;
  selected: boolean;
  disabled: boolean;
}) {
  switch (leading.type) {
    case "icon":
      return (
        <span
          className={[
            "op-list__leading-icon",
            selected && !disabled ? "op-list__leading-icon--selected" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-hidden="true"
        >
          {leading.node}
        </span>
      );
    case "avatar":
      return (
        <span
          className={[
            "op-list__avatar",
            selected && !disabled ? "op-list__avatar--selected" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-hidden="true"
        >
          {leading.text}
        </span>
      );
    case "checkbox":
      return (
        <span
          className={[
            "op-list__checkbox",
            leading.checked ? "op-list__checkbox--checked" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-hidden="true"
        >
          {leading.checked && <Check size={12} strokeWidth={3} />}
        </span>
      );
    case "radio":
      return (
        <span
          className={[
            "op-list__radio",
            leading.checked ? "op-list__radio--checked" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-hidden="true"
        >
          {leading.checked && <span className="op-list__radio-dot" />}
        </span>
      );
  }
}

function TrailingNode({
  trailing,
  disabled,
}: {
  trailing: ListTrailing;
  disabled: boolean;
}) {
  switch (trailing.type) {
    case "icon":
      return (
        <span className="op-list__trailing-icon" aria-hidden="true">
          {trailing.node}
        </span>
      );
    case "text":
      return <span className="op-list__trailing-text">{trailing.text}</span>;
    case "switch":
      return (
        <button
          type="button"
          role="switch"
          aria-checked={trailing.on}
          aria-label={trailing.label ?? "토글"}
          disabled={disabled}
          className={[
            "op-list__switch",
            trailing.on ? "op-list__switch--on" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={(e) => {
            e.stopPropagation();
            trailing.onToggle(!trailing.on);
          }}
        >
          <span className="op-list__switch-thumb" />
        </button>
      );
  }
}

// ── ListItem ───────────────────────────────────────────────────

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      variant = "single",
      primary,
      secondary,
      selected = false,
      disabled = false,
      divider = false,
      leading,
      trailing,
      onClick,
      className = "",
      ...rest
    },
    ref
  ) => {
    const isInteractive = !!onClick && !disabled;

    // Derive ARIA role based on leading type
    const rowRole =
      leading?.type === "checkbox"
        ? "checkbox"
        : leading?.type === "radio"
        ? "radio"
        : undefined;

    const ariaChecked =
      leading?.type === "checkbox" || leading?.type === "radio"
        ? leading.checked
        : undefined;

    const rowClass = [
      "op-list__row",
      `op-list__row--${variant}`,
      selected ? "op-list__row--selected" : "",
      disabled ? "op-list__row--disabled" : "",
      isInteractive ? "op-list__row--interactive" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const inner = (
      <>
        {leading && (
          <div className="op-list__leading">
            <LeadingNode leading={leading} selected={selected} disabled={disabled} />
          </div>
        )}

        <div className="op-list__content">
          <span
            className={[
              "op-list__primary",
              selected && !disabled ? "op-list__primary--selected" : "",
              disabled ? "op-list__primary--disabled" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {primary}
          </span>
          {secondary && variant !== "single" && (
            <span
              className={[
                "op-list__secondary",
                variant === "three" ? "op-list__secondary--clamp" : "",
                disabled ? "op-list__secondary--disabled" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {secondary}
            </span>
          )}
        </div>

        {trailing && (
          <div className="op-list__trailing">
            <TrailingNode trailing={trailing} disabled={disabled} />
          </div>
        )}
      </>
    );

    const row = isInteractive ? (
      <button
        type="button"
        role={rowRole}
        aria-checked={ariaChecked}
        aria-selected={!rowRole ? selected : undefined}
        disabled={disabled}
        onClick={onClick}
        className={rowClass}
      >
        {inner}
      </button>
    ) : (
      <div
        role={rowRole ?? (selected !== undefined ? "option" : undefined)}
        aria-checked={ariaChecked}
        aria-selected={!rowRole ? selected : undefined}
        className={rowClass}
      >
        {inner}
      </div>
    );

    return (
      <li
        ref={ref}
        className={["op-list__item", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {row}
        {divider && (
          <div className="op-list__divider" aria-hidden="true" />
        )}
      </li>
    );
  }
);

ListItem.displayName = "ListItem";
export default ListItem;
