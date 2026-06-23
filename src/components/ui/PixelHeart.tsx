interface PixelHeartProps {
  size?: number;
  className?: string;
}

/** 핑크 픽셀 하트 (좌상단 흰 하이라이트). 빈 상태·헤더 공용 브랜드 아이콘. */
export function PixelHeart({ size = 44, className = "" }: PixelHeartProps) {
  const width = size;
  const height = Math.round((size * 19) / 22);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 19"
      aria-hidden="true"
      className={className}
    >
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
