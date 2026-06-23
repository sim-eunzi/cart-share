import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CreateView } from "./CreateView";
import { createCart } from "@/lib/api";

const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));
vi.mock("@/lib/api", () => ({ createCart: vi.fn() }));

describe("시나리오 A — 생성자: 방 만들기", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("A-1: 제목 입력 후 CREATE → 수정 URL(/e/[id]?t=token)로 이동", async () => {
    vi.mocked(createCart).mockResolvedValue({ cartId: "c1", token: "tok1" });
    render(<CreateView />);

    fireEvent.change(screen.getByLabelText("방 이름"), {
      target: { value: "겨울 옷 장바구니" },
    });
    fireEvent.click(screen.getByRole("button", { name: /CREATE/i }));

    expect(createCart).toHaveBeenCalledWith("겨울 옷 장바구니");
    await waitFor(() => expect(push).toHaveBeenCalledWith("/e/c1?t=tok1"));
  });

  it("A-2: 제목이 비면 CREATE 비활성 (생성 막음)", () => {
    render(<CreateView />);
    expect(screen.getByRole("button", { name: /CREATE/i })).toBeDisabled();
  });

  it("A-2: 생성 실패 시 에러 안내를 보여준다", async () => {
    vi.mocked(createCart).mockRejectedValue(new Error("fail"));
    render(<CreateView />);
    fireEvent.change(screen.getByLabelText("방 이름"), {
      target: { value: "x" },
    });
    fireEvent.click(screen.getByRole("button", { name: /CREATE/i }));
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("방을 만들지 못했어요"),
    );
    expect(push).not.toHaveBeenCalled();
  });
});
