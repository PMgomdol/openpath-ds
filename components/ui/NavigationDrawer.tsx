"use client";

import {
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  HTMLAttributes,
} from "react";

export interface DrawerItem {
  key: string;
  label: string;
  /** Icon element (24dp) */
  icon?: ReactNode;
  disabled?: boolean;
}

export interface DrawerSection {
  /** Optional section heading */
  title?: string;
  items: DrawerItem[];
}

export type DrawerVariant = "modal" | "standard";

export interface NavigationDrawerProps
  extends Omit<HTMLAttributes<HTMLElement>, "onAnimationStart"> {
  /**
   * "modal"    — fixed overlay with scrim, slides in with --motion-decelerate
   * "standard" — flex sibling, collapses via width with --motion-decelerate
   */
  variant?: DrawerVariant;
  /** Controls open / closed state */
  open: boolean;
  /**
   * Called when the scrim is clicked or ESC is pressed.
   * Required for modal variant to be closable.
   */
  onClose?: () => void;
  sections: DrawerSection[];
  activeKey: string;
  onItemClick: (key: string) => void;
  /** Optional slot rendered above nav items (e.g. brand header) */
  header?: ReactNode;
}

const NavigationDrawer = forwardRef<HTMLElement, NavigationDrawerProps>(
  (
    {
      variant = "modal",
      open,
      onClose,
      sections,
      activeKey,
      onItemClick,
      header,
      className = "",
      "aria-label": ariaLabel = "내비게이션",
      ...rest
    },
    ref
  ) => {
    const firstItemRef = useRef<HTMLButtonElement>(null);

    /* ── ESC key to close modal ──────────────────────── */
    useEffect(() => {
      if (variant !== "modal") return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose?.();
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [variant, onClose]);

    /* ── Auto-focus first item on modal open ─────────── */
    useEffect(() => {
      if (variant !== "modal" || !open) return;
      const t = setTimeout(() => firstItemRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }, [variant, open]);

    /* ── Body scroll-lock (modal only) ───────────────── */
    useEffect(() => {
      if (variant !== "modal") return;
      document.body.style.overflow = open ? "hidden" : "";
      return () => { document.body.style.overflow = ""; };
    }, [variant, open]);

    /* ── Shared nav content ───────────────────────────── */
    const navContent = (
      <>
        {header && <div className="op-drawer__header">{header}</div>}
        <div className="op-drawer__body">
          {sections.map((section, si) => (
            <div
              key={`section-${si}`}
              role="group"
              aria-label={section.title}
            >
              {section.title && (
                <p className="op-drawer__section-label">{section.title}</p>
              )}
              {section.items.map((item, ii) => {
                const isActive = item.key === activeKey;
                const isFirstItem = si === 0 && ii === 0;
                return (
                  <button
                    key={item.key}
                    ref={isFirstItem ? firstItemRef : undefined}
                    type="button"
                    aria-current={isActive ? "page" : undefined}
                    disabled={item.disabled}
                    className={[
                      "op-drawer__item",
                      isActive ? "op-drawer__item--active" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => {
                      if (!item.disabled) {
                        onItemClick(item.key);
                        if (variant === "modal") onClose?.();
                      }
                    }}
                  >
                    {item.icon && (
                      <span className="op-drawer__icon" aria-hidden="true">
                        {item.icon}
                      </span>
                    )}
                    <span className="op-drawer__label">{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </>
    );

    /* ── Standard: flex-sibling width-collapse ─────────── */
    if (variant === "standard") {
      return (
        /* Outer: overflow-hidden + width transition */
        <div
          className={[
            "op-drawer-standard-wrap",
            open ? "op-drawer-standard-wrap--open" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <nav
            ref={ref}
            role="navigation"
            aria-label={ariaLabel}
            className={["op-drawer op-drawer--standard", className]
              .filter(Boolean)
              .join(" ")}
            {...rest}
          >
            {navContent}
          </nav>
        </div>
      );
    }

    /* ── Modal: fixed overlay + scrim ──────────────────── */
    return (
      <>
        {/* Scrim — rgba(21,27,30,0.40) per spec */}
        <div
          className={[
            "op-drawer-scrim",
            open ? "op-drawer-scrim--open" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-hidden="true"
          onClick={onClose}
        />

        {/* Drawer panel — role=dialog + role=navigation inside */}
        <div
          className={[
            "op-drawer op-drawer--modal",
            open ? "op-drawer--open" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          role="dialog"
          aria-modal={open}
          aria-label={ariaLabel}
          aria-hidden={!open}
        >
          <nav
            ref={ref}
            role="navigation"
            aria-label={ariaLabel}
            className="op-drawer__nav"
            {...rest}
          >
            {navContent}
          </nav>
        </div>
      </>
    );
  }
);

NavigationDrawer.displayName = "NavigationDrawer";
export default NavigationDrawer;
