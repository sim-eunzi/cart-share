import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PixelButton } from "./PixelButton";

describe("PixelButton", () => {
  it("자식 텍스트를 렌더링한다", () => {
    render(<PixelButton>SHARE</PixelButton>);
    expect(screen.getByRole("button", { name: "SHARE" })).toBeInTheDocument();
  });

  it("클릭하면 onClick이 호출된다", () => {
    const onClick = vi.fn();
    render(<PixelButton onClick={onClick}>CLICK</PixelButton>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("variant를 data-variant로 노출한다 (기본 primary)", () => {
    const { rerender } = render(<PixelButton>A</PixelButton>);
    expect(screen.getByRole("button")).toHaveAttribute("data-variant", "primary");
    rerender(<PixelButton variant="accent">A</PixelButton>);
    expect(screen.getByRole("button")).toHaveAttribute("data-variant", "accent");
  });

  it("disabled면 비활성이고 클릭이 무시된다", () => {
    const onClick = vi.fn();
    render(
      <PixelButton disabled onClick={onClick}>
        X
      </PixelButton>,
    );
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("type 속성을 전달한다", () => {
    render(<PixelButton type="submit">GO</PixelButton>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });
});
