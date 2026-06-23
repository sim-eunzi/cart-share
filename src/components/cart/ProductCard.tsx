import type { CartItem } from "@/types";
import { getHostname } from "@/lib/hostname";

interface ProductCardProps {
  item: CartItem;
  variant: "owner" | "view";
  onRemove?: (id: string) => void;
}

function ImagePlaceholder() {
  return (
    <div
      data-testid="image-placeholder"
      className="aspect-square bg-pinklight border-b-[3px] border-ink flex items-center justify-center"
    >
      <svg width="30" height="26" viewBox="0 0 30 26" aria-hidden="true">
        <rect x="0" y="0" width="30" height="26" fill="none" stroke="#7a1f3d" strokeWidth="3" />
        <rect x="5" y="14" width="7" height="7" fill="#7a1f3d" />
        <circle cx="21" cy="9" r="3" fill="#7a1f3d" />
      </svg>
    </div>
  );
}

/** 상품 카드. owner=삭제 뱃지, view=원본으로 가는 새 탭 링크(읽기 전용). */
export function ProductCard({ item, variant, onRemove }: ProductCardProps) {
  const hostname = getHostname(item.url);

  return (
    <div className="relative bg-white border-[3px] border-ink shadow-pixel">
      {variant === "owner" && (
        <button
          type="button"
          aria-label="삭제"
          onClick={() => onRemove?.(item.id)}
          className="pixel-press absolute -top-2.5 -right-2.5 w-7 h-7 bg-rose border-[3px] border-ink flex items-center justify-center font-pixel text-[9px] text-white z-10"
        >
          X
        </button>
      )}

      {item.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image}
          alt={item.title ?? "상품 이미지"}
          className="aspect-square w-full object-cover border-b-[3px] border-ink"
        />
      ) : (
        <ImagePlaceholder />
      )}

      <div className="p-2.5">
        <div className="font-body text-sm text-ink leading-snug line-clamp-2">
          {item.title ?? "제목 없음"}
        </div>
        {hostname && (
          <div className="font-body text-xs text-ink/60 mt-1 truncate">{hostname}</div>
        )}
        {variant === "view" && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-press mt-2 block text-center font-pixel text-[8px] bg-rose text-white border-[3px] border-ink py-2 shadow-pixel"
          >
            사러 가기 ↗
          </a>
        )}
      </div>
    </div>
  );
}
