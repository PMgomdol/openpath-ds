import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spacing",
  description: "8배수 베이스 스페이싱 시스템",
};

// ─── 데이터 ──────────────────────────────────────────────────────

type SpaceToken = {
  token: string;
  valuePx: number;
  usage: string;
};

const spaceScale: SpaceToken[] = [
  { token: "space/01", valuePx:  4, usage: "아이콘 패딩, 미세 간격" },
  { token: "space/02", valuePx:  8, usage: "컴포넌트 내부 간격" },
  { token: "space/03", valuePx: 12, usage: "Chip, Badge 패딩" },
  { token: "space/04", valuePx: 16, usage: "기본 패딩, Mobile 거터" },
  { token: "space/05", valuePx: 20, usage: "중간 간격" },
  { token: "space/06", valuePx: 24, usage: "섹션 내부, Desktop 거터" },
  { token: "space/07", valuePx: 32, usage: "카드·컨테이너 패딩" },
  { token: "space/08", valuePx: 40, usage: "섹션 간 간격" },
  { token: "space/09", valuePx: 48, usage: "대형 섹션 패딩" },
  { token: "space/10", valuePx: 64, usage: "페이지 레벨 간격" },
  { token: "space/11", valuePx: 80, usage: "Hero·랜딩 섹션" },
  { token: "space/12", valuePx: 96, usage: "최대 섹션 여백" },
];

type SemanticRow = {
  token: string;
  ref: string;
  value: string;
  usage: string;
};

const semanticSpacing: SemanticRow[] = [
  { token: "space/padding/button/sm",    ref: "space/02 + space/03", value: "8px 12px",  usage: "Small 버튼 내부 패딩" },
  { token: "space/padding/button/md",    ref: "space/03 + space/04", value: "12px 16px", usage: "Medium 버튼 내부 패딩 (기본)" },
  { token: "space/padding/button/lg",    ref: "space/04 + space/06", value: "16px 24px", usage: "Large 버튼 내부 패딩" },
  { token: "space/padding/input/md",     ref: "space/03 + space/04", value: "12px 16px", usage: "Text Field 내부 패딩" },
  { token: "space/padding/card/sm",      ref: "space/04",            value: "16px",       usage: "소형 카드 패딩" },
  { token: "space/padding/card/md",      ref: "space/06",            value: "24px",       usage: "기본 카드 패딩" },
  { token: "space/padding/card/lg",      ref: "space/07",            value: "32px",       usage: "대형 카드 패딩" },
  { token: "space/padding/dialog",       ref: "space/07",            value: "32px",       usage: "모달·다이얼로그 패딩" },
  { token: "space/gap/stack/sm",         ref: "space/02",            value: "8px",        usage: "인라인 요소 간격 (tight)" },
  { token: "space/gap/stack/md",         ref: "space/04",            value: "16px",       usage: "컴포넌트 수직 스택 간격" },
  { token: "space/gap/stack/lg",         ref: "space/06",            value: "24px",       usage: "섹션 내부 요소 간격" },
];

type LayoutRow = {
  token: string;
  mobile: string;
  desktop: string;
  usage: string;
};

const layoutSpacing: LayoutRow[] = [
  { token: "space/layout/gutter",         mobile: "space/04 · 16px", desktop: "space/06 · 24px", usage: "페이지 좌우 여백" },
  { token: "space/layout/section/gap",    mobile: "space/08 · 40px", desktop: "space/10 · 64px", usage: "섹션 간 수직 간격" },
  { token: "space/layout/section/inner",  mobile: "space/06 · 24px", desktop: "space/09 · 48px", usage: "섹션 내부 패딩" },
  { token: "space/layout/hero/vertical",  mobile: "space/11 · 80px", desktop: "space/12 · 96px", usage: "Hero 섹션 상하 패딩" },
  { token: "space/layout/content/max",    mobile: "100%",             desktop: "1200px",           usage: "콘텐츠 최대 너비" },
];

// ─── 컴포넌트: 섹션 헤더 ────────────────────────────────────────

function SectionHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-5">
      <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">
        {eyebrow}
      </p>
      <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">{title}</h2>
      {desc && (
        <p className="mt-1 text-[14px] text-[var(--color-text-secondary)] leading-relaxed">
          {desc}
        </p>
      )}
    </div>
  );
}

// ─── 컴포넌트: Spacing Scale 행 ─────────────────────────────────

// max value = 96px → 최대 bar 너비 480px (5배 스케일)
const BAR_SCALE = 5;
const MAX_PX = 96;

