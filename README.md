# 가까운 도서관 찾기

위치를 입력하면 가까운 공공도서관을 직선거리 순서로 보여주는 웹서비스입니다. 현재는 **예시 데이터**로 동작하며, 화면에 [예시 데이터]가 표시됩니다.

## 실행 방법 (Windows PowerShell)

```powershell
cd "C:\Users\newtr\OneDrive\Desktop\원샷테스트_도서관찾기"
npm install
npm start
```

브라우저에서 http://localhost:3000 을 엽니다. 종료는 `Ctrl + C`.

## 테스트

```powershell
npm test
```

## Vercel 배포

```powershell
vercel login
vercel link --yes
vercel --prod --yes
```

`vercel.json`이 정적 파일 폴더(`public`)와 `/api/*` 연결을 설정합니다. 키는 현재 필요 없습니다.

## 폴더 구조

| 파일 | 역할 |
|---|---|
| `app.js` | Express 앱, API 라우트 |
| `server.js` | 로컬 실행 진입점 |
| `api/index.js` | Vercel 서버리스 진입점 |
| `lib/distance.js`, `lib/libraries.js` | 거리 계산, 목록 정렬 |
| `data/libraries.json` | 예시 도서관 데이터 |
| `public/` | 화면 |
| `docs/` | 기획, API 선정, 설계, 보고서 |

## 참고
- 거리는 직선거리이며 도보 시간은 계산하지 않습니다.
- 예시 데이터의 이름과 좌표는 가상 값입니다. 실제 도서관 정보가 아닙니다.
