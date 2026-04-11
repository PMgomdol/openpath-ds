# OPENPATH Design System — Done List

> 마지막 업데이트: 2026-04-11
> 기준 브랜치: `main` / 최신 커밋: `62e70c5`
> 저장소: https://github.com/PMgomdol/openpath-ds
> 배포: Vercel (GitHub main push → 자동 배포)

---

## 기술 스택

| 레이어 | 기술 | 버전 |
|---|---|---|
| Framework | Next.js (App Router) | ^14.2.35 |
| Language | TypeScript (strict) | ^6.0.2 |
| Styling | Tailwind CSS + Custom CSS (`@layer components`) | ^3.4.19 |
| Icons | lucide-react | ^1.7.0 |
| Theme | next-themes (class-based dark mode) | ^0.4.6 |
| Utilities | clsx | ^2.1.1 |
| CSS Processor | PostCSS + autoprefixer | — |
| 폰트 | Noto Sans KR (Google Fonts) | — |

**아키텍처 포인트:**
- Next.js App Router (`app/` 디렉터리), TypeScript `tsc --noEmit` 빌드 통과 확인
- 전역 레이아웃: `Header`(fixed top 56px) + `Sidebar`(fixed left 220px) + `main`(`md:ml-[220px]`)
- CSS Custom Properties 기반 토큰 시스템 (`globals.css :root`)
- BEM 방식 컴포넌트 클래스 (`@layer components`) — `op-{block}__{element}--{modifier}`
- 다크모드: `.dark` class 교체 방식, 컴포넌트 복제 없음
- Tailwind `darkMode: "class"`, Mint/Coral/Neutral 커스텀 팔레트 정의

---

## DS 구조 (M3 기준)

```
Style       시각 요소  — Color · Typography · Spacing · Shape · Elevation · Iconography
Foundation  환경·원칙  — Environment · Principles · Naming · Design Token · Accessibility · Motion
Components  UI 구성   — 16종 컴포넌트
```

> M2 방식("Foundation에 시각 요소")을 폐기하고 M3 기준으로 Style / Foundation 분리.
> AI 가독성 최적화: 모든 값은 CSS 변수 참조, 하드코딩 0건.

---

## 1. CSS 토큰 시스템 (`globals.css`)

### 1-1. Color 토큰

**Brand / Interactive**

| 변수 | Light | Dark |
|---|---|---|
| `--color-brand-primary` | `#28D7D2` (M300 민트) | `#28D7D2` |
| `--color-brand-subtle` | `#D6F5F5` | `rgba(40,215,210,0.18)` |
| `--color-interactive-primary` | `#28D7D2` | `#28D7D2` |
| `--color-interactive-hover` | `#1BB8B3` | `#6DDEDD` |
| `--color-interactive-pressed` | `#0F9490` | `#A8EBEA` |
| `--color-interactive-disabled` | `#D8DCDE` | `#60707A` |

**Text**

| 변수 | Light | Dark |
|---|---|---|
| `--color-text-default` | `#29363D` (N600) | `#FFFFFF` |
| `--color-text-subtle` | `#889298` (N300) | `#B0B8BC` |
| `--color-text-disabled` | `#D8DCDE` (N100) | `#60707A` |
| `--color-text-on-brand` | `#29363D` (N600) | `#29363D` |

> **접근성 핵심**: `--color-text-on-brand`는 White(2.1:1 ❌) 대신 N600(4.8:1 ✅) 사용.
> 민트 배경(M300) 위에 흰 텍스트는 WCAG AA 불통과.

**Background**

| 변수 | Light | Dark |
|---|---|---|
| `--color-bg-default` | `#FFFFFF` | `#29363D` |
| `--color-bg-subtle` | `#F4F5F5` | `#3D5060` |
| `--color-bg-brand` | `#F3FCFC` | `#156565` |
| `--color-bg-error` | `#FFF0F3` | `rgba(255,50,87,0.12)` |
| `--color-bg-warning` | `#FFF8F0` | `rgba(238,112,107,0.12)` |

