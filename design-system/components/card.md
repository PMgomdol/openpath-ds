---
# Card — OPENPATH DS
> CLAUDE.md 토큰 기준. 이 파일만 읽으면 해당 컴포넌트 구현 가능.
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
