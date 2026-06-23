import { PixelHeart } from "@/components/ui/PixelHeart";

interface EmptyStateProps {
  message?: string;
}

/** 빈 카트 / 폴백 안내 */
export function EmptyState({ message = "아직 담긴 상품이 없어요" }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <PixelHeart size={44} />
      <p className="font-body text-base text-ink/70">{message}</p>
    </div>
  );
}