**Border / Status**

| 변수 | Light | Dark |
|---|---|---|
| `--color-border-default` | `#D8DCDE` | `#60707A` |
| `--color-border-brand` | `#28D7D2` | `#28D7D2` |
| `--color-border-hover` | `#889298` | `#B0B8BC` |
| `--color-status-error` | `#FF3257` | `#FF3257` |
| `--color-status-success` | `#28D7D2` | `#28D7D2` |
| `--color-status-warning` | `#EE706B` | `#EE706B` |

### 1-2. Shape 토큰

| 변수 | Value | M3 이름 | 주요 사용처 |
|---|---|---|---|
| `--shape-xs` | `4px` | Extra Small | TextField, Chip, Snackbar, Menu |
| `--shape-sm` | `8px` | Small | 구형 버튼 |
| `--shape-md` | `12px` | Medium | Card (소형) |
| `--shape-lg` | `16px` | Large | Card, FAB, Bottom Sheet |
| `--shape-xl` | `28px` | Extra Large | Large FAB, Dialog |
| `--shape-full` | `9999px` | Full | Button(Pill), Switch Track, Badge |

### 1-3. Spacing 토큰 (4dp 배수)

`--space-01` (4px) ~ `--space-09` (48px) — 총 9단계

### 1-4. Motion 토큰

| 변수 | Value | 용도 |
|---|---|---|
| `--motion-standard` | `cubic-bezier(0.2, 0, 0, 1.0)` | 일반 전환 (가장 많이 사용) |
| `--motion-decelerate` | `cubic-bezier(0, 0, 0, 1.0)` | 화면 진입 Enter |
| `--motion-accelerate` | `cubic-bezier(0.3, 0, 1, 1)` | 화면 퇴장 Exit |
| `--duration-short` | `100ms` | 마이크로 인터랙션 (hover, state) |
| `--duration-medium` | `250ms` | 표준 컴포넌트 전환 |
| `--duration-long` | `400ms` | Dialog, Modal |

모든 `transition`은 raw `ease` 금지 → `var(--duration-*) var(--motion-standard)` 사용.

### 1-5. Shadow 토큰 (Light 전용, Dark = 전부 `none`)

| 변수 | Light 값 |
|---|---|
| `--shadow-01` | `0 1px 4px rgba(21,27,30,0.08)` |
| `--shadow-02` | `0 2px 8px rgba(21,27,30,0.12)` |
| `--shadow-03` | `0 4px 16px rgba(21,27,30,0.12)` |
| `--shadow-04` | `0 8px 24px rgba(21,27,30,0.20)` |

다크모드 Shadow = `none`. 위계는 `--color-bg-subtle`로 표현 (M3 Tonal Surface).

### 1-6. Typography 토큰 (M3 Type Scale, 15종)

`--type-{역할}-{크기}-{size|weight|lh|ls}` 형태, 총 60개 변수.

| 역할 | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| `display-lg` | 57px | 400 | 1.12 | -0.02em |
| `display-md` | 45px | 400 | 1.16 | 0em |
| `display-sm` | 36px | 400 | 1.22 | 0em |
| `headline-lg` | 32px | 400 | 1.25 | 0em |
| `headline-md` | 28px | 400 | 1.29 | 0em |
| `headline-sm` | 24px | 400 | 1.33 | 0em |
| `title-lg` | 22px | 400 | 1.27 | 0em |
| `title-md` | 16px | 500 | 1.5 | 0.02em |
| `title-sm` | 14px | 500 | 1.43 | 0.01em |
| `body-lg` | 16px | 400 | 1.5 | 0.03em |
| `body-md` | 14px | 400 | 1.43 | 0.02em |
| `body-sm` | 12px | 400 | 1.33 | 0.04em |
| `label-lg` | 14px | 500 | 1.43 | 0.01em |
| `label-md` | 12px | 500 | 1.33 | 0.05em |
| `label-sm` | 11px | 500 | 1.45 | 0.05em |

