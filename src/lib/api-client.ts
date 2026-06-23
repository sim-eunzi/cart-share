import {
  CreateCartRequest,
  CreateCartResponse,
  GetCartResponse,
  AddItemRequest,
  AddItemResponse,
  RemoveItemResponse
} from '@/types';

/**
 * Shopping Cart API Client
 * This client interacts with the Next.js Route Handlers.
 * It assumes the 'fingerprint' cookie is already set in the browser.
 */
export const cartApi = {
  /**
   * Create a new cart.
   * If the user doesn't exist for the current fingerprint, the server will create one automatically.
   */
  async createCart(data: CreateCartRequest): Promise<CreateCartResponse> {
    const response = await fetch('/api/carts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create cart');
    }
    
    return response.json();
  },

  /**
   * Fetch a single cart by ID (Public Access)
   */
  async getCart(cartId: string): Promise<GetCartResponse> {
    const response = await fetch(`/api/carts/${cartId}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch cart');
    }
    
    return response.json();
  },

  /**
   * Delete a cart. Requires owner fingerprint cookie.
   */
  async deleteCart(cartId: string): Promise<{ success: boolean }> {
    const response = await fetch(`/api/carts/${cartId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete cart');
    }
    
    return response.json();
  },

  /**
   * Add an item to the cart. Server extracts OG tags automatically.
   */
  async addItem(cartId: string, data: AddItemRequest): Promise<AddItemResponse> {
    const response = await fetch(`/api/carts/${cartId}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add item');
    }
    
    return response.json();
  },

  /**
   * Remove an item from the cart by its ID.
   */
  async removeItem(cartId: string, itemId: string): Promise<RemoveItemResponse> {
    const response = await fetch(`/api/carts/${cartId}/items/${itemId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to remove item');
    }
    
    return response.json();
  },
};
