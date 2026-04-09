---
# Navigation — OPENPATH DS
> CLAUDE.md 토큰 기준. 이 파일만 읽으면 해당 컴포넌트 구현 가능.
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