유틸리티 클래스 15개: `.type-display-lg` ~ `.type-label-sm`

### 1-7. Tonal Elevation 토큰 (M3)

`--elevation-tonal-l0` ~ `--elevation-tonal-l5`
→ `color-mix(in srgb, var(--color-brand-primary) N%, transparent)` (0/5/8/11/12/14%)

---

## 2. UI 컴포넌트 (`components/ui/`)

### 2-1. Button (`Button.tsx`)

**CSS:** `.op-btn` / `--primary|outlined|text` / `--sm|md|lg` / `__spinner`

| 속성 | 값 |
|---|---|
| Shape | `shape/full` (9999px — M3 Pill) |
| 크기 | sm 32px / md 40px / lg 48px |
| 터치 영역 | `::after { height: 48px }` |
| Focus ring | `outline: 3px solid var(--color-border-brand)` |
| Loading | 내장 스피너 (`op-btn__spinner`, spin 0.65s) |
| Disabled | `--color-interactive-disabled` bg + `--color-text-disabled` text (opacity 아님) |

### 2-2. TextField (`TextField.tsx`)

**CSS:** `.op-field` / `--filled|outlined` / `__box[data-error|data-disabled]` / `__label` / `__input` / `__helper--error|disabled`

| 속성 | 값 |
|---|---|
| Filled Shape | `shape/xs` (4px) 상단만 |
| Outlined Shape | `shape/xs` (4px) 전체 |
| Floating label | `placeholder=" "` + `:placeholder-shown` CSS |
| Outlined notch | `top: 0; transform: translateY(-50%); background: var(--color-bg-default)` |
| ARIA | `aria-describedby` → helper/error 자동 연결, `aria-invalid` |
| 상태명 | Inactive / Hover / Focused / **Populated** / Error / Disabled |

### 2-3. Chip (`Chip.tsx`)

**CSS:** `.op-chip` / `--filter[aria-pressed]` / `--input` / `__icon` / `__remove`

4가지 타입: Assist(`<button>`) / Filter(toggle, `aria-pressed`) / Input(`<span>` + remove) / Suggestion(`<button>`)

### 2-4. Card (`Card.tsx`)

**CSS:** `.op-card` / `--interactive` + 서브컴포넌트 15종 (`__media`, `__content`, `__title`, `__body`, `__actions`, `__trailing`, `__expand-btn`, `__overflow-btn`, `__overflow-menu`, `__star`, `__chips`, `__slider` 등)

| 속성 | 값 |
|---|---|
| Shape | `shape/lg` (16px) |
| Shadow | `shadow-01` → hover: `shadow-02` |
| 터치 영역 | expand-btn `min-height:48px` / overflow-btn `::after{inset:-8px}` / star `::after{inset:-12px}` |

### 2-5. Radio (`Radio.tsx`)

**CSS:** `.op-radio` / `__input(48×48,opacity:0)` / `__icon-wrap(48×48)` / `__icon(20×20)` / `__label`

- 숨겨진 input 48×48 + icon-wrap 48×48 → 시각 아이콘은 20px 유지
- Checked: 내부 dot `transform: scale(1)`
- Focus: `outline: 3px solid var(--color-border-brand)`

### 2-6. Checkbox (`Checkbox.tsx`)

**CSS:** `.op-checkbox` / `__input(48×48)` / `__icon-wrap(48×48)` / `__box(20×20)` / `__check` / `__dash` / `__label`

- `indeterminate` prop: `useEffect`로 `inputRef.current.indeterminate` 명령형 설정
- Focus: `outline: 3px solid; border-radius: 8px`

### 2-7. Switch (`Switch.tsx`)

**CSS:** `.op-switch(min-height:48px)` / `__input(52×48,role=switch)` / `__track(52×32)` / `__thumb` / `__label`

- `type="checkbox" role="switch" aria-checked={rest.checked}`
- Thumb: Off `24×24px, left:4px` → On `28×28px, left:20px`

