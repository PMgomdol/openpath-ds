import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Typography",
  description: "Mark Pro(EN) + Noto Sans KR(KO) 기반 타이포 스케일",
};

// ─── 데이터 ──────────────────────────────────────────────────────

type TypeStyle = {
  token: string;
  label: string;
  size: string;
  sizePx: number;
  weight: string;
  weightNum: number;
  lh: string;
  tracking: string;
};

type TypeGroup = {
  id: string;
  eyebrow: string;
  label: string;
  desc: string;
  styles: TypeStyle[];
};

const typeGroups: TypeGroup[] = [
  {
    id: "headline",
    eyebrow: "Large Display",
    label: "Headline",
    desc: "히어로·섹션 타이틀 등 대형 디스플레이 텍스트. PC / Mobile 두 단계 브레이크포인트.",
    styles: [
      { token: "type/headline/xl/pc",     label: "Headline XL · PC",     size: "56px", sizePx: 56, weight: "Black",   weightNum: 900, lh: "1.2", tracking: "−0.02em" },
      { token: "type/headline/xl/mobile", label: "Headline XL · Mobile", size: "40px", sizePx: 40, weight: "Black",   weightNum: 900, lh: "1.2", tracking: "−0.02em" },
      { token: "type/headline/lg/pc",     label: "Headline LG · PC",     size: "48px", sizePx: 48, weight: "Black",   weightNum: 900, lh: "1.2", tracking: "−0.02em" },
      { token: "type/headline/lg/mobile", label: "Headline LG · Mobile", size: "32px", sizePx: 32, weight: "Black",   weightNum: 900, lh: "1.2", tracking: "−0.02em" },
      { token: "type/headline/md/pc",     label: "Headline MD · PC",     size: "32px", sizePx: 32, weight: "Bold",    weightNum: 700, lh: "1.2", tracking: "−0.02em" },
      { token: "type/headline/md/mobile", label: "Headline MD · Mobile", size: "28px", sizePx: 28, weight: "Bold",    weightNum: 700, lh: "1.2", tracking: "−0.02em" },
      { token: "type/headline/sm/pc",     label: "Headline SM · PC",     size: "28px", sizePx: 28, weight: "Bold",    weightNum: 700, lh: "1.2", tracking: "0em" },
      { token: "type/headline/sm/mobile", label: "Headline SM · Mobile", size: "24px", sizePx: 24, weight: "Bold",    weightNum: 700, lh: "1.2", tracking: "0em" },
    ],
  },
  {
    id: "title",
    eyebrow: "Section Title",
    label: "Title",
    desc: "카드 제목·섹션 헤더에 사용하는 중간 위계 텍스트.",
    styles: [
      { token: "type/title/lg", label: "Title LG", size: "24px", sizePx: 24, weight: "Bold",   weightNum: 700, lh: "1.5", tracking: "0em" },
      { token: "type/title/md", label: "Title MD", size: "20px", sizePx: 20, weight: "Bold",   weightNum: 700, lh: "1.5", tracking: "0em" },
      { token: "type/title/sm", label: "Title SM", size: "18px", sizePx: 18, weight: "Medium", weightNum: 500, lh: "1.5", tracking: "0em" },
    ],
  },
  {
    id: "body",
    eyebrow: "Reading Text",
    label: "Body",
    desc: "본문 콘텐츠용. LG는 긴 글 전용으로 line-height 1.7 적용.",
    styles: [
      { token: "type/body/lg", label: "Body LG", size: "18px", sizePx: 18, weight: "Regular", weightNum: 400, lh: "1.7", tracking: "0em" },
      { token: "type/body/md", label: "Body MD", size: "16px", sizePx: 16, weight: "Regular", weightNum: 400, lh: "1.5", tracking: "0em" },
      { token: "type/body/sm", label: "Body SM", size: "14px", sizePx: 14, weight: "Regular", weightNum: 400, lh: "1.5", tracking: "0em" },
    ],
  },
  {
    id: "label",
    eyebrow: "UI Elements",
    label: "Label",
    desc: "버튼·탭·뱃지 등 UI 엘리먼트 전용. letter-spacing +0.04em 적용.",
    styles: [
      { token: "type/label/lg", label: "Label LG", size: "16px", sizePx: 16, weight: "Medium", weightNum: 500, lh: "1.5", tracking: "0.04em" },
      { token: "type/label/md", label: "Label MD", size: "14px", sizePx: 14, weight: "Medium", weightNum: 500, lh: "1.5", tracking: "0.04em" },
      { token: "type/label/sm", label: "Label SM", size: "12px", sizePx: 12, weight: "Medium", weightNum: 500, lh: "1.5", tracking: "0.04em" },
    ],
  },
  {
    id: "caption",
    eyebrow: "Supplementary",
    label: "Caption",
    desc: "부가 설명·타임스탬프·메타 정보 등 최소 위계 텍스트.",
    styles: [
      { token: "type/caption", label: "Caption", size: "11px", sizePx: 11, weight: "Regular", weightNum: 400, lh: "1.5", tracking: "0.04em" },
    ],
  },
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
    <div className="mb-4">
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

// ─── 컴포넌트: 타입 스케일 행 ────────────────────────────────────

function TypeRow({
  style,
  isLast,
}: {
  style: TypeStyle;
  isLast: boolean;
}) {
  const previewText =
    style.sizePx >= 44
      ? "오픈패스 The quick fox"
      : "오픈패스 디자인 시스템 The quick brown fox";

  const trackingValue =
    style.tracking === "−0.02em" ? "-0.02em" : style.tracking;

  return (
    <div
      className={`group flex items-center gap-6 px-4 py-4 -mx-4 rounded-xl transition-colors duration-150 hover:bg-[var(--color-bg-subtle)] ${
        !isLast ? "border-b border-[var(--color-border)]" : ""
      }`}
    >
      {/* 왼쪽: 스타일명 + 토큰 */}
      <div className="w-[190px] flex-shrink-0">
        <p className="text-[13px] font-semibold text-[var(--color-text-primary)] leading-snug mb-1">
          {style.label}
        </p>
        <code className="text-[10px] font-mono text-mint-500 leading-relaxed break-all">
          {style.token}
        </code>
      </div>

      {/* 가운데: 실제 미리보기 */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <span
          style={{
            fontSize: style.size,
            fontWeight: style.weightNum,
            lineHeight: style.lh,
            letterSpacing: trackingValue,
            color: "var(--color-text-primary)",
          }}
          className="block whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {previewText}
        </span>
      </div>

      {/* 오른쪽: 수치 정보 */}
      <div className="w-[210px] flex-shrink-0 flex flex-col items-end gap-1.5">
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          <SpecBadge label="Size" value={style.size} />
          <SpecBadge label="Weight" value={`${style.weight} · ${style.weightNum}`} />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          <SpecBadge label="LH" value={style.lh} />
          <SpecBadge label="Tracking" value={style.tracking} />
        </div>
      </div>
    </div>
  );
}

function SpecBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">
        {label}
      </span>
      <code className="text-[11px] font-mono font-medium text-[var(--color-text-primary)] bg-[var(--color-bg-subtle)] border border-[var(--color-border)] px-1.5 py-px rounded-sm whitespace-nowrap">
        {value}
      </code>
    </div>
  );
}

