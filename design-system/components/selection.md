# Selection 컴포넌트

## 개요

사용자 선택을 받는 컴포넌트 그룹: **Checkbox**, **Radio**, **Switch**, **Slider**.

---

## Checkbox

### 크기

| Size | 박스 크기 | Radius | 아이콘 |
|---|---|---|---|
| Small | 16×16px | 3px | 10px |
| Medium | 20×20px | 4px | 12px |
| Large | 24×24px | 5px | 14px |

### 상태

| 상태 | 배경 | 테두리 |
|---|---|---|
| Unchecked | `--color-bg` | `--color-border` |
| Checked | `--color-brand` | `--color-brand` |
| Indeterminate | `--color-brand` | `--color-brand` |
| Disabled Unchecked | `--color-bg-subtle` | `--color-border` |
| Disabled Checked | `--color-interactive-disabled` | `--color-interactive-disabled` |

### 토큰

```css
/* Unchecked */
background: var(--color-bg);
border: 1.5px solid var(--color-border);
border-radius: 4px;

/* Checked */
background: var(--color-brand);
border-color: var(--color-brand);
color: var(--color-text-on-brand); /* checkmark */
```

---

## Radio

### 크기

| Size | 크기 | Inner Dot |
|---|---|---|
| Small | 16px | 6px |
| Medium | 20px | 8px |
| Large | 24px | 10px |

### 상태

| 상태 | 외곽 | 내부 |
|---|---|---|
| Unselected | `--color-border` (1.5px) | 없음 |
| Selected | `--color-brand` (2px) | `--color-brand` dot |
| Disabled | `--color-border` | `--color-interactive-disabled` dot |

---

## Switch

### 사이즈

| Size | Track | Thumb | Radius |
|---|---|---|---|
| Small | 32×18px | 14px | 9999px |
| Medium | 44×24px | 20px | 9999px |

### 상태

| 상태 | Track 배경 | Thumb |
|---|---|---|
| Off | `--color-border` | `#FFFFFF` |
| On | `--color-brand` | `#FFFFFF` |
| Off Disabled | `--color-bg-subtle` | `--color-interactive-disabled` |
| On Disabled | `--color-interactive-disabled` | `#FFFFFF` |

### 토큰

```css
/* Track Off */
background: var(--color-border);
border-radius: var(--radius-pill);
transition: background 0.2s;

/* Track On */
background: var(--color-brand);

/* Thumb */
background: #FFFFFF;
box-shadow: var(--shadow-01);
```

---

## Slider

### 스펙

- Track 높이: 4px
- Thumb: 20px (active: 28px)
- Track 활성 색상: `--color-brand`
- Track 비활성 색상: `--color-border`
- Thumb 배경: `#FFFFFF`, border: 2px `--color-brand`

### 변형

| 변형 | 설명 |
|---|---|
| Continuous | 자유 값 |
| Discrete | 스텝 고정 + 틱 마크 |
| Range | 두 Thumb (min/max) |

### 토큰

```css
/* Track */
height: 4px;
background: var(--color-border);         /* inactive */
/* active portion */
background: var(--color-brand);

/* Thumb */
width: 20px; height: 20px;
background: #FFFFFF;
border: 2px solid var(--color-brand);
border-radius: 50%;
box-shadow: var(--shadow-02);

/* Active state */
width: 28px; height: 28px;
```

---

## 코드 스니펫

```tsx
// Checkbox
<label className="op-checkbox">
  <input type="checkbox" className="op-checkbox__input" />
  <span className="op-checkbox__box" />
  <span className="op-checkbox__label">동의합니다</span>
</label>

// Radio
<label className="op-radio">
  <input type="radio" name="plan" value="basic" className="op-radio__input" />
  <span className="op-radio__circle" />
  <span className="op-radio__label">기본 플랜</span>
</label>

// Switch
<label className="op-switch">
  <input type="checkbox" className="op-switch__input" role="switch" />
  <span className="op-switch__track">
    <span className="op-switch__thumb" />
  </span>
  <span className="op-switch__label">알림 허용</span>
</label>
```

---

## 접근성

- Checkbox: `type="checkbox"`, Indeterminate는 `indeterminate` 속성 (JS 필요)
- Radio: 같은 `name` 그룹, `fieldset` + `legend`
- Switch: `role="switch"` + `aria-checked`
- Slider: `type="range"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- 라벨 클릭 시 제어 가능하도록 `<label>` 래핑
