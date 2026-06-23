import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { CartService } from '@/services/cart-service';
import { FINGERPRINT_COOKIE_NAME, HTTP_STATUS } from '@/lib/constants';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  try {
    const { id: cartId, itemId } = await params;
    const cookieStore = await cookies();
    const fingerprint = cookieStore.get(FINGERPRINT_COOKIE_NAME)?.value;

    if (!fingerprint) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: HTTP_STATUS.UNAUTHORIZED }
      );
    }

    const response = await CartService.removeItem(cartId, itemId, fingerprint);
    return NextResponse.json(response);
  } catch (error: any) {
    let status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    if (error.message === 'Cart not found') status = HTTP_STATUS.NOT_FOUND;
    if (error.message === 'Forbidden') status = HTTP_STATUS.FORBIDDEN;
    
    return NextResponse.json({ error: error.message }, { status });
  }
}
