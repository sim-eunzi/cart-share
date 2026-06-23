import { NextResponse } from 'next/server';
import { CartService } from '@/services/cart-service';
import { FINGERPRINT_COOKIE_NAME, HTTP_STATUS } from '@/lib/constants';

export async function POST(request: Request) {
  try {
    const { title } = await request.json();
    const fingerprint = (request as any).cookies?.get(FINGERPRINT_COOKIE_NAME)?.value;

    if (!title || !fingerprint) {
      return NextResponse.json(
        { error: `Title and ${FINGERPRINT_COOKIE_NAME} cookie are required` },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    const response = await CartService.createCart(title, fingerprint);
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error creating cart:', error);
    return NextResponse.json(
      { error: error.message },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
