# OPENPATH DS — 전체 토큰 레퍼런스

> 모든 값은 CSS 커스텀 프로퍼티(변수)로 관리. 직접 색상 코드 사용 금지.

---

## Brand 토큰

| 변수 | 역할 | Light | Dark |
|---|---|---|---|
| `--color-brand` | 브랜드 기본색 · 버튼 bg · 링크 | `#28D7D2` | `#28D7D2` |
| `--color-brand-hover` | 브랜드 Hover 상태 | `#1BB8B3` | `#6DDEDD` |
| `--color-brand-pressed` | 브랜드 Pressed 상태 | `#0F9490` | `#A8EBEA` |
| `--color-brand-subtle` | 브랜드 연한 배경 (선택 영역) | `#D6F5F5` | `#156565` |
| `--color-bg-brand` | 브랜드 배경 (chip selected, tab pill 등) | `#F3FCFC` | `#156565` |
| `--color-border-brand` | 브랜드 테두리 (focused, selected) | `#28D7D2` | `#28D7D2` |
| `--color-border-hover` | Hover 시 테두리 | `#889298` | `#B0B8BC` |

---

## Text 토큰

| 변수 | 역할 | Light | Dark |
|---|---|---|---|
| `--color-text` | 기본 텍스트 | `#29363D` (N600) | `#FFFFFF` |
| `--color-text-subtle` | 보조 텍스트 · placeholder · 라벨 | `#889298` (N300) | `#B0B8BC` (N200) |
| `--color-text-disabled` | 비활성 텍스트 | `#D8DCDE` (N100) | `#60707A` (N400) |
| `--color-text-on-brand` | 브랜드 배경 위 텍스트 | `#FFFFFF` | `#FFFFFF` |

---

## Background 토큰

| 변수 | 역할 | Light | Dark |
|---|---|---|---|
| `--color-bg` | 기본 페이지 배경 | `#FFFFFF` | `#29363D` (N600) |
| `--color-bg-subtle` | 보조 배경 · 입력 필드 · 섹션 구분 | `#F4F5F5` (N20) | `#3D5060` (N500) |
| `--color-bg-brand` | 브랜드 연한 배경 | `#F3FCFC` (M20) | `#156565` (M600) |
| `--color-bg-warning` | Warning 배경 | `#FFF8F0` | — |
| `--color-bg-error` | Error 배경 | `#FFF0F3` | — |

---

## Border 토큰

| 변수 | 역할 | Light | Dark |
|---|---|---|---|
| `--color-border` | 기본 테두리 | `#D8DCDE` (N100) | `#60707A` (N400) |
| `--color-border-brand` | 포커스·선택 테두리 | `#28D7D2` | `#28D7D2` |
| `--color-border-hover` | Hover 테두리 | `#889298` | `#B0B8BC` |

---

## Status 토큰

| 변수 | 역할 | 값 |
|---|---|---|
| `--color-error` | 에러 · Destructive | `#FF3257` |
| `--color-success` | 성공 | `#28D7D2` |
| `--color-warning` | 경고 | `#EE706B` |

> Status 토큰은 Light/Dark 동일.

---

## Interactive 토큰

| 변수 | 역할 | Light | Dark |
|---|---|---|---|
| `--color-interactive` | 기본 인터랙티브 | `#28D7D2` | `#28D7D2` |
| `--color-interactive-hover` | Hover | `#1BB8B3` | `#6DDEDD` |
| `--color-interactive-pressed` | Pressed | `#0F9490` | `#A8EBEA` |
| `--color-interactive-disabled` | Disabled | `#D8DCDE` | `#60707A` |

---

## Shadow 토큰

| 변수 | Elevation | 사용처 | Light 값 | Dark |
|---|---|---|---|---|
| `--shadow-01` | Level 1 / raised | Card, List item | `0 1px 4px rgba(21,27,30,0.08)` | `none` |
| `--shadow-02` | Level 2 / overlay | Dropdown, Menu, Tooltip | `0 2px 8px rgba(21,27,30,0.08)` | `none` |
| `--shadow-03` | Level 3 / sticky | App Bar, Bottom Nav, Drawer | `0 4px 16px rgba(21,27,30,0.12)` | `none` |
| `--shadow-04` | Level 4 / modal | Dialog, Modal, FAB, Snackbar | `0 8px 24px -2px rgba(21,27,30,0.20)` | `none` |

> 다크모드에서 Shadow는 모두 `none`. 위계는 `--color-bg-subtle`로 표현.

---

## Spacing 토큰

| 변수 | 값 | 주요 용도 |
|---|---|---|
| `--space-01` | `4px` | 아이콘 내부 간격, 미세 여백 |
| `--space-02` | `8px` | 컴포넌트 내부 간격, 아이콘-라벨 |
| `--space-03` | `12px` | Chip 패딩, Badge 패딩 |
| `--space-04` | `16px` | 기본 패딩, 모바일 거터 |
| `--space-05` | `20px` | 중간 간격 |
| `--space-06` | `24px` | 섹션 내부, 데스크탑 거터 |
| `--space-07` | `32px` | 카드 패딩, 컨테이너 |
| `--space-08` | `40px` | 섹션 간 간격 |
| `--space-09` | `48px` | 대형 섹션 패딩 |
| `--space-10` | `64px` | 페이지 레벨 간격 |
| `--space-11` | `80px` | Hero·랜딩 섹션 |
| `--space-12` | `96px` | 최대 섹션 여백 |

---

## Radius 토큰

| 변수 | 값 | 사용 컴포넌트 |
|---|---|---|
| `--radius-xs` | `4px` | Small Button, Tooltip, Checkbox |
| `--radius-sm` | `8px` | Medium/Large Button, Input, Snackbar, Menu |
| `--radius-md` | `12px` | Card (소형) |
| `--radius-lg` | `16px` | Card (기본), Dialog, Modal |
| `--radius-pill` | `9999px` | Chip, Badge, FAB, Switch track, Nav indicator |

---

## Typography 토큰

| 변수 | 값 |
|---|---|
| `--font-en` | `"Mark Pro", sans-serif` |
| `--font-ko` | `"Noto Sans KR", sans-serif` |

### 타입 스케일 (참고)

| Style | Size | Weight | Line-height | Tracking |
|---|---|---|---|---|
| Headline XL | 56px (PC) / 40px (Mobile) | 900 Black | 1.2 | -0.02em |
| Headline LG | 48px / 32px | 900 Black | 1.2 | -0.02em |
| Headline MD | 32px / 28px | 700 Bold | 1.2 | -0.02em |
| Headline SM | 28px / 24px | 700 Bold | 1.2 | 0 |
| Title LG | 24px | 700 Bold | 1.5 | 0 |
| Title MD | 20px | 700 Bold | 1.5 | 0 |
| Title SM | 18px | 500 Medium | 1.5 | 0 |
| Body LG | 18px | 400 Regular | 1.7 | 0 |
| Body MD | 16px | 400 Regular | 1.5 | 0 |
| Body SM | 14px | 400 Regular | 1.5 | 0 |
| Label LG | 16px | 500 Medium | 1.5 | 0.04em |
| Label MD | 14px | 500 Medium | 1.5 | 0.04em |
| Label SM | 12px | 500 Medium | 1.5 | 0.04em |
| Caption | 11px | 400 Regular | 1.5 | 0.04em |
