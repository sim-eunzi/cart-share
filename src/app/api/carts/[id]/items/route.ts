import { NextResponse } from 'next/server';
import { AddItemResponse } from '@/types';

/**
 * 장바구니 상품 추가 API
 * POST /api/carts/[id]/items
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.headers.get('Authorization');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: 구현 필요 (OG 추출 및 DB 업데이트)
    const response: AddItemResponse = {
      item: {
        id: 'dummy-item-id',
        url: 'https://example.com',
        title: 'Dummy Item',
        createdAt: new Date().toISOString(),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
