"use client";

import { useState } from "react";
import {
  Map, Sparkles, Calendar, Bell, Search, Tag, User, Settings,
} from "lucide-react";
import Chip from "@/components/ui/Chip";
import CodeBlock from "@/components/ui/CodeBlock";

// ── Code snippets ──────────────────────────────────────────────
const CHIP_SNIPPETS = [
  {
    label: "Filter",
    code: `import { useState } from "react";
import Chip from "@/components/ui/Chip";

const FILTERS = ["전체", "디자인", "개발", "마케팅"];

export function FilterBar() {
  const [selected, setSelected] = useState<string[]>(["전체"]);

  const toggle = (label: string) =>
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );

  return (
    <div style={{ display: "flex", gap: 8 }}>
      {FILTERS.map((f) => (
        <Chip
          key={f}
          chipType="filter"
          label={f}
          selected={selected.includes(f)}
          onToggle={() => toggle(f)}
        />
      ))}
    </div>
  );
}`,
  },
  {
    label: "Input",
    code: `import { useState } from "react";
import Chip from "@/components/ui/Chip";

export function TagInput() {
  const [tags, setTags] = useState(["React", "TypeScript"]);
  const remove = (tag: string) => setTags((t) => t.filter((x) => x !== tag));

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {tags.map((tag) => (
        <Chip
          key={tag}
          chipType="input"
          label={tag}
          onRemove={() => remove(tag)}
        />
      ))}
    </div>
  );
}`,
  },
  {
    label: "Assist / Suggestion",
    code: `import Chip from "@/components/ui/Chip";
import { Map, Calendar, Sparkles } from "lucide-react";

// Assist — action shortcut
<Chip chipType="assist" label="지도에서 보기" icon={<Map size={18} />} onClick={() => {}} />

// Suggestion — system-generated options
<Chip chipType="suggestion" label="내일 일정 추가" icon={<Calendar size={18} />} onClick={() => {}} />
<Chip chipType="suggestion" label="AI 추천" icon={<Sparkles size={18} />} onClick={() => {}} />`,
  },
];

// ─── Filter demo (multi-select) ───────────────────────────────

const FILTER_OPTIONS = ["전체", "디자인", "개발", "마케팅", "기획", "UX 리서치"];

function FilterDemo() {
  const [selected, setSelected] = useState<string[]>(["전체"]);

  const toggle = (f: string) =>
    setSelected(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    );

  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_OPTIONS.map(f => (
        <Chip
          key={f}
          chipType="filter"
          label={f}
          selected={selected.includes(f)}
          onToggle={() => toggle(f)}
        />
      ))}
    </div>
  );
}

// ─── Input chip (tag entry) demo ──────────────────────────────

