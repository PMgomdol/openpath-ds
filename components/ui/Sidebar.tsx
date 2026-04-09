"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  Home,
  Palette,
  LayoutGrid,
  Coins,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

type NavItem = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: { label: string; href: string }[];
};

const navigation: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: <Home size={15} />,
  },
  {
    label: "Foundation",
    icon: <Palette size={15} />,
    children: [
      { label: "Color",        href: "/foundation/color" },
      { label: "Typography",   href: "/foundation/typography" },
      { label: "Spacing",      href: "/foundation/spacing" },
      { label: "Elevation",    href: "/foundation/elevation" },
      { label: "Iconography",  href: "/foundation/iconography" },
    ],
  },
  {
    label: "Components",
    icon: <LayoutGrid size={15} />,
    children: [
      { label: "Button",              href: "/components/button" },
      { label: "Input",               href: "/components/input" },
      { label: "Modal",               href: "/components/modal" },
      { label: "Chips",               href: "/components/chips" },
      { label: "Card",                href: "/components/card" },
      { label: "App Bar",             href: "/components/app-bar" },
      { label: "Bottom Navigation",   href: "/components/bottom-navigation" },
      { label: "Navigation Drawer",   href: "/components/navigation-drawer" },
      { label: "Tab",                 href: "/components/tab" },
      { label: "Menu",                href: "/components/menu" },
      { label: "Selection Controls",  href: "/components/selection-controls" },
      { label: "Snackbar",            href: "/components/snackbar" },
      { label: "Slider",              href: "/components/slider" },
      { label: "FAB",                 href: "/components/fab" },
      { label: "Banner",              href: "/components/banner" },
      { label: "List",                href: "/components/list" },
    ],
  },
  {
    label: "Tokens",
    href: "/tokens",
    icon: <Coins size={15} />,
  },
];

function NavGroup({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isChildActive = item.children?.some((c) => c.href === pathname) ?? false;
  const [open, setOpen] = useState(true); // 기본값 열림

  return (
    <li>
      <button
        onClick={() => setOpen((o) => !o)}
        className="
          w-full flex items-center justify-between
          px-3 py-1.5 rounded-md
          text-[12px] font-semibold uppercase tracking-widest
          text-[var(--color-text-secondary)]
          hover:text-[var(--color-text-primary)]
          transition-colors duration-100
          mt-4
        "
      >
        <span className="flex items-center gap-2">
          {item.icon}
          {item.label}
        </span>
        <ChevronDown
          size={12}
          className={clsx(
            "transition-transform duration-200",
            open ? "rotate-0" : "-rotate-90"
          )}
        />
      </button>

      {open && (
        <ul className="mt-0.5 space-y-0.5">
          {item.children?.map((child) => (
            <NavLink key={child.href} href={child.href} label={child.label} indent />
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
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
  indent?: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          "flex items-center gap-2 rounded-md text-[14px] transition-all duration-100",
          indent ? "pl-8 pr-3 py-1.5" : "px-3 py-1.5",
          isActive
            ? "bg-mint-20 text-mint-500 font-semibold dark:bg-mint-600/20 dark:text-mint-300"
            : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)]"
        )}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {label}
      </Link>
    </li>
  );
}

export default function Sidebar() {
  return (
    <nav
      className="
        fixed top-14 left-0 bottom-0
        w-[240px] overflow-y-auto
        sidebar-bg border-r border-[var(--color-border)]
        px-3 py-4
        hidden md:block
        transition-colors duration-200
      "
    >
      <ul className="space-y-0.5">
        {navigation.map((item) => {
          if (item.children) {
            return <NavGroup key={item.label} item={item} />;
          }
          return (
            <NavLink
              key={item.href}
              href={item.href!}
              label={item.label}
              icon={item.icon}
            />
          );
        })}
      </ul>

      <div className="mt-8 px-3">
        <div className="rounded-lg bg-mint-20 dark:bg-mint-600/10 p-3 border border-mint-100 dark:border-mint-600/30">
          <p className="text-[12px] font-semibold text-mint-500 dark:text-mint-300">
            OpenPath DS
          </p>
          <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">
            교육 브랜드 범용 디자인 시스템
          </p>
        </div>
      </div>
    </nav>
  );
}
