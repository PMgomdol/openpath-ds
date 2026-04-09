# Button 컴포넌트

## 개요

버튼은 사용자 액션을 트리거합니다. 위계에 따라 **Primary / Secondary / Text / Destructive** 4가지 변형을 사용합니다.

---

## 변형 (Variant)

| Variant | 용도 | 배경 | 텍스트 |
|---|---|---|---|
| Primary | 핵심 액션 (1개/뷰) | `--color-brand` | `--color-text-on-brand` |
| Secondary | 보조 액션 | 투명 | `--color-brand` |
| Text | 낮은 강조 | 투명 | `--color-brand` |
| Destructive | 위험 액션 (삭제 등) | `--color-error` | `#FFFFFF` |

---

## 크기 (Size)

| Size | Height | Padding H | Font | Radius |
|---|---|---|---|---|
| Small (S) | 32px | 12px | 13px / 500 | `--radius-xs` (4px) |
| Medium (M) | 40px | 16px | 15px / 600 | `--radius-sm` (8px) |
| Large (L) | 48px | 20px | 16px / 600 | `--radius-sm` (8px) |

---

## 상태 (State)

| 상태 | Primary | Secondary |
|---|---|---|
| Default | `--color-brand` bg | border `--color-brand` |
| Hover | `--color-brand-hover` bg | bg `--color-bg-brand` |
| Pressed | `--color-brand-pressed` bg | border `--color-brand-pressed` |
| Disabled | `--color-interactive-disabled` bg | border `--color-border` |
| Loading | Spinner 표시, 클릭 불가 | — |

> Disabled 상태: `opacity: 1` 유지, 색상 토큰으로만 표현. `cursor: not-allowed`.

---

## 아이콘

- 아이콘 크기: **20px** (Small: 16px)
- 아이콘-라벨 간격: `--space-02` (8px)
- 위치: Leading (왼쪽) 또는 Trailing (오른쪽)
- Icon-only 버튼: 정사각형, `aria-label` 필수

---

## 토큰 참조

```css
/* Primary Button */
background: var(--color-brand);
color: var(--color-text-on-brand);
border-radius: var(--radius-sm);

/* Hover */
background: var(--color-brand-hover);

/* Pressed */
background: var(--color-brand-pressed);

/* Disabled */
background: var(--color-interactive-disabled);
cursor: not-allowed;
```

---

## 코드 스니펫

```tsx
// Primary
<button className="op-btn op-btn--primary op-btn--md">
  시작하기
</button>

// Secondary
<button className="op-btn op-btn--secondary op-btn--md">
  더 알아보기
</button>

// With icon
<button className="op-btn op-btn--primary op-btn--md">
  <ArrowRight size={20} />
  다음 단계
</button>

// Disabled
<button className="op-btn op-btn--primary op-btn--md" disabled>
  비활성
</button>
```

---

## Do / Don't

| Do | Don't |
|---|---|
| 한 뷰에 Primary 버튼 1개 | Primary 버튼 여러 개 |
| 명확한 동사형 라벨 ("저장", "제출") | 모호한 라벨 ("확인", "OK") |
| 아이콘은 의미를 보완할 때 | 장식 목적 아이콘 |
| Destructive 전 확인 Dialog | Destructive 즉시 실행 |

---

## 접근성

- `<button>` 태그 사용 (div/span 금지)
- Icon-only: `aria-label` 필수
- Disabled: `disabled` 속성 or `aria-disabled="true"`
- Focus ring: `--color-border-brand` 2px outline, offset 2px
