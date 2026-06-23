import { ShareView } from "@/components/views/ShareView";
import { PageShell } from "@/components/views/PageShell";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SharePage({ params }: PageProps) {
  const { id } = await params;
  return (
    <PageShell>
      <ShareView id={id} />
    </PageShell>
  );
}
