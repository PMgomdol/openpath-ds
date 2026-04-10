import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Principles",
  description: "OpenPath DS 설계 3원칙 — Clarity, Scalability, Autonomy",
};

const principles = [
  {
    en: "Clarity",
    ko: "명료함",
    color: "var(--color-brand-primary)",
    bgColor: "var(--color-bg-brand)",
    borderColor: "var(--color-border-brand)",
    definition: "사람도, AI도 오해 없이 읽을 수 있어야 한다",
    description:
      "모든 UI 결정은 사용자가 즉시 이해할 수 있어야 합니다. 불필요한 장식 없이, 정보 위계만으로 의도를 전달합니다. 컴포넌트 이름, 토큰 이름, 문서 언어 모두 애매함이 없어야 합니다.",
    dos: [
      "명확한 레이블과 아이콘을 함께 사용",
      "정보 위계를 Typography Scale로 표현",
      "에러 메시지에 원인과 해결방법 포함",
      "토큰 이름은 역할을 설명 (e.g. color/text/on-brand)",
    ],
    donts: [
      "색상만으로 상태를 표현",
      "아이콘 전용 버튼에 aria-label 미기재",
      "불필요한 애니메이션으로 주의 분산",
      "약어·은어로 의미가 불분명한 레이블",
    ],
  },
  {
    en: "Scalability",
    ko: "확장성",
    color: "#7B61FF",
    bgColor: "#F5F2FF",
    borderColor: "#D6CCFF",
    definition: "브랜드·모드·플랫폼이 바뀌어도 시스템은 유지된다",
    description:
      "토큰 기반 아키텍처로 설계됩니다. 브랜드가 성장해도 일관성을 잃지 않고, 새로운 제품에 즉시 적용할 수 있습니다. CSS 변수 교체만으로 전체 브랜드가 전환됩니다.",
    dos: [
      "모든 값을 CSS 변수(토큰)로 참조",
      "컴포넌트는 외부 상태를 props로만 받음",
      "다크모드는 컴포넌트 복제 없이 변수 교체로",
      "Global → Semantic → Component 3단계 토큰",
    ],
    donts: [
      "색상·크기 하드코딩 (#28D7D2, 16px)",
      "특정 테마 전용 컴포넌트 별도 제작",
      "다크모드용 컴포넌트 클래스 중복 생성",
      "토큰 없이 magic number 직접 사용",
    ],
  },
  {
    en: "Autonomy",
    ko: "자립성",
    color: "#FF6B6B",
    bgColor: "#FFF2F2",
    borderColor: "#FFD0D0",
    definition: "이 DS를 가진 디자이너는 혼자서도 일관된 제품을 만들 수 있다",
    description:
      "디자이너와 개발자 모두 DS를 독립적으로 운용할 수 있도록 문서화합니다. 의존 없이 스스로 결정하는 팀을 만듭니다. 스펙이 모호하면 DS가 결정 기준이 됩니다.",
    dos: [
      "컴포넌트별 Do/Don't 가이드 제공",
      "State별 색상·크기 스펙 명시",
      "Figma 컴포넌트와 코드 1:1 대응",
      "접근성 체크리스트 문서화",
    ],
    donts: [
      "\"적당히\" 같은 모호한 스펙",
      "구두로만 전달되는 디자인 결정",
      "최신 버전 미동기화 상태 방치",
      "컴포넌트 외부에서 직접 스타일 override",
    ],
  },
];

export default function PrinciplesPage() {
  return (
    <div className="px-8 py-10 max-w-[860px]">
      {/* Header */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
          <span className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest">Foundation</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-default)] mb-2">Principles</h1>
        <p className="text-[16px] text-[var(--color-text-subtle)] leading-relaxed max-w-[520px]">
          OpenPath DS를 관통하는 3가지 설계 원칙. 모든 컴포넌트 결정의 근거가 됩니다.
        </p>
      </div>

      {/* Principles */}
      <div className="flex flex-col gap-10">
        {principles.map((p, idx) => (
          <section key={p.en} className="rounded-xl border overflow-hidden" style={{ borderColor: p.borderColor }}>
            {/* Card header */}
            <div className="px-6 py-5 border-b" style={{ background: p.bgColor, borderColor: p.borderColor }}>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: p.color }}>
                  0{idx + 1}
                </span>
                <h2 className="text-[24px] font-black" style={{ color: p.color }}>{p.en}</h2>
                <span className="text-[16px] font-bold text-[var(--color-text-default)]">— {p.ko}</span>
              </div>
              <p className="text-[14px] font-medium text-[var(--color-text-subtle)] italic">&ldquo;{p.definition}&rdquo;</p>
            </div>

            {/* Description + Do/Don't */}
            <div className="px-6 py-5 bg-[var(--color-bg-default)]">
              <p className="text-[14px] text-[var(--color-text-subtle)] leading-relaxed mb-6">{p.description}</p>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Do */}
                <div className="rounded-lg border border-[var(--color-border-default)] overflow-hidden">
                  <div className="px-4 py-2 bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-brand-primary)]">✓ Do</span>
                  </div>
                  <ul className="px-4 py-3 space-y-2">
                    {p.dos.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-[13px] text-[var(--color-text-default)]">
                        <span className="text-[var(--color-brand-primary)] mt-0.5 shrink-0">›</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Don't */}
                <div className="rounded-lg border border-[var(--color-border-default)] overflow-hidden">
                  <div className="px-4 py-2 bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-status-error)]">✕ Don&apos;t</span>
                  </div>
                  <ul className="px-4 py-3 space-y-2">
                    {p.donts.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-[13px] text-[var(--color-text-default)]">
                        <span className="text-[var(--color-status-error)] mt-0.5 shrink-0">›</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
