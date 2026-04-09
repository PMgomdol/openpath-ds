# OPENPATH Design System — 작업 완료 목록

> 최종 업데이트: 2026.04.09

---

## 1. 프로젝트 기반 세팅

- [x] `CLAUDE.md` / `DESIGN.md` 읽고 프로젝트 구조 파악
- [x] Next.js 14 App Router 기반 DS 문서 사이트 구조 확인
- [x] `tailwind.config.ts` — 오픈패스 토큰 커스텀 컬러 별칭 설정 (mint, neutral 등)
- [x] `app/globals.css` — 전체 CSS 커스텀 프로퍼티(토큰) 주입

### globals.css 토큰 목록
| 카테고리 | 토큰 |
|---|---|
| Color (Semantic) | `--color-text-default/subtle/disabled/on-brand`, `--color-bg-default/subtle/brand`, `--color-border-default/brand`, `--color-brand-primary`, `--color-status-error/success/warning`, `--color-interactive-*` |
| Spacing | `--space-01` (4px) ~ `--space-12` (96px) |
| Radius | `--radius-button-sm/md`, `--radius-input`, `--radius-chip`, `--radius-fab`, `--radius-snackbar`, `--radius-card-sm/md`, `--radius-dialog` |
| Shadow | `--shadow-01` ~ `--shadow-04` (Light), 다크모드 opacity 0 |
| Dark mode | `.dark` 클래스로 전체 토큰 반전 |

---

## 2. Foundation 페이지

- [x] `/foundation/color` — 팔레트 + 시맨틱 토큰 테이블
- [x] `/foundation/typography` — 타입 스케일 미리보기
- [x] `/foundation/spacing` — 스페이싱 스케일
- [x] `/foundation/elevation` — 그림자 단계 (shadow/01~04)

---

## 3. 토큰 페이지

- [x] `/tokens` — 전체 토큰 참조 페이지
  - Color / Spacing / Radius / Shadow 4개 카테고리
  - 라이브 컬러 칩 (다크모드 토글 시 자동 반영)
  - 클릭 시 변수명 클립보드 복사
  - `MutationObserver` 로 `<html>.dark` 클래스 감지

---

## 4. 컴포넌트 페이지 — 신규 생성 (14개)

| 컴포넌트 | 경로 |
|---|---|
| Button | `/components/button` |
| Input (Text Field) | `/components/input` |
| Modal | `/components/modal` |
| Selection Controls | `/components/selection-controls` |
| Chip | `/components/chip` |
| Card | `/components/card` |
| Tab | `/components/tab` |
| Snackbar | `/components/snackbar` |
| App Bar | `/components/app-bar` |
| Bottom Navigation | `/components/bottom-navigation` |
| Navigation Drawer | `/components/navigation-drawer` |
| Menu | `/components/menu` |
| FAB | `/components/fab` |
| Banner | `/components/banner` |
| List | `/components/list` |

---

## 5. 컴포넌트 페이지 — DESIGN.md 기반 스펙 재검토 및 업데이트 (10개)

### Selection Controls (`/components/selection-controls`)
- Checkbox: 20×20px, radius 4px, 터치영역 40×40px, Indeterminate(dash) 상태
- Radio: 20px icon, 40×40px 터치영역, Hover ripple color/bg/brand
- Switch: Track **52×32px**, Thumb Off=**24px** / On+Pressed=**28px**, radius 9999px

### Tab (`/components/tab`)
- Primary: 높이 48px, 하단 indicator 2px 라인, color/brand/primary
- Secondary: Pill형 배경 color/bg/brand, 높이 40px, radius 9999px
- 카운트 배지 지원 (두 타입 모두)

### Snackbar (`/components/snackbar`)
- Shadow: shadow/04 (0 8px 24px -2px) — `var(--shadow-04)`
- BG: N600 Light / White Dark (color/text/default 반전 사용)
- Action text: color/brand/primary M300
- 높이 48px, 패딩 16px, radius 8px, min 288px, max 568px
- 자동 소멸: **4초** (기존 3초 수정)