### 2-8. FAB (`FAB.tsx`)

**CSS:** `.op-fab` / `--sm(40dp)|--md(56dp)|--lg(96dp)|--extended`

| 속성 | 값 |
|---|---|
| Shape | `shape/lg` (16px) **Rounded Square, NOT Pill** |
| Large FAB Shape | `shape/xl` (28px) |
| sm 터치 영역 | `::after { inset: -4px }` |
| Shadow | `shadow-03` → hover: `shadow-04` |

> M3 FAB는 shape/full(Pill)이 아닌 shape/lg(Rounded Square). M2 → M3 변경점.

### 2-9. BottomNavigation (`BottomNavigation.tsx`)

**CSS:** `.op-bottom-nav(80px)` / `__item[aria-selected]` / `__indicator(64×32dp pill)` / `__icon` / `__label` / `__badge`

| 속성 | 값 |
|---|---|
| Active Indicator | 64×32dp, `border-radius: var(--shape-full)`, `bg: var(--color-bg-brand)` |
| ARIA | `role="navigation"` + `role="tablist"` + `role="tab"` + `aria-selected` |
| Badge | `--color-status-error`, 99+ 처리 |

### 2-10. IconButton (`IconButton.tsx`)

**CSS:** `.op-icon-btn` / `--sm(32px)|--md(40px)|--lg(48px)`

- 터치 영역: `::after { min-width:48px; min-height:48px; transform:translate(-50%,-50%) }`
- `aria-label` TypeScript에서 required 강제

### 2-11. 레이아웃 / 유틸리티 컴포넌트

| 컴포넌트 | 설명 |
|---|---|
| `Header.tsx` | Fixed top h-14, 로고 + ThemeToggle, backdrop-blur |
| `Sidebar.tsx` | Fixed left w-220px, 3그룹 (Style=민트 / Foundation=보라 / Components=회색), pathname-aware active |
| `Providers.tsx` | `<ThemeProvider attribute="class">` next-themes 래퍼 |
| `ThemeToggle.tsx` | Sun/Moon 아이콘 버튼, Light/Dark 전환 |
| `ColorChip.tsx` | 색상 스와치 카드, 토큰명 + hex 클립보드 복사 |
| `SemanticTable.tsx` | Semantic 토큰 그룹 테이블 (Light/Dark 병렬 표시) |

---

## 3. 페이지 목록 (총 30페이지)

### Style 섹션 (6페이지)

| URL | 주요 내용 |
|---|---|
| `/foundation/color` | Mint(M20~M600) + Coral(D20~D600) + Neutral(N20~N600) + System + Semantic 토큰 테이블 (Light/Dark) |
| `/foundation/typography` | M3 Type Scale 15종, sp/weight/lh/tracking 전체 스펙 + 폰트 가이드 |
| `/foundation/spacing` | 4dp 그리드, space/01~12, Android 레이아웃 그리드 (Compact/Medium/Expanded) |
| `/style/shape` | Shape Scale 6단계 시각화 + 컴포넌트별 shape 매핑 표 + CSS 변수 |
| `/foundation/elevation` | M3 Tonal Elevation L0~L5 + shadow/01~04 스펙 |
| `/foundation/iconography` | lucide-react 사용 가이드, 18~24px 기준 |

### Foundation 섹션 (6페이지, 신규)

| URL | 주요 내용 |
|---|---|
| `/foundation/environment` | Android AOS / 360×800dp / 국문 / Figma / 4컬럼 그리드 시각화 |
| `/foundation/principles` | Clarity / Scalability / Autonomy 원칙 + Do/Don't 테이블 |
| `/foundation/naming` | 토큰 슬래시 → CSS 변수 하이픈 / BEM / TypeScript / 라우트 네이밍 코드블록 |
| `/foundation/design-token` | Global→Semantic→Component 3단계 구조 + 매핑 테이블 + 테마 전환 예시 |
| `/foundation/accessibility` | WCAG AA 대비율 표 + 터치 48dp 구현표 + Focus 3dp + ARIA 테이블 + 체크리스트 |
| `/foundation/motion` | Easing 4종 + Duration 8단계 테이블 + CSS 변수 + 상황별 규칙 |

