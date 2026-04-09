---
# Chips — OPENPATH DS
> CLAUDE.md 토큰 기준. 이 파일만 읽으면 해당 컴포넌트 구현 가능.
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
