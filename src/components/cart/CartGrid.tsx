import type { CartItem } from "@/types";
import { ProductCard } from "./ProductCard";

interface CartGridProps {
  items: CartItem[];
  variant: "owner" | "view";
  onRemove?: (id: string) => void;
}

/**
 * 카드 그리드 — 개수별 분기
 * - 1개: 240px 고정 (옆 여백)
 * - 2개: 한 줄에 2등분
 * - 3개 이상: 한 줄에 3등분 (4번째부터 wrap)
 * - 모바일(<sm): 항상 1열
 */
function getColsClass(count: number): string {
  if (count <= 1) return "grid-cols-1 sm:[grid-template-columns:240px]";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  return "grid-cols-1 sm:grid-cols-3";
}

export function CartGrid({ items, variant, onRemove }: CartGridProps) {
  return (
    <div className={`grid gap-3 ${getColsClass(items.length)}`}>
      {items.map((item) => (
        <ProductCard
          key={item.id}
          item={item}
          variant={variant}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
