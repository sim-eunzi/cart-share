import type {
  CreateCartResponse,
  GetCartResponse,
  AddItemResponse,
  CartItem,
} from "@/types";
import { ensureFingerprint } from "./fingerprint";

/** 일반 API 오류 */
export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** 카트를 찾을 수 없음 (404) — 404 화면 분기용 */
export class CartNotFoundError extends ApiError {
  constructor(message = "없는 카트입니다") {
    super(404, message);
    this.name = "CartNotFoundError";
  }
}

async function parseOrThrow<T>(res: Response): Promise<T> {
  if (res.status === 404) {
    throw new CartNotFoundError();
  }
  if (!res.ok) {
    throw new ApiError(res.status, `요청 실패 (${res.status})`);
  }
  return (await res.json()) as T;
}

/** 카트 생성 — POST /api/carts */
export async function createCart(title: string): Promise<CreateCartResponse> {
  ensureFingerprint();
  const res = await fetch("/api/carts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return parseOrThrow<CreateCartResponse>(res);
}

/** 카트 조회 (공개) — GET /api/carts/[id] */
export async function getCart(id: string): Promise<GetCartResponse> {
  const res = await fetch(`/api/carts/${id}`);
  return parseOrThrow<GetCartResponse>(res);
}

/** 상품 추가 (소유자) — POST /api/carts/[id]/items */
export async function addItem(
  id: string,
  url: string,
  token: string,
): Promise<CartItem> {
  ensureFingerprint();
  const res = await fetch(`/api/carts/${id}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({ url }),
  });
  const data = await parseOrThrow<AddItemResponse>(res);
  return data.item;
}

/** 상품 삭제 (소유자) — DELETE /api/carts/[id]/items/[itemId] */
export async function removeItem(
  id: string,
  itemId: string,
  token: string,
): Promise<boolean> {
  ensureFingerprint();
  const res = await fetch(`/api/carts/${id}/items/${itemId}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  const data = await parseOrThrow<{ success: boolean }>(res);
  return data.success;
}