function SpaceRow({ token, valuePx, usage, isLast }: SpaceToken & { isLast: boolean }) {
  const barWidth = Math.round((valuePx / MAX_PX) * 100); // percentage of max

  return (
    <div
      className={`group flex items-center gap-6 px-4 py-3.5 -mx-4 rounded-xl transition-colors duration-150 hover:bg-[var(--color-bg-subtle)] ${
        !isLast ? "border-b border-[var(--color-border)]" : ""
      }`}
    >
      {/* 왼쪽: 토큰명 + 용도 */}
      <div className="w-[220px] flex-shrink-0">
        <code className="text-[12px] font-mono font-medium text-mint-500 block mb-0.5">
          {token}
        </code>
        <p className="text-[11px] text-[var(--color-text-secondary)] leading-snug">
          {usage}
        </p>
      </div>

      {/* 가운데: 시각적 바 */}
      <div className="flex-1 flex items-center min-w-0">
        <div className="w-full relative h-6 flex items-center">
          {/* 트랙 */}
          <div className="absolute inset-y-0 left-0 right-0 rounded-sm bg-[var(--color-bg-subtle)] border border-[var(--color-border)]" />
          {/* 민트 바 */}
          <div
            className="relative h-6 rounded-sm bg-mint-300 transition-all duration-300 group-hover:bg-mint-400"
            style={{ width: `${barWidth}%`, minWidth: "4px" }}
          >
            {/* 바 위 px 레이블 (좁으면 밖으로) */}
            {barWidth > 12 && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold font-mono text-[#156565]">
                {valuePx}px
              </span>
            )}
          </div>
          {barWidth <= 12 && (
            <span className="ml-2 text-[10px] font-bold font-mono text-[var(--color-text-secondary)]">
              {valuePx}px
            </span>
          )}
        </div>
      </div>

      {/* 오른쪽: px 수치 (굵은 숫자) */}
      <div className="w-[64px] flex-shrink-0 text-right">
        <span className="text-[20px] font-black font-mono text-[var(--color-text-primary)] tabular-nums leading-none">
          {valuePx}
        </span>
        <span className="text-[11px] text-[var(--color-text-secondary)] ml-0.5">px</span>
      </div>
    </div>
  );
}

// ─── 컴포넌트: Semantic Spacing 테이블 ──────────────────────────

