interface EmptyStateProps {
  message?: string;
}

function PixelHeart() {
  return (
    <svg width="44" height="38" viewBox="0 0 22 19" aria-hidden="true">
      <rect x="3" y="0" width="6" height="3" fill="#ff6fa5" />
      <rect x="13" y="0" width="6" height="3" fill="#ff6fa5" />
      <rect x="0" y="3" width="22" height="6" fill="#ff6fa5" />
      <rect x="3" y="9" width="16" height="3" fill="#ff6fa5" />
      <rect x="6" y="12" width="10" height="3" fill="#ff6fa5" />
      <rect x="9" y="15" width="4" height="3" fill="#ff6fa5" />
      <rect x="3" y="3" width="3" height="3" fill="#fff" />
    </svg>
  );
}

/** 빈 카트 / 폴백 안내 */
export function EmptyState({ message = "아직 담긴 상품이 없어요" }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <PixelHeart />
      <p className="font-body text-base text-ink/70">{message}</p>
    </div>
  );
}
