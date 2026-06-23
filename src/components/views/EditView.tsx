"use client";

import { useEffect, useState } from "react";
import type { CartItem } from "@/types";
import { getCart, addItem, removeItem, CartNotFoundError } from "@/lib/api";
import { RetroWindow } from "@/components/ui/RetroWindow";
import { PixelButton } from "@/components/ui/PixelButton";
import { CartGrid } from "@/components/cart/CartGrid";
import { AddItemForm } from "@/components/cart/AddItemForm";
import { EmptyState } from "@/components/cart/EmptyState";
import { ShareModal } from "@/components/cart/ShareModal";

type Status = "loading" | "ready" | "notfound" | "error";

interface EditViewProps {
  id: string;
  token: string;
}

/** Stage 2 — 내 장바구니 (소유자, 추가/삭제) */
export function EditView({ id, token }: EditViewProps) {
  const [status, setStatus] = useState<Status>("loading");
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<CartItem[]>([]);
  const [adding, setAdding] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareUrl] = useState(() =>
    typeof window !== "undefined" ? `${window.location.origin}/c/${id}` : `/c/${id}`,
  );

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

  async function handleAdd(url: string) {
    setAdding(true);
    try {
      const item = await addItem(id, url, token);
      setItems((prev) => [...prev, item]);
    } catch {
      /* 추출 실패해도 서버가 placeholder로 응답 — 여기선 네트워크 오류만 무시 */
    } finally {
      setAdding(false);
    }
  }

  async function handleRemove(itemId: string) {
    const prev = items;
    setItems((cur) => cur.filter((i) => i.id !== itemId)); // 낙관적 제거
    try {
      await removeItem(id, itemId, token);
    } catch {
      setItems(prev); // 실패 시 롤백
    }
  }

  if (status === "loading") {
    return (
      <RetroWindow title="MY CART" stage="STAGE 2 — 내 장바구니">
        <div className="p-6 font-body text-ink/60 text-center">불러오는 중…</div>
      </RetroWindow>
    );
  }

  if (status === "notfound" || status === "error") {
    return (
      <RetroWindow title="MY CART" stage="STAGE 2 — 내 장바구니">
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
    <RetroWindow title={`MY CART · /e/${id}`} stage="STAGE 2 — 내 장바구니 (소유자)">
      <div className="p-4">
        <h1 className="font-body text-xl text-ink mb-1">{title}</h1>
        <p className="font-body text-xs text-ink/50 mb-4">
          ⚠ 이 수정 링크는 나만 보관하세요. 친구에겐 아래 SHARE 링크를 보내세요.
        </p>

        {items.length === 0 ? (
          <EmptyState message="링크를 추가해 첫 상품을 담아보세요" />
        ) : (
          <div className="mb-4">
            <CartGrid items={items} variant="owner" onRemove={handleRemove} />
          </div>
        )}

        <div className="mb-4">
          <AddItemForm onAdd={handleAdd} loading={adding} />
        </div>

        <div className="flex justify-end border-t-[3px] border-dashed border-ink pt-3">
          <PixelButton
            onClick={() => setShareOpen(true)}
            disabled={items.length < 1}
          >
            SHARE ♥
          </PixelButton>
        </div>
      </div>

      <ShareModal open={shareOpen} url={shareUrl} onClose={() => setShareOpen(false)} />
    </RetroWindow>
  );
}
