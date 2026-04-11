"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  Home,
  Palette,
  LayoutGrid,
  BookOpen,
  ChevronDown,
  X,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useSidebar } from "./SidebarContext";

type NavChild = { label: string; href: string };

type NavItem =
  | { kind: "link"; label: string; href: string; icon: React.ReactNode }
  | { kind: "group"; label: string; icon: React.ReactNode; children: NavChild[] };

const navigation: NavItem[] = [
  {
    kind: "link",
    label: "Home",
    href: "/",
    icon: <Home size={15} />,
  },

  // ── STYLE — 시각 요소 ────────────────────────────────────────
  {
    kind: "group",
    label: "Style",
    icon: <Palette size={15} />,
    children: [
      { label: "Color",       href: "/foundation/color" },
      { label: "Typography",  href: "/foundation/typography" },
      { label: "Spacing",     href: "/foundation/spacing" },
      { label: "Shape",       href: "/style/shape" },
      { label: "Elevation",   href: "/foundation/elevation" },
      { label: "Iconography", href: "/foundation/iconography" },
    ],
  },

  // ── FOUNDATION — 환경·원칙·기반 ──────────────────────────────
  {
    kind: "group",
    label: "Foundation",
    icon: <BookOpen size={15} />,
    children: [
      { label: "Environment",  href: "/foundation/environment" },
      { label: "Principles",   href: "/foundation/principles" },
      { label: "Naming",       href: "/foundation/naming" },
      { label: "Design Token", href: "/foundation/design-token" },
      { label: "Accessibility",href: "/foundation/accessibility" },
      { label: "Motion",       href: "/foundation/motion" },
    ],
  },

  // ── COMPONENTS ───────────────────────────────────────────────
  {
    kind: "group",
    label: "Components",
    icon: <LayoutGrid size={15} />,
    children: [
      { label: "Button",             href: "/components/button" },
      { label: "Input",              href: "/components/input" },
      { label: "Modal",              href: "/components/modal" },
      { label: "Chips",              href: "/components/chips" },
      { label: "Card",               href: "/components/card" },
      { label: "App Bar",            href: "/components/app-bar" },
      { label: "Bottom Navigation",  href: "/components/bottom-navigation" },
      { label: "Navigation Drawer",  href: "/components/navigation-drawer" },
      { label: "Tab",                href: "/components/tab" },
      { label: "Menu",               href: "/components/menu" },
      { label: "Selection Controls", href: "/components/selection-controls" },
      { label: "Snackbar",           href: "/components/snackbar" },
      { label: "Slider",             href: "/components/slider" },
      { label: "FAB",                href: "/components/fab" },
      { label: "Banner",             href: "/components/banner" },
      { label: "List",               href: "/components/list" },
    ],
  },
];

// ── Category header colours ───────────────────────────────────
const GROUP_ACCENT: Record<string, string> = {
  Style:      "text-[var(--color-brand-primary)]",
  Foundation: "text-[var(--color-category-foundation)]",
  Components: "text-[var(--color-text-subtle)]",
};

