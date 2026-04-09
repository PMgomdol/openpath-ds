"use client";

import { Fragment, useCallback, useState } from "react";
import {
  DUOTONE_CORAL,
  NEUTRAL,
  PRIMARY_MINT,
  SEMANTIC_GROUPS,
  SYSTEM_COLORS,
  type PaletteStop,
  resolveSemanticValue,
} from "@/lib/tokens/colors";

function CopyToast({ message, visible }: { message: string; visible: boolean }) {
  if (!visible) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="
        fixed bottom-8 left-1/2 z-[100] -translate-x-1/2
        px-4 py-2.5 rounded-md
        bg-[#29363D] text-white text-[13px] font-medium
        shadow-elevation-3
        dark:bg-mint-600 dark:text-white
      "
    >
      {message}
    </div>
  );
}

function useCopyWithToast() {
  const [toast, setToast] = useState({ open: false, text: "" });

  const copy = useCallback(async (value: string, label?: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setToast({
        open: true,
        text: label ?? `복사됨: ${value}`,
      });
      window.setTimeout(() => {
        setToast((t) => ({ ...t, open: false }));
      }, 2000);
    } catch {
      setToast({ open: true, text: "복사에 실패했습니다" });
      window.setTimeout(() => setToast((t) => ({ ...t, open: false })), 2000);
    }
  }, []);

  return { toast, copy };
}

function PaletteChip({
  stop,
  onCopyHex,
}: {
  stop: PaletteStop;
  onCopyHex: (hex: string) => void;
}) {
  const isLight =
    stop.hex.replace("#", "").length === 6 &&
    parseInt(stop.hex.slice(1, 3), 16) * 0.299 +
      parseInt(stop.hex.slice(3, 5), 16) * 0.587 +
      parseInt(stop.hex.slice(5, 7), 16) * 0.114 >
      186;

  return (
    <div className="flex min-w-[100px] flex-1 flex-col gap-2">
      <div
        className="
          relative h-20 w-full overflow-hidden rounded-lg
          border border-[var(--color-border)]
          shadow-elevation-1
        "
        style={{ backgroundColor: stop.hex }}
      >
        {stop.badge && (
          <span
            className={`
              absolute right-2 top-2 rounded px-1.5 py-0.5
              text-[10px] font-semibold uppercase tracking-wide
              ${isLight ? "bg-[#29363D]/90 text-white" : "bg-white/95 text-[#29363D]"}
            `}
          >
            {stop.badge}
          </span>
        )}
      </div>
      <p className="font-mono text-[11px] leading-snug text-[var(--color-text-secondary)] break-all">
        {stop.token}
      </p>
      <button
        type="button"
        onClick={() => onCopyHex(stop.hex)}
        className={`
          w-full rounded-md border border-[var(--color-border)]
          bg-[var(--color-bg-subtle)] px-2 py-1.5 text-left
          font-mono text-[12px] font-medium tracking-tight
          text-[var(--color-text-primary)]
          transition-colors hover:border-mint-300 hover:bg-mint-20
          dark:hover:bg-mint-600/15
        `}
      >
        {stop.hex}
      </button>
      <p className="text-[12px] font-medium text-[var(--color-text-secondary)]">
        {stop.label}
      </p>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-mint-400">
        {eyebrow}
      </p>
      <h2 className="text-[22px] font-bold tracking-tight text-[var(--color-text-primary)]">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
          {description}
        </p>
      )}
    </div>
  );
}

function PaletteGrid({
  stops,
  onCopyHex,
}: {
  stops: PaletteStop[];
  onCopyHex: (hex: string) => void;
}) {
  return (
    <div
      className="
        flex gap-4 overflow-x-auto pb-2
        sm:grid sm:grid-cols-4 sm:overflow-visible
        lg:grid-cols-8
      "
    >
      {stops.map((stop) => (
        <PaletteChip key={stop.token} stop={stop} onCopyHex={onCopyHex} />
      ))}
    </div>
  );
}

function SystemColorCard({
  stop,
  onCopyHex,
}: {
  stop: PaletteStop;
  onCopyHex: (hex: string) => void;
}) {
  const isWhite = stop.hex.toUpperCase() === "#FFFFFF";

  return (
    <div className="flex min-w-[140px] flex-1 flex-col gap-2">
      <div
        className={`
          h-20 w-full rounded-lg border shadow-elevation-1
          ${isWhite ? "border-[var(--color-border)] ring-1 ring-inset ring-[var(--color-border)]" : "border-[var(--color-border)]"}
        `}
        style={{ backgroundColor: stop.hex }}
      />
      <p className="text-[13px] font-semibold text-[var(--color-text-primary)]">
        {stop.label}
      </p>
      <button
        type="button"
        onClick={() => onCopyHex(stop.hex)}
        className="
          rounded-md border border-[var(--color-border)]
          bg-[var(--color-bg-subtle)] px-2 py-1.5 text-left
          font-mono text-[12px] text-[var(--color-text-primary)]
          hover:border-mint-300 hover:bg-mint-20 dark:hover:bg-mint-600/15
        "
      >
        {stop.hex}
      </button>
      <p className="font-mono text-[10px] text-[var(--color-text-secondary)] break-all">
        {stop.token}
      </p>
    </div>
  );
}

