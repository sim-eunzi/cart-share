import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RetroWindow } from "./RetroWindow";

describe("RetroWindow", () => {
  it("타이틀과 자식을 렌더링한다", () => {
    render(
      <RetroWindow title="MY CART">
        <p>내용</p>
      </RetroWindow>,
    );
    expect(screen.getByText("MY CART")).toBeInTheDocument();
    expect(screen.getByText("내용")).toBeInTheDocument();
  });

  it("stage가 있으면 하단 라벨을 보여준다", () => {
    render(
      <RetroWindow title="T" stage="STAGE 2 — 내 장바구니">
        <p>x</p>
      </RetroWindow>,
    );
    expect(screen.getByText("STAGE 2 — 내 장바구니")).toBeInTheDocument();
  });

  it("stage가 없으면 하단 라벨이 없다", () => {
    render(
      <RetroWindow title="T">
        <p>x</p>
      </RetroWindow>,
    );
    expect(screen.queryByText(/STAGE/)).not.toBeInTheDocument();
  });
});