function NavGroup({
  item,
  onLinkClick,
}: {
  item: Extract<NavItem, { kind: "group" }>;
  onLinkClick?: () => void;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  return (
    <li>
      <button
        onClick={() => setOpen((o) => !o)}
        className={clsx(
          "w-full flex items-center justify-between",
          "px-3 py-1.5 rounded-md",
          "text-[11px] font-bold uppercase tracking-widest",
          "transition-colors duration-100 mt-5",
          GROUP_ACCENT[item.label] ?? "text-[var(--color-text-subtle)]",
          "hover:opacity-80"
        )}
      >
        <span className="flex items-center gap-2">
          {item.icon}
          {item.label}
        </span>
        <ChevronDown
          size={11}
          className={clsx(
            "transition-transform duration-200",
            open ? "rotate-0" : "-rotate-90"
          )}
        />
      </button>

      {open && (
        <ul className="mt-0.5 space-y-0.5">
          {item.children.map((child) => (
            <NavLink
              key={child.href}
              href={child.href}
              label={child.label}
              indent
              onClick={onLinkClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function NavLink({
  href,
  label,
  icon,
  indent,
  onClick,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
  indent?: boolean;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={clsx(
          "flex items-center gap-2 rounded-md text-[13px] transition-all duration-100",
          indent ? "pl-7 pr-3 py-1.5" : "px-3 py-1.5",
          isActive
            ? "bg-[var(--color-bg-brand)] text-[var(--color-brand-primary)] font-semibold"
            : "text-[var(--color-text-subtle)] hover:text-[var(--color-text-default)] hover:bg-[var(--color-bg-subtle)]"
        )}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {label}
      </Link>
    </li>
  );
}

function NavContent({ onLinkClick }: { onLinkClick?: () => void }) {
  return (
    <>
      <ul className="space-y-0.5">
        {navigation.map((item) => {
          if (item.kind === "group") {
            return (
              <NavGroup key={item.label} item={item} onLinkClick={onLinkClick} />
            );
          }
          return (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              onClick={onLinkClick}
            />
          );
        })}
      </ul>

      <div className="mt-8 px-2">
        <div className="rounded-lg bg-[var(--color-bg-brand)] p-3 border border-[var(--color-border-brand)]/30">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)]">
            OpenPath DS
          </p>
          <p className="text-[11px] text-[var(--color-text-subtle)] mt-0.5">
            교육 브랜드 범용 디자인 시스템
          </p>
        </div>
      </div>
    </>
  );
}

function DesktopSidebar() {
  return (
    <nav
      aria-label="디자인 시스템 내비게이션"
      className="
        fixed top-14 left-0 bottom-0
        w-[220px] overflow-y-auto
        sidebar-bg border-r border-[var(--color-border)]
        px-2 py-4
        hidden md:block
        transition-colors duration-200
      "
    >
      <NavContent />
    </nav>
  );
}

function MobileSidebar() {
  const { open, close } = useSidebar();
  const pathname = usePathname();

  // 라우트 변경 시 자동 닫힘
  useEffect(() => {
    close();
  }, [pathname, close]);

  // ESC 키 닫힘
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, close]);

  // 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Scrim */}
      <div
        aria-hidden="true"
        onClick={close}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 55,
          background: "var(--color-scrim)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: `opacity 300ms var(--motion-standard)`,
        }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="내비게이션"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 60,
          width: 280,
          display: "flex",
          flexDirection: "column",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: open
            ? `transform 300ms var(--motion-decelerate)`
            : `transform 300ms var(--motion-accelerate)`,
        }}
        className="sidebar-bg border-r border-[var(--color-border)] md:hidden"
      >
        {/* Panel header */}
        <div
          className="
            flex items-center justify-between
            h-14 px-4 shrink-0
            border-b border-[var(--color-border)]
          "
        >
          <span className="flex items-baseline gap-1.5">
            <span className="text-[15px] font-bold text-[var(--color-text-default)]">
              OpenPath
            </span>
            <span className="text-[13px] font-medium text-[var(--color-brand-primary)] tracking-wide">
              DS
            </span>
          </span>

          <button
            type="button"
            onClick={close}
            aria-label="내비게이션 닫기"
            style={{ position: "relative" }}
            className="
              flex items-center justify-center
              w-9 h-9 rounded-md
              text-[var(--color-text-subtle)]
              hover:bg-[var(--color-bg-subtle)]
              hover:text-[var(--color-text-default)]
              transition-colors duration-100
            "
          >
            {/* 48dp touch target */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: -6,
              }}
            />
            <X size={20} />
          </button>
        </div>

        {/* Nav content */}
        <div className="flex-1 overflow-y-auto px-2 py-4">
          <NavContent onLinkClick={close} />
        </div>
      </div>
    </>
  );
}

export default function Sidebar() {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
}
