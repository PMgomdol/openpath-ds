"use client";

import { ReactNode, forwardRef, HTMLAttributes } from "react";

export type AppBarVariant = "center" | "small";

export interface AppBarAction {
  /** Icon element (24dp) */
  icon: ReactNode;
  /** Accessible label — required for icon-only buttons */
  label: string;
  onClick?: () => void;
}

export interface AppBarProps extends HTMLAttributes<HTMLElement> {
  /**
   * "center" — title centered (default, M3 Center-aligned App Bar)
   * "small"  — title left-aligned next to nav icon (M3 Small App Bar)
   */
  variant?: AppBarVariant;
  /** Bar title */
  title: string;
  /** Navigation icon (left zone). Typically ArrowLeft or Menu. */
  navigationIcon?: ReactNode;
  /** Accessible label for the navigation button */
  navigationLabel?: string;
  /** Callback for navigation button click */
  onNavigationClick?: () => void;
  /** Right-side action buttons. Max 3 per M3 spec. */
  actions?: AppBarAction[];
  /**
   * Scrolled state — when true, applies shadow/03 + bg/subtle.
   * Control this from parent via IntersectionObserver or onScroll.
   */
  scrolled?: boolean;
}

const AppBar = forwardRef<HTMLElement, AppBarProps>(
  (
    {
      variant = "center",
      title,
      navigationIcon,
      navigationLabel = "뒤로 가기",
      onNavigationClick,
      actions = [],
      scrolled = false,
      className = "",
      ...rest
    },
    ref
  ) => {
    const cls = [
      "op-app-bar",
      `op-app-bar--${variant}`,
      scrolled ? "op-app-bar--scrolled" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const navBtn = navigationIcon ? (
      <button
        type="button"
        className="op-app-bar__nav-btn"
        aria-label={navigationLabel}
        onClick={onNavigationClick}
      >
        <span aria-hidden="true">{navigationIcon}</span>
      </button>
    ) : null;

    const actionBtns = actions.slice(0, 3).map((action) => (
      <button
        key={action.label}
        type="button"
        className="op-app-bar__action-btn"
        aria-label={action.label}
        onClick={action.onClick}
      >
        <span aria-hidden="true">{action.icon}</span>
      </button>
    ));

    /* Center-aligned: 3-zone layout for perfect centering */
    if (variant === "center") {
      return (
        <header ref={ref} className={cls} {...rest}>
          <div className="op-app-bar__start">{navBtn}</div>
          <span className="op-app-bar__title">{title}</span>
          <div className="op-app-bar__end">{actionBtns}</div>
        </header>
      );
    }

    /* Small: nav + title(flex-1) + actions */
    return (
      <header ref={ref} className={cls} {...rest}>
        {navBtn}
        <span className="op-app-bar__title">{title}</span>
        <div className="op-app-bar__actions">{actionBtns}</div>
      </header>
    );
  }
);

AppBar.displayName = "AppBar";
export default AppBar;
