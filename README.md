# Cart Share

쇼핑몰 장바구니 상품을 카드로 만들어, **공유 링크**로 친구에게 보여주고
본인은 **수정 링크**로 고칠 수 있는 웹 서비스. (프로토타입 / M1)

## 문서

- [기획 스펙 (SPEC)](./docs/SPEC.md)
- [시나리오 케이스 (SCENARIOS)](./docs/SCENARIOS.md)

## 스택

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4

## 개발

```bash
npm install
npm run dev
# http://localhost:3000
```

## 역할 분담

- **프론트** — 페이지/컴포넌트 (`src/app/*`), 라벨 `area:frontend`
- **백엔드** — DB·API (`src/app/api/*`), 라벨 `area:backend`

> 코드 구현은 다음 단계. 현재 레포는 스캐폴드 + 기획 문서까지.
