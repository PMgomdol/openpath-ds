"use client";

import {
  ReactNode,
  forwardRef,
  HTMLAttributes,
  useRef,
  KeyboardEvent,
} from "react";

export type TabVariant = "primary" | "secondary";

export interface TabItem {
  key: string;
  label: string;
  /** Optional icon (20dp). Rendered before the label. */
  icon?: ReactNode;
  /** Optional count badge */
  badge?: number | string;
  disabled?: boolean;
}

export interface TabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * "primary"   — bottom indicator line (default). Main content switching.
   * "secondary" — pill background. Sub-category / filter switching.
   */
  variant?: TabVariant;
  items: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      variant = "primary",
      items,
      activeKey,
      onChange,
      className = "",
      ...rest
    },
    ref
  ) => {
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    /** Arrow-key navigation per ARIA Authoring Practices tablist pattern */
    const handleKeyDown = (
      e: KeyboardEvent<HTMLButtonElement>,
      currentIndex: number
    ) => {
      const enabledIndices = items
        .map((item, i) => (!item.disabled ? i : null))
        .filter((i): i is number => i !== null);

      const posInEnabled = enabledIndices.indexOf(currentIndex);
      let targetIndex: number | undefined;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          targetIndex =
            enabledIndices[(posInEnabled + 1) % enabledIndices.length];
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          targetIndex =
            enabledIndices[
              (posInEnabled - 1 + enabledIndices.length) %
                enabledIndices.length
            ];
          break;
        case "Home":
          e.preventDefault();
          targetIndex = enabledIndices[0];
          break;
        case "End":
          e.preventDefault();
          targetIndex = enabledIndices[enabledIndices.length - 1];
          break;
      }

      if (targetIndex !== undefined) {
        tabRefs.current[targetIndex]?.focus();
        onChange(items[targetIndex].key);
      }
    };

    return (
      <div
        ref={ref}
        role="tablist"
        className={`op-tabs op-tabs--${variant} ${className}`}
        {...rest}
      >
        {items.map((item, i) => {
          const isActive = item.key === activeKey;

          return (
            <button
              key={item.key}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              type="button"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              className="op-tab"
              onClick={() => {
                if (!item.disabled) onChange(item.key);
              }}
              onKeyDown={(e) => handleKeyDown(e, i)}
            >
              {item.icon && (
                <span className="op-tab__icon" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <span className="op-tab__label">{item.label}</span>
              {item.badge != null && (
                <span
                  className="op-tab__badge"
                  aria-label={`${item.badge}개`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }
);

Tabs.displayName = "Tabs";
export default Tabs;
