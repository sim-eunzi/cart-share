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
- 가격: 사용자 **수동 입력/수정**
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

## 5. 데이터 모델 (참고 — DB는 백엔드에서 확정)

```
Cart
  id          string
  title       string
  shareToken  string  unique   // 공유 링크 (읽기)
  editToken   string  unique   // 수정 링크 (쓰기)
  createdAt   datetime

Item
  id        string
  cartId    string  -> Cart
  url       string             // 원본 쇼핑몰 (사러 가기)
  image     string?            // og:image
  title     string?            // og:title
  price     string?            // 수동 입력
  order     int                // 정렬용
```

## 6. 보안/주의 (중요)

- **공유 응답에 `editToken`을 절대 포함하지 않는다.** 공유 페이지가 수정 권한으로 새지 않도록 API 단에서 제외.
- 토큰은 추측 불가능한 랜덤(예: cuid/nanoid). 순번 ID 금지.
- OG 추출은 외부 URL fetch이므로 타임아웃·실패 처리 필수 (실패해도 카드 생성은 성공).

## 7. 역할 분담

- **백엔드 (친구)** — DB 스키마, API Route Handler, OG 추출 유틸. 라벨 `area:backend`
- **프론트 (나)** — 페이지/컴포넌트, 폼/UX. 라벨 `area:frontend`
- 경계: 같은 레포의 `src/app/api/*` = 백엔드, 나머지 `src/app/*` = 프론트
- API 계약은 추후 별도 문서로 합의 예정.

## 8. 기술 스택

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- API: Next.js Route Handlers (`src/app/api/*`)
- DB: 백엔드 담당이 확정 (프로토타입은 SQLite + Prisma 권장)
