# OPENPATH Design System

> Cursor / Claude Code 레퍼런스 파일
> 이 파일의 모든 값은 토큰 기반. 하드코딩 금지.
> **기준: Material Design 3 (M3) · Android 앱 · 360dp 뷰포트 · 국문**
> Last updated: 2026.04.10 (M3 기준 전환 / Android 수치 적용 / 접근성 섹션 추가 / Motion 추가)

---

## Design Philosophy

오픈패스 DS는 세 원칙 위에 설계된 교육 브랜드 범용 DS.
**Material Design 3(M3)** 구조를 따르며, Android 앱을 주요 타겟으로 한다.

| 원칙 | 한 줄 정의 |
|---|---|
| **Clarity** | 사람도, AI도 오해 없이 읽을 수 있어야 한다 |
| **Scalability** | 브랜드·모드·플랫폼이 바뀌어도 시스템은 유지된다 |
| **Autonomy** | 이 DS를 가진 디자이너는 혼자서도 일관된 제품을 만들 수 있다 |

민트(#28D7D2) 계열의 신뢰감 있고 깔끔한 테크 무드.
멀티 테마: Openpath (민트) / Duotone (코랄 #FE6565)
모드: Light / Dark

### M3 DS 구조 (CD님 미팅 기준)

```
Style         시각 요소 — Color · Typography · Iconography · Shape · Elevation
Foundation    환경 요소 — Environment · Principle · Naming · Token · Accessibility · Motion
Component     UI 구성 요소
```

> M2의 Foundation에 시각 요소를 넣던 방식은 폐기.
> M3는 시각 요소를 Style로 분리. AI도 이 구조가 더 읽기 좋다.

---

## Environment (환경 설정)

> DS 착수 전 선언하는 기술 환경. 강의 첫 챕터에서 선포하고 시작.

| 항목 | 결정값 |
|---|---|
| 플랫폼 | Android (AOS) |
| 뷰포트 | 360 × 800dp (기본) |
| 언어 | 국문 기준 |
| 디자인 툴 | Figma |
| 핸드오프 | Figma Dev Mode |
| 단위 | dp (1dp = 1px @1x) |
| 컬럼 그리드 | 4컬럼, 마진 16dp, 거터 8dp |
| 멀티 테마 | Openpath / Duotone |
| 모드 | Light / Dark |

---

## Style — Color

### Primary — Openpath (Mint)

| Token | Value | M3 역할 |
|---|---|---|
| `color/palette/primary/M20` | `#F3FCFC` | Primary Container (subtle) |
| `color/palette/primary/M50` | `#D6F5F5` | Primary Container |
| `color/palette/primary/M100` | `#A8EBEA` | |
| `color/palette/primary/M200` | `#6DDEDD` | |
| `color/palette/primary/M300` | `#28D7D2` | **Primary** |
| `color/palette/primary/M400` | `#1BB8B3` | On Primary Container |
| `color/palette/primary/M500` | `#0F9490` | |
| `color/palette/primary/M600` | `#156565` | Primary Dark |

### Primary — Duotone (Coral)

| Token | Value | M3 역할 |
|---|---|---|
| `color/palette/duotone/D20` | `#FFF1F1` | |
| `color/palette/duotone/D50` | `#FFD6D6` | Primary Container |
| `color/palette/duotone/D100` | `#FFB0B0` | |
| `color/palette/duotone/D200` | `#FF8E8E` | |
| `color/palette/duotone/D300` | `#FE6565` | **Primary** |
| `color/palette/duotone/D400` | `#E54D4D` | On Primary Container |
| `color/palette/duotone/D500` | `#C93838` | |
| `color/palette/duotone/D600` | `#A02828` | Primary Dark |

### Neutral

| Token | Value | M3 역할 |
|---|---|---|
| `color/palette/neutral/N20` | `#F4F5F5` | Surface |
| `color/palette/neutral/N100` | `#D8DCDE` | Outline |
| `color/palette/neutral/N200` | `#B0B8BC` | Outline Variant |
| `color/palette/neutral/N300` | `#889298` | On Surface Variant |
| `color/palette/neutral/N400` | `#60707A` | |
| `color/palette/neutral/N500` | `#3D5060` | |
| `color/palette/neutral/N600` | `#29363D` | On Surface |

### System (M3 Error·Success·Warning 대응)

| Token | Value | M3 역할 |
|---|---|---|
| `color/palette/system/red` | `#FF3257` | Error |
| `color/palette/system/mint` | `#28D7D2` | Success (브랜드 민트) |
| `color/palette/system/orange` | `#EE706B` | Warning |
| `color/palette/system/black` | `#151B1E` | On Background |
| `color/palette/system/white` | `#FFFFFF` | Background |

### Semantic — M3 Color Roles (Light / Dark)

| Token | Light | Dark | M3 Role |
|---|---|---|---|
| `color/brand/primary` | M300 `#28D7D2` | M300 `#28D7D2` | Primary |
| `color/brand/primary/container` | M50 `#D6F5F5` | M600 `#156565` | Primary Container |
| `color/text/default` | N600 `#29363D` | White `#FFFFFF` | On Surface |
| `color/text/subtle` | N300 `#889298` | N200 `#B0B8BC` | On Surface Variant |
| `color/text/disabled` | N100 `#D8DCDE` | N400 `#60707A` | — |
| `color/text/on-brand` | White `#FFFFFF` | White `#FFFFFF` | On Primary |
| `color/bg/default` | White `#FFFFFF` | N600 `#29363D` | Background |
| `color/bg/subtle` | N20 `#F4F5F5` | N500 `#3D5060` | Surface |
| `color/bg/brand` | M20 `#F3FCFC` | M600 `#156565` | Primary Container |
| `color/bg/warning` | `#FFF8F0` | `#2A1F0F` | — |
| `color/bg/error` | `#FFF0F3` | `#2A0F14` | Error Container |
| `color/border/default` | N100 `#D8DCDE` | N400 `#60707A` | Outline |
| `color/border/brand` | M300 `#28D7D2` | M300 `#28D7D2` | Primary |
| `color/border/hover` | N300 `#889298` | N200 `#B0B8BC` | Outline Variant |
| `color/status/error` | `#FF3257` | `#FF3257` | Error |
| `color/status/success` | `#28D7D2` | `#28D7D2` | — |
| `color/status/warning` | `#EE706B` | `#EE706B` | — |
| `color/interactive/primary` | M300 `#28D7D2` | M300 `#28D7D2` | Primary |
| `color/interactive/hover` | M400 `#1BB8B3` | M200 `#6DDEDD` | — |
| `color/interactive/pressed` | M500 `#0F9490` | M100 `#A8EBEA` | — |
| `color/interactive/disabled` | N100 `#D8DCDE` | N400 `#60707A` | — |

### Shadow Color (Light / Dark)

| Token | Light | Dark |
|---|---|---|
| `color/shadow/default` | `rgba(21,27,30, 0.08)` | `rgba(0,0,0, 0.00)` |
| `color/shadow/medium` | `rgba(21,27,30, 0.12)` | `rgba(0,0,0, 0.00)` |
| `color/shadow/strong` | `rgba(21,27,30, 0.20)` | `rgba(0,0,0, 0.00)` |

> 다크모드 Shadow는 opacity 0. 위계는 `color/bg/subtle`로 표현 (M3 Tonal Surface 방식).

---

## Style — Typography

- EN: Mark Pro / KO: Noto Sans KR
- 한글은 line-height +0.1 적용 (EN 1.5 → KO 1.6)
- **Android 기준 sp 단위 사용 (1sp = 1px @1x)**
- M3 Type Scale 기준으로 역할 정의

| Style | M3 Role | Size | Weight | LH | Tracking |
|---|---|---|---|---|---|
| `type/display/lg` | Display Large | 57sp | Regular (400) | 1.12 | -0.02em |
| `type/display/md` | Display Medium | 45sp | Regular | 1.16 | 0em |
| `type/display/sm` | Display Small | 36sp | Regular | 1.22 | 0em |
| `type/headline/lg` | Headline Large | 32sp | Regular | 1.25 | 0em |
| `type/headline/md` | Headline Medium | 28sp | Regular | 1.29 | 0em |
| `type/headline/sm` | Headline Small | 24sp | Regular | 1.33 | 0em |
| `type/title/lg` | Title Large | 22sp | Regular | 1.27 | 0em |
| `type/title/md` | Title Medium | 16sp | Medium (500) | 1.5 | 0.02em |
| `type/title/sm` | Title Small | 14sp | Medium | 1.43 | 0.01em |
| `type/body/lg` | Body Large | 16sp | Regular | 1.5 | 0.03em |
| `type/body/md` | Body Medium | 14sp | Regular | 1.43 | 0.02em |
| `type/body/sm` | Body Small | 12sp | Regular | 1.33 | 0.04em |
| `type/label/lg` | Label Large | 14sp | Medium | 1.43 | 0.01em |
| `type/label/md` | Label Medium | 12sp | Medium | 1.33 | 0.05em |
| `type/label/sm` | Label Small | 11sp | Medium | 1.45 | 0.05em |

---

## Style — Spacing (4배수 베이스, Android 기준)

> M3는 4dp 그리드 시스템. 모든 여백은 4의 배수.

| Token | Value | 주요 용도 |
|---|---|---|
| `space/01` | 4dp | 아이콘 내부 패딩, 최소 간격 |
| `space/02` | 8dp | 컴포넌트 내부 간격 |
| `space/03` | 12dp | 소형 패딩 |
| `space/04` | 16dp | 기본 패딩 · Android 마진 |
| `space/05` | 20dp | 중간 간격 |
| `space/06` | 24dp | 섹션 내부 간격 |
| `space/07` | 32dp | 카드·컨테이너 패딩 |
| `space/08` | 40dp | 섹션 간 간격 |
| `space/09` | 48dp | 대형 패딩 |
| `space/10` | 64dp | 페이지 레벨 간격 |
| `space/11` | 80dp | Hero 섹션 |
| `space/12` | 96dp | 최대 여백 |

### Android 레이아웃 그리드

| 뷰포트 | 컬럼 | 마진 | 거터 |
|---|---|---|---|
| Compact (< 600dp) | 4컬럼 | 16dp | 8dp |
| Medium (600~840dp) | 12컬럼 | 24dp | 16dp |
| Expanded (> 840dp) | 12컬럼 | 24dp | 24dp |

> 오픈패스 기본 타겟: **Compact 360dp** (4컬럼, 마진 16dp, 거터 8dp)

---

## Style — Shape (M3 Shape Scale)

> M3는 Radius를 Shape라 부름. 5단계 Shape Scale.

| Token | Value | M3 Shape | 사용처 |
|---|---|---|---|
| `shape/none` | 0dp | None | 전체 너비 컴포넌트 |
| `shape/xs` | 4dp | Extra Small | Chip, Badge, Tooltip |
| `shape/sm` | 8dp | Small | Button, Text Field, Snackbar |
| `shape/md` | 12dp | Medium | Card (small) |
| `shape/lg` | 16dp | Large | Card, Dialog, Bottom Sheet |
| `shape/xl` | 28dp | Extra Large | FAB, Bottom Nav |
| `shape/full` | 9999dp | Full | Pill Button, Switch Track |

### 컴포넌트별 Shape 연결

| 컴포넌트 | Shape Token | Value |
|---|---|---|
| Button | `shape/full` | 9999dp (M3 기본) |
| Text Field | `shape/xs` | 4dp (상단만) |
| Card | `shape/lg` | 16dp |
| Dialog | `shape/xl` | 28dp |
| Chip | `shape/sm` | 8dp |
| FAB | `shape/lg` | 16dp |
| Bottom Sheet | `shape/xl` | 28dp (상단만) |
| Snackbar | `shape/xs` | 4dp |
| Switch Track | `shape/full` | 9999dp |

> ⚠️ M3 Button은 기본 Pill(full radius). 기존 8dp에서 변경.

---

## Style — Elevation (M3 Tonal Elevation)

> M3는 Shadow 대신 **Tonal Surface Color**로 Elevation 표현.
> 다크모드에서 Shadow 없이 Surface 색상만으로 위계 구분.

| Level | M3 이름 | Shadow | Tonal Overlay | 사용처 |
|---|---|---|---|---|
| 0 | Level 0 | none | 0% | 배경, 기본 Surface |
| 1 | Level 1 | `shadow/01` | 5% | Card, List |
| 2 | Level 2 | `shadow/02` | 8% | Dropdown, Tooltip |
| 3 | Level 3 | `shadow/03` | 11% | App Bar, Bottom Nav |
| 4 | Level 4 | `shadow/03` | 12% | FAB (resting) |
| 5 | Level 5 | `shadow/04` | 14% | Dialog, Modal |

| Shadow Style | X | Y | Blur | Spread | Color Token |
|---|---|---|---|---|---|
| `shadow/01` | 0 | 1dp | 2dp | 0 | `color/shadow/default` |
| `shadow/02` | 0 | 1dp | 2dp | 0 + 0 2dp 6dp 2dp | `color/shadow/default` |
| `shadow/03` | 0 | 1dp | 3dp | 1dp + 0 4dp 8dp 3dp | `color/shadow/medium` |
| `shadow/04` | 0 | 2dp | 3dp | 0 + 0 6dp 10dp 4dp | `color/shadow/strong` |

---

## Foundation — Accessibility (접근성)

> M3 접근성 가이드라인 기반. WCAG 2.1 AA 준수 목표.

### 색상 대비 (Color Contrast)

| 용도 | 최소 대비율 | 기준 |
|---|---|---|
| 일반 텍스트 (18sp 미만) | 4.5:1 | WCAG AA |
| 대형 텍스트 (18sp 이상 / Bold 14sp 이상) | 3:1 | WCAG AA |
| UI 컴포넌트 (아이콘, 테두리) | 3:1 | WCAG AA |
| 장식 요소 | 없음 | — |

### 오픈패스 DS 주요 색상 대비율

| 조합 | 대비율 | AA 통과 |
|---|---|---|
| White on M300 (#28D7D2) | 2.1:1 | ❌ 불통과 |
| N600 on M300 (#28D7D2) | 4.8:1 | ✅ 통과 |
| White on N600 (#29363D) | 11.2:1 | ✅ 통과 |
| N300 on White | 3.2:1 | ✅ 대형만 통과 |
| N100 on White | 1.4:1 | ❌ 불통과 (disabled 전용) |

> ⚠️ **중요**: Primary 버튼(민트 배경)에 흰 텍스트는 대비율 부족.
> → `color/text/on-brand`를 White 대신 N600 `#29363D`으로 변경 권장.
> → 또는 버튼 배경을 M500 `#0F9490` 이상으로 올려야 AA 통과.

### 터치 영역 (Touch Target)

| 항목 | M3 최소 기준 | 적용 |
|---|---|---|
| 최소 터치 영역 | 48 × 48dp | 모든 인터랙티브 요소 |
| 아이콘 버튼 | 48 × 48dp | 시각 크기 24dp라도 터치 48dp |
| Checkbox / Radio | 48 × 48dp | |
| List 아이템 | 최소 높이 48dp | |

### Focus Indicator (키보드 / 보조기기)

```css
/* Focus ring — 모든 인터랙티브 요소 */
:focus-visible {
  outline: 3px solid var(--color-border-brand);
  outline-offset: 2px;
  border-radius: inherit;
}
```

| 속성 | 값 |
|---|---|
| 두께 | 3dp |
| 색상 | `color/border/brand` (M300) |
| offset | 2dp |

### Semantic HTML & ARIA

| 컴포넌트 | 필수 ARIA |
|---|---|
| Button | `role="button"`, `aria-disabled` (disabled 시) |
| Icon Button | `aria-label` 필수 |
| Toggle (Switch) | `role="switch"`, `aria-checked` |
| Dialog | `role="dialog"`, `aria-modal`, `aria-labelledby` |
| Navigation | `role="navigation"`, `aria-label` |
| Tab | `role="tablist"`, `role="tab"`, `aria-selected` |
| Loading | `aria-busy="true"`, `aria-live="polite"` |
| Error | `aria-describedby` → helper text 연결 |

### 접근성 체크리스트 (컴포넌트 완성 시 확인)

```
□ 모든 인터랙티브 요소 터치 영역 48×48dp 이상
□ 텍스트 대비율 4.5:1 이상 (대형은 3:1)
□ Focus indicator 3dp 이상
□ 아이콘 버튼에 aria-label 있음
□ form 요소에 label 연결됨
□ 에러 메시지 aria-describedby 연결
□ 로딩 상태 aria-busy 처리
□ 색상만으로 정보 전달 안 함 (아이콘·텍스트 병행)
```

---

## Foundation — Motion (M3 기준)

> M3 Motion은 Easing + Duration 조합으로 정의.

### Easing

| Token | Curve | 용도 |
|---|---|---|
| `motion/easing/standard` | cubic-bezier(0.2, 0, 0, 1) | 일반 화면 전환 |
| `motion/easing/standard-decelerate` | cubic-bezier(0, 0, 0, 1) | 화면 진입 |
| `motion/easing/standard-accelerate` | cubic-bezier(0.3, 0, 1, 1) | 화면 퇴장 |
| `motion/easing/emphasized` | cubic-bezier(0.2, 0, 0, 1) | 강조 전환 |

### Duration

| Token | Value | 용도 |
|---|---|---|
| `motion/duration/short1` | 50ms | 즉각 반응 (ripple) |
| `motion/duration/short2` | 100ms | 소형 상태 변화 |
| `motion/duration/short3` | 150ms | 아이콘 변환 |
| `motion/duration/short4` | 200ms | Tooltip, Focus indicator |
| `motion/duration/medium1` | 250ms | 일반 컴포넌트 전환 |
| `motion/duration/medium2` | 300ms | Drawer, Bottom Sheet |
| `motion/duration/long1` | 350ms | 전체 화면 전환 |
| `motion/duration/long2` | 400ms | Dialog, Modal |

### CSS 변수

```css
--motion-standard:   cubic-bezier(0.2, 0, 0, 1);
--motion-decelerate: cubic-bezier(0, 0, 0, 1);
--motion-accelerate: cubic-bezier(0.3, 0, 1, 1);

--duration-short:  200ms;
--duration-medium: 300ms;
--duration-long:   400ms;
```

### 적용 규칙

| 상황 | Easing | Duration |
|---|---|---|
| 버튼 hover/press | standard | short2 (100ms) |
| 테마 전환 | standard | medium1 (250ms) |
| Drawer 열기 | standard-decelerate | medium2 (300ms) |
| Dialog 열기 | emphasized | long2 (400ms) |
| Snackbar 진입 | standard-decelerate | medium1 (250ms) |
| Shadow 변화 | standard | short4 (200ms) |

---

## Components

### Button (M3 기준)

> M3 Button은 기본 Pill shape. Filled / Outlined / Text / Elevated / Tonal 5종.
> 오픈패스는 Primary(Filled) / Secondary(Outlined) / Text 3종 사용.

#### Primary (Filled)

| 속성 | Token | Value |
|---|---|---|
| bg / default | `color/interactive/primary` | M300 `#28D7D2` |
| bg / hover | `color/interactive/hover` | M400 `#1BB8B3` |
| bg / pressed | `color/interactive/pressed` | M500 `#0F9490` |
| bg / disabled | `color/interactive/disabled` | N100 `#D8DCDE` |
| text / default | `color/text/on-brand` | N600 `#29363D` ← M3 접근성 기준 |
| text / disabled | `color/text/disabled` | N100 `#D8DCDE` |
| shape | `shape/full` | 9999dp |
| height | — | 40dp |
| padding | `space/04` + `space/06` | 16dp 상하 / 24dp 좌우 |
| typography | `type/label/lg` | 14sp Medium |
| touch target | — | 최소 48dp (시각 40dp) |

> ⚠️ `color/text/on-brand`을 White에서 N600으로 변경. 민트 배경에 White는 대비율 2.1:1로 WCAG 불통과.

#### Secondary (Outlined)

| 속성 | Token | Value |
|---|---|---|
| bg | transparent | — |
| border | `color/border/brand` | M300 `#28D7D2` |
| border-width | 1px | M3 Outlined 기준 |
| text | `color/brand/primary` | M300 `#28D7D2` |
| bg / hover | `color/bg/brand` | M20 `#F3FCFC` |
| text / hover | `color/interactive/hover` | M400 `#1BB8B3` |
| border / disabled | `color/interactive/disabled` | N100 `#D8DCDE` |
| text / disabled | `color/text/disabled` | N100 `#D8DCDE` |
| shape | `shape/full` | 9999dp |
| height | — | 40dp |
| padding | `space/04` + `space/06` | 16dp / 24dp |
| typography | `type/label/lg` | 14sp Medium |

#### Text

| 속성 | Token | Value |
|---|---|---|
| bg | transparent | — |
| text | `color/brand/primary` | M300 `#28D7D2` |
| bg / hover | `color/bg/brand` | M20 `#F3FCFC` |
| text / hover | `color/interactive/hover` | M400 `#1BB8B3` |
| text / disabled | `color/text/disabled` | N100 `#D8DCDE` |
| shape | `shape/full` | 9999dp |
| height | — | 40dp |
| padding | `space/03` + `space/03` | 12dp |
| typography | `type/label/lg` | 14sp Medium |

#### 타입 판단 기준

| 상황 | 타입 |
|---|---|
| 화면의 가장 중요한 단일 액션 | Primary (Filled) |
| 보조 액션, Primary 옆에 배치 | Secondary (Outlined) |
| 최소 강조, 인라인 링크 수준 | Text |

#### Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Primary 버튼 한 화면에 1개 | 한 화면에 Primary 2개 이상 |
| 터치 영역 48dp 이상 확보 | 시각 크기만 맞추고 터치 영역 무시 |
| Disabled는 토큰으로 처리 | `opacity: 0.38`로 Disabled 처리 |

---

### Text Field (Input) — M3 기준

> M3는 Filled / Outlined 2종. 오픈패스도 동일하게 적용.

#### Types

| Type | 설명 | M3 권장 시점 |
|---|---|---|
| **Filled** | 배경색 있음, 하단 border | 폼 밀도가 높은 화면 |
| **Outlined** | 투명 배경, 전체 border | 카드 위, 배경 복잡한 영역 |

#### States

| State | 설명 |
|---|---|
| Enabled | 기본 상태 |
| Hover | 마우스 오버 |
| Focused | 입력 중 |
| Populated | 값 입력됨 (포커스 해제) |
| Error | 유효성 실패 |
| Disabled | 비활성화 |

#### Color Tokens — Filled

| State | bg | border (bottom) | label | text | helper |
|---|---|---|---|---|---|
| Enabled | `color/bg/subtle` | `color/border/default` | `color/text/subtle` | `color/text/default` | `color/text/subtle` |
| Hover | `color/bg/subtle` | `color/border/hover` | `color/text/subtle` | `color/text/default` | `color/text/subtle` |
| Focused | `color/bg/subtle` | `color/border/brand` | `color/brand/primary` | `color/text/default` | `color/text/subtle` |
| Populated | `color/bg/subtle` | `color/border/default` | `color/text/subtle` | `color/text/default` | `color/text/subtle` |
| Error | `color/bg/subtle` | `color/status/error` | `color/status/error` | `color/text/default` | `color/status/error` |
| Disabled | `color/bg/subtle` | transparent | `color/text/disabled` | `color/text/disabled` | `color/text/disabled` |

#### Color Tokens — Outlined

| State | bg | border | label | text | helper |
|---|---|---|---|---|---|
| Enabled | transparent | `color/border/default` | `color/text/subtle` | `color/text/default` | `color/text/subtle` |
| Hover | transparent | `color/border/hover` | `color/text/subtle` | `color/text/default` | `color/text/subtle` |
| Focused | transparent | `color/border/brand` | `color/brand/primary` | `color/text/default` | `color/text/subtle` |
| Populated | transparent | `color/border/default` | `color/text/subtle` | `color/text/default` | `color/text/subtle` |
| Error | transparent | `color/status/error` | `color/status/error` | `color/text/default` | `color/status/error` |
| Disabled | transparent | `color/border/default` | `color/text/disabled` | `color/text/disabled` | `color/text/disabled` |

#### Size 수치 (Android dp 기준)

| 속성 | Value | Token |
|---|---|---|
| 높이 | 56dp | — |
| Padding 좌우 | 16dp | `space/04` |
| Padding 상하 (Filled) | top 16dp / bottom 8dp | `space/04` / `space/02` |
| Label 폰트 (Enabled) | 16sp Regular | `type/body/lg` |
| Label 폰트 (Focused·Populated) | 12sp Medium | `type/label/md` |
| Input 폰트 | 16sp Regular | `type/body/lg` |
| Helper text 폰트 | 12sp Regular | `type/body/sm` |
| Border width (기본) | 1dp | — |
| Border width (Focused·Error) | 2dp | — |
| Shape (Filled) | 4dp top only | `shape/xs` |
| Shape (Outlined) | 4dp 전체 | `shape/xs` |

#### Variant — Prefix / Suffix

| 속성 | Value | Token |
|---|---|---|
| 색상 | N300 | `color/text/subtle` |
| 폰트 | 16sp Regular | `type/body/lg` |
| 간격 | 8dp | `space/02` |

#### Variant — Exposed Dropdown

| 속성 | Value | Token |
|---|---|---|
| icon | chevron-down 24dp | — |
| icon color (기본) | N300 | `color/text/subtle` |
| icon color (Focused) | M300 | `color/brand/primary` |

#### Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Error에 Helper text로 이유 명시 | Error border만 바꾸고 메시지 없음 |
| Placeholder는 예시값 ("홍길동") | Placeholder에 Label 역할 시키기 |
| aria-describedby로 helper text 연결 | 에러 메시지를 시각으로만 표현 |

---

### Selection Controls — M3 기준

#### 판단 기준

| 상황 | 컴포넌트 |
|---|---|
| 여러 개 중 **하나만** 선택 | Radio |
| 여러 개 중 **복수 선택** 가능 | Checkbox |
| **즉시** 반영되는 ON/OFF | Switch |
| **제출 후** 반영되는 ON/OFF | Checkbox |

#### Radio Button

| 속성 | State | Token | Value |
|---|---|---|---|
| icon (ring) | Unselected | `color/border/default` | N100 |
| icon (ring) | Hover | `color/border/hover` | N300 |
| icon (ring) | Selected | `color/border/brand` | M300 |
| icon (ring) | Disabled | `color/interactive/disabled` | N100 |
| icon (dot) | Selected | `color/brand/primary` | M300 |
| label | Default | `color/text/default` | N600 |
| label | Disabled | `color/text/disabled` | N100 |
| state layer | Hover | `color/bg/brand` | M20 |
| state layer | Pressed | `color/brand/primary/container` | M50 |

**Size (Android)**

| 속성 | Value |
|---|---|
| 아이콘 | 20dp |
| 터치 영역 | 48 × 48dp |
| 라벨 간격 | 8dp |
| 라벨 폰트 | `type/body/lg` (16sp) |

#### Checkbox

| 속성 | State | Token | Value |
|---|---|---|---|
| box (border) | Unselected | `color/border/default` | N100 |
| box (border) | Hover | `color/border/hover` | N300 |
| box (bg) | Selected | `color/brand/primary` | M300 |
| box (bg) | Indeterminate | `color/brand/primary` | M300 |
| checkmark | Selected | `color/text/on-brand` | N600 (접근성) |
| label | Default | `color/text/default` | N600 |

> Indeterminate: 하위 항목 일부만 선택. dash(—) 표시.

**Size**

| 속성 | Value |
|---|---|
| 박스 | 18dp × 18dp |
| 박스 shape | `shape/xs` (4dp) |
| 터치 영역 | 48 × 48dp |

#### Switch

| 속성 | State | Token | Value |
|---|---|---|---|
| track | Off | `color/border/default` | N100 |
| track | On | `color/brand/primary` | M300 |
| track | Disabled | `color/interactive/disabled` | N100 |
| thumb | Off | White `#FFFFFF` | — |
| thumb | On | White `#FFFFFF` | — |

**Size (M3 Android 기준)**

| 속성 | Value |
|---|---|
| Track | 52 × 32dp |
| Track shape | `shape/full` |
| Thumb (Off) | 16dp |
| Thumb (On) | 24dp |
| Thumb with icon | 24dp |
| 터치 영역 | 48 × 48dp |

---

### Chips — M3 기준

#### Types

| Type | 설명 | 사용 시점 |
|---|---|---|
| **Assist** | 액션 제안 | 컨텍스트 맞는 빠른 액션 |
| **Filter** | 필터링. 선택 시 체크 | 목록·검색 결과 필터 |
| **Input** | 입력값 태그화. X 버튼 | 이메일 수신자, 검색 태그 |
| **Suggestion** | AI/시스템 추천 | 검색 추천어, 챗봇 빠른 답변 |

#### Color Tokens

| 속성 | State | Token | Value |
|---|---|---|---|
| bg | Enabled | `color/bg/default` | White |
| bg | Hover | `color/bg/subtle` | N20 |
| bg | Selected (Filter) | `color/bg/brand` | M20 |
| bg | Disabled | `color/bg/subtle` | N20 |
| border | Enabled | `color/border/default` | N100 |
| border | Focused | `color/border/brand` | M300 |
| border | Selected | `color/border/brand` | M300 |
| label | Enabled | `color/text/default` | N600 |
| label | Selected | `color/brand/primary` | M300 |
| label | Disabled | `color/text/disabled` | N100 |

#### Size (Android dp)

| 속성 | Value | Token |
|---|---|---|
| 높이 | 32dp | — |
| Padding 좌우 | 12dp | `space/03` |
| Shape | `shape/sm` | 8dp |
| 폰트 | `type/label/lg` | 14sp Medium |
| 아이콘 | 18dp | — |
| 터치 영역 | 48dp 높이 | — |

---

### Card — M3 기준

> M3 Card는 Elevated / Filled / Outlined 3종.
> 오픈패스는 Elevated(기본) 사용.

#### Variants

| Variant | 구성 | 사용 시점 |
|---|---|---|
| **Basic** | 이미지 + 제목 + 본문 + 액션 | 일반 콘텐츠 |
| **Expand** | Basic + 펼치기/접기 | 긴 본문 |
| **Overflow Menu** | Basic + ⋮ | 액션 3개 이상 |
| **Stars to Rate** | Basic + 별점 입력 | 리뷰·평가 |
| **With Chips** | Basic + Chip 그룹 | 태그·카테고리 |
| **With Slider** | Basic + Slider | 미디어, 범위 설정 |

#### Elevation & Color

| 속성 | Token | Value |
|---|---|---|
| bg | `color/bg/default` | White |
| shadow (기본) | `shadow/01` | Level 1 |
| shadow (hover) | `shadow/02` | Level 2 |
| shape | `shape/lg` | 16dp |
| border (Outlined) | `color/border/default` | N100 |

#### Size (Android dp)

| 속성 | Value | Token |
|---|---|---|
| 내부 패딩 | 16dp | `space/04` |
| 콘텐츠 간격 | 8dp | `space/02` |
| 액션 상단 간격 | 16dp | `space/04` |
| Hover transition | 200ms | `--duration-short` |

---

### App Bar — M3 기준

#### Types

| Type | 높이 | 설명 |
|---|---|---|
| **Center-Aligned** | 64dp | 제목 중앙. Android 기본 |
| **Small** | 64dp | 제목 좌측 |
| **Medium** | 112dp | 제목 아래로 확장 |
| **Large** | 152dp | 대형 제목 |
| **Bottom App Bar** | 80dp | 하단 고정, FAB 포함 가능 |

#### Elevation

| 상태 | Elevation | Shadow |
|---|---|---|
| 스크롤 전 | Level 0 | none |
| 스크롤 후 (sticky) | Level 3 | `shadow/03` |

#### Color Tokens

| 속성 | Token | Value |
|---|---|---|
| bg | `color/bg/default` | White (Light) |
| bg (scrolled) | `color/bg/subtle` | N20 |
| title | `color/text/default` | N600 |
| icon | `color/text/default` | N600 |
| icon (hover) | `color/interactive/hover` | M400 |

#### Size (Android dp)

| 속성 | Value |
|---|---|
| 아이콘 크기 | 24dp |
| 아이콘 터치 영역 | 48dp |
| 좌우 패딩 | 16dp |
| 제목 폰트 (Small) | `type/title/lg` (22sp) |
| 제목 폰트 (Medium) | `type/headline/sm` (24sp) |
| 제목 폰트 (Large) | `type/headline/md` (28sp) |

---

### Bottom Navigation — M3 Navigation Bar

> M3 이름: Navigation Bar

#### Color Tokens

| 속성 | State | Token | Value |
|---|---|---|---|
| bg | — | `color/bg/default` | White |
| icon | Inactive | `color/text/subtle` | N300 |
| icon | Active | `color/brand/primary` | M300 |
| label | Inactive | `color/text/subtle` | N300 |
| label | Active | `color/brand/primary` | M300 |
| indicator | Active | `color/bg/brand` | M20 |
| badge | — | `color/status/error` | #FF3257 |

#### Size (Android dp)

| 속성 | Value |
|---|---|
| 높이 | 80dp |
| 아이콘 | 24dp |
| Active indicator | 64 × 32dp, shape/full |
| 라벨 폰트 | `type/label/md` (12sp) |
| 최소 탭 수 | 3개 |
| 최대 탭 수 | 5개 |

---

### Navigation Drawer — M3 기준

#### Types

| Type | 설명 |
|---|---|
| **Modal** | 오버레이 위 슬라이드 인 |
| **Standard** | 콘텐츠 옆 고정 |

#### Elevation & Color

| 속성 | Token | Value |
|---|---|---|
| bg | `color/bg/default` | White |
| Modal shadow | `shadow/03` | Level 3 |
| Scrim | — | `rgba(21,27,30, 0.40)` |
| item (active bg) | `color/bg/brand` | M20 |
| item (active label) | `color/brand/primary` | M300 |
| item shape | `shape/full` | 9999dp (pill) |

#### Size (Android dp)

| 속성 | Value |
|---|---|
| 너비 | 360dp (최대) |
| 아이템 높이 | 56dp |
| 아이콘 크기 | 24dp |
| 라벨 폰트 | `type/label/lg` (14sp) |

---

### Tab — M3 기준

#### Types

| Type | 설명 |
|---|---|
| **Primary Tab** | 상단 indicator 라인 |
| **Secondary Tab** | Pill 배경 |

#### Color Tokens

| 속성 | State | Token | Value |
|---|---|---|---|
| label | Inactive | `color/text/subtle` | N300 |
| label | Active | `color/brand/primary` | M300 |
| indicator (Primary) | Active | `color/brand/primary` | M300 |
| pill bg (Secondary) | Active | `color/bg/brand` | M20 |

#### Size (Android dp)

| 속성 | Value |
|---|---|
| 높이 | 48dp |
| 좌우 패딩 | 16dp |
| Indicator 두께 | 2dp |
| 라벨 폰트 | `type/title/sm` (14sp Medium) |
| 터치 영역 | 48dp |

---

### Menu — M3 기준

#### Elevation

| Token | Value |
|---|---|
| `shadow/02` | Level 2 |

#### Color Tokens

| 속성 | State | Token | Value |
|---|---|---|---|
| bg | — | `color/bg/default` | White |
| item | Hover | `color/bg/subtle` | N20 |
| item | Pressed | `color/bg/brand` | M20 |
| item label | Default | `color/text/default` | N600 |
| item label | Destructive | `color/status/error` | #FF3257 |
| divider | — | `color/border/default` | N100 |

#### Size (Android dp)

| 속성 | Value |
|---|---|
| 최소 너비 | 112dp |
| 최대 너비 | 280dp |
| 아이템 높이 | 48dp |
| 좌우 패딩 | 16dp |
| shape | `shape/xs` (4dp) |
| 라벨 폰트 | `type/body/lg` (16sp) |

---

### Snackbar — M3 기준

#### Types

| Type | 설명 |
|---|---|
| Text only | 메시지만 |
| With Action | 메시지 + 액션 버튼 |
| With Close | 메시지 + X |

#### Elevation & Color

| 속성 | Token | Value |
|---|---|---|
| bg | `color/text/default` (반전) | N600 (Light) |
| text | `color/bg/default` (반전) | White (Light) |
| action | `color/brand/primary` | M300 |
| shadow | `shadow/03` | Level 3 |
| shape | `shape/xs` | 4dp |

#### Size (Android dp)

| 속성 | Value |
|---|---|
| 높이 (1줄) | 48dp |
| 높이 (2줄) | 68dp |
| 좌우 패딩 | 16dp |
| 최소 너비 | 288dp |
| 최대 너비 | 568dp |
| 폰트 | `type/body/md` (14sp) |
| 노출 시간 | 4초 |

---

### Slider — M3 기준

#### Types

| Type | 설명 |
|---|---|
| Continuous | 자유 값 |
| Discrete | 스텝 단위 |
| Range | 두 핸들 |

#### Color Tokens

| 속성 | State | Token | Value |
|---|---|---|---|
| track (active) | — | `color/brand/primary` | M300 |
| track (inactive) | — | `color/border/default` | N100 |
| thumb | Default | `color/brand/primary` | M300 |
| thumb | Hover/Pressed | `color/interactive/hover` | M400 |
| value label | — | `color/brand/primary` bg | M300 |

#### Size (Android dp)

| 속성 | Value |
|---|---|
| Track 높이 | 4dp |
| Thumb | 20dp |
| Thumb (pressed) | 28dp |
| 터치 영역 | 48dp 높이 |
| Value label 폰트 | `type/label/md` (12sp) |

---

### FAB — M3 기준

#### Types

| Type | 크기 | Shape |
|---|---|---|
| **Small FAB** | 40dp | `shape/lg` (16dp) |
| **FAB** | 56dp | `shape/lg` (16dp) |
| **Large FAB** | 96dp | `shape/xl` (28dp) |
| **Extended FAB** | 56dp 높이 | `shape/lg` (16dp) |

> M3 FAB shape는 Pill이 아닌 Rounded Square.

#### Elevation & Color

| 속성 | State | Token | Value |
|---|---|---|---|
| bg | Default | `color/brand/primary` | M300 |
| bg | Hover | `color/interactive/hover` | M400 |
| bg | Pressed | `color/interactive/pressed` | M500 |
| icon | — | `color/text/on-brand` | N600 (접근성) |
| shadow | Default | `shadow/03` | Level 3 |
| shadow | Hover | `shadow/04` | Level 5 |

#### Size (Android dp)

| Type | 크기 | 아이콘 | 터치 |
|---|---|---|---|
| Small FAB | 40dp | 24dp | 48dp |
| FAB | 56dp | 24dp | 56dp |
| Large FAB | 96dp | 36dp | 96dp |
| Extended (높이) | 56dp | 24dp | 56dp |

---

### Banner

#### Types & Color

| Type | bg Token | accent | border-left |
|---|---|---|---|
| Informational | `color/bg/subtle` | `color/brand/primary` | `color/brand/primary` |
| Warning | `color/bg/warning` | `color/status/warning` | `color/status/warning` |
| Error | `color/bg/error` | `color/status/error` | `color/status/error` |
| Success | `color/bg/brand` | `color/status/success` | `color/status/success` |

#### Size (Android dp)

| 속성 | Value |
|---|---|
| 좌우 패딩 | 16dp |
| 상하 패딩 | 12dp |
| 좌측 border | 4dp |
| 아이콘 | 20dp |
| shape | `shape/xs` (4dp) |
| 제목 폰트 | `type/label/lg` (14sp Medium) |
| 본문 폰트 | `type/body/sm` (12sp) |

---

### List — M3 기준

#### Types

| Type | 높이 | 구성 |
|---|---|---|
| Single-line | 48dp | 텍스트만 |
| Two-line | 64dp | 제목 + 서브텍스트 |
| Three-line | 88dp | 제목 + 서브텍스트 2줄 |

Leading: 아이콘 / 아바타 / Checkbox / Radio / 썸네일
Trailing: 아이콘 / 텍스트 / Checkbox / Switch

#### Color Tokens

| 속성 | State | Token | Value |
|---|---|---|---|
| bg | Default | `color/bg/default` | White |
| bg | Hover | `color/bg/subtle` | N20 |
| bg | Selected | `color/bg/brand` | M20 |
| title | Default | `color/text/default` | N600 |
| subtext | Default | `color/text/subtle` | N300 |
| icon | Default | `color/text/subtle` | N300 |
| divider | — | `color/border/default` | N100 |

#### Size (Android dp)

| 속성 | Value |
|---|---|
| 좌우 패딩 | 16dp |
| Leading 아이콘 | 24dp |
| 간격 | 16dp |
| 제목 폰트 | `type/body/lg` (16sp) |
| 서브텍스트 폰트 | `type/body/md` (14sp) |

---

## Do / Don't (전역)

- Primary 버튼 한 화면에 1개
- **색상 하드코딩 절대 금지 → 반드시 CSS 변수 참조**
- 텍스트는 동사로 시작 (저장하기, 신청하기)
- Variant 이름은 역할 기반 (`Type=Filled`, `State=Disabled`)
- State와 Type 혼용 금지
- 다크모드 컴포넌트 복제 금지 → Variable Mode 교체
- Shadow 다크모드 복제 금지 → opacity 0 토큰
- 모든 인터랙티브 요소 터치 영역 48dp 이상
- 색상만으로 정보 전달 금지 → 아이콘·텍스트 병행
- `opacity: 0.38` Disabled 처리 금지 → 토큰 사용

---

## Theming Guide

오픈패스 DS는 CSS 변수 교체만으로 완전한 테마 전환이 가능하다.

### 기본 테마 — Openpath (Mint)

```css
--color-interactive-primary: #28D7D2;
--color-interactive-hover:   #1BB8B3;
--color-interactive-pressed: #0F9490;
--color-brand-primary:       #28D7D2;
--color-bg-brand:            #F3FCFC;
--color-border-brand:        #28D7D2;
```

### 테마 교체 — Duotone (Coral)

```css
--color-interactive-primary: #FE6565;
--color-interactive-hover:   #E54D4D;
--color-interactive-pressed: #C93838;
--color-brand-primary:       #FE6565;
--color-bg-brand:            #FFF1F1;
--color-border-brand:        #FE6565;
```

### 다크모드

```css
[data-theme="dark"] {
  --color-text:           #FFFFFF;
  --color-text-subtle:    #B0B8BC;
  --color-text-disabled:  #60707A;
  --color-bg:             #29363D;
  --color-bg-subtle:      #3D5060;
  --color-bg-brand:       #156565;
  --color-border:         #60707A;
  --shadow-01: none;
  --shadow-02: none;
  --shadow-03: none;
  --shadow-04: none;
}
```

### 새 서비스 적용

1. Primary 계열 변수만 교체
2. Neutral / System / Spacing / Shape 유지
3. 폰트 선택적 변경

| 서비스 | 테마 |
|---|---|
| openpath.kr | Mint `#28D7D2` |
| duotone.kr | Coral `#FE6565` |
| 신규 서비스 | Primary 계열만 교체 |

### 교체 불필요 (테마 무관)

```
Neutral · System · Spacing · Shape · Shadow (Light/Dark 분기만)
```
