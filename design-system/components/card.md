# Card 컴포넌트

## 개요

카드는 관련 정보를 그룹화하는 컨테이너입니다. 리스트, 그리드, 대시보드에서 사용합니다.

---

## 변형 (Variant)

| Variant | 배경 | 테두리 | 그림자 |
|---|---|---|---|
| Elevated | `--color-bg` | 없음 | `--shadow-01` |
| Outlined | `--color-bg` | `--color-border` | 없음 |
| Filled | `--color-bg-subtle` | 없음 | 없음 |
| Brand | `--color-bg-brand` | `--color-border-brand` | 없음 |

---

## 크기 & 간격

| 속성 | 값 |
|---|---|
| Radius (기본) | `--radius-lg` (16px) |
| Radius (소형) | `--radius-md` (12px) |
| Padding (기본) | `--space-06` (24px) |
| Padding (소형) | `--space-04` (16px) |
| Padding (대형) | `--space-07` (32px) |

---

## 카드 구조 (Anatomy)

```
┌──────────────────────────────────────┐
│ [Media / 상단 이미지]                 │
├──────────────────────────────────────┤
│ [Header]                              │
│   [Category / Eyebrow]  [Chip]       │
│   [Title]                            │
│   [Subtitle]                         │
├──────────────────────────────────────┤
│ [Body]                                │
│   [Description text]                 │
│   [Metadata items]                   │
├──────────────────────────────────────┤
│ [Footer]                              │
│   [Action Buttons]    [Date / Info]  │
└──────────────────────────────────────┘
```

- **Category (Eyebrow)**: 12px / 500, `--color-text-subtle`, `--space-01` 아래 간격
- **Title**: 18px / 700 (Title SM)
- **Subtitle**: 14px / 400, `--color-text-subtle`
- **Body**: 14px / 400, `--color-text-subtle`, line-height 1.6
- **Footer**: Card 하단 `--space-04` 상단 패딩, border-top `--color-border`

---

## 상태

| 상태 | 변화 |
|---|---|
| Default | 기본 |
| Hover (클릭 가능) | `--shadow-02` + `translateY(-2px)` |
| Pressed | `translateY(0)` |
| Selected | `--color-border-brand` + `--color-bg-brand` |
| Disabled | `opacity: 0.5` |

> 클릭 가능한 카드에만 Hover/Pressed 상태 적용.

---

## 토큰 참조

```css
/* Elevated */
background: var(--color-bg);
border-radius: var(--radius-lg);
padding: var(--space-06);
box-shadow: var(--shadow-01);

/* Hover (clickable) */
box-shadow: var(--shadow-02);
transform: translateY(-2px);
transition: all 0.2s ease;

/* Outlined */
background: var(--color-bg);
border: 1px solid var(--color-border);
border-radius: var(--radius-lg);

/* Media image */
border-radius: var(--radius-lg) var(--radius-lg) 0 0;
overflow: hidden;
```

---

## 코드 스니펫

```tsx
// Elevated Card (기본)
<div className="op-card op-card--elevated">
  <div className="op-card__header">
    <p className="op-card__eyebrow">수학</p>
    <h3 className="op-card__title">함수의 극한</h3>
    <p className="op-card__subtitle">미적분 · 고2</p>
  </div>
  <div className="op-card__body">
    <p>극한의 정의와 활용법을 예제와 함께 학습합니다.</p>
  </div>
  <div className="op-card__footer">
    <button className="op-btn op-btn--text op-btn--sm">자세히 보기</button>
    <span className="op-card__meta">2024.01.15</span>
  </div>
</div>

// Clickable Card
<a href="/course/123" className="op-card op-card--elevated op-card--clickable">
  <img className="op-card__media" src="/thumbnail.jpg" alt="강의 썸네일" />
  <div className="op-card__header">
    <h3 className="op-card__title">수능 수학 완성</h3>
  </div>
</a>
```

---

## 그리드 레이아웃

```css
/* 2열 */
.op-card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-04);
}

/* 3열 (데스크탑) */
@media (min-width: 1024px) {
  .op-card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## Do / Don't

| Do | Don't |
|---|---|
| 같은 그리드의 카드는 동일 변형 | 혼재 사용 |
| 클릭 가능 카드에는 명확한 CTA | 클릭 영역 불명확 |
| 이미지는 16:9 또는 3:2 비율 | 비율 제각각 |
| 카드 내 액션은 최대 2개 | 카드 안에 버튼 5개+ |

---

## 접근성

- 클릭 가능한 카드: `<a>` 또는 `<button>` 래퍼
- 이미지: `alt` 속성 필수 (장식 이미지는 `alt=""`)
- 그리드: `role="list"` + `role="listitem"` 또는 시맨틱 `<ul>/<li>`
