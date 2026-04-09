# OPENPATH Design System

> Cursor / Claude Code 레퍼런스 파일
> 이 파일의 모든 값은 토큰 기반. 하드코딩 금지.
> Last updated: 2026.04.09 (Text Field 풀스펙 추가 / 검토 수정: Button disabled값·Duotone 팔레트·Hover border 주석)

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
| `color/palette/duotone/D100` | `#FFB0B0` | |
| `color/palette/duotone/D200` | `#FF8E8E` | |
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
| `color/brand/primary` | M300 `#28D7D2` | M300 `#28D7D2` |
| `color/text/default` | N600 `#29363D` | White `#FFFFFF` |
| `color/text/subtle` | N300 `#889298` | N200 `#B0B8BC` |
| `color/text/disabled` | N100 `#D8DCDE` | N400 `#60707A` |
| `color/text/on-brand` | White `#FFFFFF` | White `#FFFFFF` |
| `color/bg/default` | White `#FFFFFF` | N600 `#29363D` |
| `color/bg/subtle` | N20 `#F4F5F5` | N500 `#3D5060` |
| `color/bg/brand` | M20 `#F3FCFC` | M600 `#156565` |
| `color/border/default` | N100 `#D8DCDE` | N400 `#60707A` |
| `color/border/brand` | M300 `#28D7D2` | M300 `#28D7D2` |
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
| Hover | `color/bg/subtle` | `color/border/hover` | `color/text/subtle` | `color/text/default` | `color/text/subtle` |
| Focused | `color/bg/subtle` | `color/border/brand` | `color/brand/primary` | `color/text/default` | `color/text/subtle` |
| Activated | `color/bg/subtle` | `color/border/default` | `color/text/subtle` | `color/text/default` | `color/text/subtle` |
| Error | `color/bg/subtle` | `color/status/error` | `color/status/error` | `color/text/default` | `color/status/error` |
| Disabled | `color/bg/subtle` | transparent | `color/text/disabled` | `color/text/disabled` | `color/text/disabled` |

#### Color Tokens — Outlined

| State | bg | border (전체) | label | text | helper |
|---|---|---|---|---|---|
| Inactive | transparent | `color/border/default` | `color/text/subtle` | `color/text/default` | `color/text/subtle` |
| Hover | transparent | `color/border/hover` | `color/text/subtle` | `color/text/default` | `color/text/subtle` |
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
