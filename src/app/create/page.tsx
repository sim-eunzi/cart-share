import type { Metadata } from "next";
import { CreateView } from "@/components/views/CreateView";
import { PageShell } from "@/components/views/PageShell";

export const metadata: Metadata = {
  title: "방 만들기",
  description:
    "1분이면 끝! 장바구니 방을 만들고 상품 링크를 붙여 나만의 픽셀 카드를 모아보세요.",
  alternates: { canonical: "/create" },
};

export default function CreatePage() {
  return (
    <PageShell>
      <CreateView />
    </PageShell>
  );
}
