# OPENPATH DS — Claude Code 규칙
> 이 파일은 세션 시작 시 자동으로 로드된다. 모든 작업은 이 규칙을 따른다.

## 절대 규칙
- 색상 하드코딩 금지. 반드시 CSS 변수 참조
- Disabled 처리는 opacity 아닌 `--color-text-disabled` / `--color-interactive-disabled` 사용
- 한 화면에 Primary 버튼 1개만
- 다크모드는 컴포넌트 복제 금지. CSS 변수 교체로 처리
- Shadow는 다크모드에서 opacity 0 처리 (`--shadow-*` 변수로 관리)

---

## CSS 변수 전체 목록

### Brand (Openpath 기본)
```css
--color-brand:              #28D7D2;
--color-brand-hover:        #1BB8B3;
--color-brand-pressed:      #0F9490;
--color-brand-subtle:       #D6F5F5;
--color-bg-brand:           #F3FCFC;
--color-border-brand:       #28D7D2;
--color-border-hover:       #889298;
```

### Text
```css
--color-text:               #29363D;
--color-text-subtle:        #889298;
--color-text-disabled:      #D8DCDE;
--color-text-on-brand:      #FFFFFF;
```

### Background
```css
--color-bg:                 #FFFFFF;
--color-bg-subtle:          #F4F5F5;
--color-bg-warning:         #FFF8F0;
--color-bg-error:           #FFF0F3;
```

### Border
```css
--color-border:             #D8DCDE;
```

### Status
```css
--color-error:              #FF3257;
--color-success:            #28D7D2;
--color-warning:            #EE706B;
```

### Interactive
```css
--color-interactive:        #28D7D2;
--color-interactive-hover:  #1BB8B3;
--color-interactive-pressed:#0F9490;
--color-interactive-disabled:#D8DCDE;
```

### Shadow (Light)
```css
--shadow-01: 0 1px 4px rgba(21,27,30,0.08);
--shadow-02: 0 2px 8px rgba(21,27,30,0.08);
--shadow-03: 0 4px 16px rgba(21,27,30,0.12);
--shadow-04: 0 8px 24px -2px rgba(21,27,30,0.20);
```

### Shadow (Dark — 모두 none)
```css
[data-theme="dark"] {
  --shadow-01: none;
  --shadow-02: none;
  --shadow-03: none;
  --shadow-04: none;
}
```

### Spacing
```css
--space-01: 4px;
--space-02: 8px;
--space-03: 12px;
--space-04: 16px;
--space-05: 20px;
--space-06: 24px;
--space-07: 32px;
--space-08: 40px;
--space-09: 48px;
--space-10: 64px;
--space-11: 80px;
--space-12: 96px;
```

### Radius
```css
--radius-xs:   4px;
--radius-sm:   8px;
--radius-md:   12px;
--radius-lg:   16px;
--radius-pill: 9999px;
```

### Typography
```css
--font-en: "Mark Pro", sans-serif;
--font-ko: "Noto Sans KR", sans-serif;
```

---

## Theming — 브랜드 교체 변수 (Primary 계열만 교체)

Duotone 테마:
```css
--color-brand:              #FE6565;
--color-brand-hover:        #E54D4D;
--color-brand-pressed:      #C93838;
--color-brand-subtle:       #FFD6D6;
--color-bg-brand:           #FFF1F1;
--color-border-brand:       #FE6565;
```

---

## 다크모드 변수
```css
[data-theme="dark"] {
  --color-text:              #FFFFFF;
  --color-text-subtle:       #B0B8BC;
  --color-text-disabled:     #60707A;
  --color-bg:                #29363D;
  --color-bg-subtle:         #3D5060;
  --color-bg-brand:          #156565;
  --color-border:            #60707A;
}
```

---

## 컴포넌트 스펙 파일 위치

| 컴포넌트 | 파일 경로 |
|---|---|
| Button | `design-system/components/button.md` |
| Text Field | `design-system/components/text-field.md` |
| Selection | `design-system/components/selection.md` |
| Chips | `design-system/components/chips.md` |
| Card | `design-system/components/card.md` |
| Navigation | `design-system/components/navigation.md` |
| Feedback | `design-system/components/feedback.md` |
| 전체 토큰 | `design-system/tokens.md` |
| 테마 가이드 | `design-system/theming.md` |
