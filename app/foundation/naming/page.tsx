import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naming",
  description: "OpenPath DS 네이밍 컨벤션 — 토큰, 컴포넌트, CSS 변수",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-lg bg-[var(--color-bg-subtle)] border border-[var(--color-border-default)] px-5 py-4 text-[12px] font-mono text-[var(--color-text-default)] overflow-x-auto leading-relaxed">
      {children}
    </pre>
  );
}

export default function NamingPage() {
  return (
    <div className="px-8 py-10 max-w-[860px]">
      {/* Header */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
          <span className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest">Foundation</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-default)] mb-2">Naming</h1>
        <p className="text-[16px] text-[var(--color-text-subtle)] leading-relaxed max-w-[520px]">
          토큰·컴포넌트·CSS 변수의 네이밍 규칙. 일관된 이름은 AI와 팀 모두가 오해 없이 읽는 시스템의 기반입니다.
        </p>
      </div>

      {/* Token Naming */}
      <section className="mb-12">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Token</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">디자인 토큰 네이밍</h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            슬래시(/) 구분자로 계층 표현. 카테고리 → 역할 → 상태 순서.
          </p>
        </div>
        <CodeBlock>{`color / category / role / state
  └── color/brand/primary
  └── color/text/default
  └── color/text/subtle
  └── color/text/disabled
  └── color/bg/default
  └── color/bg/subtle
  └── color/bg/brand
  └── color/border/default
  └── color/border/brand
  └── color/status/error
  └── color/interactive/primary
  └── color/interactive/hover
  └── color/interactive/pressed
  └── color/interactive/disabled

space / 01~12          (4dp 배수: 4dp → 96dp)
shape / xs|sm|md|lg|xl|full
type  / display|headline|title|body|label / lg|md|sm
shadow / 01~04
motion / easing / standard|decelerate|accelerate
motion / duration / short1~4 | medium1~2 | long1~2`}</CodeBlock>
      </section>

      {/* CSS Variable Naming */}
      <section className="mb-12">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">CSS Variable</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">CSS 변수 네이밍</h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            토큰 슬래시(/)를 하이픈(-)으로 변환. <code className="text-[var(--color-brand-primary)]">--color-</code> prefix 사용.
          </p>
        </div>
        <CodeBlock>{`/* Token → CSS Variable 변환 규칙 */
color/brand/primary        →  --color-brand-primary
color/text/default         →  --color-text-default
color/text/on-brand        →  --color-text-on-brand
color/bg/default           →  --color-bg-default
color/border/brand         →  --color-border-brand
color/status/error         →  --color-status-error
color/interactive/hover    →  --color-interactive-hover

space/04                   →  --space-04
shape/lg                   →  --shape-lg
shadow/03                  →  --shadow-03
motion/easing/standard     →  --motion-standard
motion/duration/medium1    →  --duration-medium`}</CodeBlock>
      </section>

      {/* Component CSS Naming */}
      <section className="mb-12">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Component CSS</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">컴포넌트 CSS 클래스 네이밍 (BEM)</h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            <code className="text-[var(--color-brand-primary)]">op-</code> prefix + BEM 방식. Block__Element--Modifier.
          </p>
        </div>
        <CodeBlock>{`/* Block */
.op-btn          /* Button */
.op-field        /* Text Field */
.op-chip         /* Chip */
.op-card         /* Card */
.op-radio        /* Radio */
.op-checkbox     /* Checkbox */
.op-switch       /* Switch */
.op-fab          /* FAB */
.op-bottom-nav   /* Bottom Navigation */
.op-icon-btn     /* Icon Button */

/* Element (Block__Element) */
.op-btn__spinner
.op-field__box
.op-field__label
.op-field__input
.op-field__helper
.op-card__title
.op-card__actions
.op-bottom-nav__item
.op-bottom-nav__indicator

/* Modifier (Block--Modifier or Element--Modifier) */
.op-btn--primary
.op-btn--outlined
.op-btn--text
.op-btn--sm / --md / --lg
.op-field--filled / --outlined
.op-chip--filter / --input
.op-fab--sm / --md / --lg / --extended`}</CodeBlock>
      </section>

      {/* TypeScript Naming */}
      <section className="mb-12">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">TypeScript</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">컴포넌트 Props 네이밍</h2>
        </div>
        <CodeBlock>{`/* Props Interface — PascalCase + Props suffix */
interface ButtonProps { ... }
interface TextFieldProps { ... }
interface FABProps { ... }

/* Variant/Size — string union */
type ButtonVariant = "primary" | "outlined" | "text";
type ButtonSize    = "sm" | "md" | "lg";
type FABSize       = "sm" | "md" | "lg" | "extended";

/* Boolean props — is/has prefix 또는 명사 */
disabled?: boolean;     // HTML 표준 attribute
loading?:  boolean;
error?:    string;      // falsy = no error
label?:    string;

/* Event handlers — on + PascalCase */
onClear?: () => void;
onChange?: (value: string) => void;`}</CodeBlock>
      </section>

      {/* Route Naming */}
      <section className="mb-12">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Routes</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">페이지 라우트 구조</h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                {["카테고리", "URL 패턴", "예시"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { cat: "Style",      pattern: "/foundation/[name]",            ex: "/foundation/color, /style/shape" },
                { cat: "Foundation", pattern: "/foundation/[name]",            ex: "/foundation/accessibility, /foundation/motion" },
                { cat: "Components", pattern: "/components/[kebab-case-name]", ex: "/components/bottom-navigation, /components/fab" },
                { cat: "Tokens",     pattern: "/tokens",                        ex: "/tokens" },
              ].map((row, i) => (
                <tr key={row.cat} className={`border-b border-[var(--color-border-default)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-5 py-3 font-semibold text-[var(--color-text-default)]">{row.cat}</td>
                  <td className="px-5 py-3 font-mono text-[12px] text-[var(--color-brand-primary)]">{row.pattern}</td>
                  <td className="px-5 py-3 font-mono text-[12px] text-[var(--color-text-subtle)]">{row.ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
