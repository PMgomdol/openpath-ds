"use client";

import {
  ReactNode,
  forwardRef,
  HTMLAttributes,
  KeyboardEvent,
  useRef,
} from "react";

// ── Types ──────────────────────────────────────────────────

export interface MenuItem {
  key: string;
  label: string;
  /** Icon element (20dp) */
  icon?: ReactNode;
  /** Keyboard shortcut hint (visual only) */
  shortcut?: string;
  /** Renders label + icon in color/status/error */
  destructive?: boolean;
  disabled?: boolean;
}

export interface MenuDivider {
  divider: true;
  key: string;
}

export type MenuEntry = MenuItem | MenuDivider;

function isDivider(entry: MenuEntry): entry is MenuDivider {
  return "divider" in entry && (entry as MenuDivider).divider === true;
}

export interface MenuProps extends HTMLAttributes<HTMLUListElement> {
  items: MenuEntry[];
  /** Called with item key when a non-disabled, non-destructive item is activated */
  onAction?: (key: string) => void;
  /** Called after any activation (item click or ESC) — use to close the menu */
  onClose?: () => void;
}

// ── Component ──────────────────────────────────────────────

const Menu = forwardRef<HTMLUListElement, MenuProps>(
  ({ items, onAction, onClose, className = "", ...rest }, ref) => {
    /** Only non-divider button refs for arrow-key navigation */
    const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
      const focusable = (btnRefs.current.filter(Boolean) as HTMLButtonElement[]).filter(
        (el) => !el.disabled
      );
      const idx = focusable.findIndex((el) => el === document.activeElement);

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          focusable[(idx + 1) % focusable.length]?.focus();
          break;
        case "ArrowUp":
          e.preventDefault();
          focusable[(idx - 1 + focusable.length) % focusable.length]?.focus();
          break;
        case "Home":
          e.preventDefault();
          focusable[0]?.focus();
          break;
        case "End":
          e.preventDefault();
          focusable[focusable.length - 1]?.focus();
          break;
        case "Escape":
          e.preventDefault();
          onClose?.();
          break;
        case "Tab":
          onClose?.();
          break;
      }
    };

    // btnIndex increments only for non-divider entries so ref positions are stable
    let btnIdx = -1;

    return (
      <ul
        ref={ref}
        role="menu"
        className={`op-menu ${className}`}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {items.map((entry) => {
          if (isDivider(entry)) {
            return (
              <li
                key={entry.key}
                role="separator"
                className="op-menu__divider"
              />
            );
          }

          const i = ++btnIdx;

          return (
            <li key={entry.key} role="none">
              <button
                ref={(el) => {
                  btnRefs.current[i] = el;
                }}
                role="menuitem"
                type="button"
                disabled={entry.disabled}
                aria-disabled={entry.disabled}
                className={[
                  "op-menu__item",
                  entry.destructive ? "op-menu__item--destructive" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => {
                  if (!entry.disabled) {
                    onAction?.(entry.key);
                    onClose?.();
                  }
                }}
              >
                {entry.icon && (
                  <span className="op-menu__icon" aria-hidden="true">
                    {entry.icon}
                  </span>
                )}
                <span className="op-menu__label">{entry.label}</span>
                {entry.shortcut && (
                  <span className="op-menu__shortcut" aria-hidden="true">
                    {entry.shortcut}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
);

Menu.displayName = "Menu";
export default Menu;
