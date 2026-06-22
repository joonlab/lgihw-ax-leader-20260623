# LG인화원 AX 리더 세미나 — 강의자료 사이트

LG인화원 **AX 리더 세미나**(팀장 대상, 2026-06-23 1차 · 06-25 2차) 강의자료 사이트입니다.
**Antigravity 2.0**로 에이전틱 AI를 직접 실습하는 하루를, 교육생이 복습·심화할 수 있도록 정리했습니다.
Vite + 바닐라 JS 기반 SPA로, 외부 DB/인증 의존성 없이 정적 호스팅(Vercel)에 배포합니다.

> 디자인·렌더링 엔진은 `20260612_LG유플러스_AI교육`의 사이트를 참고·재사용하고, 콘텐츠와 브랜드 색상(LG Red)만 이번 세미나에 맞게 재구성했습니다.

## 콘텐츠 구성

| 챕터 | 내용 |
|------|------|
| CH00 개요 | 오늘의 흐름·시간표, 세미나/강사 소개 |
| CH01 Antigravity 2.0 | 소개 · 설치(Win/Mac) · 인터페이스/Slash 커맨드 · 안전 세팅 (영상 캡처 포함) |
| CH02 공통 실습 4종 | 파일 정리 → 엑셀/보고서 → 자료조사 HTML(병렬) → AI 웹앱(무료 Gemini API) |
| CH03 자율 심화 | 스킬(Skill) 제작 · 하네스/MCP 개념 |
| CH04 실습자료 & 참고 | 다운로드 센터(더미데이터·샘플·프롬프트팩) · 참고 링크 |

## 프로젝트 구조

```
lgihw-ax-leader-20260623/
├── content/clips/          # 챕터·클립별 강의자료 본문 (chXX-clipYY.html)
├── data/                   # curriculum / schedule / glossary 등
├── js/                     # app·router·renderers (엔진)
├── styles/                 # CSS 모듈 (tokens.css에 LG Red 브랜드 컬러)
├── public/
│   ├── img/antigravity/    # 영상에서 추출한 Antigravity 2.0 스크린샷
│   └── practice/           # 실습 자료 다운로드 (더미데이터 zip·샘플 HTML·프롬프트팩)
├── index.html · site.config.js · vite.config.js · vercel.json · package.json
```

## 실행 방법

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 프로덕션 빌드 (dist/)
npm run preview  # 빌드 결과 로컬 미리보기
```

## 배포

- 호스팅: Vercel — `main` 브랜치에 push 시 자동 빌드·배포 (vercel.json의 buildCommand 사용)
- 저장소: https://github.com/joonlab/lgihw-ax-leader-20260623

## 브랜드 색상 (`styles/tokens.css`)

- `--brand: #A50034` (LG Red)
- `--brand-gray: #6B6B6B` (Neutral Gray)
- `--brand-silver: #8A8D8F` (Premium Silver)
- `--brand-gold: #85714D` (Highlight Gold)
