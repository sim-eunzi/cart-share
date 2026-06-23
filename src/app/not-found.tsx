import Link from "next/link";
import { RetroWindow } from "@/components/ui/RetroWindow";
import { EmptyState } from "@/components/cart/EmptyState";
import { PageShell } from "@/components/views/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <RetroWindow title="404" stage="PAGE NOT FOUND">
        <div className="p-4">
          <EmptyState message="없는 페이지예요" />
          <div className="flex justify-center">
            <Link
              href="/create"
              className="pixel-press font-pixel text-[10px] bg-rose text-white border-[3px] border-ink px-4 py-3 shadow-pixel"
            >
              방 만들러 가기
            </Link>
          </div>
        </div>
      </RetroWindow>
    </PageShell>
  );
}
