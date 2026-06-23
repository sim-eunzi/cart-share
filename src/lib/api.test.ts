import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  createCart,
  getCart,
  addItem,
  removeItem,
  CartNotFoundError,
  ApiError,
} from "./api";

function mockFetchOnce(body: unknown, init?: { ok?: boolean; status?: number }) {
  const ok = init?.ok ?? true;
  const status = init?.status ?? 200;
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: async () => body,
  });
}

describe("api client", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("createCart", () => {
    it("POST /api/carts 에 title을 보내고 {cartId, token}을 받는다", async () => {
      const fetchMock = mockFetchOnce({ cartId: "c1", token: "tok1" });
      vi.stubGlobal("fetch", fetchMock);

      const res = await createCart("내 카트");

      expect(res).toEqual({ cartId: "c1", token: "tok1" });
      const [url, opts] = fetchMock.mock.calls[0];
      expect(url).toBe("/api/carts");
      expect(opts.method).toBe("POST");
      expect(JSON.parse(opts.body)).toEqual({ title: "내 카트" });
    });

    it("서버 에러 시 ApiError를 던진다", async () => {
      vi.stubGlobal("fetch", mockFetchOnce({ error: "x" }, { ok: false, status: 500 }));
      await expect(createCart("x")).rejects.toBeInstanceOf(ApiError);
    });
  });

  describe("getCart", () => {
    it("GET /api/carts/[id] 결과를 반환한다", async () => {
      const cart = { id: "c1", title: "T", items: [], createdAt: "2026-01-01" };
      const fetchMock = mockFetchOnce(cart);
      vi.stubGlobal("fetch", fetchMock);

      const res = await getCart("c1");

      expect(res).toEqual(cart);
      expect(fetchMock.mock.calls[0][0]).toBe("/api/carts/c1");
    });

    it("404면 CartNotFoundError를 던진다", async () => {
      vi.stubGlobal("fetch", mockFetchOnce({ error: "not found" }, { ok: false, status: 404 }));
      await expect(getCart("nope")).rejects.toBeInstanceOf(CartNotFoundError);
    });
  });

  describe("addItem", () => {
    it("Authorization 헤더에 토큰을 담아 POST 한다", async () => {
      const item = { id: "i1", url: "https://shop.com/1", title: "X", createdAt: "2026" };
      const fetchMock = mockFetchOnce({ item });
      vi.stubGlobal("fetch", fetchMock);

      const res = await addItem("c1", "https://shop.com/1", "tok1");

      expect(res).toEqual(item);
      const [url, opts] = fetchMock.mock.calls[0];
      expect(url).toBe("/api/carts/c1/items");
      expect(opts.method).toBe("POST");
      expect(opts.headers.Authorization).toBe("tok1");
      expect(JSON.parse(opts.body)).toEqual({ url: "https://shop.com/1" });
    });
  });

  describe("removeItem", () => {
    it("DELETE 로 아이템을 지운다", async () => {
      const fetchMock = mockFetchOnce({ success: true });
      vi.stubGlobal("fetch", fetchMock);

      const res = await removeItem("c1", "i1", "tok1");

      expect(res).toBe(true);
      const [url, opts] = fetchMock.mock.calls[0];
      expect(url).toBe("/api/carts/c1/items/i1");
      expect(opts.method).toBe("DELETE");
      expect(opts.headers.Authorization).toBe("tok1");
    });
  });
});
