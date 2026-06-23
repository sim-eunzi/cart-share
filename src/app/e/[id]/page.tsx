import type { Metadata } from "next";
import { EditView } from "@/components/views/EditView";
import { PageShell } from "@/components/views/PageShell";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// 수정 링크는 토큰이 포함된 비공개 URL — 절대 색인/미리보기 금지.
export const metadata: Metadata = {
  title: "내 장바구니 수정",
  robots: { index: false, follow: false, nocache: true },
};

export default async function EditPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const sp = await searchParams;
  const token = typeof sp.t === "string" ? sp.t : "";

  return (
    <PageShell>
      <EditView id={id} token={token} />
    </PageShell>
  );
}
