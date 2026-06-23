import { supabase } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import * as cheerio from 'cheerio';
import {
  CartItem,
  CreateCartResponse,
  GetCartResponse,
  AddItemResponse,
  RemoveItemResponse
} from '@/types';
import { CART_ID_LENGTH, ITEM_ID_LENGTH } from '@/lib/constants';

/**
 * 장바구니 관련 비즈니스 로직을 처리하는 서비스 클래스
 */
export class CartService {
  /**
   * 유저를 조회하거나 새로 생성합니다 (장바구니 생성 시에만 사용).
   */
  private static async getOrCreateUser(fingerprint: string) {
    let { data: user, error } = await supabase
      .from('users')
      .select('id')
      .eq('token', fingerprint)
      .maybeSingle();

    if (error) throw error;

    if (!user) {
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([{ token: fingerprint }])
        .select()
        .single();

      if (createError) throw createError;
      user = newUser;
    }
    return user;
  }

  /**
   * 유저 존재 여부를 확인합니다 (수정/삭제 권한 확인용).
   */
  private static async verifyUser(fingerprint: string) {
    const { data: user, error } = await supabase
      .from('users')
      .select('id')
      .eq('token', fingerprint)
      .maybeSingle();

    if (error || !user) {
      throw new Error('인증되지 않은 사용자 세션입니다.');
    }
    return user;
  }

  /**
   * 장바구니 존재 여부와 소유권을 통합 검증합니다.
   */
  private static async getOwnedCart(cartId: string, userId: string) {
    const { data: cart, error } = await supabase
      .from('carts')
      .select('items, user_id')
      .eq('id', cartId)
      .single();

    if (error || !cart) throw new Error('장바구니를 찾을 수 없습니다.');
    if (cart.user_id !== userId) throw new Error('해당 장바구니에 대한 권한이 없습니다.');

    return cart;
  }

  /**
   * 새로운 장바구니를 생성합니다.
   */
  static async createCart(title: string, fingerprint: string): Promise<CreateCartResponse> {
    const user = await this.getOrCreateUser(fingerprint);
    const cartId = nanoid(CART_ID_LENGTH);

    const { error } = await supabase
      .from('carts')
      .insert([{
        id: cartId,
        user_id: user.id,
        title,
        items: []
      }]);

    if (error) throw error;

    return { cartId, token: fingerprint };
  }

  /**
   * 장바구니 정보를 조회합니다 (공개 링크용).
   */
  static async getCart(cartId: string): Promise<GetCartResponse> {
    const { data, error } = await supabase
      .from('carts')
      .select('id, title, items, created_at')
      .eq('id', cartId)
      .single();

    if (error || !data) throw new Error('장바구니를 찾을 수 없습니다.');

    return {
      id: data.id,
      title: data.title,
      items: data.items || [],
      createdAt: data.created_at,
    };
  }

  /**
   * 장바구니를 삭제합니다.
   */
  static async deleteCart(cartId: string, fingerprint: string): Promise<{ success: boolean }> {
    const user = await this.verifyUser(fingerprint);
    await this.getOwnedCart(cartId, user.id); // 권한 체크

    const { error } = await supabase
      .from('carts')
      .delete()
      .eq('id', cartId)
      .eq('user_id', user.id);

    if (error) throw error;
    return { success: true };
  }

  /**
   * 장바구니에 상품을 추가합니다 (OG 추출 포함).
   */
  static async addItem(cartId: string, url: string, fingerprint: string): Promise<AddItemResponse> {
    const user = await this.verifyUser(fingerprint);
    const cart = await this.getOwnedCart(cartId, user.id);

    const ogData = await this.extractOgTags(url);

    const newItem: CartItem = {
      id: nanoid(ITEM_ID_LENGTH),
      url,
      ...ogData, // 여기에 title, image, price가 포함됩니다.
      createdAt: new Date().toISOString(),
    };

    const updatedItems = [...(cart.items || []), newItem];
    const { error } = await supabase
      .from('carts')
      .update({ items: updatedItems })
      .eq('id', cartId);

    if (error) throw error;

    return { item: newItem };
  }

  /**
   * 장바구니에서 특정 상품을 제거합니다.
   */
  static async removeItem(cartId: string, itemId: string, fingerprint: string): Promise<RemoveItemResponse> {
    const user = await this.verifyUser(fingerprint);
    const cart = await this.getOwnedCart(cartId, user.id);

    const updatedItems = (cart.items || []).filter((item: any) => item.id !== itemId);

    const { error } = await supabase
      .from('carts')
      .update({ items: updatedItems })
      .eq('id', cartId);

    if (error) throw error;
    return { success: true };
  }

  /**
   * URL에서 메타데이터(제목, 이미지, 가격)를 추출합니다.
   */
  private static async extractOgTags(url: string) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        },
        next: { revalidate: 3600 }
      });
      const html = await response.text();
      const $ = cheerio.load(html);

      return {
        title: $('meta[property="og:title"]').attr('content') || $('title').text() || undefined,
        image: $('meta[property="og:image"]').attr('content') || undefined,
        price: $('meta[property="og:price:amount"]').attr('content') || $('meta[property="product:price:amount"]').attr('content') || undefined,
      };
    } catch (error) {
      console.error('OG 추출 실패:', error);
      return { title: undefined, image: undefined, price: undefined };
    }
  }
}
