import Link from "next/link";
import { ArrowRight, Zap, Layers, User } from "lucide-react";

const principles = [
  {
    icon: <Zap size={22} strokeWidth={2} />,
    en: "Clarity",
    ko: "명료함",
    description:
      "모든 UI 결정은 사용자가 즉시 이해할 수 있어야 합니다. 불필요한 장식 없이, 정보 위계만으로 의도를 전달합니다.",
    accent: "from-mint-300 to-mint-400",
    bg: "bg-mint-20 dark:bg-mint-600/10",
    border: "border-mint-100 dark:border-mint-600/30",
  },
  {
    icon: <Layers size={22} strokeWidth={2} />,
    en: "Scalability",
    ko: "확장성",
    description:
      "토큰 기반 아키텍처로 설계됩니다. 브랜드가 성장해도 일관성을 잃지 않고, 새로운 제품에 즉시 적용할 수 있습니다.",
    accent: "from-[#7B61FF] to-[#5B41DF]",
    bg: "bg-[#F5F2FF] dark:bg-[#7B61FF]/10",
    border: "border-[#D6CCFF] dark:border-[#7B61FF]/30",
  },
  {
    icon: <User size={22} strokeWidth={2} />,
    en: "Autonomy",
    ko: "자립성",
    description:
      "디자이너와 개발자 모두 DS를 독립적으로 운용할 수 있도록 문서화합니다. 의존 없이 스스로 결정하는 팀을 만듭니다.",
    accent: "from-[#FF6B6B] to-[#EE4444]",
    bg: "bg-[#FFF2F2] dark:bg-[#FF6B6B]/10",
    border: "border-[#FFD0D0] dark:border-[#FF6B6B]/30",
  },
];

const quickLinks = [
  { label: "컬러 팔레트", href: "/foundation/color", desc: "민트 팔레트 & 중립색" },
  { label: "타이포그래피", href: "/foundation/typography", desc: "Headline · Body · Label" },
  { label: "버튼 컴포넌트", href: "/components/button", desc: "라이브 데모 + 스펙" },
  { label: "전체 토큰", href: "/tokens", desc: "복사 가능한 토큰 테이블" },
];

export default function HomePage() {
  return (
    <div className="px-8 py-12 max-w-[900px]">

      {/* Hero */}
      <section className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint-20 dark:bg-mint-600/15 border border-mint-100 dark:border-mint-600/30 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-mint-300 animate-pulse" />
          <span className="text-[12px] font-semibold text-mint-500 dark:text-mint-300 tracking-wide">
            v0.1.0 — 기반 구조 구축 중
          </span>
        </div>

        <h1 className="text-[48px] leading-[1.15] font-black text-[var(--color-text-primary)] tracking-tight mb-4">
          오픈패스{" "}
          <span className="text-mint-300">디자인 시스템</span>
        </h1>
        <p className="text-[18px] text-[var(--color-text-secondary)] leading-relaxed max-w-[560px] mb-8">
          명료함, 확장성, 자립성 위에 설계된 교육 브랜드 범용 DS.
          <br />
          토큰 기반으로 일관된 UI를 빠르게 구축합니다.
        </p>

        <div className="flex items-center gap-3">
          <Link
            href="/foundation/color"
            className="
              inline-flex items-center gap-2
              px-5 py-2.5 rounded-md
              bg-mint-300 hover:bg-mint-400
              text-white text-[15px] font-semibold
              transition-colors duration-150
              shadow-elevation-1
            "
          >
            시작하기
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
          <Link
            href="/tokens"
            className="
              inline-flex items-center gap-2
              px-5 py-2.5 rounded-md
              text-[15px] font-semibold
              text-[var(--color-text-primary)]
              border border-[var(--color-border)]
              hover:border-mint-300 hover:text-mint-400
              transition-colors duration-150
            "
          >
            토큰 보기
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-[var(--color-border)] mb-12" />

      {/* Principles */}
      <section className="mb-16">
        <div className="mb-6">
          <p className="text-[12px] font-semibold text-mint-300 uppercase tracking-widest mb-1">
            Design Principles
          </p>
          <h2 className="text-[24px] font-bold text-[var(--color-text-primary)]">
            3가지 설계 원칙
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {principles.map((p) => (
            <div
              key={p.en}
              className={`
                group rounded-xl p-5
                ${p.bg} border ${p.border}
                transition-all duration-200
                hover:shadow-elevation-2 hover:-translate-y-0.5
              `}
            >
              {/* Icon */}
              <div
                className={`
                  inline-flex items-center justify-center
                  w-10 h-10 rounded-lg mb-4
                  bg-gradient-to-br ${p.accent}
                  text-white
                `}
              >
                {p.icon}
              </div>

              <p className="text-[12px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-0.5">
                {p.en}
              </p>
              <h3 className="text-[18px] font-bold text-[var(--color-text-primary)] mb-2">
                {p.ko}
              </h3>
              <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <div className="mb-6">
          <p className="text-[12px] font-semibold text-mint-300 uppercase tracking-widest mb-1">
            Quick Links
          </p>
          <h2 className="text-[24px] font-bold text-[var(--color-text-primary)]">
            바로 탐색하기
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="
                group flex flex-col gap-1
                p-4 rounded-lg
                border border-[var(--color-border)]
                bg-[var(--color-bg-base)]
                hover:border-mint-300 hover:shadow-elevation-1
                transition-all duration-150
              "
            >
              <span className="text-[14px] font-semibold text-[var(--color-text-primary)] group-hover:text-mint-400 transition-colors">
                {link.label}
              </span>
              <span className="text-[12px] text-[var(--color-text-secondary)]">
                {link.desc}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <div className="mt-16 pt-8 border-t border-[var(--color-border)]">
        <p className="text-[13px] text-[var(--color-text-secondary)]">
          OpenPath Design System · Built with Next.js + Tailwind CSS
        </p>
      </div>
    </div>
  );
}
