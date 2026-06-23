import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("기본 빈 카트 안내를 보여준다", () => {
    render(<EmptyState />);
    expect(screen.getByText("아직 담긴 상품이 없어요")).toBeInTheDocument();
  });

  it("커스텀 메시지를 보여준다", () => {
    render(<EmptyState message="없는 카트입니다" />);
    expect(screen.getByText("없는 카트입니다")).toBeInTheDocument();
  });
});
