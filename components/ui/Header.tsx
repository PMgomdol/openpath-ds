"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useSidebar } from "./SidebarContext";

export default function Header() {
  const { toggle } = useSidebar();

  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-50
        h-14 px-4 md:px-6
        flex items-center justify-between
        header-bg backdrop-blur-md
        border-b border-[var(--color-border)]
        transition-colors duration-200
      "
    >
      {/* Left — hamburger (mobile) + logo */}
      <div className="flex items-center gap-2">
        {/* Hamburger — md 미만에서만 표시 */}
        <button
          type="button"
          onClick={toggle}
          aria-label="내비게이션 열기"
          className="
            md:hidden
            flex items-center justify-center
            w-9 h-9 rounded-md -ml-1
            text-[var(--color-text-subtle)]
            hover:bg-[var(--color-bg-subtle)]
            hover:text-[var(--color-text-default)]
            transition-colors duration-100
          "
        >
          <Menu size={20} />
        </button>

        <Link href="/" className="flex items-center gap-2.5 group">
          <span
            className="
              flex items-center justify-center
              w-7 h-7 rounded-md
              bg-[var(--color-brand-primary)] text-[var(--color-text-on-brand)]
              text-[11px] font-black tracking-tight
              select-none
            "
          >
            OP
          </span>
          <span className="flex items-baseline gap-1.5">
            <span className="text-[15px] font-bold text-[var(--color-text-default)]">
              OpenPath
            </span>
            <span className="text-[13px] font-medium text-[var(--color-brand-primary)] tracking-wide">
              DS
            </span>
          </span>
        </Link>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        <span className="hidden sm:block text-[12px] text-[var(--color-text-subtle)] mr-2">
          v0.1.0
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}
