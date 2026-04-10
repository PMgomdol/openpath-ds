import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Token",
  description: "OpenPath DS 3단계 토큰 구조 — Global, Semantic, Component",
};

function TokenRow({ from, to, desc }: { from: string; to: string; desc: string }) {
  return (
    <tr className="border-b border-[var(--color-border-default)] last:border-0">
      <td className="px-5 py-3 font-mono text-[12px] text-[var(--color-text-subtle)]">{from}</td>
      <td className="px-5 py-3 text-[var(--color-text-subtle)] text-[13px]">→</td>
      <td className="px-5 py-3 font-mono text-[12px] text-[var(--color-brand-primary)]">{to}</td>
      <td className="px-5 py-3 text-[13px] text-[var(--color-text-subtle)]">{desc}</td>
    </tr>
  );
}

export default function DesignTokenPage() {
  return (
    <div className="px-8 py-10 max-w-[860px]">
      {/* Header */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
          <span className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest">Foundation</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-default)] mb-2">Design Token</h1>
        <p className="text-[16px] text-[var(--color-text-subtle)] leading-relaxed max-w-[520px]">
          디자인 의사결정을 코드로 저장한 최소 단위. 3단계 구조로 재사용성과 테마 전환을 동시에 달성합니다.
        </p>
      </div>

      {/* 3-tier overview */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Architecture</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">3단계 토큰 구조</h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {[
            {
              step: "01",
              name: "Global Token",
              desc: "팔레트 원시값. 의미 없이 값만 존재.",
              example: "color/palette/primary/M300 = #28D7D2\ncolor/palette/neutral/N600 = #29363D",
              color: "var(--color-brand-primary)",
              bg: "var(--color-bg-brand)",
            },
            {
              step: "02",
              name: "Semantic Token",
              desc: "역할과 의미를 부여. 컨텍스트를 설명.",
              example: "color/brand/primary = M300\ncolor/text/on-brand = N600",
              color: "#7B61FF",
              bg: "#F5F2FF",
            },
            {
              step: "03",
              name: "Component Token",
              desc: "특정 컴포넌트에만 사용. Semantic 참조.",
              example: "color/component/button/primary/bg = brand/primary\ncolor/component/button/primary/text = text/on-brand",
              color: "#FF6B6B",
              bg: "#FFF2F2",
            },
          ].map((tier) => (
            <div key={tier.step} className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--color-border-default)]" style={{ background: tier.bg }}>
                <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: tier.color }}>{tier.step}</span>
                <p className="text-[15px] font-bold text-[var(--color-text-default)] mt-0.5">{tier.name}</p>
              </div>
              <div className="px-4 py-3 bg-[var(--color-bg-default)]">
                <p className="text-[13px] text-[var(--color-text-subtle)] mb-3">{tier.desc}</p>
                <pre className="text-[11px] font-mono text-[var(--color-text-subtle)] bg-[var(--color-bg-subtle)] rounded-md px-3 py-2 leading-relaxed overflow-x-auto whitespace-pre-wrap">{tier.example}</pre>
              </div>
            </div>
          ))}
        </div>

        {/* Arrow diagram */}
        <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-subtle)] p-6">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {["Global\n(팔레트 원시값)", "Semantic\n(역할·의미 부여)", "Component\n(컴포넌트 전용)"].map((label, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-brand-primary)] text-[var(--color-text-on-brand)] font-bold text-[13px] mb-1">
                    {i + 1}
                  </div>
                  <p className="text-[11px] font-semibold text-[var(--color-text-default)] whitespace-pre-line leading-tight">{label}</p>
                </div>
                {i < 2 && <span className="text-[var(--color-brand-primary)] text-[20px] font-bold">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Semantic Token Examples */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Mapping</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">Global → Semantic 매핑 예시</h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                {["Global Token", "", "Semantic Token", "역할"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <TokenRow from="palette/primary/M300 (#28D7D2)" to="color/brand/primary"        desc="메인 브랜드 색상" />
              <TokenRow from="palette/primary/M300"           to="color/interactive/primary"   desc="버튼·링크 기본" />
              <TokenRow from="palette/primary/M400"           to="color/interactive/hover"     desc="Hover 상태" />
              <TokenRow from="palette/primary/M500"           to="color/interactive/pressed"   desc="Pressed 상태" />
              <TokenRow from="palette/neutral/N600 (#29363D)" to="color/text/default"          desc="기본 텍스트" />
              <TokenRow from="palette/neutral/N300"           to="color/text/subtle"           desc="보조 텍스트" />
              <TokenRow from="palette/neutral/N100"           to="color/text/disabled"         desc="비활성 텍스트" />
              <TokenRow from="palette/neutral/N600"           to="color/text/on-brand"         desc="민트 배경 위 텍스트 (AA 통과)" />
              <TokenRow from="system/white (#FFFFFF)"         to="color/bg/default"            desc="기본 배경" />
              <TokenRow from="palette/neutral/N20"            to="color/bg/subtle"             desc="Subtle 배경" />
              <TokenRow from="palette/primary/M20"            to="color/bg/brand"              desc="브랜드 Subtle 배경" />
              <TokenRow from="palette/neutral/N100"           to="color/border/default"        desc="기본 테두리" />
              <TokenRow from="system/red (#FF3257)"           to="color/status/error"          desc="에러 상태" />
            </tbody>
          </table>
        </div>
      </section>

      {/* Theme switching */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Theming</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">토큰으로 테마 전환</h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">Semantic 토큰만 교체하면 전체 컴포넌트 색상이 바뀝니다.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              name: "Openpath (민트)",
              tokens: [
                ["--color-brand-primary", "#28D7D2"],
                ["--color-interactive-primary", "#28D7D2"],
                ["--color-interactive-hover", "#1BB8B3"],
                ["--color-interactive-pressed", "#0F9490"],
                ["--color-bg-brand", "#F3FCFC"],
              ],
            },
            {
              name: "Duotone (코랄)",
              tokens: [
                ["--color-brand-primary", "#FE6565"],
                ["--color-interactive-primary", "#FE6565"],
                ["--color-interactive-hover", "#E54D4D"],
                ["--color-interactive-pressed", "#C93838"],
                ["--color-bg-brand", "#FFF1F1"],
              ],
            },
          ].map((theme) => (
            <div key={theme.name} className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
              <div className="px-4 py-2 bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                <p className="text-[12px] font-bold text-[var(--color-text-default)]">{theme.name}</p>
              </div>
              <ul className="px-4 py-3 space-y-1.5">
                {theme.tokens.map(([token, value]) => (
                  <li key={token} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-sm shrink-0 border border-[var(--color-border-default)]" style={{ background: value }} />
                    <span className="font-mono text-[11px] text-[var(--color-text-subtle)] flex-1 truncate">{token}</span>
                    <span className="font-mono text-[11px] text-[var(--color-brand-primary)]">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
