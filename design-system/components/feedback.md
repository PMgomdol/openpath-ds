---
# Feedback — OPENPATH DS
> CLAUDE.md 토큰 기준. 이 파일만 읽으면 해당 컴포넌트 구현 가능.
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
