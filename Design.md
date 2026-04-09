# OPENPATH Design System

> Cursor / Claude Code 레퍼런스 파일
> 이 파일의 모든 값은 토큰 기반. 하드코딩 금지.
> Last updated: 2026.04.09 (Button Outlined·Text 추가 / Banner 토큰 추가 / Theming Guide 추가 / 컴포넌트 12종 스펙 추가)

---

## Design Philosophy

오픈패스 DS는 세 원칙 위에 설계된 교육 브랜드 범용 DS.

| 원칙 | 한 줄 정의 |
|---|---|
| **Clarity** | 사람도, AI도 오해 없이 읽을 수 있어야 한다 |
| **Scalability** | 브랜드·모드·플랫폼이 바뀌어도 시스템은 유지된다 |
| **Autonomy** | 이 DS를 가진 디자이너는 혼자서도 일관된 제품을 만들 수 있다 |

민트(#28D7D2) 계열의 신뢰감 있고 깔끔한 테크 무드.  
멀티 테마: Openpath (민트) / Duotone (코랄 #FE6565)  
모드: Light / Dark

---

## Colors

### Primary — Openpath (Mint)

| Token | Value | 용도 |
|---|---|---|
| `color/palette/primary/M20` | `#F3FCFC` | 배경·hover 영역 |
| `color/palette/primary/M50` | `#D6F5F5` | subtle 배경 |
| `color/palette/primary/M100` | `#A8EBEA` | |
| `color/palette/primary/M200` | `#6DDEDD` | |
| `color/palette/primary/M300` | `#28D7D2` | **메인 브랜드 — 버튼·링크·강조** |
| `color/palette/primary/M400` | `#1BB8B3` | hover |
| `color/palette/primary/M500` | `#0F9490` | pressed |
| `color/palette/primary/M600` | `#156565` | Dark mode 강조 |

### Primary — Duotone (Coral)

| Token | Value | 용도 |
|---|---|---|
| `color/palette/duotone/D20` | `#FFF1F1` | |
| `color/palette/duotone/D50` | `#FFD6D6` | |
| `color/palette/duotone/D300` | `#FE6565` | **듀오톤 메인 브랜드** |
| `color/palette/duotone/D400` | `#E54D4D` | hover |
| `color/palette/duotone/D500` | `#C93838` | pressed |
| `color/palette/duotone/D600` | `#A02828` | Dark mode 강조 |

### Neutral

| Token | Value | 용도 |
|---|---|---|
| `color/palette/neutral/N20` | `#F4F5F5` | 배경 |
| `color/palette/neutral/N100` | `#D8DCDE` | border · disabled |
| `color/palette/neutral/N200` | `#B0B8BC` | |
| `color/palette/neutral/N300` | `#889298` | placeholder · subtle text |
| `color/palette/neutral/N400` | `#60707A` | |
| `color/palette/neutral/N500` | `#3D5060` | |
| `color/palette/neutral/N600` | `#29363D` | 기본 텍스트 · Dark bg |

### System

| Token | Value | 용도 |
|---|---|---|
| `color/palette/system/red` | `#FF3257` | Error |
| `color/palette/system/mint` | `#28D7D2` | Success |
| `color/palette/system/orange` | `#EE706B` | Warning |
| `color/palette/system/black` | `#151B1E` | Path Black |
| `color/palette/system/white` | `#FFFFFF` | Path White |

### Semantic (Light / Dark)

| Token | Light | Dark |
|---|---|---|
| `color/brand/primary` | M300 | M300 |
| `color/text/default` | N600 | White |
| `color/text/subtle` | N300 | N200 |
| `color/text/disabled` | N100 | N400 |
| `color/text/on-brand` | White | White |
| `color/bg/default` | White | N600 |
| `color/bg/subtle` | N20 | N500 |
| `color/bg/brand` | M20 | M600 |
| `color/bg/warning` | `#FFF8F0` | `#2A1F0F` |
| `color/bg/error` | `#FFF0F3` | `#2A0F14` |
| `color/border/default` | N100 | N400 |
| `color/border/brand` | M300 | M300 |
| `color/border/hover` | N300 `#889298` | N200 `#B0B8BC` |
| `color/status/error` | `#FF3257` | `#FF3257` |
| `color/status/success` | `#28D7D2` | `#28D7D2` |
| `color/status/warning` | `#EE706B` | `#EE706B` |
| `color/interactive/primary` | M300 `#28D7D2` | M300 `#28D7D2` |
| `color/interactive/hover` | M400 `#1BB8B3` | M200 `#6DDEDD` |
| `color/interactive/pressed` | M500 `#0F9490` | M100 `#A8EBEA` |
| `color/interactive/disabled` | N100 `#D8DCDE` | N400 `#60707A` |

### Shadow Color (Light / Dark)

| Token | Light | Dark |
|---|---|---|
| `color/shadow/default` | `rgba(21,27,30, 0.08)` | `rgba(0,0,0, 0.00)` |
| `color/shadow/medium` | `rgba(21,27,30, 0.12)` | `rgba(0,0,0, 0.00)` |
| `color/shadow/strong` | `rgba(21,27,30, 0.20)` | `rgba(0,0,0, 0.00)` |

> 다크모드 Shadow는 opacity 0. 위계는 `color/bg/subtle`로 표현.

---

## Typography

- EN: Mark Pro / KO: Noto Sans KR
- 한글은 line-height +0.1 적용 (EN 1.5 → KO 1.6)

| Style | Size | Weight | LH | Tracking |
|---|---|---|---|---|
| `type/headline/xl/pc` | 56px | Black (900) | 1.2 | -0.02em |
| `type/headline/xl/mobile` | 40px | Black | 1.2 | -0.02em |
| `type/headline/lg/pc` | 48px | Black | 1.2 | -0.02em |
| `type/headline/lg/mobile` | 32px | Black | 1.2 | -0.02em |
| `type/headline/md/pc` | 32px | Bold (700) | 1.2 | -0.02em |
| `type/headline/md/mobile` | 28px | Bold | 1.2 | -0.02em |
| `type/headline/sm/pc` | 28px | Bold | 1.2 | 0em |
| `type/headline/sm/mobile` | 24px | Bold | 1.2 | 0em |
| `type/title/lg` | 24px | Bold | 1.5 | 0em |
| `type/title/md` | 20px | Bold | 1.5 | 0em |
| `type/title/sm` | 18px | Medium (500) | 1.5 | 0em |
| `type/body/lg` | 18px | Regular (400) | 1.7 | 0em |
| `type/body/md` | 16px | Regular | 1.5 | 0em |
| `type/body/sm` | 14px | Regular | 1.5 | 0em |
| `type/label/lg` | 16px | Medium | 1.5 | 0.04em |
| `type/label/md` | 14px | Medium | 1.5 | 0.04em |
| `type/label/sm` | 12px | Medium | 1.5 | 0.04em |
| `type/caption` | 11px | Regular | 1.5 | 0.04em |

---

## Spacing (8배수 베이스)

| Token | Value | 주요 용도 |
|---|---|---|
| `space/01` | 4px | 아이콘 패딩, 미세 간격 |
| `space/02` | 8px | 컴포넌트 내부 간격 |
| `space/03` | 12px | Chip, Badge 패딩 |
| `space/04` | 16px | 기본 패딩, Mobile 거터 |
| `space/05` | 20px | 중간 간격 |
| `space/06` | 24px | 섹션 내부, Desktop 거터 |
| `space/07` | 32px | 카드·컨테이너 패딩 |
| `space/08` | 40px | 섹션 간 간격 |
| `space/09` | 48px | 대형 섹션 패딩 |
| `space/10` | 64px | 페이지 레벨 간격 |
| `space/11` | 80px | Hero·랜딩 섹션 |
| `space/12` | 96px | 최대 섹션 여백 |

---

## Radius

| Token | Value | 사용처 |
|---|---|---|
| `radius/component/tooltip` | 4px | Tooltip |
| `radius/component/button/sm` | 4px | Small Button |
| `radius/component/button/md` | 8px | Medium Button (기본) |
| `radius/component/button/lg` | 8px | Large Button |
| `radius/component/input` | 8px | Text Field |
| `radius/component/snackbar` | 8px | Snackbar, Toast |
| `radius/component/card/sm` | 12px | 소형 Card |
| `radius/component/card/md` | 16px | 기본 Card |
| `radius/component/dialog` | 16px | Dialog, Modal |
| `radius/component/chip` | 9999px | Chip, Badge, Tag |
| `radius/component/fab` | 9999px | FAB |

---

## Elevation & Shadow

Elevation = 레이어 위계 레벨. Shadow = Elevation의 시각 표현.

| Elevation | Level | Shadow Style | X | Y | Blur | Spread | 사용처 |
|---|---|---|---|---|---|---|---|
| `elevation/surface/default` | 0 | — | — | — | — | — | 페이지 배경 |
| `elevation/surface/raised` | 1 | `shadow/01` | 0 | 1px | 4px | 0 | Card, List Item |
| `elevation/surface/overlay` | 2 | `shadow/02` | 0 | 2px | 8px | 0 | Dropdown, Menu, Tooltip |
| `elevation/surface/sticky` | 3 | `shadow/03` | 0 | 4px | 16px | 0 | App Bar, Bottom Nav, Nav Drawer |
| `elevation/surface/modal` | 4 | `shadow/04` | 0 | 8px | 24px | -2px | Dialog, Modal, FAB |

---

## Components

### Button

#### Primary (Contained)

| 속성 | Token | Value |
|---|---|---|
| bg / default | `color/component/button/primary/bg/default` | M300 `#28D7D2` |
| bg / hover | `color/component/button/primary/bg/hover` | M400 `#1BB8B3` |
| bg / pressed | `color/component/button/primary/bg/pressed` | M500 `#0F9490` |
| bg / disabled | `color/component/button/primary/bg/disabled` | N100 `#D8DCDE` |
| text / default | `color/component/button/primary/text/default` | White `#FFFFFF` |
| text / disabled | `color/text/disabled` | N100 `#D8DCDE` |
| radius / md | `radius/component/button/md` | 8px |
| padding / md | `space/padding/button/md` | 12px 16px |
| typography | `type/label/md` | 14px Medium 0.04em |

> `color/text/disabled` = N100 `#D8DCDE`. N300(`#889298`)은 `color/text/subtle`로 별개 토큰.

#### Secondary (Outlined)

| 속성 | Token | Value |
|---|---|---|
| bg | transparent | — |
| border | `color/border/brand` | M300 `#28D7D2` |
| border-width | 1.5px | — |
| text | `color/brand/primary` | M300 `#28D7D2` |
| bg / hover | `color/bg/brand` | M20 `#F3FCFC` |
| border / hover | `color/interactive/hover` | M400 `#1BB8B3` |
| text / hover | `color/interactive/hover` | M400 `#1BB8B3` |
| border / pressed | `color/interactive/pressed` | M500 `#0F9490` |
| text / pressed | `color/interactive/pressed` | M500 `#0F9490` |
| border / disabled | `color/interactive/disabled` | N100 `#D8DCDE` |
| text / disabled | `color/text/disabled` | N100 `#D8DCDE` |
| radius / md | `radius/component/button/md` | 8px |
| padding / md | `space/padding/button/md` | 12px 16px |
| typography | `type/label/md` | 14px Medium 0.04em |

#### Text

| 속성 | Token | Value |
|---|---|---|
| bg | transparent | — |
| border | none | — |
| text | `color/brand/primary` | M300 `#28D7D2` |
| bg / hover | `color/bg/brand` | M20 `#F3FCFC` |
| text / hover | `color/interactive/hover` | M400 `#1BB8B3` |
| bg / pressed | `color/bg/subtle` | N20 `#F4F5F5` |
| text / pressed | `color/interactive/pressed` | M500 `#0F9490` |
| text / disabled | `color/text/disabled` | N100 `#D8DCDE` |
| radius / md | `radius/component/button/md` | 8px |
| padding / md | `space/padding/button/md` | 12px 16px |
| typography | `type/label/md` | 14px Medium 0.04em |

#### 타입 판단 기준

| 상황 | 타입 |
|---|---|
| 페이지에서 가장 중요한 단일 액션 | Primary (Contained) |
| 보조 액션, Primary와 나란히 배치 | Secondary (Outlined) |
| 최소한의 강조, 텍스트 링크 수준 | Text |

#### Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Primary 버튼 한 화면에 1개 | 한 화면에 Primary 버튼 2개 이상 |
| Outlined·Text는 보조 액션에 사용 | 중요도 없이 타입 혼용 |
| Disabled는 별도 토큰 사용 | `opacity: 0.5`로 Disabled 처리 |

### Text Field (Input)

#### Types

| Type | 설명 | 사용 시점 |
|---|---|---|
| **Filled** | 배경색 있음, 하단 border만 표시 | 폼이 많은 화면, 배경과 구분 필요할 때 |
| **Outlined** | 배경 투명, 전체 border 표시 | 카드 위, 배경이 복잡한 영역 |

#### States

| State | 설명 |
|---|---|
| Inactive | 기본 상태, 포커스 없음 |
| Hover | 마우스 올린 상태 |
| Focused | 클릭 후 입력 중 |
| Activated | 값이 입력된 상태 (포커스 해제 후) |
| Error | 유효성 검사 실패 |
| Disabled | 비활성화 |

#### Color Tokens — Filled

| State | bg | border (bottom) | label | text | helper |
|---|---|---|---|---|---|
| Inactive | `color/bg/subtle` | `color/border/default` | `color/text/subtle` | `color/text/default` | `color/text/subtle` |
| Hover | `color/bg/subtle` | `color/text/subtle` | `color/text/subtle` | `color/text/default` | `color/text/subtle` |
| Focused | `color/bg/subtle` | `color/border/brand` | `color/brand/primary` | `color/text/default` | `color/text/subtle` |
| Activated | `color/bg/subtle` | `color/border/default` | `color/text/subtle` | `color/text/default` | `color/text/subtle` |
| Error | `color/bg/subtle` | `color/status/error` | `color/status/error` | `color/text/default` | `color/status/error` |
| Disabled | `color/bg/subtle` | transparent | `color/text/disabled` | `color/text/disabled` | `color/text/disabled` |

#### Color Tokens — Outlined

| State | bg | border (전체) | label | text | helper |
|---|---|---|---|---|---|
| Inactive | transparent | `color/border/default` | `color/text/subtle` | `color/text/default` | `color/text/subtle` |
| Hover | transparent | `color/text/subtle` | `color/text/subtle` | `color/text/default` | `color/text/subtle` |
| Focused | transparent | `color/border/brand` | `color/brand/primary` | `color/text/default` | `color/text/subtle` |
| Activated | transparent | `color/border/default` | `color/text/subtle` | `color/text/default` | `color/text/subtle` |
| Error | transparent | `color/status/error` | `color/status/error` | `color/text/default` | `color/status/error` |
| Disabled | transparent | `color/border/default` | `color/text/disabled` | `color/text/disabled` | `color/text/disabled` |

#### Size 수치

| 속성 | Value | Token |
|---|---|---|
| 높이 | 56px | — |
| Padding 좌우 | 16px | `space/04` |
| Padding 상하 (Filled) | top 16px / bottom 8px | `space/04` / `space/02` |
| Padding 상하 (Outlined) | 16px | `space/04` |
| Label 폰트 (Inactive) | 16px Regular | `type/body/md` |
| Label 폰트 (Focused·Activated) | 12px Medium | `type/label/sm` |
| Input 폰트 | 16px Regular | `type/body/md` |
| Helper text 폰트 | 12px Regular | `type/caption` |
| Border width (Inactive·Activated) | 1px | — |
| Border width (Focused·Error) | 2px | — |
| Radius (Filled) | 8px top-left / top-right only | `radius/component/input` |
| Radius (Outlined) | 8px 전체 | `radius/component/input` |

#### Variant — Prefix / Suffix

| 속성 | Value | Token |
|---|---|---|
| Prefix·Suffix 텍스트 색 | N300 | `color/text/subtle` |
| Prefix·Suffix 폰트 | 16px Regular | `type/body/md` |
| Prefix·Suffix 내부 간격 | 8px | `space/02` |
| 용도 예시 (Prefix) | "https://", "₩" | 고정 단위·프로토콜 |
| 용도 예시 (Suffix) | "kg", 클리어 아이콘 | 단위·액션 아이콘 |

#### Variant — Exposed Dropdown

Input 우측에 chevron-down 아이콘이 붙은 선택형 Input.

| 속성 | Value | Token |
|---|---|---|
| Dropdown icon | `chevron-down` 24px | — |
| Icon color (기본) | N300 | `color/text/subtle` |
| Icon color (Focused) | M300 | `color/brand/primary` |
| 선택 후 텍스트 색 | N600 | `color/text/default` |
| 클릭 시 | Menu 컴포넌트 트리거 | — |

#### Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Error state에는 반드시 Helper text로 이유 명시 | Error border만 바꾸고 메시지 없이 끝내기 |
| Placeholder는 예시값으로 (예: "홍길동") | Placeholder에 Label 역할 시키기 (포커스 시 사라져서 혼란) |
| Disabled는 별도 토큰(`color/text/disabled`) 사용 | `opacity: 0.5` 처리로 Disabled 표현 |

---

## Do / Don't

- Primary 버튼 한 화면에 1개
- **색상 하드코딩 절대 금지 → 반드시 토큰 참조**
- 텍스트는 동사로 시작 (저장하기, 신청하기)
- Variant 이름은 역할 기반 (`Type=Contained`, `State=Disabled`)
- State와 Type을 하나의 Property에 혼용 금지
- 다크모드 컴포넌트 별도 복제 금지 → Variable Mode로 처리
- Shadow를 다크모드에서 복제 금지 → opacity 0 토큰으로 처리

---

### Selection Controls

#### 판단 기준 — 언제 무엇을 쓰는가

| 상황 | 컴포넌트 |
|---|---|
| 여러 개 중 **하나만** 선택 | Radio |
| 여러 개 중 **복수 선택** 가능 | Checkbox |
| **제출 없이 즉시** 반영되는 ON/OFF | Switch |
| **제출 후** 반영되는 ON/OFF | Checkbox |

---

#### Radio Button

**States:** Unselected / Selected / Disabled × (Default / Hover / Focused / Pressed)

| 속성 | State | Token | Value |
|---|---|---|---|
| icon (outer ring) | Unselected | `color/border/default` | N100 `#D8DCDE` |
| icon (outer ring) | Hover | `color/border/hover` | N300 `#889298` |
| icon (outer ring) | Selected | `color/border/brand` | M300 `#28D7D2` |
| icon (outer ring) | Disabled | `color/interactive/disabled` | N100 `#D8DCDE` |
| icon (inner dot) | Selected | `color/brand/primary` | M300 `#28D7D2` |
| icon (inner dot) | Disabled | `color/interactive/disabled` | N100 `#D8DCDE` |
| label | Default | `color/text/default` | N600 `#29363D` |
| label | Disabled | `color/text/disabled` | N100 `#D8DCDE` |
| ripple / bg | Hover | `color/bg/brand` | M20 `#F3FCFC` |
| ripple / bg | Pressed | `color/brand/primary/subtle` | M50 `#D6F5F5` |

**Size 수치**

| 속성 | Value | Token |
|---|---|---|
| 아이콘 크기 | 20px | — |
| 아이콘 + 라벨 간격 | 8px | `space/02` |
| 터치 영역 | 40px × 40px | — |
| 라벨 폰트 | 16px Regular | `type/body/md` |

**Do / Don't**

| ✅ Do | ❌ Don't |
|---|---|
| 선택지 2개 이상일 때만 Radio 사용 | 선택지가 1개일 때 Radio 사용 (Checkbox 사용) |
| 기본값(default selected) 항상 지정 | 아무것도 선택 안 된 상태로 두기 |
| 선택지는 상호 배타적으로 구성 | 중복 선택 가능한 경우 Radio 사용 |

---

#### Checkbox

**States:** Unselected / Selected / Indeterminate / Disabled × (Default / Hover / Focused / Pressed)

| 속성 | State | Token | Value |
|---|---|---|---|
| box (border) | Unselected | `color/border/default` | N100 `#D8DCDE` |
| box (border) | Hover | `color/border/hover` | N300 `#889298` |
| box (border) | Disabled | `color/interactive/disabled` | N100 `#D8DCDE` |
| box (bg) | Selected | `color/brand/primary` | M300 `#28D7D2` |
| box (bg) | Indeterminate | `color/brand/primary` | M300 `#28D7D2` |
| box (bg) | Disabled Selected | `color/interactive/disabled` | N100 `#D8DCDE` |
| checkmark / dash | Selected · Indeterminate | `color/text/on-brand` | White `#FFFFFF` |
| checkmark / dash | Disabled | `color/text/disabled` | N100 `#D8DCDE` |
| label | Default | `color/text/default` | N600 `#29363D` |
| label | Disabled | `color/text/disabled` | N100 `#D8DCDE` |
| ripple / bg | Hover | `color/bg/brand` | M20 `#F3FCFC` |
| ripple / bg | Pressed | `color/brand/primary/subtle` | M50 `#D6F5F5` |

> **Indeterminate**: 하위 항목 일부만 선택된 상태. 체크도 미체크도 아닌 dash(—) 표시.

**Size 수치**

| 속성 | Value | Token |
|---|---|---|
| 박스 크기 | 20px × 20px | — |
| 박스 radius | 4px | `radius/global/01` |
| 박스 + 라벨 간격 | 8px | `space/02` |
| 터치 영역 | 40px × 40px | — |
| 라벨 폰트 | 16px Regular | `type/body/md` |

**Do / Don't**

| ✅ Do | ❌ Don't |
|---|---|
| 복수 선택 또는 단일 동의(약관)에 사용 | 즉시 반영되는 설정에 Checkbox 사용 (Switch 사용) |
| Indeterminate는 전체선택 부모 항목에만 사용 | Indeterminate를 단독 컴포넌트로 사용 |
| 폼 제출 후 반영되는 토글에 사용 | 제출 없이 바로 반영돼야 할 때 Checkbox 사용 |

---

#### Switch

**States:** Off / On / Disabled × (Default / Hover / Pressed)

| 속성 | State | Token | Value |
|---|---|---|---|
| track (bg) | Off | `color/border/default` | N100 `#D8DCDE` |
| track (bg) | Off Hover | `color/border/hover` | N300 `#889298` |
| track (bg) | On | `color/brand/primary` | M300 `#28D7D2` |
| track (bg) | On Hover | `color/interactive/hover` | M400 `#1BB8B3` |
| track (bg) | Disabled | `color/interactive/disabled` | N100 `#D8DCDE` |
| thumb | Off · On | White `#FFFFFF` | — |
| thumb | Disabled | `color/bg/subtle` | N20 `#F4F5F5` |
| label | Default | `color/text/default` | N600 `#29363D` |
| label | Disabled | `color/text/disabled` | N100 `#D8DCDE` |

**Size 수치**

| 속성 | Value |
|---|---|
| Track 크기 | 52px × 32px |
| Track radius | 9999px (pill) |
| Thumb 크기 (Off) | 24px |
| Thumb 크기 (On / Pressed) | 28px |
| Thumb 내부 여백 | 4px |
| 터치 영역 | 52px × 40px |
| 라벨 간격 | 8px (`space/02`) |

**Do / Don't**

| ✅ Do | ❌ Don't |
|---|---|
| 설정 변경이 즉시 반영될 때 사용 | 폼 안에 Switch 넣고 제출 후 반영 |
| On/Off 두 상태만 있을 때 사용 | 3가지 이상 상태가 필요한 경우 Switch 사용 |
| 라벨은 항상 현재 상태 기준으로 작성 | "알림을 켜시겠습니까?" 같은 질문형 라벨 |

---

### Chips

#### Types — 언제 무엇을 쓰는가

| Type | 설명 | 사용 시점 |
|---|---|---|
| **Assist** | 액션을 제안하는 칩. 아이콘 선택 가능 | 컨텍스트에 맞는 빠른 액션 제공 (예: "지도 열기") |
| **Filter** | 콘텐츠 필터링. 선택 시 체크 표시 | 목록/검색 결과 필터 (예: 카테고리, 태그) |
| **Input** | 입력된 값을 태그처럼 표시. X 버튼 포함 | 선택한 항목 시각화 (예: 이메일 수신자, 검색 태그) |
| **Suggestion** | AI/시스템이 제안하는 자동완성 칩 | 검색창 아래 추천어, 챗봇 빠른 답변 |

**States:** Enabled / Hover / Focused / Pressed / Dragged / Disabled
(Filter만 추가로 Selected 상태 있음)

#### Color Tokens

| 속성 | State | Token | Value |
|---|---|---|---|
| bg | Enabled | `color/bg/default` | White `#FFFFFF` |
| bg | Hover | `color/bg/subtle` | N20 `#F4F5F5` |
| bg | Pressed | `color/bg/subtle` | N20 `#F4F5F5` |
| bg | Selected (Filter) | `color/bg/brand` | M20 `#F3FCFC` |
| bg | Disabled | `color/bg/subtle` | N20 `#F4F5F5` |
| border | Enabled | `color/border/default` | N100 `#D8DCDE` |
| border | Hover | `color/border/hover` | N300 `#889298` |
| border | Focused | `color/border/brand` | M300 `#28D7D2` |
| border | Selected (Filter) | `color/border/brand` | M300 `#28D7D2` |
| border | Disabled | `color/border/default` | N100 `#D8DCDE` |
| label | Enabled | `color/text/default` | N600 `#29363D` |
| label | Selected (Filter) | `color/brand/primary` | M300 `#28D7D2` |
| label | Disabled | `color/text/disabled` | N100 `#D8DCDE` |
| icon / check | Selected (Filter) | `color/brand/primary` | M300 `#28D7D2` |
| icon (X) | Input | `color/text/subtle` | N300 `#889298` |

#### Size 수치

| 속성 | Value | Token |
|---|---|---|
| 높이 | 32px | — |
| Padding 좌우 | 12px | `space/03` |
| 아이콘 크기 | 18px | — |
| 아이콘 + 라벨 간격 | 4px | `space/01` |
| Radius | 9999px | `radius/component/chip` |
| 폰트 | 14px Medium | `type/label/md` |

#### Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Filter Chip은 복수 선택 가능하게 | Filter Chip을 Radio처럼 단일 선택 강제 |
| Input Chip은 반드시 X 버튼으로 삭제 가능하게 | Input Chip을 클릭해도 삭제 안 되게 |
| Chip 라벨은 짧게 (최대 2~3 단어) | 긴 문장을 Chip 라벨로 사용 |

---

### Card

#### Variants

| Variant | 구성 요소 | 사용 시점 |
|---|---|---|
| **Basic** | 이미지 + 제목 + 본문 + 액션 버튼 | 일반 콘텐츠 카드 |
| **Expand** | Basic + 펼치기/접기 버튼 | 긴 본문이 있는 카드 |
| **Overflow Menu** | Basic + 우측 상단 ⋮ 버튼 | 카드 레벨 액션이 여러 개일 때 |
| **Stars to Rate** | Basic + 별점 입력 | 리뷰·평가 카드 |
| **With Chips** | Basic + Chip 그룹 | 태그·카테고리 표시 |
| **With Slider** | Basic + Slider | 미디어 플레이어, 범위 설정 |

#### Elevation

| 속성 | Token | Value |
|---|---|---|
| 기본 shadow | `elevation/surface/raised` → `shadow/01` | 0 1px 4px |
| Hover shadow | `elevation/surface/overlay` → `shadow/02` | 0 2px 8px |
| radius | `radius/component/card/md` | 16px |

#### Color Tokens

| 속성 | Token | Value |
|---|---|---|
| bg | `color/bg/default` | White `#FFFFFF` |
| border (선택) | `color/border/default` | N100 `#D8DCDE` |
| title | `color/text/default` | N600 `#29363D` |
| body text | `color/text/subtle` | N300 `#889298` |
| icon (Overflow) | `color/text/subtle` | N300 `#889298` |
| divider | `color/border/default` | N100 `#D8DCDE` |
| star (filled) | `color/status/warning` | `#EE706B` |
| star (empty) | `color/border/default` | N100 `#D8DCDE` |

#### Size 수치

| 속성 | Value | Token |
|---|---|---|
| 내부 패딩 | 16px | `space/04` |
| 콘텐츠 간격 | 8px | `space/02` |
| 액션 버튼 상단 간격 | 16px | `space/04` |
| 소형 카드 radius | 12px | `radius/component/card/sm` |

#### Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| 카드 안에 Primary 버튼은 1개만 | 카드 하나에 Primary 버튼 여러 개 |
| Overflow Menu는 액션 3개 이상일 때만 | 액션 1~2개인데 Overflow Menu 사용 |
| Expand Card는 접힌 상태가 기본 | 기본이 펼쳐진 상태인 Expand Card |

---

### App Bar

#### Types

| Type | 설명 | 사용 시점 |
|---|---|---|
| **Top — Small** | 제목 + 좌측 네비 아이콘 + 우측 액션 | 기본 페이지 헤더 |
| **Top — Medium** | 제목이 아래로 내려온 형태 | 제목 강조가 필요한 페이지 |
| **Top — Large** | 대형 제목, 더 많은 여백 | 랜딩·섹션 상단 |
| **Bottom** | 하단 고정, FAB 포함 가능 | 모바일 주요 액션 모음 |

#### Elevation

| 상태 | Token | Value |
|---|---|---|
| 스크롤 전 (flat) | `elevation/surface/default` | shadow 없음 |
| 스크롤 후 (sticky) | `elevation/surface/sticky` → `shadow/03` | 0 4px 16px |

#### Color Tokens

| 속성 | Token | Value |
|---|---|---|
| bg | `color/bg/default` | White (Light) / N600 (Dark) |
| bg (scrolled) | `color/bg/subtle` | N20 (Light) / N500 (Dark) |
| title | `color/text/default` | N600 `#29363D` |
| icon | `color/text/default` | N600 `#29363D` |
| icon (hover) | `color/interactive/hover` | M400 `#1BB8B3` |

#### Size 수치

| 속성 | Value | Token |
|---|---|---|
| 높이 — Small | 64px | — |
| 높이 — Medium | 112px | — |
| 높이 — Large | 152px | — |
| 높이 — Bottom | 80px | — |
| 좌우 패딩 | 16px | `space/04` |
| 아이콘 크기 | 24px | — |
| 제목 폰트 — Small | 22px Bold | `type/title/lg` 근사 |
| 제목 폰트 — Medium/Large | 28px Bold | `type/headline/sm/mobile` |

#### Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| 스크롤 시 shadow/03으로 elevation 표시 | 스크롤 여부 관계없이 항상 shadow 표시 |
| 우측 액션 아이콘 최대 3개 | 우측에 아이콘 4개 이상 나열 |
| Bottom App Bar에 FAB 포함 시 중앙 또는 우측 고정 | FAB 위치를 유동적으로 배치 |

---

### Bottom Navigation

#### Elevation

| Token | Value |
|---|---|
| `elevation/surface/sticky` → `shadow/03` | 0 4px 16px |

#### Color Tokens

| 속성 | State | Token | Value |
|---|---|---|---|
| bg | — | `color/bg/default` | White (Light) / N600 (Dark) |
| icon | Inactive | `color/text/subtle` | N300 `#889298` |
| icon | Active | `color/brand/primary` | M300 `#28D7D2` |
| label | Inactive | `color/text/subtle` | N300 `#889298` |
| label | Active | `color/brand/primary` | M300 `#28D7D2` |
| indicator bg | Active | `color/bg/brand` | M20 `#F3FCFC` |
| badge | — | `color/status/error` | `#FF3257` |

#### Size 수치

| 속성 | Value | Token |
|---|---|---|
| 높이 | 80px | — |
| 아이콘 크기 | 24px | — |
| Active indicator | 64px × 32px radius 9999px | — |
| 라벨 폰트 | 12px Medium | `type/label/sm` |

#### Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| 탭 3~5개 유지 | 탭 2개 이하 또는 6개 이상 |
| Active 상태 항상 명확히 구분 | Active 없이 모든 탭 동일 표시 |
| 라벨 1단어로 짧게 | 긴 라벨로 탭 간격 붕괴 |

---

### Navigation Drawer

#### Types

| Type | 설명 | 사용 시점 |
|---|---|---|
| **Modal** | 오버레이 위로 슬라이드 인 | 모바일 사이드 메뉴 |
| **Standard** | 콘텐츠 옆 고정 표시 | 데스크탑 사이드바 |

#### Elevation

| Type | Token | Value |
|---|---|---|
| Modal | `elevation/surface/sticky` → `shadow/03` | 0 4px 16px |
| Standard | `elevation/surface/default` | shadow 없음 |
| Scrim | — | `rgba(21,27,30, 0.40)` |

#### Color Tokens

| 속성 | State | Token | Value |
|---|---|---|---|
| bg | — | `color/bg/default` | White (Light) / N600 (Dark) |
| item bg | Inactive | transparent | — |
| item bg | Hover | `color/bg/subtle` | N20 `#F4F5F5` |
| item bg | Active | `color/bg/brand` | M20 `#F3FCFC` |
| item icon | Inactive | `color/text/subtle` | N300 `#889298` |
| item icon | Active | `color/brand/primary` | M300 `#28D7D2` |
| item label | Inactive | `color/text/default` | N600 `#29363D` |
| item label | Active | `color/brand/primary` | M300 `#28D7D2` |
| section divider | — | `color/border/default` | N100 `#D8DCDE` |

#### Size 수치

| 속성 | Value | Token |
|---|---|---|
| 너비 | 360px (최대) | — |
| 아이템 높이 | 56px | — |
| 좌우 패딩 | 16px | `space/04` |
| 아이콘 크기 | 24px | — |
| 아이콘 → 라벨 간격 | 12px | `space/03` |
| 라벨 폰트 | 14px Medium | `type/label/md` |

#### Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Active 항목은 항상 1개만 | 여러 항목 동시에 Active |
| Modal Drawer는 Scrim 클릭으로 닫기 가능 | Scrim 없이 Modal Drawer 표시 |
| 섹션 구분 필요 시 divider + 섹션 라벨 | 섹션 구분 없이 항목 나열 |

---

### Tab

#### Types

| Type | 설명 |
|---|---|
| **Primary** | 상단 indicator 라인. 주요 콘텐츠 전환 |
| **Secondary** | Pill형 배경. 서브 카테고리 전환 |

#### Color Tokens

| 속성 | State | Token | Value |
|---|---|---|---|
| bg | — | `color/bg/default` | White (Light) / N600 (Dark) |
| label | Inactive | `color/text/subtle` | N300 `#889298` |
| label | Active | `color/brand/primary` | M300 `#28D7D2` |
| label | Hover | `color/text/default` | N600 `#29363D` |
| indicator (Primary) | Active | `color/brand/primary` | M300 `#28D7D2` |
| pill bg (Secondary) | Active | `color/bg/brand` | M20 `#F3FCFC` |
| pill bg (Secondary) | Hover | `color/bg/subtle` | N20 `#F4F5F5` |
| bottom border | — | `color/border/default` | N100 `#D8DCDE` |

#### Size 수치

| 속성 | Value | Token |
|---|---|---|
| 탭 높이 | 48px | — |
| 좌우 패딩 | 16px | `space/04` |
| Indicator 두께 | 2px | — |
| 라벨 폰트 | 14px Medium | `type/label/md` |
| 아이콘 크기 | 20px | — |

#### Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| 탭 2~5개 유지 | 탭 6개 이상 (스크롤 탭으로 전환) |
| 라벨 1~2 단어 이내 | 긴 문장을 탭 라벨로 사용 |
| Active 탭은 항상 1개만 | 복수 탭 동시 Active |

---

### Menu

#### Types

| Type | 사용 시점 |
|---|---|
| **Dropdown Menu** | 버튼/아이콘 클릭 시 아래로 펼쳐짐 |
| **Context Menu** | 우클릭 또는 롱프레스로 노출 |

#### Elevation

| Token | Value |
|---|---|
| `elevation/surface/overlay` → `shadow/02` | 0 2px 8px |

#### Color Tokens

| 속성 | State | Token | Value |
|---|---|---|---|
| bg | — | `color/bg/default` | White (Light) / N600 (Dark) |
| item bg | Default | transparent | — |
| item bg | Hover | `color/bg/subtle` | N20 `#F4F5F5` |
| item bg | Pressed | `color/bg/brand` | M20 `#F3FCFC` |
| item label | Default | `color/text/default` | N600 `#29363D` |
| item label | Disabled | `color/text/disabled` | N100 `#D8DCDE` |
| item label | Destructive | `color/status/error` | `#FF3257` |
| item icon | Default | `color/text/subtle` | N300 `#889298` |
| divider | — | `color/border/default` | N100 `#D8DCDE` |

#### Size 수치

| 속성 | Value | Token |
|---|---|---|
| 최소 너비 | 112px | — |
| 최대 너비 | 280px | — |
| 아이템 높이 | 48px | — |
| 좌우 패딩 | 16px | `space/04` |
| radius | 8px | `radius/component/input` |
| 라벨 폰트 | 16px Regular | `type/body/md` |

#### Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Destructive 액션은 하단에 배치 + 빨간 텍스트 | Destructive 항목을 상단에 배치 |
| 항목 5개 이하 권장 | 항목 7개 이상 나열 |
| 트리거 요소 기준으로 정렬 | 화면 중앙에 Menu 띄우기 |

---

### Snackbar

#### Types

| Type | 설명 |
|---|---|
| **Text only** | 메시지만 표시 |
| **With Action** | 메시지 + 텍스트 액션 버튼 |
| **With Close** | 메시지 + X 닫기 버튼 |

#### Elevation

| Token | Value |
|---|---|
| `elevation/surface/modal` → `shadow/04` | 0 8px 24px -2px |

#### Color Tokens

| 속성 | Token | Value |
|---|---|---|
| bg | `color/text/default` (반전) | N600 `#29363D` (Light) / White (Dark) |
| text | `color/bg/default` (반전) | White (Light) / N600 (Dark) |
| action text | `color/brand/primary` | M300 `#28D7D2` |
| action hover | `color/interactive/hover` | M400 `#1BB8B3` |

#### Size 수치

| 속성 | Value | Token |
|---|---|---|
| 높이 (single line) | 48px | — |
| 높이 (two line) | 68px | — |
| 좌우 패딩 | 16px | `space/04` |
| radius | 8px | `radius/component/snackbar` |
| 최소 너비 | 288px | — |
| 최대 너비 | 568px | — |
| 폰트 | 14px Regular | `type/body/sm` |
| 노출 시간 | 4초 (기본) | — |

#### Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| 메시지 1~2줄 이내 | 긴 설명을 Snackbar로 표시 |
| 액션 1개만 (Undo, 확인 등) | 액션 버튼 2개 이상 |
| 하단 중앙 또는 좌측 고정 | 화면 중앙이나 상단에 표시 |

---

### Slider

#### Types

| Type | 설명 |
|---|---|
| **Continuous** | 자유롭게 값 선택 |
| **Discrete** | 정해진 스텝만 선택 (틱 마크 표시) |
| **Range** | 최솟값·최댓값 두 핸들 |

#### Color Tokens

| 속성 | State | Token | Value |
|---|---|---|---|
| track (active) | — | `color/brand/primary` | M300 `#28D7D2` |
| track (inactive) | — | `color/border/default` | N100 `#D8DCDE` |
| track (disabled) | — | `color/interactive/disabled` | N100 `#D8DCDE` |
| thumb | Default | `color/brand/primary` | M300 `#28D7D2` |
| thumb | Hover | `color/interactive/hover` | M400 `#1BB8B3` |
| thumb | Pressed | `color/interactive/pressed` | M500 `#0F9490` |
| thumb | Disabled | `color/interactive/disabled` | N100 `#D8DCDE` |
| value label bg | — | `color/brand/primary` | M300 `#28D7D2` |
| value label text | — | `color/text/on-brand` | White `#FFFFFF` |

#### Size 수치

| 속성 | Value |
|---|---|
| Track 높이 | 4px |
| Thumb 크기 | 20px |
| Thumb 크기 (pressed) | 28px |
| 터치 영역 높이 | 40px |
| Value label 폰트 | 12px Medium (`type/label/sm`) |

#### Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| 범위가 넓거나 정확한 값이 필요 없을 때 사용 | 정확한 숫자 입력 필요 시 (Text Field 사용) |
| Discrete는 스텝 수 5개 이하 권장 | 스텝 10개 이상인 Discrete Slider |
| 현재 값을 Value Label 또는 인접 텍스트로 표시 | 값 표시 없이 Slider만 단독 사용 |

---

### FAB (Floating Action Button)

#### Types

| Type | 크기 | 설명 |
|---|---|---|
| **Small FAB** | 40px | 보조 액션 |
| **FAB** | 56px | 기본 FAB |
| **Large FAB** | 96px | 가장 중요한 단일 액션 강조 |
| **Extended FAB** | 56px 높이 | 아이콘 + 텍스트 라벨 |

#### Elevation

| 상태 | Token | Value |
|---|---|---|
| Default | `elevation/surface/modal` → `shadow/03` | 0 4px 16px |
| Hover · Pressed | `shadow/04` | 0 8px 24px -2px |

#### Color Tokens

| 속성 | State | Token | Value |
|---|---|---|---|
| bg | Default | `color/brand/primary` | M300 `#28D7D2` |
| bg | Hover | `color/interactive/hover` | M400 `#1BB8B3` |
| bg | Pressed | `color/interactive/pressed` | M500 `#0F9490` |
| icon | — | `color/text/on-brand` | White `#FFFFFF` |
| label (Extended) | — | `color/text/on-brand` | White `#FFFFFF` |

#### Size 수치

| Type | 크기 | 아이콘 | Radius |
|---|---|---|---|
| Small FAB | 40px | 24px | 9999px |
| FAB | 56px | 24px | 9999px |
| Large FAB | 96px | 36px | 9999px |
| Extended FAB | 높이 56px | 24px | 9999px |

#### Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| 화면에서 가장 중요한 단일 액션 1개만 | FAB 2개 이상 동시 노출 |
| 스크롤 시 콘텐츠에 가려지지 않도록 고정 | 스크롤 시 FAB이 콘텐츠와 겹침 |
| Extended FAB은 아이콘만으로 의미 불명확할 때 | 아이콘으로 충분한 경우 Extended FAB 사용 |

---

### Banner

#### Types

| Type | 설명 |
|---|---|
| **Informational** | 일반 안내 메시지 |
| **Warning** | 주의가 필요한 상황 |
| **Error** | 오류 발생 |
| **Success** | 완료·성공 확인 |

#### Color Tokens

| Type | bg Token | accent / icon | text | border-left |
|---|---|---|---|---|
| Informational | `color/bg/subtle` | `color/brand/primary` M300 | `color/text/default` | `color/brand/primary` |
| Warning | `color/bg/warning` `#FFF8F0` | `color/status/warning` `#EE706B` | `color/text/default` | `color/status/warning` |
| Error | `color/bg/error` `#FFF0F3` | `color/status/error` `#FF3257` | `color/text/default` | `color/status/error` |
| Success | `color/bg/brand` M20 | `color/status/success` `#28D7D2` | `color/text/default` | `color/status/success` |

#### Size 수치

| 속성 | Value | Token |
|---|---|---|
| 좌우 패딩 | 16px | `space/04` |
| 상하 패딩 | 12px | `space/03` |
| 좌측 border (accent) | 4px | — |
| 아이콘 크기 | 20px | — |
| 제목 폰트 | 14px Medium | `type/label/md` |
| 본문 폰트 | 14px Regular | `type/body/sm` |
| radius | 8px | `radius/component/snackbar` |

#### Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| 닫기(X) 버튼 제공 | 닫기 없이 영구 노출 |
| 메시지 1~2줄로 간결하게 | 긴 설명을 Banner에 넣기 |
| 페이지 상단 또는 섹션 상단 고정 | 콘텐츠 중간에 Banner 삽입 |

---

### List

#### Types

| Type | 구성 | 사용 시점 |
|---|---|---|
| **Single-line** | 텍스트만 | 간단한 항목 나열 |
| **Two-line** | 제목 + 서브텍스트 | 부가 설명 필요한 항목 |
| **Three-line** | 제목 + 서브텍스트 2줄 | 미리보기 필요한 콘텐츠 |

Leading — 아이콘 / 아바타 / Checkbox / Radio / 썸네일  
Trailing — 아이콘 / 텍스트 / Checkbox / Switch

#### Color Tokens

| 속성 | State | Token | Value |
|---|---|---|---|
| bg | Default | `color/bg/default` | White (Light) / N600 (Dark) |
| bg | Hover | `color/bg/subtle` | N20 `#F4F5F5` |
| bg | Pressed · Selected | `color/bg/brand` | M20 `#F3FCFC` |
| title | Default | `color/text/default` | N600 `#29363D` |
| title | Disabled | `color/text/disabled` | N100 `#D8DCDE` |
| subtext | Default | `color/text/subtle` | N300 `#889298` |
| icon (leading) | Default | `color/text/subtle` | N300 `#889298` |
| icon (leading) | Selected | `color/brand/primary` | M300 `#28D7D2` |
| divider | — | `color/border/default` | N100 `#D8DCDE` |

#### Size 수치

| Type | 높이 |
|---|---|
| Single-line | 48px |
| Two-line | 64px |
| Three-line | 88px |

| 속성 | Value | Token |
|---|---|---|
| 좌우 패딩 | 16px | `space/04` |
| Leading 아이콘 크기 | 24px | — |
| Leading → 텍스트 간격 | 16px | `space/04` |
| 제목 폰트 | 16px Regular | `type/body/md` |
| 서브텍스트 폰트 | 14px Regular | `type/body/sm` |

#### Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| 같은 List 안에서 Leading 요소 타입 통일 | 아이콘·아바타·체크박스 혼용 |
| Three-line 서브텍스트 2줄에서 말줄임 처리 | 텍스트 길이에 따라 아이템 높이 가변 |
| Divider는 마지막 아이템 아래 생략 | 모든 아이템 아래 Divider 표시 |

---

## Theming Guide

오픈패스 DS는 CSS 변수 교체만으로 완전한 테마 전환이 가능하다.  
같은 컴포넌트, 같은 구조 — 브랜드 토큰만 교체.

### 기본 테마 — Openpath (Mint)

```css
--color-interactive-primary: #28D7D2;
--color-interactive-hover:   #1BB8B3;
--color-interactive-pressed: #0F9490;
--color-brand-primary:       #28D7D2;
--color-bg-brand:            #F3FCFC;
--color-border-brand:        #28D7D2;
```

### 테마 교체 예시 — Duotone (Coral)

```css
--color-interactive-primary: #FE6565;
--color-interactive-hover:   #E54D4D;
--color-interactive-pressed: #C93838;
--color-brand-primary:       #FE6565;
--color-bg-brand:            #FFF1F1;
--color-border-brand:        #FE6565;
```

### 새 서비스 적용 방법

1. CSS 변수에서 Primary 계열만 교체
2. Neutral / System / Spacing / Radius 는 유지
3. 폰트 패밀리는 선택적으로 변경

### 테마 교체로 만들 수 있는 서비스

| 서비스 | 테마 |
|---|---|
| 강의 플랫폼 (openpath.kr) | Mint — `#28D7D2` |
| 에이전시 사이트 (duotone.kr) | Coral — `#FE6565` |
| 신규 서비스 | Custom Primary 교체만으로 즉시 적용 |

### 교체 불필요 항목 (테마 무관)

```
Neutral     N20~N600 — 모든 테마 동일
System      Error / Success / Warning — 모든 테마 동일
Spacing     space/01~12 — 모든 테마 동일
Typography  Mark Pro / Noto Sans KR — 모든 테마 동일
Radius      모든 테마 동일
Shadow      Light/Dark 분기만, 테마 무관
```
