import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ShareModal } from "./ShareModal";

describe("ShareModal", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it("open이면 공유 URL과 COPY 버튼을 보여준다", () => {
    render(
      <ShareModal open url="https://app/c/abc" onClose={vi.fn()} />,
    );
    expect(screen.getByText("https://app/c/abc")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /COPY/i })).toBeInTheDocument();
  });

  it("open이 아니면 렌더링하지 않는다", () => {
    render(<ShareModal open={false} url="https://app/c/abc" onClose={vi.fn()} />);
    expect(screen.queryByText("https://app/c/abc")).not.toBeInTheDocument();
  });

  it("COPY 클릭 시 클립보드에 복사하고 토스트를 띄운다", async () => {
    render(<ShareModal open url="https://app/c/abc" onClose={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /COPY/i }));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("https://app/c/abc");
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("복사 완료"),
    );
  });

  it("닫기 버튼 클릭 시 onClose가 호출된다", () => {
    const onClose = vi.fn();
    render(<ShareModal open url="https://app/c/abc" onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "닫기" }));
    expect(onClose).toHaveBeenCalled();
  });
});
