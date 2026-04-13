"use client";

import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────

export interface CodeSnippet {
  label: string;
  code: string;
}

export interface CodeBlockProps {
  snippets: CodeSnippet[];
  /** Section title. Default: "코드 스니펫" */
  title?: string;
  /** Section description */
  description?: string;
}

// ── SVG icons (inline — no lucide dep for this utility) ────────

const IconCopy = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

// ── Component ──────────────────────────────────────────────────

export default function CodeBlock({ snippets, title = "코드 스니펫", description = "복사 후 바로 사용 가능" }: CodeBlockProps) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(snippets[active].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasMultiple = snippets.length > 1;

  return (
    <section className="mb-16">
      {/* Section header */}
      <div className="mb-5">
        <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
          Code
        </p>
        <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
          {title}
        </h2>
        <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
          {description}
        </p>
      </div>

      {/* Tab bar — only when multiple snippets */}
      {hasMultiple && (
        <div className="flex border-b border-[var(--color-border)]">
          {snippets.map((s, i) => (
            <button
              key={s.label}
              type="button"
              onClick={() => { setActive(i); setCopied(false); }}
              style={{ height: 40, padding: "0 16px" }}
              className={[
                "relative text-[13px] font-medium tracking-[0.04em] transition-all shrink-0",
                active === i
                  ? "text-[var(--color-brand-primary)]"
                  : "text-[var(--color-text-subtle)] hover:text-[var(--color-text-default)]",
              ].join(" ")}
            >
              {s.label}
              {active === i && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: "var(--color-brand-primary)" }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Code block */}
      <div
        className={[
          "relative overflow-hidden border border-[var(--color-border)]",
          hasMultiple ? "border-t-0 rounded-b-xl rounded-tr-xl" : "rounded-xl",
        ].join(" ")}
        style={{ background: "var(--color-code-bg)" }}
      >
        {/* Copy button */}
        <button
          type="button"
          onClick={copy}
          aria-label="코드 복사"
          className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all"
          style={{
            background: copied ? "var(--color-code-copy-done-bg)" : "var(--color-code-copy-idle-bg)",
            color:      copied ? "var(--color-brand-primary)"     : "var(--color-code-copy-idle-text)",
            border: copied
              ? "1px solid var(--color-code-copy-done-border)"
              : "1px solid var(--color-code-copy-idle-border)",
          }}
        >
          {copied ? <IconCheck /> : <IconCopy />}
          {copied ? "복사됨" : "복사"}
        </button>

        {/* Code */}
        <pre
          className="p-5 text-[13px] leading-relaxed overflow-x-auto"
          style={{ color: "var(--color-code-text)", fontFamily: "'SF Mono', 'Fira Code', monospace" }}
        >
          <code>{snippets[active].code}</code>
        </pre>
      </div>
    </section>
  );
}
