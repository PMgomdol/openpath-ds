"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import clsx from "clsx";

type SemanticRow = {
  group: string;
  token: string;
  lightHex: string;
  darkHex: string;
  lightLabel: string;
  darkLabel: string;
};

const GROUP_ORDER = ["brand", "text", "bg", "border", "status", "interactive"];

const GROUP_LABEL: Record<string, string> = {
  brand:       "Brand",
  text:        "Text",
  bg:          "Background",
  border:      "Border",
  status:      "Status",
  interactive: "Interactive",
};

const GROUP_COLOR: Record<string, string> = {
  brand:       "bg-[var(--color-bg-brand)] text-[var(--color-brand-primary)]",
  text:        "bg-[var(--color-bg-subtle)] text-[var(--color-text-subtle)]",
  bg:          "bg-[var(--color-category-foundation-bg)] text-[var(--color-category-foundation)]",
  border:      "bg-[var(--color-bg-warning)] text-[var(--color-status-warning)]",
  status:      "bg-[var(--color-bg-error)] text-[var(--color-status-error)]",
  interactive: "bg-[var(--color-bg-brand)] text-[var(--color-brand-primary)]",
};

function CopyHex({ hex }: { hex: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <button
      onClick={copy}
      title={`Copy ${hex}`}
      className={clsx(
        "group/copy flex items-center gap-1 font-mono text-[12px] rounded px-1 py-0.5 -ml-1",
        "transition-all duration-150",
        copied
          ? "text-[var(--color-brand-primary)] bg-[var(--color-bg-brand)]"
          : "text-[var(--color-text-subtle)] hover:text-[var(--color-text-default)] hover:bg-[var(--color-bg-subtle)]"
      )}
    >
      {copied ? (
        <Check size={10} strokeWidth={2.5} />
      ) : (
        <Copy size={10} strokeWidth={2} className="opacity-0 group-hover/copy:opacity-60 transition-opacity" />
      )}
      {hex}
    </button>
  );
}

function ColorDot({ hex }: { hex: string }) {
  return (
    <span
      className="inline-block w-3 h-3 rounded-full border border-black/10 shrink-0"
      style={{ backgroundColor: hex }}
    />
  );
}

export default function SemanticTable({ rows }: { rows: SemanticRow[] }) {
  // group별로 묶어서 렌더링
  const grouped = GROUP_ORDER.map((g) => ({
    group: g,
    rows: rows.filter((r) => r.group === g),
  })).filter((g) => g.rows.length > 0);

  return (
    <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[1fr_1fr_1fr] bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)] px-4 py-2.5">
        <span className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
          Token
        </span>
        <span className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
          Light
        </span>
        <span className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
          Dark
        </span>
      </div>

      {/* Groups */}
      {grouped.map(({ group, rows }, gi) => (
        <div key={group}>
          {/* Group label */}
          <div className="px-4 py-2 bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
            <span
              className={clsx(
                "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold",
                GROUP_COLOR[group]
              )}
            >
              {GROUP_LABEL[group]}
            </span>
          </div>

          {/* Rows */}
          {rows.map((row, ri) => (
            <div
              key={row.token}
              className={clsx(
                "grid grid-cols-[1fr_1fr_1fr] items-center px-4 py-3",
                "border-b border-[var(--color-border)] last:border-b-0",
                "hover:bg-[var(--color-bg-subtle)] transition-colors duration-100"
              )}
            >
              {/* Token name */}
              <span className="font-mono text-[12px] text-[var(--color-text-primary)] truncate pr-2">
                {row.token}
              </span>

              {/* Light */}
              <div className="flex items-center gap-2">
                <ColorDot hex={row.lightHex} />
                <div className="flex flex-col min-w-0">
                  <span className="text-[12px] text-[var(--color-text-secondary)]">
                    {row.lightLabel}
                  </span>
                  <CopyHex hex={row.lightHex} />
                </div>
              </div>

              {/* Dark */}
              <div className="flex items-center gap-2">
                <ColorDot hex={row.darkHex} />
                <div className="flex flex-col min-w-0">
                  <span className="text-[12px] text-[var(--color-text-secondary)]">
                    {row.darkLabel}
                  </span>
                  <CopyHex hex={row.darkHex} />
                </div>
              </div>
            </div>
          ))}

          {/* Group spacing */}
          {gi < grouped.length - 1 && (
            <div className="h-px bg-[var(--color-border)]" />
          )}
        </div>
      ))}
    </div>
  );
}
