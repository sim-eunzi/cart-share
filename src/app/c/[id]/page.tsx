import type { Metadata } from "next";
import { ShareView } from "@/components/views/ShareView";
import { PageShell } from "@/components/views/PageShell";

interface PageProps {
  params: Promise<{ id: string }>;
}

// 공유 카트는 개인 콘텐츠 — 미리보기 카드는 보이되 검색엔진 색인은 막는다.
export const metadata: Metadata = {
  title: "공유받은 장바구니 구경하기",
  description: "친구가 담은 장바구니를 픽셀 카드로 구경하고, 마음에 드는 상품은 바로 사러 가보세요. 🛒",
  robots: { index: false, follow: false },
};

export default async function SharePage({ params }: PageProps) {
  const { id } = await params;
  return (
    <PageShell>
      <ShareView id={id} />
    </PageShell>
  );
}
