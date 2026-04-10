"use client";

import { ReactNode, forwardRef } from "react";

export interface BottomNavItem {
  /** Unique key for this item */
  key: string;
  /** Icon element (24dp) */
  icon: ReactNode;
  /** Label text (type/label/md — 12sp) */
  label: string;
  /** Badge count — omit or 0 to hide */
  badge?: number;
}

export interface BottomNavigationProps {
  items: BottomNavItem[];
  /** Key of the currently active item */
  activeKey: string;
  /** Called when the user taps a tab */
  onChange: (key: string) => void;
  /** Accessible label for the nav landmark */
  "aria-label"?: string;
  className?: string;
}

const BottomNavigation = forwardRef<HTMLElement, BottomNavigationProps>(
  ({ items, activeKey, onChange, className = "", ...rest }, ref) => {
    return (
      <nav
        ref={ref}
        className={`op-bottom-nav ${className}`}
        aria-label={rest["aria-label"] ?? "하단 내비게이션"}
        role="navigation"
      >
        <div role="tablist" className="contents">
          {items.map((item) => {
            const isActive = item.key === activeKey;
            return (
              <button
                key={item.key}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-label={item.label}
                onClick={() => onChange(item.key)}
                className={`op-bottom-nav__item${isActive ? " op-bottom-nav__item--active" : ""}`}
              >
                {/* M3 Active Indicator — 64×32dp pill */}
                <span className="op-bottom-nav__indicator" aria-hidden="true" />

                {/* Icon */}
                <span className="op-bottom-nav__icon" aria-hidden="true">
                  {item.icon}
                </span>

                {/* Badge */}
                {item.badge != null && item.badge > 0 && (
                  <span className="op-bottom-nav__badge" aria-label={`${item.badge}개 알림`}>
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}

                {/* Label */}
                <span className="op-bottom-nav__label">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }
);

BottomNavigation.displayName = "BottomNavigation";
export default BottomNavigation;
