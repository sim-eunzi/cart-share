"use client";

import { useState, type FormEvent } from "react";
import { PixelInput } from "@/components/ui/PixelInput";
import { PixelButton } from "@/components/ui/PixelButton";

interface CreateRoomFormProps {
  onCreate: (title: string) => void;
  loading?: boolean;
}

export function CreateRoomForm({ onCreate, loading = false }: CreateRoomFormProps) {
  const [value, setValue] = useState("");
  const trimmed = value.trim();
  const disabled = loading || trimmed.length === 0;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (disabled) return;
    onCreate(trimmed);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto w-full">
      <PixelInput
        aria-label="방 이름"
        placeholder="방 이름 입력"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 min-w-0"
      />
      <PixelButton type="submit" variant="accent" disabled={disabled}>
        {loading ? "..." : "CREATE"}
      </PixelButton>
    </form>
  );
}
