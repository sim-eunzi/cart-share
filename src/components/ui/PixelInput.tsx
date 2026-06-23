import type { InputHTMLAttributes } from "react";

export function PixelInput({
  className = "",
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`font-body bg-white border-[3px] border-ink px-3 py-2.5 text-ink placeholder:text-ink/40 focus:border-pink focus:outline-none ${className}`}
      {...rest}
    />
  );
}
