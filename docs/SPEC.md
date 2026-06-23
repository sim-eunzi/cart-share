# Cart Share — 기획 스펙 (M1)

## 1. 한 줄 목표

쇼핑몰 장바구니 상품을 카드로 만들어, **공유 링크**로 친구에게 보여주고,
본인은 **수정 링크**로 고칠 수 있는 웹 서비스.

## 2. 사용자 흐름 (M1)

### 나 (생성)
1. `/create` 에서 카트 제목 입력 + 상품 URL 여러 개 붙여넣기
2. "카드 생성" → 서버가 OG 태그로 **이미지·제목** 추출 (가격은 수동 입력)
3. 결과로 **[공유 링크] + [수정 링크]** 2개 받음
4. 공유 링크를 친구에게 전달

### 친구 (구경)
5. 공유 링크 열기 → 카드 구경 → "사러 가기" → 원본 쇼핑몰

### 나 (나중에 수정)
6. 수정 링크로 들어가 상품 추가/삭제, 제목 변경

## 3. 범위 (Scope)

### M1 (이번 목표)
- 카트 생성 (제목 + URL 여러 개)
- OG 추출: **이미지·제목만** (실패 시 null 폴백)
- 공유 보기 (읽기 전용) + 사러 가기
- 수정 (상품 추가/삭제, 제목 변경)

### M1 이후 (Out of scope, 백로그)
- 가격 자동 추출 (JSON-LD / 사이트별 파서)
- URL 붙여넣자마자 실시간 미리보기
- 로그인 / 내 카트 목록
- 카드 정렬 드래그, 썸네일 직접 업로드
- 조회수 / 만료

## 4. 화면

| 경로 | 용도 | 권한 |
|---|---|---|
| `/create` | 제목 + URL 입력 → 생성 | 누구나 |
| `/c/[shareToken]` | 공유 보기 (읽기 전용, "사러 가기") | 공유 토큰 |
| `/e/[editToken]` | 수정 (추가/삭제, 제목 변경) | 수정 토큰 |

## 5. 데이터 모델 (Supabase - JSONB 활용)

### 유저 테이블 (`users`)
- `id`: string (UUID)
- `token`: string (관리 및 수정을 위한 보안 토큰)
- `createdAt`: datetime
- `updatedAt`: datetime

### 장바구니 테이블 (`carts`)
- `id`: string (공유용 nanoid/UUID)
- `user_id`: string (FK -> users.id)
- `createdAt`: datetime
- `updatedAt`: datetime
- `items`: JSONB (상품 목록 리스트)
    - `id`: string
    - `url`: string (상품 URL)
    - `title`: string? (미리보기 제목)
    - `image`: string? (미리보기 이미지)
    - `createdAt`: datetime (상품 추가일)

---

## 6. 보안/주의 (중요)

- **공유 응답에 `token`을 절대 포함하지 않는다.** 공유 페이지가 수정 권한으로 새지 않도록 API 단에서 제외.
- 토큰은 추측 불가능한 랜덤(예: nanoid). 순번 ID 금지.
- OG 추출은 외부 URL fetch이므로 타임아웃·실패 처리 필수 (실패해도 카드 생성은 성공).

## 7. 역할 분담

- **백엔드** — Supabase 설정, API Route Handler, OG 추출 유틸.
- **프론트** — 페이지/컴포넌트, 스타일링(Vanilla CSS), 폼 처리.
- 경계: `src/app/api/*` = 백엔드, 나머지 `src/app/*` = 프론트

## 8. 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS (Premium & Dynamic Design)
- **Database**: Supabase (PostgreSQL with JSONB)
- **Deployment**: Vercel

---

## 9. API 설계 (Next.js Route Handlers)

### 9.1 장바구니 (Carts)
- **POST `/api/carts`** (생성)
    - 본문: `{ title: string }`
    - 응답: `{ cartId: string, token: string }` (유저 생성 및 카트 연결)
- **GET `/api/carts/[id]`** (조회)
    - 설명: 누구나 조회 가능 (공유용)
    - 응답: `{ id, title, items, createdAt }`
- **DELETE `/api/carts/[id]`** (삭제)
    - 헤더: `Authorization: <token>`
    - 설명: 토큰 소유자만 삭제 가능

### 9.2 장바구니 상품 (Items)
- **POST `/api/carts/[id]/items`** (추가)
    - 헤더: `Authorization: <token>`
    - 본문: `{ url: string }`
    - 설명: 서버에서 OG 태그 추출 후 `items` JSONB 배열에 추가
- **DELETE `/api/carts/[id]/items/[itemId]`** (제거)
    - 헤더: `Authorization: <token>`
    - 설명: `items` 리스트에서 특정 ID 상품 제거