function SemanticSpacingTable({ rows }: { rows: SemanticRow[] }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] overflow-hidden">
      {/* 헤더 */}
      <div className="grid grid-cols-[2fr_1.5fr_1fr_1.5fr] px-4 py-2.5 bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
        {["Token", "참조 Global", "Value", "용도"].map((h) => (
          <span key={h} className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
            {h}
          </span>
        ))}
      </div>

      {rows.map((row, idx) => (
        <div
          key={row.token}
          className={`grid grid-cols-[2fr_1.5fr_1fr_1.5fr] items-center px-4 py-3 transition-colors hover:bg-[var(--color-bg-subtle)] ${
            idx < rows.length - 1 ? "border-b border-[var(--color-border)]" : ""
          }`}
        >
          <code className="text-[12px] font-mono text-mint-500 leading-snug">
            {row.token}
          </code>
          <code className="text-[11px] font-mono text-[var(--color-text-secondary)]">
            {row.ref}
          </code>
          <code className="text-[12px] font-mono font-semibold text-[var(--color-text-primary)]">
            {row.value}
          </code>
          <p className="text-[12px] text-[var(--color-text-secondary)]">
            {row.usage}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── 컴포넌트: Layout Spacing 테이블 ────────────────────────────

function LayoutSpacingTable({ rows }: { rows: LayoutRow[] }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] overflow-hidden">
      {/* 헤더 */}
      <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr] px-4 py-2.5 bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
        {["Token", "Mobile", "Desktop", "용도"].map((h) => (
          <span key={h} className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
            {h}
          </span>
        ))}
      </div>

      {rows.map((row, idx) => (
        <div
          key={row.token}
          className={`grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr] items-center px-4 py-3 transition-colors hover:bg-[var(--color-bg-subtle)] ${
            idx < rows.length - 1 ? "border-b border-[var(--color-border)]" : ""
          }`}
        >
          <code className="text-[12px] font-mono text-mint-500 leading-snug">
            {row.token}
          </code>

          {/* Mobile */}
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold text-[var(--color-text-secondary)] bg-[var(--color-bg-subtle)] border border-[var(--color-border)] px-1.5 py-px rounded-full uppercase tracking-wide flex-shrink-0">
              MB
            </span>
            <code className="text-[11px] font-mono text-[var(--color-text-primary)]">
              {row.mobile}
            </code>
          </div>

          {/* Desktop */}
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold text-mint-500 bg-mint-20 border border-mint-100 px-1.5 py-px rounded-full uppercase tracking-wide flex-shrink-0">
              DT
            </span>
            <code className="text-[11px] font-mono text-[var(--color-text-primary)]">
              {row.desktop}
            </code>
          </div>

          <p className="text-[12px] text-[var(--color-text-secondary)]">
            {row.usage}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── 컴포넌트: 8배수 원칙 설명 카드 ────────────────────────────

function BaseGridCard() {
  const steps = [4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96];

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-base)] overflow-hidden">
      <div className="px-6 py-5 border-b border-[var(--color-border)]">
        <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">
          Base Grid
        </p>
        <p className="text-[16px] font-bold text-[var(--color-text-primary)]">
          4px 격자 · 8px 베이스
        </p>
        <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
          모든 간격은 4px 단위로 정의되며, 주된 스텝은 8px 배수입니다.
        </p>
      </div>

      <div className="px-6 py-5">
        {/* 격자 시각화 */}
        <div className="flex items-end gap-1 mb-4 overflow-x-auto pb-1">
          {steps.map((v) => (
            <div key={v} className="flex flex-col items-center gap-1 flex-shrink-0">
              <div
                className="w-5 rounded-sm bg-mint-300 opacity-80"
                style={{ height: `${(v / 96) * 80 + 8}px` }}
              />
              <span className="text-[9px] font-mono text-[var(--color-text-secondary)] tabular-nums">
                {v}
              </span>
            </div>
          ))}
        </div>

        {/* 원칙 리스트 */}
        <ul className="space-y-2">
          {[
            "4px 최소 단위 — 아이콘 내부 패딩, 배지 등 극소 요소",
            "8px 기본 단위 — 컴포넌트 내부 간격의 기준",
            "16px 페이지 거터 — Mobile 좌우 여백 기준",
            "24px Desktop 거터 — 데스크톱 콘텐츠 좌우 패딩",
            "이 스케일 밖의 값 사용 금지 — 예외 없음",
          ].map((rule) => (
            <li key={rule} className="flex items-start gap-2">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-mint-300 flex-shrink-0" />
              <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed">
                {rule}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────

export default function SpacingPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">

      {/* 페이지 헤더 */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">
            Foundation
          </span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-primary)] mb-2">
          Spacing
        </h1>
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed max-w-[520px]">
          8배수 베이스 스페이싱 시스템. 모든 여백은 이 스케일에서 선택한다.
          <br />
          <span className="text-mint-400 font-medium">
            space/01 (4px) → space/12 (96px)
          </span>{" "}
          총 12단계.
        </p>
      </div>

      {/* ── Spacing Scale ────────────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          eyebrow="Global Scale"
          title="Spacing Scale"
          desc="space/01 ~ space/12. 컴포넌트·레이아웃 모두 이 값을 참조합니다."
        />

        {/* 컬럼 헤더 */}
        <div className="flex items-center gap-6 px-4 pb-2 mb-1 border-b border-[var(--color-border)]">
          <div className="w-[220px] flex-shrink-0">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
              Token · 용도
            </span>
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
              Visual Scale
            </span>
          </div>
          <div className="w-[64px] flex-shrink-0 text-right">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
              Value
            </span>
          </div>
        </div>

        {spaceScale.map((item, idx) => (
          <SpaceRow
            key={item.token}
            {...item}
            isLast={idx === spaceScale.length - 1}
          />
        ))}
      </section>

      {/* ── 8px 격자 원칙 카드 ──────────────────────────────── */}
      <section className="mb-12">
        <BaseGridCard />
      </section>

      <div className="border-t border-[var(--color-border)] mb-12" />

      {/* ── Semantic Spacing ─────────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          eyebrow="Semantic Spacing"
          title="Component Padding Tokens"
          desc="컴포넌트별 내부 패딩은 Global Space 토큰을 조합해 Semantic 토큰으로 정의합니다."
        />
        <SemanticSpacingTable rows={semanticSpacing} />
      </section>

      <div className="border-t border-[var(--color-border)] mb-12" />

      {/* ── Layout Spacing ───────────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          eyebrow="Layout Spacing"
          title="Layout & Grid Tokens"
          desc="거터·섹션 간격 등 레이아웃 레벨 토큰. Mobile / Desktop 두 단계로 구분합니다."
        />
        <LayoutSpacingTable rows={layoutSpacing} />

        {/* 레이아웃 시각 다이어그램 */}
        <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6 overflow-hidden">
          <p className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-4">
            Layout Diagram — Desktop
          </p>
          <div className="relative flex gap-0 rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-base)] h-20">
            {/* 왼쪽 거터 */}
            <div className="w-6 bg-mint-20 border-r border-dashed border-mint-200 flex items-center justify-center flex-shrink-0">
              <span className="text-[8px] font-mono text-mint-400 rotate-90 whitespace-nowrap">24px</span>
            </div>
            {/* 콘텐츠 영역 */}
            <div className="flex-1 flex items-center justify-center">
              <span className="text-[11px] font-semibold text-[var(--color-text-secondary)]">
                Content Area — max 1200px
              </span>
            </div>
            {/* 오른쪽 거터 */}
            <div className="w-6 bg-mint-20 border-l border-dashed border-mint-200 flex items-center justify-center flex-shrink-0">
              <span className="text-[8px] font-mono text-mint-400 rotate-90 whitespace-nowrap">24px</span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-mint-20 border border-mint-200" />
              <span className="text-[11px] text-[var(--color-text-secondary)]">Gutter (24px Desktop · 16px Mobile)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[var(--color-bg-base)] border border-[var(--color-border)]" />
              <span className="text-[11px] text-[var(--color-text-secondary)]">Content</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
