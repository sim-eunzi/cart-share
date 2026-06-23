# Cart Share

쇼핑몰 장바구니 상품을 카드로 만들어, **공유 링크**로 친구에게 보여주고
본인은 **수정 링크**로 고칠 수 있는 웹 서비스. (프로토타입 / M1)

## 문서

- [기획 스펙 (SPEC)](./docs/SPEC.md)
- [시나리오 케이스 (SCENARIOS)](./docs/SCENARIOS.md)

## 스택

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Vitest + Testing Library

## 디자인 컨셉

핑크 픽셀 키치 + 레트로 OS 창. 헤드라인 `Press Start 2P`, 본문/한글 `Galmuri11`(웹폰트).
디자인 토큰은 `src/app/globals.css`의 `@theme`에 정의 (ink/pink/rose/butter…).

## 개발

```bash
npm install
npm run dev        # http://localhost:3000
npm run test       # 단위 + 시나리오 테스트 (Vitest)
npm run typecheck  # tsc --noEmit
npm run build      # 프로덕션 빌드
```

## 화면 / 라우팅

- `/create` — 방 만들기 (제목 → `POST /api/carts`)
- `/e/[id]?t=token` — 소유자 수정뷰 (상품 추가/삭제, 공유 링크 생성)
- `/c/[id]` — 공유 읽기뷰 (카드 + 사러 가기, 읽기 전용)

> `cartId`는 공개(GET), `token`은 소유자 전용(Authorization 헤더). 공유뷰엔 토큰이 노출되지 않음 (SPEC §6).

## 폴더 구조 (프론트)

```
src/
  app/                  # 라우트 (create, e/[id], c/[id], not-found) + globals.css
  components/ui/         # PixelButton, PixelInput, RetroWindow, Toast
  components/cart/       # ProductCard, AddItemForm, CartGrid, ShareModal, EmptyState, CreateRoomForm
  components/views/      # CreateView, EditView, ShareView (+ 시나리오 테스트)
  lib/                   # api 클라이언트, hostname 유틸
```

## 역할 분담

- **프론트** — 페이지/컴포넌트 (`src/app/*` 중 api 제외), 라벨 `area:frontend`
- **백엔드** — DB·API (`src/app/api/*`), 라벨 `area:backend`

## 백엔드와의 계약 메모

- `CartItem`에 `price` 없음 → 카드는 이미지·상품명·사이트명만 (사이트명은 클라이언트가 URL에서 파생).
- 제목 수정(PATCH) 엔드포인트 없음 → 수정뷰의 제목은 표시 전용 (생성 시에만 설정).
