import type { CartItem } from "@/types";
import { ProductCard } from "./ProductCard";

interface CartGridProps {
  items: CartItem[];
  variant: "owner" | "view";
  onRemove?: (id: string) => void;
}

/** auto-fit 카드 그리드: 화면 폭에 따라 2~3열, 모바일 1열 */
export function CartGrid({ items, variant, onRemove }: CartGridProps) {
  return (
    <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(140px,1fr))]">
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
