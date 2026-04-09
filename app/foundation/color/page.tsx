import type { Metadata } from "next";
import ColorChip from "@/components/ui/ColorChip";
import SemanticTable from "@/components/ui/SemanticTable";

export const metadata: Metadata = {
  title: "Color",
  description: "오픈패스 DS의 컬러 시스템. 3단계 토큰 구조로 설계됨.",
};

// ─── 팔레트 데이터 ───────────────────────────────────────────

const mintPalette = [
  { token: "color/palette/primary/M20",  hex: "#F3FCFC", label: "M20",  usage: "배경 · hover 영역" },
  { token: "color/palette/primary/M50",  hex: "#D6F5F5", label: "M50",  usage: "Subtle 배경" },
  { token: "color/palette/primary/M100", hex: "#A8EBEA", label: "M100" },
  { token: "color/palette/primary/M200", hex: "#6DDEDD", label: "M200" },
  { token: "color/palette/primary/M300", hex: "#28D7D2", label: "M300", usage: "메인 브랜드", badge: "Main Brand", textLight: true },
  { token: "color/palette/primary/M400", hex: "#1BB8B3", label: "M400", usage: "Hover",       textLight: true },
  { token: "color/palette/primary/M500", hex: "#0F9490", label: "M500", usage: "Pressed",     textLight: true },
  { token: "color/palette/primary/M600", hex: "#156565", label: "M600", usage: "Dark 강조",   textLight: true },
];

const coralPalette = [
  { token: "color/palette/duotone/D20",  hex: "#FFF1F1", label: "D20" },
  { token: "color/palette/duotone/D50",  hex: "#FFD6D6", label: "D50" },
  { token: "color/palette/duotone/D300", hex: "#FE6565", label: "D300", usage: "듀오톤 메인 브랜드", badge: "Main Brand", textLight: true },
  { token: "color/palette/duotone/D400", hex: "#E54D4D", label: "D400", usage: "Hover",              textLight: true },
  { token: "color/palette/duotone/D500", hex: "#C93838", label: "D500", usage: "Pressed",            textLight: true },
  { token: "color/palette/duotone/D600", hex: "#A02828", label: "D600", usage: "Dark 강조",          textLight: true },
];

const neutralPalette = [
  { token: "color/palette/neutral/N20",  hex: "#F4F5F5", label: "N20",  usage: "배경" },
  { token: "color/palette/neutral/N100", hex: "#D8DCDE", label: "N100", usage: "Border · Disabled" },
  { token: "color/palette/neutral/N200", hex: "#B0B8BC", label: "N200" },
  { token: "color/palette/neutral/N300", hex: "#889298", label: "N300", usage: "Placeholder · Subtle" },
  { token: "color/palette/neutral/N400", hex: "#60707A", label: "N400" },
  { token: "color/palette/neutral/N500", hex: "#3D5060", label: "N500", textLight: true },
  { token: "color/palette/neutral/N600", hex: "#29363D", label: "N600", usage: "기본 텍스트",        textLight: true },
];

const systemColors = [
  { token: "color/palette/system/red",    hex: "#FF3257", label: "Error",      usage: "Destructive · Alert", textLight: true },
  { token: "color/palette/system/mint",   hex: "#28D7D2", label: "Success",    usage: "완료 · 긍정",          textLight: true },
  { token: "color/palette/system/orange", hex: "#EE706B", label: "Warning",    usage: "주의 · 경고",          textLight: true },
  { token: "color/palette/system/black",  hex: "#151B1E", label: "Path Black", usage: "기본 텍스트 Dark",     textLight: true },
  { token: "color/palette/system/white",  hex: "#FFFFFF", label: "Path White", usage: "기본 텍스트 Light" },
];

// ─── Semantic Token 테이블 데이터 ────────────────────────────

type SemanticRow = {
  group: string;
  token: string;
  lightHex: string;
  darkHex: string;
  lightLabel: string;
  darkLabel: string;
};

