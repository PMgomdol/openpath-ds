# Chips 컴포넌트

## 개요

칩은 **필터링**, **선택**, **입력 태그** 용도로 사용하는 소형 인터랙티브 엘리먼트입니다.

---

## 변형 (Variant)

| Variant | 용도 | 선택 시 |
|---|---|---|
| Filter Chip | 목록 필터링 (복수 선택) | `--color-bg-brand` bg + `--color-border-brand` border |
| Choice Chip | 단일 선택 (라디오 대체) | `--color-brand` bg + white text |
| Input Chip | 입력 태그 (삭제 가능) | 항상 선택됨 상태 + X 버튼 |
| Suggestion Chip | 제안 액션 | 선택 없음 (버튼처럼 동작) |

---

## 크기

| 크기 | Height | Padding H | Font | Radius |
|---|---|---|---|---|
| Small | 28px | 10px | 12px / 500 | 9999px |
| Medium | 36px | 14px | 14px / 500 | 9999px |

> Radius는 항상 `--radius-pill` (9999px)

---

## 상태

### Filter / Choice Chip

| 상태 | 배경 | 테두리 | 텍스트 |
|---|---|---|---|
| Default | `--color-bg` | `--color-border` | `--color-text` |
| Hover | `--color-bg-subtle` | `--color-border-hover` | `--color-text` |
| Selected | `--color-bg-brand` | `--color-border-brand` | `--color-brand` |
| Selected + Hover | `--color-bg-brand` | `--color-brand-hover` | `--color-brand-hover` |
| Disabled | `--color-bg-subtle` | `--color-border` | `--color-text-disabled` |

### Input Chip (태그)

- 항상 Selected 상태 외관
- 오른쪽에 X (16px) 버튼, `--space-01` (4px) 간격
- X 클릭 시 칩 제거

---

## 구조

```
┌────────────────────────────────────┐
│ [Leading Icon]  [Label]  [X / Dropdown] │
└────────────────────────────────────┘
```

- Leading Icon: 16px, 라벨과 `--space-01` (4px) 간격
- Trailing X: 16px, 라벨과 `--space-01` (4px) 간격

---

## 토큰 참조

```css
/* Default */
height: 36px;
padding: 0 var(--space-03);    /* 12px */
border-radius: var(--radius-pill);
background: var(--color-bg);
border: 1px solid var(--color-border);
color: var(--color-text);
font-size: 14px;
font-weight: 500;

/* Hover */
background: var(--color-bg-subtle);
border-color: var(--color-border-hover);

/* Selected (Filter) */
background: var(--color-bg-brand);
border-color: var(--color-border-brand);
color: var(--color-brand);

/* Selected (Choice) */
background: var(--color-brand);
color: var(--color-text-on-brand);
```

---

## 코드 스니펫

```tsx
// Filter Chip
<button
  className={`op-chip op-chip--filter ${selected ? "op-chip--selected" : ""}`}
  onClick={() => setSelected(!selected)}
>
  {selected && <Check size={14} />}
  전체
</button>

// Choice Chip (단일 선택)
<div className="op-chip-group" role="radiogroup">
  {["전체", "진행 중", "완료"].map(label => (
    <button
      key={label}
      className={`op-chip op-chip--choice ${active === label ? "op-chip--selected" : ""}`}
      onClick={() => setActive(label)}
    >
      {label}
    </button>
  ))}
</div>

// Input Chip (태그)
<div className="op-chip op-chip--input op-chip--selected">
  <span>수학</span>
  <button onClick={() => removeTag("수학")} aria-label="수학 제거">
    <X size={14} />
  </button>
</div>
```

---

## 그룹 레이아웃

- 칩 그룹 간격: `--space-02` (8px)
- 줄바꿈: `flex-wrap: wrap`
- 가로 스크롤 시: `overflow-x: auto`, `flex-wrap: nowrap`

---

## Do / Don't

| Do | Don't |
|---|---|
| 필터 칩은 복수 선택 허용 | 필터 칩을 단일 선택에 오용 |
| 라벨 간결하게 (1~3단어) | 긴 문장 라벨 |
| 아이콘은 의미 있을 때만 | 모든 칩에 아이콘 추가 |

---

## 접근성

- Filter/Choice Chip: `role="checkbox"` 또는 `role="radio"` + `aria-checked`
- Input Chip X 버튼: `aria-label="[태그명] 제거"`
- 키보드: Space/Enter로 선택, Delete/Backspace로 Input Chip 제거
