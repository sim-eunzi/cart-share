interface ToastProps {
  show: boolean;
  message: string;
}

/** 와인 배경 + 핑크 하드 섀도우 픽셀 토스트 */
export function Toast({ show, message }: ToastProps) {
  if (!show) return null;
  return (
    <div
      role="status"
      className="bg-ink border-[3px] border-ink shadow-[4px_4px_0_var(--color-pink)] px-4 py-3 font-body text-white"
    >
      ✓ {message}
    </div>
  );
}
