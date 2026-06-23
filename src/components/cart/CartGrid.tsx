import type { CartItem } from "@/types";
import { ProductCard } from "./ProductCard";

interface CartGridProps {
  items: CartItem[];
  variant: "owner" | "view";
  onRemove?: (id: string) => void;
}

/** auto-fill 카드 그리드: 카드 너비 140~240px, 1개일 때도 그리드 트랙 유지 */
export function CartGrid({ items, variant, onRemove }: CartGridProps) {
  return (
    <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(140px,240px))]">
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
