/**
 * 장바구니 내 개별 상품 정보
 */
export interface CartItem {
  id: string;
  url: string;
  title?: string;
  image?: string;
  price?: string;
  createdAt: string; // ISO 8601 string
}

/**
 * 장바구니(Cart) 정보
 */
export interface Cart {
  id: string;
  userId: string;
  title: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

/**
 * 유저(User) 정보 (관리용)
 */
export interface User {
  id: string;
  token: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * API 요청 및 응답 타입 정의
 */

// POST /api/carts
export interface CreateCartRequest {
  title: string;
}

export interface CreateCartResponse {
  cartId: string;
  token: string;
}

// GET /api/carts/[id]
export type GetCartResponse = Pick<Cart, 'id' | 'title' | 'items' | 'createdAt'>;

// POST /api/carts/[id]/items
export interface AddItemRequest {
  url: string;
}

export interface AddItemResponse {
  item: CartItem;
}

// DELETE /api/carts/[id]/items/[itemId]
export interface RemoveItemResponse {
  success: boolean;
}
