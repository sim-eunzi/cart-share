"use client";

import { useEffect, useState } from "react";
import type { CartItem } from "@/types";
import { getCart, CartNotFoundError } from "@/lib/api";
import { RetroWindow } from "@/components/ui/RetroWindow";
import { CartGrid } from "@/components/cart/CartGrid";
import { EmptyState } from "@/components/cart/EmptyState";

type Status = "loading" | "ready" | "notfound" | "error";

interface ShareViewProps {
  id: string;
}

/** Stage 4 — 친구 뷰 (공유 링크, 읽기 전용) */
export function ShareView({ id }: ShareViewProps) {
  const [status, setStatus] = useState<Status>("loading");
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    let alive = true;
    getCart(id)
      .then((cart) => {
        if (!alive) return;
        setTitle(cart.title);
        setItems(cart.items);
        setStatus("ready");
      })
      .catch((e) => {
        if (!alive) return;
        setStatus(e instanceof CartNotFoundError ? "notfound" : "error");
      });
    return () => {
      alive = false;
    };
  }, [id]);

  if (status === "loading") {
    return (
      <RetroWindow title="SHARED CART" stage="STAGE 4 — 친구 뷰">
        <div className="p-6 font-body text-ink/60 text-center">불러오는 중…</div>
      </RetroWindow>
    );
  }

  if (status === "notfound" || status === "error") {
    return (
      <RetroWindow title="SHARED CART" stage="STAGE 4 — 친구 뷰">
        <EmptyState
          message={
            status === "notfound"
              ? "없는 카트입니다"
              : "불러오지 못했어요. 새로고침 해주세요."
          }
        />
      </RetroWindow>
    );
  }

  return (
    <RetroWindow title={`SHARED · /c/${id}`} stage="STAGE 4 — 친구 뷰 (읽기 전용)">
      <div className="p-4">
        <h1 className="font-body text-xl text-ink mb-4">{title} ♥</h1>
        {items.length === 0 ? (
          <EmptyState message="아직 담긴 상품이 없어요" />
        ) : (
          <CartGrid items={items} variant="view" />
        )}
      </div>
    </RetroWindow>
  );
}
