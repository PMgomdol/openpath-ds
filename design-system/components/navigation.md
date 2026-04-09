# Navigation 컴포넌트

## 개요

앱 내 이동을 담당하는 컴포넌트 그룹: **App Bar**, **Bottom Navigation**, **Navigation Drawer**, **Tab Bar**.

---

## App Bar (Top)

### 스펙

| 속성 | 값 |
|---|---|
| Height | 56px |
| Padding H | `--space-04` (16px) |
| Background | `--color-bg` |
| Shadow | `--shadow-03` (sticky 시) |
| Title | Title MD (20px / 700) |

### 구조

```
┌─────────────────────────────────────────┐
│ [Back/Menu] [Title]        [Actions...] │
└─────────────────────────────────────────┘
```

- Leading: Back 아이콘 or 햄버거 메뉴 (24px)
- Title: 좌측 정렬 또는 중앙 정렬
- Trailing: 아이콘 버튼 최대 3개, 간격 `--space-01` (4px)

---

## Bottom Navigation

### 스펙

| 속성 | 값 |
|---|---|
| Height | 80px |
| Item 수 | 3~5개 |
| Icon 크기 | 24px |
| Label | 12px / 500 |
| Indicator | 64×32px pill |
| Indicator 색 | `--color-bg-brand` |
| Shadow | `--shadow-03` |
| Radius (indicator) | `--radius-pill` |

### 상태

| 상태 | Icon 색 | Label 색 |
|---|---|---|
| Default | `--color-text-subtle` | `--color-text-subtle` |
| Active | `--color-brand` | `--color-brand` |
| Pressed | `--color-brand-pressed` | `--color-brand-pressed` |

### 토큰

```css
.op-bottom-nav {
  height: 80px;
  background: var(--color-bg);
  box-shadow: var(--shadow-03);
  border-top: 1px solid var(--color-border);
}

.op-bottom-nav__indicator {
  width: 64px;
  height: 32px;
  border-radius: var(--radius-pill);
  background: var(--color-bg-brand);
}
```

---

## Navigation Drawer

### 변형

| 변형 | 설명 | 동작 |
|---|---|---|
| Standard | 사이드바 고정 | 콘텐츠를 밀어냄 |
| Modal | 오버레이 | Scrim + slide in |

### 스펙

| 속성 | 값 |
|---|---|
| Width | 최대 360px |
| Item Height | 56px |
| Item Radius | `--radius-pill` (9999px) |
| Item Padding H | `--space-04` (16px) |
| Header Height | 72px |
| Scrim 색 | `rgba(21,27,30,0.40)` |
| Shadow | `--shadow-04` |

### 상태

| 상태 | 배경 | 텍스트/아이콘 |
|---|---|---|
| Default | 투명 | `--color-text-subtle` |
| Hover | `--color-bg-subtle` | `--color-text` |
| Active | `--color-bg-brand` | `--color-brand` |

### 토큰

```css
.op-drawer {
  width: 360px;
  background: var(--color-bg);
  box-shadow: var(--shadow-04);
}

.op-drawer__item {
  height: 56px;
  border-radius: var(--radius-pill);
  padding: 0 var(--space-04);
}

.op-drawer__item--active {
  background: var(--color-bg-brand);
  color: var(--color-brand);
}

.op-drawer__scrim {
  background: rgba(21, 27, 30, 0.40);
}
```

---

## Tab Bar

### 스펙

| 속성 | 값 |
|---|---|
| Tab 높이 | 48px |
| Indicator | 하단 2px 라인, `--color-brand` |
| Label | 14px / 600 |
| 최소 Tab 너비 | 80px |

### 변형

| 변형 | 설명 |
|---|---|
| Line Tab | 하단 border indicator |
| Pill Tab | 배경 pill indicator (세그먼트처럼) |

### 상태

| 상태 | 텍스트 | Indicator |
|---|---|---|
| Default | `--color-text-subtle` | 없음 |
| Active | `--color-brand` | `--color-brand` 2px |
| Hover | `--color-text` | 없음 |

### 토큰

```css
/* Line Tab */
.op-tab {
  height: 48px;
  color: var(--color-text-subtle);
  font-weight: 600;
  border-bottom: 2px solid transparent;
  transition: all 0.15s;
}

.op-tab--active {
  color: var(--color-brand);
  border-bottom-color: var(--color-brand);
}
```

---

## 코드 스니펫

```tsx
// Bottom Navigation
<nav className="op-bottom-nav">
  {navItems.map(item => (
    <button
      key={item.id}
      className={`op-bottom-nav__item ${active === item.id ? "op-bottom-nav__item--active" : ""}`}
      onClick={() => setActive(item.id)}
    >
      <span className="op-bottom-nav__indicator" />
      <item.icon size={24} />
      <span className="op-bottom-nav__label">{item.label}</span>
    </button>
  ))}
</nav>

// Tab Bar
<div className="op-tab-bar" role="tablist">
  {tabs.map(tab => (
    <button
      key={tab.id}
      role="tab"
      aria-selected={active === tab.id}
      className={`op-tab ${active === tab.id ? "op-tab--active" : ""}`}
      onClick={() => setActive(tab.id)}
    >
      {tab.label}
    </button>
  ))}
</div>
```

---

## 접근성

- App Bar: `role="banner"`, Back 버튼 `aria-label="뒤로가기"`
- Bottom Nav: `role="navigation"`, 각 아이템 `aria-current="page"` (활성 시)
- Drawer: `role="dialog"` (Modal), `aria-modal="true"`, Escape 닫기
- Tab Bar: `role="tablist"`, 각 탭 `role="tab"`, 패널 `role="tabpanel"`, 방향키 이동
