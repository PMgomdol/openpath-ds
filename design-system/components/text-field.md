# Text Field 컴포넌트

## 개요

텍스트 입력 필드. 단일 라인 입력과 멀티라인(Textarea) 두 종류를 포함합니다.

---

## 변형 (Variant)

| Variant | 배경 | 테두리 |
|---|---|---|
| Outlined | `--color-bg` | `--color-border` (1px) |
| Filled | `--color-bg-subtle` | 없음 (하단 라인만) |

---

## 크기 (Size)

| Size | Height | Padding V | Padding H | Font |
|---|---|---|---|---|
| Small (S) | 36px | 8px | 12px | 14px |
| Medium (M) | 44px | 12px | 16px | 15px |
| Large (L) | 52px | 14px | 16px | 16px |

> Textarea: 높이 고정 없음, min-height 80px, resize: vertical

---

## 상태 (State)

| 상태 | 테두리 | 라벨 색상 |
|---|---|---|
| Default | `--color-border` | `--color-text-subtle` |
| Hover | `--color-border-hover` | `--color-text-subtle` |
| Focused | `--color-border-brand` (2px) | `--color-brand` |
| Filled (값 있음) | `--color-border` | `--color-text-subtle` |
| Error | `--color-error` | `--color-error` |
| Disabled | `--color-border` | `--color-text-disabled` |

---

## 구조 (Anatomy)

```
[Label]
┌─────────────────────────────────┐
│ [Leading Icon]  [Input]  [Trailing Icon / Clear] │
└─────────────────────────────────┘
[Helper Text / Error Message]
```

- **Label**: 12px / 500, 인풋 위 `--space-01` (4px) 간격
- **Placeholder**: `--color-text-subtle`
- **Helper Text**: 12px / 400, 인풋 아래 `--space-01` (4px)
- **Error Message**: 12px / 400, `--color-error`, Helper Text 대체

---

## 토큰 참조

```css
/* Outlined Default */
background: var(--color-bg);
border: 1px solid var(--color-border);
border-radius: var(--radius-sm);
color: var(--color-text);

/* Focused */
border: 2px solid var(--color-border-brand);

/* Error */
border-color: var(--color-error);

/* Disabled */
background: var(--color-bg-subtle);
color: var(--color-text-disabled);
cursor: not-allowed;

/* Placeholder */
color: var(--color-text-subtle);
```

---

## 코드 스니펫

```tsx
// Outlined (기본)
<div className="op-field">
  <label className="op-field__label">이메일</label>
  <input
    type="email"
    className="op-field__input op-field__input--outlined"
    placeholder="example@openpath.kr"
  />
</div>

// Error 상태
<div className="op-field op-field--error">
  <label className="op-field__label">비밀번호</label>
  <input type="password" className="op-field__input" />
  <span className="op-field__error">8자 이상 입력하세요.</span>
</div>

// With Leading Icon
<div className="op-field">
  <div className="op-field__input-wrap">
    <Search size={18} className="op-field__icon op-field__icon--lead" />
    <input type="text" className="op-field__input" placeholder="검색" />
  </div>
</div>
```

---

## Do / Don't

| Do | Don't |
|---|---|
| Label은 항상 표시 | Placeholder만으로 Label 대체 |
| Error 메시지는 구체적으로 | "잘못된 입력" 같은 모호한 메시지 |
| 필수 항목은 * 표시 | 모든 항목 필수 표기 |
| Clear 버튼으로 초기화 지원 | X 버튼 없이 긴 텍스트 처리 |

---

## 접근성

- `<label>` + `htmlFor` 연결 또는 `aria-label`
- Error 시 `aria-invalid="true"` + `aria-describedby` → error message id
- Disabled: `disabled` 속성
- Focus ring: `--color-border-brand` 2px outline
