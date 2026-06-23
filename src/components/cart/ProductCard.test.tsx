import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCard } from "./ProductCard";
import type { CartItem } from "@/types";

const baseItem: CartItem = {
  id: "i1",
  url: "https://www.shop.com/item/1",
  title: "울 니트 가디건",
  image: "https://img.shop.com/1.jpg",
  createdAt: "2026-01-01T00:00:00Z",
};

describe("ProductCard", () => {
  it("제목과 사이트명(www 제거)을 보여준다", () => {
    render(<ProductCard item={baseItem} variant="view" />);
    expect(screen.getByText("울 니트 가디건")).toBeInTheDocument();
    expect(screen.getByText("shop.com")).toBeInTheDocument();
  });

  it("이미지가 있으면 img를, 없으면 placeholder를 보여준다", () => {
    const { rerender } = render(<ProductCard item={baseItem} variant="view" />);
    expect(screen.getByRole("img")).toHaveAttribute("src", baseItem.image);

    rerender(<ProductCard item={{ ...baseItem, image: undefined }} variant="view" />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByTestId("image-placeholder")).toBeInTheDocument();
  });

  it("제목이 없으면 대체 문구를 보여준다", () => {
    render(<ProductCard item={{ ...baseItem, title: undefined }} variant="view" />);
    expect(screen.getByText("제목 없음")).toBeInTheDocument();
  });

  it("view 모드: 원본으로 가는 새 탭 링크가 있고 삭제 버튼은 없다", () => {
    render(<ProductCard item={baseItem} variant="view" />);
    const link = screen.getByRole("link", { name: /사러 가기/ });
    expect(link).toHaveAttribute("href", baseItem.url);
    expect(link).toHaveAttribute("target", "_blank");
    expect(screen.queryByRole("button", { name: "삭제" })).not.toBeInTheDocument();
  });

  it("owner 모드: 삭제 버튼 클릭 시 onRemove(id)가 호출된다", () => {
    const onRemove = vi.fn();
    render(<ProductCard item={baseItem} variant="owner" onRemove={onRemove} />);
    fireEvent.click(screen.getByRole("button", { name: "삭제" }));
    expect(onRemove).toHaveBeenCalledWith("i1");
  });
});
