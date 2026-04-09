# Feedback 컴포넌트

## 개요

사용자에게 상태·결과·정보를 전달하는 컴포넌트 그룹: **Snackbar**, **Toast**, **Banner**, **Dialog**, **Tooltip**, **Badge**.

---

## Snackbar / Toast

### 스펙

| 속성 | 값 |
|---|---|
| Height | 48px (단일 라인) |
| Padding | 16px H × 12px V |
| Radius | `--radius-sm` (8px) |
| Shadow | `--shadow-04` |
| Background | `#29363D` (N600, 라이트/다크 동일) |
| 텍스트 | `#FFFFFF`, 14px / 400 |
| 액션 버튼 | `--color-brand`, 14px / 600 |
| 위치 | 하단 중앙 또는 하단 좌측, offset 24px |
| 자동 닫힘 | 기본 4초 |
| 최대 너비 | 480px |

### 변형

| 변형 | 용도 | 아이콘 |
|---|---|---|
| Default | 일반 정보 | 없음 |
| Success | 성공 | `--color-success` |
| Error | 실패 | `--color-error` |
| Warning | 경고 | `--color-warning` |

### 토큰

```css
.op-snackbar {
  background: #29363D;
  color: #FFFFFF;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-04);
  padding: 12px 16px;
}

.op-snackbar__action {
  color: var(--color-brand);
  font-weight: 600;
}
```

---

## Banner

### 스펙

| 속성 | 값 |
|---|---|
| Left accent | 4px, 해당 상태 색상 |
| Padding | V=12px H=16px |
| Radius | `--radius-sm` (8px) |
| Title | 14px / 600 |
| Body | 14px / 400 |

### 변형

| Type | Left Accent | Background | Title 색상 |
|---|---|---|---|
| Info | `--color-brand` | `--color-bg-brand` | `--color-brand` |
| Success | `--color-success` | `#F0FFF4` | `#15803D` |
| Warning | `--color-warning` | `--color-bg-warning` | `#B45309` |
| Error | `--color-error` | `--color-bg-error` | `--color-error` |

### 토큰

```css
.op-banner {
  border-left: 4px solid var(--color-brand);
  background: var(--color-bg-brand);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
}

.op-banner__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-brand);
}
```

---

## Dialog / Modal

### 스펙

| 속성 | 값 |
|---|---|
| Width | 320px ~ 560px |
| Padding | `--space-06` (24px) |
| Radius | `--radius-lg` (16px) |
| Shadow | `--shadow-04` |
| Scrim | `rgba(21,27,30,0.40)` |
| Title | 18px / 700 (Title SM) |
| Body | 14px / 400 |
| 버튼 위치 | 하단 우측 (확인/취소) |

### 버튼 구성

| 종류 | 구성 |
|---|---|
| Alert | 확인 1개 (Primary) |
| Confirm | 취소 (Text/Secondary) + 확인 (Primary) |
| Destructive | 취소 (Text) + 삭제 (Destructive Primary) |

### 토큰

```css
.op-dialog {
  background: var(--color-bg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-04);
  padding: var(--space-06);
  max-width: 560px;
}

.op-dialog__title {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--space-02);
}

.op-dialog__scrim {
  background: rgba(21, 27, 30, 0.40);
}
```

---

## Tooltip

### 스펙

| 속성 | 값 |
|---|---|
| Padding | 6px × 10px |
| Radius | `--radius-xs` (4px) |
| Background | `#29363D` (N600) |
| 텍스트 | `#FFFFFF`, 12px / 400 |
| Max width | 200px |
| 딜레이 | 300ms (표시) |
| Shadow | `--shadow-02` |

### 위치

`top` / `bottom` / `left` / `right`, 기본 `top`
Arrow 6px triangle, 배경 동일색

---

## Badge

### 스펙

| 속성 | 값 |
|---|---|
| Dot | 8px circle |
| Number | 최소 18px, padding 4px H |
| Radius | `--radius-pill` (9999px) |
| Background | `--color-error` |
| 텍스트 | `#FFFFFF`, 11px / 700 |
| 최대 표시 | 99+ |

---

## 코드 스니펫

```tsx
// Snackbar
<div className="op-snackbar" role="status">
  <span>저장되었습니다.</span>
  <button className="op-snackbar__action">실행 취소</button>
</div>

// Banner
<div className="op-banner op-banner--warning" role="alert">
  <div className="op-banner__header">
    <AlertTriangle size={16} />
    <strong className="op-banner__title">주의가 필요합니다</strong>
  </div>
  <p className="op-banner__body">제출 전 필수 항목을 확인하세요.</p>
</div>

// Dialog
<dialog className="op-dialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title" className="op-dialog__title">삭제하시겠습니까?</h2>
  <p className="op-dialog__body">이 작업은 되돌릴 수 없습니다.</p>
  <div className="op-dialog__actions">
    <button className="op-btn op-btn--text op-btn--md">취소</button>
    <button className="op-btn op-btn--destructive op-btn--md">삭제</button>
  </div>
</dialog>

// Badge
<div className="op-badge-wrap">
  <Bell size={24} />
  <span className="op-badge">3</span>
</div>
```

---

## 접근성

- Snackbar/Toast: `role="status"` (live region, non-disruptive) 또는 `role="alert"` (긴급)
- Banner: `role="alert"` (Error/Warning), `role="status"` (Info/Success)
- Dialog: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` → title id, Escape 닫기, 포커스 트랩
- Tooltip: `role="tooltip"`, 트리거에 `aria-describedby` → tooltip id
- Badge: 숫자는 부모에 `aria-label="알림 3개"` (뱃지 자체 숨김)
