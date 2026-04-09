# OPENPATH Design System — 사이트 프로젝트

## 프로젝트 목적
오픈패스 DS의 원칙·토큰·컴포넌트를 공개 문서 사이트로 구현.
Seed Design(seed-design.io), Socar DS(design.socar.kr) 수준의
실제 DS 문서 사이트.

## 기술 스택
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS (오픈패스 토큰 연동)
- MDX (문서 페이지)
- next-themes (Light/Dark)

## 오픈패스 브랜드 컬러
Primary: #28D7D2 (Mint M300)
팔레트: M20 #F3FCFC ~ M600 #156565
Neutral: N20 #F4F5F5 ~ N600 #29363D
Error: #FF3257 / Success: #28D7D2 / Warning: #EE706B

## 사이트 구조
/                        → 홈 (DS 소개 + Principle)
/foundation/color        → 컬러 팔레트 + 토큰 테이블
/foundation/typography   → 타이포 스케일 + 미리보기
/foundation/spacing      → 스페이싱 스케일
/foundation/elevation    → 그림자 단계
/components/button       → 버튼 라이브 데모 + 스펙
/components/input        → 인풋 라이브 데모 + 스펙
/components/modal        → 모달 라이브 데모
/tokens                  → 전체 토큰 테이블 + 복사 기능

## 필수 기능
- 헤더 고정 + 사이드바 네비게이션
- Light / Dark 모드 토글 (버튼 하나로 전체 전환)
- 토큰 값 클릭하면 복사 (클립보드)
- 컴포넌트 라이브 데모 (실제로 인터랙션 가능)
- 코드 스니펫 표시 + 복사 버튼
- DESIGN.md 다운로드 버튼 (홈에 배치)

## 네이밍 원칙
토큰: op_ui_button_primary_default_m_light 공식
컴포넌트: 역할 기반 (Primary X → Contained O 아님)

## 코딩 규칙
- TypeScript strict 모드
- Tailwind 유틸리티 클래스 사용
- 컴포넌트 단위로 파일 분리
- 하드코딩 금지 — 모든 색상·간격은 토큰 참조