function InputChipDemo() {
  const [tags, setTags] = useState(["React", "TypeScript", "Design System"]);
  const [value, setValue] = useState("");

  const add = () => {
    const v = value.trim();
    if (v && !tags.includes(v)) setTags(t => [...t, v]);
    setValue("");
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3 min-h-[36px]">
        {tags.map(tag => (
          <Chip
            key={tag}
            chipType="input"
            label={tag}
            onRemove={() => setTags(t => t.filter(x => x !== tag))}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === "Enter" && add()}
          placeholder="태그 입력 후 Enter"
          style={{
            flex: 1,
            height: 32,
            padding: "0 12px",
            borderRadius: 9999,
            border: "1px solid var(--color-border-default)",
            background: "var(--color-bg-default)",
            color: "var(--color-text-default)",
            fontSize: 14,
            outline: "none",
            fontFamily: "inherit",
          }}
          onFocus={e => (e.currentTarget.style.borderColor = "var(--color-border-brand)")}
          onBlur={e => (e.currentTarget.style.borderColor = "var(--color-border-default)")}
        />
        <Chip chipType="assist" label="추가" onClick={add} />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function ChipsPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      {/* Header */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
          <span className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight mb-2" style={{ color: "var(--color-text-default)" }}>
          Chips
        </h1>
        <p className="text-[16px] leading-relaxed max-w-[520px]" style={{ color: "var(--color-text-subtle)" }}>
          짧은 정보, 필터, 태그를 표현하는 소형 컴포넌트.
          <br />
          <span className="text-[var(--color-brand-primary)] font-medium">Assist</span> ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">Filter</span> ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">Input</span> ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">Suggestion</span>
        </p>

        {/* Type guide table */}
        <div className="mt-5 overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[var(--color-border-default)]" style={{ background: "var(--color-bg-subtle)" }}>
                {["Type", "설명", "사용 시점"].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--color-text-subtle)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Assist",     "액션을 제안하는 칩. 아이콘 선택 가능",         "컨텍스트에 맞는 빠른 액션 (예: \"지도 열기\")"],
                ["Filter",     "콘텐츠 필터링. 선택 시 체크 표시",             "목록/검색 결과 필터 (예: 카테고리, 태그)"],
                ["Input",      "입력된 값을 태그처럼 표시. X 버튼 포함",       "선택한 항목 시각화 (예: 이메일 수신자, 검색 태그)"],
                ["Suggestion", "AI/시스템이 제안하는 자동완성 칩",             "검색창 아래 추천어, 챗봇 빠른 답변"],
              ].map(([type, desc, when], i) => (
                <tr key={type} className="border-b border-[var(--color-border-default)] last:border-0" style={{ background: i % 2 === 1 ? "var(--color-bg-subtle)" : undefined }}>
                  <td className="px-4 py-2.5 font-semibold text-[var(--color-interactive-pressed)]">{type}</td>
                  <td className="px-4 py-2.5" style={{ color: "var(--color-text-default)" }}>{desc}</td>
                  <td className="px-4 py-2.5" style={{ color: "var(--color-text-subtle)" }}>{when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Assist ── */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Assist Chip</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Assist</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>빠른 액션 제안. 아이콘 있거나 없거나 모두 가능.</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] p-5" style={{ background: "var(--color-bg-subtle)" }}>
          <div className="flex flex-wrap gap-2 mb-4">
            <Chip chipType="assist" label="지도 열기" icon={<Map size={18} />} />
            <Chip chipType="assist" label="일정 추가" icon={<Calendar size={18} />} />
            <Chip chipType="assist" label="알림 설정" icon={<Bell size={18} />} />
            <Chip chipType="assist" label="텍스트만" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip chipType="assist" label="비활성 (아이콘)" icon={<Map size={18} />} disabled />
            <Chip chipType="assist" label="비활성 (텍스트)" disabled />
          </div>
        </div>
      </section>

      {/* ── Filter ── */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Filter Chip</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Filter</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>
            멀티 선택 가능 · 선택 시 체크마크 표시 · <code className="text-[12px] font-mono">aria-pressed</code>
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] p-5" style={{ background: "var(--color-bg-subtle)" }}>
          <FilterDemo />
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[var(--color-border-default)]">
            <span className="text-[11px] font-semibold uppercase tracking-widest self-center mr-1" style={{ color: "var(--color-text-subtle)" }}>Disabled</span>
            <Chip chipType="filter" label="비활성 (Unselected)" disabled />
            <Chip chipType="filter" label="비활성 (Selected)" selected disabled />
          </div>
        </div>
      </section>

      {/* ── Input ── */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Input Chip</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Input</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>입력된 값을 태그로 표시. X 버튼으로 제거.</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] p-5" style={{ background: "var(--color-bg-subtle)" }}>
          <InputChipDemo />
        </div>
      </section>

      {/* ── Suggestion ── */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Suggestion Chip</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Suggestion</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>AI/시스템이 제안하는 자동완성 옵션.</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] p-5" style={{ background: "var(--color-bg-subtle)" }}>
          <div className="mb-2 text-[12px]" style={{ color: "var(--color-text-subtle)" }}>검색 추천어</div>
          <div className="flex flex-wrap gap-2">
            <Chip chipType="suggestion" label="디자인 시스템" icon={<Search size={18} />} />
            <Chip chipType="suggestion" label="컴포넌트 라이브러리" icon={<Sparkles size={18} />} />
            <Chip chipType="suggestion" label="토큰 시스템" icon={<Tag size={18} />} />
            <Chip chipType="suggestion" label="다크 모드" />
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--color-border-default)]">
            <div className="mb-2 text-[12px]" style={{ color: "var(--color-text-subtle)" }}>챗봇 빠른 답변</div>
            <div className="flex flex-wrap gap-2">
              <Chip chipType="suggestion" label="네, 진행할게요" />
              <Chip chipType="suggestion" label="다시 시도" />
              <Chip chipType="suggestion" label="취소" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Spec ── */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Spec</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>스펙 테이블</h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[var(--color-border-default)]" style={{ background: "var(--color-bg-subtle)" }}>
                {["속성", "State", "Value", "Token"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--color-text-subtle)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { attr: "높이",          state: "—",               value: "32px",          token: "—" },
                { attr: "패딩 좌우",     state: "—",               value: "12px",          token: "space/03" },
                { attr: "Radius",        state: "—",               value: "9999px",        token: "radius/component/chip" },
                { attr: "폰트",          state: "—",               value: "14px Medium",   token: "type/label/md" },
                { attr: "아이콘 크기",   state: "—",               value: "18px",          token: "—" },
                { attr: "아이콘 간격",   state: "—",               value: "4px",           token: "space/01" },
                { attr: "bg",            state: "Enabled",         value: "White",         token: "color/bg/default" },
                { attr: "bg",            state: "Hover / Pressed", value: "N20 #F4F5F5",   token: "color/bg/subtle" },
                { attr: "bg",            state: "Selected (Filter)",value: "M20 #F3FCFC",  token: "color/bg/brand" },
                { attr: "bg",            state: "Disabled",        value: "N20 #F4F5F5",   token: "color/bg/subtle" },
                { attr: "border",        state: "Enabled",         value: "N100 #D8DCDE",  token: "color/border/default" },
                { attr: "border",        state: "Hover",           value: "N300 #889298",  token: "color/border/hover" },
                { attr: "border",        state: "Focused / Selected",value: "M300 #28D7D2",token: "color/border/brand" },
                { attr: "label",         state: "Enabled",         value: "N600 #29363D",  token: "color/text/default" },
                { attr: "label",         state: "Selected",        value: "M300 #28D7D2",  token: "color/brand/primary" },
                { attr: "label",         state: "Disabled",        value: "N100 #D8DCDE",  token: "color/text/disabled" },
                { attr: "X 아이콘",      state: "Input",           value: "N300 #889298",  token: "color/text/subtle" },
              ].map((row, i) => (
                <tr key={`${row.attr}-${row.state}`} className="border-b border-[var(--color-border-default)] last:border-0" style={{ background: i % 2 === 1 ? "var(--color-bg-subtle)" : undefined }}>
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--color-text-default)" }}>{row.attr}</td>
                  <td className="px-4 py-3 text-[12px]" style={{ color: "var(--color-text-subtle)" }}>{row.state}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-interactive-pressed)]">{row.value}</td>
                  <td className="px-4 py-3">
                    {row.token !== "—"
                      ? <code className="text-[11px] font-mono" style={{ color: "var(--color-text-subtle)" }}>{row.token}</code>
                      : <span style={{ color: "var(--color-border-default)" }}>—</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Do / Don't ── */}
      <section className="mb-16">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Guidelines</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Do / Don't</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border-2 border-[var(--color-border-brand)] p-5" style={{ background: "var(--color-bg-brand)" }}>
            <p className="text-[14px] font-bold text-[var(--color-brand-primary)] mb-3">✓ Do</p>
            <ul className="space-y-2">
              {[
                "Filter Chip은 복수 선택 가능하게",
                "Input Chip은 반드시 X 버튼으로 삭제 가능하게",
                "Chip 라벨은 짧게 (최대 2~3 단어)",
              ].map((t, i) => (
                <li key={i} className="flex gap-2 text-[13px]" style={{ color: "var(--color-text-default)" }}>
                  <span className="text-[var(--color-brand-primary)] font-bold shrink-0">✓</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-2 p-5" style={{ borderColor: "var(--color-status-error)", background: "var(--color-bg-error)" }}>
            <p className="text-[14px] font-bold mb-3" style={{ color: "var(--color-status-error)" }}>✕ Don't</p>
            <ul className="space-y-2">
              {[
                "Filter Chip을 Radio처럼 단일 선택 강제",
                "Input Chip을 클릭해도 삭제 안 되게",
                "긴 문장을 Chip 라벨로 사용",
              ].map((t, i) => (
                <li key={i} className="flex gap-2 text-[13px]" style={{ color: "var(--color-status-error)" }}>
                  <span className="font-bold shrink-0">✕</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CodeBlock snippets={CHIP_SNIPPETS} />
    </div>
  );
}
