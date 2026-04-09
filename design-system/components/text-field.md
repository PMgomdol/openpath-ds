---
# Text Field — OPENPATH DS
> CLAUDE.md 토큰 기준. 이 파일만 읽으면 해당 컴포넌트 구현 가능.
---

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
