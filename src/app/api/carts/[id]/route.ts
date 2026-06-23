import { NextResponse } from 'next/server';
import { CartService } from '@/services/cart-service';
import { FINGERPRINT_COOKIE_NAME, HTTP_STATUS } from '@/lib/constants';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await CartService.getCart(id);
    return NextResponse.json(response);
  } catch (error: any) {
    const status = error.message === 'Cart not found' ? HTTP_STATUS.NOT_FOUND : HTTP_STATUS.INTERNAL_SERVER_ERROR;
    return NextResponse.json({ error: error.message }, { status });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const fingerprint = (request as any).cookies?.get(FINGERPRINT_COOKIE_NAME)?.value;

    if (!fingerprint) {
      return NextResponse.json(
        { error: `Unauthorized: No ${FINGERPRINT_COOKIE_NAME} cookie` },
        { status: HTTP_STATUS.UNAUTHORIZED }
      );
    }

    const response = await CartService.deleteCart(id, fingerprint);
    return NextResponse.json(response);
  } catch (error: any) {
    const status = error.message === 'Forbidden' ? HTTP_STATUS.FORBIDDEN : HTTP_STATUS.INTERNAL_SERVER_ERROR;
    return NextResponse.json({ error: error.message }, { status });
  }
}
