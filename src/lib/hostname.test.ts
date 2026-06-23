import { describe, it, expect } from "vitest";
import { getHostname } from "./hostname";

describe("getHostname", () => {
  it("호스트네임을 반환한다", () => {
    expect(getHostname("https://shop.com/item/1")).toBe("shop.com");
  });

  it("www. 접두사를 제거한다", () => {
    expect(getHostname("https://www.shop.com/item/1")).toBe("shop.com");
  });

  it("쿼리스트링이 있어도 호스트만 반환한다", () => {
    expect(getHostname("https://brand.co.kr/p?id=1&x=2")).toBe("brand.co.kr");
  });

  it("http도 처리한다", () => {
    expect(getHostname("http://mall.example.com/x")).toBe("mall.example.com");
  });

  it("잘못된 URL이면 null", () => {
    expect(getHostname("그냥 텍스트")).toBeNull();
    expect(getHostname("")).toBeNull();
  });

  it("http/https가 아니면 null", () => {
    expect(getHostname("ftp://files.com/a")).toBeNull();
    expect(getHostname("javascript:alert(1)")).toBeNull();
  });
});
