import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CartGrid } from "./CartGrid";
import type { CartItem } from "@/types";

const items: CartItem[] = [
  { id: "i1", url: "https://shop.com/1", title: "A", createdAt: "2026" },
  { id: "i2", url: "https://shop.com/2", title: "B", createdAt: "2026" },
  { id: "i3", url: "https://shop.com/3", title: "C", createdAt: "2026" },
];

describe("CartGrid", () => {
  it("아이템 수만큼 카드를 렌더링한다", () => {
    render(<CartGrid items={items} variant="view" />);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /사러 가기/ })).toHaveLength(3);
  });
});
