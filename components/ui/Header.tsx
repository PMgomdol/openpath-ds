"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-50
        h-14 px-6
        flex items-center justify-between
        header-bg backdrop-blur-md
        border-b border-[var(--color-border)]
        transition-colors duration-200
      "
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 group">
        <span
          className="
            flex items-center justify-center
            w-7 h-7 rounded-md
            bg-mint-300 text-white
            text-[11px] font-black tracking-tight
            select-none
          "
        >
          OP
        </span>
        <span className="flex items-baseline gap-1.5">
          <span className="text-[15px] font-bold text-[var(--color-text-primary)]">
            OpenPath
          </span>
          <span className="text-[13px] font-medium text-mint-300 tracking-wide">
            DS
          </span>
        </span>
      </Link>

      {/* Right */}
      <div className="flex items-center gap-1">
        <span className="hidden sm:block text-[12px] text-[var(--color-text-secondary)] mr-2">
          v0.1.0
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}