const semanticTokens: SemanticRow[] = [
  { group: "brand",       token: "color/brand/primary",        lightHex: "#28D7D2", darkHex: "#28D7D2", lightLabel: "M300",    darkLabel: "M300"    },
  { group: "text",        token: "color/text/default",         lightHex: "#29363D", darkHex: "#FFFFFF", lightLabel: "N600",    darkLabel: "White"   },
  { group: "text",        token: "color/text/subtle",          lightHex: "#889298", darkHex: "#B0B8BC", lightLabel: "N300",    darkLabel: "N200"    },
  { group: "text",        token: "color/text/disabled",        lightHex: "#D8DCDE", darkHex: "#60707A", lightLabel: "N100",    darkLabel: "N400"    },
  { group: "text",        token: "color/text/on-brand",        lightHex: "#FFFFFF", darkHex: "#FFFFFF", lightLabel: "White",   darkLabel: "White"   },
  { group: "bg",          token: "color/bg/default",           lightHex: "#FFFFFF", darkHex: "#29363D", lightLabel: "White",   darkLabel: "N600"    },
  { group: "bg",          token: "color/bg/subtle",            lightHex: "#F4F5F5", darkHex: "#3D5060", lightLabel: "N20",     darkLabel: "N500"    },
  { group: "bg",          token: "color/bg/brand",             lightHex: "#F3FCFC", darkHex: "#156565", lightLabel: "M20",     darkLabel: "M600"    },
  { group: "border",      token: "color/border/default",       lightHex: "#D8DCDE", darkHex: "#60707A", lightLabel: "N100",    darkLabel: "N400"    },
  { group: "border",      token: "color/border/brand",         lightHex: "#28D7D2", darkHex: "#28D7D2", lightLabel: "M300",    darkLabel: "M300"    },
  { group: "status",      token: "color/status/error",         lightHex: "#FF3257", darkHex: "#FF3257", lightLabel: "#FF3257", darkLabel: "#FF3257" },
  { group: "status",      token: "color/status/success",       lightHex: "#28D7D2", darkHex: "#28D7D2", lightLabel: "#28D7D2", darkLabel: "#28D7D2" },
  { group: "status",      token: "color/status/warning",       lightHex: "#EE706B", darkHex: "#EE706B", lightLabel: "#EE706B", darkLabel: "#EE706B" },
  { group: "interactive", token: "color/interactive/primary",  lightHex: "#28D7D2", darkHex: "#28D7D2", lightLabel: "M300",    darkLabel: "M300"    },
  { group: "interactive", token: "color/interactive/hover",    lightHex: "#1BB8B3", darkHex: "#6DDEDD", lightLabel: "M400",    darkLabel: "M200"    },
  { group: "interactive", token: "color/interactive/pressed",  lightHex: "#0F9490", darkHex: "#A8EBEA", lightLabel: "M500",    darkLabel: "M100"    },
  { group: "interactive", token: "color/interactive/disabled", lightHex: "#D8DCDE", darkHex: "#60707A", lightLabel: "N100",    darkLabel: "N400"    },
];

// ─── 섹션 헤더 ───────────────────────────────────────────────

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

// ─── Page ────────────────────────────────────────────────────

export default function ColorPage() {
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
          Color
        </h1>
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed max-w-[520px]">
          오픈패스 DS의 컬러 시스템. 3단계 토큰 구조로 설계됨.
          <br />
          <span className="text-mint-400 font-medium">Palette → Semantic → Component</span> 순서로 참조하세요.
        </p>
      </div>

      {/* ① Openpath Mint */}
      <section className="mb-12">
        <SectionHeader
          eyebrow="Primary Palette"
          title="Openpath Mint"
          desc="오픈패스의 메인 브랜드 컬러. 버튼·링크·강조 요소에 사용합니다."
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {mintPalette.map((c) => (
            <ColorChip key={c.token} {...c} />
          ))}
        </div>
      </section>

      {/* ② Duotone Coral */}
      <section className="mb-12">
        <SectionHeader
          eyebrow="Primary Palette"
          title="Duotone Coral"
          desc="듀오톤 테마의 서브 브랜드 컬러. Openpath Mint와 보색 구성."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {coralPalette.map((c) => (
            <ColorChip key={c.token} {...c} />
          ))}
        </div>
      </section>

      {/* ③ Neutral */}
      <section className="mb-12">
        <SectionHeader
          eyebrow="Neutral Palette"
          title="Neutral"
          desc="텍스트·배경·보더·비활성 요소에 사용하는 무채색 팔레트."
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {neutralPalette.map((c) => (
            <ColorChip key={c.token} {...c} />
          ))}
        </div>
      </section>

      {/* ④ System */}
      <section className="mb-12">
        <SectionHeader
          eyebrow="System"
          title="System Colors"
          desc="상태 표현 전용 컬러. 브랜드 의사소통이 아닌 상태 전달에만 사용합니다."
        />
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {systemColors.map((c) => (
            <ColorChip key={c.token} {...c} />
          ))}
        </div>
      </section>

      <div className="border-t border-[var(--color-border)] mb-12" />

      {/* ⑤ Semantic Token Table */}
      <section>
        <SectionHeader
          eyebrow="Semantic Tokens"
          title="Semantic Token Table"
          desc="Light / Dark 모드별 의미 기반 토큰. 컴포넌트는 Palette 대신 이 값을 참조합니다."
        />
        <SemanticTable rows={semanticTokens} />
      </section>

    </div>
  );
}
