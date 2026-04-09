---
# Selection Controls — OPENPATH DS
> CLAUDE.md 토큰 기준. 이 파일만 읽으면 해당 컴포넌트 구현 가능.
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
