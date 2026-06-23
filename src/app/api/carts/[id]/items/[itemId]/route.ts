import { NextResponse } from 'next/server';
import { RemoveItemResponse } from '@/types';

/**
 * 장바구니 상품 삭제 API
 * DELETE /api/carts/[id]/items/[itemId]
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  try {
    const { id, itemId } = await params;
    const token = request.headers.get('Authorization');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: 구현 필요
    const response: RemoveItemResponse = {
      success: true,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
