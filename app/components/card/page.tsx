"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, MoreVertical, Star } from "lucide-react";
import Card, {
  CardMedia, CardContent, CardOverline, CardTitle, CardBody,
  CardDivider, CardActions, CardTrailing,
} from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";

// ─── Shared demo copy ─────────────────────────────────────────

const BODY_SHORT = "카드 컴포넌트는 관련 정보를 그룹화하여 표현합니다.";
const BODY_LONG  =
  "카드 컴포넌트는 관련 정보를 그룹화하여 표현합니다. 이미지, 제목, 본문, 액션 버튼 등 다양한 콘텐츠를 하나의 컨테이너 안에 구조적으로 담을 수 있으며, Elevation 시스템을 통해 레이어 위계를 시각화합니다. 더 많은 내용이 있을 경우 펼치기/접기 기능을 활용하세요.";

// ─── 1. Basic ─────────────────────────────────────────────────

function BasicCard() {
  return (
    <Card interactive>
      <CardMedia />
      <CardContent>
        <CardOverline>Components · Basic</CardOverline>
        <CardTitle>기본 카드</CardTitle>
        <CardBody>{BODY_SHORT}</CardBody>
        <CardActions>
          <Button variant="outlined" size="sm">닫기</Button>
          <Button variant="primary" size="sm">자세히 보기</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

// ─── 2. Expand ────────────────────────────────────────────────

function ExpandCard() {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card>
      <CardMedia />
      <CardContent>
        <CardOverline>Components · Expand</CardOverline>
        <CardTitle>펼치기 카드</CardTitle>
        <CardBody clamped={!expanded}>{BODY_LONG}</CardBody>
        <button
          type="button"
          className="op-card__expand-btn"
          onClick={() => setExpanded(v => !v)}
          aria-expanded={expanded}
        >
          {expanded
            ? <><ChevronUp size={14} /> 접기</>
            : <><ChevronDown size={14} /> 더 보기</>
          }
        </button>
        <CardActions>
          <Button variant="text" size="sm">공유</Button>
          <Button variant="primary" size="sm">확인</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

// ─── 3. Overflow Menu ─────────────────────────────────────────

const MENU_ITEMS = [
  { label: "편집", danger: false },
  { label: "복사", danger: false },
  { label: "공유", danger: false },
  { label: "삭제", danger: true },
];

function OverflowMenuCard() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <Card>
      <CardMedia />
      {/* ⋮ button */}
      <CardTrailing>
        <div ref={menuRef} style={{ position: "relative" }}>
          <button
            type="button"
            className="op-card__overflow-btn"
            aria-label="더 보기 메뉴"
            aria-expanded={open}
            aria-haspopup="menu"
            onClick={() => setOpen(v => !v)}
          >
            <MoreVertical size={18} />
          </button>
          {open && (
            <div className="op-card__overflow-menu" role="menu">
              {MENU_ITEMS.map(item => (
                <button
                  key={item.label}
                  type="button"
                  role="menuitem"
                  className={`op-card__overflow-item${item.danger ? " op-card__overflow-item--danger" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </CardTrailing>
      <CardContent>
        <CardOverline>Components · Overflow Menu</CardOverline>
        <CardTitle>Overflow Menu 카드</CardTitle>
        <CardBody>{BODY_SHORT}</CardBody>
        <CardActions>
          <Button variant="outlined" size="sm">취소</Button>
          <Button variant="primary" size="sm">확인</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

// ─── 4. Stars to Rate ─────────────────────────────────────────

function StarsToRateCard() {
  const [rating, setRating]   = useState(0);
  const [hovered, setHovered] = useState(0);

  const active = hovered || rating;

  return (
    <Card>
      <CardMedia />
      <CardContent>
        <CardOverline>Components · Stars to Rate</CardOverline>
        <CardTitle>별점 카드</CardTitle>
        <CardBody>이 콘텐츠가 도움이 되었나요? 별점을 남겨 주세요.</CardBody>
        <div className="op-card__stars" role="group" aria-label="별점 입력">
          {[1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              type="button"
              className={`op-card__star${active >= n ? " op-card__star--filled" : ""}`}
              aria-label={`${n}점`}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(0)}
            >
              <Star size={24} fill={active >= n ? "currentColor" : "none"} strokeWidth={1.5} />
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p style={{ fontSize: 13, color: "var(--color-text-subtle)" }}>
            {rating}점을 주셨습니다. 감사합니다!
          </p>
        )}
        <CardActions>
          <Button variant="text" size="sm" onClick={() => setRating(0)}>초기화</Button>
          <Button variant="primary" size="sm" disabled={rating === 0}>제출</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

// ─── 5. With Chips ────────────────────────────────────────────

const TAGS = ["디자인 시스템", "컴포넌트", "토큰", "다크 모드"];

function WithChipsCard() {
  return (
    <Card>
      <CardMedia />
      <CardContent>
        <CardOverline>Components · With Chips</CardOverline>
        <CardTitle>칩 포함 카드</CardTitle>
        <CardBody>{BODY_SHORT}</CardBody>
        <div className="op-card__chips">
          {TAGS.map(tag => (
            <Chip key={tag} chipType="assist" label={tag} />
          ))}
        </div>
        <CardDivider />
        <CardActions>
          <Button variant="text" size="sm">공유</Button>
          <Button variant="primary" size="sm">자세히 보기</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

// ─── 6. With Slider ───────────────────────────────────────────

function WithSliderCard() {
  const [volume, setVolume]     = useState(60);
  const [playhead, setPlayhead] = useState(35);

  return (
    <Card>
      <CardMedia />
      <CardContent>
        <CardOverline>Components · With Slider</CardOverline>
        <CardTitle>슬라이더 카드</CardTitle>
        <CardBody>미디어 플레이어 또는 범위 설정에 활용합니다.</CardBody>

        <div>
          <div className="op-card__slider-label">
            <span>재생 위치</span>
            <span>{playhead}%</span>
          </div>
          <input
            type="range"
            className="op-card__slider"
            min={0}
            max={100}
            value={playhead}
            onChange={e => setPlayhead(Number(e.target.value))}
            aria-label="재생 위치"
          />
        </div>

        <div>
          <div className="op-card__slider-label">
            <span>볼륨</span>
            <span>{volume}%</span>
          </div>
          <input
            type="range"
            className="op-card__slider"
            min={0}
            max={100}
            value={volume}
            onChange={e => setVolume(Number(e.target.value))}
            aria-label="볼륨"
          />
        </div>

        <CardActions>
          <Button variant="outlined" size="sm">이전</Button>
          <Button variant="primary" size="sm">재생</Button>
          <Button variant="outlined" size="sm">다음</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────

const VARIANTS = [
  { label: "1. Basic",           Component: BasicCard,         desc: "이미지 + 제목 + 본문 + 액션 버튼" },
  { label: "2. Expand",          Component: ExpandCard,        desc: "긴 본문을 접기/펼치기로 제어" },
  { label: "3. Overflow Menu",   Component: OverflowMenuCard,  desc: "⋮ 버튼으로 카드 레벨 액션 3개 이상 표시" },
  { label: "4. Stars to Rate",   Component: StarsToRateCard,   desc: "별점 입력 — hover 미리보기 포함" },
  { label: "5. With Chips",      Component: WithChipsCard,     desc: "태그·카테고리 Chip 그룹 포함" },
  { label: "6. With Slider",     Component: WithSliderCard,    desc: "미디어 플레이어, 범위 설정용 슬라이더 포함" },
];

export default function CardPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      {/* Header */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
          <span className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight mb-2" style={{ color: "var(--color-text-default)" }}>
          Card
        </h1>
        <p className="text-[16px] leading-relaxed max-w-[560px]" style={{ color: "var(--color-text-subtle)" }}>
          관련 정보를 그룹화하고 계층을 표현하는 컨테이너 컴포넌트.
          <br />
          <span className="text-[var(--color-brand-primary)] font-medium">shadow/01</span> 기본 ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">shadow/02</span> hover ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">radius 16px</span> · 6가지 Variant.
        </p>
      </div>

      {/* Variant Gallery — 2-column grid */}
      <section className="mb-14">
        <div className="mb-6">
          <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Variants</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Variant 갤러리</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>
            Basic · Expand · Overflow Menu · Stars to Rate · With Chips · With Slider
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {VARIANTS.map(({ label, Component, desc }) => (
            <div key={label}>
              <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-text-subtle)" }}>{label}</p>
              <p className="text-[12px] mb-3" style={{ color: "var(--color-text-subtle)" }}>{desc}</p>
              <Component />
            </div>
          ))}
        </div>
      </section>

      {/* Spec */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Spec</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>스펙 테이블</h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[var(--color-border-default)]" style={{ background: "var(--color-bg-subtle)" }}>
                {["속성", "Value", "Token"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--color-text-subtle)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { attr: "내부 패딩",              value: "16px",              token: "space/04" },
                { attr: "콘텐츠 간격",            value: "8px",               token: "space/02" },
                { attr: "액션 버튼 상단 간격",    value: "16px",              token: "space/04" },
                { attr: "Radius",                 value: "16px",              token: "radius/component/card/md" },
                { attr: "기본 Shadow",            value: "0 1px 4px",         token: "elevation/surface/raised → shadow/01" },
                { attr: "Hover Shadow",           value: "0 2px 8px",         token: "elevation/surface/overlay → shadow/02" },
                { attr: "bg",                     value: "White #FFFFFF",      token: "color/bg/default" },
                { attr: "title",                  value: "N600 #29363D",       token: "color/text/default" },
                { attr: "body text",              value: "N300 #889298",       token: "color/text/subtle" },
                { attr: "icon (Overflow)",        value: "N300 #889298",       token: "color/text/subtle" },
                { attr: "divider",                value: "N100 #D8DCDE",       token: "color/border/default" },
                { attr: "star (filled)",          value: "#EE706B",            token: "color/status/warning" },
                { attr: "star (empty)",           value: "N100 #D8DCDE",       token: "color/border/default" },
              ].map((row, i) => (
                <tr key={row.attr} className="border-b border-[var(--color-border-default)] last:border-0" style={{ background: i % 2 === 1 ? "var(--color-bg-subtle)" : undefined }}>
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--color-text-default)" }}>{row.attr}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-interactive-pressed)]">{row.value}</td>
                  <td className="px-4 py-3">
                    <code className="text-[11px] font-mono" style={{ color: "var(--color-text-subtle)" }}>{row.token}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Do / Don't */}
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
                "카드 안에 Primary 버튼은 1개만",
                "Overflow Menu는 액션 3개 이상일 때만",
                "Expand Card는 접힌 상태가 기본",
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
                "카드 하나에 Primary 버튼 여러 개",
                "액션 1~2개인데 Overflow Menu 사용",
                "기본이 펼쳐진 상태인 Expand Card",
              ].map((t, i) => (
                <li key={i} className="flex gap-2 text-[13px]" style={{ color: "var(--color-status-error)" }}>
                  <span className="font-bold shrink-0">✕</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
