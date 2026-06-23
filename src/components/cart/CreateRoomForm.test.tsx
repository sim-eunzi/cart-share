import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CreateRoomForm } from "./CreateRoomForm";

describe("CreateRoomForm", () => {
  it("제목 입력 후 제출하면 onCreate(title)가 호출된다", () => {
    const onCreate = vi.fn();
    render(<CreateRoomForm onCreate={onCreate} />);
    fireEvent.change(screen.getByLabelText("방 이름"), {
      target: { value: "겨울 옷 장바구니" },
    });
    fireEvent.click(screen.getByRole("button", { name: /CREATE/i }));
    expect(onCreate).toHaveBeenCalledWith("겨울 옷 장바구니");
  });

  it("제목이 비면 버튼이 비활성", () => {
    render(<CreateRoomForm onCreate={vi.fn()} />);
    expect(screen.getByRole("button", { name: /CREATE/i })).toBeDisabled();
  });

  it("loading이면 버튼이 비활성", () => {
    render(<CreateRoomForm onCreate={vi.fn()} loading />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
