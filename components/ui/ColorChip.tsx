"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import clsx from "clsx";

interface ColorChipProps {
  token: string;
  hex: string;
  label?: string;
  usage?: string;
  badge?: string;
  textLight?: boolean; // 텍스트를 흰색으로
}

export default function ColorChip({
  token,
  hex,
  label,
  usage,
  badge,
  textLight,
}: ColorChipProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // fallback
    }
  };

  return (
    <div className="group rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-base)] hover:shadow-elevation-2 transition-all duration-200">
      {/* Color swatch */}
      <div
        className="relative h-20 w-full flex items-end p-2.5"
        style={{ backgroundColor: hex }}
      >
        {badge && (
          <span
            className={clsx(
              "text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-full",
              textLight
                ? "bg-white/20 text-white"
                : "bg-black/10 text-black/70"
            )}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3 space-y-1">
        {label && (
          <p className="text-[13px] font-bold text-[var(--color-text-primary)]">
            {label}
          </p>
        )}
        <p className="text-[11px] text-[var(--color-text-secondary)] leading-tight truncate">
          {token}
        </p>
        {usage && (
          <p className="text-[11px] text-[var(--color-text-secondary)] leading-tight">
            {usage}
          </p>
        )}

        {/* Hex copy */}
        <button
          onClick={copy}
          className={clsx(
            "mt-1 flex items-center gap-1.5 text-[12px] font-mono font-medium",
            "rounded px-1.5 py-0.5 -ml-1.5",
            "transition-all duration-150",
            copied
              ? "text-[var(--color-brand-primary)] bg-[var(--color-bg-brand)]"
              : "text-[var(--color-text-default)] hover:text-[var(--color-interactive-hover)] hover:bg-[var(--color-bg-subtle)]"
          )}
        >
          {copied ? (
            <Check size={11} strokeWidth={2.5} />
          ) : (
            <Copy size={11} strokeWidth={2} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
          {copied ? "Copied!" : hex}
        </button>
      </div>
    </div>
  );
}
