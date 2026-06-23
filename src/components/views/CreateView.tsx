"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCart } from "@/lib/api";
import { RetroWindow } from "@/components/ui/RetroWindow";
import { CreateRoomForm } from "@/components/cart/CreateRoomForm";

/** Stage 1 — 방 만들기 */
export function CreateView() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate(title: string) {
    setLoading(true);
    setError(null);
    try {
      const { cartId, token } = await createCart(title);
      router.push(`/e/${cartId}?t=${encodeURIComponent(token)}`);
    } catch {
      setError("방을 만들지 못했어요. 다시 시도해 주세요.");
      setLoading(false);
    }
  }

  return (
    <RetroWindow title="WHAT'S IN MY CART?" stage="STAGE 1 — 방 만들기">
      <div className="relative px-5 pt-7 pb-12 text-center">
        <h1 className="font-pixel text-base sm:text-lg text-rose leading-relaxed [text-shadow:2px_2px_0_var(--color-ink)]">
          WHAT&apos;S IN
          <br />
          MY CART?
        </h1>
        <p className="font-body text-base text-ink my-4">
          친구에게 보여줄 장바구니를 만들어 보세요
        </p>
        <CreateRoomForm onCreate={handleCreate} loading={loading} />
        {error && (
          <p role="alert" className="font-body text-sm text-rose mt-3">
            {error}
          </p>
        )}
        {/* 픽셀 바닥 데코 (STAGE 1 포인트) */}
        <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-5 bg-rose border-t-[3px] border-ink" />
        <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-1.5 bg-ink" />
      </div>
    </RetroWindow>
  );
}