### App Bar (`/components/app-bar`)
- Small **64px** (기존 56px 수정), Medium **112px**, Large **152px**, Bottom **80px**
- 스크롤 전: shadow 없음 / 스크롤 후: shadow/03 + bg → color/bg/subtle
- 라이브 스크롤 데모 (컨테이너 내부 스크롤)
- 우측 액션 아이콘 최대 3개

### Bottom Navigation (`/components/bottom-navigation`)
- 높이 **80px** (기존 64px 수정)
- Active indicator: **64×32px** pill, color/bg/brand M20
- Shadow: shadow/03 (elevation/surface/sticky)
- 라벨: 12px Medium (type/label/sm)
- Badge: color/status/error #FF3257

### Navigation Drawer (`/components/navigation-drawer`)
- 최대 너비 **360px** (기존 280px 수정)
- 아이템 높이 **56px**
- 아이템 radius **9999px** (Pill 형태)
- 라벨: 14px Medium (type/label/md)
- Scrim: `rgba(21,27,30,0.40)`
- Standard / Modal 두 타입

### Menu (`/components/menu`)
- 아이템 높이 **48px** (기존 44px 수정)
- Radius **8px** (기존 12px 수정)
- 최소 너비 112px / 최대 너비 280px
- 라벨: **16px Regular** (기존 14px 수정, type/body/md)
- Shadow: shadow/02 (0 2px 8px)
- Hover: color/bg/subtle / Pressed: color/bg/brand
- Destructive: color/status/error

### FAB (`/components/fab`)
- Small 40px / FAB 56px / **Large 96px** (기존 80px 수정, icon 36px) / Extended 56px+라벨
- Shadow Default: shadow/03 → Hover/Pressed: shadow/04
- Speed Dial 데모 포함

### Banner (`/components/banner`)
- **4px left accent border** 추가 (기존 전체 border 방식 수정)
- 패딩 V **12px** / H **16px** (space/03 / space/04)
- Radius **8px** (기존 12px 수정)
- 타입별 bg: Informational=color/bg/subtle, Success=color/bg/brand, Warning=#FFF8F0, Error=#FFF0F3
- 제목 14px Medium / 본문 14px Regular

### List (`/components/list`)
- Single-line **48px** / Two-line **64px** / Three-line **88px**
- 제목: **16px Regular** (기존 14px 수정, type/body/md)
- 서브텍스트: 14px Regular (type/body/sm)
- Leading → 텍스트 간격: 16px (space/04)
- 체크 리스트 포함

---

## 6. 공통 수정 사항

- [x] 전체 컴포넌트 CSS 변수명 정규화
  - `--color-text-primary` → `--color-text-default`
  - `--color-text-secondary` → `--color-text-subtle`
  - `--color-border` → `--color-border-default`
  - `--color-bg-base` → `--color-bg-default`
- [x] 다크모드 bg 토큰 수정: `#111a1a` → N600 `#29363D` (bg-default), `#1a2428` → N500 `#3D5060` (bg-subtle)
- [x] 하드코딩 색상 제거 → 전체 `var(--color-*)` CSS 변수 참조로 전환

---

## 7. GitHub 연동 및 배포

- [x] GitHub 리포지토리 연결: `https://github.com/PMgomdol/openpath-ds.git`
- [x] PAT 토큰 기반 인증 (URL 임베드 방식, 보안 리모트 URL로 관리)
- [x] 전체 커밋 및 `main` 브랜치 push 완료
- [ ] Vercel 배포 (CLI 설치 완료, 로그인 후 진행 예정)

---

## 8. 다음 작업 (Pending)

- [ ] `vercel login` 후 `vercel --prod` 배포 실행
- [ ] Slider 컴포넌트 페이지 생성
- [ ] Chip 페이지 DESIGN.md 스펙 검토·업데이트
- [ ] Card 페이지 DESIGN.md 스펙 검토·업데이트
