import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PixelInput } from "./PixelInput";

describe("PixelInput", () => {
  it("placeholder를 렌더링한다", () => {
    render(<PixelInput placeholder="방 이름 입력" />);
    expect(screen.getByPlaceholderText("방 이름 입력")).toBeInTheDocument();
  });

  it("controlled value와 onChange가 동작한다", () => {
    const onChange = vi.fn();
    render(<PixelInput value="abc" onChange={onChange} aria-label="제목" />);
    const input = screen.getByLabelText("제목") as HTMLInputElement;
    expect(input.value).toBe("abc");
    fireEvent.change(input, { target: { value: "abcd" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("임의 props(name 등)를 전달한다", () => {
    render(<PixelInput name="url" aria-label="url" />);
    expect(screen.getByLabelText("url")).toHaveAttribute("name", "url");
  });
});
