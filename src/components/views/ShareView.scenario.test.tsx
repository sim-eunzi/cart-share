import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { ShareView } from "./ShareView";
import { getCart, CartNotFoundError } from "@/lib/api";
import type { CartItem } from "@/types";

vi.mock("@/lib/api", async (orig) => {
  const actual = await orig<typeof import("@/lib/api")>();
  return { ...actual, getCart: vi.fn() };
});

const items: CartItem[] = [
  { id: "i1", url: "https://shop.com/1", title: "울 니트", createdAt: "2026" },
  { id: "i2", url: "https://brand.co.kr/2", title: "후드 집업", createdAt: "2026" },
];

describe("시나리오 B — 친구: 공유 링크로 구경", () => {
  beforeEach(() => vi.clearAllMocks());

  it("B-1: 카드 그리드 + 사러 가기 링크, 추가/삭제 버튼 없음 (읽기 전용)", async () => {
    vi.mocked(getCart).mockResolvedValue({
      id: "c1",
      title: "겨울 옷 장바구니",
      items,
      createdAt: "2026",
    });
    render(<ShareView id="c1" />);

    await waitFor(() => expect(screen.getByText("울 니트")).toBeInTheDocument());

    const links = screen.getAllByRole("link", { name: /사러 가기/ });
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "https://shop.com/1");
    expect(links[0]).toHaveAttribute("target", "_blank");

    // 읽기 전용: 삭제 / 추가 / 공유 버튼 없음
    expect(screen.queryByRole("button", { name: "삭제" })).not.toBeInTheDocument();
    expect(screen.queryByLabelText("상품 링크")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /SHARE/i })).not.toBeInTheDocument();
  });

  it("B-2: 빈 카트면 안내 문구", async () => {
    vi.mocked(getCart).mockResolvedValue({
      id: "c1",
      title: "빈 카트",
      items: [],
      createdAt: "2026",
    });
    render(<ShareView id="c1" />);
    await waitFor(() =>
      expect(screen.getByText("아직 담긴 상품이 없어요")).toBeInTheDocument(),
    );
  });

  it("B-2: 잘못된/만료된 토큰이면 404 안내", async () => {
    vi.mocked(getCart).mockRejectedValue(new CartNotFoundError());
    render(<ShareView id="nope" />);
    await waitFor(() =>
      expect(screen.getByText("없는 카트입니다")).toBeInTheDocument(),
    );
  });
});