### Components 섹션 (16페이지)

| URL | 구현 상태 |
|---|---|
| `/components/button` | ✅ 실제 컴포넌트 + 라이브 데모 (variant/size/loading/disabled 토글) |
| `/components/input` | ✅ 실제 컴포넌트 + 라이브 데모 + State 참조 (6가지) + Spec 테이블 |
| `/components/selection-controls` | ✅ 실제 컴포넌트 (Radio/Checkbox/Switch) + 라이브 데모 + Spec 테이블 |
| `/components/chips` | ✅ 실제 컴포넌트 + 4타입 데모 |
| `/components/card` | ✅ 실제 컴포넌트 + 풀 슬롯 데모 (미디어/오버플로우/별점/슬라이더) |
| `/components/modal` | ✅ 라이브 오버레이 데모 (Default/Destructive) + Spec 테이블 |
| `/components/fab` | 📄 페이지 존재 — 실제 컴포넌트 연결 필요 |
| `/components/bottom-navigation` | 📄 페이지 존재 — 실제 컴포넌트 연결 필요 |
| `/components/app-bar` | 📄 스펙 문서 — 컴포넌트 미구현 |
| `/components/tab` | 📄 스펙 문서 — 컴포넌트 미구현 |
| `/components/menu` | 📄 스펙 문서 — 컴포넌트 미구현 |
| `/components/snackbar` | 📄 스펙 문서 — 컴포넌트 미구현 |
| `/components/slider` | 📄 스펙 문서 — 컴포넌트 미구현 |
| `/components/navigation-drawer` | 📄 스펙 문서 — 컴포넌트 미구현 |
| `/components/list` | 📄 스펙 문서 — 컴포넌트 미구현 |
| `/components/banner` | 📄 스펙 문서 — 컴포넌트 미구현 |

### 기타

| URL | 설명 |
|---|---|
| `/` | Hero + 3원칙 카드 + M3 구조 Overview (Style/Foundation/Components 3열) + Quick Links 8개 + 테마 전환 라이브 데모 |
| `/tokens` | 전체 토큰 테이블 (복사 가능) |

---

## 4. 접근성 구현 현황

| 항목 | 기준 | 상태 |
|---|---|---|
| 터치 영역 | 48×48dp | ✅ 전체 인터랙티브 요소 (`::after` 또는 `min-height`) |
| Focus ring | `3dp solid --color-border-brand` | ✅ 전역 `:focus-visible` + 컴포넌트별 동일 적용 |
| 색상 대비 | WCAG AA 4.5:1 | ✅ `--color-text-on-brand: #29363D` (N600 on M300 = 4.8:1) |
| Switch ARIA | `role="switch"` + `aria-checked` | ✅ Switch.tsx |
| Icon Button aria-label | 필수 | ✅ TypeScript `required`로 강제 |
| TextField aria-describedby | helper/error 연결 | ✅ TextField.tsx |
| TextField aria-invalid | error 상태 | ✅ TextField.tsx |
| Dialog | `role="dialog"` `aria-modal` `aria-labelledby` | ✅ Modal 페이지 데모 |
| Navigation | `role="navigation"` `aria-label` | ✅ BottomNavigation, Sidebar |
| Tab 패턴 | `role="tablist"` `role="tab"` `aria-selected` | ✅ BottomNavigation |
| Disabled 처리 | opacity 아닌 변수 사용 | ✅ `--color-interactive-disabled` / `--color-text-disabled` |
| 다크모드 Shadow | `none` | ✅ `.dark { --shadow-*: none }` |
| 색상만으로 상태 표현 금지 | 아이콘·텍스트 병행 | ✅ 컴포넌트별 구현 |

---

## 5. 소스 문서

