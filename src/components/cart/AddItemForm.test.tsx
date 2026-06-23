import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AddItemForm } from "./AddItemForm";

describe("AddItemForm", () => {
  it("URL 입력 후 제출하면 onAdd(trimmed url)가 호출된다", () => {
    const onAdd = vi.fn();
    render(<AddItemForm onAdd={onAdd} />);
    fireEvent.change(screen.getByLabelText("상품 링크"), {
      target: { value: "  https://shop.com/1  " },
    });
    fireEvent.click(screen.getByRole("button", { name: /추가|ADD/i }));
    expect(onAdd).toHaveBeenCalledWith("https://shop.com/1");
  });

  it("입력이 비면 버튼이 비활성이고 onAdd가 호출되지 않는다", () => {
    const onAdd = vi.fn();
    render(<AddItemForm onAdd={onAdd} />);
    const btn = screen.getByRole("button", { name: /추가|ADD/i });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(onAdd).not.toHaveBeenCalled();
  });

  it("추가 후 입력이 비워진다", () => {
    render(<AddItemForm onAdd={vi.fn()} />);
    const input = screen.getByLabelText("상품 링크") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "https://shop.com/1" } });
    fireEvent.click(screen.getByRole("button", { name: /추가|ADD/i }));
    expect(input.value).toBe("");
  });

  it("loading이면 버튼이 비활성이다", () => {
    render(<AddItemForm onAdd={vi.fn()} loading />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
