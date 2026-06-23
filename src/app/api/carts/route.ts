import { NextResponse } from 'next/server';
import { CreateCartResponse } from '@/types';

/**
 * 장바구니 생성 API
 * POST /api/carts
 */
export async function POST(request: Request) {
  try {
    // TODO: 구현 필요
    const response: CreateCartResponse = {
      cartId: 'dummy-cart-id',
      token: 'dummy-token',
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
