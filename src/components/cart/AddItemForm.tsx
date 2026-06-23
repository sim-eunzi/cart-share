"use client";

import { useState, type FormEvent } from "react";
import { PixelInput } from "@/components/ui/PixelInput";
import { PixelButton } from "@/components/ui/PixelButton";

interface AddItemFormProps {
  onAdd: (url: string) => void;
  loading?: boolean;
}

export function AddItemForm({ onAdd, loading = false }: AddItemFormProps) {
  const [value, setValue] = useState("");
  const trimmed = value.trim();
  const disabled = loading || trimmed.length === 0;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (disabled) return;
    onAdd(trimmed);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <PixelInput
        aria-label="상품 링크"
        placeholder="상품 링크 붙여넣기"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 min-w-0"
      />
      <PixelButton type="submit" variant="secondary" disabled={disabled}>
        {loading ? "..." : "+ ADD"}
      </PixelButton>
    </form>
  );
}
