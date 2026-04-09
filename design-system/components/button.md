---
# Button — OPENPATH DS
> CLAUDE.md 토큰 기준. 이 파일만 읽으면 해당 컴포넌트 구현 가능.
---

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