### Design.md (AI 레퍼런스 파일)
- 위치: `/Design.md`
- M3 기준 전체 DS 스펙 (국문, AI 가독성 최적화)
- 섹션: Design Philosophy · Environment · Style(Color/Typography/Spacing/Shape/Elevation) · Foundation(Accessibility/Motion) · Components(16종 상세 스펙)
- Claude Code, Cursor 세션에서 자동 참조

### design-system/ (컴포넌트 스펙 마크다운)

| 파일 | 내용 |
|---|---|
| `components/button.md` | 변형·상태·크기·스펙 |
| `components/text-field.md` | 상태명·색상·M3 스펙 |
| `components/selection.md` | Checkbox·Radio·Switch |
| `components/chips.md` | 4타입 행동 정의 |
| `components/card.md` | 레이아웃·슬롯 스펙 |
| `components/navigation.md` | Bottom Nav·Drawer·Tab |
| `components/feedback.md` | Snackbar·Banner |
| `tokens.md` | 전체 토큰 카탈로그 |
| `theming.md` | 멀티 테마·다크모드 가이드 |

### CLAUDE.md (Claude Code 세션 규칙)
- 절대 규칙: 하드코딩 금지, disabled = 변수 처리, Primary 버튼 1개 제한
- 접근성 규칙: 48dp 터치, aria-label, Focus 3dp
- 전체 CSS 변수 목록 (참조용)
- Duotone 테마 교체 변수, 다크모드 변수

---

## 6. Git 커밋 히스토리 (주요)

| 커밋 | 내용 |
|---|---|
| `62e70c5` | Sidebar STYLE/FOUNDATION/COMPONENTS 3그룹 + 신규 Foundation 6페이지 + Shape 페이지 + Home Overview 카드 |
| `c40f3dc` | M3 Type Scale 15종 CSS 변수 + Tonal Elevation L0~L5 + FAB 컴포넌트 + BottomNavigation 컴포넌트 + Focus 3dp 통일 + Activated→Populated |
| `87a3e0c` | Design.md 기준 전체 토큰 동기화 + `--shape-xl` 28px 수정 + CLAUDE.md 업데이트 |
| `e40a8c0` | Radio/Checkbox/Switch/Card/Chip 접근성 + 모션 토큰 전체 적용 |
| `a3f0ad5` | TextField 컴포넌트 (Filled/Outlined, Floating Label, M3 Notch outline) |
| `4c5479d` | 전역 색상 토큰 위반 수정, `--color-text-on-brand` N600 전환 |
| `5af2d5b` | Button 컴포넌트 (Primary/Outlined/Text, sm/md/lg, loading spinner) |

---

## 7. 미구현 / 다음 단계

### 컴포넌트 — 실제 구현 필요 (현재 스펙 문서만 존재)

| 컴포넌트 | 비고 |
|---|---|
| App Bar | M3 Center-aligned / Small 2종 |
| Tab | Primary Tab (상단 indicator) / Secondary Tab (Pill 배경) |
| Navigation Drawer | Modal / Standard 2종 |
| Menu | Dropdown / Context menu |
| Snackbar | Text only / With Action / With Close |
| Slider | Continuous / Discrete / Range |
| Banner | Info / Warning / Error / Success |
| List | Single-line / Two-line / Three-line |
| FAB 페이지 | 컴포넌트 연결만 필요 |
| Bottom Navigation 페이지 | 컴포넌트 연결만 필요 |

### CSS 정리

- `--radius-*` legacy alias 변수 제거 예정 (현재 `--shape-*`와 병존)
- 일부 페이지의 `mint-*`, `dark:` Tailwind 클래스 → CSS 변수로 전환 권장

### 기능 추가

- 모바일 Sidebar (햄버거 메뉴, md 미만에서 숨김 상태)
- 컴포넌트 코드 스니펫 복사 기능 (현재 일부만)
- Storybook 연동 (선택)

---

*이 문서는 Claude Code로 자동 생성됨. 프로젝트 상태 변경 시 재생성 필요.*
