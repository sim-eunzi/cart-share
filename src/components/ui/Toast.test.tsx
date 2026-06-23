import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Toast } from "./Toast";

describe("Toast", () => {
  it("show=true면 메시지를 status로 보여준다", () => {
    render(<Toast show message="복사 완료!" />);
    const toast = screen.getByRole("status");
    expect(toast).toHaveTextContent("복사 완료!");
  });

  it("show=false면 아무것도 렌더링하지 않는다", () => {
    render(<Toast show={false} message="복사 완료!" />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
