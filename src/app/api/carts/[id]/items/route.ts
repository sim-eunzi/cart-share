import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { CartService } from '@/services/cart-service';
import { FINGERPRINT_COOKIE_NAME, HTTP_STATUS } from '@/lib/constants';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: cartId } = await params;
    const { url } = await request.json();
    const cookieStore = await cookies();
    const fingerprint = cookieStore.get(FINGERPRINT_COOKIE_NAME)?.value;

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }
    if (!fingerprint) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: HTTP_STATUS.UNAUTHORIZED }
      );
    }

    const response = await CartService.addItem(cartId, url, fingerprint);
    return NextResponse.json(response);
  } catch (error: any) {
    let status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    if (error.message === 'Cart not found') status = HTTP_STATUS.NOT_FOUND;
    if (error.message === 'Forbidden') status = HTTP_STATUS.FORBIDDEN;
    
    return NextResponse.json({ error: error.message }, { status });
  }
}
