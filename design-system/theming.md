# OPENPATH DS — 테마 시스템

## 개요

OPENPATH DS는 **CSS 커스텀 프로퍼티(변수) 교체** 방식으로 테마를 전환합니다.
JavaScript 로직 없이 변수만 교체하면 전체 컴포넌트 색상이 실시간 반영됩니다.

---

## 테마 구조

```
Root 변수 (기본: Openpath 민트)
    ↓
[data-theme="dark"] 오버라이드 → 다크모드
    ↓
.theme-duotone 오버라이드 → Duotone 코랄
```

---

## 1. Openpath 기본 테마 (민트)

```css
:root {
  /* Brand */
  --color-brand:           #28D7D2;
  --color-brand-hover:     #1BB8B3;
  --color-brand-pressed:   #0F9490;
  --color-brand-subtle:    #D6F5F5;

  /* Background */
  --color-bg:              #FFFFFF;
  --color-bg-subtle:       #F4F5F5;
  --color-bg-brand:        #F3FCFC;

  /* Text */
  --color-text:            #29363D;
  --color-text-subtle:     #889298;
  --color-text-disabled:   #D8DCDE;
  --color-text-on-brand:   #FFFFFF;

  /* Border */
  --color-border:          #D8DCDE;
  --color-border-brand:    #28D7D2;
  --color-border-hover:    #889298;

  /* Status */
  --color-error:           #FF3257;
  --color-success:         #28D7D2;
  --color-warning:         #EE706B;

  /* Interactive */
  --color-interactive:          #28D7D2;
  --color-interactive-hover:    #1BB8B3;
  --color-interactive-pressed:  #0F9490;
  --color-interactive-disabled: #D8DCDE;

  /* Shadow */
  --shadow-01: 0 1px 4px rgba(21,27,30,0.08);
  --shadow-02: 0 2px 8px rgba(21,27,30,0.08);
  --shadow-03: 0 4px 16px rgba(21,27,30,0.12);
  --shadow-04: 0 8px 24px -2px rgba(21,27,30,0.20);
}
```

---

## 2. Duotone 교체 테마 (코랄)

Primary 계열 변수만 교체합니다. 나머지(Neutral, Status, Shadow)는 그대로 유지.

```css
.theme-duotone {
  --color-brand:           #FE6565;
  --color-brand-hover:     #E54D4D;
  --color-brand-pressed:   #C93838;
  --color-brand-subtle:    #FFE0E0;

  --color-bg-brand:        #FFF1F1;

  --color-border-brand:    #FE6565;

  --color-interactive:          #FE6565;
  --color-interactive-hover:    #E54D4D;
  --color-interactive-pressed:  #C93838;

  --color-success:         #FE6565;  /* Duotone에서 success = brand */
}
```

### React에서 테마 전환하기

```tsx
// 방법 1: className으로 교체
<div className={isDuotone ? "theme-duotone" : ""}>
  {/* 하위 모든 컴포넌트에 자동 적용 */}
</div>

// 방법 2: CSS 변수 직접 주입 (데모용)
<div style={{
  "--color-brand": "#FE6565",
  "--color-brand-hover": "#E54D4D",
  // ...
} as React.CSSProperties}>
  {children}
</div>
```

---

## 3. 다크모드 전환 (`data-theme`)

`<html>` 또는 최상위 엘리먼트에 `data-theme="dark"` 속성을 부여합니다.

```css
[data-theme="dark"] {
  /* Brand — dark variant */
  --color-brand-hover:     #6DDEDD;
  --color-brand-pressed:   #A8EBEA;
  --color-brand-subtle:    #156565;
  --color-bg-brand:        #156565;

  /* Background */
  --color-bg:              #29363D;
  --color-bg-subtle:       #3D5060;

  /* Text */
  --color-text:            #FFFFFF;
  --color-text-subtle:     #B0B8BC;
  --color-text-disabled:   #60707A;

  /* Border */
  --color-border:          #60707A;
  --color-border-hover:    #B0B8BC;

  /* Interactive — dark variant */
  --color-interactive-hover:    #6DDEDD;
  --color-interactive-pressed:  #A8EBEA;
  --color-interactive-disabled: #60707A;

  /* Shadow — 다크모드에서 모두 제거 */
  --shadow-01: none;
  --shadow-02: none;
  --shadow-03: none;
  --shadow-04: none;
}
```

### next-themes 연동 예시

```tsx
// app/layout.tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## 4. 새 서비스에 적용하기

새 브랜드에 OPENPATH DS를 적용할 때 **Primary 계열 6개 변수만 교체**합니다.

```css
/* 예시: Green 테마 */
.theme-green {
  --color-brand:           #22C55E;
  --color-brand-hover:     #16A34A;
  --color-brand-pressed:   #15803D;
  --color-brand-subtle:    #DCFCE7;
  --color-bg-brand:        #F0FDF4;
  --color-border-brand:    #22C55E;
  --color-interactive:          #22C55E;
  --color-interactive-hover:    #16A34A;
  --color-interactive-pressed:  #15803D;
}
```

### 체크리스트

- [ ] Primary 계열 변수 6개 색상값 정의
- [ ] Light + Dark 각각 준비
- [ ] 브랜드 폰트 (`--font-en`, `--font-ko`) 교체 여부 확인
- [ ] Status 색상(`--color-error`, `--color-warning`) 브랜드와 충돌 여부 확인
- [ ] 디자인 토큰 파일에 새 테마 시트 추가

---

## 테마 우선순위

```
[data-theme="dark"] .theme-duotone   ← 최고 우선순위 (다크 + Duotone)
[data-theme="dark"]                  ← 다크모드
.theme-duotone                       ← Duotone 라이트
:root                                ← 기본 (Openpath 라이트)
```

> **규칙:** 항상 CSS 변수를 통해 색상을 참조하세요. 하드코딩된 색상값(`#28D7D2`)은 테마 전환 시 반응하지 않습니다.
