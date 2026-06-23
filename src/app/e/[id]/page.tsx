import { EditView } from "@/components/views/EditView";
import { PageShell } from "@/components/views/PageShell";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

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
