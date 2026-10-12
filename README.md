# RATA (라타) — Claude 전달용 전체 소스

이 폴더는 Codex 작업공간에서 찾아낸 **RATA v45 실제 로컬 원본**을 Claude가 이어서 개발할 수 있게 정리한 프로젝트입니다.

## 중요한 사실

- 이 프로젝트는 React, Next.js, Vite 기반이 아닙니다.
- 원래부터 `index.html`, `app.js`, `styles.css`로 만든 모바일 우선 정적 웹앱입니다.
- 따라서 존재하지 않던 React 컴포넌트나 `src/app` 라우터를 복구했다고 주장하지 않습니다.
- `src/app.js`와 `src/styles.css`가 현재 애플리케이션의 편집 가능한 전체 소스입니다.
- 현재 공개 배포 주소는 `https://rata-pi.vercel.app/?v=45`입니다. 이 ZIP을 만드는 과정에서는 재배포하지 않았습니다.

## 폴더 구조

```text
RATA-Claude-Source-v45/
├─ index.html                  # HTML 진입점
├─ package.json
├─ package-lock.json
├─ vercel.json
├─ src/
│  ├─ app.js                  # 화면, 상태, 상호작용, 샘플 데이터 전체
│  └─ styles.css              # 전체 UI 스타일
├─ public/assets/             # 이미지, SVG, 폰트, 온보딩 영상
├─ data/map-places.json       # 지도 위치 조사 데이터
└─ scripts/
   ├─ build.mjs               # dist 생성
   ├─ serve.mjs               # 로컬 미리보기 서버
   └─ geocode-places.cjs      # 위치 데이터 보조 스크립트
```

`dist/`, `node_modules/`, `.vercel/`, `.env*`, Git 메타데이터와 비밀키는 전달본에서 제외했습니다.

## 로컬 실행

Node.js 18 이상이 필요합니다.

```bash
npm install
npm start
```

브라우저에서 `http://127.0.0.1:4173`을 여세요. 이 프로젝트에는 외부 npm 의존성이 없어 `npm install`은 lockfile을 확인하는 용도입니다.

검증만 실행하려면:

```bash
npm run validate
npm run build
```

## Claude에서 이어서 작업하기

1. ZIP을 풀고 Claude Code에서 해당 폴더를 엽니다.
2. Claude에게 먼저 이 README와 `src/app.js`, `src/styles.css`, `index.html`을 읽게 합니다.
3. 디자인을 바꾸기 전에 `npm start`로 현재 v45 기준 화면을 확인합니다.
4. 화면 로직은 `src/app.js`, 스타일은 `src/styles.css`, 이미지·영상은 `public/assets`에서 수정합니다.
5. 수정 후 `npm run validate`와 `npm run build`를 실행합니다.

## Vercel 배포

GitHub 저장소에 이 폴더의 내용을 올린 뒤 Vercel에서 저장소를 연결할 경우:

- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- 환경변수: 현재 버전에는 필요 없음

Vercel CLI를 사용하는 경우 로그인과 프로젝트 연결을 직접 확인한 다음 프로젝트 루트에서 배포하세요. 기존 `rata-pi` 프로젝트를 덮어쓸 수 있으므로, 소유자가 명시적으로 원할 때만 실행해야 합니다.

## 현재 구현 성격과 제한

- 로그인, 회원가입, 저장, 커뮤니티 등은 실제 서버와 연결된 기능이 아니라 브라우저 안에서 동작하는 프로토타입입니다.
- 이벤트와 매장 정보는 `src/app.js` 안의 정적 데이터입니다.
- 지도는 Leaflet과 OpenStreetMap 공개 타일을 사용하므로 지도 표시에는 인터넷 연결이 필요합니다.
- Leaflet CSS/JS는 `index.html`에서 CDN으로 불러옵니다.
- 원본 Git 저장소에는 원격 GitHub 주소가 설정되어 있지 않았습니다. 이 전달본은 확인된 로컬 소스를 기준으로 만들었습니다.

## Claude에 바로 붙여넣을 시작 문구

> 이 프로젝트는 RATA v45 정적 웹앱 원본입니다. 먼저 README.md, index.html, src/app.js, src/styles.css를 읽고 현재 구조와 기능을 요약해줘. React/Next 프로젝트라고 가정하지 말고, 기존 디자인과 기능을 임의로 바꾸지 마. 변경 전에는 npm start로 기준 화면을 확인하고, 변경 후 npm run validate와 npm run build를 실행해줘. Vercel 배포는 내가 명시적으로 요청할 때만 해줘.
