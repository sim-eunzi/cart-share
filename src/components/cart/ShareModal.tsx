"use client";

import { useState } from "react";
import { PixelButton } from "@/components/ui/PixelButton";
import { Toast } from "@/components/ui/Toast";

interface ShareModalProps {
  open: boolean;
  url: string;
  onClose: () => void;
}

/** 공유 링크 표시 + 클립보드 복사 모달 (딤 처리된 배경 위 레트로 창) */
export function ShareModal({ open, url, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  async function handleCopy() {
    try {
      await navigator.clipboard?.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* 클립보드 미지원 시 무시 — 사용자가 직접 선택 복사 */
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 p-4">
      <div className="w-full max-w-sm border-[3px] border-ink shadow-[6px_6px_0_var(--color-pink)] bg-white">
        <div className="bg-pink border-b-[3px] border-ink flex items-center px-2 py-1.5">
          <span className="font-pixel text-[7px] text-white">SHARE LINK</span>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="ml-auto font-pixel text-[8px] text-white px-1"
          >
            X
          </button>
        </div>
        <div className="p-4">
          <p className="font-body text-base text-ink mb-3">
            링크가 만들어졌어요! 친구에게 보내볼까요?
          </p>
          <div className="flex gap-2">
            <div className="flex-1 min-w-0 bg-pinkpale border-[3px] border-ink px-2 py-2 font-body text-xs text-ink break-all">
              {url}
            </div>
            <PixelButton onClick={handleCopy}>COPY</PixelButton>
          </div>
          <div className="mt-3">
            <Toast show={copied} message="복사 완료!" />
          </div>
        </div>
      </div>
    </div>
  );
}