// ─── 컴포넌트: EN / KO 분기 비교 카드 ─────────────────────────

function LangCompareCard({
  lang,
  fontName,
  token,
  lhEN,
  lhKO,
  sampleEN,
  sampleKO,
  licensed,
}: {
  lang: string;
  fontName: string;
  token: string;
  lhEN: string;
  lhKO: string;
  sampleEN: string;
  sampleKO: string;
  licensed?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] overflow-hidden bg-[var(--color-bg-base)]">
      {/* 카드 헤더 */}
      <div className="px-5 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-0.5">
            {lang}
          </p>
          <p className="text-[16px] font-bold text-[var(--color-text-primary)]">{fontName}</p>
        </div>
        <div className="flex items-center gap-2">
          {licensed && (
            <span className="text-[10px] font-semibold text-[var(--color-text-secondary)] bg-[var(--color-bg-subtle)] border border-[var(--color-border)] px-2 py-0.5 rounded-full">
              Licensed
            </span>
          )}
          <code className="text-[11px] font-mono text-mint-500">{token}</code>
        </div>
      </div>

      {/* LH 비교 */}
      <div className="px-5 py-5 space-y-4">
        {/* EN line-height */}
        <div>
          <p className="text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-2">
            EN · line-height {lhEN}
          </p>
          <div
            className="text-[18px] text-[var(--color-text-primary)] border-l-2 border-mint-200 pl-3"
            style={{
              fontFamily: lang === "EN" ? "'Mark Pro', system-ui, sans-serif" : "'Noto Sans KR', sans-serif",
              lineHeight: lhEN,
              fontWeight: 400,
            }}
          >
            {sampleEN}
          </div>
        </div>

        {/* KO line-height */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest">
              KO · line-height {lhKO}
            </p>
            <span className="text-[10px] font-semibold text-mint-500 bg-mint-20 px-1.5 py-px rounded-full">
              +0.1
            </span>
          </div>
          <div
            className="text-[18px] text-[var(--color-text-primary)] border-l-2 border-mint-300 pl-3"
            style={{
              fontFamily: "'Noto Sans KR', sans-serif",
              lineHeight: lhKO,
              fontWeight: 400,
            }}
          >
            {sampleKO}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 컴포넌트: 폰트 패밀리 카드 ────────────────────────────────

function FontCard({
  token,
  fontName,
  fontFamily,
  usage,
  weights,
  sample,
}: {
  token: string;
  fontName: string;
  fontFamily: string;
  usage: string;
  weights: { label: string; num: number }[];
  sample: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-base)] overflow-hidden">
      {/* 헤더 */}
      <div className="px-6 pt-6 pb-4 border-b border-[var(--color-border)]">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <code className="text-[11px] font-mono text-mint-500 mb-1 block">{token}</code>
            <p className="text-[22px] font-bold text-[var(--color-text-primary)]">{fontName}</p>
          </div>
          <p className="text-[12px] text-[var(--color-text-secondary)] text-right leading-relaxed max-w-[140px]">
            {usage}
          </p>
        </div>
        {/* Weight chips */}
        <div className="flex flex-wrap gap-2">
          {weights.map((w) => (
            <span
              key={w.num}
              className="text-[11px] font-mono bg-[var(--color-bg-subtle)] border border-[var(--color-border)] px-2.5 py-1 rounded-full"
              style={{
                fontFamily,
                fontWeight: w.num,
                color: "var(--color-text-primary)",
              }}
            >
              {w.label} · {w.num}
            </span>
          ))}
        </div>
      </div>

      {/* 샘플 텍스트 */}
      <div className="px-6 py-6">
        <p
          className="text-[32px] leading-tight text-[var(--color-text-primary)]"
          style={{ fontFamily, fontWeight: 700 }}
        >
          {sample}
        </p>
        <p
          className="text-[18px] mt-3 text-[var(--color-text-secondary)]"
          style={{ fontFamily, fontWeight: 400 }}
        >
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
          <br />
          abcdefghijklmnopqrstuvwxyz 0123456789
        </p>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────

export default function TypographyPage() {
  return (
    <div className="px-8 py-10 max-w-[1000px]">

      {/* 페이지 헤더 */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">
            Foundation
          </span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-primary)] mb-2">
          Typography
        </h1>
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed max-w-[540px]">
          Mark Pro(EN) + Noto Sans KR(KO) 기반 타이포 스케일.
          <br />
          <span className="text-mint-400 font-medium">
            Headline → Title → Body → Label → Caption
          </span>{" "}
          5단계 위계 구조.
        </p>
      </div>

      {/* ── Type Scale ───────────────────────────────────────── */}
      {typeGroups.map((group) => (
        <section key={group.id} className="mb-12">
          <SectionHeader
            eyebrow={group.eyebrow}
            title={group.label}
            desc={group.desc}
          />

          {/* 컬럼 헤더 */}
          <div className="flex items-center gap-6 px-4 pb-2 mb-1 border-b border-[var(--color-border)]">
            <div className="w-[190px] flex-shrink-0">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
                Style · Token
              </span>
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
                Preview
              </span>
            </div>
            <div className="w-[210px] flex-shrink-0 text-right">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
                Specs
              </span>
            </div>
          </div>

          {group.styles.map((style, idx) => (
            <TypeRow
              key={style.token}
              style={style}
              isLast={idx === group.styles.length - 1}
            />
          ))}
        </section>
      ))}

      <div className="border-t border-[var(--color-border)] mb-12" />

      {/* ── EN / KO 분기 설명 ────────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          eyebrow="Language Split"
          title="EN / KO 분기 규칙"
          desc="영문과 한글은 자소 구조 차이로 최적 line-height가 다릅니다. KO는 EN 대비 +0.1 적용."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LangCompareCard
            lang="EN"
            fontName="Mark Pro"
            token="font/family/en"
            lhEN="1.5"
            lhKO="1.6"
            sampleEN="The quick brown fox jumps over the lazy dog."
            sampleKO="한글은 line-height를 +0.1 더 여유 있게 설정합니다."
            licensed
          />

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-base)] overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--color-border)]">
              <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-0.5">
                Rule
              </p>
              <p className="text-[16px] font-bold text-[var(--color-text-primary)]">
                한글 +0.1 규칙
              </p>
            </div>
            <div className="px-5 py-5 space-y-4">
              {[
                { style: "Body LG", en: "1.7", ko: "1.8" },
                { style: "Body MD", en: "1.5", ko: "1.6" },
                { style: "Title LG", en: "1.5", ko: "1.6" },
                { style: "Label MD", en: "1.5", ko: "1.6" },
              ].map((row) => (
                <div key={row.style} className="flex items-center justify-between">
                  <code className="text-[12px] font-mono text-[var(--color-text-primary)]">
                    {row.style}
                  </code>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-[var(--color-text-secondary)]">EN</span>
                      <code className="text-[12px] font-mono font-medium text-[var(--color-text-primary)] bg-[var(--color-bg-subtle)] border border-[var(--color-border)] px-2 py-px rounded-sm">
                        {row.en}
                      </code>
                    </div>
                    <span className="text-[12px] text-[var(--color-text-secondary)]">→</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-[var(--color-text-secondary)]">KO</span>
                      <code className="text-[12px] font-mono font-medium text-mint-500 bg-mint-20 border border-mint-100 px-2 py-px rounded-sm">
                        {row.ko}
                      </code>
                    </div>
                  </div>
                </div>
              ))}

              <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed pt-2 border-t border-[var(--color-border)]">
                한글은 받침이 있어 자소 충돌이 발생하므로 줄 간격을 추가로 확보합니다.
                영문과 동일한 LH를 사용하면 행간이 좁아 가독성이 저하됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[var(--color-border)] mb-12" />

      {/* ── Font Family ──────────────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          eyebrow="Font Family"
          title="Font Family"
          desc="오픈패스 DS는 EN/KO 각각 전용 폰트를 토큰으로 정의합니다."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FontCard
            token="font/family/en"
            fontName="Mark Pro"
            fontFamily="'Mark Pro', system-ui, sans-serif"
            usage="영문 전용. 라이선스 구매 필요."
            weights={[
              { label: "Regular", num: 400 },
              { label: "Medium",  num: 500 },
              { label: "Bold",    num: 700 },
              { label: "Black",   num: 900 },
            ]}
            sample="Openpath Design"
          />

          <FontCard
            token="font/family/ko"
            fontName="Noto Sans KR"
            fontFamily="'Noto Sans KR', sans-serif"
            usage="한글 전용. Google Fonts 제공."
            weights={[
              { label: "Regular", num: 400 },
              { label: "Medium",  num: 500 },
              { label: "Bold",    num: 700 },
              { label: "Black",   num: 900 },
            ]}
            sample="오픈패스 디자인"
          />
        </div>

        {/* 임포트 코드 힌트 */}
        <div className="mt-4 rounded-xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)] px-5 py-4">
          <p className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-2">
            Import — Google Fonts
          </p>
          <code className="text-[13px] font-mono text-[var(--color-text-primary)] leading-relaxed block">
            {`@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap");`}
          </code>
          <p className="text-[12px] text-[var(--color-text-secondary)] mt-2">
            Mark Pro는 라이선스 구매 후 self-host 방식으로 임포트하세요.
          </p>
        </div>
      </section>

    </div>
  );
}
