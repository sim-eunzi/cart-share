import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { EditView } from "./EditView";
import { getCart, addItem, removeItem, CartNotFoundError } from "@/lib/api";
import type { CartItem } from "@/types";

vi.mock("@/lib/api", async (orig) => {
  const actual = await orig<typeof import("@/lib/api")>();
  return {
    ...actual,
    getCart: vi.fn(),
    addItem: vi.fn(),
    removeItem: vi.fn(),
  };
});

const item1: CartItem = {
  id: "i1",
  url: "https://shop.com/1",
  title: "울 니트",
  createdAt: "2026",
};
const item2: CartItem = {
  id: "i2",
  url: "https://brand.co.kr/2",
  title: "후드 집업",
  createdAt: "2026",
};

describe("시나리오 C — 생성자: 나중에 수정", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it("C-1: 카트 로드 → 상품 추가/삭제 → 공유 모달", async () => {
    vi.mocked(getCart).mockResolvedValue({
      id: "c1",
      title: "겨울 옷 장바구니",
      items: [item1],
      createdAt: "2026",
    });
    vi.mocked(addItem).mockResolvedValue(item2);
    vi.mocked(removeItem).mockResolvedValue(true);

    render(<EditView id="c1" token="tok1" />);

    await waitFor(() =>
      expect(screen.getByText("겨울 옷 장바구니")).toBeInTheDocument(),
    );
    expect(screen.getByText("울 니트")).toBeInTheDocument();

    // 추가
    fireEvent.change(screen.getByLabelText("상품 링크"), {
      target: { value: "https://brand.co.kr/2" },
    });
    fireEvent.click(screen.getByRole("button", { name: /ADD/i }));
    await waitFor(() => expect(screen.getByText("후드 집업")).toBeInTheDocument());
    expect(addItem).toHaveBeenCalledWith("c1", "https://brand.co.kr/2", "tok1");

    // 삭제 (첫 카드)
    fireEvent.click(screen.getAllByRole("button", { name: "삭제" })[0]);
    await waitFor(() =>
      expect(screen.queryByText("울 니트")).not.toBeInTheDocument(),
    );
    expect(removeItem).toHaveBeenCalledWith("c1", "i1", "tok1");

    // 공유 모달
    fireEvent.click(screen.getByRole("button", { name: /SHARE/i }));
    expect(screen.getByText(/링크가 만들어졌어요/)).toBeInTheDocument();
    expect(screen.getByText(/\/c\/c1$/)).toBeInTheDocument();
  });

  it("C-1: 빈 카트면 SHARE 비활성 + 빈 상태 안내", async () => {
    vi.mocked(getCart).mockResolvedValue({
      id: "c1",
      title: "빈 카트",
      items: [],
      createdAt: "2026",
    });
    render(<EditView id="c1" token="tok1" />);
    await waitFor(() => expect(screen.getByText("빈 카트")).toBeInTheDocument());
    expect(screen.getByRole("button", { name: /SHARE/i })).toBeDisabled();
    expect(
      screen.getByText("링크를 추가해 첫 상품을 담아보세요"),
    ).toBeInTheDocument();
  });

  it("C-2: 잘못된 토큰/카트면 404 안내", async () => {
    vi.mocked(getCart).mockRejectedValue(new CartNotFoundError());
    render(<EditView id="nope" token="bad" />);
    await waitFor(() =>
      expect(screen.getByText("없는 카트입니다")).toBeInTheDocument(),
    );
  });
});