function SemanticCell({
  mode,
  refValue,
  onCopy,
}: {
  mode: "light" | "dark";
  refValue: string;
  onCopy: (v: string) => void;
}) {
  const hex = resolveSemanticValue(refValue, mode);
  return (
    <div className="flex items-center gap-2">
      <span
        className="h-3.5 w-3.5 shrink-0 rounded-full border border-[var(--color-border)] shadow-sm"
        style={{ backgroundColor: hex }}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={() => onCopy(hex)}
          className="font-mono text-[12px] text-[var(--color-text-primary)] hover:text-mint-400"
        >
          {hex}
        </button>
        <p className="font-mono text-[10px] text-[var(--color-text-secondary)]">
          {refValue}
        </p>
      </div>
    </div>
  );
}

export default function ColorPageContent() {
  const { toast, copy } = useCopyWithToast();

  const copyHex = useCallback(
    (hex: string) => copy(hex, `복사 완료 · ${hex}`),
    [copy]
  );

  return (
    <div className="px-6 py-10 md:px-10 lg:px-12">
      <CopyToast message={toast.text} visible={toast.open} />

      {/* Page header */}
      <header className="mb-14 max-w-3xl">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-mint-400">
          Foundation
        </p>
        <h1 className="mb-3 text-[36px] font-black tracking-tight text-[var(--color-text-primary)] md:text-[40px]">
          Color
        </h1>
        <p className="text-[16px] leading-relaxed text-[var(--color-text-secondary)]">
          오픈패스 DS의 컬러 시스템. 3단계 토큰 구조로 설계됨.
        </p>
      </header>

      <div className="mx-auto max-w-[1200px] space-y-16">
        {/* Primary */}
        <section>
          <SectionTitle
            eyebrow="Primary"
            title="Openpath Mint"
            description="메인 브랜드 민트 스케일. 배경부터 강조까지 단계별로 정의됩니다."
          />
          <PaletteGrid stops={PRIMARY_MINT} onCopyHex={copyHex} />
        </section>

        <hr className="border-[var(--color-border)]" />

        {/* Duotone */}
        <section>
          <SectionTitle
            eyebrow="Duotone"
            title="Coral"
            description="듀오톤 테마용 코랄 팔레트. DESIGN.md에 정의된 스텝을 표시합니다."
          />
          <PaletteGrid stops={DUOTONE_CORAL} onCopyHex={copyHex} />
        </section>

        <hr className="border-[var(--color-border)]" />

        {/* Neutral */}
        <section>
          <SectionTitle
            eyebrow="Neutral"
            title="Neutral"
            description="텍스트, 보더, 배경 등 UI 중립 톤."
          />
          <div
            className="
              flex gap-4 overflow-x-auto pb-2
              sm:grid sm:grid-cols-4 sm:overflow-visible
              lg:grid-cols-7
            "
          >
            {NEUTRAL.map((stop) => (
              <PaletteChip key={stop.token} stop={stop} onCopyHex={copyHex} />
            ))}
          </div>
        </section>

        <hr className="border-[var(--color-border)]" />

        {/* System */}
        <section>
          <SectionTitle
            eyebrow="System"
            title="System"
            description="피드백·베이스 톤."
          />
          <div className="flex flex-wrap gap-4">
            {SYSTEM_COLORS.map((stop) => (
              <SystemColorCard
                key={stop.token}
                stop={stop}
                onCopyHex={copyHex}
              />
            ))}
          </div>
        </section>

        <hr className="border-[var(--color-border)]" />

        {/* Semantic table */}
        <section>
          <SectionTitle
            eyebrow="Semantic"
            title="Semantic 토큰"
            description="라이트·다크 모드별로 참조되는 시맨틱 토큰입니다. 셀의 hex를 클릭하면 복사됩니다."
          />
          <div className="overflow-x-auto rounded-xl border border-[var(--color-border)] shadow-elevation-1">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                    Token
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                    Light
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                    Dark
                  </th>
                </tr>
              </thead>
              <tbody>
                {SEMANTIC_GROUPS.map((group) => (
                  <Fragment key={group.id}>
                    <tr className="bg-mint-20/60 dark:bg-mint-600/10">
                      <td
                        colSpan={3}
                        className="px-4 py-2 font-mono text-[12px] font-semibold text-mint-600 dark:text-mint-300"
                      >
                        {group.title}
                      </td>
                    </tr>
                    {group.rows.map((row) => (
                      <tr
                        key={row.token}
                        className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-bg-subtle)]/80"
                      >
                        <td className="px-4 py-3 align-top font-mono text-[12px] text-[var(--color-text-primary)]">
                          {row.token}
                        </td>
                        <td className="px-4 py-3 align-top">
                          <SemanticCell
                            mode="light"
                            refValue={row.light}
                            onCopy={copyHex}
                          />
                        </td>
                        <td className="px-4 py-3 align-top">
                          <SemanticCell
                            mode="dark"
                            refValue={row.dark}
                            onCopy={copyHex}
                          />
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
